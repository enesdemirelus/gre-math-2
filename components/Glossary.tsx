"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Part } from "@/content/types";
import { PART_TITLES } from "@/content/outline";
import { TermsProvider } from "./TermContext";
import { RichText } from "./RichText";
import { Tex } from "./Tex";
import { Diagram } from "./Diagram";
import { Flashcards, Matching, type VocabItem } from "./Vocabulary";
import type { SectionData } from "@/lib/data";

type Mode = "browse" | "flash" | "match";

export function Glossary({ sections }: { sections: SectionData[] }) {
  const [q, setQ] = useState("");
  const [part, setPart] = useState<Part | "all">("all");
  const [mode, setMode] = useState<Mode>("browse");

  const all = useMemo(() => sections.flatMap((s) => s.terms.map((t) => ({ s, t }))).sort((a, b) => a.t.term.localeCompare(b.t.term)), [sections]);
  const filtered = all.filter(({ s, t }) => {
    if (part !== "all" && s.part !== part) return false;
    const n = q.trim().toLowerCase();
    return !n || t.term.toLowerCase().includes(n) || t.turkish.toLowerCase().includes(n);
  });
  const items: VocabItem[] = useMemo(
    () => all.filter(({ s }) => part === "all" || s.part === part).map(({ s, t }) => ({ sectionId: s.id, term: t })),
    [all, part],
  );

  if (all.length === 0) return <p className="muted">No sections are available yet.</p>;

  return (
    <div>
      <div className="row" style={{ marginBottom: 8 }}>
        <div className="seg" style={{ margin: 0 }}>
          {(
            [
              ["browse", "Browse"],
              ["flash", "Flashcards"],
              ["match", "Matching"],
            ] as const
          ).map(([m, l]) => (
            <button key={m} className={mode === m ? "on" : ""} onClick={() => setMode(m)}>
              {l}
            </button>
          ))}
        </div>
        <select value={part} onChange={(e) => setPart(e.target.value as Part | "all")} aria-label="Filter by part">
          <option value="all">All parts</option>
          {(Object.keys(PART_TITLES) as Part[]).map((p) => (
            <option key={p} value={p}>
              {PART_TITLES[p]}
            </option>
          ))}
        </select>
        {mode === "browse" && <input type="search" placeholder="Search English or Turkish" value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1, minWidth: 180 }} />}
      </div>
      {mode === "browse" && (
        <>
          <p className="muted">{filtered.length} terms</p>
          {filtered.map(({ s, t }) => (
            <div key={s.id + t.id} className="card" style={{ display: "flex", gap: 16, margin: "8px 0" }}>
              <div style={{ flex: 1 }}>
                <strong><RichText text={t.term} plainTerms /></strong> <span className="muted">{t.turkish}</span>
                {t.note && (
                  <>
                    {" "}
                    <span className="badge note">{t.note}</span>
                  </>
                )}
                <TermsProvider terms={s.terms}>
                  <div>
                    <RichText text={t.definition} />
                  </div>
                </TermsProvider>
                {t.formula && <Tex tex={t.formula} display />}
                <div style={{ fontSize: 13 }}>
                  <Link href={`/${s.id}#term-${t.id}`}>
                    {s.number} {s.title}
                  </Link>
                </div>
              </div>
              {t.diagram && (
                <div style={{ width: 140, flex: "none" }}>
                  <Diagram diagram={t.diagram} thumb showCaption={false} />
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {mode === "flash" && <Flashcards key={part} items={items} />}
      {mode === "match" && <Matching key={part} items={items} />}
    </div>
  );
}
