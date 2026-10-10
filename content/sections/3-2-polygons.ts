import type { Section } from "../types";

const NTS = String.raw`Note: Figure not drawn to scale.`;
const D = "3-2-polygons";
const HEX = [[60, 150], [130, 200], [250, 186], [304, 106], [222, 34], [100, 50]];

const section: Section = {
  id: "3-2-polygons",
  number: "3.2",
  title: "Polygons",
  part: "geometry",
  mrPages: "95–96",
  summary: String.raw`What the GRE means by a polygon, how polygons are named, and the one formula that matters: the interior angles of an $n$-sided polygon add up to $(n-2)(180^\circ)$. Short section, but it feeds every quadrilateral, triangle and regular-polygon question that follows.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "What counts as a polygon" },
    {
      kind: "p",
      text: String.raw`A [[polygon]] is a closed figure made of three or more line segments that all lie in one plane. The segments are its [[sides]]; each side meets two other sides at its endpoints, and those endpoints are the [[vertices|vertices]] of the polygon (MR p. 95). A figure with a curved edge, or one that is not closed, is not a polygon.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/family`, caption: String.raw`The three simplest polygons: three, four and five sides.` },
    },
    {
      kind: "p",
      text: String.raw`There is one more restriction, and it is easy to skim over. In the Math Review, "polygon" always means a [[convex-polygon|convex polygon]]: a polygon in which **every interior angle measures less than $180^\circ$** (MR p. 95). An [[interior-angle|interior angle]] is an angle at a vertex measured on the inside of the figure. A dented, arrowhead-shaped figure has an inside angle larger than $180^\circ$ at its dent, so under this convention it is not treated as a polygon, and the angle formula below is not meant for it.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/non-convex`, caption: String.raw`Not a convex polygon: the interior angle at $D$ (marked $x^\circ$) is more than $180^\circ$.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Naming polygons" },
    {
      kind: "p",
      text: String.raw`Polygons are named by their number of sides. The simplest is the [[triangle]] (3 sides), then the [[quadrilateral]] (4), the [[pentagon]] (5), the [[hexagon]] (6) and the [[octagon]] (8) (MR pp. 95–96). A 10-sided polygon is a [[decagon]]; the Math Review uses that word only in one exercise, so treat it as a bonus. To name a particular polygon, list its vertex letters in order as you walk around it: "pentagon $ABCDE$" has sides $AB$, $BC$, $CD$, $DE$ and $EA$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/polygon`, props: { n: 5, highlight: "sides" }, caption: String.raw`Pentagon $ABCDE$: five sides (highlighted) and five vertices.` },
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Names on the test",
      text: String.raw`The GRE expects you to know the names up to the octagon at least, because a question can simply say "a regular hexagon" and give no figure. Memorise 3 triangle, 4 quadrilateral, 5 pentagon, 6 hexagon, 8 octagon.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The angle sum: cut it into triangles" },
    {
      kind: "p",
      text: String.raw`Here is the idea behind the one formula in this section. A [[diagonal]] is a segment joining two vertices that are not neighbours. Draw one diagonal in a quadrilateral and it falls apart into 2 triangles. Pick one vertex of a pentagon and draw the 2 segments from it to the two non-adjacent vertices, and you get 3 triangles (MR pp. 95–96).`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/fan`, props: { n: 5 }, caption: String.raw`Two diagonals from $A$ cut pentagon $ABCDE$ into 3 triangles.` },
    },
    {
      kind: "p",
      text: String.raw`The pattern continues: a polygon with $n$ sides can be divided into $n - 2$ triangles. The interior angles of the polygon are made up exactly of the angles of those triangles, and each triangle contributes $180^\circ$ (MR p. 96):`,
    },
    {
      kind: "math",
      tex: String.raw`\text{sum of the measures of the interior angles} = (n-2)(180^\circ)`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`A convex pentagon: $(5-2)(180^\circ) = 540^\circ$. A convex 7-sided polygon: $5 \cdot 180^\circ = 900^\circ$. A 9-sided polygon: $7 \cdot 180^\circ = 1{,}260^\circ$. Notice that the formula depends only on the number of sides. A thin sliver and a nearly regular shape with the same number of sides have the same angle sum. Slide the number of sides in the explorer below and check the triangle count and the sum; then shuffle the shape and watch the individual angles change while their total stays fixed.`,
    },
    {
      kind: "interactive",
      key: `${D}/polygon-explorer`,
      title: "Polygon explorer",
      caption: String.raw`Choose $n$ from 3 to 12. The fan of triangles from vertex $A$ shows why there are $n-2$ of them. In "Regular" mode every interior angle is the sum divided by $n$; in "Irregular" mode the drawn angles differ but still add up to the same total.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Exterior check, not required",
      text: String.raw`If a sum looks wrong, test it against a triangle ($n=3$ gives $180^\circ$) and a quadrilateral ($n=4$ gives $360^\circ$). Those two are the anchors; every other value is $180^\circ$ more for each extra side.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Regular polygons" },
    {
      kind: "p",
      text: String.raw`A polygon whose sides are all congruent and whose interior angles are all congruent is a [[regular-polygon|regular polygon]] (MR p. 96). Because the angles are all equal, each one is simply the sum divided by the number of angles:`,
    },
    {
      kind: "math",
      tex: String.raw`\text{each interior angle of a regular } n\text{-gon} = \frac{(n-2)(180^\circ)}{n}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`The Math Review shows this only through a single octagon example; the general formula is that same division written with $n$. For a regular 12-sided polygon: $\dfrac{10 \cdot 180^\circ}{12} = 150^\circ$. For a regular pentagon: $\dfrac{540^\circ}{5} = 108^\circ$. The GRE often runs the formula backwards: told that each angle is $160^\circ$, set $\dfrac{(n-2)(180)}{n} = 160$, so $180n - 360 = 160n$ and $n = 18$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/regular`, props: { n: 6, label: "120°" }, caption: String.raw`A regular hexagon: all six sides congruent, all six interior angles $120^\circ$ (since $720^\circ / 6 = 120^\circ$).` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Only regular means equal",
      text: String.raw`"Each angle is the sum divided by $n$" holds only if the problem says the polygon is regular, or says its angles are congruent. A hexagon drawn to look symmetric is not necessarily regular: figures are not to scale unless stated, so never assume equal sides or angles from the picture.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Perimeter and area" },
    {
      kind: "p",
      text: String.raw`The [[perimeter]] of a polygon is the sum of the lengths of its sides (MR p. 96). Its [[area]] is the area of the region the polygon encloses, not the length of its boundary. For a regular polygon with $n$ sides, each of length $s$, the perimeter is $ns$. Area formulas are in the triangle and quadrilateral sections.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/perimeter`, caption: String.raw`Perimeter: add the five side lengths, $9 + 5 + 6 + 7 + 8 = 35$. Note: Figure not drawn to scale.` },
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/area`, caption: String.raw`Area: the shaded region enclosed by the polygon.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Three moves cover almost every question here. Count the sides to get the angle sum $(n-2)(180^\circ)$. If the polygon is regular, divide by $n$ to get one angle; if it is not, write the unknown angles in terms of one variable and set their total equal to the sum. And when a diagonal is given or useful, remember it breaks the figure into triangles, each with angle sum $180^\circ$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Using $n \cdot 180^\circ$ or $(n-1)(180^\circ)$ instead of $(n-2)(180^\circ)$. Dividing by $n$ when the polygon is not regular. Forgetting that a "polygon" here has every interior angle below $180^\circ$, which caps how large one angle can be when the others are small. Mixing up perimeter (sum of the sides) and area (the enclosed region). Counting triangles from a single vertex as $n-1$ instead of $n-2$.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "polygon",
      term: "polygon",
      turkish: "çokgen",
      definition: String.raw`A closed figure formed by three or more line segments, all in the same plane. In the Math Review, "polygon" means "convex polygon".`,
      diagram: { key: `${D}/polygon`, props: { n: 5, highlight: "none" } },
      source: "MR p. 95",
    },
    {
      id: "sides",
      term: "side",
      turkish: "kenar",
      definition: String.raw`One of the line segments that form a polygon. Each side is joined to two other sides at its endpoints.`,
      diagram: { key: `${D}/polygon`, props: { n: 5, highlight: "sides" } },
      source: "MR p. 95",
    },
    {
      id: "vertices",
      term: "vertex (plural: vertices)",
      turkish: "köşe",
      definition: String.raw`An endpoint of a side of a polygon, where two sides meet. A polygon with $n$ sides has $n$ vertices.`,
      diagram: { key: `${D}/polygon`, props: { n: 5, highlight: "vertices" } },
      source: "MR p. 95",
    },
    {
      id: "convex-polygon",
      term: "convex polygon",
      turkish: "dışbükey (konveks) çokgen",
      definition: String.raw`A polygon in which the measure of each interior angle is less than $180^\circ$. The Math Review uses "polygon" to mean convex polygon.`,
      diagram: { key: `${D}/polygon`, props: { n: 5, highlight: "angles" } },
      source: "MR p. 95",
    },
    {
      id: "interior-angle",
      term: "interior angle",
      turkish: "iç açı",
      definition: String.raw`The angle at a vertex of a polygon, measured on the inside of the polygon (for example the angle at $A$ in pentagon $ABCDE$).`,
      diagram: { key: `${D}/polygon`, props: { n: 5, highlight: "angle", at: 0 } },
      source: "MR pp. 95–96",
    },
    {
      id: "triangle",
      term: "triangle",
      turkish: "üçgen",
      definition: String.raw`The simplest polygon: it has 3 sides and 3 vertices. Its interior angles add up to $180^\circ$.`,
      diagram: { key: `${D}/polygon`, props: { n: 3, highlight: "none" } },
      source: "MR p. 95",
    },
    {
      id: "quadrilateral",
      term: "quadrilateral",
      turkish: "dörtgen",
      definition: String.raw`A polygon with 4 sides. It can be divided into 2 triangles by drawing a diagonal, so its interior angles add up to $360^\circ$.`,
      diagram: { key: `${D}/polygon`, props: { n: 4, highlight: "none" } },
      source: "MR p. 95",
    },
    {
      id: "pentagon",
      term: "pentagon",
      turkish: "beşgen",
      definition: String.raw`A polygon with 5 sides. It can be divided into 3 triangles, so its interior angles add up to $540^\circ$.`,
      diagram: { key: `${D}/polygon`, props: { n: 5, highlight: "none" } },
      source: "MR p. 95",
    },
    {
      id: "hexagon",
      term: "hexagon",
      turkish: "altıgen",
      definition: String.raw`A polygon with 6 sides. Its interior angles add up to $(6-2)(180^\circ) = 720^\circ$.`,
      diagram: { key: `${D}/polygon`, props: { pts: HEX, highlight: "none", names: ["A", "B", "C", "D", "E", "F"] } },
      source: "MR p. 96",
    },
    {
      id: "octagon",
      term: "octagon",
      turkish: "sekizgen",
      definition: String.raw`A polygon with 8 sides. Its interior angles add up to $1{,}080^\circ$.`,
      diagram: { key: `${D}/polygon`, props: { n: 8, shape: "regular", highlight: "none" } },
      source: "MR p. 96",
    },
    {
      id: "decagon",
      term: "decagon",
      turkish: "ongen",
      definition: String.raw`A polygon with 10 sides.`,
      diagram: { key: `${D}/polygon`, props: { n: 10, shape: "regular", highlight: "none" } },
      source: "MR p. 116 (Exercise 4)",
      note: "Appears in the Math Review only in an exercise",
    },
    {
      id: "diagonal",
      term: "diagonal",
      turkish: "köşegen",
      definition: String.raw`A segment joining two vertices of a polygon that are not neighbours. Drawing diagonals from one vertex divides an $n$-sided polygon into $n-2$ triangles.`,
      diagram: { key: `${D}/polygon`, props: { n: 4, highlight: "diagonal", at: 0 } },
      source: "MR pp. 95–96 (used, not formally defined)",
    },
    {
      id: "regular-polygon",
      term: "regular polygon",
      turkish: "düzgün çokgen",
      definition: String.raw`A polygon in which all sides are congruent and all interior angles are congruent.`,
      diagram: { key: `${D}/polygon`, props: { n: 6, shape: "regular", highlight: "none" } },
      source: "MR p. 96",
    },
    {
      id: "perimeter",
      term: "perimeter",
      turkish: "çevre",
      definition: String.raw`For a polygon, the sum of the lengths of its sides.`,
      diagram: { key: `${D}/perimeter` },
      source: "MR p. 96",
    },
    {
      id: "area",
      term: "area (of a polygon)",
      turkish: "alan",
      definition: String.raw`The area of the region enclosed by the polygon.`,
      diagram: { key: `${D}/area` },
      source: "MR p. 96",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`Each interior angle of a regular polygon measures $156^\circ$. How many sides does the polygon have?`,
      choices: [String.raw`$12$`, String.raw`$13$`, String.raw`$15$`, String.raw`$16$`, String.raw`$24$`],
      answer: 2,
      explanation: [
        String.raw`For a regular polygon with $n$ sides, each angle is $\dfrac{(n-2)(180)}{n}$. Set it equal to $156$: $180n - 360 = 156n$.`,
        String.raw`So $24n = 360$ and $n = 15$.`,
        String.raw`Check: $13 \cdot 180 = 2{,}340$ and $2{,}340 / 15 = 156$. Trap: $24$ is the difference $180 - 156$, which is not the number of sides.`,
        String.raw`Shortcut for later: each angle is $180 - \frac{360}{n}$, so $\frac{360}{n} = 180 - 156 = 24$ and $n = 15$ (an algebraic rearrangement of the same formula).`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "medium",
      given: String.raw`A regular polygon has $n$ sides, and each of its interior angles measures less than $140^\circ$.`,
      quantityA: String.raw`$n$`,
      quantityB: String.raw`$9$`,
      answer: "B",
      explanation: [
        String.raw`Each angle is $\dfrac{(n-2)(180)}{n}$, so the condition is $180n - 360 < 140n$, which gives $40n < 360$, that is $n < 9$.`,
        String.raw`Check the boundary: $n = 9$ gives exactly $140^\circ$, which is not less than $140^\circ$, so $9$ is excluded.`,
        String.raw`Therefore $n < 9$ and Quantity B is greater. Because the sign of the inequality comes out the same for every allowed $n$, the answer is (B), not (D).`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      diagram: { key: `${D}/labeled-pentagon`, caption: NTS },
      stem: String.raw`In pentagon $PQRST$ above, the measures of the interior angles are $94^\circ$, $118^\circ$, $x^\circ$, $(2x)^\circ$ and $(x+20)^\circ$. What is the value of $x$?`,
      answer: { kind: "decimal", value: "77" },
      explanation: [
        String.raw`A pentagon has $(5-2)(180) = 540$ degrees in its interior angles.`,
        String.raw`Add the five measures: $94 + 118 + x + 2x + (x + 20) = 232 + 4x$. So $232 + 4x = 540$ and $4x = 308$, $x = 77$.`,
        String.raw`Check that the polygon is allowed: the angles are $94, 118, 77, 154, 97$, all less than $180$, and they sum to $540$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`Each interior angle of a regular polygon with $n$ sides measures a whole number of degrees. Which of the following could be the value of $n$? Indicate all such values.`,
      choices: [String.raw`$7$`, String.raw`$8$`, String.raw`$9$`, String.raw`$11$`, String.raw`$12$`, String.raw`$15$`],
      answer: [1, 2, 4, 5],
      explanation: [
        String.raw`Each angle is $\dfrac{(n-2)(180)}{n} = 180 - \dfrac{360}{n}$, so it is a whole number exactly when $\dfrac{360}{n}$ is a whole number, that is, when $n$ divides $360$.`,
        String.raw`$360 = 8 \cdot 45 = 9 \cdot 40 = 12 \cdot 30 = 15 \cdot 24$, so $8$, $9$, $12$ and $15$ work (angles $135^\circ$, $140^\circ$, $150^\circ$, $156^\circ$).`,
        String.raw`$7$ and $11$ do not divide $360$ (their angles are $\frac{900}{7}$ and $\frac{1620}{11}$, not whole numbers).`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`What is the sum of the interior angles of a convex polygon with 9 sides?`,
      answer: String.raw`$1{,}260^\circ$`,
      explanation: String.raw`$(9-2)(180) = 7 \cdot 180 = 1{,}260$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Into how many triangles do the diagonals from one vertex divide a 12-sided polygon?`,
      answer: String.raw`$10$`,
      explanation: String.raw`$n - 2 = 12 - 2 = 10$.`,
    },
    {
      id: "q3",
      prompt: String.raw`What is each interior angle of a regular hexagon?`,
      answer: String.raw`$120^\circ$`,
      explanation: String.raw`The sum is $4 \cdot 180 = 720$, and $720 / 6 = 120$.`,
    },
    {
      id: "q4",
      prompt: String.raw`Three interior angles of a quadrilateral measure $85^\circ$, $95^\circ$ and $110^\circ$. What is the fourth?`,
      answer: String.raw`$70^\circ$`,
      explanation: String.raw`The sum is $360$, and $360 - (85 + 95 + 110) = 70$.`,
    },
    {
      id: "q5",
      prompt: String.raw`Can a polygon, in the sense of the Math Review, have an interior angle of $200^\circ$?`,
      answer: String.raw`No`,
      explanation: String.raw`"Polygon" means convex polygon: every interior angle is less than $180^\circ$ (MR p. 95).`,
    },
    {
      id: "q6",
      prompt: String.raw`What is the difference between the perimeter and the area of a polygon?`,
      answer: String.raw`Perimeter is the sum of the side lengths; area is the size of the enclosed region.`,
      explanation: String.raw`Perimeter is a length (sum of the sides); area is measured in square units (MR p. 96).`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`The sum of the measures of the interior angles of a convex polygon is greater than $1{,}500^\circ$ and less than $1{,}900^\circ$. The polygon has $n$ sides.`,
        quantityA: String.raw`$n$`,
        quantityB: String.raw`$12$`,
        answer: "D",
        explanation: [
          String.raw`The sum is $(n-2)(180)$. From $1{,}500 < (n-2)(180) < 1{,}900$ we get $8.33\ldots < n - 2 < 10.55\ldots$.`,
          String.raw`Since $n-2$ is a whole number, $n - 2 = 9$ or $10$, so $n = 11$ or $n = 12$. (Check: $9 \cdot 180 = 1{,}620$ and $10 \cdot 180 = 1{,}800$ both lie in the range; $11 \cdot 180 = 1{,}980$ is too big.)`,
          String.raw`If $n = 11$, Quantity B is greater; if $n = 12$, the quantities are equal. Different relationships are possible, so the answer is (D).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`A convex hexagon has two interior angles that each measure $100^\circ$.`,
        quantityA: String.raw`The measure of the largest of the other four interior angles`,
        quantityB: String.raw`$140^\circ$`,
        answer: "D",
        explanation: [
          String.raw`The six angles sum to $720$, so the other four sum to $720 - 200 = 520$, an average of $130$. The largest of the four is at least $130$.`,
          String.raw`It can be exactly $130$ (all four equal, smaller than $140$) or, for example, $160$ (with the other three $120$ each: $160 + 360 = 520$; all are below $180$, so the hexagon is allowed). So the largest angle can be below or above $140$.`,
          String.raw`The answer is (D). The trap is to use the average $130$ as if every angle were equal.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "medium",
        quantityA: String.raw`The sum of the measures of three interior angles of a regular 12-sided polygon`,
        quantityB: String.raw`The sum of the measures of the interior angles of a pentagon`,
        answer: "B",
        explanation: [
          String.raw`Regular 12-sided polygon: each angle is $\frac{10 \cdot 180}{12} = 150$, so three angles sum to $450$.`,
          String.raw`Pentagon: the interior angles sum to $(5-2)(180) = 540$, whatever its shape.`,
          String.raw`$450 < 540$, so Quantity B is greater. Trap: each 12-sided-polygon angle ($150$) is larger than a regular-pentagon angle ($108$), but the quantities are sums over different numbers of angles, so count the angles.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`A regular polygon has $n$ sides. A second regular polygon has $3$ more sides than the first, and each of its interior angles measures $10^\circ$ more than each interior angle of the first. What is $n$?`,
        choices: [String.raw`$6$`, String.raw`$8$`, String.raw`$9$`, String.raw`$10$`, String.raw`$12$`],
        answer: 2,
        explanation: [
          String.raw`Use each angle $= 180 - \dfrac{360}{n}$. The second polygon has angle $180 - \dfrac{360}{n+3}$, so the difference is $\dfrac{360}{n} - \dfrac{360}{n+3} = 10$.`,
          String.raw`Combine: $\dfrac{360 \cdot 3}{n(n+3)} = 10$, so $n(n+3) = 108$, i.e. $n^2 + 3n - 108 = 0$, $(n+12)(n-9) = 0$. Since $n > 0$, $n = 9$.`,
          String.raw`Check: $9$ sides give $140^\circ$ and $12$ sides give $150^\circ$, a difference of $10^\circ$. You can also test the choices: $n = 12$ gives only $150 \to 156$, a difference of $6$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`The interior angles of a convex hexagon are in the ratio $2:3:3:4:4:4$. What is the positive difference, in degrees, between the largest and the smallest interior angle?`,
        choices: [String.raw`$36$`, String.raw`$48$`, String.raw`$60$`, String.raw`$72$`, String.raw`$108$`],
        answer: 3,
        explanation: [
          String.raw`The ratio parts add up to $2+3+3+4+4+4 = 20$, and the angles sum to $(6-2)(180) = 720$, so one part is $720/20 = 36$ degrees.`,
          String.raw`Largest $= 4 \cdot 36 = 144$, smallest $= 2 \cdot 36 = 72$, difference $= 72$. (Equivalently the difference is $2$ parts, $2 \cdot 36 = 72$.)`,
          String.raw`Check convexity: the largest angle $144^\circ$ is less than $180^\circ$. Trap: $72$ is also the smallest angle, and $36$ is just one part.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        diagram: { key: `${D}/pentagon-diagonal`, caption: NTS },
        stem: String.raw`$ABCDE$ is a regular pentagon. What is the measure of angle $EAC$ in the figure above, in degrees?`,
        choices: [String.raw`$36$`, String.raw`$54$`, String.raw`$72$`, String.raw`$84$`, String.raw`$108$`],
        answer: 2,
        explanation: [
          String.raw`Each interior angle of a regular pentagon is $\frac{540}{5} = 108^\circ$, so the measure of angle $EAB$ is $108$ and the measure of angle $ABC$ is $108$.`,
          String.raw`Triangle $ABC$ has sides $AB$ and $BC$ congruent, so the angles opposite them, at $C$ and at $A$, are congruent. They share $180 - 108 = 72$, so the measure of angle $BAC$ is $36$.`,
          String.raw`The diagonal $AC$ lies inside angle $EAB$, so the measure of angle $EAC$ is $108 - 36 = 72$.`,
          String.raw`Trap: $36$ is the measure of angle $BAC$, and $108$ is the whole angle $EAB$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`Which of the following statements must be true for every polygon (in the sense of the Math Review) with 9 sides? Indicate all such statements.`,
        choices: [
          String.raw`The sum of the measures of its interior angles is $1{,}260^\circ$.`,
          String.raw`Every interior angle measures $140^\circ$.`,
          String.raw`Every interior angle measures less than $180^\circ$.`,
          String.raw`Diagonals drawn from one vertex to all non-adjacent vertices divide it into 7 triangles.`,
          String.raw`At least one interior angle measures $140^\circ$ or more.`,
          String.raw`All of its sides are congruent.`,
        ],
        answer: [0, 2, 3, 4],
        explanation: [
          String.raw`(A) true: $(9-2)(180) = 1{,}260$. (B) false: that holds only if the polygon is regular, and nothing says so. (C) true: this is the definition of a polygon (convex) in the Math Review. (D) true: $n - 2 = 7$ triangles. (F) false: equal sides are part of "regular", not of every 9-sided polygon.`,
          String.raw`(E) is the tricky one: the nine angles sum to $1{,}260$, so their average is $140$. The angles cannot all be less than the average, so at least one is $140^\circ$ or more. True.`,
          String.raw`Answer: A, C, D and E.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`Which of the following could be the measure of an interior angle of some regular polygon? Indicate all such measures.`,
        choices: [String.raw`$100^\circ$`, String.raw`$108^\circ$`, String.raw`$115^\circ$`, String.raw`$140^\circ$`, String.raw`$160^\circ$`, String.raw`$175^\circ$`],
        answer: [1, 3, 4, 5],
        explanation: [
          String.raw`Each angle of a regular $n$-gon is $180 - \frac{360}{n}$, so an angle of $a$ degrees needs $n = \frac{360}{180 - a}$ to be a whole number $\ge 3$.`,
          String.raw`$108$: $\frac{360}{72} = 5$ (yes). $140$: $\frac{360}{40} = 9$ (yes). $160$: $\frac{360}{20} = 18$ (yes). $175$: $\frac{360}{5} = 72$ (yes).`,
          String.raw`$100$: $\frac{360}{80} = 4.5$ (no). $115$: $\frac{360}{65} \approx 5.5$ (no). Answer: $108$, $140$, $160$, $175$.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`A regular polygon has a perimeter of $150$, and each of its interior angles measures $156^\circ$. What is the length of one side of the polygon?`,
        answer: { kind: "decimal", value: "10" },
        explanation: [
          String.raw`First find the number of sides: $180 - \frac{360}{n} = 156$ gives $\frac{360}{n} = 24$, so $n = 15$.`,
          String.raw`The sides are congruent, so each has length $\frac{150}{15} = 10$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`Polygon $X$ has $4$ more sides than polygon $Y$, and the sum of the measures of the interior angles of $X$ is exactly twice the sum for $Y$. What is the sum, in degrees, of the measures of the interior angles of $X$?`,
        answer: { kind: "decimal", value: "1440" },
        explanation: [
          String.raw`Let $Y$ have $m$ sides, so $X$ has $m + 4$. The condition is $(m + 4 - 2)(180) = 2(m - 2)(180)$, which gives $m + 2 = 2m - 4$ and $m = 6$.`,
          String.raw`So $Y$ is a hexagon with sum $720$, and $X$ has $10$ sides: $(10-2)(180) = 1{,}440 = 2 \cdot 720$.`,
        ],
      },
    ],
  },
};

export default section;
