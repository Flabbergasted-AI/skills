import path from 'node:path';
import fs from 'fs-extra';
import matter from 'gray-matter';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export async function validateSkill(skillPath: string): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const resolved = path.resolve(skillPath);

  if (!(await fs.pathExists(resolved))) {
    return { valid: false, errors: ['Skill directory does not exist'], warnings };
  }

  if (!(await fs.stat(resolved)).isDirectory()) {
    return { valid: false, errors: ['Path is not a directory'], warnings };
  }

  const skillMd = path.join(resolved, 'SKILL.md');
  if (!(await fs.pathExists(skillMd))) {
    errors.push('SKILL.md not found');
    return { valid: false, errors, warnings };
  }

  const content = await fs.readFile(skillMd, 'utf-8');

  // Check for frontmatter
  if (content.startsWith('---')) {
    const { data } = matter(content);
    if (!data.name) errors.push('Frontmatter missing "name" field');
    if (!data.description) errors.push('Frontmatter missing "description" field');
    if (data.name && !/^[a-z0-9-]+$/.test(data.name)) {
      errors.push('Skill name must be kebab-case (lowercase, digits, hyphens)');
    }
    if (data.description && data.description.length < 20) {
      warnings.push('Description is very short; consider making it more descriptive');
    }
  } else if (content.startsWith('|')) {
    // Table-format frontmatter (older style)
    const hasName = /\*\*name\*\*/.test(content);
    const hasDesc = /\*\*description\*\*/.test(content);
    if (!hasName) errors.push('Table frontmatter missing "name" field');
    if (!hasDesc) errors.push('Table frontmatter missing "description" field');
  } else {
    errors.push('SKILL.md must start with YAML frontmatter (---) or table metadata');
  }

  // Check directory name matches
  const dirName = path.basename(resolved);
  if (content.startsWith('---')) {
    const { data } = matter(content);
    if (data.name && data.name !== dirName) {
      warnings.push(`Directory name "${dirName}" doesn't match skill name "${data.name}"`);
    }
  }

  // Check line count
  const lineCount = content.split('\n').length;
  if (lineCount > 500) {
    warnings.push(`SKILL.md is ${lineCount} lines (recommended: <500). Consider splitting to references/`);
  }

  return { valid: errors.length === 0, errors, warnings };
}
