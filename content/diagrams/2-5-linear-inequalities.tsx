// Original diagrams for section 2.5 Solving Linear Inequalities.
// Number lines are drawn to scale (MC p. 11); the shared NumberLine component computes every position.

import { NumberLine, type NumberLineProps } from "./1-5-real-numbers";

/** A solution set on a number line (generic; all data passed as props). */
export function SolutionSet(props: NumberLineProps) {
  return <NumberLine {...props} />;
}

/** Multiplying by -1 reflects the number line about 0, so the order of two numbers reverses. */
export function FlipFigure() {
  return (
    <NumberLine
      min={-5}
      max={5}
      points={[
        { v: 2, label: "a = 2", upright: true, row: 0 },
        { v: 4, label: "b = 4", upright: true, row: 1 },
        { v: -2, label: "−a = −2", upright: true, row: 0, accent: true },
        { v: -4, label: "−b = −4", upright: true, row: 1, accent: true },
      ]}
    />
  );
}

export const registry = {
  "2-5-linear-inequalities/solution-set": SolutionSet,
  "2-5-linear-inequalities/flip": FlipFigure,
};
