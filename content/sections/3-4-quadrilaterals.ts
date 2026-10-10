import type { Section } from "../types";

const NTS = String.raw`Note: Figure not drawn to scale.`;

const section: Section = {
  id: "3-4-quadrilaterals",
  number: "3.4",
  title: "Quadrilaterals",
  part: "geometry",
  mrPages: "102–105",
  summary: String.raw`Rectangles, squares, parallelograms and trapezoids: what each definition guarantees, the two area formulas $A = bh$ and $A = \frac{1}{2}(b_1 + b_2)h$, and how the GRE turns quadrilaterals into right triangles.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Four sides, 360 degrees" },
    {
      kind: "p",
      text: String.raw`A [[quadrilateral]] is a polygon with four sides and four interior angles. Draw either [[diagonal]] (a segment joining two opposite vertices) and the quadrilateral splits into two triangles, each contributing $180^\circ$. That is why the interior angles of every quadrilateral add up to $360^\circ$ (MR p. 102).`,
    },
    { kind: "math", tex: String.raw`\text{sum of the interior angles of a quadrilateral} = 360^\circ`, key: true },
    {
      kind: "diagram",
      diagram: { key: "3-4-quadrilaterals/quadrilateral", props: { highlight: "diagonal" }, caption: String.raw`Diagonal $PR$ splits quadrilateral $PQRS$ into two triangles, so its angles add up to $2 \cdot 180^\circ = 360^\circ$.` },
    },
    {
      kind: "p",
      text: String.raw`A typical use: if the angles of a quadrilateral are in the ratio $3:4:5:6$, they are $3k, 4k, 5k, 6k$ with $18k = 360$, so $k = 20$ and the angles are $60^\circ$, $80^\circ$, $100^\circ$ and $120^\circ$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "What “quadrilateral” means on the test",
      text: String.raw`When a quadrilateral is described in words but not shown, you may assume it encloses a convex region: no bow-tie shapes, no dents (MC p. 8). Like ETS, this site names a quadrilateral by its vertices in order around the figure, so in $ABCD$ the sides are $AB$, $BC$, $CD$, $DA$ and the diagonals are $AC$ and $BD$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Rectangles and squares" },
    {
      kind: "p",
      text: String.raw`A [[rectangle]] is a quadrilateral with four right angles. Its [[opposite-sides|opposite sides]] are parallel and congruent, and its two diagonals are congruent (MR pp. 102–103). A [[square]] is a rectangle with four congruent sides, so everything true of rectangles is true of squares.`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-4-quadrilaterals/rectangle", props: { highlight: "all" }, caption: String.raw`Rectangle $ABCD$: $AB = DC$, $AD = BC$, and the dashed diagonals satisfy $AC = BD$.` },
    },
    {
      kind: "p",
      text: String.raw`Every diagonal of a rectangle is the hypotenuse of a right triangle whose legs are two adjacent sides. So a $9$ by $12$ rectangle has diagonals of length $\sqrt{81 + 144} = 15$, and a square of side $s$ has diagonals of length $s\sqrt{2}$ (two halves of a square are $45^\circ$-$45^\circ$-$90^\circ$ triangles).`,
    },
    { kind: "math", tex: String.raw`\text{rectangle } \ell \times w: \;\; d = \sqrt{\ell^2 + w^2} \qquad\qquad \text{square of side } s: \;\; d = s\sqrt{2}`, key: true },
    {
      kind: "p",
      text: String.raw`The area of a rectangle is length times width, and the area of a square is $s^2$; both are special cases of the parallelogram formula below. A square with diagonal $d$ has area $\frac{d^2}{2}$, since $s^2 = \left(\frac{d}{\sqrt{2}}\right)^2$. That shortcut saves a step whenever a square's diagonal is a diameter of a circle or the only length given.`,
    },
    {
      kind: "p",
      text: String.raw`One idea the GRE likes to test without saying so: among all rectangles with the same perimeter, the square has the largest area. If the perimeter is $P$, write the sides as $\frac{P}{4} + d$ and $\frac{P}{4} - d$; their product is $\left(\frac{P}{4}\right)^2 - d^2$, which is largest when $d = 0$. (This is a standard fact, though not stated in the ETS Math Review; the one-line algebra above is all the proof you need.) Try it below.`,
    },
    {
      kind: "interactive",
      key: "3-4-quadrilaterals/perimeter-explorer",
      title: "Fixed-perimeter rectangles",
      caption: String.raw`Keep the perimeter fixed and change the length. The area is $\left(\frac{P}{4}\right)^2 - d^2$, where $d$ is how far the length is from $\frac{P}{4}$; it peaks at the square.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "A square is a rectangle",
      text: String.raw`ETS defines a square as a special rectangle, so "rectangle" never rules out "square" unless the question says so. In a Quantitative Comparison, "the area of a rectangle with perimeter 20" versus "25" is (D), not (B): the square of side 5 gives exactly 25, every other rectangle gives less.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Parallelograms" },
    {
      kind: "p",
      text: String.raw`A [[parallelogram]] is a quadrilateral in which both pairs of opposite sides are parallel. In a parallelogram, opposite sides are congruent and [[opposite-angles|opposite angles]] are congruent. All rectangles are parallelograms (MR p. 103), and so are all squares.`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-4-quadrilaterals/parallelogram", props: { highlight: "all" }, caption: String.raw`In parallelogram $ABCD$, $AB = DC$, $AD = BC$, opposite angles are equal ($x^\circ$ and $y^\circ$), and $x + y = 180$.` },
    },
    {
      kind: "p",
      text: String.raw`Combine the two facts you have: opposite angles are equal, so the angles are $x, y, x, y$, and they add up to $360^\circ$. So $2x + 2y = 360$, which means **any two angles that share a side add up to** $180^\circ$. (You can also see this as two parallel lines cut by a third line, MR p. 95.) If one angle of a parallelogram is $65^\circ$, the angles are $65^\circ$, $115^\circ$, $65^\circ$, $115^\circ$ in order around the figure.`,
    },
    { kind: "math", tex: String.raw`\text{parallelogram: } \text{angles } x, y, x, y \text{ in order, with } x + y = 180`, key: true },
    {
      kind: "aside",
      tone: "tip",
      title: "Free information from x + y = 180",
      text: String.raw`Because two neighboring angles add up to $180^\circ$, at least one angle of every parallelogram is $90^\circ$ or more, and if one angle is a right angle, all four are: the parallelogram is a rectangle. The GRE hides this in Quantitative Comparisons that ask whether some angle is greater than $90^\circ$.`,
    },
    {
      kind: "p",
      text: String.raw`Prep books also use the word [[rhombus]] for a parallelogram with four congruent sides. The Math Review does not use it, so if a GRE question needs it, the question will describe the figure in words ("a parallelogram with all sides of length 5").`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Trapezoids" },
    {
      kind: "p",
      text: String.raw`A [[trapezoid]] is a quadrilateral in which at least one pair of opposite sides is parallel. Two opposite, parallel sides are called the [[bases-trapezoid|bases]] of the trapezoid (MR p. 104). The other two sides can have any lengths and any slants. Read the definition literally: "at least one pair" means that a parallelogram also satisfies it.`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-4-quadrilaterals/trapezoid", props: { highlight: "bases" }, caption: String.raw`Trapezoid $KLMN$ with $LM$ parallel to $KN$; the bases are $LM$ and $KN$.` },
    },
    {
      kind: "p",
      text: String.raw`The same angle fact applies along each slanted side: it cuts the two parallel bases, so the two angles at its ends add up to $180^\circ$. In the figure, the angles at $K$ and $L$ add up to $180^\circ$, and so do the angles at $N$ and $M$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Area: base times perpendicular height" },
    {
      kind: "p",
      text: String.raw`For every parallelogram, rectangles and squares included, the area is the length of a base times the corresponding height (MR p. 104):`,
    },
    { kind: "math", tex: String.raw`A = bh`, key: true },
    {
      kind: "p",
      text: String.raw`Any side can serve as the [[base-parallelogram|base]]. The corresponding [[height-parallelogram|height]] is the perpendicular segment from any point on the opposite side to the base, or to an _extension_ of the base. As with triangles, "base" and "height" also name the lengths of these segments (MR pp. 104–105). When the parallelogram leans far over, the foot of the height lands outside the base, and the figure shows the base extended with a dashed line.`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-4-quadrilaterals/parallelogram-area", caption: String.raw`Left: the height falls inside the base. Right: the height meets the extension of the base. In both, $A = bh$.` },
    },
    {
      kind: "p",
      text: String.raw`The height is almost never a side. A parallelogram with sides 10 and 6 and a $30^\circ$ angle has height $3$ on the base of 10 (the side of 6 is the hypotenuse of a $30^\circ$-$60^\circ$-$90^\circ$ triangle), so its area is $10 \cdot 3 = 30$, not $10 \cdot 6 = 60$. Drag the top side below: the slanted sides and the perimeter change, but with the same base and height the area never does.`,
    },
    {
      kind: "interactive",
      key: "3-4-quadrilaterals/shear-explorer",
      title: "Same base, same height, same area",
      caption: String.raw`Slide the top side left and right. The perimeter changes; $A = bh$ does not. When the top side moves past the end of the base, the height meets the extension of the base.`,
    },
    {
      kind: "p",
      text: String.raw`A trapezoid's area is the average of its two bases times the height, where the height is the perpendicular distance between the bases (MR p. 105):`,
    },
    { kind: "math", tex: String.raw`A = \frac{1}{2}(b_1 + b_2)h`, key: true },
    {
      kind: "diagram",
      diagram: { key: "3-4-quadrilaterals/trapezoid-area", caption: String.raw`A trapezoid with bases $b_1$ and $b_2$ and height $h$ has area $\frac{1}{2}(b_1 + b_2)h$.` },
    },
    {
      kind: "p",
      text: String.raw`When the height is not given, drop perpendiculars from the ends of the shorter base. They cut off right triangles at the two ends, and the Pythagorean theorem finishes the job. For example, a trapezoid with bases 8 and 20 whose two slanted sides are both 10 overhangs by $\frac{20 - 8}{2} = 6$ at each end, so $h = \sqrt{10^2 - 6^2} = 8$ and $A = \frac{1}{2}(8 + 20)(8) = 112$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "The slanted side is not the height",
      text: String.raw`Multiplying by a slanted side overstates the area of a parallelogram or trapezoid. The height is perpendicular to the base. If a figure gives a side and an angle instead, find the height from a $30^\circ$-$60^\circ$-$90^\circ$ or $45^\circ$-$45^\circ$-$90^\circ$ triangle.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Almost every quadrilateral question reduces to triangles. A diagonal of a rectangle makes two right triangles; a height in a parallelogram or trapezoid makes a right triangle at the end; a diagonal of any quadrilateral splits it into two triangles whose areas add. Rectangle questions that give only a perimeter and a diagonal are algebra in disguise: from $\ell + w$ and $\ell^2 + w^2$, the identity $(\ell + w)^2 = \ell^2 + w^2 + 2\ell w$ gives the area $\ell w$ without finding $\ell$ and $w$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Using a slanted side as the height. Forgetting that a square counts as a rectangle (and a rectangle as a parallelogram), which matters in "could be" and Quantitative Comparison questions. Mixing up neighboring angles (which add up to $180^\circ$) with opposite angles (which are equal). Forgetting the $\frac{1}{2}$ in the trapezoid formula. And trusting the picture: a quadrilateral that looks like a rectangle is not one unless right angles are marked or stated (MC p. 9).`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "quadrilateral",
      term: "quadrilateral",
      turkish: "dörtgen",
      definition: String.raw`A polygon with four sides and four interior angles. The measures of its interior angles add up to $360^\circ$.`,
      diagram: { key: "3-4-quadrilaterals/quadrilateral", props: { highlight: "outline" } },
      source: "MR pp. 95, 102",
    },
    {
      id: "diagonal",
      term: "diagonal",
      turkish: "köşegen",
      definition: String.raw`A line segment joining two nonadjacent vertices of a polygon. A quadrilateral has two diagonals, and either one divides it into two triangles.`,
      diagram: { key: "3-4-quadrilaterals/quadrilateral", props: { highlight: "diagonal" } },
      source: "MR pp. 95, 102",
    },
    {
      id: "rectangle",
      term: "rectangle",
      turkish: "dikdörtgen",
      definition: String.raw`A quadrilateral with four right angles. Opposite sides are parallel and congruent, and the two diagonals are congruent.`,
      diagram: { key: "3-4-quadrilaterals/rectangle", props: { highlight: "rectangle" } },
      source: "MR pp. 102–103",
    },
    {
      id: "square",
      term: "square",
      turkish: "kare",
      definition: String.raw`A rectangle with four congruent sides.`,
      formula: String.raw`A = s^2, \quad d = s\sqrt{2}`,
      diagram: { key: "3-4-quadrilaterals/square" },
      source: "MR p. 103",
    },
    {
      id: "opposite-sides",
      term: "opposite sides",
      turkish: "karşılıklı kenarlar / karşı kenarlar",
      definition: String.raw`Two sides of a quadrilateral that do not share a vertex, such as $AB$ and $DC$ in $ABCD$. In a parallelogram (and so in a rectangle) opposite sides are parallel and congruent.`,
      diagram: { key: "3-4-quadrilaterals/parallelogram", props: { highlight: "opposite-sides" } },
      source: "MR p. 103",
    },
    {
      id: "opposite-angles",
      term: "opposite angles",
      turkish: "karşılıklı açılar / karşı açılar",
      definition: String.raw`Two angles of a quadrilateral at vertices that are not joined by a side, such as angles $A$ and $C$ in $ABCD$. In a parallelogram opposite angles are congruent.`,
      diagram: { key: "3-4-quadrilaterals/parallelogram", props: { highlight: "opposite-angles" } },
      source: "MR p. 103",
    },
    {
      id: "parallelogram",
      term: "parallelogram",
      turkish: "paralelkenar",
      definition: String.raw`A quadrilateral in which both pairs of opposite sides are parallel. Opposite sides are congruent and opposite angles are congruent. All rectangles are parallelograms.`,
      formula: String.raw`A = bh`,
      diagram: { key: "3-4-quadrilaterals/parallelogram", props: { highlight: "parallelogram" } },
      source: "MR pp. 103–104",
    },
    {
      id: "trapezoid",
      term: "trapezoid",
      turkish: "yamuk",
      definition: String.raw`A quadrilateral in which at least one pair of opposite sides is parallel.`,
      formula: String.raw`A = \frac{1}{2}(b_1 + b_2)h`,
      diagram: { key: "3-4-quadrilaterals/trapezoid", props: { highlight: "trapezoid" } },
      source: "MR pp. 104–105",
    },
    {
      id: "bases-trapezoid",
      term: "bases (of a trapezoid)",
      turkish: "yamuğun tabanları (alt taban, üst taban)",
      definition: String.raw`Two opposite, parallel sides of a trapezoid.`,
      diagram: { key: "3-4-quadrilaterals/trapezoid", props: { highlight: "bases" } },
      source: "MR p. 104",
    },
    {
      id: "base-parallelogram",
      term: "base (of a parallelogram)",
      turkish: "taban",
      definition: String.raw`Any side of a parallelogram chosen as the base; also the length of that side.`,
      diagram: { key: "3-4-quadrilaterals/parallelogram-area", props: { only: "inside", highlight: "base" } },
      source: "MR pp. 104–105",
    },
    {
      id: "height-parallelogram",
      term: "height (of a parallelogram)",
      turkish: "yükseklik",
      definition: String.raw`The perpendicular line segment from any point on the side opposite the base to the base (or an extension of the base); also the length of that segment.`,
      diagram: { key: "3-4-quadrilaterals/parallelogram-area", props: { only: "outside", highlight: "height" } },
      source: "MR pp. 104–105",
    },
    {
      id: "rhombus",
      term: "rhombus",
      turkish: "eşkenar dörtgen",
      definition: String.raw`A parallelogram whose four sides are congruent. (A square is a rhombus with right angles.)`,
      diagram: { key: "3-4-quadrilaterals/rhombus" },
      note: "Not named in the ETS Math Review",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`In parallelogram $ABCD$, the measure of angle $A$ is $30^\circ$ less than twice the measure of angle $B$. What is the measure of angle $C$?`,
      choices: [String.raw`$55^\circ$`, String.raw`$70^\circ$`, String.raw`$105^\circ$`, String.raw`$110^\circ$`, String.raw`$125^\circ$`],
      answer: 3,
      explanation: [
        String.raw`Angles $A$ and $B$ share side $AB$, so they add up to $180^\circ$: $a + b = 180$ with $a = 2b - 30$.`,
        String.raw`Substitute: $3b - 30 = 180$, so $b = 70$ and $a = 110$.`,
        String.raw`Angle $C$ is opposite angle $A$, so it also measures $110^\circ$.`,
        String.raw`Trap: $70^\circ$ is angle $B$ (and $D$). Check which angle is asked for: $C$ is opposite $A$, not $B$.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`Each diagonal of rectangle $R$ has length 10.`,
      quantityA: String.raw`The area of $R$`,
      quantityB: String.raw`$50$`,
      answer: "D",
      explanation: [
        String.raw`Let the sides be $\ell$ and $w$. The diagonal is the hypotenuse of a right triangle with legs $\ell$ and $w$, so $\ell^2 + w^2 = 100$.`,
        String.raw`Use $(\ell - w)^2 = \ell^2 + w^2 - 2\ell w$: then $2\ell w = 100 - (\ell - w)^2$, so the area $\ell w = 50 - \frac{(\ell - w)^2}{2}$.`,
        String.raw`If $R$ is a square ($\ell = w = 5\sqrt{2}$), the area is exactly 50. If not, for example $\ell = 8$ and $w = 6$, the area is $48 < 50$.`,
        String.raw`The quantities can be equal or Quantity B can be greater, so the answer is (D). The trap is to assume the rectangle is not a square, which gives (B).`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "hard",
      diagram: { key: "3-4-quadrilaterals/trapezoid-legs" },
      stem: String.raw`In the figure above, $BC$ is parallel to $AD$, $BC = 7$, $AD = 21$, $AB = 13$ and $CD = 15$. What is the area of quadrilateral $ABCD$?`,
      answer: { kind: "decimal", value: "168" },
      explanation: [
        String.raw`$ABCD$ is a trapezoid with bases 7 and 21; we need its height $h$.`,
        String.raw`Drop perpendiculars from $B$ and $C$ to $AD$, meeting it at $E$ and $F$. Then $EF = BC = 7$, so $AE + FD = 21 - 7 = 14$. Let $AE = x$ and $FD = 14 - x$.`,
        String.raw`Both right triangles have leg $h$: $13^2 - x^2 = h^2 = 15^2 - (14 - x)^2$. So $169 - x^2 = 225 - 196 + 28x - x^2$, which gives $28x = 140$ and $x = 5$.`,
        String.raw`Then $h = \sqrt{169 - 25} = 12$ (check: $FD = 9$ and $9^2 + 12^2 = 15^2$).`,
        String.raw`Area $= \frac{1}{2}(7 + 21)(12) = 168$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`Which of the following statements must be true for every parallelogram? Indicate all such statements.`,
      choices: [
        String.raw`Opposite sides are congruent.`,
        String.raw`The two diagonals are congruent.`,
        String.raw`Any two angles that share a side have measures that add up to $180^\circ$.`,
        String.raw`All four sides are congruent.`,
        String.raw`At least one interior angle measures $90^\circ$ or more.`,
      ],
      answer: [0, 2, 4],
      explanation: [
        String.raw`First: true, a property of every parallelogram (MR p. 103).`,
        String.raw`Second: not necessarily. Congruent diagonals are stated for rectangles. A parallelogram with angles $60^\circ$ and $120^\circ$ has one long and one short diagonal.`,
        String.raw`Third: true. The angles are $x, y, x, y$ around the figure and add up to $360^\circ$, so $x + y = 180$.`,
        String.raw`Fourth: not necessarily; a $3$ by $5$ rectangle is a parallelogram.`,
        String.raw`Fifth: true. If both $x$ and $y$ were less than 90, then $x + y < 180$, contradicting the third statement.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Three angles of a quadrilateral measure $85^\circ$, $95^\circ$ and $110^\circ$. What is the fourth?`,
      answer: String.raw`$70^\circ$`,
      explanation: String.raw`$360 - (85 + 95 + 110) = 70$.`,
    },
    {
      id: "q2",
      prompt: String.raw`A rectangle is 8 by 15. How long is each diagonal?`,
      answer: String.raw`$17$`,
      explanation: String.raw`$\sqrt{64 + 225} = \sqrt{289} = 17$.`,
    },
    {
      id: "q3",
      prompt: String.raw`One angle of a parallelogram measures $65^\circ$. What are the other three?`,
      answer: String.raw`$115^\circ$, $65^\circ$, $115^\circ$`,
      explanation: String.raw`Neighboring angles add up to $180^\circ$ and opposite angles are equal.`,
    },
    {
      id: "q4",
      prompt: String.raw`A parallelogram has sides 12 and 7, and the height to the side of length 12 is 5. What is its area?`,
      answer: String.raw`$60$`,
      explanation: String.raw`$A = bh = 12 \cdot 5$. The side of length 7 is slanted and is not used.`,
    },
    {
      id: "q5",
      prompt: String.raw`A trapezoid has bases 5 and 13 and height 4. What is its area?`,
      answer: String.raw`$36$`,
      explanation: String.raw`$\frac{1}{2}(5 + 13)(4) = 36$.`,
    },
    {
      id: "q6",
      prompt: String.raw`A square has diagonal 6. What is its area?`,
      answer: String.raw`$18$`,
      explanation: String.raw`Area $= \frac{d^2}{2} = \frac{36}{2}$ (the side is $3\sqrt{2}$).`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`In parallelogram $PQRS$, the measure of angle $P$ is $x^\circ$, the measure of angle $Q$ is $y^\circ$, and $x > y$.`,
        quantityA: String.raw`$x$`,
        quantityB: String.raw`$90$`,
        answer: "A",
        explanation: [
          String.raw`Angles $P$ and $Q$ share side $PQ$, so they are neighboring angles, not opposite ones: $x + y = 180$.`,
          String.raw`Since $x > y$, $x$ is more than half of 180, so $x > 90$.`,
          String.raw`Quantity A is greater. Trap: treating $P$ and $Q$ as opposite angles (which would force $x = y$ and contradict $x > y$).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "medium",
        given: String.raw`A square and a rectangle have the same area. The length of the rectangle is twice its width.`,
        quantityA: String.raw`The perimeter of the square`,
        quantityB: String.raw`The perimeter of the rectangle`,
        answer: "B",
        explanation: [
          String.raw`Let the square have side $s$ and the rectangle have width $w$ and length $2w$. Equal areas: $2w^2 = s^2$, so $w = \frac{s}{\sqrt{2}}$.`,
          String.raw`Perimeter of the rectangle: $2(w + 2w) = 6w = \frac{6s}{\sqrt{2}} = 3\sqrt{2}\,s \approx 4.24s$.`,
          String.raw`Perimeter of the square: $4s$. Since $3\sqrt{2} \approx 4.24 > 4$, Quantity B is greater, whatever $s$ is.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        diagram: { key: "3-4-quadrilaterals/trapezoid-diagonals", caption: NTS },
        given: String.raw`In quadrilateral $KLMN$, side $LM$ is parallel to side $KN$.`,
        quantityA: String.raw`The area of triangle $KLN$`,
        quantityB: String.raw`The area of triangle $KMN$`,
        answer: "C",
        explanation: [
          String.raw`Both triangles have base $KN$.`,
          String.raw`The third vertices $L$ and $M$ both lie on line $LM$, which is parallel to $KN$. So the perpendicular distance from $L$ to $KN$ equals the perpendicular distance from $M$ to $KN$: both are the height $h$ of the trapezoid.`,
          String.raw`Each area is $\frac{1}{2}(KN)(h)$, so the quantities are equal.`,
          String.raw`The figure makes the triangles look different, but it is not drawn to scale, and the shapes really are different; only base and height matter for area.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`The length and width of a rectangle are in the ratio $4:3$, and the area of the rectangle is 192. What is the length of a diagonal of the rectangle?`,
        choices: [String.raw`$14$`, String.raw`$16$`, String.raw`$20$`, String.raw`$24$`, String.raw`$28$`],
        answer: 2,
        explanation: [
          String.raw`Write the sides as $4k$ and $3k$. Then $12k^2 = 192$, so $k^2 = 16$ and $k = 4$: the sides are 16 and 12.`,
          String.raw`The diagonal is $\sqrt{16^2 + 12^2} = \sqrt{400} = 20$ (a $3$-$4$-$5$ triangle scaled by 4).`,
          String.raw`Traps: 16 is the length, and 28 is $16 + 12$, half the perimeter.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        diagram: { key: "3-4-quadrilaterals/parallelogram-135", caption: NTS },
        stem: String.raw`In parallelogram $ABCD$ above, $AB = 12$, $BC = 6\sqrt{2}$, and the measure of angle $ABC$ is $135^\circ$. What is the area of $ABCD$?`,
        choices: [String.raw`$36$`, String.raw`$36\sqrt{2}$`, String.raw`$72$`, String.raw`$72\sqrt{2}$`, String.raw`$144$`],
        answer: 2,
        explanation: [
          String.raw`Angles $A$ and $B$ share side $AB$, so angle $DAB$ measures $180^\circ - 135^\circ = 45^\circ$.`,
          String.raw`Drop a perpendicular from $D$ to $AB$. It makes a $45^\circ$-$45^\circ$-$90^\circ$ triangle with hypotenuse $AD = BC = 6\sqrt{2}$, so the height is $\frac{6\sqrt{2}}{\sqrt{2}} = 6$.`,
          String.raw`Area $= bh = 12 \cdot 6 = 72$.`,
          String.raw`Trap: $72\sqrt{2} = 12 \cdot 6\sqrt{2}$ uses the slanted side as the height; $36$ adds a $\frac{1}{2}$ that belongs only to triangles.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        diagram: { key: "3-4-quadrilaterals/right-trapezoid", caption: NTS },
        stem: String.raw`In quadrilateral $ABCD$ above, $AB$ is parallel to $DC$, angles $A$ and $D$ are right angles, $AB = 16$, $DC = 10$, and the area of $ABCD$ is 104. What is the perimeter of $ABCD$?`,
        choices: [String.raw`$40$`, String.raw`$42$`, String.raw`$44$`, String.raw`$46$`, String.raw`$50$`],
        answer: 2,
        explanation: [
          String.raw`$ABCD$ is a trapezoid with bases 16 and 10, and $AD$ is perpendicular to both bases, so $AD$ is the height: $\frac{1}{2}(16 + 10)(AD) = 104$ gives $AD = 8$.`,
          String.raw`Drop a perpendicular from $C$ to $AB$ at $E$. Then $CE = 8$ and $EB = 16 - 10 = 6$, so $BC = \sqrt{6^2 + 8^2} = 10$.`,
          String.raw`Perimeter $= 16 + 10 + 8 + 10 = 44$.`,
          String.raw`Trap: forgetting the $\frac{1}{2}$ gives $AD = 4$, and assuming $BC = AD$ (as in a rectangle) gives $16 + 10 + 8 + 8 = 42$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`A parallelogram has sides of lengths 6 and 10. Which of the following could be the area of the parallelogram? Indicate all such areas.`,
        choices: [String.raw`$6$`, String.raw`$24$`, String.raw`$30\sqrt{3}$`, String.raw`$60$`, String.raw`$6\sqrt{110}$`, String.raw`$64$`],
        answer: [0, 1, 2, 3],
        explanation: [
          String.raw`Take the side of 10 as the base. The height is a leg of a right triangle whose hypotenuse is the side of 6, so $0 < h \le 6$, with $h = 6$ exactly when the parallelogram is a rectangle.`,
          String.raw`Tilting the side of 6 from almost flat to upright gives every height in between, so the area $10h$ can be any value with $0 < A \le 60$.`,
          String.raw`Check: $6$ yes; $24$ yes; $30\sqrt{3} \approx 52.0$ yes; $60$ yes (the rectangle, which is a parallelogram); $6\sqrt{110} = \sqrt{3960} > \sqrt{3600} = 60$ no; $64$ no.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`A rectangle has area 36, and the length of each side is an integer. Which of the following could be the perimeter of the rectangle? Indicate all such perimeters.`,
        choices: [String.raw`$20$`, String.raw`$24$`, String.raw`$26$`, String.raw`$28$`, String.raw`$30$`, String.raw`$36$`, String.raw`$40$`],
        answer: [1, 2, 4, 6],
        explanation: [
          String.raw`List the integer pairs with product 36: $1 \times 36$, $2 \times 18$, $3 \times 12$, $4 \times 9$, $6 \times 6$.`,
          String.raw`Perimeters $2(\ell + w)$: $74$, $40$, $30$, $26$, $24$.`,
          String.raw`From the list: 24, 26, 30 and 40. The $6 \times 6$ square counts, because a square is a rectangle; leaving it out is the trap.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        diagram: { key: "3-4-quadrilaterals/square-midpoints" },
        stem: String.raw`In the figure above, $ABCD$ is a square with sides of length 12, $E$ is the midpoint of $AB$, and $F$ is the midpoint of $BC$. What is the area of the shaded quadrilateral $AEFC$?`,
        answer: { kind: "decimal", value: "54" },
        explanation: [
          String.raw`The shaded region is triangle $ABC$ with triangle $EBF$ removed.`,
          String.raw`Triangle $ABC$ is half the square: $\frac{1}{2}(12)(12) = 72$.`,
          String.raw`Triangle $EBF$ has a right angle at $B$ and legs $EB = BF = 6$: area $\frac{1}{2}(6)(6) = 18$.`,
          String.raw`Shaded area $= 72 - 18 = 54$. (Alternatively, $AEFC$ is a trapezoid, since $EF$ is parallel to $AC$, but subtraction is faster.)`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`A rectangle has perimeter 34, and each of its diagonals has length 13. What is the area of the rectangle?`,
        answer: { kind: "decimal", value: "60" },
        explanation: [
          String.raw`Let the sides be $\ell$ and $w$. The perimeter gives $\ell + w = 17$; the diagonal gives $\ell^2 + w^2 = 169$.`,
          String.raw`Square the first equation: $\ell^2 + 2\ell w + w^2 = 289$. Subtract the second: $2\ell w = 120$, so $\ell w = 60$.`,
          String.raw`(The sides are 5 and 12, but you never need them.)`,
        ],
      },
    ],
  },
};

export default section;
