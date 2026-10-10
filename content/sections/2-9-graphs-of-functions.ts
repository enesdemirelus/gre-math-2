import type { Section, DiagramRef } from "../types";

const PLOT = "2-9-graphs-of-functions/plot";

/* Reusable to-scale graphs (props for the Plot component). */

/** f(x) = x^2 - 4x + 3 = (x - 1)(x - 3) = (x - 2)^2 - 1, with the point (4, 3) read off the graph. */
const graphPoint = (extra: Record<string, unknown> = {}): DiagramRef => ({
  key: PLOT,
  props: {
    xmin: -2, xmax: 6, ymin: -2, ymax: 6,
    curves: [{ base: "sq", h: 2, k: -1 }],
    segs: [{ x1: 4, y1: 0, x2: 4, y2: 3 }],
    points: [
      { x: 4, y: 3, label: "(4, 3)", dx: 8, dy: 12 },
      { x: 1, y: 0, label: "1", dx: -6, dy: -7, anchor: "end" },
      { x: 3, y: 0, label: "3", dx: 6, dy: -7 },
      { x: 0, y: 3, label: "(0, 3)", dx: 8, dy: -6 },
    ],
    texts: [{ x: -1.9, y: 1.5, text: "y = f(x)" }],
    ...extra,
  },
});

const verticalLine: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -2, xmax: 6, ymin: -2, ymax: 6,
    curves: [{ base: "sq", h: 2, k: -1 }],
    segs: [{ x1: 3.5, y1: -2, x2: 3.5, y2: 6, style: "dashed" }],
    points: [{ x: 3.5, y: 1.25, label: "one point", dx: 7, dy: 4 }],
  },
};

const intersection: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -3, xmax: 4, ymin: -1, ymax: 7,
    curves: [{ base: "sq" }, { base: "lin", a: 1, k: 2, style: "line" }],
    points: [
      { x: -1, y: 1, label: "(−1, 1)", dx: -8, dy: 4, anchor: "end" },
      { x: 2, y: 4, label: "(2, 4)", dx: 8, dy: 10 },
    ],
    texts: [
      { x: -2.85, y: 5.4, text: "y = x²" },
      { x: 3.9, y: 3.3, text: "y = x + 2", anchor: "end" },
    ],
  },
};

const piecewise: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -2, xmax: 5, ymin: -1, ymax: 5,
    curves: [
      { base: "lin", a: -1, k: 2, to: 1 },
      { base: "lin", a: 1, from: 1 },
    ],
    points: [{ x: 1, y: 1, label: "(1, 1)", dx: 0, dy: 18, anchor: "middle" }],
    texts: [
      { x: -1.8, y: 4.3, text: "y = 2 − x" },
      { x: 4.5, y: 3.0, text: "y = x", anchor: "end" },
    ],
  },
};

const shiftAbs: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -5, xmax: 5, ymin: -4, ymax: 5,
    curves: [{ base: "abs", style: "dashed" }, { base: "abs", k: -3 }],
    texts: [
      { x: 1.6, y: 4.3, text: "y = |x|", anchor: "end" },
      { x: 3.0, y: -1.2, text: "y = |x| − 3" },
    ],
  },
};

const shiftSq: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -3, xmax: 5, ymin: -1, ymax: 6, xLabels: [-2, -1, 1, 4],
    curves: [{ base: "sq", style: "dashed" }, { base: "sq", h: 2 }],
    points: [{ x: 2, y: 0, label: "(2, 0)", dx: 0, dy: 15, anchor: "middle" }],
    texts: [
      { x: -1.1, y: 5.0, text: "y = x²", anchor: "end" },
      { x: 4.6, y: 3.3, text: "y = (x − 2)²", anchor: "end" },
    ],
  },
};

const stretch: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -4, xmax: 4, ymin: -1, ymax: 6,
    curves: [{ base: "sq", style: "dashed" }, { base: "sq", a: 2 }, { base: "sq", a: 0.5, style: "line" }],
    points: [
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 1, y: 0.5 },
    ],
    texts: [
      { x: -1.8, y: 5.3, text: "y = 2x²", anchor: "end" },
      { x: 2.6, y: 5.5, text: "y = x²" },
      { x: 3.95, y: 1.4, text: "y = ½x²", anchor: "end" },
    ],
  },
};

const stretchOnly: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -4, xmax: 4, ymin: -1, ymax: 6,
    curves: [{ base: "sq", style: "dashed" }, { base: "sq", a: 2 }],
    points: [{ x: 1, y: 2, label: "(1, 2)", dx: 8, dy: -4 }],
    texts: [
      { x: -1.8, y: 5.3, text: "y = 2x²", anchor: "end" },
      { x: 2.6, y: 5.5, text: "y = x²" },
    ],
  },
};

const shrinkOnly: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -4, xmax: 4, ymin: -1, ymax: 6,
    curves: [{ base: "sq", style: "dashed" }, { base: "sq", a: 0.5 }],
    points: [{ x: 1, y: 0.5, label: "(1, ½)", dx: 8, dy: 12 }],
    texts: [
      { x: -2.6, y: 5.3, text: "y = x²", anchor: "end" },
      { x: 3.95, y: 1.4, text: "y = ½x²", anchor: "end" },
    ],
  },
};

const reflect: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -1, xmax: 7, ymin: -3, ymax: 3,
    curves: [{ base: "sqrt", style: "dashed" }, { base: "sqrt", a: -1 }],
    points: [
      { x: 4, y: 2, label: "(4, 2)", dx: 0, dy: -9, anchor: "middle" },
      { x: 4, y: -2, label: "(4, −2)", dx: 0, dy: 18, anchor: "middle" },
    ],
    texts: [
      { x: 6.9, y: 2.75, text: "y = √x", anchor: "end" },
      { x: 6.9, y: -1.95, text: "y = −√x", anchor: "end" },
    ],
  },
};

