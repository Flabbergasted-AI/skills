import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { loadConfig, loadInstalled } from '../lib/config.js';
import {
  loadLockFile,
  saveLockFile,
  updateLockEntry,
  removeLockEntry,
  fetchHeadCommit,
  getLockfilePath,
  type LockFile,
} from '../lib/lockfile.js';
import { parseRegistryUrl } from '../lib/installer.js';

export function registerLockCommand(program: Command) {
  const lockCmd = program
    .command('lock')
    .description('Manage skills.lock file for version pinning');

  lockCmd
    .command('create')
    .description('Create skills.lock from currently installed skills')
    .action(async () => {
      const config = await loadConfig();
      const installed = await loadInstalled();
      const names = Object.keys(installed);

      if (names.length === 0) {
        console.log(chalk.yellow('No skills installed. Nothing to lock.'));
        return;
      }

      const registryUrl = config.registries[0]?.url;
      const repoInfo = registryUrl ? parseRegistryUrl(registryUrl) : null;

      const spinner = ora('Creating skills.lock...').start();
      const lockDir = process.cwd();

      let commitHash: string | undefined;
      if (repoInfo) {
        try {
          commitHash = await fetchHeadCommit(repoInfo.owner, repoInfo.repo, repoInfo.branch);
        } catch {
          spinner.warn('Could not fetch commit hash from GitHub');
        }
      }

      for (const name of names) {
        const info = installed[name];
        const commit = info.commit || commitHash || 'unknown';
        await updateLockEntry(lockDir, name, commit, info.source || 'flabbergasted');
      }

      spinner.succeed(`Created ${chalk.cyan('skills.lock')} with ${names.length} skill(s)`);
      console.log(chalk.dim(`  Path: ${getLockfilePath(lockDir)}`));
      if (commitHash) {
        console.log(chalk.dim(`  Commit: ${commitHash.slice(0, 7)}`));
      }
      console.log();
    });

  lockCmd
    .command('show')
    .description('Show contents of skills.lock')
    .action(async () => {
      const lockDir = process.cwd();
      const lockfile = await loadLockFile(lockDir);

      if (!lockfile) {
        console.log(chalk.yellow('No skills.lock found in current directory.'));
        console.log(chalk.dim('  Run "skills lock create" to create one.'));
        return;
      }

      const entries = Object.entries(lockfile.skills);
      if (entries.length === 0) {
        console.log(chalk.yellow('skills.lock is empty.'));
        return;
      }

      console.log(chalk.bold(`\n🔒 skills.lock (${entries.length} skill(s)):\n`));
      for (const [name, entry] of entries) {
        console.log(`  ${chalk.cyan(name)}`);
        console.log(`    commit:  ${chalk.dim(entry.commit)}`);
        console.log(`    locked:  ${chalk.dim(entry.installedAt.slice(0, 10))}`);
        console.log(`    source:  ${chalk.dim(entry.source)}`);
      }
      console.log();
    });

  lockCmd
    .command('remove <names...>')
    .description('Remove skills from the lock file')
    .action(async (names: string[]) => {
      const lockDir = process.cwd();

      for (const name of names) {
        await removeLockEntry(lockDir, name);
        console.log(chalk.green(`✓ Unlocked ${chalk.cyan(name)}`));
      }
    });

  lockCmd
    .command('update [names...]')
    .description('Update lock entries to latest commit')
    .action(async (names: string[]) => {
      const config = await loadConfig();
      const lockDir = process.cwd();
      const lockfile = await loadLockFile(lockDir);

      if (!lockfile) {
        console.log(chalk.yellow('No skills.lock found. Run "skills lock create" first.'));
        return;
      }

      const toUpdate = names.length > 0
        ? names
        : Object.keys(lockfile.skills);

      if (toUpdate.length === 0) {
        console.log(chalk.yellow('No skills to update in lock file.'));
        return;
      }

      const registryUrl = config.registries[0]?.url;
      const repoInfo = registryUrl ? parseRegistryUrl(registryUrl) : null;

      if (!repoInfo) {
        console.error(chalk.red('✗ Cannot determine repository info from registry URL.'));
        return;
      }

      const spinner = ora('Fetching latest commit...').start();
      let commitHash: string;
      try {
        commitHash = await fetchHeadCommit(repoInfo.owner, repoInfo.repo, repoInfo.branch);
      } catch (err) {
        spinner.fail('Failed to fetch latest commit');
        console.error(chalk.dim(`  ${err instanceof Error ? err.message : String(err)}`));
        return;
      }

      for (const name of toUpdate) {
        if (!lockfile.skills[name]) {
          console.log(chalk.yellow(`  ⚠ ${name} not in lock file, skipping`));
          continue;
        }
        const oldCommit = lockfile.skills[name].commit;
        await updateLockEntry(lockDir, name, commitHash, lockfile.skills[name].source);
        if (oldCommit !== commitHash) {
          console.log(`  ${chalk.cyan(name)}: ${chalk.dim(oldCommit.slice(0, 7))} → ${chalk.green(commitHash.slice(0, 7))}`);
        } else {
          console.log(`  ${chalk.cyan(name)}: ${chalk.dim('already up to date')}`);
        }
      }

      spinner.succeed(`Updated ${toUpdate.length} lock entry(ies)`);
      console.log();
    });
}
