import type { Section } from "../types";

const NTS = String.raw`Note: Figure not drawn to scale.`;
const D = "3-1-lines-and-angles";

const section: Section = {
  id: "3-1-lines-and-angles",
  number: "3.1",
  title: "Lines and Angles",
  part: "geometry",
  mrPages: "92–95",
  summary: String.raw`Lines, segments and midpoints; the four angles at a crossing of two lines; right, acute and obtuse angles; and the eight angles formed when a line crosses two parallel lines. Small facts, but they are the raw material of almost every GRE geometry question, and the figure conventions decide what you may assume.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Lines, segments and midpoints" },
    {
      kind: "p",
      text: String.raw`On the GRE a [[line]] is always a straight line that goes on in both directions without ending (MC p. 8). Pick two points on it, and the part of the line made of those two points and everything between them is a [[line-segment|line segment]]; the two points are its [[endpoints]]. Segments with equal lengths are [[congruent-segments|congruent line segments]], and the point that cuts a segment into two congruent pieces is its [[midpoint]] (MR p. 92).`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/segment`, props: { highlight: "all" }, caption: String.raw`Points $P$, $Q$, $R$, $S$ on line $\ell$. $QR = RS = 7$, so $QR$ and $RS$ are congruent and $R$ is the midpoint of $QS$.` },
    },
    {
      kind: "p",
      text: String.raw`ETS writes a segment with two plain letters, $PQ$, and uses the same two letters for its [[length]]: "$PQ = 10$" (MR p. 92). The Conventions add a third meaning: $PQ$ can also be the whole line through $P$ and $Q$ (MC p. 9). The context always tells you which. In the figure, $PS = 10 + 7 + 7 = 24$ and $QS = 14$, and since $QR = RS$, $R$ is the midpoint of $QS$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "What a figure lets you assume",
      text: String.raw`Points on a line are in the order shown, lines shown straight are straight, and points shown as different are different (MC pp. 8–9). But lengths are _not_ to scale: in a figure where $PQ$ looks longer than $QR$, you may not conclude that $PQ > QR$ unless it is given or follows from what is given.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "No figure, no order",
      text: String.raw`If a question only says "$A$, $B$ and $C$ are points on a line with $AB = 9$ and $BC = 4$," the order is unknown. $C$ may be beyond $B$ (then $AC = 13$) or between $A$ and $B$ (then $AC = 5$). Questions that ask what "could be" true are built on exactly this case split.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Two lines that cross" },
    {
      kind: "p",
      text: String.raw`When two lines meet at a point, they form four [[angle|angles]], each with its [[vertex]] at the point where the lines meet. In the figure below, lines $k$ and $m$ meet at $V$, forming angles $EVF$, $FVG$, $GVH$ and $HVE$. Angles across the vertex from each other, such as $EVF$ and $GVH$, are [[opposite-angles|opposite angles]], also called vertical angles. The key facts (MR p. 93):`,
    },
    { kind: "math", tex: String.raw`\text{opposite angles have equal measure;}\qquad \text{the four angles add up to } 360^\circ`, key: true },
    {
      kind: "diagram",
      diagram: { key: `${D}/intersecting`, props: { highlight: "all" }, caption: String.raw`Opposite angles are equal: angles $EVF$ and $GVH$ both measure $140^\circ$; angles $FVG$ and $HVE$ both measure $40^\circ$.` },
    },
    {
      kind: "p",
      text: String.raw`Angles with equal measure are [[congruent-angles|congruent angles]], so opposite angles are congruent. Put the two facts together and you get the one you will use most: if the four angles are $a, b, a, b$ in order, then $2a + 2b = 360$, so **any two neighbouring angles add up to $180^\circ$**. One angle therefore fixes all four: if one angle is $40^\circ$, the others are $140^\circ$, $40^\circ$ and $140^\circ$. Prep books call two angles whose measures add up to $180^\circ$ [[supplementary|supplementary]], and two whose measures add up to $90^\circ$ [[complementary|complementary]]; the Math Review uses neither word, but GRE stems occasionally do.`,
    },
    {
      kind: "p",
      text: String.raw`Notation: ETS writes "angle $EVF$" or $\angle EVF$, and talks about "the measure of angle $EVF$" (MR p. 93). The vertex is always the middle letter. When there is no doubt about which angle is meant, it may be called simply "angle $V$". Two segments $BA$ and $BC$ actually form two angles at $B$, one less than $180^\circ$ and one greater; unless the question says otherwise, "angle $ABC$" means the smaller one (MC pp. 8–9). Angle measures are positive and at most $360^\circ$ (MC p. 8).`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/smaller-angle`, caption: String.raw`Segments $BA$ and $BC$ form a $132^\circ$ angle and a $228^\circ$ angle at $B$. "Angle $ABC$" means the $132^\circ$ one.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Right, acute and obtuse angles" },
    {
      kind: "p",
      text: String.raw`If two lines meet so that all four angles are congruent, each must be $360^\circ \div 4 = 90^\circ$, and the lines are [[perpendicular]], written $k \perp m$. An angle of $90^\circ$ is a [[right-angle|right angle]], and figures mark it with a small square at the vertex. An angle of less than $90^\circ$ is [[acute-angle|acute]]; an angle between $90^\circ$ and $180^\circ$ is [[obtuse-angle|obtuse]] (MR pp. 93–94).`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/angle-types`, props: { kind: "all" }, caption: String.raw`Angle $ABC$ is acute ($38^\circ$), angle $DEF$ is a right angle (small square), and angle $GHJ$ is obtuse ($128^\circ$).` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "A right angle must be marked or given",
      text: String.raw`An angle that _looks_ like $90^\circ$ is not a right angle on the GRE unless the figure shows the small square or the text says so (MC p. 10). The same goes for lines that look perpendicular. Conversely, a small square is real information: you may use it even if the figure is not drawn to scale.`,
    },
    {
      kind: "p",
      text: String.raw`Perpendicular segments also define distance. The [[distance-point-line|distance between a point and a line]] is the length of the perpendicular segment from the point to the line, which is the shortest path from the point to the line; the distance between two parallel lines is the distance from any point on one of them to the other (MC p. 8). This is why the height of a triangle or a parallelogram is always drawn with a right-angle mark.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/distance`, props: { kind: "point" }, caption: String.raw`$PQ$ is perpendicular to $\ell$, so $PQ$ is the distance from $P$ to $\ell$. Any other segment from $P$ to $\ell$, such as $PR$, is longer.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Parallel lines and a line that crosses them" },
    {
      kind: "p",
      text: String.raw`Two lines in the same plane that never meet are [[parallel]], written $k \parallel m$ (MR p. 94). Now let a third line $p$, which prep books call a [[transversal]], cross both of them. It forms four angles at each crossing, eight in all, and the Math Review's whole statement about them is short and complete: four of the eight angles have one measure, $x^\circ$, the other four have another measure, $y^\circ$, and $x + y = 180$ (MR p. 95).`,
    },
    { kind: "math", tex: String.raw`k \parallel m:\quad \text{four angles measure } x^\circ,\ \text{four measure } y^\circ,\quad x + y = 180`, key: true },
    {
      kind: "diagram",
      diagram: {
        key: `${D}/parallel`,
        props: { theta: 62, labels: { k: ["y°", "x°", "x°", "y°"], m: ["y°", "x°", "x°", "y°"] } },
        caption: String.raw`$k \parallel m$. At each crossing the angles alternate $x^\circ, y^\circ$ around the vertex, and the pattern at $m$ is an exact copy of the pattern at $k$.`,
      },
    },
    {
      kind: "p",
      text: String.raw`In practice: unless $p$ is perpendicular to the parallel lines, four of the angles are acute and four are obtuse. **Every acute angle equals every other acute angle, every obtuse angle equals every other obtuse angle, and any acute angle plus any obtuse angle is $180^\circ$.** (If $p$ is perpendicular to the lines, all eight angles are $90^\circ$.) So one angle measure determines all eight. If one of them is $57^\circ$, then four are $57^\circ$ and four are $123^\circ$.`,
    },
    {
      kind: "p",
      text: String.raw`Prep books name the pairs: two angles in the same position at the two crossings (both above-right, say) are [[corresponding-angles|corresponding angles]], and two angles between the parallel lines on opposite sides of $p$ are [[alternate-interior-angles|alternate interior angles]]. Both kinds of pair are equal. You do not need the names, because the "acute or obtuse" rule covers every pair, but recognising the shapes speeds you up. Drag the crossing line below and watch the two groups of four.`,
    },
    {
      kind: "interactive",
      key: `${D}/parallel-explorer`,
      title: "Parallel lines explorer",
      caption: String.raw`Drag the handle on line $p$ (or use the slider) to turn it. Tap any angle to see which angles equal it and which add with it to $180^\circ$. Then tilt line $m$: as soon as $k$ and $m$ are not parallel, the angles at the two crossings stop matching.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Parallel must be given",
      text: String.raw`The eight-angle fact needs $k \parallel m$, stated in words or as $k \parallel m$. Lines that merely look parallel in a figure may not be (MC p. 9). Without it, the only facts you have are the ones at each single crossing: opposite angles are equal and neighbours add up to $180^\circ$. Angles at the two different crossings are then unrelated.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Add a parallel line",
      text: String.raw`When a bent path zigzags between two parallel lines, draw a third line through the bend, parallel to both. The angle at the bend splits into two pieces, each equal to an angle at one of the original lines, so the angle at the bend is their sum.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Almost every angle question in this section reduces to three moves: opposite angles are equal; neighbouring angles along a line add up to $180^\circ$; and with parallel lines, the acute angles are all equal and the obtuse angles are all equal. Write the unknown angles in terms of one variable, then set up the single equation the picture gives you: two angles equal, or two angles summing to $180^\circ$. Length questions on a line are bookkeeping: label coordinates (put the first point at 0) and the midpoints become averages.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Setting two angles equal when they actually add up to $180^\circ$ (check whether one is acute and the other obtuse). Using the parallel-line fact when parallelism was never stated. Treating an angle that looks like $90^\circ$ as a right angle without a square or a statement. Assuming the order of points on a line that is only described in words. And reading lengths or angles off a figure that is not drawn to scale.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "line",
      term: "line",
      turkish: "doğru",
      definition: String.raw`A straight line that extends in both directions without ending.`,
      diagram: { key: `${D}/segment`, props: { highlight: "line" } },
      source: "MR p. 92; MC p. 8",
    },
    {
      id: "line-segment",
      term: "line segment",
      turkish: "doğru parçası",
      definition: String.raw`Given two points on a line, the part of the line that contains the two points and all the points between them, e.g. segment $PQ$.`,
      diagram: { key: `${D}/segment`, props: { highlight: "segment" } },
      source: "MR p. 92",
    },
    {
      id: "endpoints",
      term: "endpoints",
      turkish: "uç noktalar",
      definition: String.raw`The two points that determine a line segment, e.g. $P$ and $Q$ for segment $PQ$.`,
      diagram: { key: `${D}/segment`, props: { highlight: "endpoints" } },
      source: "MR p. 92",
    },
    {
      id: "length",
      term: "length (of a segment), notation AB",
      turkish: "uzunluk (doğru parçasının uzunluğu)",
      definition: String.raw`The notation $PQ$ can mean the segment $PQ$, its length, or the line through $P$ and $Q$; the context decides which.`,
      diagram: { key: `${D}/segment`, props: { highlight: "length" } },
      source: "MR p. 92; MC p. 9",
    },
    {
      id: "congruent-segments",
      term: "congruent line segments",
      turkish: "eş doğru parçaları",
      definition: String.raw`Line segments that have equal lengths.`,
      diagram: { key: `${D}/segment`, props: { highlight: "congruent" } },
      source: "MR p. 92",
    },
    {
      id: "midpoint",
      term: "midpoint",
      turkish: "orta nokta",
      definition: String.raw`The point that divides a line segment into two congruent line segments. In the figure, $R$ is the midpoint of $QS$.`,
      diagram: { key: `${D}/segment`, props: { highlight: "midpoint" } },
      source: "MR p. 92",
    },
    {
      id: "angle",
      term: "angle (∠)",
      turkish: "açı",
      definition: String.raw`Two intersecting lines form four angles. An angle is named by three points with the vertex in the middle, e.g. angle $FVG$ or $\angle FVG$. "Angle $ABC$" means the angle of measure less than $180^\circ$ unless stated otherwise.`,
      diagram: { key: `${D}/intersecting`, props: { highlight: "angle" } },
      source: "MR p. 93; MC pp. 8–9",
    },
    {
      id: "vertex",
      term: "vertex (of an angle)",
      turkish: "açının köşesi",
      definition: String.raw`The point where the two sides of an angle meet; for the angles formed by two intersecting lines, the point of intersection.`,
      diagram: { key: `${D}/intersecting`, props: { highlight: "vertex" } },
      source: "MR p. 93",
    },
    {
      id: "opposite-angles",
      term: "opposite angles (vertical angles)",
      turkish: "ters açılar",
      definition: String.raw`Two of the four angles formed by two intersecting lines that lie across the vertex from each other, e.g. angles $FVG$ and $HVE$. Opposite angles have equal measure.`,
      diagram: { key: `${D}/intersecting`, props: { highlight: "vertical" } },
      source: "MR p. 93",
    },
    {
      id: "congruent-angles",
      term: "congruent angles",
      turkish: "eş açılar",
      definition: String.raw`Angles that have equal measure. Opposite angles are congruent.`,
      diagram: { key: `${D}/intersecting`, props: { highlight: "congruent" } },
      source: "MR p. 93",
    },
    {
      id: "perpendicular",
      term: "perpendicular lines (⊥)",
      turkish: "dik doğrular",
      definition: String.raw`Two lines that intersect to form four congruent angles, each of measure $90^\circ$. Written $k \perp m$.`,
      diagram: { key: `${D}/perpendicular`, props: { highlight: "lines" } },
      source: "MR p. 93; MC p. 7",
    },
    {
      id: "right-angle",
      term: "right angle",
      turkish: "dik açı",
      definition: String.raw`An angle with a measure of $90^\circ$, usually shown by a small square at the vertex.`,
      diagram: { key: `${D}/angle-types`, props: { kind: "right" } },
      source: "MR pp. 93–94",
    },
    {
      id: "acute-angle",
      term: "acute angle",
      turkish: "dar açı",
      definition: String.raw`An angle with measure less than $90^\circ$.`,
      diagram: { key: `${D}/angle-types`, props: { kind: "acute" } },
      source: "MR p. 94",
    },
    {
      id: "obtuse-angle",
      term: "obtuse angle",
      turkish: "geniş açı",
      definition: String.raw`An angle with measure between $90^\circ$ and $180^\circ$.`,
      diagram: { key: `${D}/angle-types`, props: { kind: "obtuse" } },
      source: "MR p. 94",
    },
    {
      id: "parallel",
      term: "parallel lines (∥)",
      turkish: "paralel doğrular",
      definition: String.raw`Two lines in the same plane that do not intersect. Written $k \parallel m$. A third line crossing them forms eight angles: four of measure $x^\circ$ and four of measure $y^\circ$, where $x + y = 180$.`,
      diagram: { key: `${D}/parallel`, props: { highlight: "parallel" } },
      source: "MR pp. 94–95; MC p. 7",
    },
    {
      id: "distance-point-line",
      term: "distance between a point and a line",
      turkish: "noktanın doğruya uzaklığı",
      definition: String.raw`The length of the perpendicular segment from the point to the line, which is the shortest distance between them. The distance between two parallel lines is the distance from a point on one line to the other line.`,
      diagram: { key: `${D}/distance`, props: { kind: "point" } },
      source: "MC p. 8",
    },
    {
      id: "transversal",
      term: "transversal",
      turkish: "kesen (doğru)",
      definition: String.raw`A line that crosses two (or more) other lines, such as line $p$ crossing parallel lines $k$ and $m$.`,
      diagram: { key: `${D}/parallel`, props: { highlight: "transversal" } },
      note: "Not named in the ETS Math Review",
    },
    {
      id: "supplementary",
      term: "supplementary angles",
      turkish: "bütünler açılar",
      definition: String.raw`Two angles whose measures add up to $180^\circ$, such as two neighbouring angles formed by intersecting lines.`,
      formula: String.raw`a + b = 180`,
      diagram: { key: `${D}/angle-pair`, props: { kind: "supplementary" } },
      note: "Not named in the ETS Math Review",
    },
    {
      id: "complementary",
      term: "complementary angles",
      turkish: "tümler açılar",
      definition: String.raw`Two angles whose measures add up to $90^\circ$.`,
      formula: String.raw`a + b = 90`,
      diagram: { key: `${D}/angle-pair`, props: { kind: "complementary" } },
      note: "Not named in the ETS Math Review",
    },
    {
      id: "corresponding-angles",
      term: "corresponding angles",
      turkish: "yöndeş açılar",
      definition: String.raw`Two angles in the same position at the two crossings of a transversal, e.g. both above the line and to the right of the transversal. When the two lines are parallel, corresponding angles are equal.`,
      diagram: { key: `${D}/parallel`, props: { highlight: "corresponding" } },
      note: "Not named in the ETS Math Review",
    },
    {
      id: "alternate-interior-angles",
      term: "alternate interior angles",
      turkish: "iç ters açılar",
      definition: String.raw`Two angles between the two crossed lines and on opposite sides of the transversal. When the two lines are parallel, alternate interior angles are equal.`,
      diagram: { key: `${D}/parallel`, props: { highlight: "alternate" } },
      note: "Not named in the ETS Math Review",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      diagram: {
        key: `${D}/parallel`,
        props: { theta: 62, labels: { k: ["(3x − 5)°", null, null, null], m: [null, null, "(2x + 25)°", null] } },
        caption: NTS,
      },
      stem: String.raw`In the figure above, $k \parallel m$. What is the value of $x$?`,
      choices: [String.raw`$25$`, String.raw`$30$`, String.raw`$32$`, String.raw`$35$`, String.raw`$37$`],
      answer: 2,
      explanation: [
        String.raw`Decide first whether the two angles are equal or add up to $180^\circ$. The upper-left angle at $m$ equals the upper-left angle at $k$ (same position at the two crossings). The labeled angle at $m$ is the lower-left angle there, which is the neighbour of that upper-left angle along line $m$. So the two labeled angles add up to $180^\circ$.`,
        String.raw`Therefore $(3x - 5) + (2x + 25) = 180$, so $5x + 20 = 180$ and $x = 32$.`,
        String.raw`Check: the angles are $91^\circ$ and $89^\circ$, one obtuse and one acute, as they must be. (The figure exaggerates the difference; it is not drawn to scale.)`,
        String.raw`Trap: setting the angles equal gives $3x - 5 = 2x + 25$, $x = 30$, which is choice (B).`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      diagram: {
        key: `${D}/parallel`,
        props: { theta: 62, labels: { k: [null, "x°", null, null], m: [null, "y°", null, null] } },
        caption: NTS,
      },
      given: String.raw`Line $p$ intersects lines $k$ and $m$.`,
      quantityA: String.raw`$x$`,
      quantityB: String.raw`$y$`,
      answer: "D",
      explanation: [
        String.raw`If $k \parallel m$, the two labeled angles are in the same position at the two crossings, so they would be equal and the answer would be (C).`,
        String.raw`But nothing says $k \parallel m$. Lines that look parallel in a figure need not be (MC p. 9). If $m$ is tilted slightly, $y$ changes while $x$ stays the same, so $y$ can be larger or smaller than $x$.`,
        String.raw`Since equality and inequality are both possible, the answer is (D). The parallel-lines explorer above shows this: tilt $m$ and the angles at the two crossings separate.`,
      ],
    },
    {
      id: "ex3",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`$A$, $B$ and $C$ are three different points on a line, with $AB = 9$ and $BC = 4$. Point $M$ is the midpoint of $AB$ and point $N$ is the midpoint of $BC$. Which of the following could be the length $MN$? Indicate all such lengths.`,
      choices: [String.raw`$2.5$`, String.raw`$4$`, String.raw`$5$`, String.raw`$6.5$`, String.raw`$13$`],
      answer: [0, 3],
      explanation: [
        String.raw`Put the points on a number line: $A$ at 0 and $B$ at 9, so $M$ is at 4.5. Since $BC = 4$, $C$ is at $9 + 4 = 13$ or at $9 - 4 = 5$; the order of the points is not given, so both cases count.`,
        String.raw`If $C$ is at 13, $N$ is at $\frac{9 + 13}{2} = 11$ and $MN = 11 - 4.5 = 6.5$.`,
        String.raw`If $C$ is at 5 (between $A$ and $B$), $N$ is at $\frac{9 + 5}{2} = 7$ and $MN = 7 - 4.5 = 2.5$.`,
        String.raw`In general $MN = \frac{9 \pm 4}{2}$. Answer: $2.5$ and $6.5$. Choice $13$ is $AC$ in the first case, not $MN$.`,
      ],
    },
    {
      id: "ex4",
      type: "ne",
      difficulty: "medium",
      diagram: { key: `${D}/three-lines`, caption: NTS },
      stem: String.raw`In the figure above, three lines meet at one point. What is the value of $x$?`,
      answer: { kind: "decimal", value: "44" },
      explanation: [
        String.raw`Three lines through one point form six angles. Each angle is opposite another, so there are only three different measures, and three angles in a row along one side of any of the lines add up to $180^\circ$.`,
        String.raw`The $48^\circ$ angle is opposite the unlabeled angle between $x^\circ$ and $2x^\circ$, so that angle is also $48^\circ$.`,
        String.raw`The angles $x^\circ$, $48^\circ$ and $2x^\circ$ lie along one side of a line: $x + 48 + 2x = 180$, so $3x = 132$ and $x = 44$.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Two lines intersect and one of the four angles measures $38^\circ$. What are the other three?`,
      answer: String.raw`$142^\circ$, $38^\circ$, $142^\circ$`,
      explanation: String.raw`The opposite angle is also $38^\circ$; the two neighbours are $180^\circ - 38^\circ = 142^\circ$.`,
    },
    {
      id: "q2",
      prompt: String.raw`An angle measures $27^\circ$. What measure must a second angle have so that the two add up to $90^\circ$? To $180^\circ$?`,
      answer: String.raw`$63^\circ$ and $153^\circ$`,
      explanation: String.raw`$90 - 27 = 63$ and $180 - 27 = 153$. (Prep books call these pairs complementary and supplementary angles; the ETS Math Review does not name them.)`,
    },
    {
      id: "q3",
      prompt: String.raw`Line $p$ crosses parallel lines $k$ and $m$, and one of the eight angles formed measures $115^\circ$. How many of the eight angles measure $65^\circ$?`,
      answer: String.raw`Four`,
      explanation: String.raw`Four angles measure $115^\circ$ and the other four measure $180^\circ - 115^\circ = 65^\circ$.`,
    },
    {
      id: "q4",
      prompt: String.raw`$M$ is the midpoint of segment $AB$ and $AM = 6.5$. What is $AB$?`,
      answer: String.raw`$13$`,
      explanation: String.raw`The midpoint splits $AB$ into two congruent segments, so $AB = 2 \times 6.5$.`,
    },
    {
      id: "q5",
      prompt: String.raw`Points $A$, $B$ and $C$ are not on one line. Segments $BA$ and $BC$ form two angles at $B$. Which one does "angle $ABC$" mean?`,
      answer: String.raw`The smaller one (less than $180^\circ$)`,
      explanation: String.raw`Unless otherwise indicated, angle $ABC$ is the angle with measure less than $180^\circ$ (MC pp. 8–9).`,
    },
    {
      id: "q6",
      prompt: String.raw`Two lines meet so that all four angles are congruent. What is each angle, and what are the lines called?`,
      answer: String.raw`$90^\circ$; perpendicular lines`,
      explanation: String.raw`Four equal angles that sum to $360^\circ$ are $90^\circ$ each; such lines are perpendicular, $k \perp m$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`Two lines intersect, forming four angles. Two neighbouring angles have measures $x^\circ$ and $y^\circ$, and $x > 2y$.`,
        quantityA: String.raw`$x$`,
        quantityB: String.raw`$120$`,
        answer: "A",
        explanation: [
          String.raw`Neighbouring angles formed by two intersecting lines add up to $180^\circ$, so $y = 180 - x$.`,
          String.raw`Substitute into $x > 2y$: $x > 360 - 2x$, so $3x > 360$ and $x > 120$.`,
          String.raw`Quantity A is greater. (At $x = 120$ exactly, $y = 60$ and $x = 2y$, which the strict inequality rules out.)`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`Line $p$ crosses parallel lines $k$ and $m$. Of the eight angles formed, one measures $(4t)^\circ$ and another measures $(6t - 20)^\circ$.`,
        quantityA: String.raw`$t$`,
        quantityB: String.raw`$15$`,
        answer: "D",
        explanation: [
          String.raw`Any two of the eight angles are either equal or add up to $180^\circ$, and nothing says which case we are in.`,
          String.raw`Equal: $4t = 6t - 20$ gives $t = 10$ (both angles $40^\circ$). Supplementary: $4t + 6t - 20 = 180$ gives $t = 20$ (angles $80^\circ$ and $100^\circ$). Both are valid.`,
          String.raw`(The perpendicular case would need $4t = 6t - 20 = 90$, which is impossible.)`,
          String.raw`$t$ can be 10 (less than 15) or 20 (greater than 15), so the answer is (D).`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "medium",
        given: String.raw`Points $A$, $B$, $C$ and $D$ lie on a line in that order. $AC = 15$, $BD = 19$ and $AD = 26$.`,
        quantityA: String.raw`$BC$`,
        quantityB: String.raw`$AB$`,
        answer: "A",
        explanation: [
          String.raw`Since $B$ lies between $A$ and $D$, $AB = AD - BD = 26 - 19 = 7$.`,
          String.raw`Since $B$ lies between $A$ and $C$, $BC = AC - AB = 15 - 7 = 8$. (Equivalently, the overlap of $AC$ and $BD$ is $BC = AC + BD - AD = 15 + 19 - 26 = 8$.)`,
          String.raw`$8 > 7$, so Quantity A is greater.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "hard",
        diagram: { key: `${D}/zigzag`, caption: NTS },
        stem: String.raw`In the figure above, $k \parallel m$. What is the value of $x$?`,
        choices: [String.raw`$47$`, String.raw`$85$`, String.raw`$95$`, String.raw`$133$`, String.raw`$142$`],
        answer: 1,
        explanation: [
          String.raw`Draw a line through $P$ parallel to $k$ (and so to $m$). It splits the angle at $P$ into an upper part and a lower part.`,
          String.raw`Upper part: line $AP$ crosses the parallel lines $k$ and the new line. The $38^\circ$ angle at $A$ (between $k$ and $AP$) and the upper part at $P$ are alternate angles on opposite sides of $AP$, so they are equal (both are the acute angle that $AP$ makes with the parallel lines). The upper part is $38^\circ$.`,
          String.raw`Lower part: in the same way, line $BP$ makes a $47^\circ$ angle with $m$, so the lower part is $47^\circ$.`,
          String.raw`$x = 38 + 47 = 85$. Traps: $95 = 180 - 85$; $133 = 180 - 47$ and $142 = 180 - 38$ come from taking an obtuse angle where the acute one belongs.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Two lines intersect, forming four angles. The positive difference between the measures of two of these angles is $64^\circ$. What is the measure of the smallest of the four angles?`,
        choices: [String.raw`$26^\circ$`, String.raw`$32^\circ$`, String.raw`$58^\circ$`, String.raw`$64^\circ$`, String.raw`$122^\circ$`],
        answer: 2,
        explanation: [
          String.raw`The four angles have only two different measures, $a$ and $b$, with $a + b = 180$ (opposite angles are equal; neighbours are supplementary). A positive difference must come from one of each.`,
          String.raw`$a + b = 180$ and $a - b = 64$ give $a = 122$ and $b = 58$.`,
          String.raw`The smallest angle is $58^\circ$. Trap: $32^\circ$ is half of the difference, not an angle of the figure.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "medium",
        diagram: { key: `${D}/two-crossing-lines`, caption: NTS },
        stem: String.raw`In the figure above, $k \parallel m$, and lines $p$ and $q$ intersect above line $k$. What is the value of $x$?`,
        choices: [String.raw`$43$`, String.raw`$53$`, String.raw`$62$`, String.raw`$75$`, String.raw`$137$`],
        answer: 0,
        explanation: [
          String.raw`Lines $p$, $q$ and $k$ form a small triangle with one vertex at the intersection of $p$ and $q$. Its angle there is opposite the angle marked $x^\circ$, so it also measures $x^\circ$.`,
          String.raw`Since $k \parallel m$, line $p$ makes the same angle with $k$ as with $m$, in the same position: the triangle's angle where $p$ meets $k$ is $62^\circ$. Likewise the triangle's angle where $q$ meets $k$ is $75^\circ$.`,
          String.raw`The angles of a triangle add up to $180^\circ$ (MC p. 8): $x = 180 - 62 - 75 = 43$.`,
          String.raw`Trap: $137 = 62 + 75$ is the angle supplementary to $x$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        diagram: { key: `${D}/conventions` },
        stem: String.raw`In the figure above, $A$, $D$ and $C$ lie on line $\ell$. Which of the following statements can be concluded from the figure? Indicate all such statements.`,
        choices: [
          String.raw`$D$ lies between $A$ and $C$.`,
          String.raw`Angle $ADB$ is a right angle.`,
          String.raw`$AD < DC$`,
          String.raw`$BD$ is the distance between point $B$ and line $\ell$.`,
          String.raw`Angle $ABC$ is a right angle.`,
        ],
        answer: [0, 1, 3],
        explanation: [
          String.raw`First: yes. Points on a line may be assumed to be in the order shown (MC p. 9).`,
          String.raw`Second: yes. The small square marks angle $BDC$ as $90^\circ$. Angles $ADB$ and $BDC$ are neighbours along line $\ell$, so they add up to $180^\circ$, and angle $ADB$ is $90^\circ$ too.`,
          String.raw`Third: no. Lengths may not be read from a figure; $AD$ only looks shorter than $DC$.`,
          String.raw`Fourth: yes. $BD$ is perpendicular to $\ell$, and the distance between a point and a line is the length of the perpendicular segment (MC p. 8).`,
          String.raw`Fifth: no. Angle $ABC$ looks close to $90^\circ$, but there is no square at $B$ and nothing is given about it.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Two lines intersect, forming four angles. Which of the following could be the sum of the measures of three of the four angles? Indicate all such sums.`,
        choices: [String.raw`$170^\circ$`, String.raw`$180^\circ$`, String.raw`$200^\circ$`, String.raw`$270^\circ$`, String.raw`$350^\circ$`, String.raw`$360^\circ$`],
        answer: [2, 3, 4],
        explanation: [
          String.raw`The four angles add up to $360^\circ$, so three of them add up to $360^\circ$ minus the fourth.`,
          String.raw`Each angle formed by two intersecting lines is greater than $0^\circ$ and less than $180^\circ$ (its neighbour is positive and the two add up to $180^\circ$). So the sum of three is strictly between $180^\circ$ and $360^\circ$.`,
          String.raw`$200^\circ$ (fourth angle $160^\circ$), $270^\circ$ (perpendicular lines) and $350^\circ$ (fourth angle $10^\circ$) all work; $170^\circ$, $180^\circ$ and $360^\circ$ do not.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`Points $P$, $Q$, $R$ and $S$ lie on a line in that order, with $PR = 18$, $QS = 24$ and $PS = 30$. If $M$ is the midpoint of $PR$ and $N$ is the midpoint of $QS$, what is the length $MN$?`,
        answer: { kind: "decimal", value: "9" },
        explanation: [
          String.raw`Use coordinates: $P = 0$ and $S = 30$. Then $R = 18$ and $Q = 30 - 24 = 6$, and the order $P, Q, R, S$ checks out.`,
          String.raw`$M$ is the midpoint of $PR$: $M = \frac{0 + 18}{2} = 9$. $N$ is the midpoint of $QS$: $N = \frac{6 + 30}{2} = 18$.`,
          String.raw`$MN = 18 - 9 = 9$. Trap: $N$ happens to coincide with $R$, which is easy to miss without coordinates.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        diagram: {
          key: `${D}/parallel`,
          props: { theta: 120, labels: { k: ["(2a + b)°", "(5a + b)°", null, null], m: [null, null, null, "(a + 2b)°"] } },
          caption: NTS,
        },
        stem: String.raw`In the figure above, $k \parallel m$. What is the value of $b$?`,
        answer: { kind: "decimal", value: "20" },
        explanation: [
          String.raw`The angle above $k$ left of $p$ and the angle below $m$ right of $p$ are in the same group of four (here both are the acute angle, alternate angles on opposite sides of $p$), so $2a + b = a + 2b$, which gives $a = b$.`,
          String.raw`The two angles above $k$ are neighbours along $k$, so $(2a + b) + (5a + b) = 180$, i.e. $7a + 2b = 180$.`,
          String.raw`With $a = b$: $9b = 180$, so $b = 20$ (and $a = 20$). Check: the angles are $60^\circ$, $120^\circ$ and $60^\circ$.`,
        ],
      },
    ],
  },
};

export default section;
