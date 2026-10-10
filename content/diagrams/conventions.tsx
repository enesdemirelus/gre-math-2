// Original diagrams for the Math Conventions page.

type Pt = [number, number];
const r2 = (n: number) => Math.round(n * 100) / 100;

function Label({ at, children, cls = "dg-label" }: { at: Pt; children: React.ReactNode; cls?: string }) {
  return (
    <text x={at[0]} y={at[1]} className={cls} textAnchor="middle" fontSize={14}>
      {children}
    </text>
  );
}

/** A figure that is not drawn to scale: what is and is not determined. */
export function NotToScale() {
  const P: Pt = [50, 30];
  const Q: Pt = [50, 150];
  const R: Pt = [300, 150];
  const S: Pt = [170, 150];
  return (
    <svg viewBox="0 0 340 185" width={340} role="img" aria-label="Right angle at Q, point S on segment QR, segment PS">
      <path className="dg-fill" d={`M ${P.join(" ")} L ${Q.join(" ")} L ${R.join(" ")} Z`} />
      <path className="dg-line" d={`M ${P.join(" ")} L ${Q.join(" ")} L ${R.join(" ")} Z`} />
      <path className="dg-line" d={`M ${P.join(" ")} L ${S.join(" ")}`} />
      <path className="dg-thin" d="M 50 141 L 59 141 L 59 150" />
      <circle className="dg-point" cx={S[0]} cy={S[1]} r={3} />
      <Label at={[P[0] - 4, P[1] - 8]}>P</Label>
      <Label at={[Q[0] - 8, Q[1] + 16]}>Q</Label>
      <Label at={[R[0] + 6, R[1] + 16]}>R</Label>
      <Label at={[S[0], S[1] + 18]}>S</Label>
      <Label at={[(Q[0] + S[0]) / 2, Q[1] + 18]} cls="dg-text">5</Label>
      <Label at={[(P[0] + Q[0]) / 2 - 12, (P[1] + Q[1]) / 2]} cls="dg-text">?</Label>
    </svg>
  );
}

/** Angle ABC: the smaller of the two angles at B is the one meant. */
export function AngleABC() {
  const B: Pt = [140, 100];
  const A: Pt = [50, 35];
  const C: Pt = [255, 55];
  const ang = (p: Pt) => Math.atan2(-(p[1] - B[1]), p[0] - B[0]);
  const a1 = ang(A);
  const a2 = ang(C);
  const pt = (rr: number, t: number): Pt => [r2(B[0] + rr * Math.cos(t)), r2(B[1] - rr * Math.sin(t))];
  // smaller angle: from a1 clockwise to a2 (a1 > a2), sweep a1 - a2 < pi
  const s = pt(32, a1);
  const e = pt(32, a2);
  const s2 = pt(48, a1);
  const e2 = pt(48, a2);
  const mid = pt(70, (a1 + a2) / 2);
  return (
    <svg viewBox="0 0 300 160" width={300} role="img" aria-label="Angle ABC drawn as the smaller angle at B">
      <path className="dg-line" d={`M ${A.join(" ")} L ${B.join(" ")} L ${C.join(" ")}`} />
      <path className="dg-accent" d={`M ${s.join(" ")} A 32 32 0 0 1 ${e.join(" ")}`} />
      <path className="dg-dashed" d={`M ${s2.join(" ")} A 48 48 0 1 0 ${e2.join(" ")}`} />
      <circle className="dg-point" cx={B[0]} cy={B[1]} r={3} />
      <Label at={[A[0] - 4, A[1] - 8]}>A</Label>
      <Label at={[B[0], B[1] + 18]}>B</Label>
      <Label at={[C[0] + 8, C[1] - 6]}>C</Label>
      <Label at={mid} cls="dg-text">less than 180°</Label>
    </svg>
  );
}

export const registry = {
  "conventions/NotToScale": NotToScale,
  "conventions/AngleABC": AngleABC,
};
