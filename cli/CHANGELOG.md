# Changelog

All notable changes to `@flabbergasted-ai/skills` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.6] - 2026-06-07

### Added

- Japanese (`README_ja.md`) CLI documentation section
- Local development guide in `CLAUDE.md` covering CLI usage and skill index rebuilding

### Changed

- Quick start guides now lead with npm install as the recommended path, with repo-based usage as an alternative
- `cli/README.md` translation links fixed (`README_zh.md`, `README_ja.md` paths corrected)

### Removed

- **`skills index-build`** command — no longer available to end users; preserved as a dev-only npm script (`npm run build-index`) for maintainers

## [0.1.5] - 2026-06-07

### Added

- **`skills upgrade`** command — check for and install CLI updates. Supports `--check` flag for dry-run. Auto-detects package manager (npm, pnpm, yarn, bun) and runner (npx, pnpm dlx, bunx, yarn dlx).
- **`skills lock`** command group — manage `skills.lock` file for version pinning:
  - `skills lock create` — generate lock file from currently installed skills
  - `skills lock show` — display locked skill versions
  - `skills lock update [names...]` — update lock entries to latest commit
  - `skills lock remove <names...>` — remove skills from lock file
- **`skills.lock` file** — pin skills to specific Git commit hashes for reproducible installations
- **`--lock` flag** on `skills install` — write/update `skills.lock` after installation
- **`--frozen` flag** on `skills install` — install using exact versions from `skills.lock` (CI-friendly)
- `release` script in package.json for automated version bumping, committing, and tagging
- CHANGELOG.md for tracking release history

### Changed

- Install flow now auto-resolves Git commit hashes and records them in `installed.json`
- When a `skills.lock` file exists, `install` respects pinned commits by default

## [0.1.4] - 2026-06-06

### Added

- Remote skill installation from GitHub (auto-download when local source not found)
- Recursive directory download via GitHub Contents API
- Improved repo root detection for local installs

## [0.1.3] - 2026-06-05

### Added

- `skills targets` command to list all install targets and detection status
- `skills config add-target` / `remove-target` for custom targets

## [0.1.2] - 2026-06-05

### Added

- `skills init` command for scaffolding new skills
- `skills validate` command for verifying skill structure
- `skills package` command for creating `.skill` archive files

## [0.1.1] - 2026-06-04

### Added

- `skills search` with fuzzy matching via Fuse.js
- `skills list` with category grouping
- `skills info` for detailed skill information
- `skills config show/set` for CLI configuration

## [0.1.0] - 2026-06-04

### Added

- Initial release
- `skills install` — install skills to auto-detected agent targets
- `skills uninstall` — remove installed skills
- `skills update` / `skills outdated` — update management
- Multi-target support: Claude Code, Cursor, Agents, Codex, Aider, Continue
- Auto-detection of installed agent tools
- Project-level installation via `--project` flag
- Remote index fetching with local cache (1h TTL)
- `skills index build` for maintainers

[Unreleased]: https://github.com/Flabbergasted-AI/skills/compare/v0.1.6...HEAD
[0.1.6]: https://github.com/Flabbergasted-AI/skills/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/Flabbergasted-AI/skills/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/Flabbergasted-AI/skills/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/Flabbergasted-AI/skills/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/Flabbergasted-AI/skills/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/Flabbergasted-AI/skills/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/Flabbergasted-AI/skills/releases/tag/v0.1.0
