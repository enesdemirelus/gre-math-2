#!/bin/bash
# Usage: scripts/integrate.sh <sectionId>... — mark ready, register, check, export for review, commit and push
# only the files of the given sections (other writers' work in progress is left alone).
set -e
cd "$(dirname "$0")/.."
for id in "$@"; do grep -qx "$id" content/ready.txt || echo "$id" >> content/ready.txt; done
npx tsx scripts/register.ts
# Type-check; ignore errors from files of sections that are not ready yet.
errs=$(npx tsc --noEmit 2>&1 | grep -E 'error TS' || true)
if [ -n "$errs" ]; then
  bad=$(echo "$errs" | grep -v -E "content/(sections|diagrams|interactives)/[^/]+\.tsx?" || true)
  for id in $(cat content/ready.txt); do bad="$bad$(echo "$errs" | grep "/$id\." || true)"; done
  if [ -n "$bad" ]; then echo "$bad"; exit 1; fi
fi
npm run --silent check
files="content/ready.txt content/sections/index.ts content/diagrams/index.ts content/interactives/index.ts"
for id in "$@"; do
  npx tsx scripts/export-for-review.ts "$id" >/dev/null
  for f in content/sections/$id.ts content/diagrams/$id.tsx content/interactives/$id.tsx; do [ -f "$f" ] && files="$files $f"; done
done
git add $files
git diff --cached --quiet || git commit -qm "Add section(s): $*

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01FYZPQEg3a7TeuPwUY3kGZX"
git push -q
echo "integrated: $*"
