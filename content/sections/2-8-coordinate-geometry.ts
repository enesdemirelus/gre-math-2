import type { Section } from "../types";

const D = "2-8-coordinate-geometry";

const section: Section = {
  id: "2-8-coordinate-geometry",
  number: "2.8",
  title: "Coordinate Geometry",
  part: "algebra",
  mrPages: "61–72",
  summary: String.raw`The $xy$-plane as the GRE uses it: quadrants and reflections, distance through the Pythagorean theorem, slope and $y = mx + b$, intercepts, parallel and perpendicular lines, linear inequalities as shaded half-planes, and the graphs of parabolas and circles.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The xy-plane" },
    {
      kind: "p",
      text: String.raw`Take two real number lines, one horizontal and one vertical, and let them cross at right angles at their zero points. The result is a [[coordinate-system|rectangular coordinate system]], which ETS also calls the $xy$-coordinate system or simply the $xy$-plane. The horizontal number line is the [[x-axis]], the vertical one is the [[y-axis]], and the point where they meet is the [[origin]], written $O$. As on any number line, the positive direction of the $x$-axis is to the right and the positive direction of the $y$-axis is upward (MR p. 61).`,
    },
    {
      kind: "p",
      text: String.raw`Every point of the plane corresponds to an [[ordered-pair|ordered pair]] $(x, y)$ of real numbers. The first number is the [[x-coordinate]] and the second is the [[y-coordinate]]. The point $A(-3, 2)$ in the figure is 3 units to the _left_ of the $y$-axis (because $x$ is negative) and 2 units _above_ the $x$-axis. A point with $x = 0$ lies on the $y$-axis, a point with $y = 0$ lies on the $x$-axis, and the origin is $(0, 0)$. Unless a question says otherwise, one unit on the $x$-axis has the same length as one unit on the $y$-axis (MR p. 62).`,
    },
    {
      kind: "p",
      text: String.raw`The two axes cut the plane into four [[quadrant|quadrants]], numbered I, II, III, IV counterclockwise starting from the upper right. The signs of the coordinates tell you the quadrant at once: I is $(+, +)$, II is $(-, +)$, III is $(-, -)$ and IV is $(+, -)$. The axes are the boundaries between quadrants, so a point on an axis is not in any quadrant.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/quadrants`, caption: String.raw`The four quadrants, and the point $A(-3, 2)$ in Quadrant II.` },
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Coordinate planes are drawn to scale",
      text: String.raw`Ordinary geometry figures on the GRE are not necessarily drawn to scale, but coordinate systems are. Grid lines and tick marks are evenly spaced unless noted, and you may read, estimate or compare quantities from the picture (MC pp. 10–11). Reading gives an estimate, though. When an answer must be exact, compute it from the coordinates or the equation.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Reflections and symmetry" },
    {
      kind: "p",
      text: String.raw`Points whose coordinates differ only in sign are mirror images of one another. For $P(3, 5)$: the point $R(3, -5)$ is the [[reflection]] of $P$ about the $x$-axis, the point $S(-3, 5)$ is its reflection about the $y$-axis, and $T(-3, -5)$ is its reflection about the origin. Equivalently, $P$ and $R$ are [[symmetric|symmetric about the x-axis]], $P$ and $S$ are symmetric about the $y$-axis, and $P$ and $T$ are symmetric about the origin (MR p. 63). The MR shows this with one example; the general pattern is:`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{aligned} &\text{about the } x\text{-axis:} && (a, b) \to (a, -b)\\ &\text{about the } y\text{-axis:} && (a, b) \to (-a, b)\\ &\text{about the origin:} && (a, b) \to (-a, -b) \end{aligned}`,
      key: true,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/reflections`, caption: String.raw`$R$, $S$ and $T$ are the reflections of $P(3, 5)$ about the $x$-axis, the $y$-axis and the origin.` },
    },
    {
      kind: "p",
      text: String.raw`One more mirror matters. The line $y = x$ passes through the origin with slope 1, at a $45^\circ$ angle to each axis, and reflecting about it simply swaps the coordinates: the reflection of $(a, b)$ about the line $y = x$ is $(b, a)$ (MR p. 69). So $P(3, 5)$ reflects to $(5, 3)$. A reflection about the origin is the same as reflecting about one axis and then the other, which is why $T$ is two sign changes away from $P$.`,
    },
    {
      kind: "interactive",
      key: `${D}/reflection-explorer`,
      title: "Reflection explorer",
      caption: String.raw`Drag $P$ to any lattice point and switch the mirrors on and off. Watch which coordinate changes sign, and which quadrant each image lands in.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Which coordinate flips?",
      text: String.raw`Reflecting about the $x$-axis keeps $x$ and flips the sign of $y$; it is easy to get this backwards. Think of the axis as the mirror: points on the $x$-axis stay put, so the $x$-coordinate cannot change.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Distance: draw the right triangle" },
    {
      kind: "p",
      text: String.raw`The Math Review finds the [[distance]] between two points with the Pythagorean theorem, not with a special formula (MR pp. 63–64). To find $AB$ for $A(-2, -1)$ and $B(4, 7)$, draw a horizontal segment from $A$ and a vertical segment from $B$; they meet at $C(4, -1)$ with a right angle. The horizontal leg has length $4 - (-2) = 6$ (the difference of the $x$-coordinates) and the vertical leg has length $7 - (-1) = 8$ (the difference of the $y$-coordinates). $AB$ is the hypotenuse.`,
    },
    { kind: "math", tex: String.raw`AB = \sqrt{6^2 + 8^2} = \sqrt{100} = 10` },
    {
      kind: "diagram",
      diagram: { key: `${D}/distance`, caption: String.raw`The legs are the differences of the coordinates: $AC = 6$ and $CB = 8$, so $AB = 10$.` },
    },
    {
      kind: "p",
      text: String.raw`Written once in general, the same right triangle gives the distance formula below. It is a standard formula, though not stated in the ETS Math Review; the triangle picture is what the MR teaches, and it is often faster because the legs are usually small integers that form a familiar right triangle (3-4-5, 5-12-13, 8-15-17 or a multiple).`,
    },
    { kind: "math", tex: String.raw`\text{distance} = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`, key: true },
    {
      kind: "aside",
      tone: "tip",
      title: "Midpoint (not in the Math Review)",
      text: String.raw`The [[midpoint]] of the segment joining $(x_1, y_1)$ and $(x_2, y_2)$ is $\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$, the average of the coordinates. This is a standard fact, though not stated in the ETS Math Review. For $A(-2, -1)$ and $B(4, 7)$ the midpoint is $(1, 3)$. It is handy when a question gives the endpoints of a diameter and asks for the center of the circle.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Graphs, lines and slope" },
    {
      kind: "p",
      text: String.raw`The [[graph-of-equation|graph of an equation]] in $x$ and $y$ is the set of all points $(x, y)$ whose coordinates satisfy the equation (MR p. 64). This definition is worth taking literally: a point lies on a graph exactly when its coordinates make the equation true. "Does the line pass through $(5, 2)$?" means "is $(5, 2)$ a solution?"`,
    },
    {
      kind: "p",
      text: String.raw`The graph of $y = mx + b$ is a straight line. The number $m$ is its [[slope]] and $b$ is its [[y-intercept]] (MR p. 64). For two points $(x_1, y_1)$ and $(x_2, y_2)$ on a line with $x_1 \neq x_2$, the slope is the change in $y$ divided by the change in $x$, which the MR calls [[rise-over-run|"rise over run"]] (MR p. 65).`,
    },
    { kind: "math", tex: String.raw`\text{slope} = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\text{rise}}{\text{run}}`, key: true },
    {
      kind: "p",
      text: String.raw`For the line through $P(-1, -1)$ and $Q(3, 5)$, the rise is $5 - (-1) = 6$ and the run is $3 - (-1) = 4$, so the slope is $\frac{6}{4} = \frac{3}{2}$. Subtract in the same order on top and bottom; either order works as long as you are consistent. A positive slope means the line rises to the right, a negative slope means it falls, and a larger $|m|$ means a steeper line.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/slope`, caption: String.raw`From $P$ to $Q$ the line runs 4 and rises 6, so the slope is $\frac{3}{2}$.` },
    },
    {
      kind: "p",
      text: String.raw`To get the equation, put the slope into $y = \frac{3}{2}x + b$ and substitute either point to find $b$. Using $Q(3, 5)$: $5 = \frac{9}{2} + b$, so $b = \frac{1}{2}$ and the line is $y = \frac{3}{2}x + \frac{1}{2}$. In the figure the line seems to cross the $y$-axis "a little above 0"; only the substitution gives the exact value $\frac{1}{2}$ (MR p. 66).`,
    },
    {
      kind: "p",
      text: String.raw`Two special cases. A [[horizontal-line|horizontal line]] has rise 0 between any two of its points, so its slope is 0 and its equation is $y = b$. A [[vertical-line|vertical line]] has run 0, so its slope is _not defined_, and its equation is $x = a$, where $a$ is its $x$-intercept (MR p. 65).`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/horiz-vert`, caption: String.raw`The horizontal line $y = -2$ has slope 0; the vertical line $x = 3$ has no slope.` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Zero slope vs. no slope",
      text: String.raw`"Slope 0" is a horizontal line; "slope undefined" is a vertical line. A vertical line cannot be written as $y = mx + b$ at all, which is why the MR's slope formula requires $x_1 \neq x_2$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Intercepts" },
    {
      kind: "p",
      text: String.raw`The [[x-intercept|x-intercepts]] of a graph are the $x$-coordinates of the points where it meets the $x$-axis, and the $y$-intercepts are the $y$-coordinates of the points where it meets the $y$-axis. Sometimes the same words name the intersection points themselves (MR p. 64; MC p. 11). Points on the $x$-axis have $y = 0$ and points on the $y$-axis have $x = 0$, which gives the working rule (MR p. 67):`,
    },
    {
      kind: "math",
      tex: String.raw`x\text{-intercept: set } y = 0 \qquad\quad y\text{-intercept: set } x = 0`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`For $y = \frac{3}{2}x + \frac{1}{2}$, setting $y = 0$ gives $x = -\frac{1}{3}$, so the $x$-intercept is $-\frac{1}{3}$ (the point $(-\frac{1}{3}, 0)$), and setting $x = 0$ gives the $y$-intercept $\frac{1}{2}$. When the equation comes in the form $ax + by = c$, you don't need to solve for $y$ first: for $3x - 4y = 24$, putting $y = 0$ gives $x = 8$ and putting $x = 0$ gives $y = -6$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Number or point?",
      text: String.raw`ETS usually means a number: "the $x$-intercept is 8." Occasionally it means the point $(8, 0)$. The context makes it clear (an answer like $(8, 0)$ is a point), but never answer "8" when the question asks for the $y$-intercept: the two intercepts are almost always different numbers.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Parallel and perpendicular lines" },
    {
      kind: "p",
      text: String.raw`Slopes decide how lines sit relative to each other. [[parallel-lines|Parallel lines]] have equal slopes, and [[perpendicular-lines|perpendicular lines]] have slopes that are negative reciprocals of each other (MR p. 65). The negative reciprocal of $m$ is $-\frac{1}{m}$, so the product of the two slopes is $-1$.`,
    },
    { kind: "math", tex: String.raw`\text{parallel: } m_1 = m_2 \qquad\quad \text{perpendicular: } m_2 = -\frac{1}{m_1}\ \ (m_1 m_2 = -1)`, key: true },
    {
      kind: "p",
      text: String.raw`So $y = 2x + 3$ is parallel to $y = 2x - 1$, and $y = -\frac{1}{2}x + 2$ is perpendicular to both. Two lines with the same slope and the same $y$-intercept are not two parallel lines but one line, so on the GRE "parallel" lines with equal slopes have different intercepts and never meet.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/parallel-perp`, caption: String.raw`$\ell$: $y = 2x - 1$ and $m$: $y = 2x + 3$ are parallel (slope 2). $n$: $y = -\frac{1}{2}x + 2$ is perpendicular to both (slope $-\frac{1}{2}$).` },
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`The perpendicular slope needs _both_ changes: flip the fraction and change the sign. The perpendicular to slope $\frac{2}{3}$ is $-\frac{3}{2}$, not $\frac{3}{2}$ (that is just the reciprocal) and not $-\frac{2}{3}$. One case falls outside the slope rule: a horizontal line and a vertical line are perpendicular, although the vertical one has no slope (a standard fact, though not stated in the ETS Math Review).`,
    },
    {
      kind: "p",
      text: String.raw`Try the explorer below. Drag the two points and watch everything this section has introduced so far update together: the rise and run, the slope, the equation, both intercepts, and the distance $PQ$ as the hypotenuse of the rise-run triangle.`,
    },
    {
      kind: "interactive",
      key: `${D}/line-explorer`,
      title: "Two-point line explorer",
      caption: String.raw`Drag $P$ and $Q$ (they snap to lattice points). All values are exact. Make the run 0 to see an undefined slope, and the rise 0 to see a horizontal line.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Systems of equations as intersecting lines" },
    {
      kind: "p",
      text: String.raw`A system of two linear equations is a pair of lines, and its solution is the point where they intersect (MR p. 67). For $2x - y = 1$ and $x + y = 5$, solving each for $y$ gives $y = 2x - 1$ and $y = -x + 5$. Setting them equal, $2x - 1 = -x + 5$, so $x = 2$ and $y = 3$: the lines cross at $(2, 3)$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/system`, caption: String.raw`The solution of the system is the intersection point $(2, 3)$.` },
    },
    {
      kind: "p",
      text: String.raw`The picture also explains two special cases: two parallel lines (equal slopes, different intercepts) never meet, so the system has no solution, and two equations for the same line have infinitely many solutions.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Linear inequalities: half-planes" },
    {
      kind: "p",
      text: String.raw`To graph a linear inequality, solve it for $y$. A point satisfies $y \le mx + b$ exactly when it is on the line $y = mx + b$ or below it, because its $y$-coordinate is at most the line's height there. So the graph of $y \le mx + b$ is the line together with the entire region below it, and the graph of $y \ge mx + b$ is the line and the entire region above it (MR pp. 68–69). Each region is a [[half-plane]].`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/inequality`, props: { variant: "half-plane" }, caption: String.raw`The graph of $y \ge 2x - 2$: the line and everything above it.` },
    },
    {
      kind: "p",
      text: String.raw`The trap is the sign flip. The inequality $x - 2y \ge 4$ becomes $-2y \ge -x + 4$, and dividing by $-2$ reverses it: $y \le \frac{1}{2}x - 2$. Its graph is _below_ the line, even though the original said "$\ge$." With strict inequalities ($<$ or $>$) the boundary line itself is not part of the graph; many books draw it dashed (a common convention, not described in the MR).`,
    },
    {
      kind: "p",
      text: String.raw`A system of inequalities is solved by the points satisfying all of them, so its graph is the intersection of the half-planes. For $x + 2y \le 6$ and $x - y \le 3$, solve each for $y$: $y \le -\frac{1}{2}x + 3$ (below the first line) and $y \ge x - 3$ (above the second, after another sign flip). The solution set is the shaded wedge, including its two boundary half-lines, which meet at $(4, 1)$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/inequality`, props: { variant: "system" }, caption: String.raw`Solutions of $y \le -\frac{1}{2}x + 3$ and $y \ge x - 3$: the shaded region and its boundary.` },
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Test a point",
      text: String.raw`To check which side to shade, plug in a point not on the line, usually the origin. For $x + 2y \le 6$: $0 + 0 \le 6$ is true, so the side containing $O$ is shaded. (If the line passes through $O$, test $(1, 0)$ or $(0, 1)$ instead.)`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Symmetry about the line y = x" },
    {
      kind: "p",
      text: String.raw`Since reflecting about $y = x$ swaps the coordinates of every point, interchanging $x$ and $y$ in an equation produces the graph's reflection about $y = x$ (MR p. 69). Start with $y = 3x - 6$. Swapping gives $x = 3y - 6$, and solving for $y$ gives $y = \frac{1}{3}x + 2$. The line $y = x$ is a [[line-of-symmetry|line of symmetry]] for the pair: the $x$-intercept 2 of one line becomes the $y$-intercept 2 of the other, and the two lines meet on $y = x$, at $(3, 3)$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/symmetry-yx`, caption: String.raw`$y = 3x - 6$ and $y = \frac{1}{3}x + 2$ are reflections of each other about the dashed line $y = x$.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Parabolas" },
    {
      kind: "p",
      text: String.raw`The graph of $y = ax^2 + bx + c$, where $a \neq 0$, is a [[parabola]]. Its $x$-intercepts are the solutions of $ax^2 + bx + c = 0$. If $a > 0$ it opens upward and its [[vertex]] is its lowest point; if $a < 0$ it opens downward and the vertex is its highest point. Every such parabola is symmetric about the vertical line through its vertex, so the two $x$-intercepts (when there are two) are equally far from that line (MR pp. 70–71).`,
    },
    {
      kind: "p",
      text: String.raw`That symmetry is how you find the vertex without any new formula. For $y = x^2 - 6x + 5 = (x - 1)(x - 5)$, the $x$-intercepts are 1 and 5. The line of symmetry is halfway between them, $x = 3$, and the vertex is $(3, 3^2 - 6 \cdot 3 + 5) = (3, -4)$. The $y$-intercept is the value at $x = 0$, which is $c = 5$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/parabola`, caption: String.raw`$y = x^2 - 6x + 5$: intercepts at $x = 1$ and $x = 5$, line of symmetry $x = 3$, vertex $(3, -4)$, $y$-intercept 5.` },
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Vertex shortcut (not in the Math Review)",
      text: String.raw`The line of symmetry of $y = ax^2 + bx + c$ is $x = -\frac{b}{2a}$, a standard fact, though not stated in the ETS Math Review. It agrees with the midpoint of the roots, since the roots add up to $-\frac{b}{a}$ (here $-\frac{-6}{2} = 3$), and it still works when the parabola never meets the $x$-axis.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Circles" },
    {
      kind: "p",
      text: String.raw`The graph of $(x - a)^2 + (y - b)^2 = r^2$ is a circle with center $(a, b)$ and radius $r > 0$ (MR p. 71); this is the [[circle-equation|equation of a circle]]. This is the distance idea again: $(x, y)$ is on the circle exactly when its distance from the center is $r$, and the legs of the right triangle from the center are $|x - a|$ and $|y - b|$. A circle centered at the origin is simply $x^2 + y^2 = r^2$.`,
    },
    { kind: "math", tex: String.raw`(x - a)^2 + (y - b)^2 = r^2 \quad\Longleftrightarrow\quad \text{center } (a, b),\ \text{radius } r`, key: true },
    {
      kind: "p",
      text: String.raw`The circle with center $(-2, 3)$ and radius 5 is $(x + 2)^2 + (y - 3)^2 = 25$. Note the signs: $x - (-2)$ becomes $x + 2$. The point $(1, 7)$ is on it because the legs from the center are 3 and 4, and $3^2 + 4^2 = 25$.`,
    },
    {
      kind: "diagram",
      diagram: { key: `${D}/circle`, caption: String.raw`$(x + 2)^2 + (y - 3)^2 = 25$. The radius to $(1, 7)$ is the hypotenuse of a 3-4-5 right triangle.` },
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`Read the center with the opposite signs: $(x - 4)^2 + (y + 1)^2 = 9$ has center $(4, -1)$, not $(-4, 1)$. And the right side is $r^2$: radius 3 here, not 9. Once you have the center and radius, everything from Section 3.5 (circumference $2\pi r$, area $\pi r^2$) applies.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Most coordinate questions reduce to a few moves. Turn a pair of points into a slope, a slope and a point into an equation ($b$ by substitution), and an equation into intercepts (set the other variable to 0). Turn any distance into a right triangle with horizontal and vertical legs. For shaded regions, solve for $y$ and remember that dividing by a negative flips the inequality. For parabolas and circles, read off the intercepts, vertex, center or radius, and use symmetry.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Mixing up which coordinate flips in a reflection. Calling a vertical line's slope 0. Taking the reciprocal but forgetting the negative sign for a perpendicular slope. Forgetting to reverse an inequality after dividing by a negative, and so shading the wrong side. Reading the center of $(x - a)^2 + (y - b)^2 = r^2$ with the wrong signs, or taking $r^2$ for $r$. And trusting a value read off the grid when the question needs an exact one.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "coordinate-system",
      term: "rectangular coordinate system (xy-plane)",
      turkish: "dik koordinat sistemi / analitik düzlem",
      definition: String.raw`Two real number lines that are perpendicular to each other and intersect at their zero points. Also called the $xy$-coordinate system or the $xy$-plane.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "system" } },
      source: "MR p. 61; MC p. 10",
    },
    {
      id: "x-axis",
      term: "x-axis",
      turkish: "x ekseni (apsis ekseni)",
      definition: String.raw`The horizontal number line of the $xy$-plane; its positive half is to the right of the origin.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "x-axis" } },
      source: "MR p. 61",
    },
    {
      id: "y-axis",
      term: "y-axis",
      turkish: "y ekseni (ordinat ekseni)",
      definition: String.raw`The vertical number line of the $xy$-plane; its positive half is above the origin.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "y-axis" } },
      source: "MR p. 61",
    },
    {
      id: "origin",
      term: "origin",
      turkish: "orijin / başlangıç noktası",
      definition: String.raw`The point $O$ where the two axes intersect; its coordinates are $(0, 0)$.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "origin" } },
      source: "MR pp. 61–62",
    },
    {
      id: "quadrant",
      term: "quadrant",
      turkish: "bölge (koordinat düzleminin I., II., III., IV. bölgesi)",
      definition: String.raw`One of the four regions into which the axes divide the plane, labeled I, II, III and IV counterclockwise from the upper right.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "quadrants" } },
      source: "MR pp. 61–62; MC p. 10",
    },
    {
      id: "ordered-pair",
      term: "ordered pair",
      turkish: "sıralı ikili",
      definition: String.raw`A pair $(x, y)$ of real numbers in which order matters; each point of the $xy$-plane is identified with one, written e.g. $J(x, y)$.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "coords" } },
      source: "MR p. 62",
    },
    {
      id: "x-coordinate",
      term: "x-coordinate",
      turkish: "apsis",
      definition: String.raw`The first number of the ordered pair $(x, y)$: the point is $|x|$ units to the right of the $y$-axis if $x > 0$, or to the left if $x < 0$.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "coords" } },
      source: "MR p. 62",
    },
    {
      id: "y-coordinate",
      term: "y-coordinate",
      turkish: "ordinat",
      definition: String.raw`The second number of the ordered pair $(x, y)$: the point is $|y|$ units above the $x$-axis if $y > 0$, or below if $y < 0$.`,
      diagram: { key: `${D}/quadrants`, props: { highlight: "coords" } },
      source: "MR p. 62",
    },
    {
      id: "reflection",
      term: "reflection (about a line or the origin)",
      turkish: "yansıma / simetriği (eksene veya orijine göre)",
      definition: String.raw`The mirror image of a point. The reflection of $(a, b)$ is $(a, -b)$ about the $x$-axis, $(-a, b)$ about the $y$-axis, $(-a, -b)$ about the origin, and $(b, a)$ about the line $y = x$.`,
      diagram: { key: `${D}/reflections`, props: { highlight: "all" } },
      source: "MR pp. 63, 69",
    },
    {
      id: "symmetric",
      term: "symmetric about",
      turkish: "… göre simetrik",
      definition: String.raw`Two points are symmetric about a line (or the origin) if each is the reflection of the other about it; e.g. $(3, 5)$ and $(5, 3)$ are symmetric about the line $y = x$.`,
      diagram: { key: `${D}/reflections`, props: { highlight: "y=x" } },
      source: "MR pp. 63, 69",
    },
    {
      id: "distance",
      term: "distance between two points",
      turkish: "iki nokta arasındaki uzaklık",
      definition: String.raw`The length of the segment joining them, found with the Pythagorean theorem from a right triangle whose legs are the horizontal and vertical differences of the coordinates.`,
      formula: String.raw`\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}`,
      diagram: { key: `${D}/distance` },
      note: "The general formula is not written out in the ETS Math Review (it uses the right triangle)",
      source: "MR pp. 63–64",
    },
    {
      id: "midpoint",
      term: "midpoint",
      turkish: "orta nokta",
      definition: String.raw`The point of a segment equally distant from its endpoints; its coordinates are the averages of the endpoints' coordinates.`,
      formula: String.raw`\left(\tfrac{x_1 + x_2}{2}, \tfrac{y_1 + y_2}{2}\right)`,
      diagram: { key: `${D}/distance`, props: { midpoint: true } },
      note: "Not named in the ETS Math Review",
    },
    {
      id: "graph-of-equation",
      term: "graph of an equation",
      turkish: "denklemin grafiği",
      definition: String.raw`In the $xy$-plane, the set of all points whose ordered pairs $(x, y)$ satisfy the equation.`,
      diagram: { key: `${D}/slope`, props: { highlight: "graph" } },
      source: "MR p. 64",
    },
    {
      id: "slope",
      term: "slope",
      turkish: "eğim",
      definition: String.raw`For a line through $(x_1, y_1)$ and $(x_2, y_2)$ with $x_1 \neq x_2$, the ratio $\frac{y_2 - y_1}{x_2 - x_1}$. In $y = mx + b$, the slope is $m$.`,
      formula: String.raw`m = \frac{y_2 - y_1}{x_2 - x_1}`,
      diagram: { key: `${D}/slope`, props: { highlight: "slope" } },
      source: "MR pp. 64–65",
    },
    {
      id: "rise-over-run",
      term: "rise over run",
      turkish: "düşey değişim / yatay değişim (dikey artış / yatay artış)",
      definition: String.raw`Another name for slope: the rise is the change in $y$ and the run is the change in $x$ when moving from one point of the line to another.`,
      diagram: { key: `${D}/slope`, props: { highlight: "slope" } },
      source: "MR p. 65",
    },
    {
      id: "y-intercept",
      term: "y-intercept",
      turkish: "y eksenini kestiği nokta (ordinatı)",
      definition: String.raw`The $y$-coordinate of a point where a graph intersects the $y$-axis (sometimes the point itself). In $y = mx + b$ it is $b$.`,
      diagram: { key: `${D}/slope`, props: { highlight: "y-intercept" } },
      source: "MR p. 64; MC p. 11",
    },
    {
      id: "x-intercept",
      term: "x-intercept",
      turkish: "x eksenini kestiği nokta (apsisi)",
      definition: String.raw`The $x$-coordinate of a point where a graph intersects the $x$-axis (sometimes the point itself). Find it by setting $y = 0$.`,
      diagram: { key: `${D}/slope`, props: { highlight: "x-intercept" } },
      source: "MR pp. 64, 67; MC p. 11",
    },
    {
      id: "horizontal-line",
      term: "horizontal line",
      turkish: "yatay doğru",
      definition: String.raw`A line with slope 0; its equation has the form $y = b$, where $b$ is the $y$-intercept.`,
      diagram: { key: `${D}/horiz-vert`, props: { highlight: "horizontal" } },
      source: "MR p. 65",
    },
    {
      id: "vertical-line",
      term: "vertical line",
      turkish: "düşey doğru / dikey doğru",
      definition: String.raw`A line whose slope is not defined (the run is 0); its equation has the form $x = a$, where $a$ is the $x$-intercept.`,
      diagram: { key: `${D}/horiz-vert`, props: { highlight: "vertical" } },
      source: "MR p. 65",
    },
    {
      id: "parallel-lines",
      term: "parallel lines",
      turkish: "paralel doğrular",
      definition: String.raw`Lines in the plane that do not meet. Two (non-vertical) lines in the $xy$-plane are parallel if their slopes are equal.`,
      diagram: { key: `${D}/parallel-perp`, props: { highlight: "parallel" } },
      source: "MR p. 65",
    },
    {
      id: "perpendicular-lines",
      term: "perpendicular lines",
      turkish: "dik doğrular",
      definition: String.raw`Lines that meet at a right angle. Two lines in the $xy$-plane are perpendicular if their slopes are negative reciprocals of each other ($m_1 m_2 = -1$).`,
      diagram: { key: `${D}/parallel-perp`, props: { highlight: "perpendicular" } },
      source: "MR p. 65",
    },
    {
      id: "half-plane",
      term: "half-plane",
      turkish: "yarı düzlem",
      definition: String.raw`The region on one side of a line in the plane. The graph of $y \ge mx + b$ is the line and the half-plane above it; $y \le mx + b$ gives the line and the half-plane below it.`,
      diagram: { key: `${D}/inequality`, props: { variant: "half-plane" } },
      note: "Not named in the ETS Math Review (it says \"the entire region above/below\" the line)",
      source: "MR pp. 68–69",
    },
    {
      id: "line-of-symmetry",
      term: "line of symmetry",
      turkish: "simetri ekseni / simetri doğrusu",
      definition: String.raw`A line about which a graph (or a pair of graphs) is its own mirror image, e.g. the vertical line through the vertex of a parabola, or $y = x$ for a graph and its reflection.`,
      diagram: { key: `${D}/parabola`, props: { highlight: "axis" } },
      source: "MR pp. 70–71",
    },
    {
      id: "parabola",
      term: "parabola",
      turkish: "parabol",
      definition: String.raw`The graph of $y = ax^2 + bx + c$ with $a \neq 0$. Its $x$-intercepts are the solutions of $ax^2 + bx + c = 0$; it opens upward if $a > 0$ and downward if $a < 0$.`,
      formula: String.raw`y = ax^2 + bx + c,\ a \neq 0`,
      diagram: { key: `${D}/parabola`, props: { highlight: "parabola" } },
      source: "MR pp. 70–71",
    },
    {
      id: "vertex",
      term: "vertex (of a parabola)",
      turkish: "tepe noktası",
      definition: String.raw`The lowest point of a parabola that opens upward, or the highest point of one that opens downward. It lies on the parabola's line of symmetry.`,
      diagram: { key: `${D}/parabola`, props: { highlight: "vertex" } },
      source: "MR pp. 70–71",
    },
    {
      id: "circle-equation",
      term: "equation of a circle",
      turkish: "çemberin denklemi (merkezi ve yarıçapı verilen)",
      definition: String.raw`The graph of $(x - a)^2 + (y - b)^2 = r^2$ is the circle with center $(a, b)$ and radius $r > 0$.`,
      formula: String.raw`(x - a)^2 + (y - b)^2 = r^2`,
      diagram: { key: `${D}/circle`, props: { highlight: "circle" } },
      source: "MR pp. 71–72",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`In the $xy$-plane, line $\ell$ passes through the points $(-3, 4)$ and $(5, -2)$. What is the $x$-intercept of $\ell$?`,
      choices: [String.raw`$-\frac{7}{3}$`, String.raw`$\frac{7}{4}$`, String.raw`$\frac{7}{3}$`, String.raw`$3$`, String.raw`$4$`],
      answer: 2,
      explanation: [
        String.raw`Slope: $\frac{-2 - 4}{5 - (-3)} = \frac{-6}{8} = -\frac{3}{4}$.`,
        String.raw`Find $b$ by substituting $(-3, 4)$ into $y = -\frac{3}{4}x + b$: $4 = \frac{9}{4} + b$, so $b = \frac{7}{4}$.`,
        String.raw`$x$-intercept: set $y = 0$. Then $\frac{3}{4}x = \frac{7}{4}$, so $x = \frac{7}{3}$.`,
        String.raw`Check with the other point: from $(5, -2)$ the line must rise 2 to reach $y = 0$, which takes a run of $2 \div \frac{3}{4} = \frac{8}{3}$ to the left, and $5 - \frac{8}{3} = \frac{7}{3}$. Trap: $\frac{7}{4}$ is the $y$-intercept.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`In the $xy$-plane, line $k$ passes through the point $(4, -1)$ and is perpendicular to the line $y = \frac{2}{3}x + 1$.`,
      quantityA: String.raw`The $x$-intercept of $k$`,
      quantityB: String.raw`The $y$-intercept of $k$`,
      answer: "B",
      explanation: [
        String.raw`The slope of $k$ is the negative reciprocal of $\frac{2}{3}$, which is $-\frac{3}{2}$.`,
        String.raw`Substitute $(4, -1)$ into $y = -\frac{3}{2}x + b$: $-1 = -6 + b$, so $b = 5$. The $y$-intercept is 5.`,
        String.raw`Set $y = 0$: $\frac{3}{2}x = 5$, so $x = \frac{10}{3} \approx 3.33$. The $x$-intercept is $\frac{10}{3}$.`,
        String.raw`$\frac{10}{3} < 5$, so Quantity B is greater. Trap: using the slope $\frac{3}{2}$ (reciprocal without the sign change) gives $y = \frac{3}{2}x - 7$, with $x$-intercept $\frac{14}{3}$ and $y$-intercept $-7$, which reverses the answer.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`In the $xy$-plane, the points $(-1, 3)$ and $(7, -3)$ are the endpoints of a diameter of a circle. If the area of the circle is $k\pi$, what is the value of $k$?`,
      answer: { kind: "decimal", value: "25" },
      explanation: [
        String.raw`Draw the right triangle: the horizontal leg is $7 - (-1) = 8$ and the vertical leg is $3 - (-3) = 6$.`,
        String.raw`The diameter is the hypotenuse: $\sqrt{8^2 + 6^2} = \sqrt{100} = 10$ (a 6-8-10 triangle). So the radius is 5.`,
        String.raw`Area $= \pi \cdot 5^2 = 25\pi$, so $k = 25$.`,
        String.raw`Trap: using the diameter as the radius gives $100\pi$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      diagram: { key: `${D}/example-region`, caption: String.raw`The shaded region, including its boundary, is the set of points satisfying both $x + 2y \le 8$ and $3x - y \ge 3$.` },
      stem: String.raw`In the $xy$-plane above, which of the following points lie in the shaded region or on its boundary? Indicate all such points.`,
      choices: [String.raw`$(0, 0)$`, String.raw`$(1, 1)$`, String.raw`$(2, 3)$`, String.raw`$(4, 1)$`, String.raw`$(5, 2)$`, String.raw`$(3, -6)$`],
      answer: [2, 3, 5],
      explanation: [
        String.raw`Test each point in both inequalities, $x + 2y \le 8$ and $3x - y \ge 3$. The picture is drawn to scale, but points near a boundary need the algebra.`,
        String.raw`$(0, 0)$: $0 \le 8$ yes, but $0 \ge 3$ no. $(1, 1)$: $3 \le 8$ yes, but $3 - 1 = 2 \ge 3$ no.`,
        String.raw`$(2, 3)$: $2 + 6 = 8 \le 8$ yes, and $6 - 3 = 3 \ge 3$ yes. It is the corner where the two boundary lines meet, and the boundary is included.`,
        String.raw`$(4, 1)$: $6 \le 8$ yes, $11 \ge 3$ yes. $(5, 2)$: $5 + 4 = 9 \le 8$ no. $(3, -6)$: $3 - 12 = -9 \le 8$ yes, and $9 + 6 = 15 \ge 3$ yes.`,
        String.raw`Answer: $(2, 3)$, $(4, 1)$ and $(3, -6)$. Solving for $y$ confirms the shading: $y \le -\frac{1}{2}x + 4$ (below the first line) and $y \le 3x - 3$ (the sign flips, so also below the second line).`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`The point $(-3, 5)$ is reflected about the origin. In which quadrant is its image?`,
      answer: String.raw`Quadrant IV`,
      explanation: String.raw`Both signs change: the image is $(3, -5)$, with $x > 0$ and $y < 0$.`,
    },
    {
      id: "q2",
      prompt: String.raw`What are the $x$-intercept and the $y$-intercept of the line $5x - 2y = 20$?`,
      answer: String.raw`$x$-intercept 4, $y$-intercept $-10$`,
      explanation: String.raw`$y = 0$ gives $5x = 20$; $x = 0$ gives $-2y = 20$.`,
    },
    {
      id: "q3",
      prompt: String.raw`What is the slope of a line perpendicular to $4x + 3y = 7$?`,
      answer: String.raw`$\frac{3}{4}$`,
      explanation: String.raw`$y = -\frac{4}{3}x + \frac{7}{3}$ has slope $-\frac{4}{3}$; the negative reciprocal is $\frac{3}{4}$.`,
    },
    {
      id: "q4",
      prompt: String.raw`What is the distance between $(-2, 1)$ and $(3, 13)$?`,
      answer: String.raw`$13$`,
      explanation: String.raw`The legs are $3 - (-2) = 5$ and $13 - 1 = 12$, so the distance is $\sqrt{25 + 144} = 13$.`,
    },
    {
      id: "q5",
      prompt: String.raw`What is the vertex of the parabola $y = x^2 + 4x - 5$?`,
      answer: String.raw`$(-2, -9)$`,
      explanation: String.raw`$x^2 + 4x - 5 = (x + 5)(x - 1)$, so the $x$-intercepts are $-5$ and $1$; the line of symmetry is $x = -2$, and $y = 4 - 8 - 5 = -9$ there.`,
    },
    {
      id: "q6",
      prompt: String.raw`Write the equation of the circle with center $(-4, 0)$ and radius 3.`,
      answer: String.raw`$(x + 4)^2 + y^2 = 9$`,
      explanation: String.raw`$(x - (-4))^2 + (y - 0)^2 = 3^2$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`Point $P(a, b)$ lies in Quadrant II of the $xy$-plane. Point $R$ is the reflection of $P$ about the origin, and point $S$ is the reflection of $P$ about the line $y = x$.`,
        quantityA: String.raw`The $x$-coordinate of $R$`,
        quantityB: String.raw`The $y$-coordinate of $S$`,
        answer: "A",
        explanation: [
          String.raw`In Quadrant II, $a < 0$ and $b > 0$.`,
          String.raw`$R = (-a, -b)$, so its $x$-coordinate is $-a$, which is positive.`,
          String.raw`$S = (b, a)$, so its $y$-coordinate is $a$, which is negative.`,
          String.raw`A positive number is greater than a negative one: Quantity A is greater. Trap: thinking the $y = x$ reflection leaves the $y$-coordinate as $b$.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        diagram: { key: `${D}/quiz-line-k` },
        given: String.raw`In the $xy$-plane above, line $m$ (not shown) is parallel to line $k$ and passes through the point $(3, 5)$.`,
        quantityA: String.raw`The $x$-intercept of line $m$`,
        quantityB: String.raw`$10$`,
        answer: "A",
        explanation: [
          String.raw`Line $k$ passes through $(0, 4)$ and $(6, 0)$, so its slope is $\frac{0 - 4}{6 - 0} = -\frac{2}{3}$.`,
          String.raw`Line $m$ has the same slope. Substitute $(3, 5)$: $5 = -\frac{2}{3}(3) + b = -2 + b$, so $b = 7$ and $m$ is $y = -\frac{2}{3}x + 7$.`,
          String.raw`Set $y = 0$: $\frac{2}{3}x = 7$, so $x = \frac{21}{2} = 10.5$.`,
          String.raw`$10.5 > 10$, so Quantity A is greater. The answer is close to 10, so estimating from a sketch is risky here; compute it.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`In the $xy$-plane, a circle has center $(3, -4)$ and radius $r$. The origin lies inside the circle.`,
        quantityA: String.raw`$r$`,
        quantityB: String.raw`$5$`,
        answer: "A",
        explanation: [
          String.raw`The distance from the center $(3, -4)$ to the origin is the hypotenuse of a right triangle with legs 3 and 4: $\sqrt{9 + 16} = 5$.`,
          String.raw`A point is inside the circle exactly when its distance from the center is less than the radius. So $5 < r$.`,
          String.raw`Quantity A is greater. Trap: $r$ is not given, which tempts (D), but the condition on the origin pins down the comparison. (If the origin were _on_ the circle, $r$ would equal 5.)`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`In the $xy$-plane, what is the $y$-coordinate of the vertex of the parabola $y = -2x^2 + 8x + 10$?`,
        choices: [String.raw`$10$`, String.raw`$12$`, String.raw`$16$`, String.raw`$18$`, String.raw`$20$`],
        answer: 3,
        explanation: [
          String.raw`Factor: $-2x^2 + 8x + 10 = -2(x^2 - 4x - 5) = -2(x - 5)(x + 1)$, so the $x$-intercepts are $5$ and $-1$.`,
          String.raw`The line of symmetry is halfway between them: $x = \frac{5 + (-1)}{2} = 2$.`,
          String.raw`At $x = 2$: $y = -2(4) + 16 + 10 = 18$. Since $a = -2 < 0$, the parabola opens downward and this is its highest point.`,
          String.raw`Trap: 10 is the $y$-intercept, not the vertex.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, line $\ell$ passes through the point $(2, 5)$ and is perpendicular to the line $3x - 5y = 15$. What is the $y$-intercept of $\ell$?`,
        choices: [String.raw`$-3$`, String.raw`$\frac{5}{3}$`, String.raw`$\frac{19}{5}$`, String.raw`$\frac{31}{5}$`, String.raw`$\frac{25}{3}$`],
        answer: 4,
        explanation: [
          String.raw`Solve the given equation for $y$: $5y = 3x - 15$, so $y = \frac{3}{5}x - 3$, with slope $\frac{3}{5}$.`,
          String.raw`The slope of $\ell$ is the negative reciprocal, $-\frac{5}{3}$.`,
          String.raw`Substitute $(2, 5)$ into $y = -\frac{5}{3}x + b$: $5 = -\frac{10}{3} + b$, so $b = \frac{25}{3}$.`,
          String.raw`Traps: $-3$ is the given line's $y$-intercept; slope $\frac{5}{3}$ (no sign change) gives $\frac{5}{3}$; slope $\frac{3}{5}$ (a parallel line) gives $\frac{19}{5}$; slope $-\frac{3}{5}$ gives $\frac{31}{5}$.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, the circle $(x - 3)^2 + (y + 4)^2 = 25$ intersects the $x$-axis at the origin $O$ and at point $P$, and intersects the $y$-axis at $O$ and at point $Q$. What is the area of triangle $OPQ$?`,
        choices: [String.raw`$12$`, String.raw`$20$`, String.raw`$24$`, String.raw`$40$`, String.raw`$48$`],
        answer: 2,
        explanation: [
          String.raw`$x$-axis: set $y = 0$. Then $(x - 3)^2 + 16 = 25$, so $x - 3 = \pm 3$ and $x = 0$ or $6$. So $P = (6, 0)$.`,
          String.raw`$y$-axis: set $x = 0$. Then $9 + (y + 4)^2 = 25$, so $y + 4 = \pm 4$ and $y = 0$ or $-8$. So $Q = (0, -8)$.`,
          String.raw`Triangle $OPQ$ has a right angle at $O$ (its legs lie along the axes), with legs $OP = 6$ and $OQ = 8$. Its area is $\frac{1}{2}(6)(8) = 24$.`,
          String.raw`Check: $PQ = \sqrt{36 + 64} = 10$, a diameter of the circle, as it must be for a right triangle inscribed in a circle. Trap: 48 forgets the $\frac{1}{2}$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, line $\ell$ has equation $y = mx + 3$, where $m$ is a constant. If $\ell$ does not pass through Quadrant III, which of the following could be the value of $m$? Indicate all such values.`,
        choices: [String.raw`$-3$`, String.raw`$-\frac{1}{2}$`, String.raw`$0$`, String.raw`$\frac{1}{4}$`, String.raw`$2$`],
        answer: [0, 1, 2],
        explanation: [
          String.raw`Quadrant III is where $x < 0$ and $y < 0$. The line crosses the $y$-axis at $(0, 3)$, above the origin.`,
          String.raw`If $m > 0$, the line falls as you move left and crosses the $x$-axis at $x = -\frac{3}{m} < 0$. To the left of that point, $x < 0$ and $y < 0$: the line enters Quadrant III. So $\frac{1}{4}$ and $2$ fail.`,
          String.raw`If $m = 0$, the line is $y = 3$, always above the $x$-axis. If $m < 0$, then for every $x < 0$ we have $mx > 0$, so $y = mx + 3 > 3 > 0$. Neither enters Quadrant III.`,
          String.raw`So the condition holds exactly when $m \le 0$: $-3$, $-\frac{1}{2}$ and $0$.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following lines in the $xy$-plane are perpendicular to the line $y = -\frac{2}{5}x + 1$? Indicate all such lines.`,
        choices: [
          String.raw`$5x - 2y = 7$`,
          String.raw`$2x + 5y = 3$`,
          String.raw`$y = 2.5x$`,
          String.raw`$10x + 4y = 1$`,
          String.raw`The line through $(1, 2)$ and $(3, 7)$`,
          String.raw`The line through $(0, 0)$ and $(5, 2)$`,
        ],
        answer: [0, 2, 4],
        explanation: [
          String.raw`A perpendicular line must have slope $\frac{5}{2}$, the negative reciprocal of $-\frac{2}{5}$.`,
          String.raw`$5x - 2y = 7$ gives $y = \frac{5}{2}x - \frac{7}{2}$: yes. $2x + 5y = 3$ gives slope $-\frac{2}{5}$: parallel, not perpendicular.`,
          String.raw`$y = 2.5x$ has slope $2.5 = \frac{5}{2}$: yes. $10x + 4y = 1$ gives slope $-\frac{10}{4} = -\frac{5}{2}$: the reciprocal, but with the wrong sign.`,
          String.raw`Through $(1, 2)$ and $(3, 7)$: slope $\frac{5}{2}$, yes. Through $(0, 0)$ and $(5, 2)$: slope $\frac{2}{5}$, no.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, what is the area of the region consisting of all points $(x, y)$ that satisfy all three of the inequalities $x \ge 0$, $x + 2y \le 8$ and $x - y \le 2$?`,
        answer: { kind: "decimal", value: "12" },
        explanation: [
          String.raw`Solve for $y$: $x + 2y \le 8$ means $y \le -\frac{1}{2}x + 4$ (on or below that line). $x - y \le 2$ means $-y \le 2 - x$, and multiplying by $-1$ flips it: $y \ge x - 2$ (on or above that line).`,
          String.raw`The two lines meet where $-\frac{1}{2}x + 4 = x - 2$, so $x = 4$ and $y = 2$. On the $y$-axis ($x = 0$) they pass through $(0, 4)$ and $(0, -2)$.`,
          String.raw`For $x \ge 0$, the region between the lines is the triangle with vertices $(0, 4)$, $(0, -2)$ and $(4, 2)$. Its base on the $y$-axis is $4 - (-2) = 6$ and its height (the horizontal distance to $(4, 2)$) is 4.`,
          String.raw`Area $= \frac{1}{2}(6)(4) = 12$. Trap: forgetting to flip $x - y \le 2$ shades the wrong side and gives an unbounded region.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, line $\ell$ has slope $\frac{3}{4}$ and passes through the point $(-2, 1)$. What is the distance between the point where $\ell$ crosses the $x$-axis and the point where $\ell$ crosses the $y$-axis? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 25, denominator: 6 },
        explanation: [
          String.raw`Substitute $(-2, 1)$ into $y = \frac{3}{4}x + b$: $1 = -\frac{3}{2} + b$, so $b = \frac{5}{2}$. The line crosses the $y$-axis at $(0, \frac{5}{2})$.`,
          String.raw`Set $y = 0$: $\frac{3}{4}x = -\frac{5}{2}$, so $x = -\frac{10}{3}$. The line crosses the $x$-axis at $(-\frac{10}{3}, 0)$.`,
          String.raw`The two points and the origin form a right triangle with legs $\frac{10}{3}$ and $\frac{5}{2}$. Distance $= \sqrt{\frac{100}{9} + \frac{25}{4}} = \sqrt{\frac{400 + 225}{36}} = \sqrt{\frac{625}{36}} = \frac{25}{6}$.`,
          String.raw`Shortcut: the legs are in the ratio $\frac{10}{3} : \frac{5}{2} = 4 : 3$, a 3-4-5 triangle scaled by $\frac{5}{6}$, so the hypotenuse is $5 \cdot \frac{5}{6} = \frac{25}{6}$.`,
        ],
      },
    ],
  },
};

export default section;