const combined: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -3, xmax: 4, ymin: -4, ymax: 5,
    curves: [{ base: "sq", style: "dashed" }, { base: "sq", a: -2, h: 1, k: 3 }],
    points: [
      { x: 1, y: 3, label: "(1, 3)", dx: 8, dy: -6 },
      { x: 0, y: 1, label: "(0, 1)", dx: -7, dy: 4, anchor: "end" },
    ],
    texts: [
      { x: -2.0, y: 4.4, text: "y = x²", anchor: "end" },
      { x: 3.9, y: 4.4, text: "y = −2(x − 1)² + 3", anchor: "end" },
    ],
  },
};

/** Example 1: f(x) = 2|x + 2| + 1. */
const vFigure: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -5, xmax: 2, ymin: -1, ymax: 7,
    curves: [{ base: "abs", a: 2, h: -2, k: 1 }],
    points: [
      { x: -2, y: 1, label: "(−2, 1)", dx: 0, dy: 18, anchor: "middle" },
      { x: 0, y: 5, label: "(0, 5)", dx: 8, dy: 10 },
    ],
    texts: [{ x: -4.8, y: 6.3, text: "y = f(x)" }],
  },
};

/** Quiz 2: f(x) = -1/2 (x - 2)^2 + 4. */
const zParabola: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -2, xmax: 6, ymin: -3, ymax: 5,
    curves: [{ base: "sq", a: -0.5, h: 2, k: 4 }],
    points: [
      { x: 2, y: 4, label: "(2, 4)", dx: 0, dy: -9, anchor: "middle" },
      { x: 0, y: 2, label: "(0, 2)", dx: -7, dy: -6, anchor: "end" },
    ],
    texts: [{ x: 4.9, y: 2.7, text: "y = f(x)" }],
  },
};

/** Quiz 4: y = -sqrt(x + 1) + 2. */
const zRoot: DiagramRef = {
  key: PLOT,
  props: {
    xmin: -2, xmax: 9, ymin: -2, ymax: 4,
    curves: [{ base: "sqrt", a: -1, h: -1, k: 2 }],
    points: [
      { x: -1, y: 2, label: "(−1, 2)", dx: 0, dy: -9, anchor: "middle" },
      { x: 3, y: 0, label: "(3, 0)", dx: 2, dy: -8 },
      { x: 8, y: -1, label: "(8, −1)", dx: 0, dy: 17, anchor: "middle" },
    ],
  },
};

const small = (curves: unknown[], texts: unknown[] = []): DiagramRef => ({
  key: PLOT,
  props: { xmin: -3, xmax: 4, ymin: -3, ymax: 5, u: 24, xLabels: [-2, 2], yLabels: [-2, 2, 4], curves, texts },
});

