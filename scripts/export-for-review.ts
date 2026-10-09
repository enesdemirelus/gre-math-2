import { mkdirSync, writeFileSync } from "node:fs";
import { SECTIONS } from "../content/sections";
import type { DataSet, DiagramRef, Question } from "../content/types";

const QC_CHOICES = [
  "Quantity A is greater.",
  "Quantity B is greater.",
  "The two quantities are equal.",
  "The relationship cannot be determined from the information given.",
];
const L = (i: number) => String.fromCharCode(65 + i);

function diagramText(d: DiagramRef): string {
  const props = d.props && Object.keys(d.props).length ? ` props=${JSON.stringify(d.props)}` : "";
  return `[Diagram: \`${d.key}\`${props}${d.caption ? ` | Caption: ${d.caption}` : ""}]`;
}

function setText(s: DataSet): string {
  const lines = [`**Data set \`${s.id}\`: ${s.title}**`];
  if (s.intro) lines.push(s.intro);
  if (s.diagram) lines.push(diagramText(s.diagram));
  if (s.table) {
    if (s.table.caption) lines.push(`Table: ${s.table.caption}`);
    lines.push(`| ${s.table.header.join(" | ")} |`, `|${s.table.header.map(() => "---").join("|")}|`);
    for (const r of s.table.rows) lines.push(`| ${r.join(" | ")} |`);
  }
  return lines.join("\n\n");
}

function questionText(q: Question, n: string): string {
  const out: string[] = [`### ${n} (id \`${q.id}\`, ${q.difficulty}, ${q.type.toUpperCase()})`];
  if (q.setId) out.push(`_Refers to data set \`${q.setId}\`._`);
  if (q.diagram) out.push(diagramText(q.diagram));
  switch (q.type) {
    case "qc":
      if (q.given) out.push(`Given (centered): ${q.given}`);
      out.push(`- Quantity A: ${q.quantityA}`, `- Quantity B: ${q.quantityB}`, "", "Choices:");
      QC_CHOICES.forEach((c, i) => out.push(`- (${L(i)}) ${c}`));
      break;
    case "mc1":
      out.push(q.stem, "", "Select one answer choice.");
      q.choices.forEach((c, i) => out.push(`- (${L(i)}) ${c}`));
      break;
    case "mcm":
      out.push(q.stem, "", "Select one or more answer choices.");
      q.choices.forEach((c, i) => out.push(`- [ ] (${L(i)}) ${c}`));
      break;
    case "ne":
      out.push(q.stem, "", q.answer.kind === "fraction" ? "Numeric entry: two boxes (numerator over denominator; equivalent fractions accepted)." : "Numeric entry: one box (integer or decimal).");
      if (q.prefix || q.suffix) out.push(`Box labels: prefix "${q.prefix ?? ""}", suffix "${q.suffix ?? ""}"`);
      break;
  }
  return out.join("\n");
}

function answerText(q: Question): string {
  switch (q.type) {
    case "qc":
      return `${q.answer} - ${QC_CHOICES["ABCD".indexOf(q.answer)]}`;
    case "mc1":
      return `(${L(q.answer)}) ${q.choices[q.answer]}`;
    case "mcm":
      return q.answer.map((i) => `(${L(i)}) ${q.choices[i]}`).join("; ");
    case "ne":
      return q.answer.kind === "decimal" ? q.answer.value : `${q.answer.numerator}/${q.answer.denominator}`;
  }
}

const id = process.argv.slice(2).find((a) => a !== "--");
if (!id) {
  console.error("usage: npm run export-review -- <sectionId>");
  process.exit(1);
}
const s = SECTIONS[id];
if (!s) {
  console.error(`Unknown or unavailable section "${id}". Available: ${Object.keys(SECTIONS).join(", ") || "(none)"}`);
  process.exit(1);
}

const groups: { title: string; qs: Question[]; sets?: DataSet[]; prefix: string }[] = [
  { title: "Worked examples", qs: s.examples, sets: s.exampleSets, prefix: "Example" },
  { title: "Chapter quiz", qs: s.quiz.questions, sets: s.quiz.sets, prefix: "Quiz" },
];

let qmd = `# ${s.number} ${s.title}: questions (no answers)\n`;
let kmd = `# ${s.number} ${s.title}: answer key\n`;
for (const g of groups) {
  qmd += `\n## ${g.title}\n`;
  kmd += `\n## ${g.title}\n`;
  const shown = new Set<string>();
  g.qs.forEach((q, i) => {
    const n = `${g.prefix} ${i + 1}`;
    if (q.setId && !shown.has(q.setId)) {
      shown.add(q.setId);
      const set = g.sets?.find((x) => x.id === q.setId);
      if (set) qmd += `\n${setText(set)}\n`;
    }
    qmd += `\n${questionText(q, n)}\n`;
    kmd += `\n### ${n} (id \`${q.id}\`)\n\n**Answer:** ${answerText(q)}\n\n${q.explanation.map((e, j) => `${j + 1}. ${e}`).join("\n")}\n`;
  });
}
qmd += `\n## Quick questions\n`;
kmd += `\n## Quick questions\n`;
s.quick.forEach((q, i) => {
  qmd += `\n${i + 1}. (id \`${q.id}\`) ${q.prompt}\n`;
  kmd += `\n${i + 1}. (id \`${q.id}\`) **${q.answer}**${q.explanation ? ` - ${q.explanation}` : ""}\n`;
});

const dir = `review/${id}`;
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/questions.md`, qmd);
writeFileSync(`${dir}/key.md`, kmd);
console.log(`Wrote ${dir}/questions.md and ${dir}/key.md`);
