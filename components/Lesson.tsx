"use client";
import { useContext } from "react";
import type { LessonBlock } from "@/content/types";
import { RichText } from "./RichText";
import { Tex } from "./Tex";
import { Diagram } from "./Diagram";
import { InteractiveRegistryContext } from "./InteractiveRegistry";

const ASIDE_LABEL = { tip: "Tip", watch: "Watch out", gre: "On the GRE" } as const;

export function Lesson({ blocks }: { blocks: LessonBlock[] }) {
  const interactives = useContext(InteractiveRegistryContext);
  return (
    <div className="lesson">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "heading":
            return <h3 key={i}>{b.text}</h3>;
          case "p":
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            );
          case "math":
            return (
              <div key={i} className={"math-block" + (b.key ? " key" : "")}>
                <Tex tex={b.tex} display />
              </div>
            );
          case "diagram":
            return <Diagram key={i} diagram={b.diagram} />;
          case "aside":
            return (
              <div key={i} className={"aside " + b.tone}>
                <div className="label">{b.title ?? ASIDE_LABEL[b.tone]}</div>
                <p>
                  <RichText text={b.text} />
                </p>
              </div>
            );
          case "list":
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    <RichText text={it} />
                  </li>
                ))}
              </ul>
            );
          case "interactive": {
            const C = interactives[b.key];
            return (
              <div key={i} className="explore">
                <div className="explore-head">
                  <b>Explore</b>
                  {b.title}
                </div>
                <div className="explore-body">{C ? <C {...(b.props ?? {})} /> : <span className="diagram-missing">[missing interactive: {b.key}]</span>}</div>
                {b.caption && (
                  <div className="explore-cap">
                    <RichText text={b.caption} />
                  </div>
                )}
              </div>
            );
          }
        }
      })}
    </div>
  );
}
