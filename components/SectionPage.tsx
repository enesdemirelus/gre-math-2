"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Section } from "@/content/types";
import { TermsProvider } from "./TermContext";
import { RichText } from "./RichText";
import { Lesson } from "./Lesson";
import { Vocabulary } from "./Vocabulary";
import { Examples, QuickQuestions } from "./Examples";
import { Quiz } from "./Quiz";
import { getKnown, getQuiz, useStored } from "@/lib/progress";

const PARTS = [
  ["lesson", "Lesson"],
  ["vocabulary", "Vocabulary"],
  ["examples", "Worked examples"],
  ["quick", "Quick questions"],
  ["quiz", "Chapter quiz"],
] as const;

export interface NavLink {
  id: string;
  number: string;
  title: string;
  available: boolean;
}

export function SectionPage({ section, prev, next }: { section: Section; prev?: NavLink | null; next?: NavLink | null }) {
  const [active, setActive] = useState<string>("lesson");
  const [quiz] = useStored(() => getQuiz(section.id), null);
  const [known] = useStored(() => getKnown(section.id), [] as string[]);

  useEffect(() => {
    const els = PARTS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      let cur = "lesson";
      for (const el of els) if (el.getBoundingClientRect().top < 140) cur = el.id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const knownCount = section.terms.filter((t) => known.includes(t.id)).length;

  return (
    <TermsProvider terms={section.terms}>
      <article className="content">
        <header className="sec-head">
          <h1>
            {section.number} {section.title}
          </h1>
          <div className="summary">
            <RichText text={section.summary} />
          </div>
          <div className="meta">ETS Math Review pp. {section.mrPages}</div>
          <div className="progress-line">
            {quiz ? `Best quiz score: ${quiz.best} / ${quiz.total}` : "Quiz not taken yet"} · Flashcards known: {knownCount} / {section.terms.length}
          </div>
        </header>
        <nav className="jump" aria-label="Jump to part">
          {PARTS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {label}
            </a>
          ))}
        </nav>

        <section id="lesson" className="part">
          <h2>Lesson</h2>
          <Lesson blocks={section.lesson} />
        </section>
        <section id="vocabulary" className="part">
          <h2>Vocabulary</h2>
          <Vocabulary sectionId={section.id} terms={section.terms} />
        </section>
        <section id="examples" className="part">
          <h2>Worked examples</h2>
          <Examples questions={section.examples} sets={section.exampleSets} />
        </section>
        <section id="quick" className="part">
          <h2>Quick questions</h2>
          <QuickQuestions items={section.quick} />
        </section>
        <section id="quiz" className="part">
          <h2>Chapter quiz</h2>
          <Quiz sectionId={section.id} questions={section.quiz.questions} sets={section.quiz.sets} />
          <p className="muted" style={{ fontSize: 14 }}>
            Official ETS practice:{" "}
            <a href="https://www.ets.org/gre/test-takers/general-test/prepare/content/quantitative-reasoning.html">Quantitative Reasoning sample questions</a>.
          </p>
        </section>

        {(prev || next) && (
          <div className="sec-nav">
            <span>{prev && <Link href={`/${prev.id}`}>← {prev.number} {prev.title}{prev.available ? "" : " (soon)"}</Link>}</span>
            <span>{next && <Link href={`/${next.id}`}>{next.number} {next.title}{next.available ? "" : " (soon)"} →</Link>}</span>
          </div>
        )}
      </article>
    </TermsProvider>
  );
}
