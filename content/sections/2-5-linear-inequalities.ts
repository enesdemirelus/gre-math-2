import type { Section } from "../types";

const section: Section = {
  id: "2-5-linear-inequalities",
  number: "2.5",
  title: "Solving Linear Inequalities",
  part: "algebra",
  mrPages: "51–53",
  summary: String.raw`Inequalities are solved like equations, with one extra rule: multiplying or dividing both sides by a negative number reverses the direction of the inequality. The answer is a solution set, usually an interval on the number line, and the GRE loves to ask how many integers it contains.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Inequalities and solution sets" },
    {
      kind: "p",
      text: String.raw`An [[inequality]] is a mathematical statement that uses one of the four inequality signs: $<$ (less than), $>$ (greater than), $\le$ (less than or equal to) and $\ge$ (greater than or equal to). With variables, an inequality looks just like an equation except that the two sides are related by an inequality sign instead of the equality sign. For example, $5x - 2 \ge 13$ is a [[linear-inequality|linear inequality]] in one variable: it states that $5x - 2$ is greater than or equal to 13 (MR p. 51).`,
    },
    {
      kind: "p",
      text: String.raw`To [[solve-inequality|solve an inequality]] means to find the set of _all_ values of the variable that make it true. That set is the [[solution-set|solution set]] of the inequality, and two inequalities with the same solution set are [[equivalent-inequalities|equivalent inequalities]] (MR p. 51). This is the one real difference in mindset from equations: a linear equation usually has one solution, while a linear inequality usually has infinitely many, filling a whole ray or segment of the number line. The solution set of $5x - 2 \ge 13$ is all numbers greater than or equal to 3:`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-5-linear-inequalities/solution-set",
        props: { min: -2, max: 8, intervals: [{ from: 3, to: null }] },
        caption: String.raw`The solution set of $5x - 2 \ge 13$, that is, $x \ge 3$. The solid dot shows that 3 itself is included; a hollow dot would mean it is not. (The dots are a common textbook convention, not ETS notation.)`,
      },
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE phrases it",
      text: String.raw`The GRE rarely says "solve." It asks for "the greatest integer $x$ such that…", "how many integers satisfy…", or "which of the following could be the value of $x$?" Each of these is a question about the solution set, so find the whole set first and then read the answer off it.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The two rules, and the sign flip" },
    {
      kind: "p",
      text: String.raw`The procedure is the same as for a linear equation: isolate the variable on one side by producing simpler equivalent inequalities. Only two rules are needed (MR p. 52).`,
    },
    {
      kind: "list",
      items: [
        String.raw`**Rule 1.** Adding the same constant to both sides, or subtracting it from both sides, **preserves** the [[direction|direction of the inequality]].`,
        String.raw`**Rule 2.** Multiplying or dividing both sides by the same nonzero constant **preserves** the direction if the constant is **positive** and **reverses** it if the constant is **negative**.`,
      ],
    },
    {
      kind: "p",
      text: String.raw`In both cases the new inequality is equivalent to the old one. The reversal in Rule 2 is easy to see on the number line: multiplying by $-1$ reflects every number through 0, so whatever was further right ends up further left. From $2 < 4$ you get $-2 > -4$.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-5-linear-inequalities/flip",
        caption: String.raw`Multiplying by $-1$ reflects the line about 0. Since $2 < 4$, their negatives satisfy $-2 > -4$: the order reverses.`,
      },
    },
    { kind: "math", tex: String.raw`a < b \;\Longrightarrow\; ca < cb \ \text{ if } c > 0, \qquad ca > cb \ \text{ if } c < 0`, key: true },
    {
      kind: "p",
      text: String.raw`Here is a typical solution. Subtract first (Rule 1), then divide by the negative coefficient and reverse the sign (Rule 2):`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{aligned} 7 - 4x &> 19 \\ -4x &> 12 \\ x &< -3 \qquad (\text{divide by } -4,\ \text{reverse}) \end{aligned}`,
    },
    {
      kind: "p",
      text: String.raw`Check with one number from each side of $-3$: $x = -4$ gives $7 + 16 = 23 > 19$ (true), and $x = 0$ gives $7 > 19$ (false). Fractions are cleared exactly as in equations, by multiplying by a positive denominator, which keeps the direction: $\frac{2x - 5}{3} \le -3$ becomes $2x - 5 \le -9$, so $2x \le -4$ and $x \le -2$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Dodge the flip",
      text: String.raw`If you keep forgetting to reverse, collect the variable on the side where its coefficient is positive. For $7 - 4x > 19$, add $4x$ and subtract 19 on both sides: $-12 > 4x$, so $-3 > x$, which is the same statement as $x < -3$. No negative division, no flip to forget.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Only multiply by numbers whose sign you know",
      text: String.raw`Rule 2 is about a _constant_ whose sign you know. Multiplying both sides of $\frac{6}{x} > 2$ by $x$ is not allowed until you know whether $x$ is positive or negative, because the direction depends on it. (Here, for $x > 0$ you get $6 > 2x$, so $0 < x < 3$; for $x < 0$ the left side is negative and the inequality fails.) The same goes for dividing by a variable, and on the GRE an unknown's sign is often exactly what a Quantitative Comparison is testing.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Compound inequalities: between two numbers" },
    {
      kind: "p",
      text: String.raw`Saying that $x$ is [[between]] 2 and 7 means $x > 2$ and $x < 7$, written together as $2 < x < 7$; the set of all such numbers is an [[interval]] (MR p. 17). Such a double statement is often called a [[compound-inequality|compound inequality]]. To solve one, apply the rules to **all three parts** at once:`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{aligned} -5 &< 3x + 4 \le 16 \\ -9 &< 3x \le 12 \\ -3 &< x \le 4 \end{aligned}`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-5-linear-inequalities/solution-set",
        props: { min: -5, max: 6, intervals: [{ from: -3, to: 4, fromOpen: true }] },
        caption: String.raw`The solution set $-3 < x \le 4$: $-3$ is excluded, $4$ is included.`,
      },
    },
    {
      kind: "p",
      text: String.raw`With a negative coefficient both signs reverse, and the result then reads right to left, so rewrite it with the smaller number first. From $1 \le 7 - 2x < 11$, subtract 7 to get $-6 \le -2x < 4$, then divide by $-2$: $3 \ge x > -2$, which is the same as $-2 < x \le 3$. Notice that each endpoint keeps its own sign type: the $\le$ attached to 1 became the $\ge$ attached to 3.`,
    },
    {
      kind: "p",
      text: String.raw`Not every set is a single interval. "$x < -1$ **or** $x > 4$" describes two rays pointing away from each other, and it is a different kind of condition: a number qualifies if it satisfies _either_ part. When a question gives you two separate conditions that must both hold ("$x > -4$ and $x \le 2$"), the solution set is the overlap of the two sets, here $-4 < x \le 2$.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-5-linear-inequalities/solution-set",
        props: { min: -4, max: 7, intervals: [{ from: null, to: -1, toOpen: true }, { from: 4, to: null, fromOpen: true }] },
        caption: String.raw`The set "$x < -1$ or $x > 4$": two rays, neither endpoint included.`,
      },
    },
    {
      kind: "interactive",
      key: "2-5-linear-inequalities/inequality-builder",
      title: "Inequality number-line builder",
      caption: String.raw`Choose the coefficients and signs. The steps update live, the sign reverses whenever you divide by a negative number, and the solution set is drawn to scale. Drag the test point along the line to check any value in the _original_ inequality.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Counting integers in a solution set",
      text: String.raw`"How many integers satisfy $-2 < x \le 3$?" List them: $-1, 0, 1, 2, 3$, so 5. In general the integers from $m$ to $n$ inclusive number $n - m + 1$, so be careful at each end: a strict sign at an integer endpoint drops that integer, and a fractional endpoint like $\frac{16}{3}$ means you stop at 5.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Variables on both sides, and combining inequalities" },
    {
      kind: "p",
      text: String.raw`When the variable appears on both sides, collect it on one side with Rule 1 just as in an equation: $3x - 5 < 7x + 11$ gives $-16 < 4x$, so $-4 < x$, that is, $x > -4$. Moving $3x$ (rather than $7x$) kept the coefficient positive, so there was no flip.`,
    },
    {
      kind: "p",
      text: String.raw`A favourite harder GRE question gives ranges for two variables and asks about a combination. Two facts settle these (standard facts, though not stated in the ETS Math Review). First, inequalities that point the **same way** may be added: if $a < b$ and $c < d$, then $a + c < b + d$. Second, inequalities may **not** be subtracted directly. To handle $x - y$, first turn the range of $y$ into a range of $-y$ (Rule 2 with $-1$, which reverses it), and then add.`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{aligned} 2 < x < 5 \ \text{ and } \ 1 < y < 3 \;&\Longrightarrow\; 3 < x + y < 8 \\ 1 < y < 3 \;\Longrightarrow\; -3 < -y < -1 \;&\Longrightarrow\; -1 < x - y < 4 \end{aligned}`,
    },
    {
      kind: "p",
      text: String.raw`A quick sanity check: the greatest $x - y$ comes from the greatest $x$ and the _least_ $y$ ($5 - 1 = 4$), and the least $x - y$ from the least $x$ and the greatest $y$ ($2 - 3 = -1$). Subtracting the endpoints in the same order ($2 - 1$ and $5 - 3$) is the classic wrong answer.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Solving a linear inequality is solving a linear equation with one extra habit: every time you multiply or divide by a negative number, reverse the sign (all of the signs, in a compound inequality). The answer is a set, so finish by reading off exactly what the question asks, such as an endpoint, the number of integers in the set, or whether a given value belongs to it, paying attention to whether each endpoint is included.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Forgetting to reverse after dividing by a negative coefficient. Reversing only one sign of a compound inequality. Multiplying through by a variable whose sign is unknown. Counting integers carelessly at the ends, especially with strict signs or fractional endpoints. Subtracting ranges endpoint by endpoint. And answering with a single number when the question asked about "all" values, or assuming the greatest value is attained when the sign is strict ($x < 4$ has no greatest value, though the greatest _integer_ is 3).`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "inequality",
      term: "inequality",
      turkish: "eşitsizlik",
      definition: String.raw`A mathematical statement that uses one of the four inequality signs: $<$ (less than), $>$ (greater than), $\le$ (less than or equal to), $\ge$ (greater than or equal to).`,
      source: "MR p. 51",
    },
    {
      id: "linear-inequality",
      term: "linear inequality",
      turkish: "birinci dereceden eşitsizlik / doğrusal eşitsizlik",
      definition: String.raw`An inequality like a linear equation, but with the two sides related by an inequality sign instead of the equality sign; for example, $2x - 3 > 9$ is a linear inequality in one variable.`,
      source: "MR p. 51",
    },
    {
      id: "solve-inequality",
      term: "solve an inequality",
      turkish: "eşitsizliği çözmek",
      definition: String.raw`To find the set of all values of the variable that make the inequality true.`,
      source: "MR p. 51",
    },
    {
      id: "solution-set",
      term: "solution set",
      turkish: "çözüm kümesi",
      definition: String.raw`The set of all values of the variable that make an inequality true. The solution set of $-2x \le 6$ consists of all numbers greater than or equal to $-3$.`,
      diagram: { key: "2-5-linear-inequalities/solution-set", props: { min: -6, max: 3, intervals: [{ from: -3, to: null }] } },
      source: "MR pp. 51–52",
    },
    {
      id: "equivalent-inequalities",
      term: "equivalent inequalities",
      turkish: "denk eşitsizlikler",
      definition: String.raw`Two inequalities that have the same solution set, for example $x + 4 < 6$ and $3x < 6$.`,
      source: "MR p. 51",
    },
    {
      id: "direction",
      term: "direction of an inequality",
      turkish: "eşitsizliğin yönü",
      definition: String.raw`Which way the inequality sign points. Adding or subtracting a constant on both sides preserves it; multiplying or dividing both sides by a positive constant preserves it, and by a negative constant reverses it (for example, $<$ becomes $>$).`,
      source: "MR p. 52",
    },
    {
      id: "between",
      term: "between",
      turkish: "arasında",
      definition: String.raw`A real number $x$ is between 2 and 3 if $x > 2$ and $x < 3$, written $2 < x < 3$. The endpoints are not included unless $\le$ or $\ge$ is used.`,
      source: "MR p. 17",
    },
    {
      id: "interval",
      term: "interval",
      turkish: "aralık",
      definition: String.raw`A set of real numbers such as all numbers between two numbers ($2 < x < 3$, $2 \le x \le 3$, and so on) or all numbers to one side of a number ($x > 4$, $x \le 4$, and so on). The entire number line is also an interval.`,
      diagram: { key: "2-5-linear-inequalities/solution-set", props: { min: -1, max: 6, intervals: [{ from: 2, to: 3, fromOpen: true, toOpen: true }] } },
      source: "MR pp. 17–18",
    },
    {
      id: "compound-inequality",
      term: "compound inequality",
      turkish: "sıralı eşitsizlik / bileşik eşitsizlik",
      definition: String.raw`A pair of inequality conditions written as one statement, such as $-1 \le 2x + 3 < 9$, which means $-1 \le 2x + 3$ and $2x + 3 < 9$.`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 17",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`Which of the following describes all values of $x$ for which $4 - \dfrac{3x}{2} > x - 6$?`,
      choices: [String.raw`$x < -4$`, String.raw`$x > -4$`, String.raw`$x < 4$`, String.raw`$x > 4$`, String.raw`$x < 8$`],
      answer: 2,
      explanation: [
        String.raw`Clear the fraction by multiplying both sides by 2 (positive, so the direction stays): $8 - 3x > 2x - 12$.`,
        String.raw`Add $3x$ and $12$ to both sides: $20 > 5x$.`,
        String.raw`Divide by 5: $4 > x$, that is, $x < 4$.`,
        String.raw`Check: $x = 0$ gives $4 > -6$ (true) and $x = 6$ gives $-5 > 0$ (false). Trap: collecting on the left gives $-5x > -20$, and forgetting to reverse when dividing by $-5$ gives $x > 4$.`,
      ],
    },
    {
      id: "ex2",
      type: "ne",
      difficulty: "hard",
      stem: String.raw`How many integers $n$ satisfy $-11 \le 5 - 3n < 14$?`,
      answer: { kind: "decimal", value: "8" },
      explanation: [
        String.raw`Subtract 5 from all three parts: $-16 \le -3n < 9$.`,
        String.raw`Divide all three parts by $-3$ and reverse both signs: $\frac{16}{3} \ge n > -3$, that is, $-3 < n \le \frac{16}{3}$.`,
        String.raw`$\frac{16}{3} = 5\frac{1}{3}$, so the integers are $-2, -1, 0, 1, 2, 3, 4, 5$: there are 8 of them.`,
        String.raw`Traps: $-3$ is excluded (strict sign), and rounding $\frac{16}{3}$ up to 6 would add an integer that does not work ($5 - 18 = -13 < -11$).`,
      ],
    },
    {
      id: "ex3",
      type: "qc",
      difficulty: "hard",
      given: String.raw`$2 < x < 5$ and $-3 < y < 1$`,
      quantityA: String.raw`$x - y$`,
      quantityB: String.raw`$1$`,
      answer: "A",
      explanation: [
        String.raw`Do not subtract the ranges endpoint by endpoint. First get a range for $-y$: multiplying $-3 < y < 1$ by $-1$ reverses it, giving $-1 < -y < 3$.`,
        String.raw`Add this to $2 < x < 5$ (both point the same way): $1 < x - y < 8$.`,
        String.raw`So $x - y$ is always greater than 1. Quantity A is greater.`,
        String.raw`Sanity check: the least possible value of $x - y$ would need the least $x$ and the greatest $y$, $2 - 1 = 1$, but neither endpoint is attained, so $x - y$ never reaches 1.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`The number $x$ satisfies both $3(x - 2) < 5x + 4$ and $7 - 2x \ge x - 8$. Which of the following could be the value of $x$? Indicate all such values.`,
      choices: [String.raw`$-6$`, String.raw`$-5$`, String.raw`$-4.5$`, String.raw`$0$`, String.raw`$5$`, String.raw`$5.5$`],
      answer: [2, 3, 4],
      explanation: [
        String.raw`First inequality: $3x - 6 < 5x + 4$, so $-10 < 2x$ and $x > -5$.`,
        String.raw`Second inequality: add $2x$ and $8$ to both sides, $15 \ge 3x$, so $x \le 5$.`,
        String.raw`Both must hold: $-5 < x \le 5$. That excludes $-6$, $-5$ (strict sign) and $5.5$, and includes $-4.5$, $0$ and $5$ (included, since the sign is $\le$).`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Solve $9 - 4x \le 1$.`,
      answer: String.raw`$x \ge 2$`,
      explanation: String.raw`$-4x \le -8$; dividing by $-4$ reverses the sign: $x \ge 2$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Solve $\dfrac{x + 7}{-2} > 3$.`,
      answer: String.raw`$x < -13$`,
      explanation: String.raw`Multiply both sides by $-2$ and reverse: $x + 7 < -6$, so $x < -13$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Write "$x$ is between $-1$ and 6" as an inequality.`,
      answer: String.raw`$-1 < x < 6$`,
      explanation: String.raw`"Between" means $x > -1$ and $x < 6$; the endpoints are not included (MR p. 17).`,
    },
    {
      id: "q4",
      prompt: String.raw`Solve $-4 \le 2x + 2 < 10$.`,
      answer: String.raw`$-3 \le x < 4$`,
      explanation: String.raw`Subtract 2 from all three parts, $-6 \le 2x < 8$, then divide by 2.`,
    },
    {
      id: "q5",
      prompt: String.raw`How many integers satisfy $1 < 3 - x \le 6$?`,
      answer: String.raw`$5$`,
      explanation: String.raw`$-2 < -x \le 3$, so $2 > x \ge -3$: the integers $-3, -2, -1, 0, 1$.`,
    },
    {
      id: "q6",
      prompt: String.raw`True or false: if $-x > 4$, then $x > -4$.`,
      answer: String.raw`False`,
      explanation: String.raw`Multiplying by $-1$ reverses the sign: $x < -4$. For instance $x = -5$ satisfies $-x > 4$ but not $x > -4$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$5 - 3x \ge 2x - 15$`,
        quantityA: String.raw`$x$`,
        quantityB: String.raw`$4$`,
        answer: "D",
        explanation: [
          String.raw`Add $3x$ and $15$ to both sides: $20 \ge 5x$, so $x \le 4$.`,
          String.raw`$x$ may equal 4 (the sign is $\ge$), making the quantities equal, or be less than 4, for example $x = 0$, making Quantity B greater.`,
          String.raw`Two different relationships are possible, so the answer is (D). Trap: reading $x \le 4$ as "B is greater" ignores the case $x = 4$.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$-3 \le a \le 2$ and $1 \le b \le 4$`,
        quantityA: String.raw`$2a - b$`,
        quantityB: String.raw`$4$`,
        answer: "B",
        explanation: [
          String.raw`Multiply the first range by 2: $-6 \le 2a \le 4$. Multiply the second by $-1$ and reverse: $-4 \le -b \le -1$.`,
          String.raw`Add: $-10 \le 2a - b \le 3$. The greatest possible value, 3, comes from $a = 2$ and $b = 1$.`,
          String.raw`So $2a - b \le 3 < 4$ always: Quantity B is greater.`,
          String.raw`Trap: subtracting endpoint by endpoint ($-6 - 1$ and $4 - 4$) gives the wrong range $-7$ to $0$. Here it happens to point to the same answer, but on another question it would not; always pair the greatest $2a$ with the least $b$.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$x$ is an integer and $-7 < 1 - 2x \le 5$.`,
        quantityA: String.raw`The number of possible values of $x$`,
        quantityB: String.raw`$6$`,
        answer: "C",
        explanation: [
          String.raw`Subtract 1 from all three parts: $-8 < -2x \le 4$.`,
          String.raw`Divide by $-2$ and reverse both signs: $4 > x \ge -2$, that is, $-2 \le x < 4$.`,
          String.raw`The integers are $-2, -1, 0, 1, 2, 3$: six values. The quantities are equal.`,
          String.raw`Check the ends: $x = -2$ gives $1 - 2x = 5$ (allowed by $\le$), and $x = 4$ gives $-7$ (excluded by $<$).`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Which of the following is the solution set of $\dfrac{x}{3} - \dfrac{x - 4}{2} > 1$?`,
        choices: [String.raw`$x < -18$`, String.raw`$x < -6$`, String.raw`$x < 6$`, String.raw`$x > 6$`, String.raw`$x > 18$`],
        answer: 2,
        explanation: [
          String.raw`Multiply every term by 6 (positive, so the direction is kept): $2x - 3(x - 4) > 6$.`,
          String.raw`Distribute the minus sign to both terms: $2x - 3x + 12 > 6$, so $-x > -6$.`,
          String.raw`Multiply by $-1$ and reverse: $x < 6$.`,
          String.raw`Traps: writing $-3(x - 4)$ as $-3x - 12$ leads to $-x > 18$, so $x < -18$; forgetting to reverse gives $x > 6$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Phone plan P costs \$18 per month plus \$0.05 per minute of calls. Plan Q costs \$30 per month plus \$0.02 per minute. What is the least whole number of minutes of calls in a month for which plan Q costs less than plan P?`,
        choices: [String.raw`$240$`, String.raw`$360$`, String.raw`$400$`, String.raw`$401$`, String.raw`$600$`],
        answer: 3,
        explanation: [
          String.raw`For $m$ minutes, Q costs less when $30 + 0.02m < 18 + 0.05m$.`,
          String.raw`Subtract $18 + 0.02m$ from both sides: $12 < 0.03m$, so $m > 400$.`,
          String.raw`At exactly 400 minutes the plans cost the same (\$38 each), so the least whole number is 401.`,
          String.raw`Trap: solving the equation $30 + 0.02m = 18 + 0.05m$ and answering 400 ignores the strict inequality.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`The solution set of $-1 < \dfrac{5 - 3x}{2} \le 4$ consists of all $x$ such that $p \le x < q$. What is the value of $q - p$?`,
        choices: [String.raw`$2$`, String.raw`$3$`, String.raw`$\frac{10}{3}$`, String.raw`$4$`, String.raw`$\frac{16}{3}$`],
        answer: 2,
        explanation: [
          String.raw`Multiply all three parts by 2: $-2 < 5 - 3x \le 8$.`,
          String.raw`Subtract 5: $-7 < -3x \le 3$.`,
          String.raw`Divide by $-3$ and reverse both signs: $\frac{7}{3} > x \ge -1$, that is, $-1 \le x < \frac{7}{3}$.`,
          String.raw`So $p = -1$ and $q = \frac{7}{3}$, and $q - p = \frac{7}{3} + 1 = \frac{10}{3}$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following inequalities are equivalent to $6 - 2x > 10$? Indicate all such inequalities.`,
        choices: [
          String.raw`$x < -2$`,
          String.raw`$-2x > 4$`,
          String.raw`$x > -2$`,
          String.raw`$2x + 4 < 0$`,
          String.raw`$3 - x > 5$`,
          String.raw`$-x < 2$`,
        ],
        answer: [0, 1, 3, 4],
        explanation: [
          String.raw`Solve the original: $-2x > 4$, so $x < -2$. An equivalent inequality must have exactly this solution set.`,
          String.raw`$x < -2$: yes. $-2x > 4$: yes, it is the intermediate step. $x > -2$: no, that is the unreversed (wrong) result.`,
          String.raw`$2x + 4 < 0$ gives $x < -2$: yes. $3 - x > 5$ is the original divided by 2: yes.`,
          String.raw`$-x < 2$ gives $x > -2$: no.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`If $-3 < x < 2$, which of the following must be true? Indicate all such statements.`,
        choices: [
          String.raw`$x + 3 > 0$`,
          String.raw`$-2x < 6$`,
          String.raw`$1 - x > -1$`,
          String.raw`$2x - 1 < 2$`,
          String.raw`$-6 < 3x + 3 < 9$`,
          String.raw`$4 - x > 3$`,
        ],
        answer: [0, 1, 2, 4],
        explanation: [
          String.raw`Turn each statement into a condition on $x$ and compare with $-3 < x < 2$. A statement must be true exactly when its own solution set contains every number between $-3$ and $2$.`,
          String.raw`$x + 3 > 0$ means $x > -3$: must be true. $-2x < 6$ means $x > -3$ (divide by $-2$, reverse): must be true. $1 - x > -1$ means $-x > -2$, so $x < 2$: must be true.`,
          String.raw`$2x - 1 < 2$ means $x < 1.5$: not necessarily, e.g. $x = 1.8$. $4 - x > 3$ means $x < 1$: not necessarily, e.g. $x = 1.5$.`,
          String.raw`$-6 < 3x + 3 < 9$: from $-3 < x < 2$, multiply by 3 and add 3 to all parts: $-6 < 3x + 3 < 9$. Must be true.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`How many integers $x$ satisfy both $2x - 7 < 5x + 14$ and $3(x + 1) \le 40 - x$?`,
        answer: { kind: "decimal", value: "16" },
        explanation: [
          String.raw`First: subtract $2x$ and $14$ from both sides, $-21 < 3x$, so $x > -7$.`,
          String.raw`Second: $3x + 3 \le 40 - x$, so $4x \le 37$ and $x \le 9.25$.`,
          String.raw`Both: $-7 < x \le 9.25$. The integers are $-6, -5, \dots, 9$, and there are $9 - (-6) + 1 = 16$ of them.`,
          String.raw`Traps: including $-7$ (the sign is strict) gives 17, and counting $9 - (-6) = 15$ forgets the $+1$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`What is the greatest integer $x$ for which $13 - 4x > -9$?`,
        answer: { kind: "decimal", value: "5" },
        explanation: [
          String.raw`Subtract 13: $-4x > -22$. Divide by $-4$ and reverse: $x < 5.5$.`,
          String.raw`The greatest integer less than 5.5 is 5. Check: $13 - 20 = -7 > -9$, while $x = 6$ gives $-11$, which is not greater than $-9$.`,
        ],
      },
    ],
  },
};

export default section;
