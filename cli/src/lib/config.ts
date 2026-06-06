import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import type { SkillsConfig } from '../types.js';
import { DEFAULT_CONFIG } from '../types.js';

const CONFIG_DIR = path.join(os.homedir(), '.skills');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const INSTALLED_FILE = path.join(CONFIG_DIR, 'installed.json');

export async function loadConfig(): Promise<SkillsConfig> {
  try {
    if (await fs.pathExists(CONFIG_FILE)) {
      const data = await fs.readJson(CONFIG_FILE);
      return { ...DEFAULT_CONFIG, ...data };
    }
  } catch {
    // ignore parse errors, use defaults
  }
  return { ...DEFAULT_CONFIG };
}

export async function saveConfig(config: SkillsConfig): Promise<void> {
  await fs.ensureDir(CONFIG_DIR);
  await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
}

export async function updateConfig(updates: Partial<SkillsConfig>): Promise<SkillsConfig> {
  const config = await loadConfig();
  const merged = { ...config, ...updates };
  await saveConfig(merged);
  return merged;
}

export async function loadInstalled(): Promise<Record<string, any>> {
  try {
    if (await fs.pathExists(INSTALLED_FILE)) {
      return await fs.readJson(INSTALLED_FILE);
    }
  } catch {
    // ignore
  }
  return {};
}

export async function saveInstalled(manifest: Record<string, any>): Promise<void> {
  await fs.ensureDir(CONFIG_DIR);
  await fs.writeJson(INSTALLED_FILE, manifest, { spaces: 2 });
}

export function getConfigDir(): string {
  return CONFIG_DIR;
}
