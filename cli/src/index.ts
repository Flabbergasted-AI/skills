#!/usr/bin/env node

import { Command } from 'commander';
import { registerSearchCommand } from './commands/search.js';
import { registerInstallCommand } from './commands/install.js';
import { registerUninstallCommand } from './commands/uninstall.js';
import { registerUpdateCommand } from './commands/update.js';
import { registerInitCommand } from './commands/init.js';
import { registerValidateCommand } from './commands/validate.js';
import { registerPackageCommand } from './commands/package.js';
import { registerConfigCommand } from './commands/config.js';
import { registerIndexBuildCommand } from './commands/index-build.js';
import packageJson from '../package.json' with { type: 'json' };

const program = new Command();

program.name('skills').description('CLI tool for searching, installing, and managing AI agent skills').version(packageJson.version);

registerSearchCommand(program);
registerInstallCommand(program);
registerUninstallCommand(program);
registerUpdateCommand(program);
registerInitCommand(program);
registerValidateCommand(program);
registerPackageCommand(program);
registerConfigCommand(program);
registerIndexBuildCommand(program);

program.parse();
