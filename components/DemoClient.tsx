"use client";
import { DiagramRegistryContext } from "./Diagram";
import { InteractiveRegistryContext } from "./InteractiveRegistry";
import { SectionPage } from "./SectionPage";
import { demoDiagrams, demoInteractives, demoSection } from "../scripts/fixtures/demo-section";

export function DemoClient() {
  return (
    <DiagramRegistryContext.Provider value={demoDiagrams}>
      <InteractiveRegistryContext.Provider value={demoInteractives}>
        <SectionPage section={demoSection} />
      </InteractiveRegistryContext.Provider>
    </DiagramRegistryContext.Provider>
  );
}
