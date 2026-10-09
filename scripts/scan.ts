// Shared RichText scanner for scripts: finds math spans and term references
// using the same rules as components/RichText.tsx.
export interface Scan {
  math: { tex: string; display: boolean }[];
  terms: string[];
  problems: string[];
}

export function scanRich(s: string): Scan {
  const out: Scan = { math: [], terms: [], problems: [] };
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "\\" && s[i + 1] === "$") {
      i += 2;
      continue;
    }
    if (c === "$") {
      if (s[i + 1] === "$") {
        let e = -1;
        for (let j = i + 2; j < s.length - 1; j++) {
          if (s[j] === "\\") j++;
          else if (s[j] === "$" && s[j + 1] === "$") {
            e = j;
            break;
          }
        }
        if (e > i + 2) {
          out.math.push({ tex: s.slice(i + 2, e), display: true });
          i = e + 2;
          continue;
        }
      } else {
        let e = -1;
        for (let j = i + 1; j < s.length; j++) {
          if (s[j] === "\\") j++;
          else if (s[j] === "$") {
            e = j;
            break;
          }
        }
        if (e > i + 1) {
          out.math.push({ tex: s.slice(i + 1, e), display: false });
          i = e + 1;
          continue;
        }
      }
      out.problems.push(`unmatched or empty "$" near "${s.slice(Math.max(0, i - 10), i + 15)}"`);
      i++;
      continue;
    }
    if (c === "[" && s[i + 1] === "[") {
      const e = s.indexOf("]]", i + 2);
      if (e > 0) {
        const inner = s.slice(i + 2, e);
        const bar = inner.indexOf("|");
        out.terms.push((bar < 0 ? inner : inner.slice(0, bar)).trim());
        if (bar >= 0) {
          const sub = scanRich(inner.slice(bar + 1));
          out.math.push(...sub.math);
          out.problems.push(...sub.problems);
        }
        i = e + 2;
        continue;
      }
      out.problems.push(`unclosed "[[" near "${s.slice(i, i + 20)}"`);
    }
    i++;
  }
  return out;
}
