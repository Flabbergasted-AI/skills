import { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig, loadInstalled } from '../lib/config.js';
import { fetchIndex, loadLocalIndex } from '../lib/registry.js';

export function registerUpdateCommand(program: Command) {
  program
    .command('update [names...]')
    .description('Update installed skills (or specific ones)')
    .action(async (names: string[]) => {
      const installed = await loadInstalled();
      const skillNames = names.length > 0 ? names : Object.keys(installed);

      if (skillNames.length === 0) {
        console.log(chalk.yellow('No skills installed to update.'));
        return;
      }

      console.log(chalk.bold(`\n🔄 Updating ${skillNames.length} skill(s)...\n`));

      // Re-install is effectively an update (overwrite with latest)
      const { execSync } = await import('node:child_process');
      const args = skillNames.join(' ');
      try {
        execSync(`skills install ${args}`, { stdio: 'inherit' });
      } catch {
        console.log(chalk.dim('\n  Tip: update re-runs install with --overwrite.'));
      }
    });

  program
    .command('outdated')
    .description('Check which skills have updates available')
    .action(async () => {
      const config = await loadConfig();
      const installed = await loadInstalled();
      const names = Object.keys(installed);

      if (names.length === 0) {
        console.log(chalk.yellow('No skills installed.'));
        return;
      }

      let index;
      try {
        index = await fetchIndex(config.registries[0].url);
      } catch {
        index = await loadLocalIndex('./index.json');
      }

      console.log(chalk.bold('\n📋 Installed skills status:\n'));
      for (const name of names) {
        const inIndex = index.skills.find((s) => s.name === name);
        const info = installed[name];
        if (inIndex) {
          console.log(`  ${chalk.cyan(name)} ${chalk.dim(`installed: ${info.installedAt.slice(0, 10)}`)}`);
        } else {
          console.log(`  ${chalk.yellow(name)} ${chalk.dim('(not in registry)')}`);
        }
      }
      console.log();
    });
}
