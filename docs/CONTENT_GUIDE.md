# Content guide (for section writers and reviewers)

Read `PLAN.md` first. The schema is `content/types.ts`. One section = one file `content/sections/<id>.ts` exporting `const section: Section` as default export, plus (if needed) one diagrams file `content/diagrams/<id>.tsx`.

## Reader
A student with a math/CS background, two weeks before the GRE. They know the math. They need: fast recall of how the GRE frames it, the **English** terminology (they are a Turkish speaker), and GRE-format practice. Medium–hard practice, no hand-holding on basic algebra.

## Sources and fidelity (hard rules)
- Every definition, fact, formula and convention must agree with the ETS **Math Review (MR)** and **Math Conventions (MC)**. Use `sources/notes/<part>.md` (page-cited) and, when in doubt, the PDFs in `sources/` (Read tool with `pages`; PDF page = printed page + 1 for the MR).
- Use ETS notation: segment/length $AB$ (not $\overline{AB}$); "the measure of angle $ABC$" / $\angle ABC$ (no $m\angle$); words "congruent"/"similar" (no $\cong$, $\sim$); arcs named by three points ("arc $ABC$"); right angle = small square. No tick marks.
- Nothing the GRE does not test: no trigonometry, no calculus, no inferential statistics, no proofs.
- A term the MR does not name may appear only as a vocabulary term with `note: "Not named in the ETS Math Review"`; lesson facts stay within the MR.
- Do not copy ETS examples, exercises, or sample questions. Write original ones. Similar *structure* is fine; same numbers/story is not.
- Cite pages in the lesson sparingly but usefully, e.g. "(MR p. 107)" at the end of a paragraph that states a key fact.

## Lesson (the "Recall" part)
A friendly, structured textbook chapter in **prose** — not bullet points. Think "a good tutor's notes": short paragraphs that build the topic step by step, each subsection introduced with a `heading` block. Pattern per subsection: idea in plain words → the formula (`math` block, `key: true` for formulas worth memorising) → a one-line concrete example → (optional) a `diagram` → an `aside` for a GRE trap (`tone: "watch"`), a speed tip (`"tip"`), or how the GRE phrases it (`"gre"`).
- Assume competence: skip proving things, skip arithmetic drills, but do explain *how the GRE uses* each idea.
- Highlight every vocabulary term at least once in the lesson with `[[termId]]` / `[[termId|shown text]]`, ideally where it is first explained. Every `[[id]]` must exist in `terms`.
- Length: roughly 2–4 screens. End with a short "Putting it together" subsection or a `watch` aside listing the classic traps (prose, not a long list).
- `list` blocks only when the content is truly a list (e.g. formula sheet of 4 areas).

## Vocabulary (`terms`)
- `term`: English as ETS uses it. `definition`: one or two sentences faithful to the MR wording.
- `turkish`: the **standard Turkish mathematical term** as used in Turkish school textbooks (MEB), not a literal translation. Distinguish carefully, e.g. circle (curve) = *çember*, the region it encloses = *daire*; chord = *kiriş*; radius = *yarıçap*; diameter = *çap*; circumference = *çember çevresi* (or *çevre*); arc = *yay*; central angle = *merkez açı*; tangent = *teğet*; sector = *daire dilimi*; hypotenuse = *hipotenüs*; leg = *dik kenar*; integer = *tam sayı*; prime = *asal sayı*; remainder = *kalan*; quotient = *bölüm*; numerator/denominator = *pay/payda*; slope = *eğim*; intercept = *eksen kesim noktası* (x-intercept = *x eksenini kestiği nokta*); median = *medyan (ortanca)*; mode = *mod (tepe değer)*; standard deviation = *standart sapma*; permutation = *permütasyon*; combination = *kombinasyon*. If two Turkish terms are common, give both separated by " / ".
- Geometry terms: give each a `diagram` that labels exactly the thing being defined (e.g. chord $AB$ drawn in a circle with center $O$).

## Questions
Four official types (QR page). Follow the ETS format exactly:
- **QC** (`qc`): optional centered `given`, then Quantity A and Quantity B. The four standard choices are rendered by the UI. Answer D only if both directions are genuinely possible; never if the values are computable.
- **MC one** (`mc1`): exactly 5 choices, one correct, choices in a sensible order (numbers ascending).
- **MC one or more** (`mcm`): 3–8 choices; stem ends "Indicate all such …" (or "Indicate two such …"). At least one correct; it is fine if only one is correct.
- **NE** (`ne`): integer/decimal box (`decimal`) or fraction boxes (`fraction`). State rounding instructions in the stem if the answer is not exact ("Give your answer to the nearest whole number.").
- Figures: if a geometric figure is not to scale, caption "Note: Figure not drawn to scale." Coordinate planes and data graphs are drawn to scale (MC).
- Explanations: step-by-step, concise, show the efficient GRE route (and the trap).

Quantity per section: 3–4 worked examples (cover ≥3 types), 5–6 quick questions (short recall checks with one-line answers), quiz of **exactly 10**: about 3 `qc`, 3 `mc1`, 2 `mcm`, 2 `ne` (every type at least once), difficulty mostly medium and hard (at most 2 "easy", at least 4 "hard").
Every answer must be verified by you numerically (you may run python3 via Bash to check arithmetic). Avoid ambiguity: specify integers vs. real numbers, "positive", distinctness, "inclusive", etc.

## Diagrams (`content/diagrams/<id>.tsx`)
- Plain React function components returning an `<svg>` with a `viewBox`, width ≤ 360 (UI scales it). No external libraries, no hooks.
- Use these CSS classes (defined globally), never hard-coded colors: `dg-line` (stroke, no fill), `dg-thin` (thin stroke), `dg-dashed`, `dg-fill` (light shaded region), `dg-accent` (stroke in accent color — the thing being defined/highlighted), `dg-accent-fill`, `dg-point` (filled dot), `dg-label` (italic serif text for point/variable labels), `dg-text` (upright text for numbers like "120°", "6").
- Export each component and register it in `content/diagrams/index.ts` (`diagrams` record, key = `"<section-id>/<name>"`). Props allowed (e.g. which part to highlight) so one drawing can serve several terms.
- Draw cleanly: labels must not collide with lines; right angles shown with a small square; points as small dots.

## Raw strings
Write every RichText/LaTeX string as `String.raw\`...\``. Inside it never write `${` (that is template interpolation) – use `$ {` or restructure.

## Interactive explorers (make the site better than the PDF)
Each section's lesson should contain **1–2 interactive explorers** (`{ kind: "interactive", key, props?, title?, caption? }`) where they genuinely help build intuition or speed — e.g. a slider for a central angle that live-updates arc length and sector area as fractions of $2\pi r$ and $\pi r^2$; a draggable point; a "generate a random case" button that shows a quick computation; a number line where you place values. Keep them small and focused on what the GRE tests.
- Write them in `content/interactives/<section-id>.tsx`, starting with `"use client";`. React hooks allowed; no external libraries. Use the same `dg-*` SVG classes; for UI controls use plain `<input type="range">`, `<button>` (global styles apply). To render math inside them, import `{ Tex }` from `@/components/Tex` (props: `tex: string`, `display?: boolean`).
- Register in `content/interactives/index.ts` with key `"<section-id>/<name>"`.
- Must be mathematically exact (round displayed values sensibly, show exact forms in terms of π where natural).
- Must work with mouse and touch (pointer events) and at 390px width.
