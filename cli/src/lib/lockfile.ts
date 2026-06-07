import path from 'node:path';
import fs from 'fs-extra';

export interface LockEntry {
  commit: string;
  installedAt: string;
  source: string;
}

export interface LockFile {
  lockfileVersion: 1;
  skills: Record<string, LockEntry>;
}

const LOCKFILE_NAME = 'skills.lock';

function createEmptyLockFile(): LockFile {
  return { lockfileVersion: 1, skills: {} };
}

export function getLockfilePath(dir: string): string {
  return path.join(dir, LOCKFILE_NAME);
}

export async function loadLockFile(dir: string): Promise<LockFile | null> {
  const filePath = getLockfilePath(dir);
  try {
    if (await fs.pathExists(filePath)) {
      return await fs.readJson(filePath);
    }
  } catch {
    // corrupt lock file — treat as absent
  }
  return null;
}

export async function saveLockFile(dir: string, lockfile: LockFile): Promise<void> {
  const filePath = getLockfilePath(dir);
  await fs.writeJson(filePath, lockfile, { spaces: 2 });
}

export async function updateLockEntry(
  dir: string,
  skillName: string,
  commit: string,
  source: string,
): Promise<void> {
  let lockfile = await loadLockFile(dir);
  if (!lockfile) {
    lockfile = createEmptyLockFile();
  }
  lockfile.skills[skillName] = {
    commit,
    installedAt: new Date().toISOString(),
    source,
  };
  await saveLockFile(dir, lockfile);
}

export async function removeLockEntry(dir: string, skillName: string): Promise<void> {
  const lockfile = await loadLockFile(dir);
  if (!lockfile) return;
  delete lockfile.skills[skillName];
  await saveLockFile(dir, lockfile);
}

export function getLockEntry(lockfile: LockFile, skillName: string): LockEntry | undefined {
  return lockfile.skills[skillName];
}

export async function fetchHeadCommit(owner: string, repo: string, branch: string): Promise<string> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;
  const response = await fetch(apiUrl, {
    headers: { 'User-Agent': 'flabbergasted-skills-cli' },
  });
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as { sha: string };
  return data.sha;
}
