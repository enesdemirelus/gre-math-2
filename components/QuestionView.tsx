"use client";
import { useId } from "react";
import type { DataSet, Question } from "@/content/types";
import { RichText } from "./RichText";
import { Diagram } from "./Diagram";
import { QC_CHOICES, QC_LETTERS, letter, grade, type AnswerValue } from "@/lib/grading";

interface Item {
  label?: string;
  content: React.ReactNode;
}

function ChoiceList({
  items,
  multi,
  selected,
  correct,
  revealed,
  onToggle,
  name,
}: {
  items: Item[];
  multi: boolean;
  selected: number[];
  correct: number[];
  revealed: boolean;
  onToggle?: (i: number) => void;
  name: string;
}) {
  return (
    <ul className="choices" role={multi ? "group" : "radiogroup"}>
      {items.map((it, i) => {
        const isSel = selected.includes(i);
        const isCor = correct.includes(i);
        let cls = "choice" + (multi ? " sq" : "") + (onToggle && !revealed ? "" : " static");
        if (revealed && isCor) cls += " correct";
        else if (revealed && isSel && !isCor) cls += " wrongpick";
        const staticOn = !onToggle && revealed && isCor;
        return (
          <li key={i}>
            <label className={cls}>
              {onToggle ? (
                <input
                  type={multi ? "checkbox" : "radio"}
                  name={name}
                  checked={isSel}
                  disabled={revealed}
                  onChange={() => onToggle(i)}
                />
              ) : null}
              <span className={"mark" + (staticOn ? " on" : "")} aria-hidden />
              {it.label && <span className="letter">{it.label}</span>}
              <span>{it.content}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export function DataSetView({ set }: { set: DataSet }) {
  return (
    <div className="dataset">
      <h4>
        <RichText text={set.title} />
      </h4>
      {set.intro && (
        <p>
          <RichText text={set.intro} />
        </p>
      )}
      {set.diagram && <Diagram diagram={set.diagram} />}
      {set.table && (
        <table className="dtable">
          {set.table.caption && (
            <caption>
              <RichText text={set.table.caption} />
            </caption>
          )}
          <thead>
            <tr>
              {set.table.header.map((h, i) => (
                <th key={i}>
                  <RichText text={h} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {set.table.rows.map((r, i) => (
              <tr key={i}>
                {r.map((c, j) => (
                  <td key={j}>
                    <RichText text={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function correctAnswerNode(q: Question): React.ReactNode {
  switch (q.type) {
    case "qc":
      return QC_CHOICES[QC_LETTERS.indexOf(q.answer)];
    case "mc1":
      return (
        <>
          {letter(q.answer)}. <RichText text={q.choices[q.answer]} plainTerms />
        </>
      );
    case "mcm":
      return q.answer.map((i, k) => (
        <span key={i}>
          {k > 0 && "; "}
          {letter(i)}. <RichText text={q.choices[i]} plainTerms />
        </span>
      ));
    case "ne":
      return q.answer.kind === "decimal" ? q.answer.value : `${q.answer.numerator}/${q.answer.denominator}`;
  }
}

export function userAnswerNode(q: Question, v: AnswerValue): React.ReactNode {
  if (q.type === "qc" && v.type === "qc") return v.choice ? QC_CHOICES[QC_LETTERS.indexOf(v.choice)] : <em>No answer</em>;
  if (q.type === "mc1" && v.type === "mc1")
    return v.choice === null ? (
      <em>No answer</em>
    ) : (
      <>
        {letter(v.choice)}. <RichText text={q.choices[v.choice]} plainTerms />
      </>
    );
  if (q.type === "mcm" && v.type === "mcm")
    return v.choices.length === 0 ? (
      <em>No answer</em>
    ) : (
      [...v.choices]
        .sort((a, b) => a - b)
        .map((i, k) => (
          <span key={i}>
            {k > 0 && "; "}
            {letter(i)}. <RichText text={q.choices[i]} plainTerms />
          </span>
        ))
    );
  if (q.type === "ne" && v.type === "ne") {
    if (!v.a.trim()) return <em>No answer</em>;
    return q.answer.kind === "fraction" ? `${v.a} / ${v.b || "?"}` : v.a;
  }
  return null;
}

export function Solution({ q }: { q: Question }) {
  return (
    <div className="solution">
      <div>
        <strong>Correct answer:</strong> {correctAnswerNode(q)}
      </div>
      <ol>
        {q.explanation.map((s, i) => (
          <li key={i}>
            <RichText text={s} plainTerms />
          </li>
        ))}
      </ol>
    </div>
  );
}

export function QuestionView({
  q,
  number,
  value,
  onChange,
  revealed = false,
  showSolution = false,
  showVerdict = false,
  heading,
}: {
  q: Question;
  number?: number;
  value?: AnswerValue;
  onChange?: (v: AnswerValue) => void;
  revealed?: boolean;
  showSolution?: boolean;
  showVerdict?: boolean;
  heading?: React.ReactNode;
}) {
  const name = useId();
  const interactive = !!onChange && !!value;
  const ok = value ? grade(q, value) : false;

  let body: React.ReactNode = null;
  if (q.type === "qc") {
    const sel = value?.type === "qc" && value.choice ? [QC_LETTERS.indexOf(value.choice)] : [];
    body = (
      <>
        {q.given && (
          <div className="q-given">
            <RichText text={q.given} />
          </div>
        )}
        <div className="qc-cols">
          <div>
            <div className="qh">Quantity A</div>
            <RichText text={q.quantityA} />
          </div>
          <div>
            <div className="qh">Quantity B</div>
            <RichText text={q.quantityB} />
          </div>
        </div>
        <ChoiceList
          name={name}
          multi={false}
          items={QC_CHOICES.map((c) => ({ content: c }))}
          selected={sel}
          correct={[QC_LETTERS.indexOf(q.answer)]}
          revealed={revealed}
          onToggle={interactive ? (i) => onChange!({ type: "qc", choice: QC_LETTERS[i] }) : undefined}
        />
      </>
    );
  } else if (q.type === "mc1" || q.type === "mcm") {
    const multi = q.type === "mcm";
    const sel = value?.type === "mc1" ? (value.choice === null ? [] : [value.choice]) : value?.type === "mcm" ? value.choices : [];
    const correct = q.type === "mc1" ? [q.answer] : q.answer;
    body = (
      <>
        <p style={{ marginTop: 0 }}>
          <RichText text={q.stem} />
        </p>
        <ChoiceList
          name={name}
          multi={multi}
          items={q.choices.map((c, i) => ({ label: letter(i) + ".", content: <RichText text={c} /> }))}
          selected={sel}
          correct={correct}
          revealed={revealed}
          onToggle={
            interactive
              ? (i) =>
                  multi
                    ? onChange!({ type: "mcm", choices: sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i].sort((a, b) => a - b) })
                    : onChange!({ type: "mc1", choice: i })
              : undefined
          }
        />
      </>
    );
  } else {
    const frac = q.answer.kind === "fraction";
    const v = value?.type === "ne" ? value : { type: "ne" as const, a: "", b: "" };
    body = (
      <>
        <p style={{ marginTop: 0 }}>
          <RichText text={q.stem} />
        </p>
        <div className="ne">
          {q.prefix && <span>{q.prefix}</span>}
          {frac ? (
            <span className="frac">
              <input type="text" inputMode="numeric" aria-label="Numerator" value={v.a} disabled={!interactive || revealed} onChange={(e) => onChange?.({ ...v, a: e.target.value })} />
              <hr />
              <input type="text" inputMode="numeric" aria-label="Denominator" value={v.b} disabled={!interactive || revealed} onChange={(e) => onChange?.({ ...v, b: e.target.value })} />
            </span>
          ) : (
            <input type="text" inputMode="decimal" aria-label="Answer" value={v.a} disabled={!interactive || revealed} onChange={(e) => onChange?.({ ...v, a: e.target.value })} />
          )}
          {q.suffix && <span>{q.suffix}</span>}
        </div>
      </>
    );
  }

  return (
    <div className="q">
      <div className="q-head">
        <span className="q-num">{heading ?? (number !== undefined ? `Question ${number}` : null)}</span>
        {showVerdict && (
          <span className={"verdict " + (ok ? "ok" : "no")}>{ok ? "Correct" : value && !isEmptyAnswer(value) ? "Incorrect" : "Unanswered"}</span>
        )}
      </div>
      {q.diagram && <Diagram diagram={q.diagram} />}
      {body}
      {showVerdict && value && !ok && (
        <div>
          <strong>Your answer:</strong> {userAnswerNode(q, value)}
        </div>
      )}
      {showSolution && <Solution q={q} />}
    </div>
  );
}

function isEmptyAnswer(v: AnswerValue): boolean {
  if (v.type === "qc" || v.type === "mc1") return v.choice === null;
  if (v.type === "mcm") return v.choices.length === 0;
  return v.a.trim() === "";
}
