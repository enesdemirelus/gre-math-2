import type { Section } from "../types";

const section: Section = {
  id: "2-4-quadratic-equations",
  number: "2.4",
  title: "Solving Quadratic Equations",
  part: "algebra",
  mrPages: "48–51",
  summary: String.raw`Two ways to solve $ax^2 + bx + c = 0$: the quadratic formula, which always works and tells you how many real solutions to expect, and factoring, which is faster when it works. Plus the traps the GRE builds around them.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "What a quadratic equation is" },
    {
      kind: "p",
      text: String.raw`A [[quadratic-equation|quadratic equation]] in the variable $x$ is an equation that can be written in the form $ax^2 + bx + c = 0$, where $a$, $b$ and $c$ are real numbers and $a \ne 0$ (MR p. 48). The words "can be written" matter: $x(x + 2) = 15$ and $3x^2 = 4x + 4$ are quadratic equations too, and the first step is always to move everything to one side and multiply out until you see the [[standard-form|standard form]].`,
    },
    { kind: "math", key: true, tex: String.raw`ax^2 + bx + c = 0, \qquad a \ne 0` },
    {
      kind: "p",
      text: String.raw`The condition $a \ne 0$ is part of the definition. If $a = 0$ the $x^2$ term disappears and what is left is a linear equation, with its own (different) behavior. A quadratic equation has zero, one or two real [[solution|solutions]] (MR p. 48), and since every number on the GRE is a real number (MC p. 4), "no real solution" simply means "no solution."`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Never divide by the variable",
      text: String.raw`Faced with $x^2 = 6x$, it is tempting to divide both sides by $x$ and answer $x = 6$. That throws away the solution $x = 0$, because dividing by $x$ is allowed only when $x \ne 0$. Instead write $x^2 - 6x = 0$, factor, $x(x - 6) = 0$, and keep both solutions, $0$ and $6$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The quadratic formula" },
    {
      kind: "p",
      text: String.raw`One way to solve any quadratic equation is the [[quadratic-formula|quadratic formula]] (MR p. 48). The [[plus-minus|$\pm$]] sign is shorthand for two solutions, one using the plus sign and one using the minus sign.`,
    },
    { kind: "math", key: true, tex: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}` },
    {
      kind: "p",
      text: String.raw`Take $3x^2 - 4x - 4 = 0$, so $a = 3$, $b = -4$ and $c = -4$. Substitute with the signs and simplify the expression under the square root first:`,
    },
    {
      kind: "math",
      tex: String.raw`x = \frac{-(-4) \pm \sqrt{(-4)^2 - 4(3)(-4)}}{2(3)} = \frac{4 \pm \sqrt{64}}{6} = \frac{4 \pm 8}{6}`,
    },
    {
      kind: "p",
      text: String.raw`So $x = \frac{12}{6} = 2$ or $x = \frac{-4}{6} = -\frac{2}{3}$. The formula does not care whether the answers are nice. For $x^2 - 2x - 4 = 0$ it gives $x = \frac{2 \pm \sqrt{20}}{2} = 1 \pm \sqrt{5}$, two irrational solutions, about $3.24$ and $-1.24$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Sign slips",
      text: String.raw`Most formula errors are sign errors. When $b$ is negative, $-b$ is positive, and $b^2$ is always nonnegative: $(-4)^2 = 16$, not $-16$. When $a$ and $c$ have opposite signs, $-4ac$ is positive and _adds_ to $b^2$. Write the substitution in parentheses, as above, and the signs take care of themselves.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "How many solutions? Look under the square root" },
    {
      kind: "p",
      text: String.raw`Everything about the number of solutions is decided by the expression under the square root sign, $b^2 - 4ac$, which textbooks call the [[discriminant]] (the Math Review just calls it "the expression under the square root sign"). There are three cases, which the Math Review illustrates with one example each (MR pp. 48–50).`,
    },
    {
      kind: "p",
      text: String.raw`If $b^2 - 4ac > 0$, its square root is a positive number, the $+$ and $-$ give different values, and there are **two** real solutions, as in both examples above. If $b^2 - 4ac = 0$, then $\pm\sqrt{0}$ adds and subtracts nothing, and there is exactly **one** solution, $x = -\frac{b}{2a}$. For $x^2 - 10x + 25 = 0$, $b^2 - 4ac = 100 - 100 = 0$ and the only solution is $x = 5$. If $b^2 - 4ac < 0$, the square root is not a real number, so there is **no** real solution: $x^2 + 2x + 6 = 0$ gives $4 - 24 = -20$ under the root.`,
    },
    {
      kind: "math",
      key: true,
      tex: String.raw`b^2 - 4ac \;\begin{cases} > 0 & \text{two real solutions}\\ = 0 & \text{one real solution}\\ < 0 & \text{no real solution} \end{cases}`,
    },
    {
      kind: "p",
      text: String.raw`The picture makes this obvious. The graph of $y = ax^2 + bx + c$ is a [[parabola]], and its [[x-intercept|$x$-intercepts]] are exactly the solutions of $ax^2 + bx + c = 0$ (MR p. 70). Two solutions means the parabola crosses the $x$-axis twice; one means it just touches the axis at its [[vertex]]; none means it stays entirely above (or below) the axis.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-4-quadratic-equations/three-cases",
        caption: String.raw`$y = x^2 - 4x + c$ for $c = 3$, $4$ and $6$. Raising $c$ lifts the parabola: two $x$-intercepts, then one, then none.`,
      },
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Questions that never ask you to solve",
      text: String.raw`"How many real solutions does ... have?" and "for what value of $k$ does ... have exactly one solution?" are answered by $b^2 - 4ac$ alone. For $x^2 + kx + 9 = 0$ to have exactly one solution you need $k^2 - 36 = 0$, so $k = 6$ or $k = -6$. No square roots, no solutions computed.`,
    },
    {
      kind: "interactive",
      key: "2-4-quadratic-equations/quadratic-explorer",
      title: "Quadratic explorer",
      caption: String.raw`Move $a$, $b$ and $c$. The parabola $y = ax^2 + bx + c$, the value of $b^2 - 4ac$, the quadratic formula with your numbers substituted, and the $x$-intercepts all update together. Watch the number of real solutions change exactly when $b^2 - 4ac$ changes sign.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Solving by factoring" },
    {
      kind: "p",
      text: String.raw`Some quadratic equations can be solved more quickly by factoring (MR p. 50). The reason it works is the [[zero-product|zero-product rule]]: when a product is equal to 0, at least one of the factors must be equal to 0. So once the equation reads (something)(something) $= 0$, each factor gives a solution. For example,`,
    },
    {
      kind: "math",
      tex: String.raw`2x^2 + 7x - 15 = 0 \;\Longrightarrow\; (2x - 3)(x + 5) = 0 \;\Longrightarrow\; x = \tfrac{3}{2} \ \text{or}\ x = -5`,
    },
    {
      kind: "p",
      text: String.raw`When $a = 1$, look for two numbers whose product is $c$ and whose sum is $b$: for $x^2 - x - 20 = 0$ they are $-5$ and $4$, so $(x - 5)(x + 4) = 0$ and $x = 5$ or $x = -4$. The identities from Section 2.1 do the rest of the factoring you will meet: $x^2 - 49 = (x + 7)(x - 7)$ gives $\pm 7$, and $x^2 - 10x + 25 = (x - 5)^2$ gives the single solution $5$, the same answer the formula gave above.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Which method?",
      text: String.raw`Try factoring for about ten seconds, especially when $a = 1$ or the numbers are small. If nothing appears, or the answer choices contain square roots, go straight to the formula. And for a question that only asks _how many_ solutions, skip both and compute $b^2 - 4ac$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "The rule works only for zero",
      text: String.raw`$(x - 2)(x + 1) = 4$ does **not** mean $x - 2 = 4$ or $x + 1 = 4$; a product can equal 4 in infinitely many ways. Multiply out and move the 4 across first: $x^2 - x - 6 = 0$, so $(x - 3)(x + 2) = 0$ and $x = 3$ or $x = -2$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Reading the solutions off the factors" },
    {
      kind: "p",
      text: String.raw`Factoring also runs backwards. If the solutions of $x^2 + bx + c = 0$ are $r$ and $s$, then the expression must be $(x - r)(x - s) = x^2 - (r + s)x + rs$. Matching coefficients (as in Section 2.1) gives a fast check: the solutions add up to $-b$ and multiply to $c$. With a leading coefficient $a$, divide first: the sum is $-\frac{b}{a}$ and the product is $\frac{c}{a}$. (This is a standard fact, though not stated in the ETS Math Review; the derivation above uses only multiplication of expressions.)`,
    },
    { kind: "math", key: true, tex: String.raw`r + s = -\frac{b}{a}, \qquad rs = \frac{c}{a}` },
    {
      kind: "p",
      text: String.raw`For $2x^2 - 9x + 4 = 0$, the solutions add to $\frac{9}{2}$ and multiply to $2$ without being found (they are $4$ and $\frac{1}{2}$). Likewise, a question that tells you a parabola $y = x^2 + bx + c$ crosses the $x$-axis at $-3$ and $7$ is telling you that $x^2 + bx + c = (x + 3)(x - 7) = x^2 - 4x - 21$.`,
    },
    {
      kind: "p",
      text: String.raw`The graph adds one more useful fact. A parabola is symmetric about the vertical line through its vertex, its [[line-of-symmetry|line of symmetry]], so the two $x$-intercepts are the same distance from that line (MR p. 71). The line sits exactly halfway between them. For $y = x^2 - 6x + 5 = (x - 1)(x - 5)$ the intercepts are $1$ and $5$, the line of symmetry is $x = 3$, and the vertex is $(3, 3^2 - 6 \cdot 3 + 5) = (3, -4)$.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-4-quadratic-equations/parabola",
        props: { highlight: "all" },
        caption: String.raw`$y = x^2 - 6x + 5$: $x$-intercepts $1$ and $5$, line of symmetry $x = 3$ halfway between them, vertex $(3, -4)$, $y$-intercept $5$.`,
      },
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Halfway is −b/2a",
      text: String.raw`The two solutions from the formula are $-\frac{b}{2a} + \frac{\sqrt{b^2 - 4ac}}{2a}$ and $-\frac{b}{2a} - \frac{\sqrt{b^2 - 4ac}}{2a}$, so their midpoint is always $x = -\frac{b}{2a}$. That is the line of symmetry, even when the solutions are ugly. (The Math Review does not state this formula; it follows directly from the quadratic formula.)`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Quadratics in disguise" },
    {
      kind: "p",
      text: String.raw`Many GRE equations are quadratic only after one step. An equation with $x$ in a denominator, such as $x - \frac{24}{x} = 5$ (with $x \ne 0$), becomes $x^2 - 5x - 24 = 0$ after multiplying by $x$, so $(x - 8)(x + 3) = 0$. Check that neither solution makes the original denominator 0. Word problems about areas do the same thing: a rectangle whose length is 4 more than its width and whose area is 45 gives $w(w + 4) = 45$, that is $w^2 + 4w - 45 = (w + 9)(w - 5) = 0$. A width cannot be negative, so $w = 5$ and the rectangle is $5$ by $9$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "x² = 16 has two solutions",
      text: String.raw`The equation $x^2 = 16$ has two solutions, $4$ and $-4$, but the symbol $\sqrt{16}$ means only the nonnegative root, $4$ (MC p. 6). A Quantitative Comparison that gives only "$x^2 = 16$" and compares $x$ with 0 has answer (D).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Rewrite the equation in the form $ax^2 + bx + c = 0$ before doing anything else. Then decide what the question really wants. For the number of solutions, use $b^2 - 4ac$. For the solutions themselves, factor if it is quick and use the formula otherwise. For their sum or product, read them off the coefficients. Finally, ask whether both solutions are allowed: a length cannot be negative, a denominator cannot be 0, and a condition like "$x > 0$" picks one solution out of two.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Dividing by $x$ and losing the solution $0$. Applying the zero-product rule to a product that equals something other than 0. Sign errors in $-b$ and in $-4ac$. Forgetting that $a \ne 0$ when a question asks for the values of $k$ that make $kx^2 + \dots$ have one solution. And assuming that $x^2 = 16$ forces $x = 4$.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "quadratic-equation",
      term: "quadratic equation",
      turkish: "ikinci dereceden denklem",
      definition: String.raw`An equation in the variable $x$ that can be written in the form $ax^2 + bx + c = 0$, where $a$, $b$ and $c$ are real numbers and $a \ne 0$.`,
      formula: String.raw`ax^2 + bx + c = 0,\ a \ne 0`,
      source: "MR p. 48",
    },
    {
      id: "standard-form",
      term: "standard form (of a quadratic equation)",
      turkish: "genel biçim / standart biçim",
      definition: String.raw`The form $ax^2 + bx + c = 0$, with all terms on one side and 0 on the other. Put an equation in this form before factoring or using the quadratic formula.`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 48",
    },
    {
      id: "solution",
      term: "solution (root)",
      turkish: "çözüm / kök",
      definition: String.raw`A value of the variable that makes the equation true. A quadratic equation has zero, one or two real solutions. The word "root" is common in textbooks; the Math Review says "solution".`,
      source: "MR p. 48",
    },
    {
      id: "quadratic-formula",
      term: "quadratic formula",
      turkish: "ikinci dereceden denklemin kök formülü (çözüm formülü)",
      definition: String.raw`The formula that gives the solutions of $ax^2 + bx + c = 0$.`,
      formula: String.raw`x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}`,
      source: "MR p. 48",
    },
    {
      id: "plus-minus",
      term: "± (plus or minus)",
      turkish: "artı eksi (±)",
      definition: String.raw`Shorthand for two values: one that uses the plus sign and one that uses the minus sign. $\frac{4 \pm 8}{6}$ means $\frac{12}{6}$ and $\frac{-4}{6}$.`,
      source: "MR p. 48",
    },
    {
      id: "discriminant",
      term: "discriminant",
      turkish: "diskriminant (Δ)",
      definition: String.raw`The expression $b^2 - 4ac$ under the square root sign in the quadratic formula. Positive: two real solutions; zero: one solution; negative: no real solution.`,
      formula: String.raw`\Delta = b^2 - 4ac`,
      note: "Not named in the ETS Math Review, which calls it \"the expression under the square root sign\"",
      source: "MR pp. 48–50",
    },
    {
      id: "zero-product",
      term: "zero-product rule",
      turkish: "sıfır çarpım özelliği (çarpım sıfırsa çarpanlardan en az biri sıfırdır)",
      definition: String.raw`When a product is equal to 0, at least one of the factors must be equal to 0. This is why factoring solves an equation of the form (factor)(factor) $= 0$.`,
      note: "The rule is stated in the ETS Math Review, but not by this name",
      source: "MR p. 50",
    },
    {
      id: "parabola",
      term: "parabola",
      turkish: "parabol",
      definition: String.raw`The graph of $y = ax^2 + bx + c$ with $a \ne 0$. It opens upward if $a > 0$ and downward if $a < 0$; its $x$-intercepts are the solutions of $ax^2 + bx + c = 0$.`,
      diagram: { key: "2-4-quadratic-equations/parabola", props: { highlight: "parabola" } },
      source: "MR pp. 70–71",
    },
    {
      id: "x-intercept",
      term: "x-intercept",
      turkish: "x eksenini kestiği nokta",
      definition: String.raw`The $x$-coordinate of a point where a graph meets the $x$-axis (sometimes the point itself). For a parabola $y = ax^2 + bx + c$, the $x$-intercepts are the real solutions of $ax^2 + bx + c = 0$.`,
      diagram: { key: "2-4-quadratic-equations/parabola", props: { highlight: "intercepts" } },
      source: "MR p. 70; MC p. 12",
    },
    {
      id: "vertex",
      term: "vertex (of a parabola)",
      turkish: "tepe noktası",
      definition: String.raw`The lowest point of a parabola that opens upward ($a > 0$), or the highest point of one that opens downward ($a < 0$).`,
      diagram: { key: "2-4-quadratic-equations/parabola", props: { highlight: "vertex" } },
      source: "MR pp. 70–71",
    },
    {
      id: "line-of-symmetry",
      term: "line of symmetry (of a parabola)",
      turkish: "simetri ekseni",
      definition: String.raw`The vertical line through the vertex. The parabola is symmetric about it, so the two $x$-intercepts are equidistant from it.`,
      diagram: { key: "2-4-quadratic-equations/parabola", props: { highlight: "axis" } },
      source: "MR p. 71",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`Which of the following equations have exactly one real solution? Indicate all such equations.`,
      choices: [
        String.raw`$x^2 - 12x + 36 = 0$`,
        String.raw`$x^2 - 36 = 0$`,
        String.raw`$9x^2 + 12x + 4 = 0$`,
        String.raw`$x^2 + 16 = 8x$`,
        String.raw`$2x^2 + 3x + 5 = 0$`,
        String.raw`$5x^2 = 0$`,
      ],
      answer: [0, 2, 3, 5],
      explanation: [
        String.raw`Put each equation in the form $ax^2 + bx + c = 0$ and compute $b^2 - 4ac$; exactly one solution means $b^2 - 4ac = 0$.`,
        String.raw`$x^2 - 12x + 36$: $144 - 144 = 0$. One solution ($x = 6$). Correct.`,
        String.raw`$x^2 - 36$: $0 - 4(1)(-36) = 144 > 0$. Two solutions, $\pm 6$.`,
        String.raw`$9x^2 + 12x + 4$: $144 - 144 = 0$. One solution, $x = -\frac{2}{3}$, since it is $(3x + 2)^2$. Correct.`,
        String.raw`$x^2 + 16 = 8x$ becomes $x^2 - 8x + 16 = 0$: $64 - 64 = 0$. One solution ($x = 4$). Correct.`,
        String.raw`$2x^2 + 3x + 5$: $9 - 40 = -31 < 0$. No real solution.`,
        String.raw`$5x^2 = 0$: $a = 5$, $b = c = 0$, so $b^2 - 4ac = 0$ and the only solution is $x = 0$. Correct; do not overlook it because $b$ and $c$ are missing.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "medium",
      given: String.raw`The equation $x^2 + 10x + k = 0$ has exactly one real solution.`,
      quantityA: String.raw`$k$`,
      quantityB: String.raw`$25$`,
      answer: "C",
      explanation: [
        String.raw`Exactly one real solution means the expression under the square root is 0: $b^2 - 4ac = 10^2 - 4(1)(k) = 0$.`,
        String.raw`So $100 = 4k$ and $k = 25$. The quantities are equal.`,
        String.raw`Check: $x^2 + 10x + 25 = (x + 5)^2$, whose only solution is $-5$.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`What is the positive solution of the equation $x^2 - 4x - 1 = 0$? Give your answer to the nearest hundredth.`,
      answer: { kind: "decimal", value: "4.24" },
      explanation: [
        String.raw`It does not factor over the integers (no two integers multiply to $-1$ and add to $-4$), so use the formula with $a = 1$, $b = -4$, $c = -1$.`,
        String.raw`$x = \frac{4 \pm \sqrt{16 + 4}}{2} = \frac{4 \pm \sqrt{20}}{2} = 2 \pm \sqrt{5}$.`,
        String.raw`$2 - \sqrt{5} \approx -0.24$ is negative, so the positive solution is $2 + \sqrt{5} \approx 2 + 2.236 = 4.236$, which rounds to $4.24$.`,
      ],
    },
    {
      id: "ex4",
      type: "mc1",
      difficulty: "hard",
      stem: String.raw`If $x \ne 0$ and $x - \dfrac{24}{x} = 5$, what is the sum of all possible values of $x$?`,
      choices: [String.raw`$-8$`, String.raw`$-5$`, String.raw`$3$`, String.raw`$5$`, String.raw`$8$`],
      answer: 3,
      explanation: [
        String.raw`Multiply both sides by $x$ (allowed, since $x \ne 0$): $x^2 - 24 = 5x$, so $x^2 - 5x - 24 = 0$.`,
        String.raw`Factor: $(x - 8)(x + 3) = 0$, so $x = 8$ or $x = -3$. Neither is 0, so both are allowed: $8 - 3 = 5$ and $-3 + 8 = 5$.`,
        String.raw`The sum is $8 + (-3) = 5$. Shortcut: the solutions of $x^2 + bx + c = 0$ add to $-b = 5$.`,
        String.raw`Trap: $8$ is only the positive solution, and $-5$ is $b$ itself rather than $-b$.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`For $2x^2 - 3x - 7 = 0$, what is $b^2 - 4ac$, and how many real solutions are there?`,
      answer: String.raw`$65$; two`,
      explanation: String.raw`$(-3)^2 - 4(2)(-7) = 9 + 56 = 65 > 0$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Solve $x^2 = 7x$.`,
      answer: String.raw`$x = 0$ or $x = 7$`,
      explanation: String.raw`$x^2 - 7x = x(x - 7) = 0$. Dividing by $x$ would lose $x = 0$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Solve $(x + 3)(2x - 5) = 0$.`,
      answer: String.raw`$x = -3$ or $x = \frac{5}{2}$`,
      explanation: String.raw`Set each factor equal to 0.`,
    },
    {
      id: "q4",
      prompt: String.raw`How many real solutions does $x^2 + 4x + 7 = 0$ have?`,
      answer: String.raw`None`,
      explanation: String.raw`$16 - 28 = -12 < 0$.`,
    },
    {
      id: "q5",
      prompt: String.raw`Solve $x^2 + x - 20 = 0$ by factoring.`,
      answer: String.raw`$x = -5$ or $x = 4$`,
      explanation: String.raw`$-5$ and $4$ multiply to $-20$ and add to $1$: $(x + 5)(x - 4) = 0$.`,
    },
    {
      id: "q6",
      prompt: String.raw`What are the $x$-intercepts and the line of symmetry of the parabola $y = x^2 - 2x - 8$?`,
      answer: String.raw`$x$-intercepts $-2$ and $4$; line of symmetry $x = 1$`,
      explanation: String.raw`$(x + 2)(x - 4) = 0$; the line of symmetry is halfway between $-2$ and $4$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$x^2 - 3x - 10 = 0$`,
        quantityA: String.raw`$x$`,
        quantityB: String.raw`$0$`,
        answer: "D",
        explanation: [
          String.raw`Factor: $(x - 5)(x + 2) = 0$, so $x = 5$ or $x = -2$.`,
          String.raw`If $x = 5$, Quantity A is greater; if $x = -2$, Quantity B is greater.`,
          String.raw`The relationship cannot be determined. A quadratic with two solutions of opposite signs is a classic (D).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$b > 0$, and the equation $x^2 + bx + 16 = 0$ has two different real solutions.`,
        quantityA: String.raw`$b$`,
        quantityB: String.raw`$8$`,
        answer: "A",
        explanation: [
          String.raw`Two different real solutions means $b^2 - 4ac > 0$: $b^2 - 4(1)(16) > 0$, so $b^2 > 64$.`,
          String.raw`Since $b > 0$, this gives $b > 8$. Quantity A is greater.`,
          String.raw`Trap: $b = 8$ gives $b^2 - 64 = 0$, which is exactly one solution, $x = -4$; it is excluded by "two different".`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$r$ and $s$ are the two solutions of $3x^2 - 11x + 6 = 0$.`,
        quantityA: String.raw`$r + s$`,
        quantityB: String.raw`$rs + 2$`,
        answer: "B",
        explanation: [
          String.raw`Factor: $3x^2 - 11x + 6 = (3x - 2)(x - 3)$, so the solutions are $\frac{2}{3}$ and $3$.`,
          String.raw`Quantity A: $r + s = \frac{2}{3} + 3 = \frac{11}{3} \approx 3.67$. Quantity B: $rs + 2 = 2 + 2 = 4$.`,
          String.raw`Quantity B is greater. Shortcut: $r + s = \frac{11}{3}$ and $rs = \frac{6}{3} = 2$ come straight from the coefficients.`,
          String.raw`Trap: using $r + s = 11$ and $rs = 6$ forgets to divide by $a = 3$.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`What are the solutions of the equation $2x^2 + 5x - 12 = 0$?`,
        choices: [
          String.raw`$-4$ and $-\frac{3}{2}$`,
          String.raw`$-4$ and $\frac{3}{2}$`,
          String.raw`$-3$ and $2$`,
          String.raw`$-\frac{3}{2}$ and $4$`,
          String.raw`$\frac{3}{2}$ and $4$`,
        ],
        answer: 1,
        explanation: [
          String.raw`Factor: $2x^2 + 5x - 12 = (2x - 3)(x + 4)$. Check the middle term: $2x \cdot 4 + (-3)x = 5x$.`,
          String.raw`So $2x - 3 = 0$ or $x + 4 = 0$, giving $x = \frac{3}{2}$ or $x = -4$.`,
          String.raw`By the formula: $b^2 - 4ac = 25 + 96 = 121$, so $x = \frac{-5 \pm 11}{4}$, which is $\frac{3}{2}$ or $-4$.`,
          String.raw`Trap: $-\frac{3}{2}$ and $4$ comes from reading the solutions off the factors with the wrong signs.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, the graph of $y = x^2 + bx + c$ crosses the $x$-axis at $x = -3$ and $x = 7$. What is the value of $b + c$?`,
        choices: [String.raw`$-25$`, String.raw`$-17$`, String.raw`$-4$`, String.raw`$17$`, String.raw`$25$`],
        answer: 0,
        explanation: [
          String.raw`The $x$-intercepts are the solutions of $x^2 + bx + c = 0$, so $x^2 + bx + c = (x + 3)(x - 7)$.`,
          String.raw`Multiply out: $x^2 - 7x + 3x - 21 = x^2 - 4x - 21$. So $b = -4$ and $c = -21$.`,
          String.raw`$b + c = -4 + (-21) = -25$.`,
          String.raw`Trap: $-17$ uses $b = +4$ (the sum of the solutions instead of its negative).`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`What is the product of all the solutions of the equation $(x - 4)(x + 1) = 14$?`,
        choices: [String.raw`$-18$`, String.raw`$-4$`, String.raw`$14$`, String.raw`$18$`, String.raw`$234$`],
        answer: 0,
        explanation: [
          String.raw`The zero-product rule does not apply, because the right side is 14, not 0. Multiply out and move 14 across: $x^2 - 3x - 4 - 14 = 0$, so $x^2 - 3x - 18 = 0$.`,
          String.raw`Factor: $(x - 6)(x + 3) = 0$, so $x = 6$ or $x = -3$. Check: $(6 - 4)(6 + 1) = 2 \cdot 7 = 14$ and $(-3 - 4)(-3 + 1) = (-7)(-2) = 14$. Both work.`,
          String.raw`The product is $6 \cdot (-3) = -18$ (also $\frac{c}{a} = -18$).`,
          String.raw`Traps: setting $x - 4 = 14$ and $x + 1 = 14$ gives $18$ and $13$, whose product is $234$; $-4$ is the product of the solutions of $(x - 4)(x + 1) = 0$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`For which of the following values of $k$ does the equation $kx^2 - 12x + 4 = 0$ have exactly one real solution? Indicate all such values.`,
        choices: [String.raw`$-9$`, String.raw`$0$`, String.raw`$4$`, String.raw`$9$`, String.raw`$36$`],
        answer: [1, 3],
        explanation: [
          String.raw`If $k \ne 0$, the equation is quadratic and has exactly one solution when $b^2 - 4ac = 144 - 16k = 0$, that is, $k = 9$. Check: $9x^2 - 12x + 4 = (3x - 2)^2$, solution $\frac{2}{3}$.`,
          String.raw`If $k = 0$, the equation is not quadratic at all: it is $-12x + 4 = 0$, a linear equation with exactly one solution, $x = \frac{1}{3}$. So $k = 0$ also works.`,
          String.raw`For $k = -9$ and $k = 4$, $144 - 16k$ is $288$ and $80$, both positive: two solutions. For $k = 36$, it is $-432$: no real solution.`,
          String.raw`Trap: forgetting the case $k = 0$, where the formula (which needs $a \ne 0$) does not apply.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following equations have two different real solutions? Indicate all such equations.`,
        choices: [
          String.raw`$x^2 + 5 = 4x$`,
          String.raw`$2x^2 = 3x$`,
          String.raw`$x^2 - 8x + 16 = 0$`,
          String.raw`$3x^2 + x - 1 = 0$`,
          String.raw`$x^2 + 6x + 10 = 0$`,
          String.raw`$-x^2 + 2x + 4 = 0$`,
        ],
        answer: [1, 3, 5],
        explanation: [
          String.raw`Rewrite each as $ax^2 + bx + c = 0$ and check whether $b^2 - 4ac > 0$.`,
          String.raw`$x^2 - 4x + 5 = 0$: $16 - 20 = -4$. No real solution.`,
          String.raw`$2x^2 - 3x = 0$: $9 - 0 = 9 > 0$. Two solutions, $0$ and $\frac{3}{2}$. Correct.`,
          String.raw`$x^2 - 8x + 16 = 0$: $64 - 64 = 0$. One solution.`,
          String.raw`$3x^2 + x - 1 = 0$: $1 + 12 = 13 > 0$. Correct.`,
          String.raw`$x^2 + 6x + 10 = 0$: $36 - 40 = -4$. No real solution.`,
          String.raw`$-x^2 + 2x + 4 = 0$: $4 - 4(-1)(4) = 4 + 16 = 20 > 0$. Correct. When $a$ and $c$ have opposite signs, $-4ac > 0$ and there are always two solutions.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`What is the greater of the two solutions of $4x^2 - 4x - 15 = 0$?`,
        answer: { kind: "fraction", numerator: 5, denominator: 2 },
        explanation: [
          String.raw`Factor: $4x^2 - 4x - 15 = (2x - 5)(2x + 3)$. Check: $2x \cdot 3 - 5 \cdot 2x = -4x$.`,
          String.raw`The solutions are $\frac{5}{2}$ and $-\frac{3}{2}$; the greater is $\frac{5}{2}$.`,
          String.raw`By the formula: $b^2 - 4ac = 16 + 240 = 256$, so $x = \frac{4 \pm 16}{8}$, which is $\frac{20}{8} = \frac{5}{2}$ or $-\frac{12}{8} = -\frac{3}{2}$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`In the $xy$-plane, the graph of $y = 2x^2 - 8x + c$ crosses the $x$-axis at two points that are 6 units apart. What is the value of $c$?`,
        answer: { kind: "decimal", value: "-10" },
        explanation: [
          String.raw`The $x$-intercepts are symmetric about the line of symmetry, which is halfway between them at $x = -\frac{b}{2a} = \frac{8}{4} = 2$.`,
          String.raw`Being 6 units apart, the intercepts are 3 units on either side of 2: $x = -1$ and $x = 5$.`,
          String.raw`So $2x^2 - 8x + c = 2(x + 1)(x - 5) = 2(x^2 - 4x - 5) = 2x^2 - 8x - 10$, and $c = -10$.`,
          String.raw`Without the symmetry: the solutions are $\frac{8 \pm \sqrt{64 - 8c}}{4}$, which differ by $\frac{\sqrt{64 - 8c}}{2}$. Setting this equal to 6 gives $64 - 8c = 144$, so $c = -10$.`,
        ],
      },
    ],
  },
};

export default section;
