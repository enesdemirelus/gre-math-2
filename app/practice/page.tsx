import type { Metadata } from "next";
import { Practice } from "@/components/Practice";
import { availableSections } from "@/lib/data";

export const metadata: Metadata = { title: "Mixed practice" };

export default function Page() {
  return (
    <article className="content">
      <h1>Mixed practice</h1>
      <p className="muted">A test built from the chapter quiz questions of the sections you choose. One question per screen, as on the real test.</p>
      <Practice sections={availableSections()} />
    </article>
  );
}
