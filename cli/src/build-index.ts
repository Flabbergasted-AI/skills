#!/usr/bin/env node

/**
 * Build index.json from public/ directory.
 * Run from cli/: npx tsx src/build-index.ts
 * Or: npm run build-index
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs-extra';
import matter from 'gray-matter';
import type { SkillIndex, SkillMeta, SkillCategory } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUTPUT = path.join(ROOT, 'index.json');

const CATEGORY_MAP: Record<string, { name: string; description: string }> = {
  'scientific-databases': { name: 'Scientific Databases', description: 'Direct REST/SOAP API access to scientific databases' },
  'bioinformatics': { name: 'Bioinformatics & Genomics', description: 'Biological sequences, genomics, and single-cell omics' },
  'drug-discovery': { name: 'Drug Discovery & Chemistry', description: 'Molecular modeling, cheminformatics, and drug discovery' },
  'machine-learning': { name: 'Machine Learning & Data Science', description: 'ML frameworks, statistical modeling, and data science' },
  'scientific-computing': { name: 'Scientific Computing', description: 'Mathematical, physical, and astronomical computation' },
  'data-visualization': { name: 'Data Visualization', description: 'Plotting, scientific visualization, and charts' },
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

function inferCategory(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();

  if (name.endsWith('-database') || text.includes('api access') || text.includes('direct rest')) return 'scientific-databases';
  if (text.includes('genome') || text.includes('sequenc') || text.includes('single-cell') || text.includes('bioinformatics') || text.includes('rna-seq')) return 'bioinformatics';
  if (text.includes('drug') || text.includes('molecul') || text.includes('chem') || text.includes('docking')) return 'drug-discovery';
  if (text.includes('machine learning') || text.includes('deep learning') || text.includes('neural') || text.includes('dataframe') || text.includes('reinforcement')) return 'machine-learning';
  if (text.includes('quantum')) return 'quantum-computing';
  if (text.includes('visualiz') || text.includes('plot') || text.includes('chart') || text.includes('figure')) return 'data-visualization';
  if (text.includes('clinical') || text.includes('medical') || text.includes('health') || text.includes('patient')) return 'clinical-medical';
  if (text.includes('writing') || text.includes('manuscript') || text.includes('paper') || text.includes('literature') || text.includes('citation')) return 'scientific-writing';
  if (text.includes('lab') || text.includes('protocol') || text.includes('opentrons')) return 'lab-automation';
  if (text.includes('frontend') || text.includes('react') || text.includes('css') || text.includes('tailwind')) return 'frontend-web';
  if (text.includes('design') || text.includes('art') || text.includes('color') || text.includes('theme') || text.includes('animation')) return 'design-art';
  if (text.includes('context') || text.includes('token') || text.includes('compression')) return 'context-engineering';
  if (text.includes('document') || text.includes('pdf') || text.includes('docx') || text.includes('xlsx') || text.includes('pptx')) return 'document-processing';
  if (text.includes('simulation') || text.includes('astro') || text.includes('fluid') || text.includes('math')) return 'scientific-computing';

  return 'agent-workflow';
}

function inferTags(name: string, description: string): string[] {
  const tags: string[] = [];
  const text = `${name} ${description}`.toLowerCase();

  const candidates: [string, string][] = [
    ['python', 'python'],
    ['api', 'api'],
    ['rest', 'rest'],
    ['database', 'database'],
    ['protein', 'protein'],
    ['genomics', 'genomics'],
    ['rna', 'rna'],
    ['single-cell', 'single-cell'],
    ['drug', 'drug-discovery'],
    ['molecule', 'molecule'],
    ['machine learning', 'ml'],
    ['deep learning', 'deep-learning'],
    ['visualization', 'visualization'],
    ['react', 'react'],
    ['nextjs', 'nextjs'],
    ['typescript', 'typescript'],
    ['git', 'git'],
    ['workflow', 'workflow'],
    ['quantum', 'quantum'],
    ['simulation', 'simulation'],
  ];

  for (const [keyword, tag] of candidates) {
    if (text.includes(keyword)) tags.push(tag);
  }

  return [...new Set(tags)].slice(0, 6);
}

async function buildIndex() {
  console.log(`📂 Scanning: ${PUBLIC_DIR}\n`);

  const entries = await fs.readdir(PUBLIC_DIR, { withFileTypes: true });
  const skills: SkillMeta[] = [];
  let skipped = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const skillDir = path.join(PUBLIC_DIR, entry.name);
    const skillMd = path.join(skillDir, 'SKILL.md');

    if (!(await fs.pathExists(skillMd))) {
      skipped++;
      continue;
    }

    const content = await fs.readFile(skillMd, 'utf-8');
    let name = entry.name;
    let description = '';

    if (content.startsWith('---')) {
      const { data } = matter(content);
      name = data.name || entry.name;
      description = data.description || '';
    } else if (content.startsWith('|')) {
      const nameMatch = content.match(/\*\*name\*\*\s*\|\s*(.+)/);
      const descMatch = content.match(/\*\*description\*\*\s*\|\s*(.+)/);
      if (nameMatch) name = nameMatch[1].trim();
      if (descMatch) description = descMatch[1].trim();
    }

    skills.push({
      name,
      description,
      category: inferCategory(name, description),
      tags: inferTags(name, description),
      path: `public/${entry.name}`,
      hasReferences: await fs.pathExists(path.join(skillDir, 'references')),
      hasScripts: await fs.pathExists(path.join(skillDir, 'scripts')),
      hasAssets: await fs.pathExists(path.join(skillDir, 'assets')),
    });
  }

  skills.sort((a, b) => a.name.localeCompare(b.name));

  const categories: SkillCategory[] = Object.entries(CATEGORY_MAP).map(([id, info]) => ({ id, ...info }));

  const index: SkillIndex = {
    version: '1.0.0',
    updatedAt: new Date().toISOString(),
    skills,
    categories,
  };

  await fs.writeJson(OUTPUT, index, { spaces: 2 });

  console.log(`✅ Built index: ${skills.length} skills indexed, ${skipped} skipped`);
  console.log(`📄 Output: ${OUTPUT}\n`);

  const catCount = new Map<string, number>();
  for (const s of skills) {
    catCount.set(s.category, (catCount.get(s.category) || 0) + 1);
  }
  console.log('Category breakdown:');
  for (const [cat, count] of [...catCount.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat.padEnd(24)} ${count}`);
  }
}

buildIndex().catch((err) => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
