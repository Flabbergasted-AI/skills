import os from 'node:os';
import { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig, updateConfig } from '../lib/config.js';
import { detectTargets } from '../lib/targets.js';

export function registerConfigCommand(program: Command) {
  const configCmd = program
    .command('config')
    .description('View or modify CLI configuration');

  configCmd
    .command('show')
    .description('Show current configuration')
    .action(async () => {
      const config = await loadConfig();
      console.log(chalk.bold('\n⚙ Skills CLI Configuration:\n'));
      console.log(`  Default targets: ${chalk.cyan(config.defaultTargets.join(', '))}`);
      console.log(`  Auto-detect:     ${config.autoDetect ? chalk.green('enabled') : chalk.dim('disabled')}`);
      console.log(`  Registries:      ${config.registries.map((r) => r.name).join(', ')}`);

      if (Object.keys(config.customTargets).length > 0) {
        console.log(chalk.bold('\n  Custom targets:'));
        for (const [id, { path }] of Object.entries(config.customTargets)) {
          console.log(`    ${chalk.cyan(id)} → ${path}`);
        }
      }
      console.log();
    });

  configCmd
    .command('set <key> <value>')
    .description('Set a configuration value')
    .action(async (key: string, value: string) => {
      if (key === 'defaultTargets') {
        await updateConfig({ defaultTargets: value.split(',').map((s) => s.trim()) });
        console.log(chalk.green(`✓ Set defaultTargets = ${value}`));
      } else if (key === 'autoDetect') {
        await updateConfig({ autoDetect: value === 'true' });
        console.log(chalk.green(`✓ Set autoDetect = ${value}`));
      } else {
        console.error(chalk.red(`✗ Unknown config key: ${key}`));
        console.log(chalk.dim('  Available: defaultTargets, autoDetect'));
      }
    });

  configCmd
    .command('add-target <id> <path>')
    .description('Add a custom install target')
    .action(async (id: string, targetPath: string) => {
      const config = await loadConfig();
      const resolved = targetPath.replace(/^~/, os.homedir());
      config.customTargets[id] = { path: resolved };
      await updateConfig(config);
      console.log(chalk.green(`✓ Added target "${id}" → ${resolved}`));
    });

  configCmd
    .command('remove-target <id>')
    .description('Remove a custom install target')
    .action(async (id: string) => {
      const config = await loadConfig();
      if (!config.customTargets[id]) {
        console.error(chalk.red(`✗ Custom target "${id}" not found`));
        return;
      }
      delete config.customTargets[id];
      await updateConfig(config);
      console.log(chalk.green(`✓ Removed target "${id}"`));
    });

  // Top-level targets command
  program
    .command('targets')
    .description('List all install targets and their detection status')
    .action(async () => {
      const config = await loadConfig();
      const targets = detectTargets(config.customTargets);

      console.log(chalk.bold('\n📍 Install Targets:\n'));
      for (const t of targets) {
        const status = t.detected ? chalk.green('✓ detected') : chalk.dim('✗ not found');
        console.log(`   ${status}  ${chalk.cyan(t.id.padEnd(16))} ${chalk.dim(t.path)}`);
      }
      console.log();
    });
}
