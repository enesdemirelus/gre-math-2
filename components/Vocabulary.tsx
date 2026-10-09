"use client";
import { useEffect, useMemo, useState } from "react";
import type { Term } from "@/content/types";
import { RichText } from "./RichText";
import { Tex } from "./Tex";
import { Diagram } from "./Diagram";
import { getKnown, setKnown, useStored } from "@/lib/progress";
import { shuffled } from "@/lib/storage";

export interface VocabItem {
  sectionId: string;
  term: Term;
}
const keyOf = (v: VocabItem) => `${v.sectionId}/${v.term.id}`;

export function Vocabulary({ sectionId, terms }: { sectionId: string; terms: Term[] }) {
  const [mode, setMode] = useState<"list" | "flash" | "match">("list");
  const items = useMemo(() => terms.map((term) => ({ sectionId, term })), [sectionId, terms]);
  return (
    <div>
      <div className="seg" role="tablist">
        {(
          [
            ["list", "Term list"],
            ["flash", "Flashcards"],
            ["match", "Matching"],
          ] as const
        ).map(([m, label]) => (
          <button key={m} className={mode === m ? "on" : ""} onClick={() => setMode(m)} role="tab" aria-selected={mode === m}>
            {label}
          </button>
        ))}
      </div>
      {mode === "list" && <TermList terms={terms} />}
      {mode === "flash" && <Flashcards items={items} />}
      {mode === "match" && <Matching items={items} />}
    </div>
  );
}

