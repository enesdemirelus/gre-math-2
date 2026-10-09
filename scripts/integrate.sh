#!/bin/bash
# Usage: scripts/integrate.sh <sectionId>... — register, check, export for review, commit and push.
set -e
cd "$(dirname "$0")/.."
npx tsx scripts/register.ts
npx tsc --noEmit
npm run --silent check
for id in "$@"; do npx tsx scripts/export-for-review.ts "$id" >/dev/null; done
git add -A
git commit -qm "Add section(s): $*

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01FYZPQEg3a7TeuPwUY3kGZX"
git push -q
echo "integrated: $*"
