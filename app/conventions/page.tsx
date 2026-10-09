import type { Metadata } from "next";
import { conventions } from "@/content/conventions";
import { Lesson } from "@/components/Lesson";
import { RichText } from "@/components/RichText";

export const metadata: Metadata = { title: "Conventions" };

export default function Page() {
  return (
    <article className="content">
      <h1>{conventions.title}</h1>
      <p>
        <RichText text={conventions.summary} />
      </p>
      <Lesson blocks={conventions.lesson} />
    </article>
  );
}
