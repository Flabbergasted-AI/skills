import { execSync } from 'node:child_process';
import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';

const PACKAGE_NAME = '@flabbergasted-ai/skills';

interface NpmRegistryResponse {
  'dist-tags': { latest: string };
  versions: Record<string, unknown>;
}

type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
type InstallMethod =
  | { type: 'global'; pm: PackageManager }
  | { type: 'runner'; pm: 'npx' | 'pnpm-dlx' | 'bunx' | 'yarn-dlx' };

async function fetchLatestVersion(): Promise<string> {
  const response = await fetch(`https://registry.npmjs.org/${PACKAGE_NAME}`);
  if (!response.ok) {
    throw new Error(`npm registry error: ${response.status}`);
  }
  const data = (await response.json()) as NpmRegistryResponse;
  return data['dist-tags'].latest;
}

function parseVersion(version: string): number[] {
  return version.replace(/^v/, '').split('.').map(Number);
}

function isNewer(latest: string, current: string): boolean {
  const [lMajor, lMinor, lPatch] = parseVersion(latest);
  const [cMajor, cMinor, cPatch] = parseVersion(current);

  if (lMajor !== cMajor) return lMajor > cMajor;
  if (lMinor !== cMinor) return lMinor > cMinor;
  return lPatch > cPatch;
}

function commandExists(cmd: string): boolean {
  try {
    execSync(`command -v ${cmd}`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function isGloballyInstalledVia(pm: PackageManager): boolean {
  try {
    switch (pm) {
      case 'npm': {
        const out = execSync('npm list -g --depth=0 --json 2>/dev/null', { encoding: 'utf-8' });
        return !!JSON.parse(out).dependencies?.[PACKAGE_NAME];
      }
      case 'pnpm': {
        const out = execSync('pnpm list -g --json 2>/dev/null', { encoding: 'utf-8' });
        const list = JSON.parse(out);
        const deps = Array.isArray(list) ? list[0]?.dependencies : list?.dependencies;
        return !!deps?.[PACKAGE_NAME];
      }
      case 'yarn': {
        const out = execSync('yarn global list --json 2>/dev/null', { encoding: 'utf-8' });
        return out.includes(PACKAGE_NAME);
      }
      case 'bun': {
        const out = execSync('bun pm ls -g 2>/dev/null', { encoding: 'utf-8' });
        return out.includes(PACKAGE_NAME);
      }
    }
  } catch {
    return false;
  }
}

function detectInstallMethod(): InstallMethod {
  const managers: PackageManager[] = ['npm', 'pnpm', 'bun', 'yarn'];
  for (const pm of managers) {
    if (commandExists(pm) && isGloballyInstalledVia(pm)) {
      return { type: 'global', pm };
    }
  }

  // Not globally installed — detect which runner invoked us
  const execPath = process.env._ || '';
  if (execPath.includes('bunx') || process.env.BUN_INSTALL) {
    return { type: 'runner', pm: 'bunx' };
  }
  if (execPath.includes('pnpm') || execPath.includes('pnpm-dlx')) {
    return { type: 'runner', pm: 'pnpm-dlx' };
  }
  if (execPath.includes('yarn')) {
    return { type: 'runner', pm: 'yarn-dlx' };
  }
  return { type: 'runner', pm: 'npx' };
}

function getGlobalInstallCmd(pm: PackageManager): string {
  switch (pm) {
    case 'npm': return `npm install -g ${PACKAGE_NAME}@latest`;
    case 'pnpm': return `pnpm add -g ${PACKAGE_NAME}@latest`;
    case 'yarn': return `yarn global add ${PACKAGE_NAME}@latest`;
    case 'bun': return `bun add -g ${PACKAGE_NAME}@latest`;
  }
}

function getRunnerHint(pm: InstallMethod & { type: 'runner' }): string[] {
  switch (pm.pm) {
    case 'npx':
      return [
        'You\'re using npx. Next run will automatically use the latest version.',
        `To clear cache: ${chalk.cyan(`npx --yes ${PACKAGE_NAME}@latest --version`)}`,
      ];
    case 'pnpm-dlx':
      return [
        'You\'re using pnpm dlx. Next run will use the latest version.',
        `Run: ${chalk.cyan(`pnpm dlx ${PACKAGE_NAME}@latest --version`)}`,
      ];
    case 'bunx':
      return [
        'You\'re using bunx. Next run will use the latest version.',
        `Run: ${chalk.cyan(`bunx ${PACKAGE_NAME}@latest --version`)}`,
      ];
    case 'yarn-dlx':
      return [
        'You\'re using yarn dlx. Next run will use the latest version.',
        `Run: ${chalk.cyan(`yarn dlx ${PACKAGE_NAME}@latest --version`)}`,
      ];
  }
}

export function registerUpgradeCommand(program: Command) {
  program
    .command('upgrade')
    .description('Check for and install CLI updates')
    .option('-c, --check', 'Only check for updates, do not install')
    .action(async (opts) => {
      const { default: packageJson } = await import('../../package.json', { with: { type: 'json' } });
      const currentVersion = packageJson.version;

      const spinner = ora('Checking for updates...').start();

      let latestVersion: string;
      try {
        latestVersion = await fetchLatestVersion();
      } catch (err) {
        spinner.fail('Failed to check for updates');
        console.error(chalk.dim(`  ${err instanceof Error ? err.message : String(err)}`));
        process.exit(1);
      }

      if (!isNewer(latestVersion, currentVersion)) {
        spinner.succeed(`Already up to date ${chalk.dim(`(v${currentVersion})`)}`);
        return;
      }

      spinner.info(
        `Update available: ${chalk.dim(`v${currentVersion}`)} → ${chalk.green(`v${latestVersion}`)}`,
      );

      if (opts.check) {
        console.log(`\n  Run ${chalk.cyan('skills upgrade')} to install the update.\n`);
        return;
      }

      const method = detectInstallMethod();
      const installSpinner = ora(`Upgrading to v${latestVersion}...`).start();

      try {
        if (method.type === 'global') {
          const cmd = getGlobalInstallCmd(method.pm);
          execSync(cmd, { stdio: 'pipe' });
          installSpinner.succeed(
            `Upgraded to ${chalk.green(`v${latestVersion}`)} via ${chalk.dim(method.pm)} ${chalk.dim('(global)')}`,
          );
        } else {
          installSpinner.succeed(`Update available: ${chalk.green(`v${latestVersion}`)}`);
          const hints = getRunnerHint(method);
          console.log();
          for (const hint of hints) {
            console.log(`  ${hint}`);
          }
          console.log();
        }
      } catch (err) {
        installSpinner.fail('Upgrade failed');
        console.error(chalk.dim(`  ${err instanceof Error ? err.message : String(err)}`));
        console.log(`\n  Try manually: ${chalk.cyan(getGlobalInstallCmd(method.type === 'global' ? method.pm : 'npm'))}\n`);
        process.exit(1);
      }
    });
}
