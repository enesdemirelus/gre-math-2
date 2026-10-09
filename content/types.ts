// Shared content schema. Section data files in content/sections/ must conform to this.
//
// Rich text ("RichText") is a plain string with this inline markup:
//   $...$          inline KaTeX
//   $$...$$        display KaTeX (only inside paragraph text; prefer a `math` block)
//   [[termId]]     vocabulary highlight showing the term's own `term` text
//   [[termId|text]] vocabulary highlight showing custom text (plurals, inflections)
//   **bold**       bold
//   _italic_       italic (word-boundary underscores only)
// Write strings with String.raw`...` so LaTeX backslashes survive. Inside String.raw,
// "${" starts an interpolation, so never write `${` – write `$ {`, or `$\,{}_nC_k$` etc.

export type RichText = string;

export type Part = "arithmetic" | "algebra" | "geometry" | "data-analysis";

/** Reference to an SVG diagram registered in content/diagrams/index.ts */
export interface DiagramRef {
  key: string;
  props?: Record<string, unknown>;
  /** Shown under the figure. Use "Note: Figure not drawn to scale." where ETS would. */
  caption?: RichText;
}

export type LessonBlock =
  | { kind: "heading"; text: string }
  | { kind: "p"; text: RichText }
  | { kind: "math"; tex: string; key?: boolean } // display formula; key=true renders it in a highlighted box
  | { kind: "diagram"; diagram: DiagramRef }
  | {
      kind: "aside";
      tone: "tip" | "watch" | "gre";
      title?: string;
      text: RichText;
    }
  | { kind: "list"; items: RichText[] } // use sparingly; the lesson is prose
  /** Interactive explorer registered in content/interactives/index.ts (client component). */
  | { kind: "interactive"; key: string; props?: Record<string, unknown>; title?: string; caption?: RichText };

export interface Term {
  id: string; // kebab-case, unique within the section
  term: string; // English term as ETS uses it
  turkish: string; // standard Turkish mathematical term (not a word-for-word translation)
  definition: RichText; // short, faithful to the ETS Math Review
  formula?: string; // optional KaTeX
  diagram?: DiagramRef; // required for geometry terms
  /** e.g. "Not named in the ETS Math Review" */
  note?: string;
  /** e.g. "MR p. 106" */
  source?: string;
}

interface QuestionBase {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  diagram?: DiagramRef;
  /** Data Interpretation set this question belongs to (see Quiz.sets) */
  setId?: string;
  /** Step-by-step solution / explanation. One string per step or paragraph. */
  explanation: RichText[];
}

/** Quantitative Comparison. Choices are always the 4 standard ETS choices. */
export interface QCQuestion extends QuestionBase {
  type: "qc";
  given?: RichText; // centered information above the two quantities
  quantityA: RichText;
  quantityB: RichText;
  answer: "A" | "B" | "C" | "D"; // A greater, B greater, equal, cannot be determined
}

/** Multiple choice, select one answer (exactly 5 choices). */
export interface MCOneQuestion extends QuestionBase {
  type: "mc1";
  stem: RichText;
  choices: RichText[];
  answer: number; // 0-based index
}

/** Multiple choice, select one or more answers. Stem says "Indicate all such ..." or a number to select. */
export interface MCManyQuestion extends QuestionBase {
  type: "mcm";
  stem: RichText;
  choices: RichText[];
  answer: number[]; // 0-based indices, sorted
}

export type NumericAnswer =
  | { kind: "decimal"; value: string } // integer or decimal, e.g. "6", "-2.5"; any equal numeric entry is accepted
  | { kind: "fraction"; numerator: number; denominator: number }; // two boxes; equivalent fractions accepted

/** Numeric Entry. */
export interface NEQuestion extends QuestionBase {
  type: "ne";
  stem: RichText;
  answer: NumericAnswer;
  prefix?: string; // label before the box, e.g. "$"
  suffix?: string; // label after the box, e.g. "square meters"
}

export type Question = QCQuestion | MCOneQuestion | MCManyQuestion | NEQuestion;

/** Shared data display for a Data Interpretation set. */
export interface DataSet {
  id: string;
  title: RichText;
  intro?: RichText;
  diagram?: DiagramRef;
  table?: { caption?: RichText; header: RichText[]; rows: RichText[][] };
}

export interface QuickQuestion {
  id: string;
  prompt: RichText;
  answer: RichText;
  explanation?: RichText;
}

export interface Section {
  id: string; // route slug, e.g. "3-5-circles"
  number: string; // "3.5"
  title: string; // "Circles"
  part: Part;
  mrPages: string; // printed Math Review pages, e.g. "106–112"
  /** One or two sentences under the title. */
  summary: RichText;
  lesson: LessonBlock[];
  terms: Term[];
  examples: Question[]; // worked examples, 3–4; explanation = step-by-step solution
  exampleSets?: DataSet[];
  quick: QuickQuestion[]; // 5–6
  quiz: { sets?: DataSet[]; questions: Question[] }; // exactly 10 questions
}
