import { OUTLINE } from "@/content/outline";
import { SECTIONS } from "@/content/sections";
import type { DataSet, Part, Question, Term } from "@/content/types";

export interface SectionData {
  id: string;
  number: string;
  title: string;
  part: Part;
  terms: Term[];
  questions: Question[];
  sets: DataSet[];
}

/** Available sections in outline order, trimmed to what the tool pages need. */
export function availableSections(): SectionData[] {
  const out: SectionData[] = [];
  for (const o of OUTLINE) {
    const s = SECTIONS[o.id];
    if (!s) continue;
    out.push({
      id: s.id,
      number: s.number,
      title: s.title,
      part: s.part,
      terms: s.terms,
      questions: s.quiz.questions,
      sets: s.quiz.sets ?? [],
    });
  }
  return out;
}
