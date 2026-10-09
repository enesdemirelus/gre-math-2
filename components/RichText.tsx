"use client";
import { Fragment, type ReactNode } from "react";
import { Tex } from "./Tex";
import { TermRef } from "./TermRef";
import { useTerms } from "./TermContext";
import type { Term } from "@/content/types";

interface Opts {
  terms: Record<string, Term> | null;
  /** Render [[term]] as plain text (used inside tooltips and matching games). */
  plainTerms: boolean;
}

const isWord = (c: string | undefined) => c !== undefined && /[A-Za-z0-9]/.test(c);

/** Index of the closing single `$` after `from` (skipping backslash escapes), or -1. */
function closeDollar(s: string, from: number): number {
  for (let j = from; j < s.length; j++) {
    if (s[j] === "\\") j++;
    else if (s[j] === "$") return j;
  }
  return -1;
}

function closeDouble(s: string, from: number): number {
  for (let j = from; j < s.length - 1; j++) {
    if (s[j] === "\\") j++;
    else if (s[j] === "$" && s[j + 1] === "$") return j;
  }
  return -1;
}

/** Find the next index >= from where pred holds, skipping over math spans. */
function findOutsideMath(s: string, from: number, pred: (j: number) => boolean): number {
  for (let j = from; j < s.length; j++) {
    if (s[j] === "\\") {
      j++;
      continue;
    }
    if (s[j] === "$") {
      if (s[j + 1] === "$") {
        const e = closeDouble(s, j + 2);
        if (e < 0) return -1;
        j = e + 1;
      } else {
        const e = closeDollar(s, j + 1);
        if (e < 0) continue;
        j = e;
      }
      continue;
    }
    if (pred(j)) return j;
  }
  return -1;
}

function parse(s: string, o: Opts, kp: string): ReactNode[] {
  const out: ReactNode[] = [];
  let buf = "";
  let n = 0;
  const flush = () => {
    if (buf) {
      out.push(<Fragment key={`${kp}t${n++}`}>{buf}</Fragment>);
      buf = "";
    }
  };
  const push = (node: ReactNode) => {
    flush();
    out.push(<Fragment key={`${kp}n${n++}`}>{node}</Fragment>);
  };

  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "\\" && s[i + 1] === "$") {
      buf += "$";
      i += 2;
      continue;
    }
    if (c === "$") {
      if (s[i + 1] === "$") {
        const e = closeDouble(s, i + 2);
        if (e > i + 2) {
          push(<Tex tex={s.slice(i + 2, e)} display />);
          i = e + 2;
          continue;
        }
      } else {
        const e = closeDollar(s, i + 1);
        if (e > i + 1) {
          push(<Tex tex={s.slice(i + 1, e)} />);
          i = e + 1;
          continue;
        }
      }
    }
    if (c === "[" && s[i + 1] === "[") {
      const e = s.indexOf("]]", i + 2);
      if (e > 0) {
        const inner = s.slice(i + 2, e);
        const bar = inner.indexOf("|");
        const id = (bar < 0 ? inner : inner.slice(0, bar)).trim();
        const custom = bar < 0 ? undefined : inner.slice(bar + 1);
        const term = o.terms?.[id];
        if (!term && process.env.NODE_ENV !== "production") {
          console.warn(`RichText: unknown term id "${id}"`);
        }
        const shown = custom !== undefined ? parse(custom, o, `${kp}${n}c`) : term ? term.term : id;
        if (term && !o.plainTerms) push(<TermRef term={term}>{shown}</TermRef>);
        else push(shown);
        i = e + 2;
        continue;
      }
    }
    if (c === "*" && s[i + 1] === "*") {
      const e = findOutsideMath(s, i + 2, (j) => s[j] === "*" && s[j + 1] === "*");
      if (e > i + 2) {
        push(<strong>{parse(s.slice(i + 2, e), o, `${kp}${n}b`)}</strong>);
        i = e + 2;
        continue;
      }
    }
    if (c === "_" && !isWord(s[i - 1]) && s[i + 1] !== undefined && !/\s/.test(s[i + 1])) {
      const e = findOutsideMath(s, i + 1, (j) => s[j] === "_" && !/\s/.test(s[j - 1]) && !isWord(s[j + 1]));
      if (e > i + 1) {
        push(<em>{parse(s.slice(i + 1, e), o, `${kp}${n}i`)}</em>);
        i = e + 1;
        continue;
      }
    }
    buf += c;
    i++;
  }
  flush();
  return out;
}

export function RichText({ text, plainTerms = false }: { text: string; plainTerms?: boolean }) {
  const terms = useTerms();
  return <>{parse(text, { terms, plainTerms }, "r")}</>;
}
