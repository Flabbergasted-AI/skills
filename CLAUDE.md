# CLAUDE.md

This file provides guidance for Claude when working with the Flabbergasted AI Skills repository.

## What This Repo Is

A collection of 200+ AI skill packages under `public/`. Each skill is a self-contained directory with a `SKILL.md` and optional supporting files that extend Claude's capabilities in specific domains.

## Key Commands

```bash
# List all skills
ls public/

# Read a skill's instructions
cat public/<skill-name>/SKILL.md

# Count total skills
ls public/ | wc -l
```

## Skill Authoring Guide

### Creating a New Skill

1. **Create the directory**: `public/<skill-name>/` (kebab-case)
2. **Write `SKILL.md`** with frontmatter and instructions:

```yaml
---
name: my-skill
description: What the skill does. When to use it — include specific triggers like file types, user phrases, or task contexts.
---
```

3. **Add supporting files** as needed:
   - `references/` — Documentation loaded on demand (API docs, schemas, examples)
   - `scripts/` — Executable code for deterministic tasks
   - `assets/` — Templates, images, fonts used in output

4. **Update catalogs** — Add entry to both `README.md` and `README_zh.md` in the appropriate category table

### SKILL.md Best Practices

**Frontmatter description is critical** — it's the primary mechanism for skill discovery and triggering. Include:
- What the skill does
- Specific contexts/phrases that should activate it
- File types or domains it covers

**Body guidelines:**
- Keep under 500 lines; split to `references/` files when approaching this limit
- Use imperative form ("Query the API", not "This skill queries the API")
- Only include information Claude wouldn't already know
- Prefer concise examples over verbose explanations
- Reference bundled files with clear guidance on when to read them

**Progressive disclosure:**
- Level 1: Frontmatter (always visible, ~100 words)
- Level 2: SKILL.md body (loaded on trigger, <5k words)
- Level 3: References/scripts (loaded as needed by Claude)

### Common Patterns

**Database access skill:**
```
public/example-database/
├── SKILL.md          # API endpoints, auth, query patterns
└── references/
    └── api_reference.md   # Full endpoint documentation
```

**Tool/library skill:**
```
public/example-tool/
├── SKILL.md          # Quick start, core usage, best practices
└── references/
    ├── api.md        # Method signatures and parameters
    └── examples.md   # Common usage patterns
```

**Integration skill:**
```
public/example-integration/
├── SKILL.md          # Setup, auth, workflow overview
└── references/
    ├── authentication.md
    ├── api_endpoints.md
    └── sdk_reference.md
```

### What NOT to Include

- README.md, CHANGELOG.md, or other meta-documentation within skill directories
- Information Claude already knows (basic language features, well-known algorithms)
- Setup/installation guides for the skill itself
- User-facing documentation — skills are for Claude, not humans

## Editing Existing Skills

- Preserve the existing structure and style
- Keep frontmatter `name` and `description` fields — never remove them
- When adding content that pushes SKILL.md past 500 lines, extract to a reference file
- Test scripts by running them if modified

## Local Development Guide

When working on this repo, use the CLI from source:

```bash
cd cli && npm install && cd ..
npx tsx cli/src/index.ts<command>
```

### Building the Skill Index

The `index.json` at repo root is the skill search index. It maps each `public/<skill>/SKILL.md` to name, description, category, and tags.

After creating or modifying skills, rebuild the index:

```bash
cd cli && npm run build-index
```

This is a **dev-only command** — it is not available to end users via `skills` (available only as an npm script). The published npm package uses the pre-built `index.json` from GitHub CDN.

## Commit Conventions

- Separate commits by function (don't mix unrelated skill changes)
- Prefix commit messages with the skill name when modifying a single skill
- Group README updates with the corresponding skill change
