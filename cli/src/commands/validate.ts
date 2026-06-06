import { Command } from 'commander';
import chalk from 'chalk';
import { validateSkill } from '../lib/validator.js';

export function registerValidateCommand(program: Command) {
  program
    .command('validate <path>')
    .description('Validate a skill directory structure')
    .action(async (skillPath: string) => {
      console.log(chalk.bold(`\n🔍 Validating: ${skillPath}\n`));

      const result = await validateSkill(skillPath);

      if (result.errors.length > 0) {
        console.log(chalk.red('  Errors:'));
        for (const err of result.errors) {
          console.log(chalk.red(`    ✗ ${err}`));
        }
      }

      if (result.warnings.length > 0) {
        console.log(chalk.yellow('  Warnings:'));
        for (const warn of result.warnings) {
          console.log(chalk.yellow(`    ⚠ ${warn}`));
        }
      }

      if (result.valid) {
        console.log(chalk.green('  ✓ Skill is valid\n'));
      } else {
        console.log(chalk.red('\n  ✗ Validation failed\n'));
        process.exit(1);
      }
    });
}
