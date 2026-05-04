#!/usr/bin/env bash
# PreToolUse hook: enforce git flow rules for `gh pr create`.
#
# Rules (mirrors CLAUDE.md "Branching Model"):
#   feature/* | bugfix/*  -> PR must target develop
#   release/* | hotfix/*  -> PR must target master
#   anything else         -> no check
#
# CLAUDE_HOOK_BRANCH may override the detected branch (used by the test harness only).

set -uo pipefail

input=$(cat)

tool_name=$(jq -r '.tool_name // ""' <<<"$input")
[[ "$tool_name" == "Bash" ]] || exit 0

command=$(jq -r '.tool_input.command // ""' <<<"$input")
flat=$(printf '%s' "$command" | tr '\n' ' ')

# Word-boundary check for `gh pr create`
if ! grep -Eq '(^|[^[:alnum:]_])gh[[:space:]]+pr[[:space:]]+create([[:space:]]|$)' <<<"$flat"; then
  exit 0
fi

current_branch="${CLAUDE_HOOK_BRANCH:-$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")}"

case "$current_branch" in
  feature/*|bugfix/*) required_base="develop" ;;
  release/*|hotfix/*) required_base="master" ;;
  *) exit 0 ;;
esac

# Extract --base value (handles `--base x` and `--base=x`)
base_value=$(grep -oE -- '--base[= ][^[:space:]]+' <<<"$flat" | head -1 | sed -E 's/^--base[= ]//')

if [[ "$base_value" == "$required_base" ]]; then
  exit 0
fi

if [[ -z "$base_value" ]]; then
  reason="git flow: PRs from branch '$current_branch' must target '$required_base'. Add --base $required_base to the gh pr create command."
else
  reason="git flow: PRs from branch '$current_branch' must target '$required_base', not '$base_value'. Change --base to $required_base."
fi

jq -nc --arg reason "$reason" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: $reason
  }
}'
