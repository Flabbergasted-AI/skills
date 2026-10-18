import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { git, readGitSnapshot, readLocalSnapshot, mergeSnapshots, validateSnapshot,
  validateManifest, equalSnapshots, runSync, renderReport } from './sync-upstream.mjs';

const metadata = '---\nname: example\ndescription: A fixture skill for upstream sync tests.\n---\n';
const snap = (files) => new Map(Object.entries(files).map(([name, data]) =>
  [name, { data: Buffer.isBuffer(data) ? data : Buffer.from(data), mode: '100644' }]));
const asText = (snapshot, name = 'SKILL.md') => snapshot.get(name)?.data.toString();

test('merge preserves local edits while applying independent upstream changes', async () => {
  const base = snap({ 'SKILL.md': 'first\nmiddle\nlast\n', 'old.txt': 'removed upstream', 'asset.bin': Buffer.from([0, 1]) });
  const local = snap({ 'SKILL.md': 'local first\nmiddle\nlast\n', 'old.txt': 'removed upstream', 'asset.bin': Buffer.from([0, 1]), 'local.txt': 'keep' });
  const upstream = snap({ 'SKILL.md': 'first\nmiddle\nupstream last\n', 'asset.bin': Buffer.from([0, 2]), 'new.txt': 'new' });
  const { merged, conflicts } = await mergeSnapshots(base, local, upstream);
  assert.deepEqual(conflicts, []);
  assert.equal(asText(merged), 'local first\nmiddle\nupstream last\n');
  assert.equal(merged.has('old.txt'), false);
  assert.equal(asText(merged, 'local.txt'), 'keep');
  assert.deepEqual(merged.get('asset.bin').data, Buffer.from([0, 2]));
});

test('overlapping edits, delete/modify and binary conflicts are blocked', async () => {
  const base = snap({ 'SKILL.md': 'base\n', 'deleted.txt': 'base', 'asset.bin': Buffer.from([0, 1]) });
  const local = snap({ 'SKILL.md': 'local\n', 'asset.bin': Buffer.from([0, 2]) });
  const upstream = snap({ 'SKILL.md': 'remote\n', 'deleted.txt': 'remote', 'asset.bin': Buffer.from([0, 3]) });
  const result = await mergeSnapshots(base, local, upstream);
  assert.deepEqual(result.conflicts.sort(), ['SKILL.md', 'asset.bin', 'deleted.txt']);
});

test('local deletion survives unchanged upstream, CRLF is equivalent, case collisions fail', async () => {
  assert.equal(equalSnapshots(snap({ a: 'text\r\n' }), snap({ a: 'text\n' })), true);
  const deletion = await mergeSnapshots(snap({ a: 'base' }), snap({}), snap({ a: 'base', b: 'new' }));
  assert.equal(deletion.merged.has('a'), false);
  const collision = await mergeSnapshots(snap({}), snap({ Readme: 'local' }), snap({ README: 'remote' }));
  assert.equal(collision.conflicts.length, 1);
  const prefix = await mergeSnapshots(snap({}), snap({ a: 'file' }), snap({ 'a/b': 'file' }));
  assert.equal(prefix.conflicts.length, 1);
});

test('metadata validation accepts legacy tables, flags links and rejects executable frontmatter', () => {
  assert.throws(() => validateSnapshot(snap({ 'SKILL.md': '---\nname: x\n---\n' })), /description/);
  assert.throws(() => validateSnapshot(snap({ 'SKILL.md': '---js\n({name:"x",description:"x"})\n---' })), /plain YAML/);
  assert.deepEqual(validateSnapshot(snap({ 'SKILL.md': '| **name** | old |\n| **description** | legacy |' })), []);
  assert.deepEqual(validateSnapshot(snap({ 'SKILL.md': metadata + '[docs](references/api.md)' })), ['SKILL.md: unresolved relative link references/api.md']);
});

