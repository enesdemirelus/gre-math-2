"use client";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { Term } from "@/content/types";
import { RichText } from "./RichText";

export function TermRef({ term, children }: { term: Term; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number; above: boolean } | null>(null);
  const trigger = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const pointer = useRef<string>("mouse");
  const id = useId();

  const place = useCallback(() => {
    const t = trigger.current;
    const p = tip.current;
    if (!t || !p) return;
    const r = t.getBoundingClientRect();
    const w = p.offsetWidth;
    const h = p.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(r.left + r.width / 2 - w / 2, 8), Math.max(8, vw - w - 8));
    const spaceAbove = r.top - 8;
    const spaceBelow = vh - r.bottom - 8;
    const above = spaceAbove >= h + 6 || spaceAbove >= spaceBelow;
    const top = above ? Math.max(8, r.top - h - 6) : r.bottom + 6;
    setPos({ left, top, above });
  }, []);

  useLayoutEffect(() => {
    if (open) place();
    else setPos(null);
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const down = (e: PointerEvent) => {
      const el = e.target as Node;
      if (!trigger.current?.contains(el) && !tip.current?.contains(el)) setOpen(false);
    };
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", down);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", down);
    };
  }, [open]);

  return (
    <>
      <span
        ref={trigger}
        className="term-ref"
        tabIndex={0}
        aria-describedby={open ? id : undefined}
        onPointerDown={(e) => {
          pointer.current = e.pointerType;
        }}
        onMouseEnter={() => pointer.current !== "touch" && setOpen(true)}
        onMouseLeave={() => pointer.current !== "touch" && setOpen(false)}
        onFocus={() => pointer.current !== "touch" && setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => pointer.current === "touch" && setOpen((o) => !o)}
      >
        {children}
      </span>
      {open &&
        createPortal(
          <span
            ref={tip}
            id={id}
            role="tooltip"
            className="term-tip"
            style={{ left: pos?.left ?? 0, top: pos?.top ?? 0, visibility: pos ? "visible" : "hidden" }}
          >
            <span className="term-tip-head">
              <strong><RichText text={term.term} plainTerms /></strong>
              <span className="term-tip-tr">
                <span className="tr-label">TR</span> {term.turkish}
              </span>
            </span>
            <span className="term-tip-def">
              <RichText text={term.definition} plainTerms />
            </span>
          </span>,
          document.body,
        )}
    </>
  );
}
