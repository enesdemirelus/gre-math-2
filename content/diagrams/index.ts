import type { ComponentType } from "react";
import * as circles from "./3-5-circles";
// Register every diagram here with key "<section-id>/<name>".

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const diagrams: Record<string, ComponentType<any>> = {
  "3-5-circles/circle-parts": circles.CircleParts,
  "3-5-circles/congruent-circles": circles.CongruentCircles,
  "3-5-circles/arc": circles.ArcFigure,
  "3-5-circles/tangent": circles.TangentFigure,
  "3-5-circles/inscribed-polygon": circles.InscribedPolygon,
  "3-5-circles/circumscribed-polygon": circles.CircumscribedPolygon,
  "3-5-circles/concentric": circles.ConcentricCircles,
  "3-5-circles/center-positions": circles.CenterPositions,
  "3-5-circles/diameter-triangle": circles.DiameterTriangle,
  "3-5-circles/square-and-circle": circles.SquareAndCircle,
  "3-5-circles/inscribed-angle": circles.InscribedAngleFig,
  "3-5-circles/sector-example": circles.SectorExample,
  "3-5-circles/ring-chord": circles.RingChord,
  "3-5-circles/chord-angle-qc": circles.ChordAngleQC,
  "3-5-circles/tangent-question": circles.TangentQuestion,
};
