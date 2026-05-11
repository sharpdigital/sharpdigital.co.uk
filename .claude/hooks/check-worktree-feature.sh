#!/usr/bin/env bash
# PreToolUse hook: when a feature/bugfix branch is about to be created in the
# MAIN repo checkout, ask the user to confirm — project guideline is to do this
# work inside a git worktree (see docs/development-guidelines.md).
#
# CLAUDE_HOOK_WORKTREE may override the detected worktree state for tests:
#   main   -> behave as if in main worktree (will ask)
#   linked -> behave as if in a linked worktree (silent allow)

set -uo pipefail

input=$(cat)

tool_name=$(jq -r '.tool_name // ""' <<<"$input")
[[ "$tool_name" == "Bash" ]] || exit 0

command=$(jq -r '.tool_input.command // ""' <<<"$input")
flat=$(printf '%s' "$command" | tr '\n' ' ')

# Patterns that "start" a feature/bugfix branch:
#   git flow (feature|bugfix) start <name>
#   git (checkout|switch) (-b|-c) (feature|bugfix)/<name>
#   git branch (feature|bugfix)/<name>
pattern='(^|[^[:alnum:]_])(git[[:space:]]+flow[[:space:]]+(feature|bugfix)[[:space:]]+start[[:space:]]|git[[:space:]]+(checkout|switch)[[:space:]]+(-b|-c)[[:space:]]+(feature|bugfix)/|git[[:space:]]+branch[[:space:]]+(feature|bugfix)/)'
if ! grep -qE "$pattern" <<<"$flat"; then
  exit 0
fi

# Determine worktree state
override="${CLAUDE_HOOK_WORKTREE:-}"
if [[ -n "$override" ]]; then
  case "$override" in
    main) is_main=1 ;;
    linked) is_main=0 ;;
    *) exit 0 ;;
  esac
else
  if ! git rev-parse --git-dir >/dev/null 2>&1; then
    exit 0  # not a git repo
  fi
  git_dir=$(git rev-parse --absolute-git-dir 2>/dev/null)
  common_rel=$(git rev-parse --git-common-dir 2>/dev/null)
  if [[ "$common_rel" = /* ]]; then
    common_dir="$common_rel"
  else
    common_dir=$(cd "$common_rel" 2>/dev/null && pwd)
  fi
  [[ "$git_dir" == "$common_dir" ]] && is_main=1 || is_main=0
fi

[[ "$is_main" == "1" ]] || exit 0

reason="Project guideline: start new features/bugfixes in a git worktree, not the main repo checkout. Suggested: \`git worktree add -b feature/<name> ../sharpdigital-<name> develop && cd ../sharpdigital-<name>\`. See docs/development-guidelines.md. Approve to continue on the main checkout, or cancel and switch to a worktree."

jq -nc --arg reason "$reason" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "ask",
    permissionDecisionReason: $reason
  }
}'
