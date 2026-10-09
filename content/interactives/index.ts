import type { ComponentType } from "react";
import { SectorExplorer, DiameterExplorer } from "./3-5-circles";
// Register every interactive explorer here with key "<section-id>/<name>".
// Components live in content/interactives/<section-id>.tsx and start with "use client".

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const interactives: Record<string, ComponentType<any>> = {
  "3-5-circles/sector-explorer": SectorExplorer,
  "3-5-circles/diameter-explorer": DiameterExplorer,
};
