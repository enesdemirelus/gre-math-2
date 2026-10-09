import type { Section } from "../types";

const section: Section = {
  id: "1-5-real-numbers",
  number: "1.5",
  title: "Real Numbers",
  part: "arithmetic",
  mrPages: "16–20",
  summary: String.raw`The real number line, order and intervals, absolute value as distance, and the twelve properties of real numbers the GRE leans on: sign rules, division by zero, the triangle inequality, and what squaring does to numbers between 0 and 1.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The real number line" },
    {
      kind: "p",
      text: String.raw`The [[real-numbers|real numbers]] are all the [[rational-number|rational numbers]] together with all the [[irrational-number|irrational numbers]]. So every integer, fraction and decimal you meet is a real number, and so are numbers like $\sqrt{2}$ and $\pi$ whose decimals never terminate or repeat (MR p. 16). On the GRE this is the whole universe: every number in every question is real, and imaginary numbers never appear (MC p. 4).`,
    },
    {
      kind: "p",
      text: String.raw`The real numbers are pictured on the [[number-line|real number line]]. Every real number corresponds to a point on the line, and every point corresponds to a real number. Numbers to the left of 0 are [[negative|negative]], numbers to the right are [[positive|positive]], and 0 is the only number that is neither (MR p. 16).`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "1-5-real-numbers/real-line",
        caption: String.raw`Rational and irrational numbers sit side by side on the number line: $-2.5$, $-\sqrt{2}$, $-0.6$, $\frac{1}{3}$, $\sqrt{3}$ and $\pi$.`,
      },
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Number lines are drawn to scale",
      text: String.raw`Unlike geometric figures, number lines on the GRE _are_ drawn to scale, the positive direction is to the right, and evenly spaced tick marks really are evenly spaced (MC pp. 11–12). If a question shows points on a number line, you may read their order and estimate their positions from the picture.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Order: less than and greater than" },
    {
      kind: "p",
      text: String.raw`Order on the real numbers is just left and right on the line. A real number $x$ is [[less-than|less than]] $y$, written $x < y$, if $x$ is to the left of $y$; equivalently, $y$ is greater than $x$, written $y > x$. The symbols $x \le y$ and $y \ge x$ also allow $x$ and $y$ to be the same point (MR pp. 16–17).`,
    },
    {
      kind: "p",
      text: String.raw`The one place this bites is with negatives. On the line above, $-2.5$ is to the left of $-\sqrt{2}$, so $-2.5 < -\sqrt{2}$, even though $2.5 > \sqrt{2}$. Among negative numbers, the one that is _farther_ from 0 is the _lesser_ number. Similarly $-\frac{1}{3} > -\frac{1}{2}$, and $-0.09 > -0.1$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Negatives flip your instinct",
      text: String.raw`"Bigger digits, bigger number" is only true for positive numbers. For negatives, compare the distances from 0 and reverse: $-7 < -3$ because 7 is farther from 0. This is also why multiplying both sides of an inequality by a negative number reverses it.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Between, intervals and endpoints" },
    {
      kind: "p",
      text: String.raw`To say that $x$ is [[between|between]] $-1$ and $3$ means $x > -1$ and $x < 3$, written $-1 < x < 3$. The set of all real numbers between two numbers is an [[interval|interval]], and the two numbers are its [[endpoint|endpoints]]. With strict inequalities the endpoints are _not_ included. Changing $<$ to $\le$ at one end or both gives four kinds of interval with two endpoints (MR p. 17):`,
    },
    { kind: "math", tex: String.raw`-1 < x < 3 \qquad -1 \le x < 3 \qquad -1 < x \le 3 \qquad -1 \le x \le 3`, key: true },
    {
      kind: "p",
      text: String.raw`There are also four kinds with a single endpoint, such as $x < 1$, $x \le 1$, $x > 1$ and $x \ge 1$, each consisting of everything on one side of the endpoint, with or without the endpoint itself. The entire number line counts as an interval too (MR pp. 17–18). ETS writes intervals with inequalities like these; you will not need bracket notation such as $[1, 3)$.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "1-5-real-numbers/interval",
        props: { variant: "half" },
        caption: String.raw`The interval $-1 < x \le 3$. A hollow dot marks an endpoint that is not included; a solid dot marks one that is. (These dots are a common textbook convention, not ETS notation.)`,
      },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Counting integers in an interval",
      text: String.raw`"Between" excludes the endpoints. The integers between $-3$ and $4$ are $-2, -1, \ldots, 3$: that is 6 integers, not 8. But "the integers from $-3$ to $4$" includes both ends, with or without the word "inclusive" (MC p. 13), which gives $4 - (-3) + 1 = 8$. Many counting questions hinge on exactly this.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Absolute value is distance" },
    {
      kind: "p",
      text: String.raw`The [[absolute-value|absolute value]] of $x$, written $|x|$, is the distance between $x$ and $0$ on the number line (MR p. 18). So $|3| = 3$ and $|-3| = 3$: both numbers are 3 units from 0. Turning the picture into a formula:`,
    },
    { kind: "math", tex: String.raw`|x| = \begin{cases} x & \text{if } x \ge 0 \\ -x & \text{if } x < 0 \end{cases}`, key: true },
    {
      kind: "p",
      text: String.raw`The second line is the one to remember: when $x$ is negative, $-x$ is positive. For example $|-6.5| = -(-6.5) = 6.5$. It follows that the absolute value of every nonzero number is positive, and $|0| = 0$ (MR p. 18). In other words $|x|$ is always [[nonnegative|nonnegative]].`,
    },
    {
      kind: "diagram",
      diagram: { key: "1-5-real-numbers/abs-value", caption: String.raw`$|-3| = |3| = 3$: both points are 3 units from 0.` },
    },
    {
      kind: "p",
      text: String.raw`The same idea measures the gap between any two numbers: the [[distance|distance between $a$ and $b$]] on the number line is $|a - b|$ (equivalently $|b - a|$). This formula is not stated in the ETS Math Review; it extends the MR's definition of $|x|$ as the distance from $x$ to 0 (MR p. 18), and it matches the convention that "the difference between two quantities" means the positive difference (MC p. 17). The distance from $-2$ to $5$ is $|5 - (-2)| = 7$.`,
    },
    { kind: "math", tex: String.raw`\text{distance between } a \text{ and } b = |a - b|`, key: true },
    {
      kind: "diagram",
      diagram: { key: "1-5-real-numbers/distance" },
    },
    {
      kind: "p",
      text: String.raw`Reading absolute value as distance turns many algebra questions into pictures. $|x - 4| = 3$ says "$x$ is 3 units from 4," so $x = 1$ or $x = 7$. $|x + 2| < 5$ says "$x$ is less than 5 units from $-2$" (because $x + 2 = x - (-2)$), so $-7 < x < 3$. And $|x| = |y|$ just says $x$ and $y$ are equally far from 0, so $x = y$ or $x = -y$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`$-|-8| = -8$, not 8: the absolute value is taken first, then the outer minus sign applies. And $|x| = 5$ has _two_ solutions; a question that seems to determine $x$ from its absolute value often leads to answer (D) in quantitative comparison.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The properties of real numbers" },
    {
      kind: "p",
      text: String.raw`The Math Review lists twelve properties of real numbers $r$, $s$ and $t$ (MR pp. 18–20). The first four are the algebra you use without thinking: addition and multiplication are [[commutative|commutative]] ($r + s = s + r$, $rs = sr$) and [[associative|associative]] ($(r + s) + t = r + (s + t)$, $(rs)t = r(st)$), multiplication is [[distributive|distributive]] over addition, and $0$ and $1$ behave as expected.`,
    },
    { kind: "math", tex: String.raw`r(s + t) = rs + rt \qquad r + 0 = r \qquad (r)(0) = 0 \qquad (r)(1) = r` },
    {
      kind: "p",
      text: String.raw`The next two are about zero, and they are the source of many GRE traps.`,
    },
    {
      kind: "list",
      items: [
        String.raw`**Property 5.** If $rs = 0$, then $r = 0$ or $s = 0$ (or both). For example, if $(x - 3)(2x + 1) = 0$, then $x = 3$ or $x = -\frac{1}{2}$.`,
        String.raw`**Property 6.** Division by 0 is [[undefined|undefined]]. $\frac{9}{0}$ is undefined and so is $\frac{0}{0}$; only $\frac{0}{9} = 0$ is fine. So whenever a variable sits in a denominator, the question has quietly excluded the value that makes it 0.`,
      ],
    },
    {
      kind: "p",
      text: String.raw`Properties 7 to 9 are the sign rules. If $r$ and $s$ are both positive, then $r + s$ and $rs$ are positive. If both are negative, then $r + s$ is negative but $rs$ is positive. If one is positive and the other negative, $rs$ is negative (MR p. 19). Note what is _missing_: when the signs are opposite, the sign of $r + s$ depends on which number is farther from 0.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Sign bookkeeping",
      text: String.raw`A product of nonzero numbers is negative exactly when an odd number of its factors are negative. So if $abc < 0$ and $ab > 0$, then $c < 0$. Even powers are never negative: $x^2 \ge 0$ for every real $x$, which is why $\frac{x^2 y}{z} < 0$ tells you $x \ne 0$ and that $y$ and $z$ have opposite signs.`,
    },
    {
      kind: "p",
      text: String.raw`Properties 10 and 11 connect absolute value with addition and multiplication (MR pp. 19–20):`,
    },
    { kind: "math", tex: String.raw`|r + s| \le |r| + |s| \qquad\qquad |r|\,|s| = |rs|`, key: true },
    {
      kind: "p",
      text: String.raw`The first is the [[triangle-inequality|triangle inequality]]. Absolute values multiply perfectly, but they do not add perfectly: when $r$ and $s$ have opposite signs, part of the sum cancels. With $r = 7$ and $s = -4$, $|r + s| = 3$ while $|r| + |s| = 11$. When $r$ and $s$ have the same sign, or one of them is 0, nothing cancels and the two sides are equal; when they have opposite signs (both nonzero) the inequality is strict. (This equality condition is a standard fact, though not stated in the ETS Math Review; squaring both sides shows it: $|r + s|^2 = r^2 + 2rs + s^2$ and $(|r| + |s|)^2 = r^2 + 2|rs| + s^2$.) Drag the points below to see it.`,
    },
    {
      kind: "interactive",
      key: "1-5-real-numbers/abs-explorer",
      title: "Absolute value explorer",
      caption: String.raw`Drag $a$ and $b$ (or use the sliders). The top bracket is the distance $|a - b|$; the thin brackets are $|a|$ and $|b|$. Watch $|a + b|$ drop below $|a| + |b|$ exactly when $a$ and $b$ are on opposite sides of 0.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Opposite sides of zero",
      text: String.raw`If $r < 0 < s$, the distance between them is $|r - s| = |r| + |s|$: you walk from $r$ to 0 and then from 0 to $s$. If $r$ and $s$ are on the same side of 0, the distance is the difference of $|r|$ and $|s|$ instead. Quantitative comparison questions with points on a number line often reduce to this.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Squares of small numbers" },
    {
      kind: "p",
      text: String.raw`The last property is the one that wins quantitative comparison questions: if $r > 1$ then $r^2 > r$, but if $0 < s < 1$ then $s^2 < s$ (MR p. 20). Squaring makes numbers greater than 1 bigger and makes positive numbers less than 1 smaller: $\left(\frac{2}{3}\right)^2 = \frac{4}{9} < \frac{2}{3}$, and $0.3^2 = 0.09$.`,
    },
    { kind: "math", tex: String.raw`r > 1 \;\Rightarrow\; r^2 > r \qquad\qquad 0 < s < 1 \;\Rightarrow\; s^2 < s`, key: true },
    {
      kind: "p",
      text: String.raw`The GRE pushes this further by asking you to order $x$, $x^2$, $x^3$, $\frac{1}{x}$ and $-x$ without knowing $x$. The answer depends only on which of the regions $x < -1$, $-1 < x < 0$, $0 < x < 1$, $x > 1$ the number lies in (plus the boundary cases $x = \pm 1$). For $0 < x < 1$, for instance, $x^3 < x^2 < x < \frac{1}{x}$; for $-1 < x < 0$, $\frac{1}{x} < x < x^3 < 0 < x^2$. Rather than memorize the four orders, slide $x$ through the regions below and test one value from each region on test day.`,
    },
    {
      kind: "interactive",
      key: "1-5-real-numbers/order-explorer",
      title: "Order explorer",
      caption: String.raw`Move $x$ and see where $-x$, $x^2$, $x^3$ and $\frac{1}{x}$ land. The shaded band is $-1 < x < 1$, where powers shrink toward 0 and $\frac{1}{x}$ escapes outward. Values beyond the drawn range are marked with an arrow.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Plug in one number per region",
      text: String.raw`When a comparison involves powers or reciprocals of an unknown, try a value from each relevant region: something like $-2$, $-\frac{1}{2}$, $\frac{1}{2}$ and $2$. If the given information allows two regions that give different answers, the answer is (D).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Almost every real-number question on the GRE is one of three things in disguise: a picture on the number line (order, intervals, distance), a sign argument (products, sums, even powers), or a region argument (is the number greater than 1, between 0 and 1, between $-1$ and 0, or less than $-1$?). Read absolute values as distances, track signs factor by factor, and when an unknown could lie in more than one region, test each one.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Assuming a variable is positive or an integer when the question does not say so (the GRE allows all real numbers unless restricted; MC pp. 5–6). Forgetting the second solution of $|x| = k$. Counting the endpoints of an interval described with "between." Thinking $\frac{0}{0}$ or $\frac{2}{0}$ is 0. Assuming $|a + b| = |a| + |b|$ when the signs might differ. And assuming $x^2 > x$ for every $x$: it fails for $0 \le x \le 1$.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "real-numbers",
      term: "real numbers",
      turkish: "gerçek sayılar / reel sayılar",
      definition: String.raw`The set consisting of all rational numbers and all irrational numbers. It includes all integers, fractions and decimals. On the GRE, all numbers are real numbers.`,
      source: "MR p. 16; MC p. 4",
    },
    {
      id: "rational-number",
      term: "rational number",
      turkish: "rasyonel sayı",
      definition: String.raw`A number that can be written as a fraction with integers in the numerator and denominator (denominator nonzero). Its decimal either terminates or repeats. Every integer is rational, since $n = \frac{n}{1}$.`,
      source: "MR pp. 7, 16",
    },
    {
      id: "irrational-number",
      term: "irrational number",
      turkish: "irrasyonel sayı",
      definition: String.raw`A real number whose decimal neither terminates nor repeats, such as $\sqrt{2} = 1.41421356\ldots$ or $\pi$. Irrational numbers are not rational.`,
      source: "MR p. 16",
    },
    {
      id: "number-line",
      term: "real number line (number line)",
      turkish: "sayı doğrusu (gerçek sayı doğrusu)",
      definition: String.raw`A line on which every real number corresponds to a point and every point corresponds to a real number. Numbers to the left of 0 are negative and numbers to the right of 0 are positive. GRE number lines are drawn to scale.`,
      diagram: { key: "1-5-real-numbers/real-line" },
      source: "MR p. 16; MC p. 11",
    },
    {
      id: "positive",
      term: "positive number",
      turkish: "pozitif sayı",
      definition: String.raw`A number to the right of 0 on the number line, that is, a number greater than 0.`,
      source: "MR p. 16",
    },
    {
      id: "negative",
      term: "negative number",
      turkish: "negatif sayı",
      definition: String.raw`A number to the left of 0 on the number line, that is, a number less than 0. The number 0 is neither positive nor negative.`,
      source: "MR p. 16; MC p. 5",
    },
    {
      id: "nonnegative",
      term: "nonnegative",
      turkish: "negatif olmayan (sıfır veya pozitif)",
      definition: String.raw`Greater than or equal to 0, that is, positive or 0. For example, absolute values and distances are nonnegative.`,
      formula: String.raw`x \ge 0`,
      note: "Not defined in the ETS Math Review; used in the Math Conventions",
      source: "MC pp. 6, 11",
    },
    {
      id: "less-than",
      term: "less than / greater than",
      turkish: "küçüktür / büyüktür",
      definition: String.raw`$x$ is less than $y$ ($x < y$) if $x$ is to the left of $y$ on the number line; then $y$ is greater than $x$ ($y > x$). With "or equal to" ($x \le y$, $y \ge x$), $x$ may also be the same point as $y$.`,
      formula: String.raw`x < y,\quad y > x,\quad x \le y,\quad y \ge x`,
      source: "MR pp. 16–17",
    },
    {
      id: "between",
      term: "between",
      turkish: "arasında",
      definition: String.raw`$x$ is between 2 and 3 means $x > 2$ and $x < 3$, written $2 < x < 3$. The numbers 2 and 3 themselves are not between 2 and 3.`,
      formula: String.raw`2 < x < 3`,
      source: "MR p. 17",
    },
    {
      id: "interval",
      term: "interval",
      turkish: "aralık",
      definition: String.raw`A set of all real numbers between two endpoints, with or without each endpoint (such as $2 \le x < 3$), or all real numbers on one side of a single endpoint (such as $x > 4$). The entire number line is also an interval.`,
      diagram: { key: "1-5-real-numbers/interval", props: { variant: "half" } },
      source: "MR pp. 17–18",
    },
    {
      id: "endpoint",
      term: "endpoint (of an interval)",
      turkish: "uç nokta",
      definition: String.raw`A boundary number of an interval. In $2 < x < 3$ the endpoints 2 and 3 are not included; in $2 \le x \le 3$ both are.`,
      diagram: { key: "1-5-real-numbers/interval", props: { variant: "closed" } },
      source: "MR p. 17",
    },
    {
      id: "absolute-value",
      term: "absolute value",
      turkish: "mutlak değer",
      definition: String.raw`The distance between a number $x$ and 0 on the number line, written $|x|$. If $x$ is positive, $|x| = x$; if $x$ is negative, $|x| = -x$; and $|0| = 0$. The absolute value of any nonzero number is positive.`,
      formula: String.raw`|x| = \begin{cases} x & x \ge 0 \\ -x & x < 0 \end{cases}`,
      diagram: { key: "1-5-real-numbers/abs-value" },
      source: "MR p. 18",
    },
    {
      id: "distance",
      term: "distance between two numbers",
      turkish: "iki sayı arasındaki uzaklık",
      definition: String.raw`On the number line, the distance between $a$ and $b$ is $|a - b|$, which equals $|b - a|$. Distances are nonnegative.`,
      formula: String.raw`|a - b|`,
      diagram: { key: "1-5-real-numbers/distance" },
      note: "Not stated in the ETS Math Review",
      source: "MC pp. 11, 17",
    },
    {
      id: "triangle-inequality",
      term: "triangle inequality",
      turkish: "üçgen eşitsizliği",
      definition: String.raw`For all real numbers $r$ and $s$, $|r + s| \le |r| + |s|$. For example, $|6 + (-4)| = 2 \le 10 = |6| + |-4|$.`,
      formula: String.raw`|r + s| \le |r| + |s|`,
      source: "MR p. 19",
    },
    {
      id: "commutative",
      term: "commutative property",
      turkish: "değişme özelliği",
      definition: String.raw`The order of addition or multiplication does not matter: $r + s = s + r$ and $rs = sr$ (Property 1 in the Math Review).`,
      formula: String.raw`r + s = s + r,\quad rs = sr`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 18",
    },
    {
      id: "associative",
      term: "associative property",
      turkish: "birleşme özelliği",
      definition: String.raw`The grouping of a sum or product does not matter: $(r + s) + t = r + (s + t)$ and $(rs)t = r(st)$ (Property 2 in the Math Review).`,
      formula: String.raw`(r + s) + t = r + (s + t)`,
      note: "Not named in the ETS Math Review",
      source: "MR pp. 18–19",
    },
    {
      id: "distributive",
      term: "distributive property",
      turkish: "dağılma özelliği",
      definition: String.raw`Multiplication distributes over addition: $r(s + t) = rs + rt$ (Property 3 in the Math Review).`,
      formula: String.raw`r(s + t) = rs + rt`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 19",
    },
    {
      id: "undefined",
      term: "undefined",
      turkish: "tanımsız",
      definition: String.raw`Has no value as a real number. Division by 0 is undefined: $8 \div 0$, $\frac{-3}{0}$ and $\frac{0}{0}$ are all undefined.`,
      source: "MR p. 19; MC p. 7",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "qc",
      difficulty: "medium",
      given: String.raw`$a$ and $b$ are real numbers such that $ab < 0$ and $a + b > 0$.`,
      quantityA: String.raw`$|a|$`,
      quantityB: String.raw`$|b|$`,
      answer: "D",
      explanation: [
        String.raw`$ab < 0$ means one of $a$, $b$ is positive and the other is negative.`,
        String.raw`$a + b > 0$ means the positive one is farther from 0 than the negative one, so the positive one has the greater absolute value.`,
        String.raw`But nothing says _which_ of $a$ and $b$ is positive. With $a = 5$, $b = -2$, Quantity A is greater; with $a = -2$, $b = 5$, Quantity B is greater.`,
        String.raw`The answer is (D). Trap: reading "$a + b > 0$" as "$a$ is the big positive one" because it is written first.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      diagram: { key: "1-5-real-numbers/opposite-sides" },
      given: String.raw`$r$ and $s$ are numbers on the number line above.`,
      quantityA: String.raw`$|r - s|$`,
      quantityB: String.raw`$|r| + |s|$`,
      answer: "C",
      explanation: [
        String.raw`Number lines are drawn to scale, so you can read the signs: $r$ is between $-2$ and $-1$, and $s$ is between 0 and 1. In particular $r < 0 < s$.`,
        String.raw`$|r - s|$ is the distance between $r$ and $s$. Since 0 lies between them, that distance is (distance from $r$ to 0) $+$ (distance from 0 to $s$) $= |r| + |s|$.`,
        String.raw`Algebraically: $r - s < 0$, so $|r - s| = s - r = s + (-r) = |s| + |r|$.`,
        String.raw`The quantities are equal: (C). You do not need the exact positions, only that $r$ and $s$ are on opposite sides of 0.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`How many integers $x$ satisfy $|x + 2| \le 5$?`,
      answer: { kind: "decimal", value: "11" },
      explanation: [
        String.raw`Read it as a distance: $|x + 2| = |x - (-2)|$ is the distance from $x$ to $-2$. So $x$ is at most 5 units from $-2$.`,
        String.raw`That is the interval $-7 \le x \le 3$ (both endpoints included because of $\le$).`,
        String.raw`The integers from $-7$ to $3$ inclusive number $3 - (-7) + 1 = 11$.`,
        String.raw`Traps: 10 forgets to add 1 when counting both endpoints; 9 drops both endpoints as if the inequality were strict.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`If $-1 < x < 0$, which of the following statements must be true? Indicate all such statements.`,
      choices: [String.raw`$x^2 > x$`, String.raw`$x^3 > x$`, String.raw`$\frac{1}{x} > x$`, String.raw`$x^2 > -x$`, String.raw`$|x| > x$`],
      answer: [0, 1, 4],
      explanation: [
        String.raw`Test a typical value first, $x = -\frac{1}{2}$: $x^2 = \frac{1}{4}$, $x^3 = -\frac{1}{8}$, $\frac{1}{x} = -2$, $-x = \frac{1}{2}$, $|x| = \frac{1}{2}$. Then confirm each statement for every $x$ in the interval.`,
        String.raw`$x^2 > x$: true, since $x^2 > 0 > x$.`,
        String.raw`$x^3 > x$: true. $x^3 = x \cdot x^2$ and $0 < x^2 < 1$, so $x^3$ is negative but closer to 0 than $x$ is.`,
        String.raw`$\frac{1}{x} > x$: false. $|x| < 1$ gives $\left|\frac{1}{x}\right| > 1$, so $\frac{1}{x} < -1 < x$.`,
        String.raw`$x^2 > -x$: false. Here $-x = |x|$ is between 0 and 1, and squaring a number between 0 and 1 makes it smaller (MR p. 20), so $x^2 = |x|^2 < |x| = -x$.`,
        String.raw`$|x| > x$: true, since $|x| > 0 > x$.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Evaluate $|-7| - |3 - 10|$.`,
      answer: String.raw`$0$`,
      explanation: String.raw`$|-7| = 7$ and $|3 - 10| = |-7| = 7$, so the difference is $0$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Evaluate $-|-4.5|$.`,
      answer: String.raw`$-4.5$`,
      explanation: String.raw`$|-4.5| = 4.5$; the outer minus sign then gives $-4.5$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Which of $\frac{0}{6}$, $\frac{6}{0}$ and $\frac{0}{0}$ are defined?`,
      answer: String.raw`Only $\frac{0}{6} = 0$.`,
      explanation: String.raw`Division by 0 is undefined, including $\frac{0}{0}$ (MR p. 19).`,
    },
    {
      id: "q4",
      prompt: String.raw`How many integers are between $-3$ and $4$?`,
      answer: String.raw`$6$`,
      explanation: String.raw`"Between" excludes the endpoints: $-2, -1, 0, 1, 2, 3$.`,
    },
    {
      id: "q5",
      prompt: String.raw`What is the distance between $-8$ and $3$ on the number line?`,
      answer: String.raw`$11$`,
      explanation: String.raw`$|3 - (-8)| = 11$. The points are on opposite sides of 0, so it is also $8 + 3$.`,
    },
    {
      id: "q6",
      prompt: String.raw`If $r < 0$ and $s < 0$, what are the signs of $rs$ and $r + s$?`,
      answer: String.raw`$rs > 0$ and $r + s < 0$.`,
      explanation: String.raw`Two negatives multiply to a positive but add to a negative (Property 8, MR p. 19).`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$|x + 1| = 4$`,
        quantityA: String.raw`$x$`,
        quantityB: String.raw`$2$`,
        answer: "D",
        explanation: [
          String.raw`$|x + 1| = |x - (-1)|$ is the distance from $x$ to $-1$. A distance of 4 gives $x = 3$ or $x = -5$.`,
          String.raw`If $x = 3$, Quantity A is greater; if $x = -5$, Quantity B is greater.`,
          String.raw`The answer is (D). Trap: solving only $x + 1 = 4$ and answering (A).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$-1 < y < 0$`,
        quantityA: String.raw`$y^2$`,
        quantityB: String.raw`$-y^3$`,
        answer: "A",
        explanation: [
          String.raw`Both quantities are positive: $y^2 > 0$, and $y^3 < 0$, so $-y^3 > 0$.`,
          String.raw`Write them with $u = |y| = -y$, where $0 < u < 1$: $y^2 = u^2$ and $-y^3 = -(-u)^3 = u^3$.`,
          String.raw`Since $0 < u < 1$, multiplying $u^2$ by $u$ makes it smaller: $u^3 < u^2$. So Quantity A is greater for every allowed $y$.`,
          String.raw`Check with $y = -\frac{1}{2}$: $y^2 = \frac{1}{4}$ and $-y^3 = \frac{1}{8}$. The answer is (A).`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "medium",
        diagram: { key: "1-5-real-numbers/three-points" },
        given: String.raw`$a$, $b$ and $c$ are numbers on the number line above.`,
        quantityA: String.raw`$|a - b| + |b - c|$`,
        quantityB: String.raw`$|a - c|$`,
        answer: "C",
        explanation: [
          String.raw`From the number line, $a < b < c$: $b$ lies between $a$ and $c$.`,
          String.raw`$|a - b|$ is the distance from $a$ to $b$ and $|b - c|$ is the distance from $b$ to $c$. Walking from $a$ to $b$ and then on to $c$ covers exactly the distance from $a$ to $c$, which is $|a - c|$.`,
          String.raw`Algebraically: $|a - b| + |b - c| = (b - a) + (c - b) = c - a = |a - c|$.`,
          String.raw`The quantities are equal: (C). The signs of $a$, $b$, $c$ (two negative, one positive) are a distraction; only their order matters.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`What is the sum of all real numbers $x$ such that $|2x - 6| = 10$?`,
        choices: [String.raw`$2$`, String.raw`$4$`, String.raw`$6$`, String.raw`$8$`, String.raw`$16$`],
        answer: 2,
        explanation: [
          String.raw`$|2x - 6| = 10$ means $2x - 6 = 10$ or $2x - 6 = -10$.`,
          String.raw`So $x = 8$ or $x = -2$, and the sum is $8 + (-2) = 6$.`,
          String.raw`Faster: $|2x - 6| = 2|x - 3|$, so $|x - 3| = 5$. The two solutions are symmetric about 3, so their sum is $2 \cdot 3 = 6$.`,
          String.raw`Trap: 8 is only the positive solution.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`Which of the following describes all real numbers $x$ that are closer to $3$ than to $-7$ on the number line?`,
        choices: [String.raw`$x < -5$`, String.raw`$x < -2$`, String.raw`$x > -5$`, String.raw`$x > -2$`, String.raw`$-2 < x < 3$`],
        answer: 3,
        explanation: [
          String.raw`The condition is $|x - 3| < |x - (-7)|$. The point equally far from $3$ and $-7$ is their midpoint, $\frac{3 + (-7)}{2} = -2$.`,
          String.raw`Every point to the right of $-2$ is closer to $3$; every point to the left is closer to $-7$. So the answer is $x > -2$.`,
          String.raw`Check: $x = 10$ is 7 from 3 and 17 from $-7$, so numbers beyond 3 count too. That rules out $-2 < x < 3$.`,
          String.raw`Trap: $-5$ comes from halving $-7 - 3 = -10$ without adding back to an endpoint.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`If $a$, $b$ and $c$ are real numbers such that $abc < 0$ and $ab > 0$, which of the following must be true?`,
        choices: [String.raw`$a > 0$`, String.raw`$b < 0$`, String.raw`$c < 0$`, String.raw`$a + b > 0$`, String.raw`$a + c < 0$`],
        answer: 2,
        explanation: [
          String.raw`$abc = (ab)c$. Since $ab$ is positive and the product is negative, $c$ must be negative.`,
          String.raw`$ab > 0$ only says $a$ and $b$ have the same sign: both positive or both negative. So neither $a > 0$, $b < 0$ nor $a + b > 0$ is forced.`,
          String.raw`$a + c < 0$ fails for $a = 5$, $b = 1$, $c = -1$, which satisfies both conditions.`,
          String.raw`Only $c < 0$ must be true.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`$r$ and $s$ are nonzero real numbers such that $|r + s| = |r| + |s|$. Which of the following must be true? Indicate all such statements.`,
        choices: [
          String.raw`$rs > 0$`,
          String.raw`$r > 0$ and $s > 0$`,
          String.raw`$|r - s| < |r| + |s|$`,
          String.raw`$r + s > 0$`,
          String.raw`$|r| > |s|$`,
        ],
        answer: [0, 2],
        explanation: [
          String.raw`Square both sides (both are nonnegative): $r^2 + 2rs + s^2 = r^2 + 2|rs| + s^2$, so $rs = |rs|$, which means $rs \ge 0$. Since $r$ and $s$ are nonzero, $rs > 0$: they have the same sign. The first statement is true.`,
          String.raw`Same sign does not mean positive: $r = s = -1$ satisfies the condition. So "$r > 0$ and $s > 0$" and "$r + s > 0$" need not hold.`,
          String.raw`$|r - s|^2 = r^2 - 2rs + s^2$, which is less than $r^2 + 2rs + s^2 = (|r| + |s|)^2$ because $rs > 0$. So $|r - s| < |r| + |s|$: true. (On the number line: two points on the same side of 0 are closer together than the sum of their distances from 0.)`,
          String.raw`$|r| > |s|$ fails for $r = s = 2$.`,
          String.raw`Answer: the first and third statements.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`The number $x$ is between $-2$ and $3$ on the number line. Which of the following could be the value of $|x|$? Indicate all such values.`,
        choices: [String.raw`$0$`, String.raw`$1.9$`, String.raw`$2$`, String.raw`$2.5$`, String.raw`$3$`, String.raw`$3.5$`],
        answer: [0, 1, 2, 3],
        explanation: [
          String.raw`"Between" means $-2 < x < 3$. On the negative side $x$ can be as far as (but not equal to) 2 from 0; on the positive side, as far as (but not equal to) 3.`,
          String.raw`So $|x|$ can be any number with $0 \le |x| < 3$: $|x| = 0$ when $x = 0$, $|x| = 1.9$ when $x = 1.9$ or $-1.9$, $|x| = 2$ when $x = 2$, and $|x| = 2.5$ when $x = 2.5$.`,
          String.raw`$|x| = 3$ would need $x = 3$ or $x = -3$, and neither is between $-2$ and $3$. $|x| = 3.5$ is too large.`,
          String.raw`Trap: rejecting $2$ because $-2$ is excluded; $x = 2$ itself is allowed.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`How many integers $x$ satisfy $|x - 2| + |x + 3| = 5$?`,
        answer: { kind: "decimal", value: "6" },
        explanation: [
          String.raw`Read each term as a distance: $|x - 2|$ is the distance from $x$ to $2$, and $|x + 3|$ is the distance from $x$ to $-3$.`,
          String.raw`The distance between $-3$ and $2$ is 5. If $x$ is anywhere from $-3$ to $2$ (inclusive), the two distances add up to exactly 5. If $x$ is outside that interval, the sum is more than 5 (for example $x = 3$ gives $1 + 6 = 7$).`,
          String.raw`So the solutions are all real $x$ with $-3 \le x \le 2$, and the integers among them are $-3, -2, -1, 0, 1, 2$: 6 integers.`,
          String.raw`Trap: solving case by case and finding only the endpoints $x = -3$ and $x = 2$, which gives 2.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`If $|a| = 7$, $|b| = 3$ and $ab < 0$, what is the greatest possible value of $a + b$?`,
        answer: { kind: "decimal", value: "4" },
        explanation: [
          String.raw`$a = \pm 7$ and $b = \pm 3$, and $ab < 0$ means they have opposite signs.`,
          String.raw`The two cases are $a = 7$, $b = -3$ (sum $4$) and $a = -7$, $b = 3$ (sum $-4$).`,
          String.raw`The greatest possible value is $4$. Trap: $10$ ignores the condition $ab < 0$.`,
        ],
      },
    ],
  },
};

export default section;
