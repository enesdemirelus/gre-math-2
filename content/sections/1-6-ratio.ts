import type { Section } from "../types";

const section: Section = {
  id: "1-6-ratio",
  number: "1.6",
  title: "Ratio",
  part: "arithmetic",
  mrPages: "20–21",
  summary: String.raw`Ratios of two or more quantities, reducing them, proportions and cross multiplication, and the "parts" method that solves most GRE ratio word problems: one unknown multiplier, a total, and a check that the counts come out whole.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "What a ratio says" },
    {
      kind: "p",
      text: String.raw`The [[ratio|ratio]] of one quantity to another expresses their _relative_ sizes. For positive quantities $s$ and $t$, the ratio of $s$ to $t$ is the fraction $\frac{s}{t}$, also written "$s$ to $t$" or $s : t$. The first quantity named is the numerator and the second is the denominator (MR p. 20). If a shelf holds 4 novels and 9 textbooks, the ratio of novels to textbooks is $\frac{4}{9}$, or 4 to 9, or $4 : 9$, and the ratio of textbooks to novels is $9 : 4$.`,
    },
    {
      kind: "p",
      text: String.raw`Like fractions, ratios can be reduced to [[lowest-terms|lowest terms]]: 18 novels to 24 textbooks is the same ratio as 3 to 4, since $\frac{18}{24} = \frac{3}{4}$ (MR p. 20). That is exactly why a ratio alone never tells you the actual numbers: 3 to 4 could be 3 and 4, or 18 and 24, or 300 and 400.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "1-6-ratio/simple-ratio",
        caption: String.raw`A ratio of $2$ to $3$: $s$ is 2 equal parts and $t$ is 3 of the same parts, whatever the size of a part.`,
      },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Order matters",
      text: String.raw`"The ratio of $s$ to $t$" is $\frac{s}{t}$, never $\frac{t}{s}$. Wrong-order answers are always among the choices. Before you write a fraction, say the sentence to yourself and put the first-named quantity on top.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Three or more quantities" },
    {
      kind: "p",
      text: String.raw`With three or more positive quantities $r$, $s$ and $t$, the relative sizes are written "$r$ to $s$ to $t$" (MR p. 20). Many books also write $r : s : t$, which this page uses for brevity; the Math Review does not. Such a ratio is reduced by dividing every term by the [[gcd|greatest common divisor]] of _all_ the terms (MR p. 20). For example, 12 to 42 to 30 has greatest common divisor 6 and reduces to 2 to 7 to 5. Notice that 12 to 42 alone would reduce further, to 2 to 7, but you must divide all three terms by the same number.`,
    },
    {
      kind: "diagram",
      diagram: { key: "1-6-ratio/three-term", caption: String.raw`The ratio $r$ to $s$ to $t$ is 2 to 3 to 5: ten equal parts in all.` },
    },
    {
      kind: "p",
      text: String.raw`A three-term ratio packs several two-term ratios into one line. From $2 : 3 : 5$ you can read off $r : s = 2 : 3$, $s : t = 3 : 5$ and $r : t = 2 : 5$. You can also read off fractions of the whole: $r$ is $\frac{2}{10} = \frac{1}{5}$ of the total, because the total is $2 + 3 + 5 = 10$ parts. Prep books call $r : s$ a [[part-to-part|part-to-part ratio]] and $\frac{r}{r + s + t}$ a part-to-whole ratio; the GRE simply asks for "the ratio of ..." or "what fraction of ...", and you must notice which one it means.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The parts method" },
    {
      kind: "p",
      text: String.raw`Most GRE ratio word problems give a ratio plus one actual number, such as a total or a difference, and ask for another number. The fastest method treats each term of the ratio as a number of equal parts. If boys and girls in a class are in the ratio 3 to 4, there is some [[multiplier|multiplier]] $k$ with 3$k$ boys and 4$k$ girls; equivalently, the class is $3 + 4 = 7$ equal parts and each part holds $k$ students.`,
    },
    { kind: "math", tex: String.raw`a : b : c \;\Longrightarrow\; \text{quantities } ak,\; bk,\; ck,\quad \text{total } (a + b + c)k`, key: true },
    {
      kind: "p",
      text: String.raw`If the class has 35 students, then $7k = 35$, so $k = 5$: 15 boys and 20 girls. If instead you are told there are 5 more girls than boys, the difference is $4k - 3k = k = 5$, and the same numbers follow. Whatever the given number is (a total, a difference, one of the parts), translate it into "so many parts" and solve for one part.`,
    },
    {
      kind: "diagram",
      diagram: { key: "1-6-ratio/boys-girls", caption: String.raw`Boys to girls is 3 to 4 and there are 35 students, so each of the 7 parts is 5.` },
    },
    {
      kind: "p",
      text: String.raw`One consequence is used constantly in "which could be the total" questions. If the quantities are counts of objects, they are whole numbers, so (after reducing the ratio to lowest terms) the multiplier $k$ must be a positive integer and the total must be a multiple of the sum of the reduced terms. (This is a standard fact, though not stated in the ETS Math Review.) A class with boys to girls 3 to 4 can have 35 or 42 students but not 40. Try it in the explorer below.`,
    },
    {
      kind: "interactive",
      key: "1-6-ratio/ratio-explorer",
      title: "Ratio parts explorer",
      caption: String.raw`Set the ratio $A : B : C$ (slide $C$ to 0 for a two-term ratio) and a total. The bar shows one part's size, each quantity, the part-to-whole fractions, and whether the counts come out as whole numbers. Try $6 : 10 : 8$: it reduces to $3 : 5 : 4$, so the total only has to be a multiple of 12, not of 24.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Reduce before you test totals",
      text: String.raw`For a ratio given as $6 : 10 : 8$, the possible totals are multiples of $3 + 5 + 4 = 12$, not just multiples of $6 + 10 + 8 = 24$. A total of 36 is possible (9, 15, 12) even though 36 is not a multiple of 24.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Proportions and cross multiplication" },
    {
      kind: "p",
      text: String.raw`A [[proportion|proportion]] is an equation relating two ratios, for example $\frac{10}{25} = \frac{2}{5}$. To solve a ratio problem you can often write a proportion and solve it by [[cross-multiplication|cross multiplication]] (MR pp. 20–21): multiply each numerator by the other side's denominator and set the products equal.`,
    },
    { kind: "math", tex: String.raw`\frac{a}{b} = \frac{c}{d} \;\Longleftrightarrow\; ad = bc \qquad (b \ne 0,\ d \ne 0)`, key: true },
    {
      kind: "p",
      text: String.raw`For example, to find $x$ so that the ratio of $x$ to 63 equals the ratio of 4 to 18, write $\frac{x}{63} = \frac{4}{18}$, cross multiply to get $18x = (4)(63) = 252$, and divide: $x = 14$. Reducing first is often quicker: $\frac{4}{18} = \frac{2}{9}$, and $63 = 9 \cdot 7$, so $x = 2 \cdot 7 = 14$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Set up the proportion consistently",
      text: String.raw`Keep the same quantity in the same place on both sides: $\frac{\text{flour}}{\text{sugar}} = \frac{\text{flour}}{\text{sugar}}$, or $\frac{\text{first recipe}}{\text{second recipe}}$ for both ingredients. Mixing the two layouts is the usual way a correct-looking proportion gives a wrong answer.`,
    },
    {
      kind: "p",
      text: String.raw`Rates are ratios with units, such as miles per hour or dollars per pound. The GRE conventions note that "average" without "arithmetic mean" can refer to such a [[rate|rate]] or ratio, as in "average number of miles per hour" (MC p. 13). Proportions solve rate questions in exactly the same way.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Combining and changing ratios" },
    {
      kind: "p",
      text: String.raw`Two techniques go beyond the Math Review's examples but follow directly from "ratios are fractions." First, **combining** two ratios that share a quantity: if $a : b = 2 : 3$ and $b : c = 4 : 5$, rescale both so the shared term $b$ matches. The least common multiple of 3 and 4 is 12, so $a : b = 8 : 12$ and $b : c = 12 : 15$, giving $a : b : c = 8 : 12 : 15$. Now any pair can be read off, for instance $a : c = 8 : 15$.`,
    },
    { kind: "math", tex: String.raw`a : b = 2 : 3 = 8 : 12, \quad b : c = 4 : 5 = 12 : 15 \;\Longrightarrow\; a : b : c = 8 : 12 : 15` },
    {
      kind: "p",
      text: String.raw`Second, **changing** ratios: when items are added or removed, the multiplier stays the same for the _original_ counts. If men and women in a club are 5 to 3 and the ratio becomes 5 to 4 after 8 women join, write the original counts as $5k$ and $3k$; then $\frac{5k}{3k + 8} = \frac{5}{4}$, so $20k = 15k + 40$ and $k = 8$. The club had 40 men and 24 women.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "A ratio is not an amount",
      text: String.raw`If $x : y = 3 : 5$, then $y - x$ could be 2, 4, 0.2 or anything else of the form $2k$. In quantitative comparison, a ratio with no actual quantity attached usually leaves differences, sums and individual values undetermined: answer (D). Only things that depend on the ratio alone, such as $\frac{x}{y}$ or $\frac{x}{x + y}$, are fixed.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Read the ratio in the order the words give it, reduce it, and write every quantity as a multiple of one unknown $k$. Then turn the one actual number in the question into an equation in $k$. Use a proportion and cross multiplication when the question compares two situations with the same ratio, and line up shared terms with a least common multiple when two ratios overlap.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Writing the ratio upside down. Confusing part-to-part with part-to-whole (boys to girls 3 to 4 means boys are $\frac{3}{7}$ of the class, not $\frac{3}{4}$). Reducing only some terms of a three-term ratio. Adding the same number to both terms of a ratio and expecting the ratio to stay the same (it does not: $\frac{1 + 1}{2 + 1} \ne \frac{1}{2}$). Testing possible totals against the unreduced ratio. And treating a ratio as if it gave actual amounts.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "ratio",
      term: "ratio",
      turkish: "oran",
      definition: String.raw`A way to express the relative sizes of two quantities, often as a fraction with the first quantity as numerator and the second as denominator. For positive $s$ and $t$, the ratio of $s$ to $t$ is $\frac{s}{t}$, also written "$s$ to $t$" or $s : t$. For three or more quantities: "$r$ to $s$ to $t$".`,
      formula: String.raw`\frac{s}{t} \quad s : t`,
      diagram: { key: "1-6-ratio/simple-ratio" },
      source: "MR p. 20",
    },
    {
      id: "lowest-terms",
      term: "lowest terms (of a ratio)",
      turkish: "en sade hâl (sadeleştirilmiş oran)",
      definition: String.raw`A ratio is reduced to lowest terms by dividing every term by the greatest common divisor of all the terms, as with fractions: 10 to 15 is 2 to 3, and 6 to 24 to 18 is 1 to 4 to 3.`,
      source: "MR p. 20",
    },
    {
      id: "gcd",
      term: "greatest common divisor",
      turkish: "en büyük ortak bölen (EBOB)",
      definition: String.raw`The greatest positive integer that is a divisor of each of the given integers. Dividing all the terms of a ratio by it reduces the ratio to lowest terms.`,
      source: "MR pp. 4, 20; MC p. 5",
    },
    {
      id: "part-to-part",
      term: "part-to-part ratio / part-to-whole ratio",
      turkish: "parçanın parçaya oranı / parçanın bütüne oranı",
      definition: String.raw`If a whole is split into quantities in the ratio $a : b$, the ratio of one quantity to another ($a$ to $b$) is a part-to-part ratio, and the ratio of one quantity to the whole ($a$ to $a + b$) is a part-to-whole ratio. Boys to girls 3 to 4 means boys are $\frac{3}{7}$ of the total.`,
      formula: String.raw`a : b \;\Longrightarrow\; \frac{a}{a + b}`,
      diagram: { key: "1-6-ratio/boys-girls" },
      note: "Not named in the ETS Math Review",
    },
    {
      id: "multiplier",
      term: "multiplier (constant of proportionality)",
      turkish: "orantı sabiti",
      definition: String.raw`The common factor $k$ such that quantities in the ratio $a : b : c$ equal $ak$, $bk$ and $ck$. For counts of objects and a ratio in lowest terms, $k$ is a positive integer.`,
      formula: String.raw`ak : bk : ck = a : b : c`,
      note: "Not named in the ETS Math Review",
    },
    {
      id: "proportion",
      term: "proportion",
      turkish: "orantı",
      definition: String.raw`An equation relating two ratios, for example $\frac{10}{25} = \frac{2}{5}$.`,
      formula: String.raw`\frac{a}{b} = \frac{c}{d}`,
      source: "MR p. 20",
    },
    {
      id: "cross-multiplication",
      term: "cross multiplication",
      turkish: "içler dışlar çarpımı",
      definition: String.raw`Solving a proportion $\frac{a}{b} = \frac{c}{d}$ by rewriting it as $ad = bc$. For example, $\frac{x}{56} = \frac{5}{8}$ gives $8x = (5)(56)$, so $x = 35$.`,
      formula: String.raw`\frac{a}{b} = \frac{c}{d} \iff ad = bc`,
      source: "MR pp. 20–21",
    },
    {
      id: "rate",
      term: "rate",
      turkish: "birim oran / oran",
      definition: String.raw`A ratio of two quantities measured in different units, such as miles per hour or dollars per pound. On the GRE, "average" without "arithmetic mean" can refer to a rate.`,
      note: "Not defined in the ETS Math Review's section on ratio",
      source: "MC p. 13",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`A box contains only red, blue and green pens, and the ratio of red to blue to green pens is 4 to 7 to 9. If there are 30 more green pens than red pens in the box, how many pens are in the box?`,
      choices: [String.raw`$96$`, String.raw`$108$`, String.raw`$120$`, String.raw`$132$`, String.raw`$150$`],
      answer: 2,
      explanation: [
        String.raw`Write the counts as $4k$ red, $7k$ blue and $9k$ green.`,
        String.raw`Green minus red is $9k - 4k = 5k = 30$, so $k = 6$.`,
        String.raw`The total is $(4 + 7 + 9)k = 20 \cdot 6 = 120$ (24 red, 42 blue, 54 green).`,
        String.raw`Trap: treating 30 as one part ($k = 30$) gives 600, which is not listed; treating it as the green count gives a non-integer $k$.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`$x$, $y$ and $z$ are positive. The ratio of $x$ to $y$ is 3 to 5, and the ratio of $y$ to $z$ is 4 to 7.`,
      quantityA: String.raw`$\frac{x}{z}$`,
      quantityB: String.raw`$\frac{1}{3}$`,
      answer: "A",
      explanation: [
        String.raw`Combine the ratios through $y$. The least common multiple of 5 and 4 is 20: $x : y = 3 : 5 = 12 : 20$ and $y : z = 4 : 7 = 20 : 35$.`,
        String.raw`So $x : y : z = 12 : 20 : 35$ and $\frac{x}{z} = \frac{12}{35}$. (Equivalently, $\frac{x}{z} = \frac{x}{y}\cdot\frac{y}{z} = \frac{3}{5}\cdot\frac{4}{7} = \frac{12}{35}$.)`,
        String.raw`Compare $\frac{12}{35}$ with $\frac{1}{3}$ by cross multiplying: $12 \cdot 3 = 36 > 35 = 35 \cdot 1$, so $\frac{12}{35} > \frac{1}{3}$.`,
        String.raw`Quantity A is greater. Trap: answering (D) because no actual values are given. The ratio $\frac{x}{z}$ depends only on the two given ratios, so it is fixed.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`The ratio of $x + 3$ to $2x - 1$ is 4 to 5. What is the value of $x$? Give your answer as a fraction.`,
      answer: { kind: "fraction", numerator: 19, denominator: 3 },
      explanation: [
        String.raw`Write the proportion $\frac{x + 3}{2x - 1} = \frac{4}{5}$.`,
        String.raw`Cross multiply: $5(x + 3) = 4(2x - 1)$, so $5x + 15 = 8x - 4$.`,
        String.raw`Then $3x = 19$ and $x = \frac{19}{3}$.`,
        String.raw`Check: $x + 3 = \frac{28}{3}$ and $2x - 1 = \frac{35}{3}$, whose ratio is $\frac{28}{35} = \frac{4}{5}$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`At a museum, the ratio of the number of children to the number of teenagers to the number of adults is 6 to 10 to 8. Which of the following could be the total number of children, teenagers and adults at the museum? Indicate all such numbers.`,
      choices: [String.raw`$30$`, String.raw`$36$`, String.raw`$48$`, String.raw`$54$`, String.raw`$60$`, String.raw`$64$`, String.raw`$72$`],
      answer: [1, 2, 4, 6],
      explanation: [
        String.raw`Reduce first: the greatest common divisor of 6, 10 and 8 is 2, so the ratio is $3 : 5 : 4$.`,
        String.raw`The counts are $3k$, $5k$ and $4k$ for a positive integer $k$ (3, 5 and 4 have no common factor, so whole-number counts force $k$ to be an integer). The total is $12k$: a multiple of 12.`,
        String.raw`Check the choices: 36, 48, 60 and 72 are multiples of 12; 30, 54 and 64 are not.`,
        String.raw`Trap: using the unreduced sum $6 + 10 + 8 = 24$ keeps only 48 and 72. A total of 36 works: 9 children, 15 teenagers, 12 adults.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Reduce the ratio 18 to 45 to 27 to lowest terms.`,
      answer: String.raw`2 to 5 to 3`,
      explanation: String.raw`The greatest common divisor of 18, 45 and 27 is 9.`,
    },
    {
      id: "q2",
      prompt: String.raw`Solve $\frac{x}{42} = \frac{5}{14}$.`,
      answer: String.raw`$x = 15$`,
      explanation: String.raw`$14x = (5)(42) = 210$, so $x = 15$. Or: $42 = 3 \cdot 14$, so $x = 3 \cdot 5$.`,
    },
    {
      id: "q3",
      prompt: String.raw`The ratio of boys to girls in a group of 56 children is 3 to 5. How many boys are there?`,
      answer: String.raw`$21$`,
      explanation: String.raw`8 parts make 56, so one part is 7 and the boys are $3 \cdot 7 = 21$.`,
    },
    {
      id: "q4",
      prompt: String.raw`The ratio of $a$ to $b$ is 2 to 3. What fraction of $a + b$ is $a$?`,
      answer: String.raw`$\frac{2}{5}$`,
      explanation: String.raw`$a = 2k$ and $a + b = 5k$. The part-to-whole fraction is $\frac{2}{5}$, not $\frac{2}{3}$.`,
    },
    {
      id: "q5",
      prompt: String.raw`If $a : b = 3 : 4$ and $b : c = 6 : 5$, what is $a : b : c$ in lowest terms?`,
      answer: String.raw`$9 : 12 : 10$`,
      explanation: String.raw`Match $b$ at 12 (the LCM of 4 and 6): $a : b = 9 : 12$ and $b : c = 12 : 10$.`,
    },
    {
      id: "q6",
      prompt: String.raw`The ratio of $p$ to $q$ is 7 to 2. What is the ratio of $q$ to $p$?`,
      answer: String.raw`2 to 7`,
      explanation: String.raw`Reversing the order of the quantities inverts the fraction: $\frac{q}{p} = \frac{2}{7}$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$x$ and $y$ are positive integers, and the ratio of $x$ to $y$ is 3 to 5.`,
        quantityA: String.raw`$y - x$`,
        quantityB: String.raw`$2$`,
        answer: "D",
        explanation: [
          String.raw`Since 3 and 5 have no common factor, $x = 3k$ and $y = 5k$ for some positive integer $k$, so $y - x = 2k$.`,
          String.raw`If $k = 1$, $y - x = 2$ and the quantities are equal. If $k = 2$ ($x = 6$, $y = 10$), $y - x = 4$ and Quantity A is greater.`,
          String.raw`The answer is (D). A ratio fixes relative sizes, not amounts.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$a$ and $b$ are positive, and the ratio of $a$ to $b$ is 4 to 9.`,
        quantityA: String.raw`The ratio of $a + 2$ to $b + 2$`,
        quantityB: String.raw`$\frac{4}{9}$`,
        answer: "A",
        explanation: [
          String.raw`Write $a = 4k$ and $b = 9k$ with $k > 0$. Quantity A is $\frac{4k + 2}{9k + 2}$.`,
          String.raw`Compare with $\frac{4}{9}$ by cross multiplying (both denominators are positive): $9(4k + 2) = 36k + 18$ and $4(9k + 2) = 36k + 8$.`,
          String.raw`Since $36k + 18 > 36k + 8$, $\frac{4k + 2}{9k + 2} > \frac{4}{9}$ for every positive $k$.`,
          String.raw`Quantity A is greater. Intuition: adding the same positive amount to the numerator and denominator of a fraction less than 1 moves it toward 1. Check with $k = 1$: $\frac{6}{11} \approx 0.545 > 0.444$.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "medium",
        given: String.raw`Jar P contains only red and white beads, in the ratio 3 to 8. Jar Q contains only red and white beads, in the ratio 2 to 5.`,
        quantityA: String.raw`The fraction of the beads in jar P that are red`,
        quantityB: String.raw`The fraction of the beads in jar Q that are red`,
        answer: "B",
        explanation: [
          String.raw`Convert part-to-part ratios to part-to-whole fractions. Jar P: red is 3 of $3 + 8 = 11$ parts, so $\frac{3}{11}$. Jar Q: red is 2 of $2 + 5 = 7$ parts, so $\frac{2}{7}$.`,
          String.raw`Compare $\frac{3}{11}$ and $\frac{2}{7}$ by cross multiplying: $3 \cdot 7 = 21 < 22 = 2 \cdot 11$.`,
          String.raw`So $\frac{3}{11} < \frac{2}{7}$ and Quantity B is greater. The sizes of the jars do not matter, since each fraction depends only on its own ratio.`,
          String.raw`Trap: comparing $\frac{3}{8} = 0.375$ with $\frac{2}{5} = 0.4$ happens to give the same answer here, but it compares the wrong fractions.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A sum of money is divided among Ana, Ben and Cem in the ratio 2 to 3 to 7, respectively. If Cem receives \$300 more than Ana and Ben combined, what is the total sum of money?`,
        choices: [String.raw`$\$1{,}200$`, String.raw`$\$1{,}500$`, String.raw`$\$1{,}800$`, String.raw`$\$2{,}100$`, String.raw`$\$3{,}600$`],
        answer: 2,
        explanation: [
          String.raw`The shares are $2k$, $3k$ and $7k$. Cem's share exceeds Ana's and Ben's combined by $7k - (2k + 3k) = 2k$.`,
          String.raw`So $2k = 300$ and $k = 150$.`,
          String.raw`The total is $12k = 12 \cdot 150 = 1{,}800$ dollars (Ana \$300, Ben \$450, Cem \$1,050).`,
          String.raw`Trap: \$3,600 comes from taking one part to be \$300.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`In a survey group, the ratio of people who own a car to people who do not is 3 to 5. Among the car owners, the ratio of those who also own a bicycle to those who do not is 2 to 7. What fraction of the survey group owns both a car and a bicycle?`,
        choices: [String.raw`$\frac{1}{12}$`, String.raw`$\frac{2}{17}$`, String.raw`$\frac{2}{9}$`, String.raw`$\frac{5}{17}$`, String.raw`$\frac{3}{8}$`],
        answer: 0,
        explanation: [
          String.raw`Turn both part-to-part ratios into part-to-whole fractions. Car owners are $\frac{3}{3 + 5} = \frac{3}{8}$ of the group.`,
          String.raw`Among car owners, bicycle owners are $\frac{2}{2 + 7} = \frac{2}{9}$.`,
          String.raw`So the fraction owning both is $\frac{3}{8}\cdot\frac{2}{9} = \frac{6}{72} = \frac{1}{12}$.`,
          String.raw`Check with 72 people: 27 own a car, and of those 6 also own a bicycle; $\frac{6}{72} = \frac{1}{12}$. Traps: $\frac{2}{9}$ is the fraction of car owners only; $\frac{2}{17}$ and $\frac{5}{17}$ come from adding the ratios' terms together.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`If $a$, $b$ and $c$ are positive, the ratio of $a$ to $b$ is 2 to 3, and the ratio of $b$ to $c$ is 5 to 4, what is the value of $\frac{a + c}{b}$?`,
        choices: [String.raw`$\frac{6}{5}$`, String.raw`$\frac{4}{3}$`, String.raw`$\frac{22}{15}$`, String.raw`$\frac{3}{2}$`, String.raw`$\frac{8}{5}$`],
        answer: 2,
        explanation: [
          String.raw`Match the shared term $b$. The least common multiple of 3 and 5 is 15: $a : b = 10 : 15$ and $b : c = 15 : 12$.`,
          String.raw`So $a : b : c = 10 : 15 : 12$, and $\frac{a + c}{b} = \frac{10 + 12}{15} = \frac{22}{15}$.`,
          String.raw`Trap: using the ratios without rescaling, with $a = 2$, $c = 4$ and $b = 5$, gives $\frac{6}{5}$. The two ratios use different scales for $b$ (3 parts in one, 5 in the other), so they must be matched first.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`$x$ and $y$ are positive integers, and the ratio of $x$ to $y$ is 5 to 2. Which of the following could be the value of $x - y$? Indicate all such values.`,
        choices: [String.raw`$3$`, String.raw`$6$`, String.raw`$10$`, String.raw`$12$`, String.raw`$15$`, String.raw`$20$`, String.raw`$21$`],
        answer: [0, 1, 3, 4, 6],
        explanation: [
          String.raw`$\frac{x}{y} = \frac{5}{2}$ gives $2x = 5y$. Since 5 divides $2x$ and 5 is prime and does not divide 2, 5 divides $x$: $x = 5k$, and then $y = 2k$, for a positive integer $k$.`,
          String.raw`So $x - y = 3k$: any positive multiple of 3.`,
          String.raw`The multiples of 3 among the choices are 3, 6, 12, 15 and 21. (For example, $x - y = 21$ when $x = 35$ and $y = 14$.)`,
          String.raw`Trap: 10 and 20 are multiples of 5 or 2, the terms of the ratio, but the difference is a multiple of $5 - 2 = 3$.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`$a$ and $b$ are positive numbers, and $\frac{a}{b} = \frac{3}{7}$. Which of the following must be equal to $\frac{3}{7}$? Indicate all such expressions.`,
        choices: [
          String.raw`$\frac{a + 3}{b + 7}$`,
          String.raw`$\frac{a + 3}{b + 3}$`,
          String.raw`$\frac{5a}{5b}$`,
          String.raw`$\frac{a^2}{b^2}$`,
          String.raw`$\frac{2a + 3}{2b + 7}$`,
          String.raw`$\frac{a + b}{b - a}$`,
        ],
        answer: [0, 2, 4],
        explanation: [
          String.raw`Write $a = 3k$ and $b = 7k$ with $k > 0$, and simplify each expression.`,
          String.raw`$\frac{3k + 3}{7k + 7} = \frac{3(k + 1)}{7(k + 1)} = \frac{3}{7}$: yes.`,
          String.raw`$\frac{3k + 3}{7k + 3}$: equal to $\frac{3}{7}$ only if $21k + 21 = 21k + 9$, which never happens: no.`,
          String.raw`$\frac{15k}{35k} = \frac{3}{7}$: yes. $\frac{9k^2}{49k^2} = \frac{9}{49}$: no.`,
          String.raw`$\frac{6k + 3}{14k + 7} = \frac{3(2k + 1)}{7(2k + 1)} = \frac{3}{7}$: yes. $\frac{10k}{4k} = \frac{5}{2}$: no.`,
          String.raw`The pattern: adding numbers that are themselves in the ratio $3 : 7$ to the numerator and denominator keeps the ratio; adding equal numbers does not.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`A mixture contains only flour and sugar, in the ratio 7 to 2 by weight. How many grams of sugar must be added to 945 grams of the mixture so that the ratio of flour to sugar by weight becomes 3 to 2?`,
        answer: { kind: "decimal", value: "280" },
        suffix: "grams",
        explanation: [
          String.raw`The mixture has $7 + 2 = 9$ parts, so one part is $945 \div 9 = 105$ grams: $735$ grams of flour and $210$ grams of sugar.`,
          String.raw`Only sugar is added, so the flour stays $735$ grams. For a $3$ to $2$ ratio the sugar must be $735 \cdot \frac{2}{3} = 490$ grams.`,
          String.raw`Sugar to add: $490 - 210 = 280$ grams. Trap: scaling the whole 945 grams to 3:2 (sugar $= 378$) forgets that the flour cannot change.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`A jar contains only red and blue marbles, in the ratio 2 to 5. After 18 red marbles and 6 blue marbles are added, the ratio of red to blue marbles in the jar is 1 to 2. How many marbles were in the jar before any were added?`,
        answer: { kind: "decimal", value: "210" },
        suffix: "marbles",
        explanation: [
          String.raw`Let the original counts be $2k$ red and $5k$ blue. After the additions: $\frac{2k + 18}{5k + 6} = \frac{1}{2}$.`,
          String.raw`Cross multiply: $2(2k + 18) = 5k + 6$, so $4k + 36 = 5k + 6$ and $k = 30$.`,
          String.raw`Originally there were $60$ red and $150$ blue marbles, $210$ in all.`,
          String.raw`Check: after the additions there are 78 red and 156 blue, and $\frac{78}{156} = \frac{1}{2}$. Trap: answering 234, the total after the additions.`,
        ],
      },
    ],
  },
};

export default section;