test('manifest rejects traversal, unsafe URLs, remapped sources and inventory omissions', () => {
  const manifest = { version: 1, sources: { upstream: { url: 'https://github.com/test/skills.git', ref: 'main' } },
    skills: { example: { source: 'upstream', path: 'skills/example', mode: 'merge' } } };
  const lock = { version: 1, skills: { example: { source: 'upstream', path: 'old/example', commit: 'a'.repeat(40) } } };
  validateManifest(manifest, lock, ['example']);
  assert.throws(() => validateManifest(manifest, lock, ['example', 'missing']), /Unclassified/);
  for (const invalid of ['../escape', '/absolute', 'foo/.git/config', 'a\\b', 'a/NUL.txt', 'a\nb']) {
    const copy = structuredClone(manifest); copy.skills.example.path = invalid;
    assert.throws(() => validateManifest(copy, lock), /Invalid source/);
  }
  const badUrl = structuredClone(manifest); badUrl.sources.upstream.url = 'file:///local';
  assert.throws(() => validateManifest(badUrl, lock), /Invalid source/);
  const badLock = structuredClone(lock); badLock.skills.example.source = 'other';
  assert.throws(() => validateManifest(manifest, badLock), /Lock\/source/);
});

async function fixture(t) {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'sync-test-'));
  t.after(() => fs.rm(temp, { recursive: true, force: true }));
  const root = path.join(temp, 'local'), repo = path.join(temp, 'remote');
  for (const directory of [root, repo]) {
    await fs.mkdir(directory);
    git(directory, ['init', '--quiet']);
    git(directory, ['config', 'user.name', 'Sync Test']);
    git(directory, ['config', 'user.email', 'sync@example.invalid']);
    git(directory, ['config', 'core.autocrlf', 'false']);
  }
  async function write(directory, name, data) {
    await fs.mkdir(path.dirname(path.join(directory, name)), { recursive: true });
    await fs.writeFile(path.join(directory, name), data);
  }
  function commit(directory) {
    git(directory, ['add', '.']); git(directory, ['commit', '--quiet', '-m', 'fixture']);
    return git(directory, ['rev-parse', 'HEAD']).toString().trim();
  }
  const original = metadata + 'first\nmiddle\nlast\n';
  await write(repo, 'skills/example/SKILL.md', original);
  await write(repo, 'skills/example/removed.txt', 'remove me');
  await write(root, 'public/example/SKILL.md', original);
  await write(root, 'public/example/removed.txt', 'remove me');
  const base = commit(repo);
  const manifest = { version: 1, sources: { upstream: { url: 'https://github.com/test/skills.git', ref: 'main' } },
    skills: { example: { source: 'upstream', path: 'skills/example', mode: 'merge' } } };
  const lock = { version: 1, skills: { example: { source: 'upstream', path: 'skills/example', commit: base } } };
  async function save() {
    await write(root, 'upstream.sources.json', JSON.stringify(manifest));
    await write(root, 'upstream.lock.json', JSON.stringify(lock));
  }
  await save(); commit(root);
  const openSource = async () => ({ repo, commit: git(repo, ['rev-parse', 'HEAD']).toString().trim(), ensureCommit() {} });
  return { root, repo, base, manifest, lock, save, write, commit, openSource };
}

test('dry run is read-only; apply syncs full directories, advances lock, and is idempotent', async (t) => {
  const f = await fixture(t);
  await f.write(f.root, 'public/example/SKILL.md', metadata + 'local first\nmiddle\nlast\n');
  await f.write(f.repo, 'skills/example/SKILL.md', metadata + 'first\nmiddle\nremote last\n');
  await fs.unlink(path.join(f.repo, 'skills/example/removed.txt'));
  await f.write(f.repo, 'skills/example/assets/new.bin', Buffer.from([0, 2]));
  const next = f.commit(f.repo);
  const before = await fs.readFile(path.join(f.root, 'upstream.lock.json'), 'utf8');
  const dry = await runSync({ ...f });
  assert.equal(dry.results[0].status, 'updated');
  assert.equal(await fs.readFile(path.join(f.root, 'upstream.lock.json'), 'utf8'), before);
  assert.equal((await fs.readFile(path.join(f.root, 'public/example/SKILL.md'), 'utf8')).includes('remote last'), false);
  const applied = await runSync({ ...f, apply: true });
  assert.equal(applied.failed, false);
  assert.equal((await fs.readFile(path.join(f.root, 'public/example/SKILL.md'), 'utf8')).includes('local first\nmiddle\nremote last'), true);
  await assert.rejects(fs.access(path.join(f.root, 'public/example/removed.txt')));
  assert.deepEqual(await fs.readFile(path.join(f.root, 'public/example/assets/new.bin')), Buffer.from([0, 2]));
  assert.equal(JSON.parse(await fs.readFile(path.join(f.root, 'upstream.lock.json'), 'utf8')).skills.example.commit, next);
  assert.equal((await runSync({ ...f, apply: true })).changed, false);
});

