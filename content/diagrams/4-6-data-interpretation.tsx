// Multi-panel data displays for section 4.6 Data Interpretation Examples.
// The single-panel displays (bar, line, circle graphs) are reused from section 4.1; this file only
// stacks them into the two-panel displays that Data Interpretation sets often use.

import { LineGraph, CircleGraph, type LineGraphProps, type CircleGraphProps } from "./4-1-presenting-data";

/** Two line graphs sharing one horizontal axis (stacked), each with its own vertical scale. */
export function TwoLinePanels(p: { top: LineGraphProps; bottom: LineGraphProps }) {
  const W = 340;
  const h = 215;
  return (
    <svg viewBox={`0 0 ${W} ${2 * h}`} width={W} role="img" aria-label="Two line graphs">
      <svg x={0} y={0} width={W} height={h} viewBox={`0 0 ${W} ${h}`}>
        <LineGraph {...p.top} width={W} height={h} />
      </svg>
      <svg x={0} y={h} width={W} height={h} viewBox={`0 0 ${W} ${h}`}>
        <LineGraph {...p.bottom} width={W} height={h} />
      </svg>
    </svg>
  );
}

/** Two circle graphs (different totals) stacked vertically. */
export function PairedCircleGraphs(p: { first: CircleGraphProps; second: CircleGraphProps }) {
  const W = 340;
  const h = 268;
  return (
    <svg viewBox={`0 0 ${W} ${2 * h}`} width={W} role="img" aria-label="Two circle graphs">
      <svg x={0} y={0} width={W} height={h} viewBox={`0 0 ${W} ${h}`}>
        <CircleGraph {...p.first} width={W} height={h} />
      </svg>
      <svg x={0} y={h} width={W} height={h} viewBox={`0 0 ${W} ${h}`}>
        <CircleGraph {...p.second} width={W} height={h} />
      </svg>
    </svg>
  );
}

export const registry = {
  "4-6-data-interpretation/two-line-panels": TwoLinePanels,
  "4-6-data-interpretation/paired-circle-graphs": PairedCircleGraphs,
};
