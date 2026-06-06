# AGENTS.md

## Repository Overview

This is **Flabbergasted AI Skills** — a collection of 200+ modular AI skills for Claude Code. Each skill extends Claude's capabilities with specialized knowledge, workflows, or tool integrations across scientific research, software development, and creative work.

## Repository Structure

```
skills/
├── README.md          # English catalog of all skills
├── README_zh.md       # Chinese catalog
├── AGENTS.md          # This file — agent guidance
├── CLAUDE.md          # Skill authoring guide
└── public/            # All skill packages (205 skills)
    ├── <skill-name>/
    │   ├── SKILL.md           # Required — metadata + instructions
    │   ├── references/        # Optional — loaded on demand
    │   ├── scripts/           # Optional — executable code
    │   └── assets/            # Optional — templates, images, etc.
    └── ...
```

## Skill Package Structure

Every skill is a directory under `public/` containing at minimum a `SKILL.md` file:

- **`SKILL.md`** — YAML frontmatter (`name`, `description`) + markdown body with instructions
- **`references/`** — Domain docs, API refs, schemas (loaded into context as needed)
- **`scripts/`** — Deterministic executable code (Python/Bash)
- **`assets/`** — Output resources (templates, images, fonts) used but not loaded into context

## Conventions

### Naming
- Skill directories use kebab-case: `scientific-writing`, `torch-geometric`
- Database-access skills end with `-database`: `pubmed-database`, `chembl-database`
- Platform integrations end with `-integration`: `benchling-integration`, `omero-integration`

### SKILL.md Frontmatter
Required fields only:
```yaml
---
name: skill-name
description: What it does and when to use it.
---
```

Some older skills use a table format instead of YAML frontmatter — both are valid.

### Writing Style
- Use imperative/infinitive form in instructions
- Be concise — the context window is shared across the system
- Only include information Claude doesn't already know

### Categories
Skills are organized into these categories (see README.md for full listing):
- Scientific Databases
- Bioinformatics & Genomics
- Drug Discovery & Chemistry
- Machine Learning & Data Science
- Scientific Computing
- Data Visualization
- Clinical & Medical
- Scientific Writing & Publishing
- Lab Automation & Protocols
- Frontend & Web Development
- Design & Art
- Agent & Workflow
- Context Engineering
- Quantum Computing
- Document Processing

## Working with This Repo

### Finding a skill
Browse `public/` or search by name. Each skill's `SKILL.md` frontmatter description explains its purpose and trigger conditions.

### Adding a new skill
1. Create a directory under `public/` with a kebab-case name
2. Add a `SKILL.md` with proper frontmatter
3. Add `references/`, `scripts/`, or `assets/` as needed
4. Update `README.md` and `README_zh.md` with the new entry in the appropriate category table

### Modifying a skill
Edit files within the skill's directory. Keep `SKILL.md` under 500 lines — split into reference files when approaching this limit.

### Commit practices
- Separate commits by function — don't mix unrelated changes
- One skill addition/modification per commit when possible
