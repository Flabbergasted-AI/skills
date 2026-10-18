# Maintaining upstream skills

Use `upstream.sources.json` to classify every directory in `public/`. Use
`upstream.lock.json` to record the exact upstream commit and directory used as
the merge base. These files are independent of the CLI user's `skills.lock`.

## Current coverage

The initial inventory contains 207 skills: 92 enabled for three-way merging
(11 Anthropic and 81 K-Dense skills) and 115 kept in manual mode. Manual entries
include known sources with an unverified import baseline, upstream directories
that have moved or disappeared, and skills whose sources are still unknown.
Do not treat manual entries as automatically outdated or replace them blindly.

Initial baselines were verified against the **entire skill directory**, including
scripts, references, assets, licenses and executable modes. Ignore only filesystem
noise (`.DS_Store`, `Thumbs.db`, `__pycache__`, `*.pyc`); treat CRLF and LF text as
equivalent. The inspected upstream snapshots were:

- `anthropics/skills`: `dbd4588f9e1033efb41dad4bef2f7947c8993d44` and
  `3d59511518591fa82e6cfcf0438d68dd5dad3e76` (2026-02-24).
- `K-Dense-AI/scientific-agent-skills` (formerly `claude-scientific-skills`):
  `a1043ef544e3a100c28e70a736b6cf32554d0677` and
  `8dc57010636835f4dc7d589323fee54590e3ebb4` (2026-02-26).

The historical K-Dense directory was `scientific-skills/<name>`; its current
directory is `skills/<name>`. A lock entry can retain the historical path while
the manifest points at the current path. Changing source identity requires a
new provenance review rather than reusing an unrelated baseline.

## Run locally

Install CLI dependencies first (`npm ci --ignore-scripts` in `cli/`), then run
from the repository root:

```bash
# Read-only network check. Does not change skills, sources, lock, or index.
node cli/scripts/sync-upstream.mjs
node cli/scripts/sync-upstream.mjs --only algorithmic-art --report sync-report.md

# Apply nonconflicting updates; inspect the Git diff before committing.
node cli/scripts/sync-upstream.mjs --apply
cd cli
npm run build-index
npm run upstream:validate
npm run upstream:test
```

Equivalent npm commands from `cli/`: `upstream:check`, `upstream:sync`,
`upstream:validate`, and `upstream:test`. The synchronizer requires Node 24+, Git,
and network access to the configured public GitHub repositories. It does not
need a GitHub token to fetch public sources.

The check reports proposed changes and exits nonzero for conflicts, invalid
skills, unreachable sources, or missing baselines. On `--apply`, independent
successful skills can update even when another skill fails. Review the report
alongside the diff. No changes are committed or pushed by the local command.

## Scheduled PRs

`.github/workflows/sync-upstream.yml` runs Mondays at approximately 10:23
Asia/Shanghai (02:23 UTC). GitHub may delay scheduled jobs. It also supports
manual dispatch with an optional skill directory and a dry-run switch; manual
dispatch defaults to dry run, while scheduled runs apply updates to a PR branch.

The workflow tests the synchronizer, checks the inventory, syncs full directories,
rebuilds `index.json` when necessary, and creates or updates a single PR on
`codex/sync-upstream-skills`. It never enables auto-merge. A skill conflict leaves
that skill and its baseline untouched; independent successful updates can still
be proposed. Failures are visible in the job status, summary, and report artifact.
No-change runs do not create a PR or rebuild the index.

Push/merge these files to the default branch to activate the schedule. In
**Settings → Actions → General → Workflow permissions**, enable **Allow GitHub
Actions to create and approve pull requests**. Organization policy may control
this setting. The workflow requests `contents: write` and `pull-requests: write`.

The default `GITHUB_TOKEN` has special rules for triggering further workflows;
do not assume all PR checks run unattended. Tests and validation run directly in
the sync job before it opens the PR. If repository policy requires independent
PR checks to run automatically, configure a GitHub App token for checkout and
PR creation, following GitHub's current event-trigger rules. No additional token
is required for the default configuration.

## Enroll another skill

1. Verify the repository and exact upstream subdirectory. Record `source`, `path`,
   and a reason in the skill's manual entry; add the source URL and ref if needed.
2. If the complete local directory matches current upstream, preview adoption:

   ```bash
   node cli/scripts/sync-upstream.mjs --adopt skill-name
   node cli/scripts/sync-upstream.mjs --adopt skill-name --apply
   ```

   Adoption requires an exact directory match. It records the commit and changes
   the mode to `merge`; it never replaces mismatched local content.
3. For a locally modified skill, find the original upstream import commit and
   path. Inspect the diff to distinguish local customization from upstream
   changes. Add that verified baseline to the lock, change the mode to `merge`,
   then dry-run and review the proposed merge before committing both files.
4. To pause a skill's updates, set its mode to `manual` with an explanatory reason.
   Keep its lock entry if the baseline remains valid.

Adding a `public/` directory without classifying it fails inventory validation.
New upstream skills are not imported automatically; add them through the normal
catalog and provenance review process. Removing or renaming an upstream skill
reports an error rather than deleting the local skill.

## Merge and validation rules

Compare the old upstream snapshot, current local directory, and new upstream
snapshot. Preserve local-only edits and files, apply independent upstream edits,
and propagate upstream deletions only when the local file is unchanged. Reject
overlapping text edits, add/add and delete/modify conflicts, conflicting binary
changes, unsafe paths, symlinks, submodules, and case collisions. Preserve
executable modes on the Linux Actions runner. For local application on Windows,
review executable-mode changes on a POSIX system before committing, since the
Windows filesystem does not represent POSIX executable bits. Advance a skill's
lock entry only after a successful merge;
unrelated commits in the source repository do not churn the lock file.

Validate YAML/legacy table metadata and the presence of `SKILL.md` before writing
any merged skill. Prepare each updated directory in a staging folder before
swapping it into place, restoring the old directory if the swap fails. Report
long instruction files and unresolved Markdown links as
warnings because existing upstream skills can contain example links and exceed
the repository's preferred 500-line limit. These checks do not verify the
semantics or factual accuracy of upstream instructions. Review instruction,
script, and license changes in the PR. The synchronizer reads Git objects and
never executes fetched scripts, installs their dependencies, or runs their tests.

References: [scheduled workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule),
[workflow triggering](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow),
[create-pull-request](https://github.com/peter-evans/create-pull-request).
