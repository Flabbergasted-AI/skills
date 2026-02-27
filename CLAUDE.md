# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a library of AI "skills" for Claude Code - modular packages that extend Claude's capabilities with specialized knowledge, workflows, and tool integrations for scientific research and software development.

## Repository Structure

```
public/
├── skill-creator/     # Framework for creating new skills
├── document-skills/    # PDF, DOCX, PPTX, XLSX processing
├── mcp-builder/        # MCP server creation
├── [database-name]/    # 180+ scientific database skills
│   ├── SKILL.md
│   ├── scripts/        # Executable code
│   ├── references/     # Documentation for context
│   └── assets/        # Templates, fonts, etc.
└── ...
```

## Common Commands

### Working with Skills

```bash
# Initialize a new skill template
python public/skill-creator/scripts/init_skill.py <skill-name> --path public/

# Package a skill for distribution
python public/skill-creator/scripts/package_skill.py public/<skill-name>

# Validate a skill structure
python public/skill-creator/scripts/quick_validate.py public/<skill-name>
```

## Architecture

### Skill Structure
Each skill follows this pattern:
- **SKILL.md** (required): YAML frontmatter with `name` and `description`, plus Markdown body
- **scripts/**: Executable Python/Bash code for deterministic tasks
- **references/**: Documentation loaded into context as needed
- **assets/**: Files used in output (templates, fonts, icons)

### Skill Categories

1. **Database APIs**: Direct REST/SOAP access to scientific databases (UniProt, PDB, Ensembl, ClinVar, etc.)
2. **Scientific Computing**: ML/analysis frameworks (PyTorch, scikit-learn, scanpy, etc.)
3. **Document Processing**: PDF, DOCX, PPTX, XLSX manipulation
4. **Development Workflows**: Git, testing, code review patterns
5. **Scientific Writing**: Literature review, clinical reports, grants
6. **Web Development**: React, frontend design, webapp testing

### Creating/Modifying Skills

Use the `skill-creator` skill for guidance on creating or updating skills. Key principles:
- Keep SKILL.md concise (under 500 lines)
- Use progressive disclosure: essential info in SKILL.md, detailed refs in references/
- Frontmatter description is the primary trigger - include all "when to use" context
- Test scripts by actually running them

## Finding Skills

Skills are in `public/<skill-name>/`. Use glob patterns to find skills:
- `public/*/SKILL.md` - all top-level skills
- `public/*/references/` - reference documentation
- `public/*/scripts/` - executable scripts
