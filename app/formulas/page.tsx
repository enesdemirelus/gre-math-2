import type { Metadata } from "next";
import Link from "next/link";
import { OUTLINE, PART_TITLES } from "@/content/outline";
import { SECTIONS } from "@/content/sections";
import { Tex } from "@/components/Tex";
import type { Part } from "@/content/types";

export const metadata: Metadata = { title: "Formulas" };

export default function Page() {
  const parts = Object.keys(PART_TITLES) as Part[];
  let total = 0;
  const groups = parts.map((p) => {
    const secs = OUTLINE.filter((o) => o.part === p && SECTIONS[o.id]).map((o) => {
      const s = SECTIONS[o.id];
      const formulas = s.lesson.flatMap((b) => (b.kind === "math" && b.key ? [b.tex] : []));
      total += formulas.length;
      return { o, formulas };
    });
    return { p, secs: secs.filter((x) => x.formulas.length > 0) };
  });
  return (
    <article className="content">
      <h1>Formulas</h1>
      <p className="muted">Key formulas collected from the lessons.</p>
      {total === 0 && <p className="muted">No formulas yet. They appear here as sections are added.</p>}
      {groups.map(
        ({ p, secs }) =>
          secs.length > 0 && (
            <section key={p}>
              <h2>{PART_TITLES[p]}</h2>
              {secs.map(({ o, formulas }) => (
                <div key={o.id}>
                  <h3>
                    <Link href={`/${o.id}#lesson`}>
                      {o.number} {o.title}
                    </Link>
                  </h3>
                  {formulas.map((f, i) => (
                    <div key={i} className="math-block key">
                      <Tex tex={f} display />
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ),
      )}
    </article>
  );
}
