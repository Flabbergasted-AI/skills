import Fuse from 'fuse.js';
import type { SkillMeta } from '../types.js';

const FUSE_OPTIONS = {
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'description', weight: 0.35 },
    { name: 'tags', weight: 0.15 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
};

export function searchSkills(skills: SkillMeta[], query: string): SkillMeta[] {
  const fuse = new Fuse(skills, FUSE_OPTIONS);
  const results = fuse.search(query);
  return results.map((r) => r.item);
}

export function filterByCategory(skills: SkillMeta[], category: string): SkillMeta[] {
  const normalized = category.toLowerCase();
  return skills.filter(
    (s) => s.category.toLowerCase() === normalized || s.category.toLowerCase().includes(normalized),
  );
}

export function filterByTag(skills: SkillMeta[], tag: string): SkillMeta[] {
  const normalized = tag.toLowerCase();
  return skills.filter((s) => s.tags.some((t) => t.toLowerCase().includes(normalized)));
}
