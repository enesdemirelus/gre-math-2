import type { Section } from "../types";

const NTS = String.raw`Note: Figure not drawn to scale.`;

const section: Section = {
  id: "3-5-circles",
  number: "3.5",
  title: "Circles",
  part: "geometry",
  mrPages: "106–112",
  summary: String.raw`Radius, diameter, chords, arcs, sectors and tangents, and the one idea that powers most GRE circle questions: a central angle of $x^\circ$ takes the fraction $\frac{x}{360}$ of everything. Plus how circles hide right triangles and isosceles triangles.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The circle and its parts" },
    {
      kind: "p",
      text: String.raw`Start with a point $O$ and a positive number $r$. The set of all points in the plane that are exactly $r$ units from $O$ is a [[circle]]; $O$ is its [[center]] and $r$ is its [[radius]]. Notice that the circle is only the curve: the points _on_ it. When the GRE says "the area of a circle," it means the area of the region the circle encloses (MC p. 8). Turkish keeps these apart as _çember_ (the curve) and _daire_ (the region), which is a handy way to remember that English uses one word for both.`,
    },
    {
      kind: "p",
      text: String.raw`Any segment joining two points of the circle is a [[chord]]. A chord that passes through the center is a [[diameter]], and its length is twice the radius. The words "radius" and "diameter" do double duty: they name a _length_ ($r$ and $2r$) and also any _segment_ of that length from the center to the circle, or across the circle through the center. Two circles with equal radii are [[congruent-circles|congruent circles]] (MR p. 106).`,
    },
    { kind: "math", tex: String.raw`d = 2r`, key: true },
    {
      kind: "diagram",
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "all" }, caption: String.raw`$O$ is the center, $r$ is a radius, $PQ$ is a chord, and $ST$ is a diameter (also a chord).` },
    },
    {
      kind: "p",
      text: String.raw`One consequence worth having ready: no chord is longer than a diameter. For any chord $PQ$, the triangle inequality gives $PQ \le PO + OQ = r + r = 2r$, with equality only when $PQ$ goes through $O$. So in a circle of radius 6, a chord can have any length greater than 0 and up to 12, and nothing more.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE writes it",
      text: String.raw`ETS writes a segment and its length the same way: $PQ$ is the chord _and_ its length (MC p. 9). There is no bar over the letters. Equal lengths are stated in words ("$OA = OB$") or follow from the fact that all radii are equal; ETS figures never use tick marks.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Circumference and π" },
    {
      kind: "p",
      text: String.raw`The distance around a circle is its [[circumference]], the circle's version of a perimeter. For every circle, the circumference divided by the diameter gives the same number, called [[pi|pi]] ($\pi$): $\frac{C}{d} = \pi$, where $\pi \approx 3.14$ or $\frac{22}{7}$. Since $d = 2r$, this turns into the formula you will actually use (MR pp. 106–107):`,
    },
    { kind: "math", tex: String.raw`C = \pi d = 2\pi r`, key: true },
    {
      kind: "p",
      text: String.raw`For example, a circle of radius $4.5$ has circumference $9\pi \approx 28.3$. Going backwards is just as common: if $C = 30\pi$, then $d = 30$ and $r = 15$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Wheels and running tracks",
      text: String.raw`A wheel that rolls without slipping travels exactly one circumference per revolution. So distance $=$ (number of revolutions) $\times\, \pi d$, and revolutions $=$ distance $\div\, \pi d$. Watch the units (centimeters vs. meters) and whether the question gives the radius or the diameter.`,
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`Leave answers in terms of $\pi$ unless the question asks for an approximation: answer choices are usually written like $25\pi$. When a choice is a plain decimal, use $\pi \approx 3.14$ (or the on-screen calculator).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Arcs and central angles" },
    {
      kind: "p",
      text: String.raw`Pick two points $A$ and $C$ on a circle. They split the circle into two pieces, and each piece, together with its endpoints, is an [[arc]]. Because two points always give _two_ arcs, ETS names an arc with three points: the two endpoints and one point in between. In the figure below, arc $ABC$ is the shorter arc from $A$ to $C$ and arc $ADC$ is the longer one (MR p. 107). Prep books call these the [[minor-arc|minor arc]] and the major arc; ETS simply says "shorter" and "longer."`,
    },
    {
      kind: "p",
      text: String.raw`An angle whose vertex is the center of the circle is a [[central-angle|central angle]]. The two radii $OA$ and $OC$ form the central angle that "cuts off" arc $ABC$, and the [[arc-measure|measure of the arc]] is defined to be the measure of that central angle. The whole circle counts as an arc of $360^\circ$, so the two arcs between the same two points always add up to $360^\circ$. In the figure, arc $ABC$ measures $70^\circ$ and arc $ADC$ measures $360^\circ - 70^\circ = 290^\circ$ (MR pp. 107–108).`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-5-circles/arc", props: { highlight: "lesson" }, caption: String.raw`Central angle $AOC$ measures $70^\circ$, so arc $ABC$ measures $70^\circ$ and arc $ADC$ measures $290^\circ$.` },
    },
    {
      kind: "p",
      text: String.raw`The measure of an arc is in degrees; its [[arc-length|length]] is a distance. To get the length, use proportional reasoning: the arc is the same fraction of the circumference as its central angle is of $360^\circ$ (MR p. 108).`,
    },
    { kind: "math", tex: String.raw`\frac{\text{length of arc}}{2\pi r} = \frac{x}{360} \quad\Longrightarrow\quad \text{length of arc} = \frac{x}{360}\cdot 2\pi r`, key: true },
    {
      kind: "p",
      text: String.raw`If the radius in the figure is 9, arc $ABC$ has length $\frac{70}{360}\cdot 18\pi = \frac{7\pi}{2} \approx 11.0$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Measure vs. length",
      text: String.raw`"Arc $ABC$ measures $70^\circ$" and "arc $ABC$ has length $\frac{7\pi}{2}$" are different statements. Two arcs with the same measure have different lengths in circles of different sizes. If a question says "the length of the arc," it wants a distance.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Area and sectors" },
    {
      kind: "p",
      text: String.raw`The [[area-of-circle|area of a circle]] of radius $r$ is $\pi r^2$ (MR p. 108). A circle of radius 5 has area $25\pi$. Because $r$ is squared, scaling the radius by $k$ scales the area by $k^2$: doubling the radius doubles the circumference but quadruples the area.`,
    },
    { kind: "math", tex: String.raw`A = \pi r^2`, key: true },
    {
      kind: "p",
      text: String.raw`A [[sector]] is a "pizza slice": the region bounded by an arc and the two radii to its endpoints. Its area follows the same proportion as arc length, with the area of the whole circle in place of the circumference (MR p. 109).`,
    },
    { kind: "math", tex: String.raw`\frac{\text{area of sector}}{\pi r^2} = \frac{x}{360} \quad\Longrightarrow\quad \text{area of sector} = \frac{x}{360}\cdot \pi r^2`, key: true },
    {
      kind: "p",
      text: String.raw`So a $40^\circ$ sector of a circle of radius 6 has area $\frac{40}{360}\cdot 36\pi = 4\pi$, and its arc has length $\frac{40}{360}\cdot 12\pi = \frac{4\pi}{3}$. Move the slider below to see the single fraction $\frac{x}{360}$ controlling both numbers at once.`,
    },
    {
      kind: "interactive",
      key: "3-5-circles/sector-explorer",
      title: "Sector explorer",
      caption: String.raw`Drag the point on the circle or use the sliders. Arc length and sector area are always the same fraction $\frac{x}{360}$ of $2\pi r$ and $\pi r^2$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "One fraction does all the work",
      text: String.raw`Central angle, arc length and sector area are tied together by one ratio: $\frac{x}{360} = \frac{\text{arc length}}{\text{circumference}} = \frac{\text{sector area}}{\text{circle area}}$. If you know any one of the three fractions, you know the other two. Questions that give an arc length and ask for a sector area (or the reverse) are just this ratio, usually after finding $r$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Tangents" },
    {
      kind: "p",
      text: String.raw`A [[tangent]] to a circle is a line in the same plane that meets the circle at exactly one point, the [[point-of-tangency|point of tangency]]. The key fact: a radius drawn to the point of tangency is perpendicular to the tangent line. The converse also holds: if a line meets the circle at the endpoint of a radius and is perpendicular to that radius there, the line is tangent (MR p. 109).`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-5-circles/tangent", props: { highlight: "all" }, caption: String.raw`The radius $OP$ is perpendicular to the tangent line at the point of tangency $P$.` },
    },
    {
      kind: "p",
      text: String.raw`On the GRE, a tangent almost always means a right triangle is hiding. Take a point $Q$ on the tangent line. Then $OP$ (a radius), $PQ$ (along the tangent) and $OQ$ form a right triangle with the right angle at $P$, and the Pythagorean theorem links them: $OQ^2 = r^2 + PQ^2$. With $r = 5$ and $PQ = 12$, for instance, $OQ = 13$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      text: String.raw`If a figure shows a tangent and the center, draw the radius to the point of tangency even if the figure doesn't. The right angle is guaranteed by the tangent fact; you do not need the small square to be drawn.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Inscribed and circumscribed figures" },
    {
      kind: "p",
      text: String.raw`These two words come in pairs, and each pair describes one picture from two points of view. A polygon is [[inscribed-polygon|inscribed in a circle]] if all its vertices lie on the circle; equivalently, the circle is [[circumscribed-circle|circumscribed about the polygon]] (MR p. 110). Turn the picture inside out and you get the second pair: a polygon is [[circumscribed-polygon|circumscribed about a circle]] if each of its sides is tangent to the circle; equivalently, the circle is [[inscribed-circle|inscribed in the polygon]] (MR p. 111).`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-5-circles/inscribed-polygon", props: { highlight: "polygon" }, caption: String.raw`Quadrilateral $ABCD$ is inscribed in the circle; the circle is circumscribed about $ABCD$.` },
    },
    {
      kind: "diagram",
      diagram: { key: "3-5-circles/circumscribed-polygon", props: { highlight: "polygon" }, caption: String.raw`Quadrilateral $ABCD$ is circumscribed about the circle with center $O$; the circle is inscribed in $ABCD$.` },
    },
    {
      kind: "p",
      text: String.raw`When a triangle is inscribed in a circle, the center of the circle can be inside the triangle, outside it, or on one of its sides. If the center is on a side, that side is a diameter (MR p. 110).`,
    },
    { kind: "diagram", diagram: { key: "3-5-circles/center-positions" } },
    {
      kind: "p",
      text: String.raw`The last case is the one the GRE loves. If one side of an inscribed triangle is a diameter, the triangle is a right triangle, and the right angle is at the vertex opposite the diameter. Conversely, if an inscribed triangle is a right triangle, one of its sides (the hypotenuse) is a diameter (MR p. 110). So the moment you see a triangle with one side running through the center and the third vertex on the circle, write down "right angle" and reach for the Pythagorean theorem or the special triangles.`,
    },
    { kind: "math", tex: String.raw`AC \text{ is a diameter, } B \text{ on the circle} \;\Longleftrightarrow\; \text{the measure of angle } ABC \text{ is } 90^\circ`, key: true },
    {
      kind: "interactive",
      key: "3-5-circles/diameter-explorer",
      title: "Diameter explorer",
      caption: String.raw`Drag $B$ anywhere on the circle. However the triangle changes shape, the angle at $B$ stays $90^\circ$. Turn on the radius $OB$ to see why: it splits the triangle into two isosceles triangles.`,
    },
    {
      kind: "p",
      text: String.raw`Two inscribed/circumscribed pairs with a square come up again and again. If a square is inscribed in a circle, its diagonal is a diameter: side $s$ gives diagonal $s\sqrt{2} = 2r$. If a circle is inscribed in a square, the diameter equals the side: $s = 2r$.`,
    },
    {
      kind: "diagram",
      diagram: { key: "3-5-circles/square-and-circle", caption: String.raw`Left: a square inscribed in a circle (the diagonal is a diameter). Right: a circle inscribed in a square (the side equals the diameter).` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Read the direction",
      text: String.raw`"A square inscribed in a circle" puts the square _inside_ (vertices on the circle). "A square circumscribed about a circle" puts the square _outside_ (sides tangent to the circle). Mixing these up changes the answer by a factor of 2 in area. Prep books also use the term [[inscribed-angle|inscribed angle]] for an angle with its vertex on the circle; the Math Review does not, and the only fact of that kind you need from it is the diameter fact above.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Concentric circles" },
    {
      kind: "p",
      text: String.raw`Two or more circles with the same center are [[concentric-circles|concentric circles]] (MR p. 111). Think of a target, or the inner and outer edges of a washer. The region between two concentric circles of radii $R > r$ is a ring, and its area is a simple difference.`,
    },
    { kind: "math", tex: String.raw`\text{area of ring} = \pi R^2 - \pi r^2 = \pi\left(R^2 - r^2\right)`, key: true },
    {
      kind: "diagram",
      diagram: { key: "3-5-circles/concentric", props: { variant: "ring" }, caption: String.raw`Concentric circles with radii $R$ and $r$; the shaded ring has area $\pi(R^2 - r^2)$.` },
    },
    {
      kind: "p",
      text: String.raw`With $R = 7$ and $r = 5$ the ring has area $49\pi - 25\pi = 24\pi$, not $\pi(7 - 5)^2 = 4\pi$. Circumferences behave more simply: the difference is $2\pi R - 2\pi r = 2\pi(R - r)$, which depends only on the gap between the radii.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "How the GRE combines circles and triangles" },
    {
      kind: "p",
      text: String.raw`Most harder circle questions are really triangle questions. Look for these four moves. First, **all radii are equal**, so two radii and a chord form an isosceles triangle; if the central angle is $60^\circ$ the triangle is equilateral and the chord equals the radius, and if it is $90^\circ$ the chord is $r\sqrt{2}$. Second, **a diameter opposite a point on the circle** gives a right angle. Third, **a tangent** gives a right angle with the radius. Fourth, **a shaded region** is usually a difference of areas you know: a sector minus a triangle, a circle minus an inscribed square, or one circle minus another.`,
    },
    {
      kind: "p",
      text: String.raw`For example, in a circle of radius 6 with central angle $AOB$ of $60^\circ$, triangle $AOB$ is equilateral with side 6, so the region between chord $AB$ and the shorter arc has area $\frac{60}{360}\cdot 36\pi - \frac{\sqrt{3}}{4}\cdot 36 = 6\pi - 9\sqrt{3}$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`A circle question usually comes down to finding the radius. Once you have $r$, the circumference, area, arc lengths and sector areas all follow from $2\pi r$, $\pi r^2$ and the fraction $\frac{x}{360}$. When $r$ is not given, get it from a right triangle (diameter, tangent) or from an isosceles triangle made of two radii.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Using the diameter where the formula needs the radius (or the reverse) is the most common slip, especially in wheel problems. An arc's measure (degrees) is not its length (distance). Two points give two arcs, so check which one the three-letter name means. Ring area is $\pi(R^2 - r^2)$, not $\pi(R - r)^2$. And figures are not necessarily drawn to scale: a chord that _looks_ longer than the radius, or a center that _looks_ inside a triangle, proves nothing. Reason from the given facts (MC p. 9).`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "circle",
      term: "circle",
      turkish: String.raw`çember (eğri); içindeki bölge: daire`,
      definition: String.raw`Given a point $O$ in a plane and a positive number $r$, the set of points in the plane that are a distance of $r$ from $O$. "The area of a circle" means the area of the region it encloses.`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "circle" } },
      source: "MR p. 106",
    },
    {
      id: "center",
      term: "center",
      turkish: "merkez",
      definition: String.raw`The point $O$ from which every point of the circle is the same distance $r$.`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "center" } },
      source: "MR p. 106",
    },
    {
      id: "radius",
      term: "radius (plural: radii)",
      turkish: "yarıçap",
      definition: String.raw`The distance $r$ from the center to the circle; also any line segment joining the center to a point on the circle.`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "radius" } },
      source: "MR p. 106",
    },
    {
      id: "diameter",
      term: "diameter",
      turkish: "çap",
      definition: String.raw`A chord that passes through the center of the circle; also its length, which is twice the radius.`,
      formula: String.raw`d = 2r`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "diameter" } },
      source: "MR p. 106",
    },
    {
      id: "congruent-circles",
      term: "congruent circles",
      turkish: "eş çemberler",
      definition: String.raw`Two circles with equal radii.`,
      diagram: { key: "3-5-circles/congruent-circles" },
      source: "MR p. 106",
    },
    {
      id: "chord",
      term: "chord",
      turkish: "kiriş",
      definition: String.raw`Any line segment joining two points on the circle. A diameter is the chord through the center.`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "chord" } },
      source: "MR p. 106",
    },
    {
      id: "circumference",
      term: "circumference",
      turkish: "çemberin çevresi / çember uzunluğu",
      definition: String.raw`The distance around a circle, analogous to the perimeter of a polygon.`,
      formula: String.raw`C = \pi d = 2\pi r`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "circumference" } },
      source: "MR pp. 106–107",
    },
    {
      id: "pi",
      term: "π (pi)",
      turkish: "pi sayısı (π)",
      definition: String.raw`The ratio of the circumference $C$ of a circle to its diameter $d$; it is the same for all circles. $\pi \approx 3.14$, or about $\frac{22}{7}$.`,
      formula: String.raw`\pi = \frac{C}{d}`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "pi" } },
      source: "MR p. 106",
    },
    {
      id: "arc",
      term: "arc",
      turkish: "yay",
      definition: String.raw`The part of a circle containing two given points of the circle and all the points between them. Two points are always the endpoints of two arcs, so an arc is often named by three points, e.g. arc $ABC$.`,
      diagram: { key: "3-5-circles/arc", props: { highlight: "arc" } },
      source: "MR p. 107",
    },
    {
      id: "minor-arc",
      term: "minor arc / major arc",
      turkish: "küçük yay / büyük yay",
      definition: String.raw`The shorter and the longer of the two arcs between two points of a circle (ETS says "the shorter arc" and "the longer arc").`,
      diagram: { key: "3-5-circles/arc", props: { highlight: "minor-major" } },
      note: "Not named in the ETS Math Review",
      source: "MR p. 107",
    },
    {
      id: "central-angle",
      term: "central angle",
      turkish: "merkez açı",
      definition: String.raw`An angle with its vertex at the center of the circle, e.g. angle $AOC$ formed by radii $OA$ and $OC$.`,
      diagram: { key: "3-5-circles/arc", props: { highlight: "central-angle" } },
      source: "MR p. 107",
    },
    {
      id: "arc-measure",
      term: "measure of an arc",
      turkish: "yayın ölçüsü (derece cinsinden)",
      definition: String.raw`The measure of the arc's central angle, the angle formed by the two radii to the arc's endpoints. An entire circle is an arc of measure $360^\circ$.`,
      diagram: { key: "3-5-circles/arc", props: { highlight: "arc-measure" } },
      source: "MR p. 107",
    },
    {
      id: "arc-length",
      term: "length of an arc",
      turkish: "yay uzunluğu",
      definition: String.raw`The distance along the arc. Its ratio to the circumference equals the ratio of the arc's degree measure to $360^\circ$.`,
      formula: String.raw`\text{length of arc} = \frac{x}{360}\cdot 2\pi r`,
      diagram: { key: "3-5-circles/arc", props: { highlight: "arc-length" } },
      source: "MR p. 108",
    },
    {
      id: "area-of-circle",
      term: "area of a circle",
      turkish: "dairenin alanı",
      definition: String.raw`The area of the region enclosed by a circle of radius $r$, equal to $\pi r^2$.`,
      formula: String.raw`A = \pi r^2`,
      diagram: { key: "3-5-circles/circle-parts", props: { highlight: "area" } },
      source: "MR p. 108",
    },
    {
      id: "sector",
      term: "sector",
      turkish: "daire dilimi",
      definition: String.raw`A region bounded by an arc of the circle and two radii. Its area is the same fraction of the circle's area as its arc's measure is of $360^\circ$.`,
      formula: String.raw`\text{area of sector} = \frac{x}{360}\cdot \pi r^2`,
      diagram: { key: "3-5-circles/arc", props: { highlight: "sector" } },
      source: "MR p. 109",
    },
    {
      id: "tangent",
      term: "tangent",
      turkish: "teğet",
      definition: String.raw`A line in the same plane as a circle that intersects the circle at exactly one point. The radius drawn to that point is perpendicular to the tangent.`,
      diagram: { key: "3-5-circles/tangent", props: { highlight: "tangent" } },
      source: "MR p. 109",
    },
    {
      id: "point-of-tangency",
      term: "point of tangency",
      turkish: "değme noktası / teğet noktası",
      definition: String.raw`The single point where a tangent line meets the circle.`,
      diagram: { key: "3-5-circles/tangent", props: { highlight: "point" } },
      source: "MR p. 109",
    },
    {
      id: "inscribed-polygon",
      term: "inscribed (polygon in a circle)",
      turkish: "çembere içten çizilmiş çokgen / çemberin içine çizilmiş çokgen",
      definition: String.raw`A polygon is inscribed in a circle if all its vertices lie on the circle.`,
      diagram: { key: "3-5-circles/inscribed-polygon", props: { highlight: "polygon" } },
      source: "MR p. 110",
    },
    {
      id: "circumscribed-circle",
      term: "circumscribed (circle about a polygon)",
      turkish: "çevrel çember (çokgenin dışına çizilen çember)",
      definition: String.raw`A circle is circumscribed about a polygon if all the polygon's vertices lie on the circle; equivalently, the polygon is inscribed in the circle.`,
      diagram: { key: "3-5-circles/inscribed-polygon", props: { highlight: "circle" } },
      source: "MR p. 110",
    },
    {
      id: "circumscribed-polygon",
      term: "circumscribed (polygon about a circle)",
      turkish: "çemberin dışına çizilmiş çokgen (teğetler çokgeni)",
      definition: String.raw`A polygon is circumscribed about a circle if each side of the polygon is tangent to the circle.`,
      diagram: { key: "3-5-circles/circumscribed-polygon", props: { highlight: "polygon" } },
      source: "MR p. 111",
    },
    {
      id: "inscribed-circle",
      term: "inscribed (circle in a polygon)",
      turkish: "iç teğet çember (çokgenin içine çizilen çember)",
      definition: String.raw`A circle is inscribed in a polygon if each side of the polygon is tangent to the circle; equivalently, the polygon is circumscribed about the circle.`,
      diagram: { key: "3-5-circles/circumscribed-polygon", props: { highlight: "circle" } },
      source: "MR p. 111",
    },
    {
      id: "concentric-circles",
      term: "concentric circles",
      turkish: "eş merkezli çemberler",
      definition: String.raw`Two or more circles with the same center.`,
      diagram: { key: "3-5-circles/concentric", props: { variant: "term" } },
      source: "MR p. 111",
    },
    {
      id: "inscribed-angle",
      term: "inscribed angle",
      turkish: "çevre açı",
      definition: String.raw`An angle whose vertex lies on a circle and whose sides are chords of the circle, e.g. angle $AVB$.`,
      diagram: { key: "3-5-circles/inscribed-angle" },
      note: "Not named in the ETS Math Review",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      diagram: { key: "3-5-circles/sector-example" },
      stem: String.raw`In the figure above, $O$ is the center of the circle and the measure of angle $AOB$ is $72^\circ$. If the length of the shorter arc between $A$ and $B$ is $4\pi$, what is the area of the shaded sector?`,
      choices: [String.raw`$10\pi$`, String.raw`$16\pi$`, String.raw`$20\pi$`, String.raw`$40\pi$`, String.raw`$100\pi$`],
      answer: 2,
      explanation: [
        String.raw`The central angle is $72^\circ$, so the arc and the sector are both $\frac{72}{360} = \frac{1}{5}$ of their whole.`,
        String.raw`Arc: $\frac{1}{5}(2\pi r) = 4\pi$, so $2\pi r = 20\pi$ and $r = 10$.`,
        String.raw`Sector: $\frac{1}{5}(\pi \cdot 10^2) = \frac{100\pi}{5} = 20\pi$.`,
        String.raw`Trap: $100\pi$ is the area of the whole circle. Find $r$ first, then take the same fraction $\frac{1}{5}$ of the area.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      diagram: { key: "3-5-circles/diameter-triangle", props: { left: "A", right: "C", top: "B", topDeg: 118, center: "O", rightAngle: false }, caption: NTS },
      given: String.raw`$O$ is the center of the circle, $AC$ is a diameter, $AC = 10$, and $B$ is a point on the circle.`,
      quantityA: String.raw`$AB + BC$`,
      quantityB: String.raw`$14$`,
      answer: "D",
      explanation: [
        String.raw`Because $AC$ is a diameter and $B$ is on the circle, triangle $ABC$ has a right angle at $B$, so $AB^2 + BC^2 = 10^2 = 100$.`,
        String.raw`Try a convenient right triangle: $AB = 6$, $BC = 8$ works ($36 + 64 = 100$) and gives $AB + BC = 14$, so the quantities are equal.`,
        String.raw`Now try $AB = BC$: then $2AB^2 = 100$, $AB = 5\sqrt{2}$, and $AB + BC = 10\sqrt{2} \approx 14.14 > 14$. And if $B$ is very close to $A$, $AB$ is close to 0 and $BC$ is close to 10, so the sum is close to 10, less than 14.`,
        String.raw`Since the comparison changes as $B$ moves, the answer is (D). The figure, which is not drawn to scale, shows only one position of $B$.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "hard",
      diagram: { key: "3-5-circles/ring-chord" },
      stem: String.raw`In the figure above, the two circles have the same center $O$. Chord $AB$ of the larger circle is tangent to the smaller circle at $T$, and $AB = 16$. If the area of the shaded region is $k\pi$, what is the value of $k$?`,
      answer: { kind: "decimal", value: "64" },
      explanation: [
        String.raw`Let the radii be $R$ (larger) and $r$ (smaller). The shaded ring has area $\pi R^2 - \pi r^2 = \pi(R^2 - r^2)$, so we need $R^2 - r^2$; we do not need $R$ and $r$ separately.`,
        String.raw`Draw $OT$ and $OA$. $OT = r$ is a radius of the small circle drawn to the point of tangency, so $OT$ is perpendicular to $AB$. $OA = R$ is a radius of the large circle.`,
        String.raw`Triangles $OTA$ and $OTB$ are right triangles with the same hypotenuse length $R$ and the same leg $OT$, so $AT = TB = 8$.`,
        String.raw`Pythagorean theorem in triangle $OTA$: $R^2 = r^2 + 8^2$, so $R^2 - r^2 = 64$. The area is $64\pi$, and $k = 64$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`A circle has area $36\pi$. Which of the following could be the length of a chord of the circle? Indicate all such lengths.`,
      choices: [String.raw`$5$`, String.raw`$6\sqrt{3}$`, String.raw`$12$`, String.raw`$4\sqrt{10}$`, String.raw`$6\pi$`],
      answer: [0, 1, 2],
      explanation: [
        String.raw`$\pi r^2 = 36\pi$ gives $r = 6$, so a diameter has length 12.`,
        String.raw`A chord can have any length greater than 0 and up to the diameter: for chord $PQ$, $PQ \le PO + OQ = 12$ by the triangle inequality, and every length in between occurs as the endpoints move apart.`,
        String.raw`Check the choices: $5 < 12$ yes; $6\sqrt{3} = \sqrt{108} < \sqrt{144}$ yes; $12$ yes (a diameter); $4\sqrt{10} = \sqrt{160} > 12$ no; $6\pi \approx 18.8$ no (that is half the circumference, a curved length).`,
        String.raw`Answer: $5$, $6\sqrt{3}$ and $12$.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`A circle has circumference $18\pi$. What is its area?`,
      answer: String.raw`$81\pi$`,
      explanation: String.raw`$2\pi r = 18\pi$ gives $r = 9$, so the area is $\pi \cdot 9^2 = 81\pi$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Points $A$, $B$, $C$, $D$ lie on a circle and arc $ABC$ measures $40^\circ$. What is the measure of arc $ADC$?`,
      answer: String.raw`$320^\circ$`,
      explanation: String.raw`The two arcs between $A$ and $C$ make up the whole circle: $360^\circ - 40^\circ$.`,
    },
    {
      id: "q3",
      prompt: String.raw`What is the area of a sector with central angle $45^\circ$ in a circle of radius 4?`,
      answer: String.raw`$2\pi$`,
      explanation: String.raw`$\frac{45}{360}\cdot 16\pi = \frac{1}{8}\cdot 16\pi = 2\pi$.`,
    },
    {
      id: "q4",
      prompt: String.raw`Line $\ell$ is tangent at $P$ to a circle with center $O$ and radius 5. Point $Q$ is on $\ell$ with $PQ = 12$. What is $OQ$?`,
      answer: String.raw`$13$`,
      explanation: String.raw`$OP$ is perpendicular to $\ell$, so $OQ = \sqrt{5^2 + 12^2} = 13$.`,
    },
    {
      id: "q5",
      prompt: String.raw`A square is inscribed in a circle of radius 5. What is the area of the square?`,
      answer: String.raw`$50$`,
      explanation: String.raw`The diagonal of the square is a diameter, 10. A square with diagonal $d$ has area $\frac{d^2}{2} = 50$ (side $5\sqrt{2}$).`,
    },
    {
      id: "q6",
      prompt: String.raw`A circle is inscribed in a square of side 10. What is the area of the circle?`,
      answer: String.raw`$25\pi$`,
      explanation: String.raw`The diameter equals the side, so $r = 5$ and the area is $25\pi$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        diagram: { key: "3-5-circles/chord-angle-qc", caption: NTS },
        given: String.raw`$O$ is the center of the circle, the radius of the circle is 6, and the measure of angle $AOB$ is $58^\circ$.`,
        quantityA: String.raw`$AB$`,
        quantityB: String.raw`$6$`,
        answer: "B",
        explanation: [
          String.raw`$OA = OB = 6$ (radii), so triangle $AOB$ is isosceles and its other two angles are equal: each is $\frac{180 - 58}{2} = 61$ degrees.`,
          String.raw`In a triangle, the longer side is opposite the larger angle. $AB$ is opposite the $58^\circ$ angle and $OA = 6$ is opposite a $61^\circ$ angle, so $AB < 6$.`,
          String.raw`Quantity B is greater. The figure makes $AB$ look longer than the radius, but it is not drawn to scale; only the given angle counts. (If the angle were $60^\circ$, the triangle would be equilateral and $AB$ would equal 6.)`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "medium",
        given: String.raw`Two circles are concentric. The radius of the larger circle is 2 more than the radius of the smaller circle.`,
        quantityA: String.raw`The circumference of the larger circle minus the circumference of the smaller circle`,
        quantityB: String.raw`$12$`,
        answer: "A",
        explanation: [
          String.raw`If the radii are $r + 2$ and $r$, the difference of the circumferences is $2\pi(r + 2) - 2\pi r = 4\pi$, whatever $r$ is.`,
          String.raw`$4\pi \approx 12.57 > 12$, so Quantity A is greater.`,
          String.raw`Trap: the radius of neither circle is known, which tempts (D). But the difference does not depend on $r$. (The difference of the _areas_ would depend on $r$.)`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`Square $S$ has sides of length 6. Circle $P$ is circumscribed about $S$, and circle $Q$ is inscribed in $S$.`,
        quantityA: String.raw`The area of the region that is inside circle $P$ and outside circle $Q$`,
        quantityB: String.raw`The area of square $S$`,
        answer: "B",
        explanation: [
          String.raw`Both circles are centered at the center of the square, so they are concentric and the region in Quantity A is a ring.`,
          String.raw`Circle $Q$ (inscribed): its diameter equals the side, so its radius is 3 and its area is $9\pi$.`,
          String.raw`Circle $P$ (circumscribed): its diameter is the diagonal of the square, $6\sqrt{2}$, so its radius is $3\sqrt{2}$ and its area is $\pi(3\sqrt{2})^2 = 18\pi$.`,
          String.raw`Quantity A $= 18\pi - 9\pi = 9\pi \approx 28.3$. Quantity B $= 36$. Quantity B is greater.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A wheel with a diameter of 50 centimeters rolls in a straight line without slipping and makes exactly 140 complete revolutions. Which of the following is closest to the distance, in meters, that the wheel travels?`,
        choices: [String.raw`$70$`, String.raw`$110$`, String.raw`$140$`, String.raw`$220$`, String.raw`$440$`],
        answer: 3,
        explanation: [
          String.raw`Each revolution covers one circumference: $\pi d = 50\pi$ centimeters $= 0.5\pi$ meters.`,
          String.raw`Distance $= 140 \times 0.5\pi = 70\pi \approx 219.9$ meters, closest to 220.`,
          String.raw`Traps: $110 \approx 140 \cdot \pi(0.25)$ forgets the 2 in $2\pi r$; $440 \approx 140 \cdot 2\pi(0.5)$ uses the diameter as the radius; $70$ forgets $\pi$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        diagram: { key: "3-5-circles/tangent-question" },
        stem: String.raw`In the figure above, $O$ is the center of the circle, line $PT$ is tangent to the circle at $T$, and point $Q$ lies on the circle and on segment $OP$. If $PT = 12$ and $PQ = 8$, what is the circumference of the circle?`,
        choices: [String.raw`$5\pi$`, String.raw`$8\pi$`, String.raw`$10\pi$`, String.raw`$13\pi$`, String.raw`$26\pi$`],
        answer: 2,
        explanation: [
          String.raw`Let $r$ be the radius. $OT = r$, and since $Q$ is on the circle, $OQ = r$ and $OP = r + 8$.`,
          String.raw`The radius $OT$ is perpendicular to the tangent at $T$, so triangle $OTP$ has a right angle at $T$: $(r + 8)^2 = r^2 + 12^2$.`,
          String.raw`Expand: $r^2 + 16r + 64 = r^2 + 144$, so $16r = 80$ and $r = 5$. (Check: a 5-12-13 right triangle.)`,
          String.raw`Circumference $= 2\pi(5) = 10\pi$. Traps: $13\pi$ treats $OP = 13$ as the diameter; $26\pi$ treats it as the radius.`,
        ],
      },
      {
        id: "z6",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`Points $A$ and $B$ lie on a circle with center $O$ and radius 6, and $6 < AB < 6\sqrt{2}$. Which of the following could be the length of the shorter arc between $A$ and $B$? Indicate all such lengths.`,
        choices: [String.raw`$2\pi$`, String.raw`$\frac{5\pi}{2}$`, String.raw`$8$`, String.raw`$9$`, String.raw`$3\pi$`, String.raw`$10$`],
        answer: [1, 2, 3],
        explanation: [
          String.raw`Translate the chord condition into a condition on the central angle $AOB$. Triangle $AOB$ has $OA = OB = 6$.`,
          String.raw`If angle $AOB$ is $60^\circ$, the triangle is equilateral and $AB = 6$. If angle $AOB$ is $90^\circ$, it is an isosceles right triangle and $AB = 6\sqrt{2}$. As $B$ moves along the circle away from $A$ (up to a diameter), the central angle and the chord grow together, so $6 < AB < 6\sqrt{2}$ means the measure of angle $AOB$ is strictly between $60^\circ$ and $90^\circ$.`,
          String.raw`Arc length $= \frac{x}{360}\cdot 12\pi$: at $60^\circ$ it is $2\pi \approx 6.28$ and at $90^\circ$ it is $3\pi \approx 9.42$. So the arc length is strictly between $2\pi$ and $3\pi$.`,
          String.raw`Check: $2\pi$ no (endpoint excluded); $\frac{5\pi}{2} \approx 7.85$ yes; $8$ yes; $9$ yes; $3\pi$ no; $10$ no.`,
        ],
      },
      {
        id: "z7",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`A sector of a circle has area $15\pi$, and the arc of the sector has length $5\pi$. What is the measure, in degrees, of the central angle of the sector?`,
        answer: { kind: "decimal", value: "150" },
        suffix: "degrees",
        explanation: [
          String.raw`Let $f = \frac{x}{360}$. Then $f \cdot 2\pi r = 5\pi$ and $f \cdot \pi r^2 = 15\pi$.`,
          String.raw`Divide the second equation by the first: $\frac{r}{2} = 3$, so $r = 6$.`,
          String.raw`Then $f \cdot 12\pi = 5\pi$ gives $f = \frac{5}{12}$, and $x = \frac{5}{12}\cdot 360 = 150$.`,
          String.raw`Check: $\frac{150}{360}\cdot 36\pi = 15\pi$.`,
        ],
      },
      {
        id: "z8",
        type: "mc1",
        difficulty: "hard",
        diagram: {
          key: "3-5-circles/diameter-triangle",
          props: { left: "A", right: "B", top: "C", topDeg: 120, center: "O", rightAngle: false, angleAt: "right", angleText: "30°", leftSide: "5", shadeOutside: true },
        },
        stem: String.raw`In the figure above, $AB$ is a diameter of the circle with center $O$, point $C$ lies on the circle, $AC = 5$, and the measure of angle $ABC$ is $30^\circ$. What is the area of the shaded region?`,
        choices: [
          String.raw`$25\pi - 25\sqrt{3}$`,
          String.raw`$25\pi - \frac{25\sqrt{3}}{2}$`,
          String.raw`$50\pi - \frac{25\sqrt{3}}{2}$`,
          String.raw`$100\pi - 25\sqrt{3}$`,
          String.raw`$100\pi - \frac{25\sqrt{3}}{2}$`,
        ],
        answer: 1,
        explanation: [
          String.raw`$AB$ is a diameter and $C$ is on the circle, so the angle at $C$ is a right angle and triangle $ABC$ is a $30$-$60$-$90$ triangle.`,
          String.raw`$AC = 5$ is opposite the $30^\circ$ angle, so the hypotenuse is $AB = 10$ and $BC = 5\sqrt{3}$.`,
          String.raw`The radius is 5, so the circle's area is $25\pi$. The triangle's area is $\frac{1}{2}(5)(5\sqrt{3}) = \frac{25\sqrt{3}}{2}$.`,
          String.raw`Shaded area $= 25\pi - \frac{25\sqrt{3}}{2}$. Traps: using 10 as the radius gives $100\pi$; forgetting the $\frac{1}{2}$ gives $25\pi - 25\sqrt{3}$.`,
        ],
      },
      {
        id: "z9",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Triangle $XYZ$ is inscribed in a circle with center $O$. Which of the following statements must be true? Indicate all such statements.`,
        choices: [
          String.raw`If $XZ$ is a diameter of the circle, then the measure of angle $XYZ$ is $90^\circ$.`,
          String.raw`$O$ lies inside triangle $XYZ$.`,
          String.raw`If the measure of angle $XYZ$ is $90^\circ$, then $O$ lies on $XZ$.`,
          String.raw`$OX = OY = OZ$`,
          String.raw`If $XZ$ is a diameter of the circle, then $XY = YZ$.`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`First statement: true. A triangle inscribed in a circle with one side a diameter is a right triangle, with the right angle opposite the diameter, at $Y$.`,
          String.raw`Second: not necessarily. The center can be inside, outside, or on a side of an inscribed triangle.`,
          String.raw`Third: true. A right triangle inscribed in a circle has one side that is a diameter. It cannot be $XY$ or $YZ$, because then the right angle would be at $Z$ or $X$, and a triangle has only one right angle. So $XZ$ is a diameter and contains $O$.`,
          String.raw`Fourth: true. $X$, $Y$, $Z$ are on the circle, so each is one radius from $O$.`,
          String.raw`Fifth: not necessarily. $Y$ can be anywhere on the circle other than $X$ and $Z$; for example, sides 6, 8, 10 work with $XY \ne YZ$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        diagram: {
          key: "3-5-circles/diameter-triangle",
          props: { left: "A", right: "B", top: "C", topDeg: 72, center: "O", rightAngle: false, angleAt: "left", angleText: "36°" },
        },
        stem: String.raw`In the figure above, $AB$ is a diameter of the circle with center $O$, point $C$ lies on the circle, and the measure of angle $CAB$ is $36^\circ$. The length of the shorter arc between $A$ and $C$ is what fraction of the circumference of the circle? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 3, denominator: 10 },
        explanation: [
          String.raw`Draw the radius $OC$. Since $OA = OC$, triangle $AOC$ is isosceles, so angle $OCA$ also measures $36^\circ$.`,
          String.raw`The central angle $AOC$ measures $180^\circ - 36^\circ - 36^\circ = 108^\circ$. This is the measure of the shorter arc between $A$ and $C$ (the one not containing $B$).`,
          String.raw`The arc is $\frac{108}{360} = \frac{3}{10}$ of the circumference.`,
          String.raw`Trap: $\frac{36}{360} = \frac{1}{10}$ uses the angle at $A$ as if it were a central angle. Only an angle with its vertex at the center gives the arc's measure directly.`,
        ],
      },
    ],
  },
};

export default section;
