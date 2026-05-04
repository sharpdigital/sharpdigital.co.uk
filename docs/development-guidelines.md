# Development Guidelines

Day-to-day development workflow for the #sharp website. For project architecture, see [CLAUDE.md](../CLAUDE.md) and [00_specifications.md](./00_specifications.md).

## Branching Model

This repository follows **git flow**. The full rule set lives in [CLAUDE.md](../CLAUDE.md#branching-model). Quick reference:

| Branch type         | From      | Merges to              | PR target |
| ------------------- | --------- | ---------------------- | --------- |
| `feature/<name>`    | `develop` | `develop`              | `develop` |
| `bugfix/<name>`     | `develop` | `develop`              | `develop` |
| `release/<version>` | `develop` | `master` and `develop` | `master`  |
| `hotfix/<name>`     | `master`  | `master` and `develop` | `master`  |

PR target rules are enforced for Claude Code sessions by `.claude/hooks/check-pr-target.sh`.

## Working in Git Worktrees

**Recommendation: start every new feature or bugfix in a git worktree, not the main repo checkout.**

A worktree is a separate working directory backed by the same `.git/`. It lets you:

- Keep multiple branches checked out at the same time
- Avoid stash/uncommit churn when switching context
- Run a long-running build or dev server in one worktree while editing in another
- Park hotfix work without disturbing in-flight feature work

### Starting a feature in a worktree

`git-flow-avh` has no native worktree support, so create the worktree directly with the feature branch off `develop`:

```bash
git worktree add -b feature/<name> ../sharpdigital-<name> develop
cd ../sharpdigital-<name>
```

Inside the worktree, work normally. `git flow feature publish`, `pull`, `rebase`, `diff`, `track`, `list` all work — they only care about the current branch name.

The one git-flow command you should **not** run inside a worktree is `git flow feature start <name>`. That subcommand tries to create _and_ switch a branch in the current working tree, which collides with worktree semantics. Always create the worktree with `-b feature/<name>` instead.

### Finishing the feature

Push the branch and open a PR from inside the worktree:

```bash
git push -u origin feature/<name>     # or: git flow feature publish <name>
gh pr create --base develop --title "..." --body "..."
```

After the PR merges, clean up:

```bash
cd /path/to/main/checkout
git worktree remove ../sharpdigital-<name>
git fetch origin --prune
```

If you want to use `git flow feature finish` locally instead of merging via PR, the order matters:

```bash
# from the main repo
git worktree remove ../sharpdigital-<name>      # remove worktree FIRST
git flow feature finish <name>                  # then AVH can delete the branch
```

`git branch -d` refuses to delete a branch that is checked out anywhere — including in a worktree — so the worktree must come down before `feature finish` can complete.

### Things to avoid

- Running `git flow feature start <name>` inside a worktree (use `git worktree add -b` instead).
- Checking out the same branch in two worktrees (git refuses).
- `git flow feature finish` while a worktree on that branch still exists.

## Pull Request Workflow

1. Create a worktree on a fresh `feature/<name>` branch off `develop`.
2. Work and commit. The pre-commit hook runs Prettier and the Next.js build — keep both green.
3. Push: `git push -u origin feature/<name>` (or `git flow feature publish <name>`).
4. Open the PR: `gh pr create --base develop --title "..."`.
   - `.claude/hooks/check-pr-target.sh` blocks PRs that target the wrong base.
5. After merge, delete the branch (local + remote) and remove the worktree.

## Tooling

- **git-flow-avh** — optional but recommended (`brew install git-flow-avh`). The `gitflow.*` config keys are pre-set in `.git/config`.
- **gh CLI** — required for PR creation.
- **bun** — package manager (`bun install`, `bun run dev`, `bun run build`).
- **Claude Code** — PR-target enforcement and the "start feature in worktree" reminder live under `.claude/`.
