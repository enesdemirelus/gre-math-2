import katex from "katex";
import type { ComponentType } from "react";
import { SECTIONS } from "../content/sections";
import { OUTLINE } from "../content/outline";
import { diagrams } from "../content/diagrams";
import { interactives } from "../content/interactives";
import { conventions } from "../content/conventions";
import type { DataSet, DiagramRef, LessonBlock, Question, Section } from "../content/types";
import { scanRich } from "./scan";

type Registry = Record<string, ComponentType<never>> | Record<string, unknown>;

let errors = 0;
let warnings = 0;

function makeReporter(name: string) {
  return {
    err(loc: string, msg: string) {
      errors++;
      console.error(`ERROR   [${name}] ${loc}: ${msg}`);
    },
    warn(loc: string, msg: string) {
      warnings++;
      console.warn(`warning [${name}] ${loc}: ${msg}`);
    },
  };
}

function checkTex(r: ReturnType<typeof makeReporter>, loc: string, tex: string, display = false) {
  try {
    katex.renderToString(tex, { throwOnError: true, displayMode: display });
  } catch (e) {
    r.err(loc, `KaTeX error in "${tex}": ${(e as Error).message}`);
  }
}

function checkLesson(r: ReturnType<typeof makeReporter>, blocks: LessonBlock[], termIds: Set<string> | null, diagramReg: Registry, interactiveReg: Registry, rich: (loc: string, t: string) => void) {
  blocks.forEach((b, i) => {
    const loc = `lesson[${i}]`;
    switch (b.kind) {
      case "p":
        rich(loc, b.text);
        break;
      case "aside":
        rich(loc, b.text);
        break;
      case "list":
        b.items.forEach((t, j) => rich(`${loc}.items[${j}]`, t));
        break;
      case "math":
        checkTex(r, loc, b.tex, true);
        break;
      case "diagram":
        if (!(b.diagram.key in diagramReg)) r.err(loc, `unknown diagram key "${b.diagram.key}"`);
        if (b.diagram.caption) rich(`${loc}.caption`, b.diagram.caption);
        break;
      case "interactive":
        if (!(b.key in interactiveReg)) r.err(loc, `unknown interactive key "${b.key}"`);
        if (b.caption) rich(`${loc}.caption`, b.caption);
        break;
      case "heading":
        break;
    }
  });
  void termIds;
}

