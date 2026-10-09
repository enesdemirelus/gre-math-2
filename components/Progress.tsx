"use client";
import { useState } from "react";
import Link from "next/link";
import { TermsProvider } from "./TermContext";
import { QuestionView, DataSetView } from "./QuestionView";
import { emptyAnswer, grade, type AnswerValue } from "@/lib/grading";
import { getKnown, getMistakes, getPractice, getQuiz, resetAllProgress, updateMistakes, useStored } from "@/lib/progress";
import type { SectionData } from "@/lib/data";

function Mistake({ sd, qid }: { sd: SectionData; qid: string }) {
  const q = sd.questions.find((x) => x.id === qid);
  const [v, setV] = useState<AnswerValue | null>(null);
  const [checked, setChecked] = useState(false);
  if (!q) return null;
  const val = v ?? emptyAnswer(q);
  const set = q.setId ? sd.sets.find((s) => s.id === q.setId) : undefined;
  return (
    <TermsProvider terms={sd.terms}>
      <div className="muted" style={{ marginTop: 20 }}>
        <Link href={`/${sd.id}#quiz`}>
          {sd.number} {sd.title}
        </Link>
      </div>
      {set && <DataSetView set={set} />}
      <QuestionView q={q} heading="Retry" value={val} onChange={checked ? undefined : setV} revealed={checked} showVerdict={checked} showSolution={checked} />
      {!checked && (
        <button
          className="btn primary"
          style={{ marginTop: -8 }}
          onClick={() => {
            setChecked(true);
            if (grade(q, val)) updateMistakes(sd.id, [], [q.id]);
          }}
        >
          Check
        </button>
      )}
    </TermsProvider>
  );
}

export function ProgressDashboard({ sections, allIds }: { sections: SectionData[]; allIds: string[] }) {
  const [state] = useStored(
    () => ({
      quiz: Object.fromEntries(allIds.map((id) => [id, getQuiz(id)])),
      known: Object.fromEntries(allIds.map((id) => [id, getKnown(id)])),
      mistakes: getMistakes(),
      practice: getPractice(),
    }),
    { quiz: {} as Record<string, ReturnType<typeof getQuiz>>, known: {} as Record<string, string[]>, mistakes: [] as string[], practice: [] as ReturnType<typeof getPractice> },
  );
  const secMap = new Map(sections.map((s) => [s.id, s]));
  const mist = state.mistakes.filter((m) => secMap.has(m.split("/")[0]));
  return (
    <div>
      <table className="plain">
        <thead>
          <tr>
            <th>Section</th>
            <th>Best quiz</th>
            <th>Last attempt</th>
            <th>Cards known</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((s) => {
            const qz = state.quiz[s.id];
            return (
              <tr key={s.id}>
                <td>
                  <Link href={`/${s.id}`}>
                    {s.number} {s.title}
                  </Link>
                </td>
                <td>{qz ? `${qz.best} / ${qz.total}` : "–"}</td>
                <td>{qz ? new Date(qz.last).toLocaleDateString() : "–"}</td>
                <td>
                  {(state.known[s.id] ?? []).filter((id) => s.terms.some((t) => t.id === id)).length} / {s.terms.length}
                </td>
              </tr>
            );
          })}
          {sections.length === 0 && (
            <tr>
              <td colSpan={4} className="muted">
                No sections available yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="muted">Mixed practice attempts: {state.practice.length}</p>
      <h2>Mistakes ({mist.length})</h2>
      {mist.length === 0 ? (
        <p className="muted">Questions you answer wrong in quizzes or mixed practice are collected here. Answer one correctly to remove it.</p>
      ) : (
        mist.map((m) => {
          const [sid, ...rest] = m.split("/");
          return <Mistake key={m} sd={secMap.get(sid)!} qid={rest.join("/")} />;
        })
      )}
      <hr style={{ margin: "40px 0 16px", border: 0, borderTop: "1px solid var(--border)" }} />
      <button
        className="btn bad"
        onClick={() => {
          if (window.confirm("Reset all quiz scores, flashcard progress, mistakes, and practice history?")) resetAllProgress(allIds);
        }}
      >
        Reset progress
      </button>
    </div>
  );
}

export function HomeProgress({ ids }: { ids: string[] }) {
  const [done, ready] = useStored(() => ids.filter((id) => getQuiz(id)).length, 0);
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>Your progress</strong>
        <span className="muted">
          {ready ? done : 0} of {ids.length} available sections completed (quiz taken)
        </span>
      </div>
      <div className="bar" style={{ marginTop: 8 }}>
        <i style={{ width: `${ids.length ? (100 * (ready ? done : 0)) / ids.length : 0}%` }} />
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 14 }}>
        <Link href="/progress">Open the progress page</Link>
      </p>
    </div>
  );
}
