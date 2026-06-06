export interface SkillMeta {
  name: string;
  description: string;
  category: string;
  tags: string[];
  path: string;
  hasReferences: boolean;
  hasScripts: boolean;
  hasAssets: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
}

export interface SkillIndex {
  version: string;
  updatedAt: string;
  skills: SkillMeta[];
  categories: SkillCategory[];
}

export interface InstallTarget {
  id: string;
  path: string;
  detected: boolean;
}

export interface InstalledSkill {
  installedAt: string;
  version: string;
  source: string;
  targets: string[];
  commit?: string;
}

export interface InstalledManifest {
  [skillName: string]: InstalledSkill;
}

export interface SkillsConfig {
  defaultTargets: string[];
  autoDetect: boolean;
  customTargets: Record<string, { path: string }>;
  registries: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export const DEFAULT_CONFIG: SkillsConfig = {
  defaultTargets: ['claude', 'cursor', 'agents'],
  autoDetect: true,
  customTargets: {},
  registries: [
    {
      name: 'flabbergasted',
      url: 'https://raw.githubusercontent.com/Flabbergasted-AI/skills/main/index.json',
      type: 'github',
    },
  ],
};
