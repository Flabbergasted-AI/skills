import path from 'node:path';
import os from 'node:os';
import fs from 'fs-extra';
import type { InstallTarget, SkillMeta } from '../types.js';
import { loadInstalled, saveInstalled } from './config.js';

export interface InstallResult {
  skill: string;
  target: string;
  targetPath: string;
  success: boolean;
  error?: string;
}

interface GitHubContentEntry {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
}

function parseRegistryUrl(registryUrl: string): { owner: string; repo: string; branch: string } | null {
  // https://raw.githubusercontent.com/{owner}/{repo}/{branch}/index.json
  const match = registryUrl.match(
    /raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\//,
  );
  if (match) return { owner: match[1], repo: match[2], branch: match[3] };
  return null;
}

async function downloadFromGitHub(
  skillPath: string,
  registryUrl: string,
  destDir: string,
): Promise<void> {
  const repoInfo = parseRegistryUrl(registryUrl);
  if (!repoInfo) {
    throw new Error('Cannot determine GitHub repo from registry URL');
  }

  const { owner, repo, branch } = repoInfo;
  await downloadDirRecursive(owner, repo, branch, skillPath, destDir);
}

async function downloadDirRecursive(
  owner: string,
  repo: string,
  branch: string,
  dirPath: string,
  localDir: string,
): Promise<void> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${dirPath}?ref=${branch}`;
  const response = await fetch(apiUrl, {
    headers: { 'User-Agent': 'flabbergasted-skills-cli' },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const entries = (await response.json()) as GitHubContentEntry[];
  await fs.ensureDir(localDir);

  for (const entry of entries) {
    const localPath = path.join(localDir, entry.name);
    if (entry.type === 'file' && entry.download_url) {
      const fileResp = await fetch(entry.download_url);
      if (!fileResp.ok) {
        throw new Error(`Failed to download ${entry.name}: ${fileResp.status}`);
      }
      const content = Buffer.from(await fileResp.arrayBuffer());
      await fs.writeFile(localPath, content);
    } else if (entry.type === 'dir') {
      await downloadDirRecursive(owner, repo, branch, entry.path, localPath);
    }
  }
}

export async function installSkill(
  skill: SkillMeta,
  sourceBase: string,
  targets: InstallTarget[],
  registryUrl?: string,
): Promise<InstallResult[]> {
  const results: InstallResult[] = [];
  let sourcePath = path.join(sourceBase, skill.path);
  let tempDir: string | null = null;

  if (!(await fs.pathExists(sourcePath))) {
    if (!registryUrl) {
      return targets.map((t) => ({
        skill: skill.name,
        target: t.id,
        targetPath: t.path,
        success: false,
        error: `Source not found: ${sourcePath}`,
      }));
    }

    // Download from remote
    tempDir = path.join(os.tmpdir(), `skills-install-${skill.name}-${Date.now()}`);
    try {
      await downloadFromGitHub(skill.path, registryUrl, tempDir);
      sourcePath = tempDir;
    } catch (err) {
      await fs.remove(tempDir).catch(() => {});
      return targets.map((t) => ({
        skill: skill.name,
        target: t.id,
        targetPath: t.path,
        success: false,
        error: `Remote download failed: ${err instanceof Error ? err.message : String(err)}`,
      }));
    }
  }

  for (const target of targets) {
    const destPath = path.join(target.path, skill.name);
    try {
      await fs.ensureDir(target.path);
      await fs.copy(sourcePath, destPath, { overwrite: true });
      results.push({
        skill: skill.name,
        target: target.id,
        targetPath: destPath,
        success: true,
      });
    } catch (err) {
      results.push({
        skill: skill.name,
        target: target.id,
        targetPath: destPath,
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  if (tempDir) {
    await fs.remove(tempDir).catch(() => {});
  }

  // Update installed manifest
  const installed = await loadInstalled();
  installed[skill.name] = {
    installedAt: new Date().toISOString(),
    version: '1.0.0',
    source: 'flabbergasted',
    targets: results.filter((r) => r.success).map((r) => r.target),
  };
  await saveInstalled(installed);

  return results;
}

export async function uninstallSkill(
  skillName: string,
  targets: InstallTarget[],
): Promise<InstallResult[]> {
  const results: InstallResult[] = [];

  for (const target of targets) {
    const destPath = path.join(target.path, skillName);
    try {
      if (await fs.pathExists(destPath)) {
        await fs.remove(destPath);
        results.push({ skill: skillName, target: target.id, targetPath: destPath, success: true });
      } else {
        results.push({
          skill: skillName,
          target: target.id,
          targetPath: destPath,
          success: false,
          error: 'Not installed at this target',
        });
      }
    } catch (err) {
      results.push({
        skill: skillName,
        target: target.id,
        targetPath: destPath,
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // Update manifest
  const installed = await loadInstalled();
  if (installed[skillName]) {
    const successTargets = results.filter((r) => r.success).map((r) => r.target);
    installed[skillName].targets = installed[skillName].targets.filter(
      (t: string) => !successTargets.includes(t),
    );
    if (installed[skillName].targets.length === 0) {
      delete installed[skillName];
    }
    await saveInstalled(installed);
  }

  return results;
}
