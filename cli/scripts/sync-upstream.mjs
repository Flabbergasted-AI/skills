#!/usr/bin/env node
// Import upstream data only. Never execute scripts from a fetched skill.
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const MAX_BUFFER = 128 * 1024 * 1024;
const IGNORED = new Set(['.DS_Store', 'Thumbs.db', '__pycache__']);
const NAME = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;
const SHA = /^[a-f0-9]{40}$/;

export function git(repo, args, input) {
  return execFileSync('git', ['-c', 'core.hooksPath=', '-C', repo, ...args], {
    input, maxBuffer: MAX_BUFFER, timeout: 60_000,
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GIT_CONFIG_NOSYSTEM: '1' },
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

function safeRelative(value) {
  return typeof value === 'string' && value.length > 0 &&
    !/[\\<>:"|?*\x00-\x1f\x7f]/.test(value) && !value.startsWith('/') &&
    value.split('/').every((part) => part && part !== '.' && part !== '..' &&
      !/^\.git$/i.test(part) && !/[. ]$/.test(part) &&
      !/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(part));
}

export function validateManifest(manifest, lock, skillNames) {
  if (manifest.version !== 1 || lock.version !== 1 || !manifest.sources || !manifest.skills || !lock.skills) {
    throw new Error('Expected version 1 source manifest and lock file');
  }
  for (const [id, source] of Object.entries(manifest.sources)) {
    if (!NAME.test(id) || !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(?:\.git)?$/.test(source.url) ||
        typeof source.ref !== 'string' || !/^[\w./-]+$/.test(source.ref) || source.ref.startsWith('-')) {
      throw new Error(`Invalid source: ${id}`);
    }
  }
  for (const [name, entry] of Object.entries(manifest.skills)) {
    if (!NAME.test(name) || !['merge', 'manual'].includes(entry.mode)) throw new Error(`Invalid skill: ${name}`);
    if (entry.source && (!manifest.sources[entry.source] || !safeRelative(entry.path))) {
      throw new Error(`Invalid source/path for ${name}`);
    }
    if (entry.mode === 'merge' && !entry.source) throw new Error(`Missing source for ${name}`);
    const previous = lock.skills[name];
    if (previous && (!SHA.test(previous.commit) || previous.source !== entry.source || !safeRelative(previous.path))) {
      throw new Error(`Lock/source mismatch for ${name}; verify provenance before changing its mapping`);
    }
  }
  for (const name of Object.keys(lock.skills)) {
    if (!manifest.skills[name]) throw new Error(`Orphan lock entry: ${name}`);
  }
  if (skillNames) {
    for (const name of skillNames) {
      if (!manifest.skills[name]) throw new Error(`Unclassified public skill: ${name}`);
    }
    for (const name of Object.keys(manifest.skills)) {
      if (!skillNames.includes(name)) throw new Error(`Manifest skill directory missing: ${name}`);
    }
  }
}

function canonical(data) {
  if (data.includes(0)) return data;
  const text = data.toString('utf8');
  return Buffer.from(text).equals(data) ? Buffer.from(text.replace(/\r\n/g, '\n')) : data;
}

function isText(data) {
  return !data.includes(0) && Buffer.from(data.toString('utf8')).equals(data);
}

function same(a, b) {
  return a === undefined || b === undefined ? a === b :
    canonical(a.data).equals(canonical(b.data)) && a.mode === b.mode;
}

export function equalSnapshots(a, b) {
  return a.size === b.size && [...a].every(([name, entry]) => same(entry, b.get(name)));
}

export async function readLocalSnapshot(directory, modes = new Map()) {
  const result = new Map();
  async function walk(base, prefix = '') {
    for (const entry of await fs.readdir(base, { withFileTypes: true })) {
      if (IGNORED.has(entry.name) || entry.name.endsWith('.pyc')) continue;
      const relative = prefix + entry.name;
      if (!safeRelative(relative) || entry.isSymbolicLink()) throw new Error(`Unsafe local path: ${relative}`);
      const absolute = path.join(base, entry.name);
      if (entry.isDirectory()) await walk(absolute, relative + '/');
      else if (entry.isFile()) {
        const mode = process.platform === 'win32' ? modes.get(relative) || '100644' :
          ((await fs.stat(absolute)).mode & 0o111) ? '100755' : '100644';
        result.set(relative, { data: await fs.readFile(absolute), mode });
      } else throw new Error(`Unsupported local file: ${relative}`);
    }
  }
  await walk(directory);
  return result;
}

// Read Git objects, not a checkout: symlinks/submodules and checkout hooks cannot run.
export function readGitSnapshot(repo, commit, directory) {
  if (!SHA.test(commit) || !safeRelative(directory)) throw new Error('Unsafe snapshot request');
  const entries = git(repo, ['ls-tree', '-rz', `${commit}:${directory}`]).toString('utf8').split('\0').filter(Boolean);
  const files = entries.map((entry) => {
    const match = entry.match(/^(100644|100755) blob ([a-f0-9]{40})\t(.+)$/s);
    if (!match || !safeRelative(match[3])) throw new Error(`Unsafe upstream entry: ${entry}`);
    return { mode: match[1], oid: match[2], name: match[3] };
  }).filter(({ name }) => !name.split('/').some((part) => IGNORED.has(part) || part.endsWith('.pyc')));
  const folded = new Set();
  const directories = new Set();
  for (const file of files) {
    const key = file.name.toLowerCase();
    if (folded.has(key)) throw new Error(`Case-colliding upstream path: ${file.name}`);
    folded.add(key);
    const parts = key.split('/');
    for (let i = 1; i < parts.length; i++) directories.add(parts.slice(0, i).join('/'));
  }
  for (const key of folded) if (directories.has(key)) throw new Error(`File/directory collision: ${key}`);
  if (!files.length) return new Map();
  const output = git(repo, ['cat-file', '--batch'], files.map((file) => file.oid + '\n').join(''));
  let offset = 0;
  return new Map(files.map((file) => {
    const end = output.indexOf(10, offset);
    const header = output.subarray(offset, end).toString('ascii').split(' ');
    const size = Number(header[2]);
    if (header[0] !== file.oid || header[1] !== 'blob' || !Number.isSafeInteger(size) || size < 0) {
      throw new Error(`Invalid Git blob response: ${file.name}`);
    }
    const data = Buffer.from(output.subarray(end + 1, end + 1 + size));
    offset = end + 1 + size + 1;
    return [file.name, { data, mode: file.mode }];
  }));
}

export async function mergeSnapshots(base, local, upstream) {
  const merged = new Map();
  const conflicts = [];
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'skill-merge-'));
  try {
    for (const name of [...new Set([...base.keys(), ...local.keys(), ...upstream.keys()])].sort()) {
      const b = base.get(name), l = local.get(name), u = upstream.get(name);
      let result;
      if (same(l, u)) result = l;
      else if (same(l, b)) result = u;
      else if (same(u, b)) result = l;
      else if (b && l && u && [b, l, u].every((entry) => isText(entry.data))) {
        const mode = l.mode === b.mode ? u.mode : u.mode === b.mode || l.mode === u.mode ? l.mode : null;
        await Promise.all([['local', l], ['base', b], ['upstream', u]].map(([label, entry]) =>
          fs.writeFile(path.join(temp, label), canonical(entry.data))));
        const output = spawnSync('git', ['merge-file', '-p', '--diff3', '--',
          path.join(temp, 'local'), path.join(temp, 'base'), path.join(temp, 'upstream')],
        { maxBuffer: MAX_BUFFER, timeout: 60_000 });
        if (output.error) throw output.error;
        if (output.status !== 0 || !mode) conflicts.push(name);
        else result = { data: output.stdout, mode };
      } else conflicts.push(name);
      if (result) merged.set(name, result);
    }
    // Case-insensitive file/directory collisions can arise from otherwise independent additions.
    const paths = [...merged.keys()].map((name) => name.toLowerCase());
    if (new Set(paths).size !== paths.length || paths.some((name) => paths.some((other) => other.startsWith(name + '/')))) {
      conflicts.push('(file/directory or case collision)');
    }
    return { merged, conflicts };
  } finally {
    await fs.rm(temp, { recursive: true, force: true });
  }
}

export function validateSnapshot(snapshot) {
  const entry = snapshot.get('SKILL.md');
  if (!entry) throw new Error('SKILL.md missing');
  const content = entry.data.toString('utf8');
  if (content.startsWith('---')) {
    if (!/^---\r?\n/.test(content)) throw new Error('Only plain YAML frontmatter is supported');
    const { data } = matter(content);
    if (typeof data.name !== 'string' || !NAME.test(data.name) ||
        typeof data.description !== 'string' || !data.description.trim()) {
      throw new Error('SKILL.md requires a valid name and nonempty description');
    }
  } else if (!content.startsWith('|') || !/\*\*name\*\*/.test(content) || !/\*\*description\*\*/.test(content)) {
    throw new Error('SKILL.md requires YAML or legacy table metadata');
  }
  const warnings = [];
  if (content.split('\n').length > 500) warnings.push('SKILL.md exceeds 500 lines');
  for (const [name, file] of snapshot) {
    if (!name.endsWith('.md')) continue;
    for (const match of file.data.toString('utf8').matchAll(/\]\(([^\s)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^(?:[a-z]+:|\/)/i.test(target) || /[<>{}$*]/.test(target)) continue;
      let decoded;
      try { decoded = decodeURIComponent(target); } catch { continue; }
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(name), decoded));
      if (!snapshot.has(resolved) && ![...snapshot.keys()].some((key) => key.startsWith(resolved.replace(/\/$/, '') + '/'))) {
        warnings.push(`${name}: unresolved relative link ${target}`);
      }
    }
  }
  return [...new Set(warnings)];
}