test('conflicts and invalid upstream metadata retain files and baseline', async (t) => {
  const f = await fixture(t);
  const local = metadata + 'local first\nmiddle\nlast\n';
  await f.write(f.root, 'public/example/SKILL.md', local);
  await f.write(f.repo, 'skills/example/SKILL.md', metadata + 'remote first\nmiddle\nlast\n');
  f.commit(f.repo);
  const result = await runSync({ ...f, apply: true });
  assert.equal(result.results[0].status, 'conflict');
  assert.equal(result.failed, true);
  assert.equal(await fs.readFile(path.join(f.root, 'public/example/SKILL.md'), 'utf8'), local);
  assert.equal(JSON.parse(await fs.readFile(path.join(f.root, 'upstream.lock.json'), 'utf8')).skills.example.commit, f.base);
  await f.write(f.repo, 'skills/example/SKILL.md', '---\nname: broken\n---\n'); f.commit(f.repo);
  assert.equal((await runSync({ ...f, apply: true })).results[0].status, 'error');
  assert.equal(await fs.readFile(path.join(f.root, 'public/example/SKILL.md'), 'utf8'), local);
});

test('unrelated upstream commits do not churn lock files', async (t) => {
  const f = await fixture(t);
  await f.write(f.repo, 'unrelated.txt', 'change'); f.commit(f.repo);
  assert.equal((await runSync({ ...f, apply: true })).changed, false);
  assert.equal(JSON.parse(await fs.readFile(path.join(f.root, 'upstream.lock.json'), 'utf8')).skills.example.commit, f.base);
});

test('adoption requires explicit selection and an exact full-directory match', async (t) => {
  const f = await fixture(t);
  f.manifest.skills.example.mode = 'manual'; f.lock.skills = {}; await f.save();
  const options = { ...f, apply: true, adopt: ['example'] };
  await f.write(f.root, 'public/example/local.txt', 'custom');
  assert.equal((await runSync(options)).results[0].status, 'needs-baseline');
  await fs.unlink(path.join(f.root, 'public/example/local.txt'));
  assert.equal((await runSync({ ...f })).results[0].status, 'manual');
  assert.equal((await runSync(options)).results[0].status, 'adopted');
  assert.equal(JSON.parse(await fs.readFile(path.join(f.root, 'upstream.sources.json'), 'utf8')).skills.example.mode, 'merge');
});

test('verified historical source paths support upstream directory moves', async (t) => {
  const f = await fixture(t);
  await fs.rename(path.join(f.repo, 'skills'), path.join(f.repo, 'renamed'));
  await f.write(f.repo, 'renamed/example/new.txt', 'new'); f.commit(f.repo);
  f.manifest.skills.example.path = 'renamed/example'; await f.save();
  const result = await runSync({ ...f, apply: true });
  assert.equal(result.failed, false);
  assert.equal(await fs.readFile(path.join(f.root, 'public/example/new.txt'), 'utf8'), 'new');
});

test('reject upstream symlinks and case collisions without checking out their targets', async (t) => {
  const f = await fixture(t);
  const oid = git(f.repo, ['hash-object', '-w', '--stdin'], '../outside').toString().trim();
  git(f.repo, ['update-index', '--add', '--cacheinfo', `120000,${oid},skills/example/link`]);
  git(f.repo, ['commit', '--quiet', '-m', 'unsafe link']);
  const sha = git(f.repo, ['rev-parse', 'HEAD']).toString().trim();
  assert.throws(() => readGitSnapshot(f.repo, sha, 'skills/example'), /Unsafe upstream/);
  const result = await runSync({ ...f, apply: true });
  assert.equal(result.results[0].status, 'error');
});

test('source failures are reported, manual skills are untouched and Markdown is escaped', async (t) => {
  const f = await fixture(t);
  const result = await runSync({ ...f, openSource: async () => { throw new Error('source unavailable'); } });
  assert.equal(result.failed, true);
  assert.equal(result.results[0].detail, 'source unavailable');
  const report = renderReport({ apply: false, results: [{ name: 'example', status: 'conflict', detail: '<script>\n@all', warnings: ['[click](bad)'] }] });
  assert.equal(report.includes('<script>'), false);
  assert.equal(report.includes('[click]'), false);
  assert.equal(report.includes('@all'), false);
  assert.equal((await readLocalSnapshot(path.join(f.root, 'public/example'))).has('SKILL.md'), true);
});

