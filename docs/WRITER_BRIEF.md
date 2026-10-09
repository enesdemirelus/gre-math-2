# Section writer brief

You write the complete content for one or two sections of the GRE Quant review site in /home/user/gre-math-2. Do not commit or push.

## Read first
1. `docs/CONTENT_GUIDE.md`: the rules. Follow them exactly.
2. `content/types.ts`: the schema.
3. `content/outline.ts`: your section ids, numbers, titles and parts.
4. **The quality model:** `content/sections/3-5-circles.ts`, `content/diagrams/3-5-circles.tsx` and `content/interactives/3-5-circles.tsx`. This section passed both reviews. Skim it to match its tone, depth, structure and the way questions and explanations are written, then match or exceed it.
5. `sources/notes/<part>.md` for your section, then the Math Review PDF pages themselves (`sources/math-review.pdf`; PDF page = printed page + 1; use the Read tool with `pages`). Also read the MR exercises for your part to calibrate difficulty, but do not copy them. For format and difficulty, see `sources/qrs.txt` (official ETS sample questions; do not copy them either).

## The reader
- Math/CS background; GRE in two weeks; Turkish speaker.
- Wants a friendly, structured, textbook-like lesson in prose that teaches how the GRE uses each idea. Not bullet-point recall, and not from scratch.
- Wants the English vocabulary, with the proper Turkish math term shown on hover.
- Wants hard, realistic practice.
- Wants the site to be clearly better than the PDF, so include 1–2 genuinely useful interactive explorers per section.

## Deliverables per section `<id>`
- `content/sections/<id>.ts`: `const section: Section = {...}; export default section;`
- `content/diagrams/<id>.tsx`, if the section needs figures or data displays. Data displays (bar graphs, histograms, circle graphs, scatterplots, boxplots, normal curves, Venn diagrams, number lines, coordinate planes) are SVG components drawn to scale from props or data.
- `content/interactives/<id>.tsx` (`"use client"`).
- **Do NOT edit** `content/sections/index.ts`, `content/diagrams/index.ts` or `content/interactives/index.ts`. Several writers run in parallel and the main session registers everything. Instead, export from your diagrams and interactives files a registry object:
  ```ts
  export const registry = { "<id>/<Name>": Component, ... };
  ```
  The main session spreads it into the index.

## Lessons learned from the pilot review (avoid these)
- Do not state a fact as ETS's if the MR does not state it. If you need a standard fact outside the MR (e.g. "the longer side is opposite the larger angle"), add "(a standard fact, though not stated in the ETS Math Review)", or reason from an MR fact instead.
- Get "if and only if" statements exactly right, including their hypotheses.
- Every `source` must cite the page(s) the definition really comes from (MR p. X and/or MC p. Y).
- Turkish terms must be the standard MEB textbook terms. When unsure between two, give both separated by " / ".
- Figure labels must not touch lines. Offset point labels away from the figure.
- Keep inline math short. Put long equations in `math` blocks, which scroll on mobile; long inline math gets clipped on phones.

## Verification before you finish (required)
- Every numeric answer, and every number in every explanation, checked with python3.
- Your files type-check: `npx tsc --noEmit` passes. Your files are not registered yet, so also run `npx tsx scripts/check-section.ts <id>`, which validates an unregistered section file and parses all of its KaTeX.
- Render each diagram once and look at it (e.g. write a small script that renders the component to static markup with `react-dom/server` and converts it with Playwright, or view the component in `/dev/demo`). At minimum, sanity-check every coordinate you compute.

## Report back (≤200 words)
Counts (lesson blocks, terms, examples, quick, quiz by type and difficulty), interactives built, judgement calls on scope or Turkish, and anything uncertain.

## Save early
Runs can be cut off by rate limits. Write each file to disk as soon as you have a first complete draft and refine it in place, rather than holding everything until the end. If a file for your section already exists (from an earlier interrupted run), read it and continue from it.