async function editSnapshot(directory, previous, next) {
  // Remove only tracked snapshot files. Never recursively remove a skill directory.
  for (const name of previous.keys()) {
    if (!next.has(name)) await fs.unlink(path.join(directory, name));
  }
  // Remove now-empty directories to support upstream file/directory replacements.
  const parents = new Set([...previous.keys()].flatMap((name) => {
    const result = [];
    for (let parent = path.posix.dirname(name); parent !== '.'; parent = path.posix.dirname(parent)) result.push(parent);
    return result;
  }));
  for (const parent of [...parents].sort((a, b) => b.length - a.length)) {
    await fs.rmdir(path.join(directory, parent)).catch((error) => {
      if (!['ENOTEMPTY', 'EEXIST', 'ENOENT'].includes(error.code)) throw error;
    });
  }
  for (const [name, entry] of next) {
    if (same(previous.get(name), entry)) continue;
    const destination = path.join(directory, name);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, entry.data);
    await fs.chmod(destination, entry.mode === '100755' ? 0o755 : 0o644);
  }
}

async function writeSnapshot(directory, previous, next) {
  // Prepare the entire directory on the same volume, then swap it into place.
  // A failed write must not leave half a skill updated with its old baseline.
  const temp = await fs.mkdtemp(path.join(path.dirname(path.dirname(directory)), '.skill-stage-'));
  const staged = path.join(temp, 'next');
  const backup = path.join(temp, 'previous');
  let moved = false;
  let installed = false;
  try {
    await fs.cp(directory, staged, { recursive: true, preserveTimestamps: true });
    await editSnapshot(staged, previous, next);
    await fs.rename(directory, backup);
    moved = true;
    try {
      await fs.rename(staged, directory);
      installed = true;
    } catch (error) {
      await fs.rename(backup, directory);
      moved = false;
      throw error;
    }
  } finally {
    // Keep the backup if restoration itself failed; never delete the only copy.
    if (!moved || installed) await fs.rm(temp, { recursive: true, force: true }).catch(() => {});
  }
}

