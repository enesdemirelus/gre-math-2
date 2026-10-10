import type { Section } from "../types";

const NTS = String.raw`Note: Figure not drawn to scale.`;
const D = "3-6-three-dimensional-figures";

const section: Section = {
  id: "3-6-three-dimensional-figures",
  number: "3.6",
  title: "Three-Dimensional Figures",
  part: "geometry",
  mrPages: "112–114",
  summary: String.raw`Rectangular solids, cubes and right circular cylinders: volume as (area of base) $\times$ height, surface area as the sum of the faces, and the space diagonal from two Pythagorean steps. Sphere, cone and pyramid are only named; the GRE hands you their formulas.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Solids on a flat page" },
    {
      kind: "p",
      text: String.raw`The Math Review lists the basic three-dimensional figures as rectangular solids, cubes, cylinders, spheres, pyramids and cones, and then develops only two of them: the [[rectangular-solid|rectangular solid]] and the [[right-circular-cylinder|right circular cylinder]] (MR p. 112). Those two are the ones to know cold. The [[sphere]], the [[cone]] and the [[pyramid]] are named but not developed; if a question needs a formula for one of them, the question will supply it, so there is nothing to memorise.`,
    },
    {
      kind: "p",
      text: String.raw`Solids are drawn in an oblique view: the front face looks like its true shape, and depth recedes up and to the right. Edges you could not see from that viewpoint are drawn dashed. Learn to read such a picture as a box with a hidden back corner, because the GRE never draws a solid with shading or perspective.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/named-solid`, props: { kind: "sphere" }, caption: String.raw`A sphere. Named in the Math Review, but its formulas are not given there.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The rectangular solid" },
    {
      kind: "p",
      text: String.raw`A rectangular solid (also called a rectangular prism) has 6 rectangular surfaces called [[face|faces]]; adjacent faces are perpendicular. Each segment where two faces meet is an [[edge]], and each point where edges meet is a [[vertex]]. There are 12 edges and 8 vertices (MR p. 112). The faces come in three pairs of congruent rectangles: front and back, top and bottom, left and right. That pairing is what makes the surface-area formula short.`,
    },
    {
      kind: "p",
      text: String.raw`The [[dimensions]] of the solid are its length $\ell$, width $w$ and height $h$. A rectangular solid whose six faces are all squares is a [[cube]], and then $\ell = w = h$. A cube is a rectangular solid in the same way that a square is a rectangle.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/solid`, props: { highlight: "dimensions" }, caption: String.raw`Rectangular solid with width $w$, length $\ell$ and height $h$. The dashed edges are hidden behind the front and the top.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Volume and surface area of a box" },
    {
      kind: "p",
      text: String.raw`The [[volume]] of a rectangular solid is the product of its three dimensions: the area $\ell w$ of the base, times the height. The [[surface-area|surface area]] is the sum of the areas of the six faces, and because the faces come in three equal pairs it is twice the sum of the three different face areas (MR pp. 112–113):`,
    },
    { kind: "math", tex: String.raw`V = \ell w h \qquad\qquad A = 2(\ell w + \ell h + wh)`, key: true },
    {
      kind: "p",
      text: String.raw`For a box with $\ell = 7$, $w = 4$ and $h = 3$: $V = 7 \cdot 4 \cdot 3 = 84$ and $A = 2(28 + 21 + 12) = 122$. For a cube of edge $s$ the formulas collapse to $V = s^3$ and $A = 6s^2$; an edge of 5 gives $V = 125$ and $A = 150$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Units, and what scaling does",
      text: String.raw`Volume is measured in cubic units and surface area in square units, so a comparison between "the volume" and "the surface area" of the same solid is only meaningful if the question fixes the dimensions. And scaling is a favourite: multiply every dimension by $k$ and the volume is multiplied by $k^3$ but the surface area only by $k^2$. Doubling the edge of a cube gives 8 times the volume and 4 times the surface area.`,
    },
    {
      kind: "interactive",
      key: `${D}/box-explorer`,
      title: "Rectangular solid explorer",
      caption: String.raw`Change $\ell$, $w$ and $h$ and watch $V$, $A$ and the space diagonal. Set all three equal to get a cube.`,
    },
    {
      kind: "p",
      text: String.raw`Two reverse problems come up constantly. If you know the volume and two dimensions, divide: a box with a $6 \times 5$ base and volume 90 has height $3$. If you know the areas of three faces that meet at a vertex, say $ab$, $ac$ and $bc$, their product is $(abc)^2$, so the volume is the square root of that product; you never need to find the edges.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The diagonal through the box" },
    {
      kind: "p",
      text: String.raw`The longest segment that fits inside a rectangular solid joins two opposite vertices, a [[space-diagonal|space diagonal]]. The Math Review gives no formula for it (it only asks for one in an exercise), but you can always get it with the Pythagorean theorem used twice, which is exactly how the exercise is solved. First take the diagonal $f$ of the base, a right triangle with legs $\ell$ and $w$. Then $f$ and the vertical edge $h$ are the legs of a second right triangle whose hypotenuse is the space diagonal $d$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/solid`, props: { highlight: "diagonals", f: "f", d: "d", w: "w", l: "ℓ", h: "h" }, caption: String.raw`The dashed diagonal $f$ of the base has $f^2 = \ell^2 + w^2$. The space diagonal $d$ has $d^2 = f^2 + h^2$.` },
    },
    { kind: "math", tex: String.raw`d^2 = \ell^2 + w^2 + h^2` },
    {
      kind: "p",
      text: String.raw`For a $3 \times 4 \times 12$ box, the base diagonal is $\sqrt{9 + 16} = 5$ and the space diagonal is $\sqrt{25 + 144} = 13$. For a cube of edge $s$ it is $s\sqrt{3}$. (The shortcut $d^2 = \ell^2 + w^2 + h^2$ is a consequence of the theorem, not an ETS formula, so on the test it is safest to be able to rebuild it from the two steps.) A rod that is 15 long will not fit inside that box; a rod 13 long just fits.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE hides it",
      text: String.raw`The words are usually "the distance between two opposite corners", "the longest straight rod that fits", or just a segment drawn through the solid in a figure. In a Quantitative Comparison, remember that the first Pythagorean step is on a face, so the diagonal of one face is always shorter than the space diagonal.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The right circular cylinder" },
    {
      kind: "p",
      text: String.raw`A circular [[cylinder]] has two [[cylinder-base|bases]] that are congruent circles in parallel planes, and a [[lateral-surface|lateral surface]] made of all the segments that join points of the two circles and are parallel to the segment joining the centers. That last segment is the [[axis]]. When the axis is perpendicular to the bases the cylinder is a right circular cylinder, which is what you picture as a can, and its [[height]] is the length of the axis (MR p. 113). Throughout this section "cylinder" will mean a right circular cylinder.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/cylinder`, props: { highlight: "all" }, caption: String.raw`Right circular cylinder with centers $P$ and $Q$, axis $PQ$ (dashed) perpendicular to both bases, radius $r$ and height $h = PQ$.` },
    },
    {
      kind: "p",
      text: String.raw`The volume of a right circular cylinder is the product of its height and the area of the base, which is a circle (MR p. 114); it is the same idea as the box, where the base area is $\ell w$. The surface area is the two bases plus the lateral surface:`,
    },
    { kind: "math", tex: String.raw`V = \pi r^2 h \qquad\qquad A = 2(\pi r^2) + 2\pi r h`, key: true },
    {
      kind: "p",
      text: String.raw`The term $2\pi r h$ is easy to remember once you unroll the can. Cut the lateral surface along a vertical line and flatten it: it becomes a rectangle whose height is $h$ and whose width is the circumference $2\pi r$ of the base. For $r = 5$ and $h = 8$: $V = \pi(25)(8) = 200\pi$ and $A = 2\pi(25) + 2\pi(5)(8) = 50\pi + 80\pi = 130\pi$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/cylinder-net`, caption: String.raw`The net of a cylinder: two circles and one rectangle of width $2\pi r$ and height $h$.` },
    },
    {
      kind: "interactive",
      key: `${D}/cylinder-explorer`,
      title: "Cylinder explorer",
      caption: String.raw`Change $r$ and $h$. The unrolled side is a $2\pi r \times h$ rectangle, so the lateral area is its area. Doubling $r$ quadruples the volume, while doubling $h$ only doubles it.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Pouring and filling",
      text: String.raw`Many cylinder questions are volume-conservation questions: liquid poured from one container into another keeps its volume, so set the two volumes equal and solve for the unknown depth. Keep $\pi$ symbolic; it often cancels or lands in the answer choices as a factor. Watch whether the question gives a radius or a diameter.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Most three-dimensional questions reduce to a handful of moves: area of the base times height for volume, three pairs of faces (or two bases and an unrolled rectangle) for surface area, and the Pythagorean theorem for any diagonal. Ask yourself first which of those the question wants, then write the dimensions down before touching a formula.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Using the diameter as the radius; forgetting that a closed cylinder has two bases (or including a base that an open can does not have); treating the surface area of a box as just three faces; adding the three dimensions to get the diagonal; mixing cubic and square units; and forgetting that a cube is a rectangular solid, so a statement about "a rectangular solid" includes it.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "rectangular-solid",
      term: "rectangular solid",
      turkish: String.raw`dikdörtgenler prizması`,
      definition: String.raw`A solid with 6 rectangular faces in which adjacent faces are perpendicular; also called a rectangular prism. It has 12 edges and 8 vertices.`,
      diagram: { key: `${D}/solid`, props: { highlight: "none" } },
      source: "MR p. 112",
    },
    {
      id: "face",
      term: "face",
      turkish: String.raw`yüz`,
      definition: String.raw`One of the 6 rectangular surfaces of a rectangular solid. Adjacent faces are perpendicular to each other.`,
      diagram: { key: `${D}/solid`, props: { highlight: "face" } },
      source: "MR p. 112",
    },
    {
      id: "edge",
      term: "edge",
      turkish: String.raw`ayrıt`,
      definition: String.raw`A line segment that is the intersection of two faces of a rectangular solid. There are 12 edges.`,
      diagram: { key: `${D}/solid`, props: { highlight: "edge" } },
      source: "MR p. 112",
    },
    {
      id: "vertex",
      term: "vertex",
      turkish: String.raw`köşe`,
      definition: String.raw`A point at which edges of a rectangular solid intersect. There are 8 vertices.`,
      diagram: { key: `${D}/solid`, props: { highlight: "vertex" } },
      source: "MR p. 112",
    },
    {
      id: "dimensions",
      term: "dimensions",
      turkish: String.raw`boyutlar (ayrıt uzunlukları)`,
      definition: String.raw`The length $\ell$, the width $w$ and the height $h$ of a rectangular solid.`,
      diagram: { key: `${D}/solid`, props: { highlight: "dimensions" } },
      source: "MR p. 112",
    },
    {
      id: "cube",
      term: "cube",
      turkish: String.raw`küp`,
      definition: String.raw`A rectangular solid with six square faces; $\ell = w = h$.`,
      formula: String.raw`V = s^3,\quad A = 6s^2`,
      diagram: { key: `${D}/solid`, props: { cube: true, highlight: "dimensions" } },
      source: "MR p. 112",
    },
    {
      id: "volume",
      term: "volume",
      turkish: String.raw`hacim`,
      definition: String.raw`For a rectangular solid, the product of its three dimensions. For a right circular cylinder, the product of the height and the area of the base.`,
      formula: String.raw`V = \ell w h \quad\text{and}\quad V = \pi r^2 h`,
      diagram: { key: `${D}/solid`, props: { highlight: "dimensions" } },
      source: "MR pp. 112–114",
    },
    {
      id: "surface-area",
      term: "surface area",
      turkish: String.raw`yüzey alanı (alan)`,
      definition: String.raw`The sum of the areas of all the faces of a solid. For a rectangular solid, the six faces; for a right circular cylinder, the two bases plus the lateral surface.`,
      formula: String.raw`A = 2(\ell w + \ell h + wh) \quad\text{and}\quad A = 2\pi r^2 + 2\pi r h`,
      diagram: { key: `${D}/solid`, props: { highlight: "face" } },
      source: "MR pp. 113–114",
    },
    {
      id: "space-diagonal",
      term: "space diagonal",
      turkish: String.raw`cisim köşegeni`,
      definition: String.raw`A segment joining two opposite vertices of a rectangular solid. Its length comes from the Pythagorean theorem applied twice.`,
      formula: String.raw`d = \sqrt{\ell^2 + w^2 + h^2}`,
      diagram: { key: `${D}/solid`, props: { highlight: "diagonals", f: "f", d: "d" } },
      note: "Not named in the ETS Math Review",
    },
    {
      id: "cylinder",
      term: "circular cylinder",
      turkish: String.raw`dairesel silindir`,
      definition: String.raw`A solid with two bases that are congruent circles in parallel planes and a lateral surface made of all segments that join points on the two circles and are parallel to the segment joining the centers.`,
      diagram: { key: `${D}/cylinder`, props: { highlight: "none", construction: false, h: "" } },
      source: "MR p. 113",
    },
    {
      id: "cylinder-base",
      term: "bases (of a cylinder)",
      turkish: String.raw`taban`,
      definition: String.raw`The two congruent circles, lying in parallel planes, that bound a cylinder at its ends.`,
      diagram: { key: `${D}/cylinder`, props: { highlight: "base", construction: false, h: "" } },
      source: "MR p. 113",
    },
    {
      id: "lateral-surface",
      term: "lateral surface",
      turkish: String.raw`yanal yüzey`,
      definition: String.raw`The curved surface of a cylinder, made of all segments that join points on the two bases and are parallel to the axis. Its area for a right circular cylinder is $2\pi r h$.`,
      formula: String.raw`2\pi r h`,
      diagram: { key: `${D}/cylinder`, props: { highlight: "lateral", construction: false, h: "" } },
      source: "MR pp. 113–114",
    },
    {
      id: "axis",
      term: "axis",
      turkish: String.raw`eksen`,
      definition: String.raw`The segment joining the centers of the two bases of a cylinder (segment $PQ$ in the figure).`,
      diagram: { key: `${D}/cylinder`, props: { highlight: "axis" } },
      source: "MR p. 113",
    },
    {
      id: "right-circular-cylinder",
      term: "right circular cylinder",
      turkish: String.raw`dik dairesel silindir`,
      definition: String.raw`A circular cylinder whose axis is perpendicular to its bases.`,
      formula: String.raw`V = \pi r^2 h`,
      diagram: { key: `${D}/cylinder`, props: { highlight: "all" } },
      source: "MR p. 113",
    },
    {
      id: "height",
      term: "height (of a right circular cylinder)",
      turkish: String.raw`yükseklik`,
      definition: String.raw`The perpendicular distance between the two bases, which equals the length of the axis.`,
      diagram: { key: `${D}/cylinder`, props: { highlight: "axis" } },
      source: "MR p. 113",
    },
    {
      id: "sphere",
      term: "sphere",
      turkish: String.raw`küre`,
      definition: String.raw`A round solid, the three-dimensional analogue of a circle. The Math Review names it but gives no formulas; a question that needs one will state it.`,
      diagram: { key: `${D}/named-solid`, props: { kind: "sphere" } },
      note: "Named but not developed in the ETS Math Review",
      source: "MR p. 112",
    },
    {
      id: "cone",
      term: "cone",
      turkish: String.raw`koni`,
      definition: String.raw`A solid with a circular base and a single apex point. Named in the Math Review without formulas.`,
      diagram: { key: `${D}/named-solid`, props: { kind: "cone" } },
      note: "Named but not developed in the ETS Math Review",
      source: "MR p. 112",
    },
    {
      id: "pyramid",
      term: "pyramid",
      turkish: String.raw`piramit`,
      definition: String.raw`A solid with a polygonal base and triangular faces meeting at an apex. Named in the Math Review without formulas.`,
      diagram: { key: `${D}/named-solid`, props: { kind: "pyramid" } },
      note: "Named but not developed in the ETS Math Review",
      source: "MR p. 112",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`Three faces of a rectangular solid that meet at one vertex have areas 12, 15 and 20. What is the volume of the solid?`,
      choices: [String.raw`$30$`, String.raw`$47$`, String.raw`$60$`, String.raw`$94$`, String.raw`$3600$`],
      answer: 2,
      explanation: [
        String.raw`Let the dimensions be $a$, $b$, $c$ with $ab = 12$, $ac = 20$, $bc = 15$.`,
        String.raw`Multiply the three equations: $(ab)(ac)(bc) = (abc)^2 = 12 \cdot 20 \cdot 15 = 3600$, so $V = abc = \sqrt{3600} = 60$.`,
        String.raw`Check: the dimensions are 4, 3 and 5 ($4 \cdot 3 = 12$, $4 \cdot 5 = 20$, $3 \cdot 5 = 15$) and $4 \cdot 3 \cdot 5 = 60$.`,
        String.raw`Traps: 3600 forgets the square root; 47 adds the areas; 94 is the surface area, $2(12 + 20 + 15)$.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`A right circular cylinder has radius $r > 0$ and height $2r$.`,
      quantityA: String.raw`The volume of the cylinder`,
      quantityB: String.raw`The surface area of the cylinder`,
      answer: "D",
      explanation: [
        String.raw`Volume: $V = \pi r^2 (2r) = 2\pi r^3$.`,
        String.raw`Surface area: $A = 2\pi r^2 + 2\pi r (2r) = 2\pi r^2 + 4\pi r^2 = 6\pi r^2$.`,
        String.raw`Compare: $2\pi r^3 > 6\pi r^2$ exactly when $r > 3$. For $r = 5$ the volume is $250\pi$ and the area $150\pi$ (A is greater); for $r = 1$ they are $2\pi$ and $6\pi$ (B is greater); for $r = 3$ both equal $54\pi$.`,
        String.raw`Volume and surface area have different units (cubic and square), so their size depends on the unit; the relationship changes with $r$. The answer is (D).`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "hard",
      diagram: { key: `${D}/solid`, props: { highlight: "diagonals", w: "8", l: "8", h: "h", d: "12" }, caption: NTS },
      stem: String.raw`A rectangular solid has a square base with sides of length 8. The distance between two opposite vertices of the solid, along the dashed space diagonal, is 12. What is the height $h$ of the solid?`,
      answer: { kind: "decimal", value: "4" },
      explanation: [
        String.raw`The diagonal of the square base is $f = \sqrt{8^2 + 8^2} = 8\sqrt{2}$, so $f^2 = 128$.`,
        String.raw`The space diagonal is the hypotenuse of a right triangle with legs $f$ and $h$: $12^2 = f^2 + h^2$, so $144 = 128 + h^2$.`,
        String.raw`$h^2 = 16$, so $h = 4$. You never need $f$ itself, only $f^2$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`The volume of a right circular cylinder is $V$. Which of the following changes would double the volume? Indicate all such changes.`,
      choices: [
        String.raw`Double the height and keep the radius.`,
        String.raw`Double the radius and keep the height.`,
        String.raw`Multiply the radius by $\sqrt{2}$ and keep the height.`,
        String.raw`Double the radius and halve the height.`,
        String.raw`Double both the radius and the height.`,
      ],
      answer: [0, 2, 3],
      explanation: [
        String.raw`Volume is $\pi r^2 h$, so a change multiplies it by (factor on $r$)$^2$ $\times$ (factor on $h$).`,
        String.raw`First: $1^2 \cdot 2 = 2$. Yes. Second: $2^2 \cdot 1 = 4$. No.`,
        String.raw`Third: $(\sqrt{2})^2 \cdot 1 = 2$. Yes. Fourth: $2^2 \cdot \tfrac{1}{2} = 2$. Yes. Fifth: $2^2 \cdot 2 = 8$. No.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`A cube has volume 27. What is its surface area?`,
      answer: String.raw`$54$`,
      explanation: String.raw`The edge is $\sqrt[3]{27} = 3$, so $A = 6 \cdot 3^2 = 54$.`,
    },
    {
      id: "q2",
      prompt: String.raw`How many edges and how many vertices does a rectangular solid have?`,
      answer: String.raw`$12$ edges and $8$ vertices`,
      explanation: String.raw`(MR p. 112.)`,
    },
    {
      id: "q3",
      prompt: String.raw`A rectangular solid has dimensions $3$, $5$ and $8$. Find $V$ and $A$.`,
      answer: String.raw`$V = 120$, $A = 158$`,
      explanation: String.raw`$V = 3 \cdot 5 \cdot 8$; $A = 2(15 + 24 + 40) = 158$.`,
    },
    {
      id: "q4",
      prompt: String.raw`A right circular cylinder has radius 4 and height 10. Find $V$ and $A$.`,
      answer: String.raw`$V = 160\pi$, $A = 112\pi$`,
      explanation: String.raw`$V = \pi(16)(10)$; $A = 2\pi(16) + 2\pi(4)(10) = 32\pi + 80\pi$.`,
    },
    {
      id: "q5",
      prompt: String.raw`The side of a cylinder with $r = 3$ and $h = 7$ is cut open and unrolled. What are the dimensions and the area of the rectangle?`,
      answer: String.raw`$6\pi$ by $7$; area $42\pi$`,
      explanation: String.raw`The width is the circumference $2\pi r = 6\pi$ and the height is $h = 7$.`,
    },
    {
      id: "q6",
      prompt: String.raw`What is the length of the space diagonal of a $2 \times 3 \times 6$ box?`,
      answer: String.raw`$7$`,
      explanation: String.raw`$\sqrt{4 + 9 + 36} = \sqrt{49} = 7$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`A cube has surface area 150.`,
        quantityA: String.raw`The volume of the cube`,
        quantityB: String.raw`$120$`,
        answer: "A",
        explanation: [
          String.raw`$6s^2 = 150$ gives $s^2 = 25$ and $s = 5$.`,
          String.raw`$V = s^3 = 125 > 120$, so Quantity A is greater.`,
          String.raw`Trap: dividing 150 by 6 and stopping (25), or cubing 25.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`A right circular cylinder has height 10 and radius $r$. The area of its lateral surface equals the combined area of its two bases.`,
        quantityA: String.raw`$r$`,
        quantityB: String.raw`$10$`,
        answer: "C",
        explanation: [
          String.raw`Lateral surface $= 2\pi r(10) = 20\pi r$; two bases $= 2\pi r^2$.`,
          String.raw`Set them equal: $20\pi r = 2\pi r^2$, and since $r > 0$, $r = 10$.`,
          String.raw`The quantities are equal. (In general the two areas match when $r = h$.)`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`A rectangular solid has volume 36, and each of its dimensions is a positive integer.`,
        quantityA: String.raw`The surface area of the solid`,
        quantityB: String.raw`$72$`,
        answer: "D",
        explanation: [
          String.raw`List the possible dimension triples: $(3, 3, 4)$ gives $A = 2(9 + 12 + 12) = 66$, while $(1, 1, 36)$ gives $A = 2(1 + 36 + 36) = 146$.`,
          String.raw`One value is below 72 and the other above it, so the comparison cannot be determined. (The triple $(2, 3, 6)$ gives exactly 72.)`,
          String.raw`The more cube-like the box, the smaller the surface area for a fixed volume; the trap is to assume a single "typical" box.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A right circular cylinder with radius 3 and height 10 is full of water. All the water is poured into an empty rectangular tank with a horizontal base measuring 6 by 5. What is the depth of the water in the tank?`,
        choices: [String.raw`$3$`, String.raw`$6$`, String.raw`$3\pi$`, String.raw`$6\pi$`, String.raw`$9\pi$`],
        answer: 2,
        explanation: [
          String.raw`Volume of water $= \pi(3^2)(10) = 90\pi$.`,
          String.raw`In the tank, volume $=$ (base area)(depth) $= 30 \cdot d$.`,
          String.raw`$30d = 90\pi$ gives $d = 3\pi \approx 9.42$. Trap: dropping the $\pi$ gives 3.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`The sum of the lengths of all 12 edges of a rectangular solid is 60, and its surface area is 144. What is the length of a space diagonal of the solid?`,
        choices: [String.raw`$7$`, String.raw`$8$`, String.raw`$9$`, String.raw`$12$`, String.raw`$15$`],
        answer: 2,
        explanation: [
          String.raw`The 12 edges are four copies of each dimension, so $4(\ell + w + h) = 60$ and $\ell + w + h = 15$.`,
          String.raw`Square it: $(\ell + w + h)^2 = \ell^2 + w^2 + h^2 + 2(\ell w + \ell h + wh)$. The last bracket is half the surface area, so $2(\ldots) = 144$.`,
          String.raw`$d^2 = \ell^2 + w^2 + h^2 = 225 - 144 = 81$, so $d = 9$ (for instance a $3 \times 6 \times 6$ box).`,
          String.raw`Traps: 15 is the sum of the dimensions; 12 is $\sqrt{144}$.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`A cylindrical can with a closed bottom and no top has diameter 10 and height 12. How many square units of sheet metal are needed to make the can?`,
        choices: [String.raw`$120\pi$`, String.raw`$145\pi$`, String.raw`$170\pi$`, String.raw`$340\pi$`, String.raw`$440\pi$`],
        answer: 1,
        explanation: [
          String.raw`The radius is half the diameter: $r = 5$.`,
          String.raw`One base: $\pi r^2 = 25\pi$. Lateral surface: $2\pi r h = 2\pi(5)(12) = 120\pi$.`,
          String.raw`Total: $25\pi + 120\pi = 145\pi$.`,
          String.raw`Traps: $120\pi$ forgets the bottom, $170\pi$ adds a second base (a closed can), and $340\pi$ uses 10 as the radius.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`A rectangular solid has a base that measures 6 by 8, and its height is a positive integer. Which of the following could be the length of a space diagonal of the solid? Indicate all such lengths.`,
        choices: [String.raw`$10$`, String.raw`$\sqrt{101}$`, String.raw`$12$`, String.raw`$\sqrt{200}$`, String.raw`$26$`],
        answer: [1, 3, 4],
        explanation: [
          String.raw`The base diagonal is $\sqrt{36 + 64} = 10$, so $d^2 = 100 + h^2$ with $h$ a positive integer.`,
          String.raw`$10$: needs $h = 0$, no. $\sqrt{101}$: $h = 1$, yes. $12$: $h^2 = 44$, not a perfect square, no. $\sqrt{200}$: $h = 10$, yes. $26$: $676 - 100 = 576$, $h = 24$, yes.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`A right circular cylinder has radius 2 and height 9. Which of the following right circular cylinders have the same volume as this one? Indicate all such cylinders.`,
        choices: [
          String.raw`radius 3 and height 4`,
          String.raw`diameter 12 and height 1`,
          String.raw`radius 1 and height 18`,
          String.raw`radius 4 and height 3`,
          String.raw`radius $\sqrt{3}$ and height 12`,
          String.raw`diameter 3 and height 16`,
        ],
        answer: [0, 1, 4, 5],
        explanation: [
          String.raw`The volume is $\pi(2^2)(9) = 36\pi$, so we need $r^2 h = 36$.`,
          String.raw`$r^2 h$ for each: $9 \cdot 4 = 36$ yes; diameter 12 means $r = 6$, $36 \cdot 1 = 36$ yes; $1 \cdot 18 = 18$ no; $16 \cdot 3 = 48$ no; $3 \cdot 12 = 36$ yes; diameter 3 means $r = 1.5$, $2.25 \cdot 16 = 36$ yes.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        diagram: { key: `${D}/solid`, props: { cube: true, highlight: "diagonals", d: "10√3" }, caption: NTS },
        stem: String.raw`The space diagonal of a cube has length $10\sqrt{3}$. What is the surface area of the cube?`,
        answer: { kind: "decimal", value: "600" },
        explanation: [
          String.raw`For a cube of edge $s$, the face diagonal is $s\sqrt{2}$ and the space diagonal is $\sqrt{2s^2 + s^2} = s\sqrt{3}$.`,
          String.raw`$s\sqrt{3} = 10\sqrt{3}$ gives $s = 10$.`,
          String.raw`Surface area $= 6s^2 = 600$. (Trap: 1000 is the volume.)`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`A rectangular sheet of metal measures 20 by 8. It is rolled, without overlap, into the lateral surface of a right circular cylinder of height 8, so that the two edges of length 8 meet. What is the volume of the cylinder? Give your answer to the nearest whole number.`,
        answer: { kind: "decimal", value: "255" },
        explanation: [
          String.raw`The side of length 20 becomes the circumference of the base: $2\pi r = 20$, so $r = \frac{10}{\pi}$.`,
          String.raw`$V = \pi r^2 h = \pi \cdot \frac{100}{\pi^2} \cdot 8 = \frac{800}{\pi} \approx 254.6$.`,
          String.raw`To the nearest whole number the volume is 255. (Trap: using 20 as the diameter or the radius.)`,
        ],
      },
    ],
  },
};

export default section;
