import path from 'node:path';
import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import matter from 'gray-matter';
import type { SkillIndex, SkillMeta, SkillCategory } from '../types.js';

const CATEGORY_MAP: Record<string, { name: string; description: string }> = {
  'scientific-databases': { name: 'Scientific Databases', description: 'Direct REST/SOAP API access to scientific databases' },
  'bioinformatics': { name: 'Bioinformatics & Genomics', description: 'Biological sequences, genomics, and single-cell omics' },
  'drug-discovery': { name: 'Drug Discovery & Chemistry', description: 'Molecular modeling, cheminformatics, and drug discovery' },
  'machine-learning': { name: 'Machine Learning & Data Science', description: 'ML frameworks, statistical modeling, and data science' },
  'scientific-computing': { name: 'Scientific Computing', description: 'Mathematical, physical, and astronomical computation' },
  'data-visualization': { name: 'Data Visualization', description: 'Plotting libraries, scientific visualization, and charts' },
  'clinical-medical': { name: 'Clinical & Medical', description: 'Healthcare AI, clinical research, and medical documentation' },
  'scientific-writing': { name: 'Scientific Writing & Publishing', description: 'Literature review, manuscript writing, and publishing' },
  'lab-automation': { name: 'Lab Automation & Protocols', description: 'Laboratory automation and experimental workflows' },
  'frontend-web': { name: 'Frontend & Web Development', description: 'UI/UX design, web development, and frontend optimization' },
  'design-art': { name: 'Design & Art', description: 'Visual design, creative tools, and aesthetic enhancement' },
  'agent-workflow': { name: 'Agent & Workflow', description: 'Agent orchestration, workflow management, and dev practices' },
  'context-engineering': { name: 'Context Engineering', description: 'AI context optimization and agent architecture' },
  'quantum-computing': { name: 'Quantum Computing', description: 'Quantum computing frameworks and quantum ML' },
  'document-processing': { name: 'Document Processing', description: 'File format handling, document creation, and data extraction' },
};

export function registerIndexBuildCommand(program: Command) {
  program
    .command('index-build')
    .description('Build index.json from public/ directory')
    .option('-s, --source <dir>', 'Source directory containing skills', './public')
    .option('-o, --output <path>', 'Output path for index.json', './index.json')
    .action(async (opts) => {
      const sourceDir = path.resolve(opts.source);
      const outputPath = path.resolve(opts.output);

      if (!(await fs.pathExists(sourceDir))) {
        console.error(chalk.red(`✗ Source directory not found: ${sourceDir}`));
        process.exit(1);
      }

      console.log(chalk.bold(`\n🔨 Building index from: ${sourceDir}\n`));

      const entries = await fs.readdir(sourceDir, { withFileTypes: true });
      const skills: SkillMeta[] = [];

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const skillDir = path.join(sourceDir, entry.name);
        const skillMd = path.join(skillDir, 'SKILL.md');

        if (!(await fs.pathExists(skillMd))) continue;

        const content = await fs.readFile(skillMd, 'utf-8');
        const meta = parseSkillMeta(content, entry.name, skillDir);
        if (meta) {
          skills.push(meta);
        }
      }

      const categories: SkillCategory[] = Object.entries(CATEGORY_MAP).map(([id, info]) => ({
        id,
        ...info,
      }));

      const index: SkillIndex = {
        version: '1.0.0',
        updatedAt: new Date().toISOString(),
        skills,
        categories,
      };

      await fs.writeJson(outputPath, index, { spaces: 2 });

      console.log(chalk.green(`✓ Built index with ${skills.length} skills`));
      console.log(chalk.dim(`  Output: ${outputPath}\n`));
    });
}

function parseSkillMeta(content: string, dirName: string, skillDir: string): SkillMeta | null {
  let name = dirName;
  let description = '';

  if (content.startsWith('---')) {
    const { data } = matter(content);
    name = data.name || dirName;
    description = data.description || '';
  } else if (content.startsWith('|')) {
    const nameMatch = content.match(/\*\*name\*\*\s*\|\s*(.+)/);
    const descMatch = content.match(/\*\*description\*\*\s*\|\s*(.+)/);
    if (nameMatch) name = nameMatch[1].trim();
    if (descMatch) description = descMatch[1].trim();
  }

  if (!name) return null;

  const category = inferCategory(name, description);
  const tags = inferTags(name, description);

  return {
    name,
    description,
    category,
    tags,
    path: `public/${dirName}`,
    hasReferences: fs.existsSync(path.join(skillDir, 'references')),
    hasScripts: fs.existsSync(path.join(skillDir, 'scripts')),
    hasAssets: fs.existsSync(path.join(skillDir, 'assets')),
  };
}

function inferCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();

  if (name.endsWith('-database') || text.includes('api access') || text.includes('query')) {
    return 'scientific-databases';
  }
  if (text.includes('genome') || text.includes('sequenc') || text.includes('single-cell') || text.includes('bioinformatics')) {
    return 'bioinformatics';
  }
  if (text.includes('drug') || text.includes('molecul') || text.includes('chem')) {
    return 'drug-discovery';
  }
  if (text.includes('machine learning') || text.includes('deep learning') || text.includes('neural')) {
    return 'machine-learning';
  }
  if (text.includes('quantum')) return 'quantum-computing';
  if (text.includes('visualiz') || text.includes('plot') || text.includes('chart')) return 'data-visualization';
  if (text.includes('clinical') || text.includes('medical') || text.includes('health')) return 'clinical-medical';
  if (text.includes('writing') || text.includes('manuscript') || text.includes('paper')) return 'scientific-writing';
  if (text.includes('lab') || text.includes('protocol') || text.includes('automation')) return 'lab-automation';
  if (text.includes('frontend') || text.includes('react') || text.includes('web') || text.includes('ui')) return 'frontend-web';
  if (text.includes('design') || text.includes('art') || text.includes('visual')) return 'design-art';
  if (text.includes('context') || text.includes('token')) return 'context-engineering';
  if (text.includes('document') || text.includes('pdf') || text.includes('docx') || text.includes('xlsx')) return 'document-processing';
  if (text.includes('git') || text.includes('workflow') || text.includes('agent') || text.includes('skill')) return 'agent-workflow';

  return 'agent-workflow';
}

function inferTags(name: string, description: string): string[] {
  const tags: string[] = [];
  const text = `${name} ${description}`.toLowerCase();

  const tagKeywords = [
    'python', 'api', 'rest', 'database', 'protein', 'genomics', 'rna',
    'single-cell', 'drug', 'molecule', 'ml', 'deep-learning', 'visualization',
    'react', 'nextjs', 'typescript', 'git', 'workflow', 'quantum',
  ];

  for (const keyword of tagKeywords) {
    if (text.includes(keyword)) tags.push(keyword);
  }

  return tags.slice(0, 5);
}
