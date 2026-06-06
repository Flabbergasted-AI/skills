import { Command } from 'commander';
import chalk from 'chalk';
import { packageSkill } from '../lib/packager.js';
import { validateSkill } from '../lib/validator.js';

export function registerPackageCommand(program: Command) {
  program
    .command('package <path>')
    .description('Package a skill into a .skill file')
    .option('-o, --output <dir>', 'Output directory')
    .action(async (skillPath: string, opts) => {
      console.log(chalk.bold(`\n📦 Packaging: ${skillPath}\n`));

      // Validate first
      const validation = await validateSkill(skillPath);
      if (!validation.valid) {
        console.error(chalk.red('  ✗ Validation failed:'));
        for (const err of validation.errors) {
          console.error(chalk.red(`    ${err}`));
        }
        console.error(chalk.dim('\n  Fix errors before packaging.\n'));
        process.exit(1);
      }
      console.log(chalk.green('  ✓ Validation passed'));

      const result = await packageSkill(skillPath, opts.output);
      if (result.success) {
        console.log(chalk.green(`  ✓ Packaged to: ${result.outputPath}\n`));
      } else {
        console.error(chalk.red(`  ✗ ${result.error}\n`));
        process.exit(1);
      }
    });
}
