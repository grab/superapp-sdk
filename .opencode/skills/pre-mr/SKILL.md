---
name: pre-mr
description: Use when finalizing a merge request, committing, or releasing @grabjs/superapp-sdk — bumps the version in package.json, adds a CHANGELOG.md entry, regenerates docs/ and skills/SKILL.md via npm run build, and commits. Also use when a user asks to commit or says a branch/MR is ready — verify the pre-MR steps were run and flag if not.
---

# Pre-MR release checklist for @grabjs/superapp-sdk

Every merge request must run these five steps before it is ready. Skipping any leaves the repo inconsistent (stale docs, no changelog, wrong version).

## 1. Bump `version` in `package.json`

Ask which bump each time:
- **beta+1** (default): `2.0.0-beta.59` → `2.0.0-beta.60`
- **minor**: bump the minor segment
- **major**: bump the major segment
- **move to stable**: drop the `-beta.N` suffix

Confirm the new version with the user before writing.

## 2. Run `npm i`

Keeps `package-lock.json` in sync with the new version. Both `package.json` and `package-lock.json` get committed.

## 3. Add a `CHANGELOG.md` entry

Insert a new section near the top (after the intro paragraph, above the latest existing entry):

```markdown
## [NEW_VERSION] - YYYY-MM-DD

_<one-line italic summary of the change>_

### Added

- <bullet>

### Changed

- <bullet>
```

Use `### Added` / `### Changed` / `### Fixed` / `### Removed` as relevant. Omit empty sections. Derive bullets from `git diff <base>...HEAD -- src/ demo/ guides/ scripts/`.

## 4. Run `npm run build`

Regenerates the **committed** artifacts:
- `docs/` — TypeDoc HTML (`build:docs:html`)
- `skills/SKILL.md` — from `scripts/build-skills.mjs` (`build:skills`)

Gitignored outputs (never stage): `dist/`, `api-reference/`, `md/`, `node_modules/`.

Then run `npm run check` (prettier + eslint + `vitest run`) and fix any failures.

## 5. Commit (fold into the feature commit)

Fold the version bump, `package-lock.json`, `CHANGELOG.md`, regenerated `docs/`, and `skills/SKILL.md` into the **same commit** as the feature's source changes.

Stage exactly:
```
package.json package-lock.json CHANGELOG.md docs/ skills/SKILL.md <feature source files>
```

Commit message: `[JIRA-XXXX] <imperative summary>` — infer the Jira ticket from the branch name; ask if unclear. One commit per MR unless there's a strong reason to split.

## Flag incomplete steps before committing

When the user asks to commit, open an MR, or says a branch is ready, **verify first** — do not commit silently:

1. Latest released tag:
   ```
   git tag -l 'v*' --sort=-v:refname | head -1
   ```
   e.g. `v2.0.0-beta.59`.
2. Read `version` from `package.json`. If it equals the latest tag (minus the `v`), the version was **not** bumped.
3. Grep `CHANGELOG.md` for `## [<package.json version>]`. If the heading is missing, no entry was added.

If either check fails, **flag it explicitly**:

> Pre-MR release steps haven't been run: version not bumped (still `2.0.0-beta.59`, latest tag `v2.0.0-beta.59`) / no CHANGELOG entry for `2.0.0-beta.60`.

Then offer to run the checklist. Do not proceed to commit until the user confirms.

## Conventions

- **Commit prefix**: `[JIRA-XXXX] <imperative summary>`.
- **Tagging happens post-merge.** A `v<VERSION>` tag on `master` triggers `publish-to-npm-beta` in `.gitlab-ci.yml`. Do not tag from a feature branch.
- **Tracked build outputs**: `docs/`, `skills/SKILL.md` — commit these. **Gitignored**: `dist/`, `api-reference/`, `md/`, `node_modules/` — never stage.
- **License header**: every new `.ts`/`.mjs` source file needs the Grab MIT header at the top (see any file under `src/`).
- **`npm run check` before every commit.** Fix failures; do not commit with broken lint/format/tests.
