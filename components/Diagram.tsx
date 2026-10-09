"use client";
import { createContext, useContext, type ComponentType } from "react";
import { diagrams as defaultDiagrams } from "@/content/diagrams";
import type { DiagramRef } from "@/content/types";
import { RichText } from "./RichText";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DiagramRegistry = Record<string, ComponentType<any>>;

export const DiagramRegistryContext = createContext<DiagramRegistry>(defaultDiagrams);

export function Diagram({ diagram, thumb = false, showCaption = true }: { diagram: DiagramRef; thumb?: boolean; showCaption?: boolean }) {
  const registry = useContext(DiagramRegistryContext);
  const C = registry[diagram.key];
  if (!C) {
    return <div className="diagram-missing">[missing diagram: {diagram.key}]</div>;
  }
  return (
    <figure className={thumb ? "diagram thumb" : "diagram"}>
      <C {...(diagram.props ?? {})} />
      {showCaption && diagram.caption && (
        <figcaption>
          <RichText text={diagram.caption} />
        </figcaption>
      )}
    </figure>
  );
}