test('failed directory swap restores original skill and leaves the baseline unchanged', async (t) => {
  const f = await fixture(t);
  await f.write(f.repo, 'skills/example/new.txt', 'new'); f.commit(f.repo);
  const rename = fs.rename;
  fs.rename = async (from, to) => {
    if (path.basename(from) === 'next' && to === path.join(f.root, 'public/example')) {
      throw new Error('Simulated directory swap failure');
    }
    return rename(from, to);
  };
  try {
    const result = await runSync({ ...f, apply: true });
    assert.equal(result.failed, true);
    assert.equal(result.results[0].detail, 'Simulated directory swap failure');
  } finally { fs.rename = rename; }
  assert.equal(await fs.readFile(path.join(f.root, 'public/example/removed.txt'), 'utf8'), 'remove me');
  await assert.rejects(fs.access(path.join(f.root, 'public/example/new.txt')));
  assert.equal(JSON.parse(await fs.readFile(path.join(f.root, 'upstream.lock.json'), 'utf8')).skills.example.commit, f.base);
  assert.equal((await fs.readdir(f.root)).some((name) => name.startsWith('.skill-stage-')), false);
});

test('a conflicting skill does not prevent an independent valid update', async (t) => {
  const f = await fixture(t);
  await fs.cp(path.join(f.repo, 'skills/example'), path.join(f.repo, 'skills/second'), { recursive: true });
  await fs.cp(path.join(f.root, 'public/example'), path.join(f.root, 'public/second'), { recursive: true });
  const base = f.commit(f.repo);
  f.manifest.skills.second = { source: 'upstream', path: 'skills/second', mode: 'merge' };
  f.lock.skills.second = { source: 'upstream', path: 'skills/second', commit: base };
  await f.save(); f.commit(f.root);
  await f.write(f.root, 'public/example/SKILL.md', metadata + 'local\n');
  await f.write(f.repo, 'skills/example/SKILL.md', metadata + 'remote\n');
  await f.write(f.repo, 'skills/second/asset.txt', 'new'); const next = f.commit(f.repo);
  const result = await runSync({ ...f, apply: true });
  assert.deepEqual(result.results.map(({ status }) => status), ['conflict', 'updated']);
  assert.equal(result.changed, true);
  assert.equal(result.failed, true);
  const lock = JSON.parse(await fs.readFile(path.join(f.root, 'upstream.lock.json'), 'utf8'));
  assert.equal(lock.skills.example.commit, f.base);
  assert.equal(lock.skills.second.commit, next);
  assert.equal(await fs.readFile(path.join(f.root, 'public/second/asset.txt'), 'utf8'), 'new');
});

test('file/directory replacements apply and preserve ignored local filesystem noise', async (t) => {
  const f = await fixture(t);
  await fs.unlink(path.join(f.repo, 'skills/example/removed.txt'));
  await f.write(f.repo, 'skills/example/removed.txt/child', 'now a directory');
  await f.write(f.root, 'public/example/.DS_Store', 'local noise');
  f.commit(f.repo);
  const result = await runSync({ ...f, apply: true });
  assert.equal(result.failed, false);
  assert.equal(await fs.readFile(path.join(f.root, 'public/example/removed.txt/child'), 'utf8'), 'now a directory');
  assert.equal(await fs.readFile(path.join(f.root, 'public/example/.DS_Store'), 'utf8'), 'local noise');
});

test('mode-only changes are merged and non-UTF8 binary edits never enter a text merge', async () => {
  const base = snap({ 'run.sh': '#!/bin/sh\n', binary: Buffer.from([255, 1]) });
  const local = snap({ 'run.sh': '#!/bin/sh\n', binary: Buffer.from([255, 2]) });
  const upstream = snap({ 'run.sh': '#!/bin/sh\n', binary: Buffer.from([255, 3]) });
  upstream.get('run.sh').mode = '100755';
  const result = await mergeSnapshots(base, local, upstream);
  assert.equal(result.merged.get('run.sh').mode, '100755');
  assert.deepEqual(result.conflicts, ['binary']);
});