export function checkSection(section: Section, diagramReg: Registry, interactiveReg: Registry) {
  const name = section.id;
  const r = makeReporter(name);
  const termIds = new Set<string>();
  const rich = (loc: string, text: string) => {
    const sc = scanRich(text);
    sc.problems.forEach((p) => r.err(loc, p));
    sc.math.forEach((m) => checkTex(r, loc, m.tex, m.display));
    sc.terms.forEach((t) => {
      if (!termIds.has(t)) r.err(loc, `unknown term id "${t}"`);
    });
  };
  const diag = (loc: string, d?: DiagramRef) => {
    if (!d) return;
    if (!(d.key in diagramReg)) r.err(loc, `unknown diagram key "${d.key}"`);
    if (d.caption) rich(`${loc}.caption`, d.caption);
  };

  // outline agreement
  const o = OUTLINE.find((x) => x.id === section.id);
  if (!o) r.err("id", `"${section.id}" not in OUTLINE`);
  else {
    if (o.number !== section.number) r.err("number", `"${section.number}" != outline "${o.number}"`);
    if (o.title !== section.title) r.err("title", `"${section.title}" != outline "${o.title}"`);
    if (o.part !== section.part) r.err("part", `"${section.part}" != outline "${o.part}"`);
  }

  // terms
  for (const t of section.terms) {
    if (termIds.has(t.id)) r.err(`terms.${t.id}`, "duplicate term id");
    termIds.add(t.id);
  }
  section.terms.forEach((t) => {
    const loc = `terms.${t.id}`;
    rich(`${loc}.definition`, t.definition);
    if (t.formula) checkTex(r, `${loc}.formula`, t.formula, true);
    diag(`${loc}.diagram`, t.diagram);
  });

  rich("summary", section.summary);
  checkLesson(r, section.lesson, termIds, diagramReg, interactiveReg, rich);

  const qIds = new Set<string>();
  const checkQuestion = (loc: string, q: Question, sets: DataSet[] | undefined) => {
    if (qIds.has(q.id)) r.err(loc, `duplicate question id "${q.id}"`);
    qIds.add(q.id);
    if (q.setId && !sets?.some((s) => s.id === q.setId)) r.err(loc, `setId "${q.setId}" not found`);
    diag(`${loc}.diagram`, q.diagram);
    q.explanation.forEach((e, i) => rich(`${loc}.explanation[${i}]`, e));
    if (q.explanation.length === 0) r.err(loc, "empty explanation");
    switch (q.type) {
      case "qc":
        if (q.given) rich(`${loc}.given`, q.given);
        rich(`${loc}.quantityA`, q.quantityA);
        rich(`${loc}.quantityB`, q.quantityB);
        if (!["A", "B", "C", "D"].includes(q.answer)) r.err(loc, `invalid QC answer "${q.answer}"`);
        break;
      case "mc1":
        rich(`${loc}.stem`, q.stem);
        q.choices.forEach((c, i) => rich(`${loc}.choices[${i}]`, c));
        if (q.choices.length !== 5) r.err(loc, `mc1 needs exactly 5 choices, has ${q.choices.length}`);
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.choices.length) r.err(loc, `invalid mc1 answer ${q.answer}`);
        break;
      case "mcm": {
        rich(`${loc}.stem`, q.stem);
        q.choices.forEach((c, i) => rich(`${loc}.choices[${i}]`, c));
        if (q.choices.length < 3 || q.choices.length > 8) r.err(loc, `mcm needs 3-8 choices, has ${q.choices.length}`);
        if (q.answer.length === 0) r.err(loc, "mcm answer empty");
        if (q.answer.some((a) => !Number.isInteger(a) || a < 0 || a >= q.choices.length)) r.err(loc, "mcm answer index out of range");
        if (q.answer.some((a, i) => i > 0 && a <= q.answer[i - 1])) r.err(loc, "mcm answer must be sorted and unique");
        break;
      }
      case "ne":
        rich(`${loc}.stem`, q.stem);
        if (q.answer.kind === "decimal") {
          if (!/^-?(\d+\.?\d*|\.\d+)$/.test(q.answer.value)) r.err(loc, `ne decimal "${q.answer.value}" does not parse`);
        } else if (!q.answer.denominator || !Number.isFinite(q.answer.numerator) || !Number.isFinite(q.answer.denominator)) {
          r.err(loc, "ne fraction has zero or invalid denominator");
        }
        break;
      default:
        r.err(loc, `unknown question type`);
    }
  };
  const checkSets = (loc: string, sets: DataSet[] | undefined) => {
    const seen = new Set<string>();
    sets?.forEach((s, i) => {
      if (seen.has(s.id)) r.err(`${loc}[${i}]`, `duplicate set id "${s.id}"`);
      seen.add(s.id);
      rich(`${loc}[${i}].title`, s.title);
      if (s.intro) rich(`${loc}[${i}].intro`, s.intro);
      diag(`${loc}[${i}].diagram`, s.diagram);
      if (s.table) {
        if (s.table.caption) rich(`${loc}[${i}].table.caption`, s.table.caption);
        s.table.header.forEach((h, j) => rich(`${loc}[${i}].table.header[${j}]`, h));
        s.table.rows.forEach((row, j) => {
          if (row.length !== s.table!.header.length) r.err(`${loc}[${i}].table.rows[${j}]`, "row length differs from header");
          row.forEach((c, k) => rich(`${loc}[${i}].table.rows[${j}][${k}]`, c));
        });
      }
    });
  };

  checkSets("exampleSets", section.exampleSets);
  checkSets("quiz.sets", section.quiz.sets);
  section.examples.forEach((q, i) => checkQuestion(`examples[${i}]`, q, section.exampleSets));
  section.quiz.questions.forEach((q, i) => checkQuestion(`quiz[${i}]`, q, section.quiz.sets));
  section.quick.forEach((q, i) => {
    rich(`quick[${i}].prompt`, q.prompt);
    rich(`quick[${i}].answer`, q.answer);
    if (q.explanation) rich(`quick[${i}].explanation`, q.explanation);
  });

  // counts
  const nq = section.quiz.questions.length;
  if (nq !== 10) r.err("quiz", `must have exactly 10 questions, has ${nq}`);
  const types = new Set(section.quiz.questions.map((q) => q.type));
  for (const t of ["qc", "mc1", "mcm", "ne"] as const) if (!types.has(t)) r.err("quiz", `missing question type "${t}"`);
  if (section.examples.length < 3 || section.examples.length > 4) r.warn("examples", `expected 3-4, has ${section.examples.length}`);
  if (section.quick.length < 5 || section.quick.length > 6) r.warn("quick", `expected 5-6, has ${section.quick.length}`);
  if (section.terms.length < 6 || section.terms.length > 30) r.warn("terms", `expected 6-30, has ${section.terms.length}`);
}

function main() {
  const si = process.argv.indexOf("--section");
  if (si >= 0) {
    const id = process.argv[si + 1];
    const load = async (path: string) => {
      try {
        return (await import(path)) as { registry?: Registry };
      } catch (e) {
        if ((e as { code?: string }).code === "ERR_MODULE_NOT_FOUND" || /Cannot find module/.test(String(e))) return {};
        throw e;
      }
    };
    return Promise.all([import(`../content/sections/${id}`), load(`../content/diagrams/${id}`), load(`../content/interactives/${id}`)]).then(([s, d, it]) => {
      const sec = (s as { default: Section }).default;
      const entry = OUTLINE.find((o) => o.id === id);
      if (!entry) makeReporter(id).err("outline", "id not in OUTLINE");
      checkSection(sec, { ...diagrams, ...(d.registry ?? {}) }, { ...interactives, ...(it.registry ?? {}) });
    });
  }
  const demo = process.argv.includes("--demo");
  if (demo) {
    return import("./fixtures/demo-section").then((m) => {
      checkSection(m.demoSection, m.demoDiagrams, m.demoInteractives);
    });
  }
  for (const [key, s] of Object.entries(SECTIONS)) {
    if (key !== s.id) makeReporter(key).err("registry", `SECTIONS key "${key}" != section.id "${s.id}"`);
    checkSection(s, diagrams, interactives);
  }
  // conventions
  const r = makeReporter("conventions");
  const rich = (loc: string, text: string) => {
    const sc = scanRich(text);
    sc.problems.forEach((p) => r.err(loc, p));
    sc.math.forEach((m) => checkTex(r, loc, m.tex, m.display));
    if (sc.terms.length) r.err(loc, "term references are not allowed in conventions");
  };
  rich("summary", conventions.summary);
  checkLesson(r, conventions.lesson, null, diagrams, interactives, rich);
  return Promise.resolve();
}

main().then(() => {
  console.log(`\nChecked ${process.argv.includes("--section") ? "section " + process.argv[process.argv.indexOf("--section") + 1] : process.argv.includes("--demo") ? "demo fixture" : `${Object.keys(SECTIONS).length} section(s) + conventions`}: ${errors} error(s), ${warnings} warning(s).`);
  process.exit(errors > 0 ? 1 : 0);
});
