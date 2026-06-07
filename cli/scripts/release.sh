#!/usr/bin/env bash
set -euo pipefail

# Automated release script for @flabbergasted-ai/skills
# Usage: ./scripts/release.sh [patch|minor|major]  (default: patch)

BUMP_TYPE="${1:-patch}"
CLI_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$CLI_DIR/.." && pwd)"

cd "$CLI_DIR"

# Validate bump type
if [[ "$BUMP_TYPE" != "patch" && "$BUMP_TYPE" != "minor" && "$BUMP_TYPE" != "major" ]]; then
  echo "❌ Invalid bump type: $BUMP_TYPE"
  echo "   Usage: npm run release -- [patch|minor|major]"
  exit 1
fi

# Ensure working directory is clean
if [[ -n "$(git -C "$REPO_ROOT" status --porcelain)" ]]; then
  echo "❌ Working directory is not clean. Commit or stash changes first."
  exit 1
fi

# Ensure on main branch
CURRENT_BRANCH="$(git -C "$REPO_ROOT" branch --show-current)"
if [[ "$CURRENT_BRANCH" != "main" ]]; then
  echo "⚠️  Warning: releasing from branch '$CURRENT_BRANCH' (not main)"
  read -p "   Continue? [y/N] " -r
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
  fi
fi

# Read current version
CURRENT_VERSION="$(node -p "require('./package.json').version")"
echo "📦 Current version: v$CURRENT_VERSION"

# Bump version (npm version doesn't commit in subdirectory context)
npm version "$BUMP_TYPE" --no-git-tag-version --no-commit-hooks
NEW_VERSION="$(node -p "require('./package.json').version")"
echo "🔼 Bumped to: v$NEW_VERSION"

# Update CHANGELOG.md — replace [Unreleased] link
TODAY="$(date +%Y-%m-%d)"
if [[ -f CHANGELOG.md ]]; then
  # Add new version header after [Unreleased]
  if grep -q "## \[Unreleased\]" CHANGELOG.md; then
    sed -i.bak "s/## \[Unreleased\]/## [Unreleased]\n\n## [$NEW_VERSION] - $TODAY/" CHANGELOG.md
    rm -f CHANGELOG.md.bak
  fi

  # Update comparison links at bottom
  if grep -q "\[Unreleased\]:.*compare" CHANGELOG.md; then
    sed -i.bak "s|\[Unreleased\]:.*|[Unreleased]: https://github.com/Flabbergasted-AI/skills/compare/v${NEW_VERSION}...HEAD|" CHANGELOG.md
    rm -f CHANGELOG.md.bak
    # Add version comparison link if not present
    if ! grep -q "\[$NEW_VERSION\]:" CHANGELOG.md; then
      sed -i.bak "/\[Unreleased\]:/a\\
[$NEW_VERSION]: https://github.com/Flabbergasted-AI/skills/compare/v${CURRENT_VERSION}...v${NEW_VERSION}" CHANGELOG.md
      rm -f CHANGELOG.md.bak
    fi
  fi
   echo "📝 Updated CHANGELOG.md"
fi

# Verify CHANGELOG has meaningful content under [Unreleased]
if [[ -f CHANGELOG.md ]]; then
  # Extract lines between [Unreleased] and next ## [x.x.x] — then check for bullet/paragraph content
  HAS_CONTENT=$(
    awk '/^## \[Unreleased\]/ {
      for (i=1; i<=30; i++) {
        if ((getline line) <= 0) break
               if (line ~ /^## \[[0-9]/) exit # hit next version header
        if (line ~ /^## / || line ~ /^### /) continue  # skip section headers
        gsub(/^[ \t]+|[ \t]+$/, "", line) # trim whitespace
        if (line != "") { print "yes"; exit } # non-empty content found
      }
    }' CHANGELOG.md
  )
  if [[ -z "$HAS_CONTENT" ]]; then
    echo "❌ [Unreleased] section is empty. Document the changes before releasing."
    echo "   Add content under '## [Unreleased]' in CHANGELOG.md, then re-run."
    exit 1
  fi
fi

# Stage and commit
cd "$REPO_ROOT"
git add cli/package.json cli/package-lock.json cli/CHANGELOG.md 2>/dev/null || true
git commit -m "chore(cli): bump version to v$NEW_VERSION"

# Create tag
git tag "v$NEW_VERSION"

echo ""
echo "✅ Released v$NEW_VERSION"
echo ""
echo "   Next steps:"
echo "   1. Review: git log --oneline -3"
echo "   2. Push:   git push origin $CURRENT_BRANCH --tags"
echo "   3. CI will auto-publish to npm"
