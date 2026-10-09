"use client";
import { useState } from "react";
import type { DataSet, Question, QuickQuestion } from "@/content/types";
import { QuestionView, DataSetView } from "./QuestionView";
import { RichText } from "./RichText";

export function seenSetsFor(questions: Question[], sets: DataSet[] | undefined) {
  // returns, for each question index, the DataSet to show above it (only at first use)
  const shown = new Set<string>();
  return questions.map((q) => {
    if (!q.setId || shown.has(q.setId)) return undefined;
    shown.add(q.setId);
    return sets?.find((s) => s.id === q.setId);
  });
}

function ExampleItem({ q, n }: { q: Question; n: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <QuestionView q={q} heading={`Example ${n}`} revealed={open} showSolution={open} />
      <button className="btn" style={{ marginTop: -8 }} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Hide solution" : "Show solution"}
      </button>
    </div>
  );
}

export function Examples({ questions, sets }: { questions: Question[]; sets?: DataSet[] }) {
  const above = seenSetsFor(questions, sets);
  return (
    <div>
      {questions.map((q, i) => (
        <div key={q.id}>
          {above[i] && <DataSetView set={above[i]!} />}
          <ExampleItem q={q} n={i + 1} />
        </div>
      ))}
    </div>
  );
}

export function QuickQuestions({ items }: { items: QuickQuestion[] }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <ol style={{ paddingLeft: "1.4em" }}>
      {items.map((it) => (
        <li key={it.id} style={{ margin: "14px 0" }}>
          <div>
            <RichText text={it.prompt} />
          </div>
          <button className="btn small" onClick={() => setOpen({ ...open, [it.id]: !open[it.id] })} aria-expanded={!!open[it.id]}>
            {open[it.id] ? "Hide answer" : "Show answer"}
          </button>
          {open[it.id] && (
            <div className="solution">
              <strong>Answer:</strong> <RichText text={it.answer} />
              {it.explanation && (
                <div className="muted">
                  <RichText text={it.explanation} />
                </div>
              )}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
