import Link from "next/link";
import { OUTLINE, PART_TITLES } from "@/content/outline";
import { SECTIONS } from "@/content/sections";
import { HomeProgress } from "@/components/Progress";
import type { Part } from "@/content/types";

const QR = "https://www.ets.org/gre/test-takers/general-test/prepare/content/quantitative-reasoning.html";
const QRS = "https://www.ets.org/content/dam/ets-org/pdfs/gre/quantitative-reasoning-strategies.pdf";
const MR = "https://www.ets.org/content/dam/ets-org/pdfs/gre/gre-math-review.pdf";

export default function Home() {
  const parts = Object.keys(PART_TITLES) as Part[];
  const avail = OUTLINE.filter((o) => SECTIONS[o.id]).map((o) => o.id);
  return (
    <article className="content">
      <h1>GRE Quant Review</h1>
      <p>
        A local review site for the GRE Quantitative Reasoning section. It follows the ETS Math Review section by section and assumes you already know the math: the goal is fast recall, the
        English terminology (with the Turkish term next to it), and practice in the real question formats.
      </p>

      <HomeProgress ids={avail} />

      <div className="row" style={{ margin: "12px 0" }}>
        <Link className="btn primary" href="/practice">Mixed practice</Link>
        <Link className="btn" href="/glossary">Glossary</Link>
        <Link className="btn" href="/formulas">Formulas</Link>
        <Link className="btn" href="/conventions">Conventions</Link>
      </div>

      <h2>How a section page works</h2>
      <ol>
        <li><strong>Lesson</strong>: a short textbook-style chapter. Highlighted terms show their definition and the Turkish term when you hover, focus, or tap them.</li>
        <li><strong>Vocabulary</strong>: the term list, flashcards (flip, shuffle, mark known), and a matching game.</li>
        <li><strong>Worked examples</strong>: GRE-format questions; the solution stays hidden until you ask.</li>
        <li><strong>Quick questions</strong>: one-line recall checks with a reveal button.</li>
        <li><strong>Chapter quiz</strong>: ten questions in all four formats. Submit to see your score and an explanation for every question.</li>
      </ol>

      <h2>A two-week plan</h2>
      <p>
        Go part by part, about one section per sitting: read the lesson, run through the flashcards, work the examples, then take the chapter quiz. Retry anything on the{" "}
        <Link href="/progress">Progress</Link> page&rsquo;s mistakes list. Spend the first ten days on the four parts in order (Arithmetic, Algebra, Geometry, Data Analysis), then use the last days
        for <Link href="/practice">mixed practice</Link> tests at GRE pace (1.75 minutes per question) and the <Link href="/formulas">formula sheet</Link>.
      </p>

      <h2>The four question types</h2>
      <p><strong>Quantitative Comparison.</strong> Two quantities, A and B, sometimes with information centered above them. You decide which is greater, whether they are equal, or whether the relationship cannot be determined. The four choices are always the same.</p>
      <p><strong>Multiple Choice, one answer.</strong> Five choices, shown with ovals; exactly one is correct.</p>
      <p><strong>Multiple Choice, one or more answers.</strong> Three or more choices, shown with squares; select every correct one. There is no partial credit, so the set must match exactly.</p>
      <p><strong>Numeric Entry.</strong> You type the answer in a box, or in two boxes (numerator over denominator) for a fraction. Equivalent fractions are accepted.</p>

      <h2>Official ETS material</h2>
      <ul>
        <li><a href={QR}>Quantitative Reasoning: sample questions and question types</a></li>
        <li><a href={QRS}>Quantitative Reasoning strategies (PDF)</a></li>
        <li><a href={MR}>GRE Math Review (PDF)</a></li>
      </ul>

      <h2>All sections</h2>
      {parts.map((p, pi) => (
        <div key={p}>
          <h3>
            {pi + 1}. {PART_TITLES[p]}
          </h3>
          <div className="grid">
            {OUTLINE.filter((o) => o.part === p).map((o) => (
              <Link key={o.id} href={`/${o.id}`} className={"tile" + (SECTIONS[o.id] ? "" : " off")}>
                <span className="num">{o.number}</span>
                {o.title}
                <div>
                  <span className={"badge" + (SECTIONS[o.id] ? " good" : "")}>{SECTIONS[o.id] ? "available" : "coming soon"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </article>
  );
}
