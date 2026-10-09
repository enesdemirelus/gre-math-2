import type { Question, NumericAnswer } from "@/content/types";

export type AnswerValue =
  | { type: "qc"; choice: "A" | "B" | "C" | "D" | null }
  | { type: "mc1"; choice: number | null }
  | { type: "mcm"; choices: number[] }
  | { type: "ne"; a: string; b: string };

export function emptyAnswer(q: Question): AnswerValue {
  switch (q.type) {
    case "qc":
      return { type: "qc", choice: null };
    case "mc1":
      return { type: "mc1", choice: null };
    case "mcm":
      return { type: "mcm", choices: [] };
    case "ne":
      return { type: "ne", a: "", b: "" };
  }
}

export function isAnswered(v: AnswerValue): boolean {
  switch (v.type) {
    case "qc":
    case "mc1":
      return v.choice !== null;
    case "mcm":
      return v.choices.length > 0;
    case "ne":
      return v.a.trim() !== "" && (v.b === "" ? true : true);
  }
}

/** Answer is "complete": for NE fraction both boxes must be filled. */
export function isComplete(q: Question, v: AnswerValue): boolean {
  if (q.type === "ne" && v.type === "ne" && q.answer.kind === "fraction") {
    return v.a.trim() !== "" && v.b.trim() !== "";
  }
  return isAnswered(v);
}

const DECIMAL_RE = /^-?(\d+\.?\d*|\.\d+)$/;
const INT_RE = /^-?\d+$/;

export function parseDecimal(s: string): number | null {
  const t = s.replace(/[,\s]/g, "");
  if (!DECIMAL_RE.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function parseInteger(s: string): number | null {
  const t = s.replace(/[,\s]/g, "");
  if (!INT_RE.test(t)) return null;
  return Number(t);
}

export function gradeNumeric(answer: NumericAnswer, a: string, b: string): boolean {
  if (answer.kind === "decimal") {
    const user = parseDecimal(a);
    const key = parseDecimal(answer.value);
    if (user === null || key === null) return false;
    return Math.abs(user - key) < 1e-9;
  }
  const n = parseInteger(a);
  const d = parseInteger(b);
  if (n === null || d === null || d === 0) return false;
  return n * answer.denominator === answer.numerator * d;
}

export function grade(q: Question, v: AnswerValue): boolean {
  if (q.type !== v.type) return false;
  switch (q.type) {
    case "qc":
      return v.type === "qc" && v.choice === q.answer;
    case "mc1":
      return v.type === "mc1" && v.choice === q.answer;
    case "mcm": {
      if (v.type !== "mcm") return false;
      const mine = [...v.choices].sort((x, y) => x - y);
      return mine.length === q.answer.length && mine.every((x, i) => x === q.answer[i]);
    }
    case "ne":
      return v.type === "ne" && gradeNumeric(q.answer, v.a, v.b);
  }
}

export const QC_CHOICES = [
  "Quantity A is greater.",
  "Quantity B is greater.",
  "The two quantities are equal.",
  "The relationship cannot be determined from the information given.",
] as const;

export const QC_LETTERS = ["A", "B", "C", "D"] as const;

export function letter(i: number): string {
  return String.fromCharCode(65 + i);
}
