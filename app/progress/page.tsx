import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/Progress";
import { availableSections } from "@/lib/data";
import { OUTLINE } from "@/content/outline";

export const metadata: Metadata = { title: "Progress" };

export default function Page() {
  return (
    <article className="content">
      <h1>Progress</h1>
      <p className="muted">Stored only in this browser.</p>
      <ProgressDashboard sections={availableSections()} allIds={OUTLINE.map((o) => o.id)} />
    </article>
  );
}
