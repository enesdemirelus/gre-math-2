# GRE Quant Review: Plan

A local review site for the GRE Quantitative Reasoning measure. It is built for someone who already knows the math and needs three things: fast recall, the English vocabulary (especially geometry), and GRE-format practice.

## 1. Sources

All content is checked against these official ETS documents. They are downloaded locally into `sources/` and are not committed (see `sources/README.md`).

| Short name | Document | Use |
|---|---|---|
| **MR** | *Math Review for the GRE General Test* (© 2024 ETS, 198 pp.) | Main source for topics, definitions, facts, formulas |
| **MC** | *Math Conventions for the GRE General Test* (© 2024 ETS, 18 pp.) | Notation, assumptions about figures, statistics conventions |
| **QRS** | *GRE Quantitative Reasoning Strategies* (official sample questions with explanations, 27 pp.) | Question format and difficulty |
| **QR page** | ets.org Quantitative Reasoning overview | Content areas, the four question types, what is *not* tested |

Source notes, with every definition, formula and convention cited to a printed MR/MC page, are in `sources/notes/` (one file per part). Content writers and reviewers work from these notes and the PDFs.

### Scope rules (from the QR page)
- Content stays at the level of a second course in algebra or below.
- **No** trigonometry, calculus, inferential statistics or proofs.
- Only content the MR covers. A few standard terms that the MR does not name are a separate case; see section 6, "Decisions to confirm".