const section: Section = {
  id: "2-9-graphs-of-functions",
  number: "2.9",
  title: "Graphs of Functions",
  part: "algebra",
  mrPages: "72–79",
  summary: String.raw`How a function becomes a picture in the $xy$-plane, the graphs of the elementary functions (lines, parabolas, $|x|$, $\sqrt{x}$), where two graphs meet, and the moves the GRE expects you to read off a formula: shifts, reflection in the $x$-axis, and vertical stretches and shrinks.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "From a function to its graph" },
    {
      kind: "p",
      text: String.raw`To graph a function $f$ in the $xy$-plane, plot every input $x$ together with its output as the point $(x, y)$ with $y = f(x)$. The $x$-axis carries the input and the $y$-axis the output (MR p. 72). The [[graph-of-function|graph]] of $f$ is therefore the same thing as the graph of the equation $y = f(x)$, and the two phrasings are used interchangeably.`,
    },
    {
      kind: "p",
      text: String.raw`That one sentence gives you a dictionary between algebra and pictures. "$f(4) = 3$" and "the point $(4, 3)$ is on the graph of $f$" say the same thing. The $y$-intercept of the graph is the point $(0, f(0))$. The $x$-intercepts are the points where the output is 0, so finding them means solving $f(x) = 0$. Below, $f(x) = x^2 - 4x + 3 = (x - 1)(x - 3)$: the graph crosses the $x$-axis at $1$ and $3$, crosses the $y$-axis at $f(0) = 3$, has its lowest point at $(2, -1)$, and passes through $(4, 3)$ because $f(4) = 16 - 16 + 3 = 3$.`,
    },
    {
      kind: "diagram",
      diagram: { ...graphPoint(), caption: String.raw`The graph of $f(x) = x^2 - 4x + 3$. The dashed segment shows how to read $f(4) = 3$: go to $x = 4$, then up to the graph.` },
    },
    {
      kind: "p",
      text: String.raw`Because each input has exactly one output (MR p. 53), no vertical line can meet the graph of a function at more than one point. Textbooks call this the [[vertical-line-test|vertical line test]]. A circle, for instance, is not the graph of any function of $x$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Graphs are drawn to scale",
      text: String.raw`Unlike geometry figures, coordinate-plane graphs on the GRE are drawn to scale (MC p. 11), so you may read values off the grid. When the question gives exact coordinates, still use them: a reading such as "about 2.4" is only an estimate.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The elementary graphs" },
    {
      kind: "p",
      text: String.raw`A handful of shapes cover almost everything the GRE graphs. A [[linear-function|linear function]] such as $f(x) = 2x - 3$ has a line as its graph, here the line with slope 2 and $y$-intercept $-3$ (Section 2.8). The [[quadratic-function|quadratic function]] $g(x) = x^2$ has the [[parabola]] $y = x^2$ as its graph (MR pp. 72–73).`,
    },
    {
      kind: "p",
      text: String.raw`The [[absolute-value-function|absolute value function]] $h(x) = |x|$ can be written without the bars by splitting its domain in two. A function given by different expressions on different parts of its domain is a [[piecewise|piecewise-defined function]] (MR p. 74):`,
    },
    { kind: "math", tex: String.raw`h(x) = |x| = \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}`, key: true },
    {
      kind: "p",
      text: String.raw`So the graph of $y = |x|$ is V-shaped: the two linear pieces $y = x$ and $y = -x$ joined at the origin. Finally, the [[square-root-function|positive square root function]] $j(x) = \sqrt{x}$, for $x \ge 0$, has as its graph the upper half of a parabola lying on its side, and $k(x) = -\sqrt{x}$, for $x \ge 0$, gives the lower half. The reason: squaring $y = \pm\sqrt{x}$ gives $y^2 = x$, which is $y = x^2$ with $x$ and $y$ interchanged, so these graphs are the right and left halves of $y = x^2$ reflected about the line $y = x$ (MR p. 75).`,
    },
    {
      kind: "diagram",
      diagram: { key: "2-9-graphs-of-functions/basic-graphs", caption: String.raw`The elementary graphs. In the last panel the accent curve is $y = \sqrt{x}$ and the dark curve is $y = -\sqrt{x}$; both start at the origin and exist only for $x \ge 0$.` },
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Know three anchor points of each shape",
      text: String.raw`$y = x^2$ passes through $(0, 0)$, $(\pm 1, 1)$, $(\pm 2, 4)$. $y = |x|$ passes through $(0, 0)$, $(\pm 1, 1)$, $(\pm 3, 3)$. $y = \sqrt{x}$ passes through $(0, 0)$, $(1, 1)$, $(4, 2)$, $(9, 3)$. After a transformation, these points move in a predictable way, which is the fastest way to check an answer choice.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Where two graphs meet" },
    {
      kind: "p",
      text: String.raw`A point lies on both graphs exactly when it has the same output under both functions, so the [[intersection|points of intersection]] of the graphs of $f$ and $g$ are the points where $f(x) = g(x)$ (MR p. 73). Solve that equation for $x$, then get each $y$ from either function.`,
    },
    {
      kind: "p",
      text: String.raw`For $y = x^2$ and $y = x + 2$: setting $x^2 = x + 2$ gives $x^2 - x - 2 = 0$, or $(x - 2)(x + 1) = 0$. So $x = 2$ or $x = -1$, and the intersection points are $(2, 4)$ and $(-1, 1)$.`,
    },
    {
      kind: "diagram",
      diagram: { ...intersection, caption: String.raw`The parabola $y = x^2$ and the line $y = x + 2$ meet where $x^2 = x + 2$.` },
    },
    {
      kind: "p",
      text: String.raw`This also answers counting questions. The number of intersection points equals the number of real solutions of $f(x) = g(x)$. For a line and a parabola that equation is a quadratic, so there are 2, 1 or 0 intersection points according to whether the discriminant $b^2 - 4ac$ is positive, zero or negative (Section 2.4).`,
    },
    {
      kind: "interactive",
      key: "2-9-graphs-of-functions/intersection-explorer",
      title: "Line meets curve",
      caption: String.raw`Choose $y = x^2$ or $y = |x|$, then move the line $y = mx + b$. The explorer solves $f(x) = mx + b$ and counts the intersection points.`,
    },
    {
      kind: "aside",
      tone: "gre",
      text: String.raw`A typical question shows the graph of $f$ and asks for which of five linear functions $g$ the graphs intersect. Compare slopes and intercepts first: a line that starts below a V-shaped graph and rises more slowly than both of its arms can never catch it. Solve $f(x) = g(x)$ only for the choices that survive.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Piecewise-defined functions" },
    {
      kind: "p",
      text: String.raw`Piecewise definitions are not limited to $|x|$. A question can define a function by two formulas, each with its own part of the domain. To evaluate, first decide which piece the input belongs to, then use only that formula. With`,
    },
    { kind: "math", tex: String.raw`f(x) = \begin{cases} 2 - x, & x < 1 \\ x, & x \ge 1 \end{cases}` },
    {
      kind: "p",
      text: String.raw`we get $f(-2) = 2 - (-2) = 4$, $f(1) = 1$ (since $1 \ge 1$, the second piece) and $f(3) = 3$. The graph is two rays that meet at $(1, 1)$. In fact this $f$ is the same function as $|x - 1| + 1$, which is exactly the kind of formula the next subsections teach you to read.`,
    },
    {
      kind: "diagram",
      diagram: { ...piecewise, caption: String.raw`The piecewise-defined function above: the ray $y = 2 - x$ for $x < 1$ and the ray $y = x$ for $x \ge 1$.` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Solving with pieces",
      text: String.raw`To solve $f(x) = c$ for a piecewise function, solve within each piece and then discard any solution that is outside that piece's part of the domain. For the $f$ above, $f(x) = 0$ gives $x = 2$ from the first piece (rejected, since $2 \not< 1$) and $x = 0$ from the second (rejected, since $0 \not\ge 1$): there is no solution, which matches the graph staying above the $x$-axis.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Shifting a graph" },
    {
      kind: "p",
      text: String.raw`Adding a constant outside the function moves the graph up or down. The graph of $y = |x| - 3$ is the graph of $y = |x|$ [[vertical-shift|shifted downward]] by 3 units: every output is 3 less. Replacing $x$ by $x - 2$ inside the function moves the graph sideways: $y = (x - 2)^2$ is $y = x^2$ [[horizontal-shift|shifted to the right]] by 2 units. For any function $h$ and any positive number $c$ (MR p. 77):`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{aligned} y &= h(x) + c && \text{shifted upward by } c\\ y &= h(x) - c && \text{shifted downward by } c\\ y &= h(x + c) && \text{shifted to the left by } c\\ y &= h(x - c) && \text{shifted to the right by } c \end{aligned}`,
      key: true,
    },
    {
      kind: "diagram",
      diagram: { ...shiftAbs, caption: String.raw`Dashed: $y = |x|$. Solid: $y = |x| - 3$, the same V moved down 3 units.` },
    },
    {
      kind: "diagram",
      diagram: { ...shiftSq, caption: String.raw`Dashed: $y = x^2$. Solid: $y = (x - 2)^2$, moved 2 units to the right; its lowest point is now $(2, 0)$.` },
    },
    {
      kind: "p",
      text: String.raw`The horizontal rule feels backwards, so remember the reason. The new function $h(x - 2)$ takes at $x = 2$ the value the old function took at $0$; everything the old graph did at an input, the new graph does 2 units later, that is, further right. When in doubt, do what the Math Review suggests and plot a couple of corresponding values: $(x - 2)^2$ is 0 at $x = 2$, not at $x = -2$ (MR p. 77).`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Inside goes against the sign",
      text: String.raw`$(x + 3)^2$ is shifted **left** 3 and $(x - 3)^2$ is shifted **right** 3. Outside the function the sign means what it says: $+3$ is up, $-3$ is down. Mixing these up is the most common graphing error on the test.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Reflecting, stretching and shrinking" },
    {
      kind: "p",
      text: String.raw`Putting a minus sign in front of a function flips every output. For any function $h$, the graph of $y = -h(x)$ is the [[reflection]] of the graph of $y = h(x)$ about the $x$-axis (MR p. 75). That is why $y = -\sqrt{x}$ is the mirror image of $y = \sqrt{x}$.`,
    },
    {
      kind: "diagram",
      diagram: { ...reflect, caption: String.raw`$y = -\sqrt{x}$ (solid) is the reflection of $y = \sqrt{x}$ (dashed) about the $x$-axis: $(4, 2)$ becomes $(4, -2)$.` },
    },
    {
      kind: "p",
      text: String.raw`Multiplying a function by a positive constant $c$ multiplies every output by $c$, which changes the graph's height but not where it crosses the $x$-axis. For any function $h$ and any positive number $c$, the graph of $y = c\,h(x)$ is the graph of $y = h(x)$ [[vertical-stretch|stretched vertically]] by a factor of $c$ if $c > 1$, and [[vertical-shrink|shrunk vertically]] by a factor of $c$ if $0 < c < 1$ (MR p. 79). The Math Review also says "dilated" for a stretch and "contracted" for a shrink (MR p. 78).`,
    },
    {
      kind: "math",
      tex: String.raw`y = c\,h(x):\quad c > 1 \ \text{stretched vertically}, \qquad 0 < c < 1 \ \text{shrunk vertically}`,
      key: true,
    },
    {
      kind: "diagram",
      diagram: { ...stretch, caption: String.raw`Dashed: $y = x^2$. $y = 2x^2$ (accent) is stretched vertically by a factor of 2 and $y = \frac{1}{2}x^2$ (dark) is shrunk by a factor of $\frac{1}{2}$. At $x = 1$ the heights are $2$, $1$ and $\frac{1}{2}$.` },
    },
    {
      kind: "p",
      text: String.raw`A negative factor does both jobs: $y = -\frac{1}{3}|x|$ is $y = |x|$ shrunk vertically by a factor of $\frac{1}{3}$ and then reflected in the $x$-axis, an upside-down V that is flatter than $y = -|x|$. The Math Review only covers changes in the vertical direction (multiplying the output); you will not need to analyze a factor placed inside, such as $h(3x)$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Combining the moves" },
    {
      kind: "p",
      text: String.raw`Most GRE formulas combine several moves at once. Writing $f$ for one of the basic functions $x^2$, $|x|$ or $\sqrt{x}$, every formula you need has the form below, with $c > 0$:`,
    },
    { kind: "math", tex: String.raw`y = \pm\, c\, f(x - h) + k`, key: true },
    {
      kind: "p",
      text: String.raw`This general form is not stated in the ETS Math Review; it extends the order used in the MR's examples ("shifted ... and then stretched", "contracted ... and then reflected", MR p. 78). Read it from the inside out: shift horizontally by $h$ (right if $h > 0$, left if $h < 0$), stretch or shrink vertically by $c$, reflect in the $x$-axis if there is a minus sign, and finally shift vertically by $k$. The vertex of the parabola, the corner of the V, or the endpoint of the square root curve moves from $(0, 0)$ to $(h, k)$.`,
    },
    {
      kind: "p",
      text: String.raw`For example, $y = -2(x - 1)^2 + 3$ is $y = x^2$ shifted right 1, stretched vertically by a factor of 2, reflected in the $x$-axis and shifted up 3. Its vertex is $(1, 3)$, it opens downward, and it crosses the $y$-axis at $-2(0 - 1)^2 + 3 = 1$.`,
    },
    {
      kind: "diagram",
      diagram: { ...combined, caption: String.raw`Dashed: $y = x^2$. Solid: $y = -2(x - 1)^2 + 3$, with vertex $(1, 3)$ and $y$-intercept $1$.` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "The vertical shift comes last",
      text: String.raw`Order matters once a reflection or a stretch is involved. Shifting $y = x^2$ up 3 and _then_ reflecting gives $-(x^2 + 3) = -x^2 - 3$, not $-x^2 + 3$. In $y = \pm c\,f(x - h) + k$ the added $k$ is outside everything, so it is applied after the stretch and the reflection.`,
    },
    {
      kind: "interactive",
      key: "2-9-graphs-of-functions/transformation-explorer",
      title: "Transformation explorer",
      caption: String.raw`Pick a base function and move the sliders, or drag the key point to set $h$ and $k$. The dashed curve is the base graph and the formula and the list of moves update with every change.`,
    },
    {
      kind: "p",
      text: String.raw`Going the other way, from a graph to a formula, uses the same picture. Locate the key point to get $h$ and $k$, note whether the graph opens up or down (the sign), then use one more point to find $c$. For a V-shaped graph with its corner at $(3, -2)$ that passes through $(5, 4)$: $y = c|x - 3| - 2$ and $4 = 2c - 2$, so $c = 3$ and $y = 3|x - 3| - 2$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Every graph question rests on one fact: a point $(a, b)$ is on the graph of $f$ exactly when $f(a) = b$. Intercepts, intersections and "which point lies on the graph" questions are all applications of it. For the shape, recognize the base function, then read the shifts, reflection and vertical stretch or shrink from the formula, inside first and the vertical shift last.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Moving $h(x + c)$ to the right (it moves left). Applying the vertical shift before a reflection or stretch. Forgetting that $\sqrt{x - h}$ starts at $x = h$, so points to the left of it are not on the graph. Treating a stretch as a shift: $2|x|$ still has its corner at the origin. Solving $f(x) = g(x)$ and reporting only the $x$-values when the question asks for the points. And, for piecewise functions, keeping a solution that lies outside its own piece.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "graph-of-function",
      term: "graph of a function",
      turkish: "fonksiyonun grafiği",
      definition: String.raw`The set of all points $(x, f(x))$ in the $xy$-plane, with the input on the $x$-axis and the output on the $y$-axis; the same as the graph of the equation $y = f(x)$.`,
      diagram: graphPoint(),
      source: "MR p. 72",
    },
    {
      id: "vertical-line-test",
      term: "vertical line test",
      turkish: "düşey doğru testi",
      definition: String.raw`A curve in the $xy$-plane is the graph of a function of $x$ only if every vertical line meets it at most once, because each input has exactly one output.`,
      diagram: verticalLine,
      note: "Not named in the ETS Math Review",
    },
    {
      id: "linear-function",
      term: "linear function",
      turkish: "doğrusal fonksiyon",
      definition: String.raw`A function such as $f(x) = 2x - 3$ whose graph is a line, the graph of the linear equation $y = 2x - 3$.`,
      diagram: small([{ base: "lin", a: 2, k: -3 }]),
      source: "MR p. 72",
    },
    {
      id: "quadratic-function",
      term: "quadratic function",
      turkish: "ikinci dereceden fonksiyon",
      definition: String.raw`A function such as $g(x) = x^2$ given by a quadratic expression; its graph is a parabola.`,
      diagram: small([{ base: "sq" }]),
      source: "MR p. 73",
    },
    {
      id: "parabola",
      term: "parabola",
      turkish: "parabol",
      definition: String.raw`The graph of a quadratic equation such as $y = x^2$: a U-shaped curve, symmetric about a vertical line through its vertex.`,
      diagram: small([{ base: "sq", h: 1, k: -2 }]),
      source: "MR pp. 70–71, 73",
    },
    {
      id: "absolute-value-function",
      term: "absolute value function",
      turkish: "mutlak değer fonksiyonu",
      definition: String.raw`$h(x) = |x|$, equal to $x$ for $x \ge 0$ and $-x$ for $x < 0$. Its graph is V-shaped: the lines $y = x$ and $y = -x$ joined at the origin.`,
      formula: String.raw`|x| = \begin{cases} x, & x \ge 0 \\ -x, & x < 0 \end{cases}`,
      diagram: small([{ base: "abs" }]),
      source: "MR p. 74",
    },
    {
      id: "piecewise",
      term: "piecewise-defined function",
      turkish: "parçalı tanımlı fonksiyon / parçalı fonksiyon",
      definition: String.raw`A function defined by different expressions on different parts of its domain, such as $|x|$ written as $x$ for $x \ge 0$ and $-x$ for $x < 0$.`,
      diagram: piecewise,
      source: "MR p. 74",
    },
    {
      id: "square-root-function",
      term: "square root function (positive / negative)",
      turkish: "karekök fonksiyonu",
      definition: String.raw`$j(x) = \sqrt{x}$ and $k(x) = -\sqrt{x}$, each for $x \ge 0$. Their graphs are the upper and lower halves of a parabola lying on its side.`,
      diagram: small([{ base: "sqrt" }, { base: "sqrt", a: -1, style: "line" }]),
      source: "MR p. 75",
    },
    {
      id: "intersection",
      term: "point of intersection (of two graphs)",
      turkish: "kesişim noktası",
      definition: String.raw`A point that lies on both graphs. The graphs of $f$ and $g$ intersect at the points whose $x$-coordinates solve $f(x) = g(x)$.`,
      diagram: intersection,
      source: "MR pp. 73–74",
    },
    {
      id: "reflection",
      term: "reflection about the x-axis",
      turkish: "x eksenine göre yansıma (simetri)",
      definition: String.raw`For any function $h$, the graph of $y = -h(x)$ is the reflection of the graph of $y = h(x)$ about the $x$-axis: each point $(x, y)$ goes to $(x, -y)$.`,
      diagram: reflect,
      source: "MR p. 75",
    },
    {
      id: "vertical-shift",
      term: "shifted upward / downward",
      turkish: "düşey öteleme (yukarı / aşağı öteleme)",
      definition: String.raw`For $c > 0$, the graph of $h(x) + c$ is the graph of $h(x)$ shifted upward by $c$ units, and the graph of $h(x) - c$ is shifted downward by $c$ units.`,
      diagram: shiftAbs,
      source: "MR p. 77",
    },
    {
      id: "horizontal-shift",
      term: "shifted to the left / to the right",
      turkish: "yatay öteleme (sola / sağa öteleme)",
      definition: String.raw`For $c > 0$, the graph of $h(x + c)$ is the graph of $h(x)$ shifted to the left by $c$ units, and the graph of $h(x - c)$ is shifted to the right by $c$ units.`,
      diagram: shiftSq,
      source: "MR p. 77",
    },
    {
      id: "vertical-stretch",
      term: "stretched vertically (dilated)",
      turkish: "düşey doğrultuda genişleme / uzama",
      definition: String.raw`For $c > 1$, the graph of $c\,h(x)$ is the graph of $h(x)$ stretched vertically, away from the $x$-axis, by a factor of $c$.`,
      diagram: stretchOnly,
      source: "MR pp. 78–79",
    },
    {
      id: "vertical-shrink",
      term: "shrunk vertically (contracted)",
      turkish: "düşey doğrultuda daralma / büzülme",
      definition: String.raw`For $0 < c < 1$, the graph of $c\,h(x)$ is the graph of $h(x)$ shrunk vertically, toward the $x$-axis, by a factor of $c$.`,
      diagram: shrinkOnly,
      source: "MR pp. 78–79",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      diagram: vFigure,
      stem: String.raw`The figure above shows the graph of the function $f$ in the $xy$-plane. Which of the following could define $f$?`,
      choices: [
        String.raw`$f(x) = \frac{1}{2}|x + 2| + 1$`,
        String.raw`$f(x) = |x + 2| + 1$`,
        String.raw`$f(x) = 2|x + 2| - 1$`,
        String.raw`$f(x) = 2|x + 2| + 1$`,
        String.raw`$f(x) = 2|x - 2| + 1$`,
      ],
      answer: 3,
      explanation: [
        String.raw`The graph is a V that opens upward, so $f(x) = c|x - h| + k$ with $c > 0$, and the corner $(h, k)$ is $(-2, 1)$. That gives $f(x) = c|x + 2| + 1$, which rules out the choices with $-1$ and with $x - 2$.`,
        String.raw`Use one more point to find $c$: $(0, 5)$ is on the graph, so $5 = c|0 + 2| + 1 = 2c + 1$ and $c = 2$.`,
        String.raw`So $f(x) = 2|x + 2| + 1$. Traps: $2|x - 2| + 1$ puts the corner at $x = 2$ (shift direction reversed); $|x + 2| + 1$ has the right corner but passes through $(0, 3)$, not $(0, 5)$.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`$c$ is a positive constant, $f(x) = c|x|$, and $g(x) = |x| + c$.`,
      quantityA: String.raw`The number of points at which the graphs of $f$ and $g$ intersect in the $xy$-plane`,
      quantityB: String.raw`$1$`,
      answer: "D",
      explanation: [
        String.raw`The graphs intersect where $c|x| = |x| + c$, that is, where $(c - 1)|x| = c$.`,
        String.raw`If $c > 1$: $|x| = \frac{c}{c - 1} > 0$, which has two solutions, so there are 2 intersection points. For example, $c = 2$ gives $|x| = 2$ and the points $(-2, 4)$ and $(2, 4)$.`,
        String.raw`If $c = 1$: the equation becomes $0 = 1$, so there are no intersection points ($g$ is $f$ shifted up 1). If $0 < c < 1$: $|x| = \frac{c}{c - 1} < 0$, impossible, so again 0 points.`,
        String.raw`Quantity A can be 2 or 0, so it can be greater or less than 1: (D). Picture it: $f$ is a V through the origin stretched or shrunk by $c$; $g$ is the plain V raised by $c$. Only a steeper V can catch the raised one.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`In the $xy$-plane, the graphs of $f(x) = x^2 - 3x$ and $g(x) = x + 5$ intersect at two points. What is the sum of the $y$-coordinates of these two points?`,
      answer: { kind: "decimal", value: "14" },
      explanation: [
        String.raw`The graphs meet where $f(x) = g(x)$: $x^2 - 3x = x + 5$, so $x^2 - 4x - 5 = 0$, or $(x - 5)(x + 1) = 0$.`,
        String.raw`$x = 5$ or $x = -1$. Use the simpler function for the $y$-values: $g(5) = 10$ and $g(-1) = 4$. (Check with $f$: $25 - 15 = 10$ and $1 + 3 = 4$.)`,
        String.raw`The points are $(5, 10)$ and $(-1, 4)$, and the sum of the $y$-coordinates is $14$. Trap: $4$ is the sum of the $x$-coordinates.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`Which of the following points lie on the graph of $y = -2\sqrt{x - 1} + 3$ in the $xy$-plane? Indicate all such points.`,
      choices: [
        String.raw`$(0, 1)$`,
        String.raw`$(1, 3)$`,
        String.raw`$(2, 5)$`,
        String.raw`$(5, -1)$`,
        String.raw`$(10, -3)$`,
        String.raw`$(17, -6)$`,
      ],
      answer: [1, 3, 4],
      explanation: [
        String.raw`The graph is $y = \sqrt{x}$ shifted right 1, stretched vertically by 2, reflected in the $x$-axis and shifted up 3. It starts at $(1, 3)$, exists only for $x \ge 1$, and goes down from there.`,
        String.raw`$(0, 1)$: $x - 1 = -1 < 0$, so $x = 0$ is not in the domain. No.`,
        String.raw`$(1, 3)$: $-2\sqrt{0} + 3 = 3$. Yes. $(2, 5)$: $-2\sqrt{1} + 3 = 1 \ne 5$. No ($5$ would need $+2\sqrt{1}$: the reflection was ignored).`,
        String.raw`$(5, -1)$: $-2\sqrt{4} + 3 = -1$. Yes. $(10, -3)$: $-2\sqrt{9} + 3 = -3$. Yes. $(17, -6)$: $-2\sqrt{16} + 3 = -5 \ne -6$. No.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`The point $(3, -2)$ is on the graph of $f$. What is $f(3)$?`,
      answer: String.raw`$-2$`,
      explanation: String.raw`A point $(a, b)$ is on the graph of $f$ exactly when $f(a) = b$.`,
    },
    {
      id: "q2",
      prompt: String.raw`How is the graph of $y = (x + 4)^2$ related to the graph of $y = x^2$?`,
      answer: String.raw`Shifted to the left by 4 units`,
      explanation: String.raw`$h(x + c)$ with $c = 4 > 0$ shifts left. Check: $(x + 4)^2 = 0$ at $x = -4$.`,
    },
    {
      id: "q3",
      prompt: String.raw`What is the vertex of the parabola $y = (x - 1)^2 - 5$?`,
      answer: String.raw`$(1, -5)$`,
      explanation: String.raw`$y = x^2$ shifted right 1 and down 5 moves the vertex from $(0, 0)$ to $(1, -5)$.`,
    },
    {
      id: "q4",
      prompt: String.raw`Describe the graph of $y = -|x|$.`,
      answer: String.raw`An upside-down V with its corner at the origin`,
      explanation: String.raw`It is the reflection of $y = |x|$ about the $x$-axis: the lines $y = -x$ for $x \ge 0$ and $y = x$ for $x < 0$.`,
    },
    {
      id: "q5",
      prompt: String.raw`Where do the graphs of $y = x^2$ and $y = 9$ intersect?`,
      answer: String.raw`$(-3, 9)$ and $(3, 9)$`,
      explanation: String.raw`$x^2 = 9$ gives $x = \pm 3$; both points have $y = 9$.`,
    },
    {
      id: "q6",
      prompt: String.raw`How is $y = 3\sqrt{x}$ related to $y = \sqrt{x}$, and which point of it has $x = 4$?`,
      answer: String.raw`Stretched vertically by a factor of 3; $(4, 6)$`,
      explanation: String.raw`Multiplying the output by $c = 3 > 1$ stretches the graph vertically; $3\sqrt{4} = 6$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`The graph of the function $g$ is the graph of $y = |x|$ shifted to the left by 2 units and downward by 3 units.`,
        quantityA: String.raw`$g(-5)$`,
        quantityB: String.raw`$g(1)$`,
        answer: "C",
        explanation: [
          String.raw`Left 2 means $x$ is replaced by $x + 2$; down 3 means subtract 3. So $g(x) = |x + 2| - 3$.`,
          String.raw`$g(-5) = |-3| - 3 = 0$ and $g(1) = |3| - 3 = 0$. The quantities are equal.`,
          String.raw`Shortcut: the corner is at $x = -2$, and $-5$ and $1$ are both 3 units from $-2$, so by the symmetry of the V they have the same output. Trap: shifting right instead gives $|x - 2| - 3$, with values 4 and $-2$.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        diagram: zParabola,
        given: String.raw`The figure above shows the graph of $f(x) = a(x - 2)^2 + k$, where $a$ and $k$ are constants.`,
        quantityA: String.raw`$f(6)$`,
        quantityB: String.raw`$-3.5$`,
        answer: "B",
        explanation: [
          String.raw`The vertex is $(2, 4)$, so $k = 4$.`,
          String.raw`The graph passes through $(0, 2)$: $2 = a(0 - 2)^2 + 4 = 4a + 4$, so $a = -\frac{1}{2}$.`,
          String.raw`$f(6) = -\frac{1}{2}(6 - 2)^2 + 4 = -8 + 4 = -4$, which is less than $-3.5$. Quantity B is greater.`,
          String.raw`The point $x = 6$ is off the figure, so it cannot be read from the grid; use the formula. (By symmetry about $x = 2$, $f(6) = f(-2)$.)`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`In the $xy$-plane, $R$ is the region enclosed by the graph of $y = -2|x - 3| + 8$ and the $x$-axis.`,
        quantityA: String.raw`The area of $R$`,
        quantityB: String.raw`$30$`,
        answer: "A",
        explanation: [
          String.raw`The graph is $y = |x|$ shifted right 3, stretched vertically by 2, reflected in the $x$-axis and shifted up 8: an upside-down V with its corner at $(3, 8)$.`,
          String.raw`$x$-intercepts: $-2|x - 3| + 8 = 0$ gives $|x - 3| = 4$, so $x = -1$ or $x = 7$.`,
          String.raw`$R$ is a triangle with base from $-1$ to $7$ (length 8) and height 8, so its area is $\frac{1}{2}(8)(8) = 32 > 30$. Quantity A is greater.`,
          String.raw`Trap: forgetting the factor 2 gives intercepts $-5$ and $11$ and area $\frac{1}{2}(16)(8) = 64$, which also beats 30, but for the wrong reason; ignoring the reflection gives a V that opens upward and encloses no region with the $x$-axis.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        diagram: zRoot,
        stem: String.raw`The figure above shows the graph of a function in the $xy$-plane. Which of the following is an equation of the graph?`,
        choices: [
          String.raw`$y = \sqrt{x - 1} + 2$`,
          String.raw`$y = -\sqrt{x + 1} + 2$`,
          String.raw`$y = -\sqrt{x - 1} + 2$`,
          String.raw`$y = \sqrt{x + 1} - 2$`,
          String.raw`$y = -\sqrt{x + 1} - 2$`,
        ],
        answer: 1,
        explanation: [
          String.raw`The curve is half of a sideways parabola that starts at $(-1, 2)$ and goes down to the right: it is $y = -\sqrt{x}$ (decreasing) moved so its endpoint is $(-1, 2)$.`,
          String.raw`Endpoint $(-1, 2)$ means shift left 1 and up 2: $y = -\sqrt{x + 1} + 2$.`,
          String.raw`Check $(3, 0)$: $-\sqrt{4} + 2 = 0$. Check $(8, -1)$: $-\sqrt{9} + 2 = -1$. The choices with $x - 1$ start at $x = 1$, and those ending in $-2$ start at height $-2$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`The graph of $y = 3 - \frac{1}{2}(x + 4)^2$ can be obtained from the graph of $y = x^2$ by which of the following sequences of moves?`,
        choices: [
          String.raw`Shift to the right by 4, shrink vertically by a factor of $\frac{1}{2}$, reflect in the $x$-axis, shift upward by 3`,
          String.raw`Shift to the left by 4, shrink vertically by a factor of $\frac{1}{2}$, reflect in the $x$-axis, shift upward by 3`,
          String.raw`Shift to the left by 4, stretch vertically by a factor of 2, reflect in the $x$-axis, shift upward by 3`,
          String.raw`Shift to the left by 4, shrink vertically by a factor of $\frac{1}{2}$, shift upward by 3, reflect in the $x$-axis`,
          String.raw`Shift to the left by 4, shrink vertically by a factor of $\frac{1}{2}$, shift upward by 3`,
        ],
        answer: 1,
        explanation: [
          String.raw`Rewrite as $y = -\frac{1}{2}(x + 4)^2 + 3$, the form $-c\,f(x - h) + k$ with $c = \frac{1}{2}$, $h = -4$, $k = 3$.`,
          String.raw`Inside first: $(x + 4)^2$ is a shift to the left by 4. Then $\frac{1}{2}(x + 4)^2$ shrinks it vertically by $\frac{1}{2}$, $-\frac{1}{2}(x + 4)^2$ reflects it, and $+3$ shifts it up last.`,
          String.raw`The fourth choice reflects after shifting up, producing $-\left(\frac{1}{2}(x + 4)^2 + 3\right) = -\frac{1}{2}(x + 4)^2 - 3$, a different graph. The third choice would give $-2(x + 4)^2 + 3$, and the last one omits the reflection.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`For which value of $b$ do the graphs of $y = x^2$ and $y = 2x + b$ intersect at exactly one point in the $xy$-plane?`,
        choices: [String.raw`$-2$`, String.raw`$-1$`, String.raw`$0$`, String.raw`$1$`, String.raw`$2$`],
        answer: 1,
        explanation: [
          String.raw`Intersection points correspond to solutions of $x^2 = 2x + b$, that is, $x^2 - 2x - b = 0$.`,
          String.raw`Exactly one solution means the discriminant is 0: $(-2)^2 - 4(1)(-b) = 4 + 4b = 0$, so $b = -1$.`,
          String.raw`Check: $x^2 - 2x + 1 = (x - 1)^2 = 0$ only at $x = 1$; the line touches the parabola at $(1, 1)$. For $b = -2$ there is no intersection; for $b \ge 0$ there are two.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`The function $f$ is defined by $f(x) = |x + 1| - 2$. Which of the following statements about the graph of $f$ in the $xy$-plane are true? Indicate all such statements.`,
        choices: [
          String.raw`Its $x$-intercepts are $-3$ and $1$.`,
          String.raw`Its $y$-intercept is $-1$.`,
          String.raw`The least value of $f(x)$ is $-1$.`,
          String.raw`$f(x) = f(-2 - x)$ for all $x$.`,
          String.raw`It passes through the point $(-4, 3)$.`,
          String.raw`It is the graph of $y = |x|$ shifted to the right by 1 unit and downward by 2 units.`,
        ],
        answer: [0, 1, 3],
        explanation: [
          String.raw`The graph is $y = |x|$ shifted **left** 1 and down 2, a V with its corner at $(-1, -2)$. So the last statement is false.`,
          String.raw`$x$-intercepts: $|x + 1| = 2$ gives $x = 1$ or $x = -3$. True. $y$-intercept: $f(0) = 1 - 2 = -1$. True.`,
          String.raw`The least value is at the corner: $-2$, not $-1$. False.`,
          String.raw`$f(-2 - x) = |-2 - x + 1| - 2 = |-(x + 1)| - 2 = |x + 1| - 2 = f(x)$. True: the graph is symmetric about the line $x = -1$.`,
          String.raw`$f(-4) = |-3| - 2 = 1$, not 3. False.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`The graph of the function $f$ in the $xy$-plane passes through the point $(2, 6)$. Which of the following statements must be true? Indicate all such statements.`,
        choices: [
          String.raw`The graph of $y = f(x - 3)$ passes through $(5, 6)$.`,
          String.raw`The graph of $y = f(x - 3)$ passes through $(-1, 6)$.`,
          String.raw`The graph of $y = \frac{1}{2}f(x)$ passes through $(2, 3)$.`,
          String.raw`The graph of $y = -f(x)$ passes through $(2, -6)$.`,
          String.raw`The graph of $y = f(x)$ passes through $(-2, 6)$.`,
          String.raw`The graph of $y = f(x) + 2$ passes through $(0, 8)$.`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`We know only that $f(2) = 6$. A point is on a graph when substituting it makes the equation true.`,
          String.raw`First: at $x = 5$, $f(5 - 3) = f(2) = 6$. True. Second: at $x = -1$, $f(-4)$, which is unknown. Not necessarily (this is the "shift left" trap: $f(x - 3)$ moves the graph right).`,
          String.raw`Third: $\frac{1}{2}f(2) = 3$. True. Fourth: $-f(2) = -6$. True (reflection in the $x$-axis).`,
          String.raw`Fifth: $f(-2)$ is unknown; a function need not be symmetric. Not necessarily. Sixth: at $x = 0$ we would need $f(0) + 2 = 8$, but $f(0)$ is unknown; the known point of $y = f(x) + 2$ is $(2, 8)$. Not necessarily.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`The function $f$ is defined by $f(x) = x^2 - 1$ for $x < 2$ and $f(x) = 7 - 2x$ for $x \ge 2$. For how many real numbers $x$ is $f(x) = 1$?`,
        answer: { kind: "decimal", value: "3" },
        explanation: [
          String.raw`First piece ($x < 2$): $x^2 - 1 = 1$ gives $x = \sqrt{2}$ or $x = -\sqrt{2}$. Both are less than 2 ($\sqrt{2} \approx 1.41$), so both count.`,
          String.raw`Second piece ($x \ge 2$): $7 - 2x = 1$ gives $x = 3$, which is $\ge 2$, so it counts.`,
          String.raw`There are 3 solutions. Trap: forgetting to check each solution against its own piece; here all three survive, but $\sqrt{2}$ and $3$ must each be checked.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, the graph of $y = c(x - 2)^2 - 8$, where $c$ is a constant, passes through the point $(0, 10)$. What is the greater of the two $x$-intercepts of the graph? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 10, denominator: 3 },
        explanation: [
          String.raw`Substitute $(0, 10)$: $10 = c(0 - 2)^2 - 8 = 4c - 8$, so $c = \frac{9}{2}$.`,
          String.raw`$x$-intercepts: $\frac{9}{2}(x - 2)^2 - 8 = 0$, so $(x - 2)^2 = \frac{16}{9}$ and $x - 2 = \pm\frac{4}{3}$.`,
          String.raw`$x = \frac{10}{3}$ or $x = \frac{2}{3}$; the greater is $\frac{10}{3}$. (The vertex is $(2, -8)$ and the intercepts are symmetric about $x = 2$.)`,
        ],
      },
    ],
  },
};

export default section;
