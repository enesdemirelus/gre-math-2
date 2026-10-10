# Final report

## Run it
```
npm install
npm run build && npm start      # http://localhost:3000   (or: npm run dev)
```

## What is there
- **28 sections**, following the ETS Math Review's own section list (1.1–4.6), plus **Conventions**, **Glossary**, **Formula sheet**, **Mixed practice** (GRE-style timed tests) and **Progress** (best scores, flashcards known, mistakes to retry).
- **Each section page:**
  1. **Lesson:** friendly textbook-style prose. Vocabulary words have a blue outline; hovering one shows the English definition and the standard Turkish (MEB) term. Each lesson also has 1–2 interactive explorers.
  2. **Vocabulary:** a term table with diagrams for geometry terms, plus flashcards and a matching game.
  3. **Worked examples:** 4 per section, with step-by-step solutions.
  4. **Quick questions:** 5–7 per section.
  5. **Chapter quiz:** 10 questions in all four ETS formats (QC, MC-one, MC-many, Numeric Entry). After submitting you get a score and an explanation for every question.
- **Content and code layout:** content lives in `content/sections/<id>.ts`, one data file per section. Diagrams and explorers are in `content/diagrams` and `content/interactives`. Components are in `components/`.

## Evidence
- **Build:** `npm run build` → "✓ Compiled successfully", "✓ Generating static pages (38/38)".
- **Static checks:**
  - `npm run lint` → clean.
  - `npx tsc --noEmit` → clean.
  - `npm run check` → "Checked 28 section(s) + conventions: 0 error(s), 0 warning(s)". This checks that every KaTeX string parses, every quiz has exactly 10 questions and all 4 types, and that answer keys, term references and diagram keys are valid.
- **Browser QA** (`scripts/qa.ts`): headless Chromium opened every route (34 routes) at 1280 px and 390 px.
  - Result: 0 page errors, 0 console errors, 0 KaTeX errors and 0 horizontal overflow.
  - The only flags were false positives: literal dollar amounts like "$8", and KaTeX's own hidden √ helper SVGs.
  - One real bug was found and fixed: vocabulary-table thumbnails collapsing to 0 px.
  - Spot screenshots are in `screenshots/` (not committed).

## Reviews (fresh-context subagents)
Every section had two reviewers: a **content reviewer**, which checked against the ETS PDFs, and a **blind question reviewer**, which solved every item before seeing the key. The Conventions page had a content review. Per-section findings and fixes are listed in `PROGRESS.md`. Summary:
- **Wrong answer keys found: 0.** Every blind solution matched the key in all 28 sections.
- **Questions:** about 30 quiz items were rejected as too easy for GRE medium–hard and replaced with harder ones. A few others were fixed for ambiguity:
  - boxplot values that sat between gridlines;
  - a "the two sectors are adjacent" claim that the figure contradicted;
  - a missing tank-capacity condition;
  - a notation clash.
- **Content:**
  - Many places reused ETS's own example numbers, which is not allowed; they were replaced with original ones.
  - Some facts were presented as ETS's that the Math Review does not state; these are now labeled "standard fact, not stated in the ETS Math Review".
  - Wrong page citations, Turkish terms that weren't the standard MEB ones, and a few diagram and explorer bugs (KaTeX escaping, legends, color collisions) were fixed.
  - One statement contradicted MC p. 9 ("figures are drawn to scale"); it was fixed.

## Not verified against an official source / caveats
- **Turkish terms:** chosen by the writers and checked by the reviewers against standard MEB usage. No official ETS or MEB glossary was used.
- **Terms ETS doesn't name** (supplementary, transversal, rhombus, discriminant, z-score, conditional probability, …): these are included as vocabulary but explicitly labeled "Not named in the ETS Math Review". "Conditional probability" comes from the ETS QR web page.
- **ETS quartile method for an odd number of data:** the Math Review does not say whether the median is left out of the halves. We exclude it, which is the only reading consistent with ETS's answer to MR Exercise 2 (p. 194).
- **Follow-up review:** fixes after a review were checked by `npm run check`, the type-check and numeric re-computation, but not by a second full reviewer pass. The account's usage and spend limits made that impractical.
- **Writer models:** sections 2.6, 2.9, 3.1–3.4, 3.6 and 4.1–4.6 and the Conventions page were written by Sonnet to save usage, as you asked. They were reviewed by Opus like every other section.
- **Two-panel line graphs in 4.6:** there is extra blank space above the first panel. This is cosmetic.