async function localModes(root, name) {
  const result = new Map();
  for (const entry of git(root, ['ls-files', '--stage', '-z', '--', `public/${name}/`]).toString('utf8').split('\0').filter(Boolean)) {
    const match = entry.match(/^(100644|100755) [a-f0-9]+ 0\t(.+)$/s);
    if (match) result.set(match[2].slice(`public/${name}/`.length), match[1]);
  }
  return result;
}

export async function runSync({ root = ROOT, apply = false, only = [], adopt = [], openSource } = {}) {
  const manifest = JSON.parse(await fs.readFile(path.join(root, 'upstream.sources.json'), 'utf8'));
  const lock = JSON.parse(await fs.readFile(path.join(root, 'upstream.lock.json'), 'utf8'));
  const names = (await fs.readdir(path.join(root, 'public'), { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  validateManifest(manifest, lock, names);
  for (const name of [...only, ...adopt]) if (!manifest.skills[name]) throw new Error(`Unknown skill: ${name}`);
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'skill-sync-'));
  const repositories = new Map();
  const results = [];
  let changed = false;
  try {
    async function repository(id) {
      if (!repositories.has(id)) {
        const source = manifest.sources[id];
        repositories.set(id, (async () => {
          if (openSource) return openSource(id, source);
          const repo = path.join(temporary, id);
          await fs.mkdir(repo);
          git(repo, ['init', '--bare', '--quiet']);
          git(repo, ['fetch', '--quiet', '--depth=1', source.url, source.ref]);
          const commit = git(repo, ['rev-parse', 'FETCH_HEAD']).toString().trim();
          return { repo, commit, ensureCommit(sha) {
            try { git(repo, ['cat-file', '-e', `${sha}^{commit}`]); }
            catch { git(repo, ['fetch', '--quiet', '--depth=1', source.url, sha]); }
          } };
        })());
      }
      return repositories.get(id);
    }
    for (const [name, entry] of Object.entries(manifest.skills)) {
      if (only.length && !only.includes(name)) continue;
      if (entry.mode === 'manual' && !adopt.includes(name)) {
        results.push({ name, status: 'manual', detail: entry.reason || 'Manually maintained' });
        continue;
      }
      const result = { name, source: entry.source, status: 'error' };
      if (entry.source) result.repository = manifest.sources[entry.source].url.replace(/\.git$/, '');
      results.push(result);
      try {
        if (!entry.source) throw new Error('Establish a verified source mapping before adoption');
        const remote = await repository(entry.source);
        result.to = remote.commit;
        const upstream = readGitSnapshot(remote.repo, remote.commit, entry.path);
        validateSnapshot(upstream);
        const directory = path.join(root, 'public', name);
        const local = await readLocalSnapshot(directory, await localModes(root, name));
        const previous = lock.skills[name];
        if (!previous) {
          if (!adopt.includes(name) || !equalSnapshots(local, upstream)) {
            result.status = 'needs-baseline';
            result.detail = 'No verified baseline. Adoption requires the entire directory to match upstream.';
            continue;
          }
          if (apply) {
            lock.skills[name] = { source: entry.source, path: entry.path, commit: remote.commit };
            manifest.skills[name] = { source: entry.source, path: entry.path, mode: 'merge' };
          }
          result.status = 'adopted';
          changed = true;
          continue;
        }
        result.from = previous.commit;
        if (previous.commit === remote.commit) {
          result.status = 'unchanged';
          continue;
        }
        await remote.ensureCommit(previous.commit);
        const base = readGitSnapshot(remote.repo, previous.commit, previous.path);
        if (equalSnapshots(base, upstream)) {
          result.status = 'unchanged';
          continue;
        }
        const { merged, conflicts } = await mergeSnapshots(base, local, upstream);
        if (conflicts.length) {
          result.status = 'conflict';
          result.detail = conflicts.join(', ');
          continue;
        }
        result.warnings = validateSnapshot(merged);
        const contentChanged = !equalSnapshots(local, merged);
        if (apply) {
          if (contentChanged) await writeSnapshot(directory, local, merged);
          lock.skills[name] = { source: entry.source, path: entry.path, commit: remote.commit };
        }
        result.status = contentChanged ? 'updated' : 'tracked';
        changed = true;
      } catch (error) {
        result.status = 'error';
        // Do not include Git stderr, remote content, or authentication details in reports.
        result.detail = error instanceof Error ? error.message.split('\n')[0] : 'Sync failed';
      }
    }
    if (apply && changed) {
      await fs.writeFile(path.join(root, 'upstream.lock.json'), JSON.stringify(lock, null, 2) + '\n');
      if (adopt.length) await fs.writeFile(path.join(root, 'upstream.sources.json'), JSON.stringify(manifest, null, 2) + '\n');
    }
    return { apply, changed, failed: results.some((result) => ['error', 'conflict', 'needs-baseline'].includes(result.status)), results };
  } finally {
    await fs.rm(temporary, { recursive: true, force: true });
  }
}

export function renderReport(report) {
  const counts = {};
  for (const result of report.results) counts[result.status] = (counts[result.status] || 0) + 1;
  const lines = ['# Upstream skill sync', '',
    `${report.apply ? 'Apply' : 'Dry run'}: ${Object.entries(counts).map(([key, count]) => `${count} ${key}`).join(', ')}.`, '',
    'Updates use three-way merges against the recorded upstream commit. Conflicting skills retain their current files and lock entries.', ''];
  for (const result of report.results.filter((item) => !['manual', 'unchanged'].includes(item.status))) {
    // Escape remote-derived file names and validation warnings before including in Markdown.
    const escape = (value) => String(value).replace(/[&<>`@\[\]\\]/g, (char) => `&#${char.charCodeAt(0)};`).replace(/[\r\n]/g, ' ');
    lines.push(`- **${result.name}**: ${result.status}${result.detail ? ` — ${escape(result.detail)}` : ''}`);
    if (result.from && result.to) lines.push(`  [Upstream changes](${result.repository}/compare/${result.from}...${result.to}): \`${result.from}\` → \`${result.to}\`.`);
    for (const warning of (result.warnings || []).slice(0, 20)) lines.push(`  Warning: ${escape(warning)}`);
  }
  lines.push('', 'Review skill instructions, bundled scripts, and license changes before merging. Upstream scripts were not executed.', '');
  // Keep the report within GitHub's PR-body limit, even for many noisy skills.
  let markdown = lines.join('\n');
  if (markdown.length > 60_000) {
    markdown = markdown.slice(0, markdown.lastIndexOf('\n', 59_000)) +
      '\n\nReport truncated. Run a check with --only <skill> for individual details.\n';
  }
  return markdown;
}

async function main() {
  const args = process.argv.slice(2);
  const options = { only: [], adopt: [] };
  let reportPath;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--apply') options.apply = true;
    else if (['--only', '--adopt', '--report'].includes(args[i]) && args[i + 1] && !args[i + 1].startsWith('--')) {
      const key = args[i++];
      if (key === '--report') reportPath = path.resolve(args[i]);
      else options[key.slice(2)].push(args[i]);
    } else if (args[i] === '--validate') {
      const manifest = JSON.parse(await fs.readFile(path.join(ROOT, 'upstream.sources.json'), 'utf8'));
      const lock = JSON.parse(await fs.readFile(path.join(ROOT, 'upstream.lock.json'), 'utf8'));
      const names = (await fs.readdir(path.join(ROOT, 'public'), { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
      validateManifest(manifest, lock, names);
      for (const [name, entry] of Object.entries(manifest.skills)) {
        if (entry.mode === 'merge') validateSnapshot(await readLocalSnapshot(path.join(ROOT, 'public', name)));
      }
      console.log(`Validated source inventory: ${names.length} skills`);
      return;
    } else throw new Error(`Unknown or incomplete option: ${args[i]}`);
  }
  if (options.adopt.length && !options.only.length) options.only = [...options.adopt];
  const report = await runSync(options);
  const markdown = renderReport(report);
  console.log(markdown);
  if (reportPath) await fs.writeFile(reportPath, markdown);
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `changed=${report.apply && report.changed}\n`);
  if (report.failed) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message.split('\n')[0]); process.exitCode = 1; });
}
