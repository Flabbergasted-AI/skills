import fs from 'fs-extra';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import type { SkillIndex } from '../types.js';

const CACHE_DIR = path.join(os.homedir(), '.skills', 'cache');
const CACHE_TTL = 3600_000; // 1 hour
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function fetchIndex(registryUrl: string): Promise<SkillIndex> {
  const cacheFile = path.join(CACHE_DIR, 'index.json');

  if (await isCacheValid(cacheFile)) {
    return await fs.readJson(cacheFile);
  }

  const response = await fetch(registryUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch index: ${response.status} ${response.statusText}`);
  }

  const index = (await response.json()) as SkillIndex;
  await cacheIndex(cacheFile, index);
  return index;
}

export async function loadLocalIndex(indexPath: string): Promise<SkillIndex> {
  // Try given path first, then resolve relative to repo root
  const candidates = [
    path.resolve(indexPath),
    path.resolve(__dirname, '..', '..', '..', indexPath),
  ];
  for (const candidate of candidates) {
    if (await fs.pathExists(candidate)) {
      return await fs.readJson(candidate);
    }
  }
  throw new Error(`Index file not found: ${indexPath}`);
}

async function isCacheValid(cacheFile: string): Promise<boolean> {
  try {
    if (!(await fs.pathExists(cacheFile))) return false;
    const stat = await fs.stat(cacheFile);
    return Date.now() - stat.mtimeMs < CACHE_TTL;
  } catch {
    return false;
  }
}

async function cacheIndex(cacheFile: string, index: SkillIndex): Promise<void> {
  try {
    await fs.ensureDir(path.dirname(cacheFile));
    await fs.writeJson(cacheFile, index, { spaces: 2 });
  } catch {
    // cache write failure is non-fatal
  }
}

export async function clearCache(): Promise<void> {
  await fs.remove(CACHE_DIR);
}
