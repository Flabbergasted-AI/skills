import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { loadConfig } from '../lib/config.js';
import { loadInstalled } from '../lib/config.js';
import { uninstallSkill } from '../lib/installer.js';
import { resolveTargets, detectTargets } from '../lib/targets.js';

export function registerUninstallCommand(program: Command) {
  program
    .command('uninstall <names...>')
    .description('Uninstall one or more skills')
    .option('-t, --target <id>', 'Uninstall from specific target')
    .action(async (names: string[], opts) => {
      const config = await loadConfig();
      const installed = await loadInstalled();

      for (const name of names) {
        if (!installed[name]) {
          console.log(chalk.yellow(`  ⚠ Skill "${name}" is not in installed manifest`));
        }

        let targets;
        if (opts.target) {
          targets = resolveTargets([opts.target], config.customTargets, false);
        } else {
          // Uninstall from all detected targets
          targets = detectTargets(config.customTargets).filter((t) => t.detected);
        }

        const spinner = ora(`Uninstalling ${chalk.cyan(name)}...`).start();
        const results = await uninstallSkill(name, targets);

        const successes = results.filter((r) => r.success);
        if (successes.length > 0) {
          spinner.succeed(`${chalk.cyan(name)} removed from ${successes.length} target(s)`);
          for (const r of successes) {
            console.log(`     → ${chalk.dim(r.targetPath)}`);
          }
        } else {
          spinner.info(`${chalk.cyan(name)} was not found in any target`);
        }
      }
      console.log();
    });
}
