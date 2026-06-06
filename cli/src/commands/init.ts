import path from 'node:path';
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';

const SKILL_TEMPLATE = `---
name: {{name}}
description: "TODO: Describe what this skill does and when to use it."
---

# {{title}}

TODO: Add skill instructions here.

## Quick Start

TODO: Add a minimal usage example.

## Resources

- \`references/\` — Reference documentation (loaded on demand)
- \`scripts/\` — Executable helper scripts
- \`assets/\` — Templates and output resources
`;

export function registerInitCommand(program: Command) {
  program
    .command('init <name>')
    .description('Create a new skill from template')
    .option('-p, --path <dir>', 'Output directory', './public')
    .action(async (name: string, opts) => {
      if (!/^[a-z0-9-]+$/.test(name)) {
        console.error(chalk.red('✗ Skill name must be kebab-case (lowercase, digits, hyphens)'));
        process.exit(1);
      }

      const outputDir = path.resolve(opts.path);
      const skillDir = path.join(outputDir, name);

      if (await fs.pathExists(skillDir)) {
        console.error(chalk.red(`✗ Directory already exists: ${skillDir}`));
        process.exit(1);
      }

      const title = name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      const content = SKILL_TEMPLATE.replace(/\{\{name\}\}/g, name).replace(/\{\{title\}\}/g, title);

      await fs.ensureDir(skillDir);
      await fs.writeFile(path.join(skillDir, 'SKILL.md'), content);
      await fs.ensureDir(path.join(skillDir, 'references'));
      await fs.ensureDir(path.join(skillDir, 'scripts'));
      await fs.ensureDir(path.join(skillDir, 'assets'));

      console.log(chalk.green(`\n✓ Created skill "${name}" at ${skillDir}\n`));
      console.log('  Structure:');
      console.log(`    ${chalk.cyan(name)}/`);
      console.log(`    ├── SKILL.md`);
      console.log(`    ├── references/`);
      console.log(`    ├── scripts/`);
      console.log(`    └── assets/`);
      console.log(`\n  Next: edit ${path.join(skillDir, 'SKILL.md')} to add content.\n`);
    });
}
