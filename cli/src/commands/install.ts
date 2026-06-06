import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { loadConfig } from '../lib/config.js';
import { fetchIndex, loadLocalIndex } from '../lib/registry.js';
import { installSkill } from '../lib/installer.js';
import { resolveTargets, getProjectTargets } from '../lib/targets.js';

export function registerInstallCommand(program: Command) {
  program
    .command('install <names...>')
    .description('Install one or more skills')
    .option('-t, --target <id>', 'Install target (claude/cursor/agents/all)')
    .option('-p, --path <dir>', 'Custom install path')
    .option('--project', 'Install to project-level .claude/skills/')
    .option('--source <dir>', 'Local source directory (default: repo root)')
    .action(async (names: string[], opts) => {
      const config = await loadConfig();

      let index;
      try {
        index = await fetchIndex(config.registries[0].url);
      } catch {
        try {
          index = await loadLocalIndex('./index.json');
        } catch {
          console.error(chalk.red('✗ No index available. Run "skills index build" first.'));
          process.exit(1);
        }
      }

      let targets;
      if (opts.path) {
        targets = [{ id: 'custom', path: opts.path, detected: true }];
      } else if (opts.project) {
        targets = getProjectTargets(process.cwd());
      } else if (opts.target) {
        targets = resolveTargets([opts.target], config.customTargets, config.autoDetect);
      } else {
        targets = resolveTargets(config.defaultTargets, config.customTargets, config.autoDetect);
      }

      if (targets.length === 0) {
        console.error(chalk.red('✗ No valid install targets found.'));
        console.log(chalk.dim('  Run "skills targets" to see available targets.'));
        process.exit(1);
      }

      console.log(chalk.bold('\n🔍 Install targets:'));
      for (const t of targets) {
        console.log(`   ${chalk.green('✓')} ${t.id} → ${chalk.dim(t.path)}`);
      }
      console.log();

      const sourceBase = opts.source || findRepoRoot();
      const registryUrl = config.registries[0]?.url;

      for (const name of names) {
        const skill = index.skills.find((s) => s.name === name);
        if (!skill) {
          console.log(chalk.red(`   ✗ Skill "${name}" not found in index`));
          continue;
        }

        const spinner = ora(`Installing ${chalk.cyan(name)}...`).start();
        const results = await installSkill(skill, sourceBase, targets, registryUrl);

        const successes = results.filter((r) => r.success);
        const failures = results.filter((r) => !r.success);

        if (successes.length > 0) {
          spinner.succeed(`${chalk.cyan(name)} installed to ${successes.length} target(s)`);
          for (const r of successes) {
            console.log(`     → ${chalk.dim(r.targetPath)}`);
          }
        }
        if (failures.length > 0) {
          for (const r of failures) {
            console.log(`     ${chalk.red('✗')} ${r.target}: ${chalk.dim(r.error)}`);
          }
          if (successes.length === 0) {
            spinner.fail(`Failed to install ${chalk.cyan(name)}`);
          }
        }
      }
      console.log();
    });
}

function findRepoRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  let dir = path.dirname(__filename);
  for (let i = 0; i < 6; i++) {
    dir = path.dirname(dir);
    if (existsSync(path.join(dir, 'public')) && existsSync(path.join(dir, 'index.json'))) {
      return dir;
    }
    if (existsSync(path.join(dir, 'public'))) {
      return dir;
    }
  }
  return process.cwd();
}
