# CLAUDE.md

This file provides concise, Claude-specific guidance. For comprehensive agent documentation, see [AGENTS.md](./AGENTS.md).

## Project Overview

A library of 200+ AI skills for Claude Code - modular packages extending Claude's capabilities across scientific research, software development, and creative work.

## Quick Reference

| Resource | Purpose |
|----------|---------|
| [README.md](./README.md) | Full skill catalog (15 categories,200+ skills) |
| [README_zh.md](./README_zh.md) | 中文版技能目录 |
| [AGENTS.md](./AGENTS.md) | Comprehensive agent guide |

## Skill Discovery

When user asks about something that might have a skill:

1. Check [README.md](./README.md) category list
2. Use `find-skills` skill: `/find-skills query="..."`
3. Grep for keywords: `grep -l "keyword" public/*/SKILL.md`

## Skill Invocation

Use the Skill tool to invoke skills:
```
/<skill-name> [args]
```

Example: `/pubmed-database query="CRISPR efficiency"`

## Key Commands

```bash
# Initialize new skill
python public/skill-creator/scripts/init_skill.py <name> --path public/

# Validate skill structure
python public/skill-creator/scripts/quick_validate.py public/<name>

# Package for distribution
python public/skill-creator/scripts/package_skill.py public/<name>
```

## Skill Structure

```
public/<skill-name>/
├── SKILL.md        # Required: YAML frontmatter + markdown
├── scripts/        # Optional: executable code
├── references/     # Optional: detailed docs
└── assets/         # Optional: templates, fonts
```

## Skill Frontmatter (Required)

```yaml
---
name: skill-name           # Unique, lowercase, hyphenated
description: |            # Primary trigger - be specific
  When to use this skill. Include all relevant contexts.
  Mention related skills for differentiation.
user-invokable: true # Set true if slash command is useful
---
```

## Key Principles

- **Progressive disclosure**: Essential info in SKILL.md, details in `references/`
- **Description is trigger**: Include all "when to use" contexts naturally
- **Test scripts**: Run them before committing
- **No duplicates**: Check for existing skills covering the same purpose

## Coding Conventions

- Use `skill-creator` skill when creating new skills
- Keep SKILL.md under 500 lines
- Follow naming conventions:
  - Database: `{name}-database` (e.g., `pubmed-database`)
  - ML/Analysis: library name (e.g., `scanpy`)
  - Task-based: verb-object (e.g., `literature-review`)
  - Design: adjective (e.g., `polish`, `harden`)

## Common Workflows

```
# Research → Writing
/literature-review → /scientific-writing → /peer-review

# Drug Discovery
/pubchem-database → /deepchem → /diffdock → /zinc-database

# Web Development
/brainstorming → /frontend-design → /webapp-testing → /polish → /vercel-deploy-claimable
```

**Read when**: New session, creating/modifying skills, unsure which skill to use.