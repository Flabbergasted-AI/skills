import { Command } from 'commander';
import chalk from 'chalk';
import { loadConfig } from '../lib/config.js';
import { fetchIndex, loadLocalIndex } from '../lib/registry.js';
import { searchSkills, filterByCategory, filterByTag } from '../lib/search.js';

export function registerSearchCommand(program: Command) {
  program
    .command('search [query]')
    .description('Search for skills by keyword')
    .option('-c, --category <category>', 'Filter by category')
    .option('-t, --tag <tag>', 'Filter by tag')
    .option('-l, --limit <n>', 'Max results to show', '20')
    .action(async (query, opts) => {
      const config = await loadConfig();
      const registry = config.registries[0];

      let index;
      try {
        index = await fetchIndex(registry.url);
      } catch {
        console.error(chalk.yellow('⚠ Cannot fetch remote index, trying local...'));
        try {
          index = await loadLocalIndex('./index.json');
        } catch {
          console.error(chalk.red('✗ No index available. Run "skills index build" first.'));
          process.exit(1);
        }
      }

      let results = index.skills;

      if (opts.category) {
        results = filterByCategory(results, opts.category);
      }
      if (opts.tag) {
        results = filterByTag(results, opts.tag);
      }
      if (query) {
        results = searchSkills(results, query);
      }

      const limit = parseInt(opts.limit, 10);
      results = results.slice(0, limit);

      if (results.length === 0) {
        console.log(chalk.yellow('No skills found matching your query.'));
        return;
      }

      console.log(chalk.bold(`\nFound ${results.length} skill(s):\n`));
      for (const skill of results) {
        console.log(`  ${chalk.cyan(skill.name)}`);
        console.log(`  ${chalk.dim(skill.description)}`);
        console.log(`  ${chalk.dim(`Category: ${skill.category}`)}`);
        console.log(`  ${chalk.green(`skills install ${skill.name}`)}\n`);
      }
    });

  program
    .command('list')
    .description('List all available skills')
    .option('-i, --installed', 'Show only installed skills')
    .option('-c, --category <category>', 'Filter by category')
    .action(async (opts) => {
      if (opts.installed) {
        const { loadInstalled } = await import('../lib/config.js');
        const installed = await loadInstalled();
        const names = Object.keys(installed);
        if (names.length === 0) {
          console.log(chalk.yellow('No skills installed.'));
          return;
        }
        console.log(chalk.bold(`\n${names.length} installed skill(s):\n`));
        for (const name of names) {
          const info = installed[name];
          console.log(`  ${chalk.cyan(name)} → ${chalk.dim(info.targets.join(', '))}`);
        }
        console.log();
        return;
      }

      const config = await loadConfig();
      let index;
      try {
        index = await fetchIndex(config.registries[0].url);
      } catch {
        try {
          index = await loadLocalIndex('./index.json');
        } catch {
          console.error(chalk.red('✗ No index available.'));
          process.exit(1);
        }
      }

      let skills = index.skills;
      if (opts.category) {
        skills = filterByCategory(skills, opts.category);
      }

      console.log(chalk.bold(`\n${skills.length} skill(s) available:\n`));

      const grouped = new Map<string, typeof skills>();
      for (const s of skills) {
        const cat = s.category || 'uncategorized';
        if (!grouped.has(cat)) grouped.set(cat, []);
        grouped.get(cat)!.push(s);
      }

      for (const [cat, items] of grouped) {
        console.log(chalk.bold.underline(`  ${cat}`));
        for (const s of items) {
          console.log(`    ${chalk.cyan(s.name)} - ${chalk.dim(s.description.slice(0, 60))}`);
        }
        console.log();
      }
    });

  program
    .command('info <name>')
    .description('Show detailed information about a skill')
    .action(async (name) => {
      const config = await loadConfig();
      let index;
      try {
        index = await fetchIndex(config.registries[0].url);
      } catch {
        index = await loadLocalIndex('./index.json');
      }

      const skill = index.skills.find((s) => s.name === name);
      if (!skill) {
        console.error(chalk.red(`✗ Skill "${name}" not found.`));
        process.exit(1);
      }

      console.log();
      console.log(chalk.bold.cyan(`  ${skill.name}`));
      console.log(`  ${skill.description}`);
      console.log();
      console.log(`  Category:    ${skill.category}`);
      console.log(`  Tags:        ${skill.tags.join(', ') || 'none'}`);
      console.log(`  References:  ${skill.hasReferences ? '✓' : '✗'}`);
      console.log(`  Scripts:     ${skill.hasScripts ? '✓' : '✗'}`);
      console.log(`  Assets:      ${skill.hasAssets ? '✓' : '✗'}`);
      console.log();
      console.log(chalk.green(`  Install: skills install ${skill.name}`));
      console.log();
    });
}
