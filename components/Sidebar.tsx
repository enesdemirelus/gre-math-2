"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { OUTLINE, PART_TITLES } from "@/content/outline";
import type { Part } from "@/content/types";

const PARTS: Part[] = ["arithmetic", "algebra", "geometry", "data-analysis"];

export function Shell({ available, children }: { available: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const avail = new Set(available);

  const item = (href: string, label: React.ReactNode, off = false) => (
    <Link key={href} href={href} className={(pathname === href ? "active " : "") + (off ? "off" : "")} aria-current={pathname === href ? "page" : undefined}>
      {label}
    </Link>
  );

  return (
    <>
      <div className="topbar">
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="sidebar" aria-label="Toggle navigation">
          Menu
        </button>
        <strong>GRE Quant Review</strong>
      </div>
      <div className={"scrim" + (open ? " open" : "")} onClick={() => setOpen(false)} />
      <nav id="sidebar" className={"sidebar" + (open ? " open" : "")} aria-label="Sections">
        <div className="brand">GRE Quant Review</div>
        {item("/", "Home")}
        {item("/conventions", "Conventions")}
        <div className="grp">Tools</div>
        {item("/practice", "Mixed practice")}
        {item("/glossary", "Glossary")}
        {item("/formulas", "Formulas")}
        {item("/progress", "Progress")}
        {PARTS.map((p, pi) => (
          <div key={p}>
            <div className="grp">
              {pi + 1}. {PART_TITLES[p]}
            </div>
            {OUTLINE.filter((o) => o.part === p).map((o) =>
              item(
                `/${o.id}`,
                <>
                  <span className="num">{o.number}</span>
                  {o.title}
                </>,
                !avail.has(o.id),
              ),
            )}
          </div>
        ))}
      </nav>
      <main className="main">{children}</main>
    </>
  );
}
