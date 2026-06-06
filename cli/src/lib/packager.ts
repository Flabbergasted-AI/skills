import path from 'node:path';
import fs from 'fs-extra';
import AdmZip from 'adm-zip';

export interface PackageResult {
  success: boolean;
  outputPath?: string;
  error?: string;
}

export async function packageSkill(skillPath: string, outputDir?: string): Promise<PackageResult> {
  const resolved = path.resolve(skillPath);

  if (!(await fs.pathExists(resolved))) {
    return { success: false, error: `Skill directory not found: ${resolved}` };
  }

  const skillName = path.basename(resolved);
  const outDir = outputDir ? path.resolve(outputDir) : process.cwd();
  await fs.ensureDir(outDir);

  const outputPath = path.join(outDir, `${skillName}.skill`);

  try {
    const zip = new AdmZip();

    const addDirToZip = async (dirPath: string, zipPrefix: string) => {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        const zipPath = path.join(zipPrefix, entry.name);
        if (entry.isDirectory()) {
          await addDirToZip(fullPath, zipPath);
        } else {
          zip.addLocalFile(fullPath, path.dirname(zipPath), entry.name);
        }
      }
    };

    await addDirToZip(resolved, skillName);
    zip.writeZip(outputPath);

    return { success: true, outputPath };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
