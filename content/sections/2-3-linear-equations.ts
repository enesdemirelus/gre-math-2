import type { Section } from "../types";

const section: Section = {
  id: "2-3-linear-equations",
  number: "2.3",
  title: "Solving Linear Equations",
  part: "algebra",
  mrPages: "43–48",
  summary: String.raw`Equivalent equations and the three rules that produce them, linear equations that have one solution, no solution or are identities, and systems of two equations solved by substitution or elimination. Plus the GRE habit that saves the most time: combining whole equations to get $x + y$ (or whatever is asked) without finding $x$ and $y$.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Equations, solutions and equivalent equations" },
    {
      kind: "p",
      text: String.raw`An [[equation]] is a statement that two mathematical expressions are equal. When it contains variables, the values that make it true are its [[solution|solutions]], and to [[solve|solve the equation]] means to find those values, the values that _satisfy_ the equation. Two equations with exactly the same solutions are [[equivalent-equations|equivalent equations]]: $x + 3 = 5$ and $4x + 12 = 20$ are equivalent, since both are true for $x = 2$ and false for every other $x$ (MR p. 43).`,
    },
    {
      kind: "p",
      text: String.raw`Solving is nothing more than replacing an equation by simpler and simpler equivalent ones until the last one makes the solution obvious, like $x = 2$. Three moves are guaranteed to keep the equation equivalent (MR p. 44):`,
    },
    {
      kind: "list",
      items: [
        String.raw`**Rule 1.** Add the same constant to both sides, or subtract it from both sides.`,
        String.raw`**Rule 2.** Multiply or divide both sides by the same **nonzero** constant.`,
        String.raw`**Rule 3.** Replace an expression by an equivalent expression, for example $3(x - 2)$ by $3x - 6$.`,
      ],
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Why “nonzero” matters",
      text: String.raw`Multiplying both sides by 0 turns _any_ equation into $0 = 0$, which is true for every $x$, so the new equation is no longer equivalent. The same thing happens in disguise when you divide by an expression that might be 0. From $xy = 5x$ you may not conclude $y = 5$: the equation is also true when $x = 0$, whatever $y$ is. Rule 2 only covers a constant you know is nonzero.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Linear equations in one variable" },
    {
      kind: "p",
      text: String.raw`A [[linear-equation|linear equation]] is one in which every term is either a constant or a variable times a coefficient: no variables multiplied together and no powers above 1. So $5x - 2 = 3x + 9$ and $2a + b - 7c = 1$ are linear, while $x^2 = 4x$ and $ab = 6$ are not (MR p. 44). In one variable the routine is always the same: remove parentheses (Rule 3), collect the variable terms on one side and the constants on the other (Rule 1), then divide by the coefficient (Rule 2).`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{aligned} 9x - 2(x + 5) &= 3x + 6 \\ 7x - 10 &= 3x + 6 \\ 4x &= 16 \\ x &= 4 \end{aligned}`,
    },
    {
      kind: "p",
      text: String.raw`You can always check a solution by substituting it into the _original_ equation: the left side gives $36 - 18 = 18$ and the right side gives $12 + 6 = 18$, so $x = 4$ is correct (MR p. 45). When fractions appear, clear them first by multiplying both sides by a common denominator (Rule 2 with a positive constant): $\frac{x}{3} + \frac{x}{4} = 7$ becomes $4x + 3x = 84$, so $x = 12$.`,
    },
    {
      kind: "p",
      text: String.raw`Not every linear equation has exactly one solution. If the variable terms cancel, two things can happen. If what is left is false, there is no solution: $4x + 1 = 2(2x + 3)$ becomes $1 = 6$. If what is left is always true, the equation is an [[identity]], true for every value of $x$: $6 - 2x = 2(3 - x)$ becomes $6 = 6$ (MR p. 45; an identity is defined on MR p. 39).`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE uses this",
      text: String.raw`Watch for equations that look ordinary but collapse. A Quantitative Comparison may give "$3(x + 2) = 3x + 6$" and compare $x$ with 0: every $x$ works, so the answer is (D). Another may ask for a constant $k$ that makes $5x + k = 5(x - 1)$ an identity ($k = -5$) or makes $kx + 4 = 3x$ have no solution ($k = 3$).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Linear equations in two variables" },
    {
      kind: "p",
      text: String.raw`A [[linear-two-variables|linear equation in two variables]] can be written as $ax + by = c$, where $a$, $b$ and $c$ are real numbers and neither $a$ nor $b$ is 0. A solution is an [[ordered-pair|ordered pair]] $(x, y)$ that makes the equation true. For $2x + 3y = 12$, the pairs $(3, 2)$ and $(-3, 6)$ are solutions; $(2, 3)$ is not, since $4 + 9 = 13$ (MR pp. 45–46). Order matters: the first number is always $x$.`,
    },
    { kind: "math", tex: String.raw`ax + by = c \qquad (a \ne 0,\ b \ne 0)`, key: true },
    {
      kind: "p",
      text: String.raw`Every linear equation in two variables has infinitely many solutions (MR p. 46): choose any $x$, and there is exactly one $y$ that works. In the $xy$-plane those solutions form a straight line (MR p. 64), which is why one equation in two unknowns can never pin down both unknowns.`,
    },
    {
      kind: "diagram",
      diagram: { key: "2-3-linear-equations/line-solutions", caption: String.raw`A few of the infinitely many solutions of $2x + 3y = 12$. Every solution is a point on this line, and every point on the line is a solution.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Systems of equations: substitution and elimination" },
    {
      kind: "p",
      text: String.raw`A set of equations in two or more variables is a [[system|system of equations]], and its equations are called [[simultaneous|simultaneous equations]]. Solving a system in $x$ and $y$ means finding every ordered pair that satisfies _all_ the equations at once; with three variables you look for ordered triples $(x, y, z)$ (MR p. 46). Two methods do all the work.`,
    },
    {
      kind: "p",
      text: String.raw`In the [[substitution]] method, solve one equation for one variable and substitute that expression into the other equation (MR p. 46). It is the natural choice when some variable already has coefficient 1 or $-1$. Take this system:`,
    },
    { kind: "math", tex: String.raw`\begin{aligned} 3x - 2y &= 16 \\ x + 4y &= -4 \end{aligned}` },
    {
      kind: "p",
      text: String.raw`The second equation gives $x = -4 - 4y$. Substituting into the first, $3(-4 - 4y) - 2y = 16$, so $-12 - 14y = 16$ and $y = -2$. Back in $x = -4 - 4y$: $x = 4$. The solution is $(x, y) = (4, -2)$.`,
    },
    {
      kind: "p",
      text: String.raw`In the [[elimination]] method, multiply the equations by constants so that one variable has the same coefficient in both, then add or subtract the equations to make it disappear (MR p. 47). For the same system, multiply the first equation by 2 to get $6x - 4y = 32$. Now the $y$-terms of $6x - 4y = 32$ and $x + 4y = -4$ are $-4y$ and $+4y$, so adding the equations eliminates $y$: $7x = 28$, $x = 4$, and then $y = -2$ from either equation. (Multiplying the second equation by 3 and subtracting would eliminate $x$ instead; either way works.)`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Which method?",
      text: String.raw`Substitution is fine when a variable is already isolated or has coefficient $\pm 1$. Elimination is usually faster on the GRE, because it never creates fractions until the very end, and because it is the method that leads straight to shortcuts like $x + y$ (below). Whatever you use, a 10-second check in _both_ original equations catches sign slips.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "One solution, no solution, or infinitely many" },
    {
      kind: "p",
      text: String.raw`Often a system of two linear equations has a [[unique-solution|unique solution]], but it is also possible that it has no solution or infinitely many (MR p. 46). Elimination shows you which. Try to eliminate $x$ from the system $2x - 3y = 5$ and $6x - 9y = k$: tripling the first equation gives $6x - 9y = 15$, and subtracting the second equation leaves $0 = 15 - k$. Both variables vanished at once.`,
    },
    {
      kind: "list",
      items: [
        String.raw`If $k \ne 15$, you are left with a false statement such as $0 = 3$, so **no** pair satisfies both equations: no solution.`,
        String.raw`If $k = 15$, you are left with $0 = 0$. The second equation is just 3 times the first, so every one of the infinitely many solutions of $2x - 3y = 5$ also solves the second: **infinitely many** solutions.`,
        String.raw`If the variables do not vanish together (one variable is left with a nonzero coefficient), you can solve for it and then for the other: **exactly one** solution.`,
      ],
    },
    {
      kind: "p",
      text: String.raw`The picture makes this obvious. The solution of a system is the point where the two graphs intersect (MR p. 67). Two lines with different slopes cross at exactly one point; two different lines with equal slopes are parallel (MR p. 65) and never meet; and two equations that describe the same line share all their points. (That parallel lines never meet and non-parallel lines meet once is a standard fact, though not stated in the ETS Math Review; the elimination argument above shows the same thing algebraically.)`,
    },
    {
      kind: "diagram",
      diagram: { key: "2-3-linear-equations/system-cases", caption: String.raw`Two linear equations in two variables: the lines cross (one solution), are parallel (no solution), or coincide (infinitely many solutions).` },
    },
    {
      kind: "interactive",
      key: "2-3-linear-equations/system-explorer",
      title: "Two-line system explorer",
      caption: String.raw`Set the slope and $y$-intercept of each line. Watch what elimination leaves behind: an equation for $x$ when the slopes differ, a false statement for parallel lines, and $0 = 0$ for the same line.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE asks it",
      text: String.raw`"For what value of $k$ does the system have no solution?" Make the $x$ and $y$ coefficients proportional (the left sides become multiples of each other) while the constants are _not_ in the same ratio. "Infinitely many solutions?" Make the whole second equation a multiple of the first, constant included. A question that says the system has infinitely many solutions is telling you that one equation is redundant.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "GRE shortcut: solve for what is asked" },
    {
      kind: "p",
      text: String.raw`GRE questions about systems very often ask for an _expression_, such as $x + y$, $x - y$ or $2a + 3b$, rather than for the variables themselves. Before you solve, look at what adding or subtracting the equations as they stand would give. Elimination is just this idea with extra multiplications.`,
    },
    { kind: "math", tex: String.raw`\begin{aligned} 7x + 3y &= 31 \\ 3x + 7y &= 19 \end{aligned} \quad\Longrightarrow\quad \begin{aligned} \text{add: } 10x + 10y &= 50 \;\Rightarrow\; x + y = 5 \\ \text{subtract: } 4x - 4y &= 12 \;\Rightarrow\; x - y = 3 \end{aligned}` },
    {
      kind: "p",
      text: String.raw`Symmetric coefficients like $7, 3$ and $3, 7$ are a signal that adding and subtracting is intended. And once you have $x + y = 5$ and $x - y = 3$, products like $x^2 - y^2 = (x + y)(x - y) = 15$ come for free, with no need to find $x = 4$ and $y = 1$.`,
    },
    {
      kind: "p",
      text: String.raw`The same trick works with more variables, even when the individual values cannot be found. If $x + 2y + 3z = 26$ and $3x + 2y + z = 14$, then adding gives $4x + 4y + 4z = 40$, so $x + y + z = 10$, although $x$, $y$ and $z$ themselves are not determined. Cyclic systems such as $p + q = 9$, $q + r = 13$, $p + r = 12$ yield to the same move: adding all three gives $2(p + q + r) = 34$, so $p + q + r = 17$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Three unknowns is not automatically (D)",
      text: String.raw`Two equations in three unknowns cannot determine every variable, but they may well determine the one combination the question asks about. Before answering "cannot be determined," try adding, subtracting, or multiplying an equation by a constant to produce the target expression.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Every linear equation question is the same chain of equivalent equations. Use the rules to simplify, check your answer in the original equation, and watch for the two degenerate outcomes: an equation that collapses to something false (no solution) or to something always true (an identity, or infinitely many solutions for a system). For a system, decide first what the question actually wants, because $x + y$ or $x - y$ is often one addition away.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Distributing a minus sign over only the first term in parentheses, as in $5 - 2(x - 3) = 5 - 2x - 6$ (it should be $+6$). Dividing by a variable that might be 0. Multiplying only one side, or only some terms, when clearing fractions. Declaring "no solution" when you get $x = 0$, which is a perfectly good solution. Stopping at $y$ when the question asked for $x$, or for $x + y$. And answering (D) on a system with too many unknowns before checking whether the asked-for combination is determined.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "equation",
      term: "equation",
      turkish: "denklem",
      definition: String.raw`A statement of equality between two mathematical expressions.`,
      source: "MR p. 43",
    },
    {
      id: "solution",
      term: "solution (of an equation)",
      turkish: "çözüm / kök",
      definition: String.raw`A value of the variable (or values of the variables) that makes the equation true.`,
      source: "MR p. 43",
    },
    {
      id: "solve",
      term: "solve; satisfy",
      turkish: "(denklemi) çözmek; (denklemi) sağlamak",
      definition: String.raw`To solve an equation means to find the values of the variables that make it true, that is, the values that satisfy the equation.`,
      source: "MR p. 43",
    },
    {
      id: "equivalent-equations",
      term: "equivalent equations",
      turkish: "denk denklemler / eşdeğer denklemler",
      definition: String.raw`Two equations that have the same solutions, for example $x - 4 = 1$ and $3x - 12 = 3$. Adding or subtracting the same constant on both sides, multiplying or dividing both sides by the same nonzero constant, and replacing an expression by an equivalent one all produce equivalent equations.`,
      source: "MR pp. 43–44",
    },
    {
      id: "linear-equation",
      term: "linear equation",
      turkish: "doğrusal denklem / birinci dereceden denklem",
      definition: String.raw`An equation in which each term is either a constant term or a variable multiplied by a coefficient; no variables are multiplied together or raised to a power greater than 1. $4y - 3 = 9y$ is linear; $ab = 7$ and $x^2 + y = 1$ are not.`,
      source: "MR p. 44",
    },
    {
      id: "identity",
      term: "identity",
      turkish: "özdeşlik",
      definition: String.raw`A statement of equality between two algebraic expressions that is true for all possible values of the variables, for example $2x - 8 = -2(4 - x)$. Something that looks like a linear equation can turn out to be an identity.`,
      source: "MR pp. 39, 45",
    },
    {
      id: "linear-two-variables",
      term: "linear equation in two variables",
      turkish: "iki bilinmeyenli birinci dereceden denklem",
      definition: String.raw`An equation that can be written as $ax + by = c$, where $a$, $b$, $c$ are real numbers and neither $a$ nor $b$ is 0. It has infinitely many solutions.`,
      formula: String.raw`ax + by = c`,
      diagram: { key: "2-3-linear-equations/line-solutions" },
      source: "MR pp. 45–46",
    },
    {
      id: "ordered-pair",
      term: "ordered pair",
      turkish: "sıralı ikili",
      definition: String.raw`A pair of numbers $(x, y)$, written in that order. It is a solution of an equation in $x$ and $y$ if the equation is true when the values are substituted.`,
      source: "MR p. 46",
    },
    {
      id: "system",
      term: "system of equations",
      turkish: "denklem sistemi",
      definition: String.raw`A set of equations in two or more variables. Solving a system in $x$ and $y$ means finding all ordered pairs $(x, y)$ that satisfy every equation in the system; in three variables, all ordered triples $(x, y, z)$.`,
      source: "MR p. 46",
    },
    {
      id: "simultaneous",
      term: "simultaneous equations",
      turkish: "denklem sistemini oluşturan denklemler (ortak çözümü aranan denklemler)",
      definition: String.raw`The equations that make up a system of equations.`,
      source: "MR p. 46",
    },
    {
      id: "unique-solution",
      term: "unique solution",
      turkish: "tek çözüm",
      definition: String.raw`Exactly one solution. A system of two linear equations in two variables often has a unique solution (one ordered pair satisfies both equations), but it may instead have no solution or infinitely many solutions.`,
      diagram: { key: "2-3-linear-equations/system-cases" },
      source: "MR p. 46",
    },
    {
      id: "substitution",
      term: "substitution method",
      turkish: "yerine koyma yöntemi",
      definition: String.raw`A method for solving a system: one equation is manipulated to express one variable in terms of the other, and that expression is substituted into the other equation.`,
      source: "MR p. 46",
    },
    {
      id: "elimination",
      term: "elimination method",
      turkish: "yok etme yöntemi",
      definition: String.raw`A method for solving a system: make the coefficients of one variable the same in both equations, then add the equations or subtract one from the other so that this variable is eliminated.`,
      source: "MR p. 47",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`If $3x + 5y = 23$ and $5x + 3y = 17$, what is the value of $x - y$?`,
      choices: [String.raw`$-4$`, String.raw`$-3$`, String.raw`$-1$`, String.raw`$3$`, String.raw`$4$`],
      answer: 1,
      explanation: [
        String.raw`The coefficients are swapped between the equations, so add and subtract them as they stand instead of solving.`,
        String.raw`Subtract the first equation from the second: $(5x - 3x) + (3y - 5y) = 17 - 23$, that is, $2x - 2y = -6$, so $x - y = -3$.`,
        String.raw`(Adding gives $8x + 8y = 40$, so $x + y = 5$; together these give $x = 1$, $y = 4$. Check: $3 + 20 = 23$ and $5 + 12 = 17$.)`,
        String.raw`Trap: subtracting in the other order gives $-2x + 2y = 6$, which is $y - x = 3$, not $x - y = 3$.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`The system of equations $6x - ky = 4$ and $3x + 2y = 5$, where $k$ is a constant, has no solution.`,
      quantityA: String.raw`$k$`,
      quantityB: String.raw`$-4$`,
      answer: "C",
      explanation: [
        String.raw`Eliminate $x$: doubling the second equation gives $6x + 4y = 10$. Subtracting it from the first equation gives $(-k - 4)y = 4 - 10$, that is, $(-k - 4)y = -6$.`,
        String.raw`If $-k - 4 \ne 0$, you can divide and get exactly one value of $y$, and then exactly one $x$: the system would have a unique solution.`,
        String.raw`So "no solution" forces $-k - 4 = 0$, that is, $k = -4$. (Then the equation reads $0 = -6$, false, so there is indeed no solution.)`,
        String.raw`$k = -4$, and the two quantities are equal.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "hard",
      stem: String.raw`If $2a + b = 13$, $2b + c = 21$, and $2c + a = 17$, what is the value of $a + b + c$?`,
      answer: { kind: "decimal", value: "17" },
      explanation: [
        String.raw`Each variable appears once with coefficient 2 and once with coefficient 1, so add all three equations.`,
        String.raw`$(2a + a) + (b + 2b) + (c + 2c) = 13 + 21 + 17$, that is, $3a + 3b + 3c = 51$.`,
        String.raw`Divide by 3: $a + b + c = 17$.`,
        String.raw`(Solving fully gives $a = 3$, $b = 7$, $c = 7$, but the question never needed the individual values.)`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`Which of the following equations have exactly one solution? Indicate all such equations.`,
      choices: [
        String.raw`$3(x + 4) = 3x + 4$`,
        String.raw`$5x - 2(x - 3) = 3(x + 2)$`,
        String.raw`$4x - 7 = 4(7 - x)$`,
        String.raw`$2(x - 5) - x = x - 10$`,
        String.raw`$6 - 2x = 2(3 + x)$`,
      ],
      answer: [2, 4],
      explanation: [
        String.raw`Simplify each one until the variable is isolated or disappears.`,
        String.raw`First: $3x + 12 = 3x + 4$ gives $12 = 4$, false, so there is no solution.`,
        String.raw`Second: $3x + 6 = 3x + 6$ is an identity, true for every $x$: infinitely many solutions.`,
        String.raw`Third: $4x - 7 = 28 - 4x$ gives $8x = 35$, so $x = \frac{35}{8}$: exactly one solution.`,
        String.raw`Fourth: $x - 10 = x - 10$, another identity.`,
        String.raw`Fifth: $6 - 2x = 6 + 2x$ gives $4x = 0$, so $x = 0$: exactly one solution. Trap: $x = 0$ is a solution, not "no solution."`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Solve $7 - 3(x - 2) = 2x + 3$.`,
      answer: String.raw`$x = 2$`,
      explanation: String.raw`$7 - 3x + 6 = 2x + 3$, so $13 - 3x = 2x + 3$, $10 = 5x$, $x = 2$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Is $(3, -1)$ a solution of $4x + 5y = 7$? Is $(-1, 3)$?`,
      answer: String.raw`$(3, -1)$ yes; $(-1, 3)$ no`,
      explanation: String.raw`$4(3) + 5(-1) = 7$, but $4(-1) + 5(3) = 11$. The order in an ordered pair matters.`,
    },
    {
      id: "q3",
      prompt: String.raw`If $2x + y = 11$ and $x + 2y = 13$, what is $x + y$?`,
      answer: String.raw`$8$`,
      explanation: String.raw`Add the equations: $3x + 3y = 24$, so $x + y = 8$.`,
    },
    {
      id: "q4",
      prompt: String.raw`How many solutions does $2(x + 3) - 5 = 2x + 1$ have?`,
      answer: String.raw`Infinitely many`,
      explanation: String.raw`The left side simplifies to $2x + 1$, so the equation is an identity, true for every $x$.`,
    },
    {
      id: "q5",
      prompt: String.raw`For what value of $k$ does the system $4x + 6y = k$, $2x + 3y = 5$ have infinitely many solutions?`,
      answer: String.raw`$k = 10$`,
      explanation: String.raw`The left side of the first equation is twice that of the second, so the first equation must be exactly twice the second: $k = 2 \cdot 5$. Any other $k$ gives no solution.`,
    },
    {
      id: "q6",
      prompt: String.raw`Solve $\frac{x}{2} - \frac{x}{5} = 6$.`,
      answer: String.raw`$x = 20$`,
      explanation: String.raw`Multiply both sides (every term) by 10: $5x - 2x = 60$, so $3x = 60$ and $x = 20$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$5x + 2y = 31$ and $2x + 5y = 18$`,
        quantityA: String.raw`$x - y$`,
        quantityB: String.raw`$4$`,
        answer: "A",
        explanation: [
          String.raw`Subtract the second equation from the first: $3x - 3y = 13$, so $x - y = \frac{13}{3} \approx 4.33$.`,
          String.raw`$\frac{13}{3} > 4$, so Quantity A is greater.`,
          String.raw`(For the record, adding gives $7x + 7y = 49$, so $x + y = 7$, and then $x = \frac{17}{3}$, $y = \frac{4}{3}$. Solving fully works but is slower.)`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$x + 3y + 5z = 22$ and $2x + y = 9$`,
        quantityA: String.raw`$x + y + z$`,
        quantityB: String.raw`$8$`,
        answer: "C",
        explanation: [
          String.raw`Two equations cannot determine three unknowns, which tempts (D). But look for a combination of the equations whose coefficients are all equal.`,
          String.raw`Adding the equations as they stand gives $3x + 4y + 5z = 31$: not equal coefficients. Double the second equation first, $4x + 2y = 18$, and then add: $5x + 5y + 5z = 40$, so $x + y + z = 8$ for every solution of the system.`,
          String.raw`(The individual values really are undetermined: $(x, y, z) = (0, 9, -1)$ and $(1, 7, 0)$ both satisfy both equations. But both give $x + y + z = 8$.)`,
          String.raw`The quantities are equal.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$a$ and $b$ are constants, and the system of equations $ax + 2y = 5$ and $3x + 6y = b$ has no solution.`,
        quantityA: String.raw`$a$`,
        quantityB: String.raw`$b$`,
        answer: "D",
        explanation: [
          String.raw`Eliminate $y$: triple the first equation to get $3ax + 6y = 15$, then subtract the second: $(3a - 3)x = 15 - b$.`,
          String.raw`If $3a - 3 \ne 0$, this gives exactly one $x$ and then one $y$, a unique solution. So "no solution" requires $3a - 3 = 0$, that is, $a = 1$.`,
          String.raw`With $a = 1$ the equation reads $0 = 15 - b$. That is false (no solution) exactly when $b \ne 15$; if $b = 15$ there would be infinitely many solutions.`,
          String.raw`So $a = 1$, and $b$ can be any number except 15: $b = 0$ makes Quantity A greater, $b = 20$ makes Quantity B greater. The answer is (D).`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`If $\dfrac{2x - 1}{3} - \dfrac{x + 2}{4} = 1$, what is the value of $x$?`,
        choices: [String.raw`$2$`, String.raw`$2.2$`, String.raw`$3.6$`, String.raw`$4.4$`, String.raw`$5.2$`],
        answer: 3,
        explanation: [
          String.raw`Multiply both sides by 12, every term: $4(2x - 1) - 3(x + 2) = 12$.`,
          String.raw`Distribute carefully, including the minus sign: $8x - 4 - 3x - 6 = 12$, so $5x - 10 = 12$ and $5x = 22$.`,
          String.raw`$x = \frac{22}{5} = 4.4$.`,
          String.raw`Traps: writing $-3(x + 2)$ as $-3x + 6$ gives $x = 2$; forgetting to multiply the right side by 12 gives $5x = 11$, $x = 2.2$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`If $7a - 4b = 10$ and $4a - 7b = 1$, what is the value of $a^2 - b^2$?`,
        choices: [String.raw`$1$`, String.raw`$3$`, String.raw`$5$`, String.raw`$9$`, String.raw`$11$`],
        answer: 1,
        explanation: [
          String.raw`$a^2 - b^2 = (a + b)(a - b)$, so look for $a + b$ and $a - b$.`,
          String.raw`Add the equations: $11a - 11b = 11$, so $a - b = 1$.`,
          String.raw`Subtract the second from the first: $3a + 3b = 9$, so $a + b = 3$.`,
          String.raw`$a^2 - b^2 = 3 \cdot 1 = 3$. (Indeed $a = 2$, $b = 1$: $14 - 4 = 10$ and $8 - 7 = 1$.)`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`For which value of the constant $k$ does the system of equations $x + ky = 4$ and $kx + 9y = 12$ have no solution?`,
        choices: [String.raw`$-9$`, String.raw`$-3$`, String.raw`$0$`, String.raw`$3$`, String.raw`$9$`],
        answer: 1,
        explanation: [
          String.raw`Eliminate $x$: multiply the first equation by $k$ to get $kx + k^2 y = 4k$, and subtract the second: $(k^2 - 9)y = 4k - 12$.`,
          String.raw`If $k^2 - 9 \ne 0$, there is exactly one $y$ (and then one $x$), so the system has a unique solution. No solution requires $k^2 = 9$, so $k = 3$ or $k = -3$.`,
          String.raw`$k = 3$: the equation becomes $0 = 0$. Indeed $3x + 9y = 12$ is just 3 times $x + 3y = 4$, so there are infinitely many solutions, not none.`,
          String.raw`$k = -3$: the equation becomes $0 = -24$, which is false, so there is no solution. The answer is $-3$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "easy",
        stem: String.raw`Which of the following ordered pairs $(x, y)$ are solutions of the equation $3x - 4y = 10$? Indicate all such ordered pairs.`,
        choices: [
          String.raw`$(-2, -4)$`,
          String.raw`$(0, 2.5)$`,
          String.raw`$(2, -1)$`,
          String.raw`$\left(\frac{10}{3}, 0\right)$`,
          String.raw`$(4, 1)$`,
          String.raw`$(6, 2)$`,
        ],
        answer: [0, 2, 3, 5],
        explanation: [
          String.raw`Substitute each pair, $x$ first: $3(-2) - 4(-4) = -6 + 16 = 10$ yes.`,
          String.raw`$3(0) - 4(2.5) = -10$, no (the sign is wrong; $(0, -2.5)$ would work).`,
          String.raw`$3(2) - 4(-1) = 10$ yes; $3\left(\frac{10}{3}\right) - 0 = 10$ yes; $12 - 4 = 8$ no; $18 - 8 = 10$ yes.`,
          String.raw`A single linear equation in two variables has infinitely many solutions, so finding four among the choices is no surprise.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`The numbers $x$, $y$, and $z$ satisfy $x + 2y + z = 12$ and $x + y = 5$. Which of the following quantities have values that can be determined from this information? Indicate all such quantities.`,
        choices: [String.raw`$x$`, String.raw`$y + z$`, String.raw`$x - z$`, String.raw`$x + z$`, String.raw`$2x + 3y + z$`],
        answer: [1, 2, 4],
        explanation: [
          String.raw`Combine whole equations. First minus second: $y + z = 7$. Determined.`,
          String.raw`$x - z = (x + y) - (y + z) = 5 - 7 = -2$. Determined.`,
          String.raw`First plus second: $2x + 3y + z = 17$. Determined.`,
          String.raw`$x$ and $x + z$ are not: $(x, y, z) = (5, 0, 7)$ and $(4, 1, 6)$ both satisfy both equations, but give $x = 5$ vs. $4$ and $x + z = 12$ vs. $10$.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`What value of $x$ satisfies the equation $5(x - 3) - 2(3x - 4) = 4 - 3x$?`,
        answer: { kind: "decimal", value: "5.5" },
        explanation: [
          String.raw`Distribute: $5x - 15 - 6x + 8 = 4 - 3x$, so $-x - 7 = 4 - 3x$.`,
          String.raw`Add $3x$ and $7$ to both sides: $2x = 11$, so $x = 5.5$.`,
          String.raw`Check: left side $5(2.5) - 2(12.5) = 12.5 - 25 = -12.5$; right side $4 - 16.5 = -12.5$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`If $\dfrac{x}{2} + \dfrac{y}{3} = 7$ and $\dfrac{x}{3} + \dfrac{y}{2} = 8$, what is the value of $x + y$?`,
        answer: { kind: "decimal", value: "18" },
        explanation: [
          String.raw`Add the equations: $\left(\frac{1}{2} + \frac{1}{3}\right)x + \left(\frac{1}{3} + \frac{1}{2}\right)y = 15$, that is, $\frac{5}{6}(x + y) = 15$.`,
          String.raw`So $x + y = 15 \cdot \frac{6}{5} = 18$.`,
          String.raw`(Subtracting gives $\frac{1}{6}(x - y) = -1$, so $x - y = -6$, and then $x = 6$, $y = 12$. Check: $3 + 4 = 7$ and $2 + 6 = 8$.)`,
        ],
      },
    ],
  },
};

export default section;
