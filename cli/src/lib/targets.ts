import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import type { InstallTarget } from '../types.js';

const BUILTIN_TARGETS: Record<string, string> = {
  claude: path.join(os.homedir(), '.claude', 'skills'),
  cursor: path.join(os.homedir(), '.cursor', 'skills'),
  agents: path.join(os.homedir(), '.agents', 'skills'),
  codex: path.join(os.homedir(), '.codex', 'skills'),
  aider: path.join(os.homedir(), '.aider', 'skills'),
  continue: path.join(os.homedir(), '.continue', 'skills'),
};

export function getBuiltinTargets(): Record<string, string> {
  return { ...BUILTIN_TARGETS };
}

export function detectTargets(customTargets?: Record<string, { path: string }>): InstallTarget[] {
  const results: InstallTarget[] = [];

  for (const [id, skillsPath] of Object.entries(BUILTIN_TARGETS)) {
    const parentDir = path.dirname(skillsPath);
    results.push({
      id,
      path: skillsPath,
      detected: fs.existsSync(parentDir),
    });
  }

  if (customTargets) {
    for (const [id, { path: customPath }] of Object.entries(customTargets)) {
      const resolved = customPath.replace(/^~/, os.homedir());
      results.push({
        id,
        path: resolved,
        detected: true,
      });
    }
  }

  return results;
}

export function resolveTargets(
  targetIds: string[],
  customTargets?: Record<string, { path: string }>,
  autoDetect = true,
): InstallTarget[] {
  const all = detectTargets(customTargets);

  if (targetIds.includes('all')) {
    return autoDetect ? all.filter((t) => t.detected) : all;
  }

  return all.filter((t) => {
    if (!targetIds.includes(t.id)) return false;
    return autoDetect ? t.detected : true;
  });
}

export function getProjectTargets(cwd: string): InstallTarget[] {
  return [
    { id: 'project', path: path.join(cwd, '.claude', 'skills'), detected: true },
    { id: 'cursor-project', path: path.join(cwd, '.cursor', 'skills'), detected: true },
  ];
}
