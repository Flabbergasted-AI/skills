import path from 'node:path';
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

export async function installSkill(
  skill: SkillMeta,
  sourceBase: string,
  targets: InstallTarget[],
): Promise<InstallResult[]> {
  const results: InstallResult[] = [];
  const sourcePath = path.join(sourceBase, skill.path);

  if (!(await fs.pathExists(sourcePath))) {
    return targets.map((t) => ({
      skill: skill.name,
      target: t.id,
      targetPath: t.path,
      success: false,
      error: `Source not found: ${sourcePath}`,
    }));
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