### Notation rules (from MR Part 3 and MC)
- A segment and its length are both written $AB$ (not $\overline{AB}$).
- Angles are written "angle $ABC$" or $\angle ABC$, and their measure as "the measure of angle $ABC$ is $x^\circ$" (not $m\angle$).
- Congruence and similarity are written in words ("congruent", "similar"), not with the symbols $\cong$ and $\sim$.
- An arc is named by three points ("arc $ABC$").
- The only figure marking ETS uses is the small square for a right angle. If any diagram ever uses tick marks, it will say they are our own notation.
- Figures are *not necessarily drawn to scale*. Coordinate planes, number lines and data graphs *are* drawn to scale (MC pp. 8–11, 16).
- Standard deviation is the population SD (MC p. 13 #8). "Average" without qualification can mean a rate (MC p. 13 #2).
- Rounding: halfway rounds to the greater number for positives and to the lesser number for negatives (MC p. 4 #5).
- Remainders: $n = qd + r$ with $0 \le r < |d|$ (MC p. 5 #9). The MR gives this for $d > 0$.

## 2. Topic list (sidebar)

The topic list is the MR's own table of contents: 28 sections. The sidebar also has two extra pages, *Home* and *Conventions*.

| Group | # | Section | MR pages (printed) |
|---|---|---|---|
| — | | **Home**: how to use the site, the four question types, links to the official sample questions | |
| — | | **Conventions**: MC summary (numbers, figures, coordinate systems, sets/lists, statistics, graphs, interpreting wording) | MC 1–18 |
| **Arithmetic** | 1.1 | Integers | 3–7 |
| | 1.2 | Fractions | 7–11 |
| | 1.3 | Exponents and Roots | 11–14 |
| | 1.4 | Decimals | 14–16 |
| | 1.5 | Real Numbers | 16–20 |
| | 1.6 | Ratio | 20–21 |
| | 1.7 | Percent | 21–27 |
| **Algebra** | 2.1 | Algebraic Expressions | 36–40 |
| | 2.2 | Rules of Exponents | 40–43 |
| | 2.3 | Solving Linear Equations | 43–48 |
| | 2.4 | Solving Quadratic Equations | 48–51 |
| | 2.5 | Solving Linear Inequalities | 51–53 |
| | 2.6 | Functions | 53–54 |
| | 2.7 | Applications | 54–61 |
| | 2.8 | Coordinate Geometry | 61–72 |
| | 2.9 | Graphs of Functions | 72–79 |
| **Geometry** | 3.1 | Lines and Angles | 92–95 |
| | 3.2 | Polygons | 95–96 |
| | 3.3 | Triangles | 96–102 |
| | 3.4 | Quadrilaterals | 102–105 |
| | 3.5 | Circles | 106–112 |
| | 3.6 | Three-Dimensional Figures | 112–114 |
| **Data Analysis** | 4.1 | Methods for Presenting Data | 125–139 |
| | 4.2 | Numerical Methods for Describing Data | 139–149 |
| | 4.3 | Counting Methods | 149–157 |
| | 4.4 | Probability | 157–164 |
| | 4.5 | Distributions of Data, Random Variables, and Probability Distributions | 164–180 |
| | 4.6 | Data Interpretation Examples | 180–185 |

## 3. Content outline per section

Every section page follows the same five parts in order: **Lesson** (Recall), **Vocabulary**, **Worked examples**, **Quick questions**, **Chapter quiz**. The outline below lists what each section's lesson and Vocabulary cover, and what its quiz focuses on. "Recall" in the outline means the topics the lesson teaches, not a bullet list.

### Arithmetic
- **1.1 Integers.** Recall: factors and multiples; the facts about 0 and 1; LCM and GCD; quotient and remainder with $0 \le r < d$, including negative dividends; even/odd sum and product rules; primes (> 1; 2 is the only even prime); prime factorization; composite numbers. Vocab: integer, factor/divisor, multiple, divisible, LCM, GCD/GCF, quotient, remainder, even, odd, prime, prime factorization, composite. Quiz: remainders, divisibility, counting factors, parity, consecutive integers.
- **1.2 Fractions.** Recall: equivalent fractions, adding/subtracting with a common denominator, multiplying, dividing (invert and multiply), mixed numbers, comparing fractions, fractional expressions. Vocab: numerator, denominator, rational number, common denominator, reciprocal, mixed number. Quiz: comparisons (QC), complex fractions, fraction-of-a-quantity word problems.
- **1.3 Exponents and Roots.** Recall: base and exponent; the rules for negative bases and zero/negative exponents; square roots (the symbol means the nonnegative root); $\sqrt{a^2} = a$ for $a > 0$; root rules ($\sqrt{a}\sqrt{b}=\sqrt{ab}$, etc.); higher-order roots. Vocab: base, exponent, square, square root, cube root, $n$th root. Quiz: powers of fractions between 0 and 1, sizes of roots, simplifying.
- **1.4 Decimals.** Recall: place value, terminating vs. repeating decimals, converting between fractions and decimals, irrational numbers. Vocab: digit, place value (tenths, hundredths…), terminating, repeating, irrational. Quiz: place-value digit problems, rounding per MC, repeating decimals.
- **1.5 Real Numbers.** Recall: the number line; order; intervals; absolute value; the triangle inequality $|r+s| \le |r|+|s|$; properties of the real numbers (commutative, associative, distributive, sign rules, rules for 0 and 1). Vocab: real number line, between, interval, absolute value, triangle inequality. Quiz: sign reasoning QC, number-line distance, absolute value.
- **1.6 Ratio.** Recall: the ways to write a ratio ($a$ to $b$, $a:b$, $\frac ab$); ratios of three or more quantities; proportions; cross multiplication. Vocab: ratio, proportion, cross multiplication. Quiz: part-to-part vs. part-to-whole, scaling, changing ratios.
- **1.7 Percent.** Recall: percent as a fraction or decimal; finding part, whole, or percent; percents greater than 100; percent change measured against the *initial* value; successive percent changes. Vocab: percent, base, percent increase, percent decrease, percent change. Quiz: successive changes, percent of a percent, reverse percent.

### Algebra
- **2.1 Algebraic Expressions.** Recall: terms, coefficients, like terms; polynomials and their degree; factoring (common factor, difference of squares, trinomials); the standard identities $(a+b)^2$, $(a-b)^2$, $(a+b)(a-b)$; restrictions on rational expressions. Vocab: variable, term, coefficient, like terms, constant term, polynomial, degree, quadratic, cubic, identity. Quiz: factoring and simplifying, QC on identities.
- **2.2 Rules of Exponents.** Recall: the full list of rules on MR p. 40, plus fractional exponents $a^{m/n}$ for $a>0$. Vocab: base, exponent. Quiz: same-base equations, comparing large powers.
- **2.3 Solving Linear Equations.** Recall: equivalent equations; one variable; two variables; systems solved by substitution and by elimination; systems with no solution or infinitely many. Vocab: equation, solution, linear equation, ordered pair, system/simultaneous equations, substitution, elimination. Quiz: systems, "what is $x+y$?" shortcuts.
- **2.4 Solving Quadratic Equations.** Recall: the quadratic formula; the number of real roots set by the expression under the root (ETS does not use the word "discriminant"); solving by factoring; the zero product rule. Vocab: quadratic equation, quadratic formula, root/solution. Quiz: roots, sums of roots by factoring, QC on solutions.
- **2.5 Solving Linear Inequalities.** Recall: equivalent inequalities; multiplying or dividing by a negative reverses the direction; solution sets on a number line; compound inequalities. Vocab: inequality, solution set, equivalent inequalities. Quiz: ranges of values, "indicate all" with integer solutions.
- **2.6 Functions.** Recall: notation $f(x)$; domain (assumed to be all real $x$ for which $f(x)$ is real, MC p. 7); piecewise functions; nonstandard operator symbols defined in a question (MC p. 7). Vocab: function, value, input, output, domain, piecewise-defined. Quiz: evaluating, composition, defined operators.
- **2.7 Applications.** Recall: translating words into expressions; average; mixture; $d=rt$; work (add the rates); systems from word problems; profit; simple and compound interest with $r$ in percent. Vocab: principal, simple interest, compound interest, compounded (annually/quarterly), rate, profit, revenue. Quiz: rate/work, mixture, interest.
- **2.8 Coordinate Geometry.** Recall: the $xy$-plane and quadrants; reflections and symmetry about the axes and the origin; distance via the Pythagorean theorem (the MR has no separate distance formula); slope; $y=mx+b$; intercepts; parallel and perpendicular slopes; graphs of linear inequalities; parabolas $y=ax^2+bx+c$ (vertex, line of symmetry); the circle $(x-a)^2+(y-b)^2=r^2$. Vocab: origin, quadrant, coordinates, slope, $x$-/$y$-intercept, reflection, symmetry, parabola, vertex, line of symmetry. Quiz: slopes, intercepts, regions, circle and parabola equations.
- **2.9 Graphs of Functions.** Recall: graphs of linear, quadratic, absolute value, and square-root-type functions; piecewise graphs; the transformations $f(x)+c$, $f(x+c)$, $-f(x)$, $cf(x)$ (vertical stretch or shrink only, as in the MR). Vocab: shift (up, down, left, right), reflection, stretch, shrink, piecewise-defined. Quiz: identifying transformations, intersections.

### Geometry (every vocabulary card has a labeled diagram)
- **3.1 Lines and Angles.** Recall: lines, segments, midpoint; angles formed by intersecting lines; vertical (opposite) angles are congruent; right, acute, and obtuse angles; perpendicular lines; a transversal of two parallel lines makes angles that are either congruent or sum to $180^\circ$. Vocab (with diagrams): line, line segment, endpoint, midpoint, vertex, vertical angles, congruent angles, perpendicular, right/acute/obtuse angle, parallel lines.
- **3.2 Polygons.** Recall: polygon, convex polygon; interior angle sum $(n-2)180^\circ$; regular polygons; perimeter; area. Vocab: polygon, side, vertex, diagonal, interior angle, triangle/quadrilateral/pentagon/hexagon/octagon, regular polygon, perimeter, area.
- **3.3 Triangles.** Recall: angle sum $180^\circ$; side–angle order; the triangle inequality; equilateral, isosceles, and right triangles; the Pythagorean theorem; $45$-$45$-$90$ ($1:1:\sqrt2$) and $30$-$60$-$90$ ($1:\sqrt3:2$) triangles; area $\frac12bh$ with any side as base; congruence (SSS, SAS, ASA, AAS) and similarity (corresponding sides proportional, angles equal). Vocab (with diagrams): equilateral, isosceles, right triangle, hypotenuse, leg, base, height/altitude, congruent triangles, similar triangles, scale factor.
- **3.4 Quadrilaterals.** Recall: quadrilateral angle sum $360^\circ$; parallelogram, rectangle, square, trapezoid; properties of their diagonals; area formulas. Vocab (with diagrams): parallelogram, rectangle, square, trapezoid, bases of a trapezoid, diagonal, height.
- **3.5 Circles.** Recall: center, radius, diameter, chord (the diameter is the longest chord); circumference $C = 2\pi r$; arc, central angle, measure of an arc, arc length $\frac{x}{360}(2\pi r)$; area $\pi r^2$; sector area $\frac{x}{360}(\pi r^2)$; a tangent is perpendicular to the radius at the point of tangency; inscribed and circumscribed figures; a triangle inscribed in a semicircle has a right angle; concentric circles. Vocab (with diagrams): circle, center, radius, diameter, chord, circumference, arc, central angle, sector, tangent, point of tangency, inscribed, circumscribed, concentric, $\pi$.
- **3.6 Three-Dimensional Figures.** Recall: the rectangular solid (faces, edges, vertices, dimensions); the cube; volume $V=\ell wh$ and surface area $2(\ell w + \ell h + wh)$; the right circular cylinder, with $V=\pi r^2h$ and surface area $2\pi r^2 + 2\pi rh$. Spheres, cones, and pyramids are named in the MR without formulas, so formulas for them would be given in a question. Vocab (with diagrams): rectangular solid, face, edge, vertex, cube, volume, surface area, cylinder, base, lateral surface, height.

Geometry quizzes include figure-based QC questions that test the "not drawn to scale" convention.

### Data Analysis
- **4.1 Methods for Presenting Data.** Recall: quantitative vs. categorical variables; distribution of data; frequency and relative frequency (distributions and tables); bar graphs, including segmented (stacked) and side-by-side; histograms with classes; circle graphs, whose sector angle is proportional to the percent; scatterplots and trend lines; line graphs and time series. Vocab: variable, quantitative, categorical, frequency, relative frequency, frequency distribution, bar graph, segmented bar graph, histogram, class, circle graph, sector, scatterplot, trend line, line graph, time series. Quiz: reading original SVG charts.
- **4.2 Numerical Methods for Describing Data.** Recall: mean; weighted mean; median (ETS method); mode; range; quartiles $Q_1, Q_2, Q_3$ and the ETS rule "median of each half"; percentiles; IQR $= Q_3 - Q_1$; outliers, which affect the range but usually not the IQR; boxplots; standard deviation by ETS's five steps (population SD, divide by $n$); standardization $\frac{x-m}{d}$. Vocab: statistic, measures of central tendency, position, and dispersion; mean; weighted mean; median; mode; quartile; percentile; range; interquartile range; outlier; boxplot; standard deviation; standardization. Quiz: how changing the data affects the mean, median, and SD (QC); quartiles and IQR; weighted and combined means. A combined median cannot be found from group medians.
- **4.3 Counting Methods.** Recall: sets and lists (repetition and order matter in lists); subsets; the empty set; union and intersection; disjoint sets; Venn diagrams; inclusion–exclusion $|S\cup T| = |S|+|T|-|S\cap T|$; the multiplication principle; $n!$ with $0!=1$; ${}_nP_k = \frac{n!}{(n-k)!}$; ${}_nC_k = \binom nk = \frac{n!}{k!(n-k)!}$. Vocab: set, element/member, subset, empty set, list, union, intersection, disjoint/mutually exclusive, Venn diagram, universal set, multiplication principle, factorial, permutation, combination. Quiz: arrangements, selections, Venn word problems.
- **4.4 Probability.** Recall: experiment, outcome, sample space, event; $P(E)$ for equally likely outcomes; $0 \le P \le 1$; the complement $1-P(E)$; $P(E 	ext{ or } F) = P(E)+P(F)-P(E 	ext{ and } F)$; mutually exclusive events; independent events, $P(E 	ext{ and } F) = P(E)P(F)$; dependent sequential events. ETS phrases dependence as "the probability that, given that the first event has already happened, the second event will happen". Vocab: probability experiment, outcome, sample space, event, fair, equally likely, complement, mutually exclusive, independent. The term "conditional probability" is listed on the QR page but not named in the MR, so it is flagged. Quiz: compound events, "at least one", dependent draws.
- **4.5 Distributions, Random Variables, Probability Distributions.** Recall: distribution curves (density/frequency curves) as smoothed relative-frequency histograms; random variables, discrete and continuous; the probability distribution of $X$; the mean/expected value $= \sum X\,P(X)$; the uniform distribution; the normal distribution (symmetric; mean = median; "about two-thirds" within 1 SD, "almost all" within 2 SD, per MR p. 175); the standard normal with the approximate interval probabilities of MC Figure 7; areas under the curve as probabilities. Vocab: random variable, discrete, continuous, probability distribution, expected value, uniform distribution, distribution curve, normal distribution, standard normal distribution. Quiz: expected value, area-under-curve reasoning, normal interval estimates.
- **4.6 Data Interpretation Examples.** Recall: how to read tables and graphs, following the QR page's DI tips (scales, units, legends, broken scales, use only the data given). Vocab: the data-display terms again, from 4.1. Worked examples and quiz: two or three **Data Interpretation sets**, i.e. several questions sharing one original table or graph, as on the real test.

Terms not used by the MR in Part 4 (z-score, least squares, conditional probability, 68–95–99.7 rule) are not used as definitions. Where common, they appear as "also called…" with the ETS term first.

## 4. Section content format

| Part | Content | Size |
|---|---|---|
| 1. Lesson (Recall) | A friendly, textbook-style lesson in prose, not bullet points. It is structured into short subsections that build on each other. It assumes you already know the math and teaches it the way the GRE uses it: the key ideas, formulas in KaTeX (with display formulas for the important ones), small inline examples, diagrams, and "watch out" asides for traps. Facts are cited to the MR/MC page. Every vocabulary word in the text has a **blue outline**; hovering it (or tapping it on touch screens) shows the English definition and the proper Turkish math term. The Turkish is the term a Turkish textbook uses (e.g. *chord → kiriş*, *circle → çember*, with *daire* for the region it encloses), not a word-for-word translation. | ~2–4 screens |
| 2. Vocabulary | A term list (term, Turkish term, short definition, optional formula, and a diagram for geometry). Practice in two modes: **Flashcards** (flip, shuffle, mark known/unknown, term→definition or definition→term; the back shows the Turkish term too) and **Matching** (pair 6 terms with 6 definitions per round). | 6–20 terms |
| 3. Worked examples | GRE-format questions with step-by-step solutions that are hidden until you click "Show solution". The set covers at least 3 of the 4 question types. | 3–4 |
| 4. Quick questions | Short recall checks (e.g. "Remainder when −17 is divided by 5?"), each with a reveal button. | 5–6 |
| 5. Chapter quiz | 10 GRE-level questions (medium to hard). Mix per quiz: ~3 Quantitative Comparison, ~3 Multiple Choice (one answer, 5 choices), ~2 Multiple Choice (one or more answers, "Indicate all such…"), ~2 Numeric Entry (integer/decimal box, or fraction with two boxes). You answer all ten, then submit. The results page shows the score, your answer vs. the correct answer, and an explanation for every question. Answers are compared exactly; equivalent fractions are accepted as on the real test. | 10 |

All questions are original, modeled on the format in QRS and on the QR page, with the standard QC answer choices and directions. No ETS question is copied. The Home page and each quiz link to the official ETS sample questions (QRS PDF and QR page).

## 5. Architecture

- **Next.js (App Router) + TypeScript**, statically generated, runs with `npm run dev` or `npm run build && npm start`. No backend, no accounts.
- **KaTeX** via the `katex` npm package, rendered with `katex.renderToString` inside a `<Tex>` component, plus a `<MathText>` component that renders strings containing `$…$` and `$$…$$`.
- **Routes:** `/` (Home), `/conventions`, `/[sectionId]` (e.g. `/1-1-integers`). The left sidebar holds the four groups, highlights the active topic, and collapses on narrow screens.
- **Content kept separate from components:**
  ```
  content/
    types.ts                 Section, Term, Example, QuickQuestion, QuizQuestion (QC | MC1 | MCM | NE)
    sections/1-1-integers.ts … 4-6-data-interpretation.ts   (one data file per section)
    conventions.ts
    diagrams/                original SVG diagrams (React components), referenced from data by key
    index.ts                 ordered registry used by the sidebar and routes
  components/                Sidebar, SectionPage, Recall, Vocabulary (Flashcards, Matching), WorkedExample,
                             QuickQuestions, Quiz (QCQuestion, MCOne, MCMany, NumericEntry), Tex, MathText, Diagram
  app/                       layout.tsx, page.tsx, conventions/page.tsx, [sectionId]/page.tsx
  scripts/
    export-for-review.ts     writes per-section question files WITHOUT answer keys (for the blind question reviewer)
                             and separate key files
    check-content.ts         schema checks: 10 quiz questions, all 4 types present, answer keys valid,
                             every $…$ parses with KaTeX (throwOnError)
  ```
- **Diagrams:** hand-drawn inline SVG (labeled points, the right-angle square, angle labels like $x^\circ$, side lengths). Labels use the same notation as ETS. Data displays (bar, circle, scatter, boxplot, histogram, normal curve) are SVG components that take data from the section file and are drawn to scale, as ETS's are.
- **Style:** one sans-serif font, a neutral palette, light and dark modes, no decoration. Content width is ~760px. The quiz shows one question per card, with the Quantity A / Quantity B columns in the ETS layout.
- **State:** quiz answers live in memory. Flashcard "known" marks and best quiz scores are kept in `localStorage`, which is optional; the site works without it.

## 6. Decisions (confirmed)

1. **Terms that are on the GRE but not in the MR.** The MR never names *supplementary/complementary angles, transversal, rhombus, inscribed angle, minor/major arc, discriminant, midpoint formula, distance formula*. ETS works the same ideas with other wording. **Proposal:** include a few of these in Vocabulary with the label *"not named in the ETS Math Review"*, because they appear in prep material and in question wording. Recall facts will stay strictly within the MR. The alternative is to leave them out entirely.
2. **Calculator:** the real test has an on-screen calculator. Quiz explanations will note when a calculator helps, but the site will not include one.
3. **Timing:** quizzes are untimed, with an elapsed-time display only. The real test allows about 1.5–2 minutes per question.

## 7. Process

| Step | What | Who (model) |
|---|---|---|
| 0 | Read ETS sources → `sources/notes/*.md` | Opus subagents ✔ |
| 1 | This plan, approved by you | main (Opus) |
| 2a | Scaffold Next.js, KaTeX wiring, sidebar and routing, components (flashcards, matching, quiz), styling, `check-content` and export scripts | Sonnet subagent |
| 2b | Write the first full section (**3.5 Circles**: it is vocabulary-heavy, uses diagrams, and exercises every feature) | Opus subagent |
| 2c | Verify 2b (see below), fix, build, screenshot → **show you** | Opus reviewers; Sonnet for screenshots |
| 3 | Remaining 27 sections and the Conventions page, written in parallel batches by part. Progress tracked in `PROGRESS.md`. | Opus writers |
| 4 | Verify every section, fix, re-review until clean | Opus reviewers |
| 5 | Final build, browser check of every section with screenshots, short report | Sonnet (screens), main (report) |

### Verification for each section (fresh-context subagents, Opus)
- **Content reviewer:** gets the section data file, the source notes, and the PDFs. Checks every definition, formula, convention, and notation against MR/MC, and checks that each Turkish term is the standard Turkish mathematical term. Reports each mismatch with the MR/MC page it conflicts with. Reports correctness and requirement gaps only, not style.
- **Question reviewer:** gets the *exported questions without keys*. Solves every worked example and quiz question independently, then compares with the key file. Flags wrong keys, ambiguous wording, more than one defensible answer, off-format questions, out-of-scope math, and questions too easy for GRE medium–hard.
- **Automated checks:** `check-content` (structure, types, KaTeX parse) and `next build` must pass.
- Fixes are made, then reviewed again by a new reviewer until it reports nothing.

## 8. Beyond the PDF (added after plan review)
- **Interactive explorers** in each lesson (1–2 per section): sliders, draggable points, random-case generators that build intuition for exactly what the GRE tests.
- **Glossary** (`/glossary`): every term across all sections, searchable in English or Turkish, with diagrams; cross-topic flashcards and matching.
- **Formula sheet** (`/formulas`): generated from the lessons' key formulas, linked back to sections.
- **Mixed practice** (`/practice`): build a test from chosen sections, GRE-style one question per screen, mark-for-review, review grid, optional GRE-pace timer, results by section and question type.
- **Progress** (`/progress`): best scores, flashcards known, and a mistakes list you can re-attempt.
- The user asked for no questions until the site is finished; decisions in §6 are taken as proposed.