export function TermList({ terms }: { terms: Term[] }) {
  return (
    <table className="vocab-list">
      <tbody>
        {terms.map((t) => (
          <tr key={t.id} id={`term-${t.id}`}>
            <td className="tname">
              {t.term}
              <div className="tr">{t.turkish}</div>
              {t.note && <span className="badge note">{t.note}</span>}
            </td>
            <td className="tdef">
              <RichText text={t.definition} plainTerms />
              {t.formula && <Tex tex={t.formula} display />}
              {t.source && <div className="muted" style={{ fontSize: 13 }}>{t.source}</div>}
            </td>
            <td className="thumbcell">{t.diagram && <Diagram diagram={t.diagram} thumb showCaption={false} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Flashcards({ items }: { items: VocabItem[] }) {
  const [knownList, ready] = useStored(
    () => {
      const ids = new Set(items.map((i) => i.sectionId));
      const out: string[] = [];
      ids.forEach((s) => getKnown(s).forEach((t) => out.push(`${s}/${t}`)));
      return out;
    },
    [] as string[],
  );
  const [known, setKnownState] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);
  const [deck, setDeck] = useState<VocabItem[]>(items);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [done, setDone] = useState(false);
  const [learning, setLearning] = useState<Set<string>>(new Set());

  // initial load: build deck of cards not yet known
  useEffect(() => {
    if (loaded || !ready) return;
    const k = new Set(knownList);
    setKnownState(k);
    const rest = items.filter((i) => !k.has(keyOf(i)));
    setDeck(rest.length ? rest : items);
    setLoaded(true);
  }, [knownList, items, loaded, ready]);

  const persist = (next: Set<string>) => {
    setKnownState(next);
    const bySection = new Map<string, string[]>();
    next.forEach((k) => {
      const [s, ...rest] = k.split("/");
      bySection.set(s, [...(bySection.get(s) ?? []), rest.join("/")]);
    });
    const sections = new Set(items.map((i) => i.sectionId));
    sections.forEach((s) => setKnown(s, bySection.get(s) ?? []));
  };

  const card = deck[idx];
  const advance = () => {
    setFlipped(false);
    if (idx + 1 >= deck.length) setDone(true);
    else setIdx(idx + 1);
  };
  const mark = (isKnown: boolean) => {
    const next = new Set(known);
    const l = new Set(learning);
    if (isKnown) {
      next.add(keyOf(card));
      l.delete(keyOf(card));
    } else {
      next.delete(keyOf(card));
      l.add(keyOf(card));
    }
    setLearning(l);
    persist(next);
    advance();
  };
  const restart = (cards: VocabItem[]) => {
    setDeck(cards);
    setIdx(0);
    setFlipped(false);
    setDone(false);
    setLearning(new Set());
  };

  const knownCount = items.filter((i) => known.has(keyOf(i))).length;

  if (!loaded || deck.length === 0) return <p className="muted">Loading cards…</p>;

  const header = (
    <div className="row" style={{ justifyContent: "space-between" }}>
      <span className="muted">
        {knownCount} / {items.length} known
      </span>
      <span className="row">
        <label className="row" style={{ gap: 4 }}>
          <input type="checkbox" checked={reversed} onChange={(e) => setReversed(e.target.checked)} /> Definition first
        </label>
        <button className="btn small" onClick={() => restart(shuffled(deck))}>
          Shuffle
        </button>
        <button className="btn small" onClick={() => { persist(new Set([...known].filter((k) => !items.some((i) => keyOf(i) === k)))); restart(shuffled(items)); }}>
          Reset known
        </button>
      </span>
    </div>
  );

  if (done) {
    const still = deck.filter((d) => !known.has(keyOf(d)));
    return (
      <div>
        {header}
        <div className="card soft">
          <p>
            <strong>Round complete.</strong> {deck.length - still.length} known, {still.length} still learning.
          </p>
          <div className="row">
            {still.length > 0 && (
              <button className="btn primary" onClick={() => restart(shuffled(still))}>
                Next round ({still.length} cards)
              </button>
            )}
            <button className="btn" onClick={() => restart(shuffled(items))}>
              Study all {items.length}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const t = card.term;
  const frontIsTerm = !reversed;
  return (
    <div>
      {header}
      <div
        className="flash"
        role="button"
        tabIndex={0}
        aria-label="Flip card"
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setFlipped((f) => !f);
          } else if (e.key === "ArrowRight") advance();
          else if (e.key === "ArrowLeft" && idx > 0) {
            setIdx(idx - 1);
            setFlipped(false);
          }
        }}
      >
        {!flipped ? (
          <>
            {frontIsTerm ? (
              <div className="big">{t.term}</div>
            ) : (
              <div>
                <RichText text={t.definition} plainTerms />
              </div>
            )}
            <div className="hint">Click or press space to flip</div>
          </>
        ) : (
          <div className="back">
            <div className="big">{t.term}</div>
            <div className="tr">{t.turkish}</div>
            <RichText text={t.definition} plainTerms />
            {t.formula && <Tex tex={t.formula} display />}
            {t.diagram && <Diagram diagram={t.diagram} thumb showCaption={false} />}
          </div>
        )}
      </div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="row">
          <button className="btn small" disabled={idx === 0} onClick={() => { setIdx(idx - 1); setFlipped(false); }}>
            Previous
          </button>
          <button className="btn small" onClick={advance}>
            Next
          </button>
          <span className="muted">
            {idx + 1} / {deck.length}
          </span>
        </span>
        <span className="row">
          <button className="btn bad" onClick={() => mark(false)}>
            Still learning
          </button>
          <button className="btn good" onClick={() => mark(true)}>
            Know it
          </button>
        </span>
      </div>
    </div>
  );
}

export function Matching({ items }: { items: VocabItem[] }) {
  const [pool, setPool] = useState<VocabItem[]>([]);
  const [round, setRound] = useState<VocabItem[]>([]);
  const [defs, setDefs] = useState<VocabItem[]>([]);
  const [sel, setSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);
  const [wrongTerm, setWrongTerm] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const start = (source: VocabItem[]) => {
    const p = source.length ? source : shuffled(items);
    const r = p.slice(0, 6);
    setPool(p.slice(6));
    setRound(shuffled(r));
    setDefs(shuffled(r));
    setMatched(new Set());
    setSel(null);
    setMistakes(0);
  };
  useEffect(() => {
    start(shuffled(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (round.length === 0) return <p className="muted">Loading…</p>;
  const complete = matched.size === round.length;

  const pickDef = (d: VocabItem) => {
    if (!sel || matched.has(keyOf(d))) return;
    if (sel === keyOf(d)) {
      setMatched(new Set(matched).add(sel));
      setSel(null);
    } else {
      setMistakes((m) => m + 1);
      setWrong(keyOf(d));
      setWrongTerm(sel);
      setTimeout(() => {
        setWrong(null);
        setWrongTerm(null);
      }, 600);
    }
  };

  return (
    <div>
      <p className="muted">Click a term, then the definition that matches it.</p>
      <div className="match">
        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          {round.map((r) => (
            <button
              key={keyOf(r)}
              className={matched.has(keyOf(r)) ? "done" : wrongTerm === keyOf(r) ? "wrong" : sel === keyOf(r) ? "sel" : ""}
              disabled={matched.has(keyOf(r))}
              onClick={() => setSel(keyOf(r))}
            >
              {r.term.term}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
          {defs.map((d) => (
            <button key={keyOf(d)} className={matched.has(keyOf(d)) ? "done" : wrong === keyOf(d) ? "wrong" : ""} onClick={() => pickDef(d)}>
              <RichText text={d.term.definition} plainTerms />
            </button>
          ))}
        </div>
      </div>
      {complete && (
        <div className="card soft">
          <strong>Round complete</strong> ({mistakes} wrong {mistakes === 1 ? "try" : "tries"}).{" "}
          {pool.length > 0 ? (
            <button className="btn primary" onClick={() => start(pool)}>
              Next round
            </button>
          ) : (
            <button className="btn primary" onClick={() => start(shuffled(items))}>
              Play again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
