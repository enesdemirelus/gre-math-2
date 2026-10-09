import { createElement as h, useState, type ComponentType } from "react";
import type { Section } from "../../content/types";

// Tiny demo diagram: a circle with a labeled chord.
function DemoCircle({ highlight = "chord" }: { highlight?: string }) {
  return h(
    "svg",
    { viewBox: "0 0 200 200", role: "img", "aria-label": "circle with chord" },
    h("circle", { cx: 100, cy: 100, r: 70, className: "dg-fill" }),
    h("circle", { cx: 100, cy: 100, r: 70, className: "dg-line" }),
    h("line", { x1: 45, y1: 60, x2: 160, y2: 120, className: highlight === "chord" ? "dg-accent" : "dg-line" }),
    h("circle", { cx: 45, cy: 60, r: 3, className: "dg-point" }),
    h("circle", { cx: 160, cy: 120, r: 3, className: "dg-point" }),
    h("text", { x: 28, y: 58, className: "dg-label" }, "A"),
    h("text", { x: 166, y: 130, className: "dg-label" }, "B"),
    h("circle", { cx: 100, cy: 100, r: 3, className: "dg-point" }),
    h("text", { x: 104, y: 118, className: "dg-label" }, "O"),
  );
}

function DemoSlider() {
  const [r, setR] = useState(3);
  return h(
    "div",
    null,
    h("label", null, "Radius r = ", r, " ", h("input", { type: "range", min: 1, max: 10, value: r, onChange: (e: { target: { value: string } }) => setR(Number(e.target.value)) })),
    h("p", null, "Circumference = 2πr ≈ ", (2 * Math.PI * r).toFixed(2)),
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const demoDiagrams: Record<string, ComponentType<any>> = { "demo/circle": DemoCircle };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const demoInteractives: Record<string, ComponentType<any>> = { "demo/slider": DemoSlider };

export const demoSection: Section = {
  id: "demo",
  number: "0.0",
  title: "Demo Section",
  part: "geometry",
  mrPages: "100–101",
  summary: String.raw`Fixture used to test components. Try hovering [[chord]], or $x^2 + y^2 = r^2$.`,
  lesson: [
    { kind: "heading", text: "A first subsection" },
    { kind: "p", text: String.raw`A [[chord]] joins two points on a circle; the longest one is a [[diameter|diameters]] through center $O$. Cost is \$5 and **bold** and _italic_ and snake_case_name stay plain. Inline $\frac{a}{b}$ fine.` },
    { kind: "math", tex: String.raw`C = 2\pi r`, key: true },
    { kind: "math", tex: String.raw`A = \pi r^2` },
    { kind: "diagram", diagram: { key: "demo/circle", caption: "Note: Figure not drawn to scale." } },
    { kind: "aside", tone: "tip", text: String.raw`Memorize $\pi \approx 3.14$.` },
    { kind: "aside", tone: "watch", text: "A chord is not a radius." },
    { kind: "aside", tone: "gre", text: "ETS often gives the diameter instead of the radius." },
    { kind: "list", items: ["First item", String.raw`Second with $\sqrt{2}$`] },
    { kind: "interactive", key: "demo/slider", title: "Circumference calculator", caption: "Drag the slider." },
  ],
  terms: [
    { id: "chord", term: "chord", turkish: "kiriş", definition: String.raw`A line segment whose endpoints lie on a circle, such as $AB$.`, diagram: { key: "demo/circle" }, source: "MR p. 100" },
    { id: "diameter", term: "diameter", turkish: "çap", definition: "A chord through the center of the circle.", formula: String.raw`d = 2r`, diagram: { key: "demo/circle", props: { highlight: "none" } } },
    { id: "radius", term: "radius", turkish: "yarıçap", definition: "A segment from the center to a point on the circle.", note: "Not named in the ETS Math Review" },
    { id: "arc", term: "arc", turkish: "yay", definition: "A connected part of a circle." },
    { id: "sector", term: "sector", turkish: "daire dilimi", definition: "A region bounded by two radii and an arc." },
    { id: "tangent", term: "tangent", turkish: "teğet", definition: "A line that touches a circle at exactly one point." },
    { id: "pi", term: "pi", turkish: "pi sayısı", definition: String.raw`The ratio $C/d$, about $3.14$.` },
  ],
  examples: [
    { id: "e1", type: "qc", difficulty: "easy", given: String.raw`$x > 0$`, quantityA: "$x$", quantityB: "$2x$", answer: "B", explanation: ["Since $x>0$, $2x > x$.", "So Quantity B is greater."] },
    { id: "e2", type: "mc1", difficulty: "medium", stem: "What is $3+4$?", choices: ["5", "6", "7", "8", "9"], answer: 2, explanation: ["Add: $3+4=7$."] },
  ],
  quick: [
    { id: "k1", prompt: "Diameter of a circle with radius 4?", answer: "8", explanation: "$d=2r$." },
    { id: "k2", prompt: "What is $\\sqrt{81}$?", answer: "9" },
  ],
  quiz: {
    sets: [
      {
        id: "s1",
        title: "Questions 6 and 7 refer to the table.",
        table: { caption: "Sales (in thousands)", header: ["Year", "Sales"], rows: [["2020", "$12$"], ["2021", "$15$"]] },
      },
    ],
    questions: [
      { id: "q1", type: "qc", difficulty: "medium", given: String.raw`$a$ is an integer and $a^2 = 9$.`, quantityA: "$a$", quantityB: "$0$", answer: "D", explanation: ["$a$ is $3$ or $-3$.", "Cannot be determined."] },
      { id: "q2", type: "mc1", difficulty: "medium", stem: String.raw`A circle has radius $5$. What is its circumference?`, choices: [String.raw`$5\pi$`, String.raw`$10\pi$`, String.raw`$25\pi$`, String.raw`$50\pi$`, String.raw`$100\pi$`], answer: 1, diagram: { key: "demo/circle", caption: "Note: Figure not drawn to scale." }, explanation: [String.raw`$C = 2\pi r = 10\pi$.`] },
      { id: "q3", type: "mcm", difficulty: "hard", stem: "Which of the following are even? Indicate all such numbers.", choices: ["2", "3", "4", "5"], answer: [0, 2], explanation: ["2 and 4 are divisible by 2."] },
      { id: "q4", type: "ne", difficulty: "medium", stem: "What is $1.5 \\times 4$?", answer: { kind: "decimal", value: "6" }, explanation: ["$1.5 \\times 4 = 6$."] },
      { id: "q5", type: "ne", difficulty: "hard", stem: String.raw`What is $\frac{1}{3}+\frac{1}{6}$?`, answer: { kind: "fraction", numerator: 1, denominator: 2 }, explanation: ["Common denominator 6: $2/6+1/6=3/6=1/2$."] },
      { id: "q6", type: "mc1", difficulty: "easy", setId: "s1", stem: "What was the sales increase from 2020 to 2021, in thousands?", choices: ["2", "3", "4", "5", "6"], answer: 1, explanation: ["$15-12=3$."] },
      { id: "q7", type: "ne", difficulty: "medium", setId: "s1", stem: "Sales in 2021 were what percent of sales in 2020?", answer: { kind: "decimal", value: "125" }, suffix: "%", explanation: ["$15/12 = 1.25 = 125\\%$."] },
    ],
  },
};
