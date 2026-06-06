# @flabbergasted-ai/skills

CLI tool for searching, installing, and managing AI agent skills.

[中文](./README_zh.md) | [日本語](./README_ja.md)

## What is this?

A command-line tool to discover and install 200+ AI skills into your agent environment — Claude Code, Cursor, or any custom target. Skills extend your AI agent with specialized domain knowledge, workflows, and tool integrations.

## Quick Start

```bash
# Run directly with npx (no install needed)
npx @flabbergasted-ai/skills search "protein"

# Or install globally
npm install -g @flabbergasted-ai/skills
```

## Commands

### Search & Discovery

```bash
skills search <query>               # Fuzzy keyword search
skills search --category <cat>      # Filter by category
```

### Install & Uninstall

```bash
skills install <name...>            # Install to default targets
skills install <name> -t cursor     # Install to specific target (claude/cursor/agents/all)
skills install <name> --project     # Install to project-level .claude/skills/
skills install <name> -p <dir>      # Install to custom path

skills uninstall <name...>          # Uninstall from all targets
```

### Update

```bash
skills update                       # Update all installed skills
skills update <name>                # Update a specific skill
```

### Create & Package

```bash
skills init <name>                  # Scaffold a new skill
skills validate <path>              # Validate skill structure
skills package <path>               # Package as .skill file
```

### Configuration

```bash
skills config                       # Show current configuration
skills config set <key> <value>     # Set a config value
```

## Install Targets

The CLI auto-detects installed agent tools and installs skills to the appropriate directory:

| Target | Path |
|--------|------|
| `claude` | `~/.claude/skills/` |
| `cursor` | `~/.cursor/skills/` |
| `agents` | `~/.agents/skills/` |

Override with `--target`, `--path`, or `--project` flags.

## Requirements

- Node.js >= 24

## License

MIT
