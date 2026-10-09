import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OUTLINE, PART_TITLES } from "@/content/outline";
import { SECTIONS } from "@/content/sections";
import { SectionPage, type NavLink } from "@/components/SectionPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return OUTLINE.map((o) => ({ sectionId: o.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ sectionId: string }> }): Promise<Metadata> {
  const { sectionId } = await params;
  const o = OUTLINE.find((x) => x.id === sectionId);
  return { title: o ? `${o.number} ${o.title}` : "Not found" };
}

export default async function Page({ params }: { params: Promise<{ sectionId: string }> }) {
  const { sectionId } = await params;
  const idx = OUTLINE.findIndex((o) => o.id === sectionId);
  if (idx < 0) notFound();
  const entry = OUTLINE[idx];
  const link = (i: number): NavLink | null => (OUTLINE[i] ? { id: OUTLINE[i].id, number: OUTLINE[i].number, title: OUTLINE[i].title, available: !!SECTIONS[OUTLINE[i].id] } : null);
  const section = SECTIONS[sectionId];
  if (section) return <SectionPage section={section} prev={link(idx - 1)} next={link(idx + 1)} />;
  const prev = link(idx - 1);
  const next = link(idx + 1);
  return (
    <article className="content">
      <h1>
        {entry.number} {entry.title}
      </h1>
      <p className="muted">{PART_TITLES[entry.part]}</p>
      <div className="card soft">
        <strong>Coming soon.</strong> This section has not been written yet.
      </div>
      <div className="sec-nav">
        <span>{prev && <Link href={`/${prev.id}`}>← {prev.number} {prev.title}</Link>}</span>
        <span>{next && <Link href={`/${next.id}`}>{next.number} {next.title} →</Link>}</span>
      </div>
    </article>
  );
}
