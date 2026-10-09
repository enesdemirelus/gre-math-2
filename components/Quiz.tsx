"use client";
import { useState } from "react";
import type { Question, DataSet } from "@/content/types";
import { QuestionView, DataSetView } from "./QuestionView";
import { seenSetsFor } from "./Examples";
import { emptyAnswer, grade, isComplete, type AnswerValue } from "@/lib/grading";
import { getQuiz, recordQuiz, updateMistakes, useStored } from "@/lib/progress";

export function Quiz({ sectionId, questions, sets }: { sectionId: string; questions: Question[]; sets?: DataSet[] }) {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submitted, setSubmitted] = useState(false);
  const [warn, setWarn] = useState(false);
  const [best] = useStored(() => getQuiz(sectionId), null);
  const above = seenSetsFor(questions, sets);

  const val = (q: Question) => answers[q.id] ?? emptyAnswer(q);
  const unanswered = questions.filter((q) => !isComplete(q, val(q))).length;
  const score = questions.filter((q) => grade(q, val(q))).length;

  const submit = (force = false) => {
    if (unanswered > 0 && !force) {
      setWarn(true);
      return;
    }
    setWarn(false);
    setSubmitted(true);
    recordQuiz(sectionId, score, questions.length);
    updateMistakes(
      sectionId,
      questions.filter((q) => !grade(q, val(q))).map((q) => q.id),
      questions.filter((q) => grade(q, val(q))).map((q) => q.id),
    );
    document.getElementById("quiz")?.scrollIntoView();
  };
  const retake = () => {
    setAnswers({});
    setSubmitted(false);
    setWarn(false);
    document.getElementById("quiz")?.scrollIntoView();
  };

  return (
    <div>
      <p className="muted">
        {questions.length} questions. Answer all of them, then submit.
        {best && ` Best score so far: ${best.best} / ${best.total}.`}
      </p>
      {submitted && (
        <div className="card soft">
          <div className="score" data-testid="score">
            {score} / {questions.length}
          </div>
          <button className="btn primary" onClick={retake}>
            Retake
          </button>
        </div>
      )}
      {questions.map((q, i) => (
        <div key={q.id}>
          {above[i] && <DataSetView set={above[i]!} />}
          <QuestionView
            q={q}
            number={i + 1}
            value={val(q)}
            onChange={submitted ? undefined : (v) => setAnswers({ ...answers, [q.id]: v })}
            revealed={submitted}
            showVerdict={submitted}
            showSolution={submitted}
          />
        </div>
      ))}
      {!submitted && (
        <div>
          {warn && (
            <p className="verdict no">
              {unanswered} question{unanswered === 1 ? " is" : "s are"} unanswered.{" "}
              <button className="btn small" onClick={() => submit(true)}>
                Submit anyway
              </button>
            </p>
          )}
          <button className="btn primary" onClick={() => submit()}>
            Submit quiz
          </button>
        </div>
      )}
    </div>
  );
}
