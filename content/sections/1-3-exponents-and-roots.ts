import type { Section } from "../types";

const section: Section = {
  id: "1-3-exponents-and-roots",
  number: "1.3",
  title: "Exponents and Roots",
  part: "arithmetic",
  mrPages: "11–14",
  summary: String.raw`What a power and a root actually mean, how signs behave under powers, why the symbol $\sqrt{\ }$ never gives a negative number, and the GRE's favorite question about exponents: how $x$, $x^2$, $x^3$, $\sqrt{x}$ and $\frac{1}{x}$ line up for numbers less than $-1$, between $-1$ and $0$, between $0$ and $1$, and greater than $1$.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Powers: base and exponent" },
    {
      kind: "p",
      text: String.raw`An [[exponent]] is shorthand for repeated multiplication of a number by itself: $3^4 = (3)(3)(3)(3) = 81$ and $5^3 = (5)(5)(5) = 125$. In $3^4$ the number 3 is the [[base]], 4 is the exponent, and the whole expression is read "3 to the fourth [[power]]." When the exponent is 2 the process is called [[squaring]] ("6 squared is 36"), and an exponent of 3 is read "to the third power," or more casually "[[cube|cubed]]" (MR pp. 11–12).`,
    },
    { kind: "math", tex: String.raw`a^n = \underbrace{(a)(a)\cdots(a)}_{n \text{ factors}}`, key: true },
    {
      kind: "p",
      text: String.raw`Exponents bind tighter than anything except parentheses. The GRE's order of operations is: parentheses, exponentiation, negation, multiplication and division, addition and subtraction (MC p. 6). So $2 \cdot 3^2 = 2 \cdot 9 = 18$, not $6^2$, and, more dangerously, $-3^2$ means "the negative of 3 squared":`,
    },
    { kind: "math", tex: String.raw`-3^2 = -(3 \cdot 3) = -9 \qquad\text{but}\qquad (-3)^2 = (-3)(-3) = 9`, key: true },
    {
      kind: "aside",
      tone: "watch",
      title: "Substituting a negative number",
      text: String.raw`When you plug a negative value into an expression, wrap it in parentheses first. If $x = -3$, then $x^2 = (-3)^2 = 9$ but $-x^2 = -(-3)^2 = -9$. Writing $-3^2$ for $x^2$ is the single most common sign slip on exponent questions.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Negative bases: the sign of a power" },
    {
      kind: "p",
      text: String.raw`A power of a negative number may come out positive or negative: $(-3)^2 = 9$, while $(-3)^5 = (-3)(-3)(-3)(-3)(-3) = -243$. The negative factors pair off, so the sign depends only on whether the exponent is even or odd. A negative number raised to an even power is always positive, and a negative number raised to an odd power is always negative (MR p. 12).`,
    },
    { kind: "math", tex: String.raw`\text{for } a > 0:\qquad (-a)^n = \begin{cases} a^n & n \text{ even} \\ -a^n & n \text{ odd} \end{cases}`, key: true },
    {
      kind: "p",
      text: String.raw`Two consequences carry most GRE questions. First, an even power never reveals the sign of its base: $x^2 = 25$ is true for $x = 5$ and for $x = -5$, and $x^2 > 0$ for every nonzero $x$. Second, an odd power always keeps the sign of its base: if $x^3 < 0$ then $x < 0$, and $x^3 = -125$ forces $x = -5$. Powers of $-1$ simply alternate: $(-1)^{\text{even}} = 1$ and $(-1)^{\text{odd}} = -1$, so $(-1)^{75} = -1$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE uses it",
      text: String.raw`Expect statements like "$x^3 y^2 < 0$" in a QC or a "must be true" question. Since $y^2 > 0$ (with $y \ne 0$), the sign of the product is the sign of $x^3$, which is the sign of $x$: so $x < 0$, and nothing at all is known about the sign of $y$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Zero and negative exponents" },
    {
      kind: "p",
      text: String.raw`Exponents can also be zero or negative. These are definitions, chosen so that the patterns of positive exponents keep working, and both require a **nonzero** base (MR p. 12):`,
    },
    { kind: "math", tex: String.raw`a^0 = 1 \qquad a^{-1} = \frac{1}{a},\quad a^{-2} = \frac{1}{a^2},\quad a^{-3} = \frac{1}{a^3}, \;\ldots \qquad (a \ne 0)`, key: true },
    {
      kind: "p",
      text: String.raw`So a [[zero-exponent|zero exponent]] always gives 1, as in $7^0 = 1$ and $(-12)^0 = 1$, while $0^0$ is undefined. A [[negative-exponent|negative exponent]] means "take the [[reciprocal]] of the corresponding positive power": $2^{-3} = \frac{1}{8}$, $10^{-2} = \frac{1}{100}$, and $\left(\frac{2}{3}\right)^{-2} = \frac{1}{4/9} = \frac{9}{4}$. The identity $(a)(a^{-1}) = (a)\left(\frac{1}{a}\right) = 1$ is why $a^{-1}$ is exactly the reciprocal of $a$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "A negative exponent is not a negative number",
      text: String.raw`$2^{-3} = \frac{1}{8}$ is positive. The exponent decides "reciprocal or not"; only the base decides the sign. Compare $(-2)^{-3} = \frac{1}{(-2)^3} = -\frac{1}{8}$ and $-2^{-2} = -\frac{1}{4}$. And because the definitions need $a \ne 0$, expressions like $0^{-1}$ and $0^0$ are not defined.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "How powers change the size of a number" },
    {
      kind: "p",
      text: String.raw`This is the part of exponents that the GRE tests most, usually through Quantitative Comparison. The Math Review states the core fact: if $r > 1$, then $r^2 > r$, but if $0 < s < 1$, then $s^2 < s$; for example, $5^2 = 25 > 5$ while $\left(\frac{1}{5}\right)^2 = \frac{1}{25} < \frac{1}{5}$ (MR p. 20). The reason is that multiplying a positive number by a factor greater than 1 makes it larger, and multiplying by a factor between 0 and 1 makes it smaller.`,
    },
    {
      kind: "p",
      text: String.raw`Follow that reasoning through each region of the number line. **Between 0 and 1**, every extra factor of $x$ shrinks the result, so $x^3 < x^2 < x$; the square root goes the other way, $\sqrt{x} > x$ (for instance $\sqrt{0.25} = 0.5$), and the reciprocal is greater than 1. **Greater than 1**, everything reverses: $x < x^2 < x^3$, while $\sqrt{x}$ lies between 1 and $x$ and $\frac{1}{x}$ lies between 0 and 1. **For negative numbers**, $x^2$ is positive while $x$ and $x^3$ are negative. Between $-1$ and $0$, $x^3$ has a smaller absolute value than $x$, so it sits closer to 0: $x < x^3$ (try $x = -0.5$: $-0.5 < -0.125$). Below $-1$ it is the opposite: $x^3 < x$. The square root of a negative number is not defined.`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{array}{ll}
x < -1: & x^3 < x < \tfrac{1}{x} < 0 < x^2 \\[4pt]
-1 < x < 0: & \tfrac{1}{x} < x < x^3 < 0 < x^2 \\[4pt]
0 < x < 1: & x^3 < x^2 < x < \sqrt{x} < 1 < \tfrac{1}{x} \\[4pt]
x > 1: & \tfrac{1}{x} < 1 < \sqrt{x} < x < x^2 < x^3
\end{array}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`Don't memorise the table; rebuild it in five seconds with one test value per region, such as $-2$, $-\frac{1}{2}$, $\frac{1}{2}$ and $2$. The explorer below does exactly that for any $x$ you choose. Turn off the ordering, predict it, then check.`,
    },
    {
      kind: "interactive",
      key: "1-3-exponents-and-roots/powers-explorer",
      title: "Powers explorer",
      caption: String.raw`Move the slider or pick a region. The number line is drawn to scale from $-2$ to $2$; an arrow on a label means the value is off the line. Watch what happens at the boundaries $x = -1$, $0$ and $1$, where some of the values become equal.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "The QC reflex",
      text: String.raw`When a QC compares powers of an unknown, say $x^2$ and $x^3$, test one number from **each** region, plus the boundary values $-1$, $0$ and $1$. If the given information already restricts $x$ to one region, the comparison is fixed. If it allows two regions, as "$x^3 < x$" does ($x < -1$ or $0 < x < 1$), the answer is often (D).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Square roots" },
    {
      kind: "p",
      text: String.raw`A [[square-root|square root]] of a nonnegative number $n$ is a number $r$ such that $r^2 = n$. So 16 has two square roots, $4$ and $-4$. In general, every positive number has two square roots, one positive and one negative; the only square root of 0 is 0; and negative numbers have no square roots in the real number system (MR p. 12), which is the only system the GRE uses (MC p. 4).`,
    },
    {
      kind: "p",
      text: String.raw`The [[sqrt-symbol|symbol]] $\sqrt{\ }$ picks one of the two: placed over a nonnegative number it denotes the **nonnegative** square root. Thus $\sqrt{100} = 10$, the other root is written $-\sqrt{100} = -10$, and $\sqrt{0} = 0$ (MR p. 12).`,
    },
    { kind: "math", tex: String.raw`\sqrt{n} \ge 0 \quad\text{and}\quad \left(\sqrt{n}\right)^2 = n \qquad (n \ge 0)`, key: true },
    {
      kind: "p",
      text: String.raw`Keep the equation and the symbol apart. The equation $x^2 = 16$ has two solutions, $x = 4$ and $x = -4$, because it asks for _every_ square root of 16. The expression $\sqrt{16}$ is a single number, $4$. The same distinction explains what happens when you take the root of a square: $\sqrt{(-3)^2} = \sqrt{9} = 3$, not $-3$ (MR p. 33, answer to Exercise 8(g)). In general $\sqrt{x^2}$ is the nonnegative one of $x$ and $-x$, which is the absolute value of $x$ (MR p. 18):`,
    },
    { kind: "math", tex: String.raw`\sqrt{x^2} = |x| \quad\text{for every real } x`, key: true },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`The Math Review's rule $\sqrt{a^2} = a$ is stated only for $a > 0$ (MR p. 13). If a question lets $x$ be negative, $\sqrt{x^2} = x$ is false; it is $-x$. A condition like "$\sqrt{x^2} = -x$" is the GRE's way of saying $x \le 0$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Rules for square roots" },
    {
      kind: "p",
      text: String.raw`The Math Review gives four rules, each for $a > 0$ and $b > 0$ (MR p. 13). The first two say that squaring and taking the square root undo each other; the last two say that roots can be multiplied and divided under one radical.`,
    },
    {
      kind: "math",
      tex: String.raw`\left(\sqrt{a}\right)^2 = a \qquad \sqrt{a^2} = a \qquad \sqrt{a}\,\sqrt{b} = \sqrt{ab} \qquad \frac{\sqrt{a}}{\sqrt{b}} = \sqrt{\frac{a}{b}}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`Rule 3, read backwards, is how you simplify a root: split off the largest [[perfect-square|perfect square]] factor. $\sqrt{72} = \sqrt{36}\sqrt{2} = 6\sqrt{2}$ and $\sqrt{300} = \sqrt{100}\sqrt{3} = 10\sqrt{3}$. Rule 4 often collapses a quotient to an integer: $\frac{\sqrt{45}}{\sqrt{5}} = \sqrt{9} = 3$.`,
    },
    {
      kind: "p",
      text: String.raw`Once simplified, multiples of the same root combine like like terms: $\sqrt{8} + \sqrt{18} = 2\sqrt{2} + 3\sqrt{2} = 5\sqrt{2}$. What you may **not** do is add under the radical: $\sqrt{9} + \sqrt{16} = 3 + 4 = 7$, but $\sqrt{9 + 16} = 5$. There is no addition rule for roots (MR p. 43 lists $\sqrt{x^2 + y^2} \ne x + y$ among the common mistakes).`,
    },
    {
      kind: "p",
      text: String.raw`You will sometimes want a root out of a denominator. Multiplying the top and bottom by the same root uses Rule 1: $\frac{6}{\sqrt{3}} = \frac{6\sqrt{3}}{\sqrt{3}\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$. The GRE does not require this form (the Math Review itself leaves an answer as $\frac{\sqrt{5}}{3\sqrt{2}}$ on p. 11), but answer choices may be written either way, so be ready to convert.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Estimating roots",
      text: String.raw`To place a root, trap it between perfect squares: $49 < 50 < 64$, so $7 < \sqrt{50} < 8$, and since 50 is much closer to 49, $\sqrt{50}$ is just above 7 (about 7.07). It pays to know $\sqrt{2} \approx 1.41$ and $\sqrt{3} \approx 1.73$; then $6\sqrt{2} \approx 8.5$ and $10\sqrt{3} \approx 17.3$ follow at once. The on-screen calculator also has a square-root key.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Cube roots and higher roots" },
    {
      kind: "p",
      text: String.raw`A square root is a root of [[root-order|order]] 2. The [[cube-root|cube root]] of $n$, written $\sqrt[3]{n}$, and the [[fourth-root|fourth root]], written $\sqrt[4]{n}$, are numbers whose third and fourth powers, respectively, equal $n$. They obey the first two rules above with 2 replaced by 3 or 4: $\left(\sqrt[3]{a}\right)^3 = a$ and $\sqrt[3]{a^3} = a$, for example (MR p. 13).`,
    },
    {
      kind: "p",
      text: String.raw`Odd and even orders behave differently in the real numbers (MR p. 14). An **odd** order root exists for every number and there is exactly one, even when the number is negative: $\sqrt[3]{8} = 2$ and $\sqrt[3]{-8} = -2$. An **even** order root behaves like a square root: a positive number has exactly two (the fourth roots of 8 are $\sqrt[4]{8}$ and $-\sqrt[4]{8}$), and a negative number has none, so $-8$ has no fourth root.`,
    },
    { kind: "math", tex: String.raw`\sqrt[3]{-27} = -3 \qquad\quad \sqrt[4]{81} = 3 \qquad\quad \sqrt[4]{-16}\ \text{is not a real number}`, key: true },
    {
      kind: "aside",
      tone: "tip",
      text: String.raw`An odd root keeps the sign of the number, exactly as an odd power does, so odd roots are the safe ones: $x^3 = -64$ has the single solution $x = \sqrt[3]{-64} = -4$. Even roots and even powers are where solutions get lost or doubled. Knowing the cubes $2^3 = 8$, $3^3 = 27$, $4^3 = 64$, $5^3 = 125$ and $10^3 = 1{,}000$ by heart saves time on cube-root and volume questions.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Most exponent-and-root questions on the GRE test one of three things: signs (even powers hide the sign, odd powers keep it), size (powers and roots move numbers between 0 and 1 the "wrong" way), and the meaning of $\sqrt{\ }$ (always the nonnegative root). Simplifying roots with the product and quotient rules is the arithmetic that holds these together.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Reading $-x^2$ as $(-x)^2$. Treating a negative exponent as making the number negative. Assuming that squaring makes a number bigger, which fails for numbers between 0 and 1 (and $x^3 > x$ fails for numbers between $-1$ and 0). Writing $\sqrt{16} = \pm 4$, or $\sqrt{x^2} = x$ for negative $x$. Adding under a radical, $\sqrt{a} + \sqrt{b} = \sqrt{a + b}$. And forgetting that an equation like $x^2 = 9$ has two solutions while $x^3 = -8$ has one.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "exponent",
      term: "exponent",
      turkish: "üs",
      definition: String.raw`The number that tells how many times the base is used as a factor in repeated multiplication. In $3^4$ the exponent is 4.`,
      formula: String.raw`3^4 = (3)(3)(3)(3) = 81`,
      source: "MR p. 11",
    },
    {
      id: "base",
      term: "base",
      turkish: "taban",
      definition: String.raw`The number that is multiplied by itself in a power. In $3^4$ the base is 3.`,
      source: "MR p. 11",
    },
    {
      id: "power",
      term: "power (“to the nth power”)",
      turkish: "kuvvet (üslü ifade)",
      definition: String.raw`An expression $a^n$, read "$a$ to the $n$th power"; for example, $3^4$ is read "3 to the fourth power," and 5 to the third power is 125.`,
      source: "MR p. 11",
    },
    {
      id: "squaring",
      term: "squaring (“squared”)",
      turkish: "kare alma (bir sayının karesi)",
      definition: String.raw`Raising a number to the exponent 2. "6 squared is 36" means $6^2 = 36$.`,
      formula: String.raw`7^2 = (7)(7) = 49`,
      source: "MR p. 12",
    },
    {
      id: "cube",
      term: "cubed (“to the third power”)",
      turkish: "küp (bir sayının küpü)",
      definition: String.raw`Raising a number to the exponent 3; "5 cubed" means $5^3 = 125$. The Math Review says "to the third power."`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 11",
    },
    {
      id: "zero-exponent",
      term: "zero exponent",
      turkish: "sıfır üs (sıfırıncı kuvvet)",
      definition: String.raw`For every nonzero number $a$, $a^0 = 1$. The expression $0^0$ is undefined.`,
      formula: String.raw`a^0 = 1 \quad (a \ne 0)`,
      source: "MR p. 12",
    },
    {
      id: "negative-exponent",
      term: "negative exponent",
      turkish: "negatif üs",
      definition: String.raw`For every nonzero number $a$, $a^{-1} = \frac{1}{a}$, $a^{-2} = \frac{1}{a^2}$, $a^{-3} = \frac{1}{a^3}$, and so on.`,
      formula: String.raw`a^{-n} = \frac{1}{a^n} \quad (a \ne 0)`,
      source: "MR p. 12",
    },
    {
      id: "reciprocal",
      term: "reciprocal",
      turkish: "çarpmaya göre ters",
      definition: String.raw`The reciprocal of a nonzero number $a$ is $\frac{1}{a}$, the number whose product with $a$ is 1; it equals $a^{-1}$. The reciprocal of a fraction is found by inverting it.`,
      formula: String.raw`(a)\left(a^{-1}\right) = 1`,
      source: "MR pp. 9, 12",
    },
    {
      id: "square-root",
      term: "square root",
      turkish: "karekök",
      definition: String.raw`A square root of a nonnegative number $n$ is a number $r$ such that $r^2 = n$. Every positive number has two square roots, one positive and one negative; the only square root of 0 is 0; negative numbers have no real square roots.`,
      source: "MR p. 12",
    },
    {
      id: "sqrt-symbol",
      term: "square root symbol √",
      turkish: "karekök işareti (√)",
      definition: String.raw`Placed over a nonnegative number $n$, $\sqrt{n}$ denotes the nonnegative square root of $n$; the negative square root of a positive $n$ is written $-\sqrt{n}$. So $\sqrt{100} = 10$ and $-\sqrt{100} = -10$.`,
      source: "MR p. 12; MC p. 6",
    },
    {
      id: "perfect-square",
      term: "perfect square",
      turkish: "tam kare",
      definition: String.raw`The square of an integer, such as 1, 4, 9, 16, 25, 36. Splitting off the largest perfect square factor simplifies a root: $\sqrt{72} = \sqrt{36}\sqrt{2} = 6\sqrt{2}$.`,
      note: "Not named in the ETS Math Review",
    },
    {
      id: "root-order",
      term: "order of a root",
      turkish: "kökün derecesi",
      definition: String.raw`A square root is a root of order 2, a cube root has order 3 and a fourth root has order 4. Odd order roots exist for every real number (exactly one); even order roots exist only for nonnegative numbers (exactly two for a positive number).`,
      source: "MR pp. 13–14",
    },
    {
      id: "cube-root",
      term: "cube root",
      turkish: "küpkök",
      definition: String.raw`The cube root of $n$, written $\sqrt[3]{n}$, is the number whose third power is $n$. Every real number has exactly one cube root: $\sqrt[3]{8} = 2$ and $\sqrt[3]{-8} = -2$.`,
      formula: String.raw`\left(\sqrt[3]{n}\right)^3 = n`,
      source: "MR pp. 13–14",
    },
    {
      id: "fourth-root",
      term: "fourth root",
      turkish: "dördüncü dereceden kök",
      definition: String.raw`A number whose fourth power is $n$; the positive one is written $\sqrt[4]{n}$. A positive number has two fourth roots, $\sqrt[4]{n}$ and $-\sqrt[4]{n}$; a negative number has none.`,
      formula: String.raw`\left(\sqrt[4]{n}\right)^4 = n`,
      source: "MR pp. 13–14",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "qc",
      difficulty: "medium",
      diagram: { key: "1-3-exponents-and-roots/number-line" },
      given: String.raw`The number $x$ is shown on the number line above.`,
      quantityA: String.raw`$x^3$`,
      quantityB: String.raw`$x$`,
      answer: "A",
      explanation: [
        String.raw`The number line shows $-1 < x < 0$. (Number lines are drawn to scale, but here only the region matters.)`,
        String.raw`Both quantities are negative. Since $|x| < 1$, multiplying by $x^2$ (a number between 0 and 1) shrinks the absolute value: $|x^3| = |x| \cdot x^2 < |x|$. So $x^3$ is closer to 0 than $x$ is.`,
        String.raw`Among negative numbers, the one closer to 0 is greater, so $x^3 > x$. Check: $x = -0.5$ gives $x^3 = -0.125 > -0.5$.`,
        String.raw`Quantity A is greater. Trap: "cubing makes numbers bigger" leads to the right letter here for the wrong reason, and to the wrong letter if $x$ were less than $-1$, where $x^3 < x$.`,
      ],
    },
    {
      id: "ex2",
      type: "mc1",
      difficulty: "hard",
      stem: String.raw`If $0 < x < 1$, which of the following lists the numbers $\frac{1}{x}$, $\sqrt{x}$, $x$ and $x^2$ in order from least to greatest?`,
      choices: [
        String.raw`$x^2,\ x,\ \sqrt{x},\ \frac{1}{x}$`,
        String.raw`$x^2,\ \sqrt{x},\ x,\ \frac{1}{x}$`,
        String.raw`$x,\ x^2,\ \sqrt{x},\ \frac{1}{x}$`,
        String.raw`$\sqrt{x},\ x,\ x^2,\ \frac{1}{x}$`,
        String.raw`$\frac{1}{x},\ \sqrt{x},\ x,\ x^2$`,
      ],
      answer: 0,
      explanation: [
        String.raw`Pick a convenient test value in the interval: $x = \frac{1}{4}$.`,
        String.raw`Then $x^2 = \frac{1}{16}$, $x = \frac{1}{4}$, $\sqrt{x} = \frac{1}{2}$ and $\frac{1}{x} = 4$, so the order is $x^2 < x < \sqrt{x} < \frac{1}{x}$.`,
        String.raw`Why it holds for every $x$ in the interval: multiplying $x$ by $x < 1$ shrinks it, so $x^2 < x$; $\sqrt{x}$ is a number between 0 and 1 whose square is $x$, so by the same fact $x < \sqrt{x}$; and $\sqrt{x} < 1 < \frac{1}{x}$.`,
        String.raw`Trap: choice (C) assumes squaring always makes a number bigger, which is true only for numbers greater than 1.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`What is the value of $\dfrac{\sqrt{48} + \sqrt{27}}{\sqrt{3}}$ ?`,
      answer: { kind: "decimal", value: "7" },
      explanation: [
        String.raw`Simplify each root by splitting off a perfect square: $\sqrt{48} = \sqrt{16}\sqrt{3} = 4\sqrt{3}$ and $\sqrt{27} = \sqrt{9}\sqrt{3} = 3\sqrt{3}$.`,
        String.raw`The numerator is $4\sqrt{3} + 3\sqrt{3} = 7\sqrt{3}$, and $\frac{7\sqrt{3}}{\sqrt{3}} = 7$.`,
        String.raw`Alternative: divide term by term with Rule 4, $\sqrt{\frac{48}{3}} + \sqrt{\frac{27}{3}} = \sqrt{16} + \sqrt{9} = 4 + 3 = 7$. (Splitting a fraction over a sum in the _numerator_ is allowed.)`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`Which of the following are equal to $6\sqrt{2}$ ? Indicate all such numbers.`,
      choices: [
        String.raw`$\sqrt{72}$`,
        String.raw`$\sqrt{36} + \sqrt{2}$`,
        String.raw`$\sqrt{12}\,\sqrt{6}$`,
        String.raw`$2\sqrt{8}$`,
        String.raw`$\dfrac{\sqrt{144}}{\sqrt{2}}$`,
        String.raw`$\sqrt{38}$`,
      ],
      answer: [0, 2, 4],
      explanation: [
        String.raw`Square the target: $\left(6\sqrt{2}\right)^2 = 36 \cdot 2 = 72$, so the question is which choices equal $\sqrt{72}$.`,
        String.raw`$\sqrt{72}$: yes. $\sqrt{12}\,\sqrt{6} = \sqrt{72}$: yes (Rule 3). $\frac{\sqrt{144}}{\sqrt{2}} = \sqrt{72}$: yes (Rule 4); equivalently $\frac{12}{\sqrt{2}} = \frac{12\sqrt{2}}{2} = 6\sqrt{2}$.`,
        String.raw`$\sqrt{36} + \sqrt{2} = 6 + \sqrt{2} \approx 7.41$: no; a coefficient multiplies the root, it is not added. $2\sqrt{8} = 2 \cdot 2\sqrt{2} = 4\sqrt{2}$: no. $\sqrt{38} = \sqrt{36 + 2}$: no; roots do not add.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Evaluate $-2^4$ and $(-2)^4$.`,
      answer: String.raw`$-16$ and $16$`,
      explanation: String.raw`Exponentiation comes before negation, so $-2^4 = -(2^4) = -16$; the parentheses make $(-2)^4 = 16$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Evaluate $\left(\frac{3}{5}\right)^{-2}$.`,
      answer: String.raw`$\frac{25}{9}$`,
      explanation: String.raw`$\left(\frac{3}{5}\right)^{-2} = \frac{1}{9/25} = \frac{25}{9}$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Simplify $\sqrt{75}$.`,
      answer: String.raw`$5\sqrt{3}$`,
      explanation: String.raw`$\sqrt{75} = \sqrt{25}\sqrt{3} = 5\sqrt{3}$.`,
    },
    {
      id: "q4",
      prompt: String.raw`What is $\sqrt{(-7)^2}$?`,
      answer: String.raw`$7$`,
      explanation: String.raw`$\sqrt{(-7)^2} = \sqrt{49} = 7$. The symbol $\sqrt{\ }$ always gives the nonnegative root, so $\sqrt{x^2} = |x|$.`,
    },
    {
      id: "q5",
      prompt: String.raw`How many real solutions does $x^4 = 81$ have? And $x^3 = -64$?`,
      answer: String.raw`Two ($\pm 3$); one ($-4$)`,
      explanation: String.raw`A positive number has two fourth roots, $3$ and $-3$. An odd order root is unique: $\sqrt[3]{-64} = -4$.`,
    },
    {
      id: "q6",
      prompt: String.raw`If $-1 < x < 0$, which is greater, $x^2$ or $x^3$?`,
      answer: String.raw`$x^2$`,
      explanation: String.raw`$x^2 > 0$ while $x^3 < 0$, because an odd power of a negative number is negative.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "easy",
        quantityA: String.raw`$-3^4$`,
        quantityB: String.raw`$(-3)^3$`,
        answer: "B",
        explanation: [
          String.raw`Quantity A: exponentiation comes before negation, so $-3^4 = -(3^4) = -81$.`,
          String.raw`Quantity B: an odd power of a negative number is negative, $(-3)^3 = -27$.`,
          String.raw`$-27 > -81$, so Quantity B is greater. Trap: reading $-3^4$ as $(-3)^4 = 81$ gives (A).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$x^3 < x$`,
        quantityA: String.raw`$x$`,
        quantityB: String.raw`$x^2$`,
        answer: "D",
        explanation: [
          String.raw`First find where $x^3 < x$ holds, region by region: for $x > 1$, $x^3 > x$; for $0 < x < 1$, $x^3 < x$; for $-1 < x < 0$, $x^3 > x$ ($x^3$ is closer to 0); for $x < -1$, $x^3 < x$. At $x = -1$, $0$, $1$ the two are equal. So $x < -1$ or $0 < x < 1$.`,
          String.raw`If $x = \frac{1}{2}$: $x = 0.5 > x^2 = 0.25$, so A is greater.`,
          String.raw`If $x = -2$: $x = -2 < x^2 = 4$, so B is greater.`,
          String.raw`The comparison depends on $x$: answer (D). Trap: dividing $x^3 < x$ by $x$ to get $x^2 < 1$ is invalid, because $x$ may be negative (which reverses the inequality).`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$x \ne 0$ and $\sqrt{x^2} = -x$`,
        quantityA: String.raw`$x^3$`,
        quantityB: String.raw`$x^2$`,
        answer: "B",
        explanation: [
          String.raw`$\sqrt{x^2} = |x|$, and $|x| = -x$ exactly when $x \le 0$. With $x \ne 0$, the condition says $x < 0$.`,
          String.raw`For negative $x$, $x^3$ is negative (odd power) and $x^2$ is positive (even power).`,
          String.raw`So Quantity B is greater, whatever the size of $x$. Trap: assuming $\sqrt{x^2} = x$ makes the condition read $x = -x$, which seems to force $x = 0$ and looks contradictory.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Which of the following integers is closest to $\sqrt{50} + \sqrt{18}$ ?`,
        choices: [String.raw`$8$`, String.raw`$9$`, String.raw`$10$`, String.raw`$11$`, String.raw`$12$`],
        answer: 3,
        explanation: [
          String.raw`Simplify: $\sqrt{50} = 5\sqrt{2}$ and $\sqrt{18} = 3\sqrt{2}$, so the sum is $8\sqrt{2}$.`,
          String.raw`$8\sqrt{2} \approx 8(1.414) \approx 11.31$, closest to 11. (Or: $8\sqrt{2} = \sqrt{128}$, and $121 < 128 < 144$ with 128 much closer to 121.)`,
          String.raw`Trap: $\sqrt{50 + 18} = \sqrt{68} \approx 8.2$ adds under the radical and gives 8.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`What is the value of $\dfrac{2^{-2} + 2^{-3}}{2^{-4}}$ ?`,
        choices: [String.raw`$\frac{1}{2}$`, String.raw`$2$`, String.raw`$4$`, String.raw`$6$`, String.raw`$8$`],
        answer: 3,
        explanation: [
          String.raw`Rewrite each negative power as a reciprocal: $2^{-2} = \frac{1}{4}$, $2^{-3} = \frac{1}{8}$, $2^{-4} = \frac{1}{16}$.`,
          String.raw`Numerator: $\frac{1}{4} + \frac{1}{8} = \frac{3}{8}$. Dividing by $\frac{1}{16}$ multiplies by 16: $\frac{3}{8} \cdot 16 = 6$.`,
          String.raw`Trap: treating the sum $2^{-2} + 2^{-3}$ as the product $2^{-5}$ gives $\frac{2^{-5}}{2^{-4}} = \frac{1}{2}$. Exponents add when powers are multiplied, never when they are added.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        diagram: {
          key: "1-3-exponents-and-roots/number-line",
          props: {
            min: -1.5,
            max: 1.5,
            ticks: [
              { value: -1, label: "−1" },
              { value: 0, label: "0" },
              { value: 1, label: "1" },
            ],
            points: [{ value: -0.7, label: "x" }],
          },
        },
        stem: String.raw`On the number line above, which of the following is greatest?`,
        choices: [String.raw`$-x$`, String.raw`$x^2$`, String.raw`$x^3$`, String.raw`$-x^3$`, String.raw`$\frac{1}{x^2}$`],
        answer: 4,
        explanation: [
          String.raw`The figure shows $-1 < x < 0$, so $|x|$ is between 0 and 1.`,
          String.raw`$x^3$ is negative, so it is out. Each of $-x = |x|$, $x^2 = |x|^2$ and $-x^3 = |x|^3$ is between 0 and 1.`,
          String.raw`$\frac{1}{x^2}$ is the reciprocal of a number between 0 and 1, so it is greater than 1, and it is the greatest.`,
          String.raw`Check with $x = -0.7$: $-x = 0.7$, $x^2 = 0.49$, $x^3 = -0.343$, $-x^3 = 0.343$, $\frac{1}{x^2} \approx 2.04$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following expressions are **not** defined in the real number system? Indicate all such expressions.`,
        choices: [
          String.raw`$\sqrt{(-4)^2}$`,
          String.raw`$\sqrt[3]{-27}$`,
          String.raw`$\sqrt[4]{-16}$`,
          String.raw`$0^0$`,
          String.raw`$(-1)^{-3}$`,
          String.raw`$0^{-2}$`,
        ],
        answer: [2, 3, 5],
        explanation: [
          String.raw`$\sqrt{(-4)^2} = \sqrt{16} = 4$: defined. The number under the radical is positive.`,
          String.raw`$\sqrt[3]{-27} = -3$: defined. Odd order roots exist for every number.`,
          String.raw`$\sqrt[4]{-16}$: not defined. Even order roots of negative numbers do not exist in the real numbers.`,
          String.raw`$0^0$: not defined (MR p. 12).`,
          String.raw`$(-1)^{-3} = \frac{1}{(-1)^3} = -1$: defined. A negative base is fine as long as it is not 0.`,
          String.raw`$0^{-2}$ would be $\frac{1}{0^2} = \frac{1}{0}$: not defined. Negative exponents are defined only for nonzero bases.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`If $0 < x < 1$, which of the following must be greater than $x$? Indicate all such expressions.`,
        choices: [
          String.raw`$x^3$`,
          String.raw`$\sqrt{x}$`,
          String.raw`$\sqrt[3]{x}$`,
          String.raw`$\frac{1}{x^2}$`,
          String.raw`$2x$`,
          String.raw`$\frac{x}{2}$`,
        ],
        answer: [1, 2, 3, 4],
        explanation: [
          String.raw`$x^3 = x \cdot x^2$ with $0 < x^2 < 1$, so $x^3 < x$: no.`,
          String.raw`$\sqrt{x}$ is between 0 and 1, and its square is $x$. Squaring a number between 0 and 1 makes it smaller, so $x < \sqrt{x}$: yes.`,
          String.raw`$\sqrt[3]{x}$ is between 0 and 1, and its cube is $x$. Cubing a number between 0 and 1 makes it smaller, so $x < \sqrt[3]{x}$: yes.`,
          String.raw`$x^2 < 1$, so $\frac{1}{x^2} > 1 > x$: yes.`,
          String.raw`$2x = x + x > x$ because $x > 0$: yes. $\frac{x}{2} < x$: no.`,
          String.raw`Check with $x = 0.3$: $x^3 = 0.027$, $\sqrt{x} \approx 0.548$, $\sqrt[3]{x} \approx 0.669$, $\frac{1}{x^2} \approx 11.1$, $2x = 0.6$, $\frac{x}{2} = 0.15$.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`What is the value of $\left(\sqrt{12} + \sqrt{3}\right)^2$ ?`,
        answer: { kind: "decimal", value: "27" },
        explanation: [
          String.raw`$\sqrt{12} = 2\sqrt{3}$, so the sum is $2\sqrt{3} + \sqrt{3} = 3\sqrt{3}$.`,
          String.raw`$\left(3\sqrt{3}\right)^2 = 9 \cdot 3 = 27$.`,
          String.raw`Trap: squaring term by term gives $12 + 3 = 15$, which drops the middle term $2\sqrt{12}\sqrt{3} = 2\sqrt{36} = 12$. Indeed $15 + 12 = 27$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`How many integers $n$ satisfy $-\sqrt{30} < n < \sqrt{70}$ ?`,
        answer: { kind: "decimal", value: "14" },
        suffix: "integers",
        explanation: [
          String.raw`Locate each root between perfect squares. $25 < 30 < 36$, so $5 < \sqrt{30} < 6$ and $-6 < -\sqrt{30} < -5$.`,
          String.raw`$64 < 70 < 81$, so $8 < \sqrt{70} < 9$.`,
          String.raw`The integers strictly between are $-5, -4, \ldots, 8$. That is $8 - (-5) + 1 = 14$ integers.`,
          String.raw`Traps: stopping at $-\sqrt{30} \approx -5.5$ and starting the count at $-6$ (it is outside), or forgetting to count 0.`,
        ],
      },
    ],
  },
};

export default section;
