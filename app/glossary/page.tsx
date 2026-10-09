import type { Metadata } from "next";
import { Glossary } from "@/components/Glossary";
import { availableSections } from "@/lib/data";

export const metadata: Metadata = { title: "Glossary" };

export default function Page() {
  return (
    <article className="content">
      <h1>Glossary</h1>
      <p className="muted">Every vocabulary term from the available sections, with the Turkish term. Search in English or Turkish, or practice them all.</p>
      <Glossary sections={availableSections()} />
    </article>
  );
}
