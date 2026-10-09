"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DataSet, Part, Question } from "@/content/types";
import { PART_TITLES } from "@/content/outline";
import { TermsProvider } from "./TermContext";
import { QuestionView, DataSetView } from "./QuestionView";
import { emptyAnswer, grade, isComplete, type AnswerValue } from "@/lib/grading";
import { addPractice, getPractice, updateMistakes, useStored } from "@/lib/progress";
import { shuffled } from "@/lib/storage";
import type { SectionData } from "@/lib/data";

interface Entry {
  key: string;
  sectionId: string;
  q: Question;
  set?: DataSet;
}

const PER_Q = 105; // seconds: GRE pace 1.75 min / question
const TYPE_NAMES: Record<string, string> = { qc: "Quantity Comparison", mc1: "Multiple choice (one)", mcm: "Multiple choice (one or more)", ne: "Numeric entry" };

const fmt = (s: number) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, "0")}`;

function draw(sections: SectionData[], n: number): Entry[] {
  const units: Entry[][] = [];
  for (const s of sections) {
    const bySet = new Map<string, Entry[]>();
    for (const q of s.questions) {
      const e: Entry = { key: `${s.id}/${q.id}`, sectionId: s.id, q, set: q.setId ? s.sets.find((x) => x.id === q.setId) : undefined };
      if (q.setId) bySet.set(q.setId, [...(bySet.get(q.setId) ?? []), e]);
      else units.push([e]);
    }
    bySet.forEach((u) => units.push(u));
  }
  const picked: Entry[] = [];
  for (const u of shuffled(units)) {
    if (picked.length + u.length <= n) picked.push(...u);
    if (picked.length >= n) break;
  }
  // keep set groups contiguous while shuffling the rest: simple approach, order by unit as drawn
  return picked;
}

export function Practice({ sections }: { sections: SectionData[] }) {
  const [chosen, setChosen] = useState<Set<string>>(new Set(sections.map((s) => s.id)));
  const [count, setCount] = useState(10);
  const [timed, setTimed] = useState(true);
  const [phase, setPhase] = useState<"setup" | "test" | "review" | "done">("setup");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [left, setLeft] = useState(0);
  const [used, setUsed] = useState(0);
  const startedAt = useRef(0);
  const [history] = useStored(getPractice, []);
  const submittedRef = useRef(false);

  const secMap = useMemo(() => new Map(sections.map((s) => [s.id, s])), [sections]);
  const val = (e: Entry) => answers[e.key] ?? emptyAnswer(e.q);

  const finish = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    setUsed(secs);
    const bySection: Record<string, { correct: number; total: number }> = {};
    const byType: Record<string, { correct: number; total: number }> = {};
    const wrong: Record<string, string[]> = {};
    const right: Record<string, string[]> = {};
    let score = 0;
    for (const e of entries) {
      const ok = grade(e.q, val(e));
      if (ok) score++;
      for (const [m, k] of [
        [bySection, e.sectionId],
        [byType, e.q.type],
      ] as const) {
        m[k] = m[k] ?? { correct: 0, total: 0 };
        m[k].total++;
        if (ok) m[k].correct++;
      }
      (ok ? right : wrong)[e.sectionId] = [...((ok ? right : wrong)[e.sectionId] ?? []), e.q.id];
    }
    for (const s of new Set(entries.map((e) => e.sectionId))) updateMistakes(s, wrong[s] ?? [], right[s] ?? []);
    addPractice({ date: Date.now(), score, total: entries.length, secondsUsed: secs, bySection, byType });
    setPhase("done");
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    if (phase !== "test" && phase !== "review") return;
    if (!timed) return;
    const t = setInterval(() => {
      const remaining = Math.round(entries.length * PER_Q - (Date.now() - startedAt.current) / 1000);
      setLeft(remaining);
      if (remaining <= 0) finishRef.current();
    }, 500);
    return () => clearInterval(t);
  }, [phase, timed, entries.length]);

  const start = () => {
    const pool = sections.filter((s) => chosen.has(s.id));
    const e = draw(pool, count);
    if (e.length === 0) return;
    submittedRef.current = false;
    setEntries(e);
    setIdx(0);
    setAnswers({});
    setMarked(new Set());
    setLeft(e.length * PER_Q);
    startedAt.current = Date.now();
    setPhase("test");
  };

  if (sections.length === 0) return <p className="muted">No sections are available yet. Practice tests draw from finished sections.</p>;

  if (phase === "setup") {
    const parts = Object.keys(PART_TITLES) as Part[];
    const poolSize = sections.filter((s) => chosen.has(s.id)).reduce((a, s) => a + s.questions.length, 0);
    return (
      <div>
        <h2>Choose sections</h2>
        {parts.map((p) => {
          const ss = sections.filter((s) => s.part === p);
          if (!ss.length) return null;
          return (
            <div key={p}>
              <label style={{ fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={ss.every((s) => chosen.has(s.id))}
                  onChange={(e) => {
                    const n = new Set(chosen);
                    ss.forEach((s) => (e.target.checked ? n.add(s.id) : n.delete(s.id)));
                    setChosen(n);
                  }}
                />{" "}
                {PART_TITLES[p]}
              </label>
              <div className="checks">
                {ss.map((s) => (
                  <label key={s.id}>
                    <input
                      type="checkbox"
                      checked={chosen.has(s.id)}
                      onChange={(e) => {
                        const n = new Set(chosen);
                        if (e.target.checked) n.add(s.id);
                        else n.delete(s.id);
                        setChosen(n);
                      }}
                    />
                    {s.number} {s.title}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        <h2>Options</h2>
        <div className="row">
          <span>Questions:</span>
          <div className="seg" style={{ margin: 0 }}>
            {[10, 20, 27].map((n) => (
              <button key={n} className={count === n ? "on" : ""} onClick={() => setCount(n)}>
                {n}
              </button>
            ))}
          </div>
          <label>
            <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} /> Timer ({fmt(count * PER_Q)} at GRE pace, 1.75 min per question)
          </label>
        </div>
        <p className="muted">Question pool: {poolSize} questions{poolSize < count ? ` (the test will have fewer than ${count})` : ""}.</p>
        <button className="btn primary" disabled={chosen.size === 0} onClick={start}>
          Start test
        </button>
        {history.length > 0 && (
          <>
            <h2>Previous attempts</h2>
            <table className="plain">
              <tbody>
                {[...history].reverse().slice(0, 5).map((h, i) => (
                  <tr key={i}>
                    <td>{new Date(h.date).toLocaleString()}</td>
                    <td>
                      {h.score} / {h.total}
                    </td>
                    <td>{fmt(h.secondsUsed)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    );
  }

  if (phase === "done") {
    const score = entries.filter((e) => grade(e.q, val(e))).length;
    const bySec = new Map<string, { c: number; t: number }>();
    const byType = new Map<string, { c: number; t: number }>();
    for (const e of entries) {
      const ok = grade(e.q, val(e));
      for (const [m, k] of [
        [bySec, e.sectionId],
        [byType, e.q.type],
      ] as const) {
        const cur = m.get(k) ?? { c: 0, t: 0 };
        m.set(k, { c: cur.c + (ok ? 1 : 0), t: cur.t + 1 });
      }
    }
    return (
      <div>
        <div className="card soft">
          <div className="score">
            {score} / {entries.length}
          </div>
          <div className="muted">
            Time used: {fmt(used)}
            {timed ? ` of ${fmt(entries.length * PER_Q)}` : ""}
          </div>
          <button className="btn primary" style={{ marginTop: 8 }} onClick={() => setPhase("setup")}>
            New test
          </button>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div>
            <h3>By section</h3>
            <table className="plain">
              <tbody>
                {[...bySec].map(([k, v]) => (
                  <tr key={k}>
                    <td>
                      {secMap.get(k)?.number} {secMap.get(k)?.title}
                    </td>
                    <td>
                      {v.c} / {v.t}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>By question type</h3>
            <table className="plain">
              <tbody>
                {[...byType].map(([k, v]) => (
                  <tr key={k}>
                    <td>{TYPE_NAMES[k]}</td>
                    <td>
                      {v.c} / {v.t}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <h2>Review</h2>
        {entries.map((e, i) => (
          <TermsProvider key={e.key} terms={secMap.get(e.sectionId)?.terms ?? []}>
            {e.set && (i === 0 || entries[i - 1].set?.id !== e.set.id) && <DataSetView set={e.set} />}
            <QuestionView q={e.q} number={i + 1} value={val(e)} revealed showVerdict showSolution />
          </TermsProvider>
        ))}
      </div>
    );
  }

  const timerNode = timed && (
    <span className={"timer" + (left < 120 ? " low" : "")} aria-label="Time left">
      {fmt(left)}
    </span>
  );

  if (phase === "review") {
    const unanswered = entries.filter((e) => !isComplete(e.q, val(e))).length;
    return (
      <div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2 style={{ margin: 0 }}>Review</h2>
          {timerNode}
        </div>
        <p className="muted">
          {entries.length - unanswered} answered, {unanswered} unanswered, {marked.size} marked for review. Click a number to go back to that question.
        </p>
        <div className="statusgrid">
          {entries.map((e, i) => (
            <button
              key={e.key}
              className={(isComplete(e.q, val(e)) ? "answered " : "") + (marked.has(e.key) ? "marked" : "")}
              onClick={() => {
                setIdx(i);
                setPhase("test");
              }}
              aria-label={`Question ${i + 1}${isComplete(e.q, val(e)) ? ", answered" : ", unanswered"}${marked.has(e.key) ? ", marked" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="row">
          <button className="btn" onClick={() => setPhase("test")}>
            Back to questions
          </button>
          <button className="btn primary" onClick={finish}>
            Submit test
          </button>
        </div>
      </div>
    );
  }

  const e = entries[idx];
  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="muted">
          Question {idx + 1} of {entries.length}
        </span>
        {timerNode}
      </div>
      <TermsProvider terms={secMap.get(e.sectionId)?.terms ?? []}>
        {e.set && <DataSetView set={e.set} />}
        <QuestionView q={e.q} number={idx + 1} value={val(e)} onChange={(v) => setAnswers({ ...answers, [e.key]: v })} />
      </TermsProvider>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="row">
          <button className="btn" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
            Back
          </button>
          {idx < entries.length - 1 ? (
            <button className="btn" onClick={() => setIdx(idx + 1)}>
              Next
            </button>
          ) : (
            <button className="btn primary" onClick={() => setPhase("review")}>
              Review
            </button>
          )}
        </span>
        <span className="row">
          <label>
            <input
              type="checkbox"
              checked={marked.has(e.key)}
              onChange={(ev) => {
                const n = new Set(marked);
                if (ev.target.checked) n.add(e.key);
                else n.delete(e.key);
                setMarked(n);
              }}
            />{" "}
            Mark for review
          </label>
          <button className="btn small" onClick={() => setPhase("review")}>
            Review screen
          </button>
        </span>
      </div>
    </div>
  );
}
