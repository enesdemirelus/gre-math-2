import type { Section } from "../types";

const section: Section = {
  id: "1-2-fractions",
  number: "1.2",
  title: "Fractions",
  part: "arithmetic",
  mrPages: "7–11",
  summary: String.raw`Equivalent fractions, the four operations, mixed numbers and fractional expressions, plus the skills the GRE actually tests with them: comparing and ordering fractions fast, and turning "a fraction of the remainder" into a single product.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "What the GRE means by a fraction" },
    {
      kind: "p",
      text: String.raw`A [[fraction]] is a number of the form $\frac{c}{d}$ where $c$ and $d$ are integers and $d \ne 0$. The top integer $c$ is the [[numerator]] and the bottom integer $d$ is the [[denominator]] (Turkish _pay_ and _payda_). So $\frac{-9}{4}$ is a fraction with numerator $-9$ and denominator 4. Fractions are also called [[rational-number|rational numbers]], and every integer is one of them, because $n = \frac{n}{1}$ (MR p. 7).`,
    },
    {
      kind: "p",
      text: String.raw`The definition insists on _integers_ on top and bottom. A quotient such as $\frac{\pi}{4}$ or $\frac{\sqrt{3}}{2}$, where the numerator or denominator is not an integer, is called a [[fractional-expression|fractional expression]]. The good news is that fractional expressions obey exactly the same rules as fractions, so everything below applies to them too (MR p. 10).`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Zero in the denominator",
      text: String.raw`Division by 0 is undefined (MC p. 7), so $d \ne 0$ is built into the definition. When a question contains $\frac{5}{x - 3}$, it is quietly telling you that $x \ne 3$. Keep such excluded values in mind when you test cases in Quantitative Comparison.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Equivalent fractions, reducing, and signs" },
    {
      kind: "p",
      text: String.raw`If you multiply the numerator and the denominator by the same nonzero integer, you get an [[equivalent-fractions|equivalent fraction]]: the same number written differently (MR p. 7). Run the rule backwards and you can [[reduce]] a fraction: if the numerator and denominator have a common factor, factor it out of both and cancel it. For example, $\frac{36}{60} = \frac{(12)(3)}{(12)(5)} = \frac{3}{5}$ (MR p. 8). When the numerator and denominator have no common factor greater than 1, the fraction is in [[lowest-terms|lowest terms]].`,
    },
    { kind: "math", tex: String.raw`\frac{c}{d} = \frac{ck}{dk} \qquad (k \text{ a nonzero integer})`, key: true },
    {
      kind: "diagram",
      diagram: { key: "1-2-fractions/fraction-bars", props: { n: 2, d: 3, multipliers: [1, 2, 4] }, caption: String.raw`$\frac{2}{3} = \frac{4}{6} = \frac{8}{12}$: cutting each piece into 2 or 4 equal parts multiplies the numerator and the denominator by the same number, and the shaded amount does not change.` },
    },
    {
      kind: "p",
      text: String.raw`A negative sign can sit in three places, and all three give the same number (MR p. 8). This is just the rule above with $k = -1$.`,
    },
    { kind: "math", tex: String.raw`\frac{-c}{d} = \frac{c}{-d} = -\frac{c}{d}`, key: true },
    {
      kind: "p",
      text: String.raw`So $\frac{3}{-8} = \frac{-3}{8} = -\frac{3}{8}$, while $\frac{-3}{-8} = \frac{3}{8}$ is positive.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Cancel factors, never terms",
      text: String.raw`You may cancel only a common _factor_ of the whole numerator and the whole denominator. $\frac{3 + 5}{3 + 7} = \frac{8}{10} = \frac{4}{5}$, not $\frac{5}{7}$. In the same way, adding the same number to the numerator and denominator usually changes the fraction: $\frac{2}{5} \ne \frac{2 + 1}{5 + 1}$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Adding and subtracting" },
    {
      kind: "p",
      text: String.raw`With the same denominator, add (or subtract) the numerators and keep the denominator. With different denominators, first rewrite both fractions over a [[common-denominator|common denominator]], which is any common multiple of the two denominators, and then add the numerators (MR pp. 8–9).`,
    },
    { kind: "math", tex: String.raw`\frac{a}{d} + \frac{b}{d} = \frac{a + b}{d}`, key: true },
    {
      kind: "p",
      text: String.raw`The smallest choice, the least common multiple of the denominators (MC p. 5), is called the [[least-common-denominator|least common denominator]] and keeps the numbers small. For $\frac{5}{12} - \frac{7}{18}$, the least common multiple of 12 and 18 is 36, so the difference is $\frac{15}{36} - \frac{14}{36} = \frac{1}{36}$.`,
    },
    {
      kind: "p",
      text: String.raw`The product of the denominators is always a common denominator, which gives a formula that never fails:`,
    },
    { kind: "math", tex: String.raw`\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}` },
    {
      kind: "aside",
      tone: "tip",
      title: "Which common denominator?",
      text: String.raw`Any common denominator gives the right answer; the least one only saves arithmetic. When the denominators share no factor (say 7 and 9), the least common denominator _is_ their product, so use the formula above directly: $\frac{2}{7} + \frac{4}{9} = \frac{18 + 28}{63} = \frac{46}{63}$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Multiplying and dividing" },
    {
      kind: "p",
      text: String.raw`To multiply fractions, multiply the numerators and multiply the denominators. To divide by a fraction, [[reciprocal|invert]] the second fraction (take its reciprocal) and multiply (MR p. 9).`,
    },
    { kind: "math", tex: String.raw`\frac{a}{b}\cdot\frac{c}{d} = \frac{ac}{bd}, \qquad \frac{a}{b} \div \frac{c}{d} = \frac{a}{b}\cdot\frac{d}{c}`, key: true },
    {
      kind: "p",
      text: String.raw`Cancel common factors _before_ you multiply and the numbers stay small: $\left(\frac{14}{15}\right)\left(\frac{25}{28}\right) = \frac{14}{28}\cdot\frac{25}{15} = \frac{1}{2}\cdot\frac{5}{3} = \frac{5}{6}$. A fraction whose numerator and denominator are themselves fractions is just a division written vertically:`,
    },
    { kind: "math", tex: String.raw`\dfrac{\;\frac{3}{4}\;}{\;\frac{9}{8}\;} = \frac{3}{4}\cdot\frac{8}{9} = \frac{24}{36} = \frac{2}{3}` },
    {
      kind: "aside",
      tone: "watch",
      title: "Dividing by a fraction makes things bigger",
      text: String.raw`For a positive number, dividing by a fraction between 0 and 1 gives a _larger_ result, and multiplying by it gives a smaller one: $12 \div \frac{1}{4} = 48$, but $12 \cdot \frac{1}{4} = 3$. "Divide by one half" doubles; "take one half of" halves. Read these phrases slowly.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Mixed numbers" },
    {
      kind: "p",
      text: String.raw`A [[mixed-number|mixed number]] such as $3\frac{2}{5}$ has an integer part and a fraction part between 0 and 1, and it means $3 + \frac{2}{5}$ (MR p. 9). To convert it to a fraction, rewrite the integer part with the same denominator and add: $3\frac{2}{5} = \frac{15}{5} + \frac{2}{5} = \frac{17}{5}$ (MR p. 10). A fraction whose numerator is at least its denominator, like $\frac{17}{5}$, is often called an [[improper-fraction|improper fraction]].`,
    },
    { kind: "math", tex: String.raw`n\tfrac{a}{b} = n + \frac{a}{b} = \frac{nb + a}{b} \qquad (n \ge 0)`, key: true },
    {
      kind: "p",
      text: String.raw`A negative mixed number puts the minus sign in front of the whole thing: $-10\frac{1}{2} = -\left(10 + \frac{1}{2}\right) = -\frac{21}{2}$ (MC p. 6), not $-10 + \frac{1}{2}$. Before you multiply or divide mixed numbers, always convert them to fractions.`,
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`In a mixed number, writing the parts side by side means _addition_: $3\frac{2}{5}$ is $3 + \frac{2}{5}$, not $3 \cdot \frac{2}{5}$. This is the opposite of algebra, where $3x$ means $3 \cdot x$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Comparing and ordering fractions" },
    {
      kind: "p",
      text: String.raw`This is where the GRE spends most of its fraction questions: which is larger, which lies between two others, how to order a list. Every method rests on one picture. Fractions are points on the number line, and "less than" means "to the left of" (MR p. 16).`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "1-2-fractions/number-line",
        props: { min: -2, max: 2, den: 4, points: [{ n: -3, d: 2 }, { n: -2, d: 3 }, { n: 1, d: 4 }, { n: 7, d: 8 }, { n: 4, d: 3 }] },
        caption: String.raw`From left to right: $-\frac{3}{2} < -\frac{2}{3} < \frac{1}{4} < \frac{7}{8} < \frac{4}{3}$. Tick marks every $\frac{1}{4}$.`,
      },
    },
    {
      kind: "p",
      text: String.raw`The method that comes straight from the Math Review is a common denominator: once both fractions have the same positive denominator, the one with the larger numerator is larger. $\frac{7}{12}$ vs. $\frac{5}{9}$ becomes $\frac{21}{36}$ vs. $\frac{20}{36}$, so $\frac{7}{12}$ is larger. The fast version of the same idea is **cross-multiplying**, which works whenever both denominators are positive (a standard fact, though not stated in the ETS Math Review):`,
    },
    { kind: "math", tex: String.raw`b > 0,\ d > 0: \qquad \frac{a}{b} < \frac{c}{d} \iff ad < bc`, key: true },
    {
      kind: "p",
      text: String.raw`For $\frac{7}{12}$ vs. $\frac{5}{9}$: $(7)(9) = 63$ and $(12)(5) = 60$, and $63 > 60$, so $\frac{7}{12} > \frac{5}{9}$. Other quick tools: compare each fraction with a benchmark such as $\frac{1}{2}$ or $1$; compare the "missing pieces" ($\frac{11}{12} = 1 - \frac{1}{12}$ is larger than $\frac{10}{11} = 1 - \frac{1}{11}$ because it is missing less); or just divide on the on-screen calculator.`,
    },
    {
      kind: "interactive",
      key: "1-2-fractions/fraction-compare",
      title: "Fraction comparison explorer",
      caption: String.raw`Set two fractions and watch where they land. The common denominator and the cross products always agree with the number line. Try "Next tricky pair" for pairs that are close together or negative.`,
    },
    {
      kind: "p",
      text: String.raw`A few patterns come up again and again in Quantitative Comparison. If $0 < x < 1$, then $x^2 < x$ and $\frac{1}{x} > 1$: squaring a fraction between 0 and 1 makes it smaller, and its reciprocal is greater than 1. And if $0 < a < b$, adding 1 to the numerator and the denominator pushes the fraction up toward 1, because`,
    },
    { kind: "math", tex: String.raw`\frac{a + 1}{b + 1} - \frac{a}{b} = \frac{b(a + 1) - a(b + 1)}{b(b + 1)} = \frac{b - a}{b(b + 1)} > 0` },
    {
      kind: "p",
      text: String.raw`So $\frac{5}{8} < \frac{6}{9} < \frac{7}{10}$. Don't memorize that as a rule; just remember that subtracting over a common denominator settles any comparison of this kind.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Negative fractions flip",
      text: String.raw`$\frac{3}{4} > \frac{2}{3}$, so $-\frac{3}{4} < -\frac{2}{3}$: the negative with the larger size is farther left. And cross-multiplying needs positive denominators; with $\frac{3}{-4}$, first move the sign to the numerator ($\frac{-3}{4}$) before you cross-multiply.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "A fraction of a quantity" },
    {
      kind: "p",
      text: String.raw`In word problems, "$\frac{2}{5}$ of $N$" means $\frac{2}{5}N$, and the numbers are exact: if one-fifth of 50 marbles are green, exactly 10 are green and the other 40 are not (MC p. 17). The GRE likes to chain fractions with the phrase "of the remainder." Each step takes a fraction of what is _left_, so the leftover fractions multiply.`,
    },
    {
      kind: "p",
      text: String.raw`For example, someone spends $\frac{1}{3}$ of a salary on rent and then $\frac{1}{4}$ of the remainder on food. After rent, $\frac{2}{3}$ is left; after food, $\frac{3}{4}$ of that is left. So the fraction remaining is`,
    },
    { kind: "math", tex: String.raw`\frac{2}{3}\cdot\frac{3}{4} = \frac{1}{2} \qquad\text{not}\qquad 1 - \frac{1}{3} - \frac{1}{4} = \frac{5}{12}`, key: true },
    {
      kind: "aside",
      tone: "gre",
      text: String.raw`"What fraction of the class are girls?" asks for $\frac{\text{part}}{\text{whole}}$, usually in lowest terms. When a Numeric Entry question asks for a fraction, it gives two boxes and accepts any equivalent fraction, so $\frac{6}{8}$ and $\frac{3}{4}$ both count; you do not have to reduce, but you must not round.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Fractional expressions" },
    {
      kind: "p",
      text: String.raw`Because fractional expressions follow the same rules, you add, multiply and divide them exactly as you would fractions (MR pp. 10–11). For example, $\frac{\pi}{4} + \frac{\pi}{6} = \frac{3\pi}{12} + \frac{2\pi}{12} = \frac{5\pi}{12}$, and a fractional expression over another is again a division by the reciprocal:`,
    },
    { kind: "math", tex: String.raw`\dfrac{\;\frac{2}{\sqrt{3}}\;}{\;\frac{4}{\sqrt{6}}\;} = \frac{2}{\sqrt{3}}\cdot\frac{\sqrt{6}}{4} = \frac{\sqrt{6}}{2\sqrt{3}} = \frac{\sqrt{2}}{2}` },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Fraction questions on the GRE are rarely hard arithmetic. They test whether you can compare quickly (common denominator or cross-multiplying, with positive denominators), whether you read word problems precisely ("of the remainder," "divided by one half"), and whether you remember what changes a fraction's value (multiplying top and bottom by the same nonzero number does not; adding the same number to both usually does).`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Cancelling terms instead of factors. Adding fractions by adding numerators and denominators ($\frac{1}{2} + \frac{1}{3} \ne \frac{2}{5}$). Subtracting fractions of a remainder from 1 instead of multiplying what is left. Reading $-2\frac{1}{3}$ as $-2 + \frac{1}{3}$. Forgetting that for negative numbers a larger size means a smaller number. Assuming a variable fraction is positive when the question allows negatives, or forgetting a value that would make a denominator 0.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "fraction",
      term: "fraction",
      turkish: "kesir",
      definition: String.raw`A number of the form $\frac{c}{d}$, where $c$ and $d$ are integers and $d \ne 0$.`,
      formula: String.raw`\frac{c}{d},\quad c, d \text{ integers},\ d \ne 0`,
      source: "MR p. 7",
    },
    {
      id: "numerator",
      term: "numerator",
      turkish: "pay",
      definition: String.raw`The integer $c$ on top of the fraction $\frac{c}{d}$. In $\frac{-9}{4}$ the numerator is $-9$.`,
      source: "MR p. 7",
    },
    {
      id: "denominator",
      term: "denominator",
      turkish: "payda",
      definition: String.raw`The integer $d$ on the bottom of the fraction $\frac{c}{d}$; it can never be 0.`,
      source: "MR p. 7",
    },
    {
      id: "rational-number",
      term: "rational number",
      turkish: "rasyonel sayı",
      definition: String.raw`Another name for a fraction: a number that can be written as $\frac{c}{d}$ with integers $c$ and $d \ne 0$. Every integer $n$ is rational, since $n = \frac{n}{1}$.`,
      source: "MR p. 7",
    },
    {
      id: "fractional-expression",
      term: "fractional expression",
      turkish: "kesirli ifade",
      definition: String.raw`A number of the form $\frac{c}{d}$, $d \ne 0$, where $c$ or $d$ is not an integer, such as $\frac{\pi}{2}$. It is manipulated just like a fraction.`,
      source: "MR p. 10",
    },
    {
      id: "equivalent-fractions",
      term: "equivalent fractions",
      turkish: "denk kesirler",
      definition: String.raw`Fractions that represent the same number. Multiplying the numerator and denominator of $\frac{c}{d}$ by the same nonzero integer gives an equivalent fraction.`,
      formula: String.raw`\frac{c}{d} = \frac{ck}{dk}`,
      source: "MR p. 7",
    },
    {
      id: "reduce",
      term: "reduce (a fraction)",
      turkish: "sadeleştirmek (kesri sadeleştirme)",
      definition: String.raw`To divide out a common factor of the numerator and denominator, giving an equivalent fraction with smaller terms, e.g. $\frac{40}{56} = \frac{5}{7}$.`,
      source: "MR p. 8",
    },
    {
      id: "lowest-terms",
      term: "lowest terms",
      turkish: "en sade hâl (sadeleşmeyen kesir)",
      definition: String.raw`A fraction is in lowest terms when its numerator and denominator have no common factor greater than 1, e.g. $\frac{3}{5}$ but not $\frac{6}{10}$.`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 8",
    },
    {
      id: "common-denominator",
      term: "common denominator",
      turkish: "ortak payda",
      definition: String.raw`A common multiple of the denominators of two (or more) fractions. Rewriting the fractions over it lets you add or subtract numerators.`,
      source: "MR p. 8",
    },
    {
      id: "least-common-denominator",
      term: "least common denominator",
      turkish: "en küçük ortak payda (paydaların EKOK'u)",
      definition: String.raw`The least common multiple of the denominators, the smallest positive common denominator. For $\frac{5}{12}$ and $\frac{7}{18}$ it is 36.`,
      note: "Not named in the ETS Math Review",
      source: "MC p. 5 (least common multiple)",
    },
    {
      id: "reciprocal",
      term: "reciprocal (invert)",
      turkish: "çarpmaya göre ters (bir kesri ters çevirmek)",
      definition: String.raw`The reciprocal of a nonzero fraction $\frac{c}{d}$ is $\frac{d}{c}$; finding it is called inverting the fraction. To divide by a fraction, multiply by its reciprocal.`,
      formula: String.raw`\frac{a}{b} \div \frac{c}{d} = \frac{a}{b}\cdot\frac{d}{c}`,
      source: "MR p. 9",
    },
    {
      id: "mixed-number",
      term: "mixed number",
      turkish: "tam sayılı kesir",
      definition: String.raw`An expression such as $4\frac{3}{8}$, made of an integer part and a fraction part between 0 and 1; it means $4 + \frac{3}{8} = \frac{35}{8}$.`,
      source: "MR pp. 9–10; MC p. 6",
    },
    {
      id: "improper-fraction",
      term: "proper / improper fraction",
      turkish: "basit kesir / bileşik kesir",
      definition: String.raw`A positive fraction is proper if its numerator is less than its denominator (value less than 1, e.g. $\frac{3}{8}$) and improper otherwise (e.g. $\frac{35}{8}$).`,
      note: "Not named in the ETS Math Review",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "qc",
      difficulty: "medium",
      quantityA: String.raw`$\frac{17}{23}$`,
      quantityB: String.raw`$\frac{19}{26}$`,
      answer: "A",
      explanation: [
        String.raw`Both denominators are positive, so cross-multiply: Quantity A's side gives $(17)(26) = 442$ and Quantity B's side gives $(23)(19) = 437$.`,
        String.raw`$442 > 437$, so $\frac{17}{23} > \frac{19}{26}$.`,
        String.raw`Check with missing pieces: $\frac{17}{23} = 1 - \frac{6}{23}$ and $\frac{19}{26} = 1 - \frac{7}{26}$. Since $\frac{6}{23} \approx 0.261$ is less than $\frac{7}{26} \approx 0.269$, Quantity A is missing less, so it is greater. Quantity A is greater.`,
      ],
    },
    {
      id: "ex2",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`Of the members of a hiking club, $\frac{2}{5}$ are students. Of the members who are not students, $\frac{1}{3}$ are retirees, and the remaining 24 members are neither students nor retirees. How many members does the club have?`,
      choices: [String.raw`$40$`, String.raw`$50$`, String.raw`$60$`, String.raw`$72$`, String.raw`$90$`],
      answer: 2,
      explanation: [
        String.raw`Let $N$ be the number of members. Non-students: $\frac{3}{5}N$.`,
        String.raw`The retirees are $\frac{1}{3}$ of the non-students, so $\frac{2}{3}$ of the non-students remain: $\frac{2}{3}\cdot\frac{3}{5}N = \frac{2}{5}N$.`,
        String.raw`$\frac{2}{5}N = 24$, so $N = 60$. Check: 24 students, 12 retirees, 24 others, total 60.`,
        String.raw`Trap: treating $\frac{1}{3}$ as a fraction of the whole club gives $1 - \frac{2}{5} - \frac{1}{3} = \frac{4}{15}$ and $N = 90$.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`What is the value of $\dfrac{\frac{2}{3} - \frac{1}{4}}{1 + \frac{5}{6}}$ ? Give your answer as a fraction.`,
      answer: { kind: "fraction", numerator: 5, denominator: 22 },
      explanation: [
        String.raw`Numerator: $\frac{2}{3} - \frac{1}{4} = \frac{8}{12} - \frac{3}{12} = \frac{5}{12}$.`,
        String.raw`Denominator: $1 + \frac{5}{6} = \frac{11}{6}$.`,
        String.raw`Divide by multiplying by the reciprocal: $\frac{5}{12}\cdot\frac{6}{11} = \frac{5}{2}\cdot\frac{1}{11} = \frac{5}{22}$ (cancel the 6 against the 12 first).`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`If $0 < x < 1$, which of the following must be greater than $x$ ? Indicate all such expressions.`,
      choices: [String.raw`$x^2$`, String.raw`$\frac{1}{x}$`, String.raw`$\frac{x + 1}{2}$`, String.raw`$\frac{2x}{x + 1}$`, String.raw`$\frac{x}{x + 1}$`, String.raw`$\frac{x + 1}{x + 2}$`],
      answer: [1, 2, 3],
      explanation: [
        String.raw`$x^2 = x \cdot x$, a positive number times a fraction less than 1, so $x^2 < x$. No.`,
        String.raw`$\frac{1}{x} > 1 > x$. Yes.`,
        String.raw`$\frac{x + 1}{2}$ is the average of $x$ and $1$, so it lies between them: greater than $x$. Yes.`,
        String.raw`$\frac{2x}{x + 1} > x \iff 2x > x(x + 1) \iff 2 > x + 1 \iff x < 1$ (we may multiply by $x + 1 > 0$ and divide by $x > 0$). True for every allowed $x$. Yes.`,
        String.raw`$\frac{x}{x + 1}$ divides $x$ by a number greater than 1, so it is less than $x$. No.`,
        String.raw`$\frac{x + 1}{x + 2}$ is always at least $\frac{1}{2}$, so it beats small $x$, but at $x = 0.9$ it is $\frac{1.9}{2.9} \approx 0.66 < 0.9$. Not always. No.`,
        String.raw`Answer: $\frac{1}{x}$, $\frac{x + 1}{2}$ and $\frac{2x}{x + 1}$. For "must be" questions, test both a small value ($x = 0.1$) and a value near 1 ($x = 0.9$).`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Reduce $\frac{84}{126}$ to lowest terms.`,
      answer: String.raw`$\frac{2}{3}$`,
      explanation: String.raw`The greatest common factor is 42: $\frac{84}{126} = \frac{(42)(2)}{(42)(3)}$.`,
    },
    {
      id: "q2",
      prompt: String.raw`Write $-7\frac{3}{4}$ as a fraction.`,
      answer: String.raw`$-\frac{31}{4}$`,
      explanation: String.raw`$-7\frac{3}{4} = -\left(7 + \frac{3}{4}\right) = -\left(\frac{28}{4} + \frac{3}{4}\right)$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Compute $\frac{3}{4} \div \frac{9}{10}$.`,
      answer: String.raw`$\frac{5}{6}$`,
      explanation: String.raw`$\frac{3}{4}\cdot\frac{10}{9} = \frac{30}{36} = \frac{5}{6}$.`,
    },
    {
      id: "q4",
      prompt: String.raw`Which is greater, $\frac{5}{8}$ or $\frac{7}{11}$?`,
      answer: String.raw`$\frac{7}{11}$`,
      explanation: String.raw`Cross-multiply: $(5)(11) = 55 < 56 = (8)(7)$, so $\frac{5}{8} < \frac{7}{11}$.`,
    },
    {
      id: "q5",
      prompt: String.raw`Compute $2\frac{3}{5} - 1\frac{4}{5}$.`,
      answer: String.raw`$\frac{4}{5}$`,
      explanation: String.raw`$\frac{13}{5} - \frac{9}{5} = \frac{4}{5}$.`,
    },
    {
      id: "q6",
      prompt: String.raw`What is the reciprocal of $-2\frac{1}{3}$?`,
      answer: String.raw`$-\frac{3}{7}$`,
      explanation: String.raw`$-2\frac{1}{3} = -\frac{7}{3}$, and the reciprocal of $-\frac{7}{3}$ is $-\frac{3}{7}$ (the sign stays).`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "easy",
        quantityA: String.raw`$\frac{1}{3} + \frac{1}{4} + \frac{1}{5}$`,
        quantityB: String.raw`$\frac{4}{5}$`,
        answer: "B",
        explanation: [
          String.raw`The least common denominator of 3, 4 and 5 is 60: $\frac{20}{60} + \frac{15}{60} + \frac{12}{60} = \frac{47}{60}$.`,
          String.raw`$\frac{4}{5} = \frac{48}{60}$, so Quantity B is greater (by $\frac{1}{60}$).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$p$ and $q$ are positive integers, and $\frac{p}{q} = \frac{3}{4}$.`,
        quantityA: String.raw`$\frac{p + 3}{q + 4}$`,
        quantityB: String.raw`$\frac{3}{4}$`,
        answer: "C",
        explanation: [
          String.raw`$\frac{p}{q} = \frac{3}{4}$ means $4p = 3q$, so $p = 3k$ and $q = 4k$ for some positive number $k$ (in fact a positive integer, since 3 and 4 have no common factor).`,
          String.raw`Then $\frac{p + 3}{q + 4} = \frac{3k + 3}{4k + 4} = \frac{3(k + 1)}{4(k + 1)} = \frac{3}{4}$.`,
          String.raw`The quantities are equal. Trap: "adding to the numerator and denominator moves a fraction toward 1" is true when you add the _same_ number to both. Here you add 3 and 4, in the same ratio as the fraction, and the value does not move.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$n$ is an integer, $n \ne -1$, and $n \ne -2$.`,
        quantityA: String.raw`$\frac{n}{n + 1}$`,
        quantityB: String.raw`$\frac{n + 1}{n + 2}$`,
        answer: "B",
        explanation: [
          String.raw`Subtract over a common denominator: $\frac{n + 1}{n + 2} - \frac{n}{n + 1} = \frac{(n + 1)^2 - n(n + 2)}{(n + 1)(n + 2)} = \frac{1}{(n + 1)(n + 2)}$.`,
          String.raw`For the difference to be negative, $(n + 1)(n + 2)$ would have to be negative, which needs $-2 < n < -1$. No integer lies there, so for every allowed integer $n$, $(n + 1)(n + 2) > 0$ and Quantity B is greater.`,
          String.raw`Check with numbers: $n = 1$ gives $\frac{1}{2} < \frac{2}{3}$; $n = -3$ gives $\frac{3}{2} < 2$; $n = 0$ gives $0 < \frac{1}{2}$.`,
          String.raw`Trap: if $n$ could be any real number, $n = -1.5$ would give $3 > -1$ and the answer would be (D). The word "integer" is what makes the answer (B).`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Which of the following numbers is between $\frac{3}{7}$ and $\frac{4}{9}$ ?`,
        choices: [String.raw`$\frac{2}{5}$`, String.raw`$\frac{5}{12}$`, String.raw`$\frac{7}{16}$`, String.raw`$\frac{9}{20}$`, String.raw`$\frac{1}{2}$`],
        answer: 2,
        explanation: [
          String.raw`$\frac{3}{7} \approx 0.4286$ and $\frac{4}{9} \approx 0.4444$, so we need a number in that narrow window.`,
          String.raw`$\frac{2}{5} = 0.4$ and $\frac{5}{12} \approx 0.4167$ are too small; $\frac{9}{20} = 0.45$ and $\frac{1}{2}$ are too large.`,
          String.raw`$\frac{7}{16} = 0.4375$ works. Exact check by cross-multiplying: $(3)(16) = 48 < 49 = (7)(7)$, so $\frac{3}{7} < \frac{7}{16}$; and $(7)(9) = 63 < 64 = (16)(4)$, so $\frac{7}{16} < \frac{4}{9}$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`Mara spent $\frac{1}{4}$ of her money on books. She then spent $\frac{2}{5}$ of the remaining money on a coat, and after that she spent $\frac{1}{3}$ of what was left on dinner. If she then had \$54 left, how many dollars did she have at the start?`,
        choices: [String.raw`$120$`, String.raw`$150$`, String.raw`$180$`, String.raw`$216$`, String.raw`$270$`],
        answer: 2,
        explanation: [
          String.raw`Each step takes a fraction of what is left, so multiply the fractions that remain: $\frac{3}{4}\cdot\frac{3}{5}\cdot\frac{2}{3} = \frac{18}{60} = \frac{3}{10}$.`,
          String.raw`$\frac{3}{10}$ of her money is \$54, so she started with $54 \cdot \frac{10}{3} = 180$ dollars.`,
          String.raw`Check: books \$45, leaving \$135; coat \$54, leaving \$81; dinner \$27, leaving \$54.`,
          String.raw`Trap: $1 - \frac{1}{4} - \frac{2}{5} - \frac{1}{3} = \frac{1}{60}$ treats every fraction as a fraction of the original amount.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A water tank is $\frac{2}{5}$ full. After 21 gallons of water are added, the tank is $\frac{3}{4}$ full. What is the capacity of the tank, in gallons?`,
        choices: [String.raw`$36$`, String.raw`$48$`, String.raw`$60$`, String.raw`$72$`, String.raw`$84$`],
        answer: 2,
        explanation: [
          String.raw`The 21 gallons fill $\frac{3}{4} - \frac{2}{5} = \frac{15}{20} - \frac{8}{20} = \frac{7}{20}$ of the tank.`,
          String.raw`If $C$ is the capacity, $\frac{7}{20}C = 21$, so $C = 21\cdot\frac{20}{7} = 60$.`,
          String.raw`Check: $\frac{2}{5}(60) = 24$ and $24 + 21 = 45 = \frac{3}{4}(60)$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`$a$ and $b$ are positive integers and $\frac{a}{b} < 1$. Which of the following must be less than 1? Indicate all such expressions.`,
        choices: [String.raw`$\frac{a + 1}{b + 1}$`, String.raw`$\frac{2a}{b}$`, String.raw`$\frac{a}{b + 1}$`, String.raw`$\frac{a^2}{b^2}$`, String.raw`$\frac{a + b}{2b}$`, String.raw`$\frac{a + 2}{b}$`],
        answer: [0, 2, 3, 4],
        explanation: [
          String.raw`Since $b > 0$, $\frac{a}{b} < 1$ means $a < b$, and because they are integers, $a \le b - 1$.`,
          String.raw`$\frac{a + 1}{b + 1}$: $a + 1 < b + 1$. Must be less than 1.`,
          String.raw`$\frac{2a}{b}$: $a = 2$, $b = 3$ gives $\frac{4}{3}$. Not necessarily.`,
          String.raw`$\frac{a}{b + 1}$: $a < b < b + 1$. Must.`,
          String.raw`$\frac{a^2}{b^2} = \left(\frac{a}{b}\right)^2$, the square of a number between 0 and 1, which is less than that number. Must.`,
          String.raw`$\frac{a + b}{2b}$: $a + b < b + b = 2b$. Must. (It is the average of $\frac{a}{b}$ and 1.)`,
          String.raw`$\frac{a + 2}{b}$: $a = 1$, $b = 2$ gives $\frac{3}{2}$. Not necessarily. (With $a \le b - 1$, the integer condition does save $\frac{a + 1}{b} \le 1$, but not this one.)`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following fractions are greater than $\frac{5}{8}$ ? Indicate all such fractions.`,
        choices: [String.raw`$\frac{3}{5}$`, String.raw`$\frac{13}{21}$`, String.raw`$\frac{12}{19}$`, String.raw`$\frac{7}{11}$`, String.raw`$\frac{9}{14}$`, String.raw`$\frac{2}{3}$`],
        answer: [2, 3, 4, 5],
        explanation: [
          String.raw`Cross-multiply each choice $\frac{c}{d}$ against $\frac{5}{8}$: it is greater exactly when $8c > 5d$.`,
          String.raw`$\frac{3}{5}$: $24$ vs. $25$, no. $\frac{13}{21}$: $104$ vs. $105$, no. $\frac{12}{19}$: $96$ vs. $95$, yes.`,
          String.raw`$\frac{7}{11}$: $56$ vs. $55$, yes. $\frac{9}{14}$: $72$ vs. $70$, yes. $\frac{2}{3}$: $16$ vs. $15$, yes.`,
          String.raw`Answer: $\frac{12}{19}$, $\frac{7}{11}$, $\frac{9}{14}$ and $\frac{2}{3}$. Several pairs differ by 1 in the cross products, which is why estimating with rough decimals is risky here.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`What is the value of the product $\left(1 - \frac{1}{2}\right)\left(1 - \frac{1}{3}\right)\left(1 - \frac{1}{4}\right)\cdots\left(1 - \frac{1}{20}\right)$ ? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 1, denominator: 20 },
        explanation: [
          String.raw`Write each factor as a single fraction: $1 - \frac{1}{k} = \frac{k - 1}{k}$.`,
          String.raw`The product is $\frac{1}{2}\cdot\frac{2}{3}\cdot\frac{3}{4}\cdots\frac{19}{20}$. Each numerator cancels the previous denominator.`,
          String.raw`Only the first numerator and the last denominator survive: $\frac{1}{20}$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`What is the value of $\left(2\frac{1}{4} - 1\frac{5}{6}\right) \div \frac{5}{8}$ ? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 2, denominator: 3 },
        explanation: [
          String.raw`Convert: $2\frac{1}{4} = \frac{9}{4}$ and $1\frac{5}{6} = \frac{11}{6}$.`,
          String.raw`Subtract over 12: $\frac{27}{12} - \frac{22}{12} = \frac{5}{12}$.`,
          String.raw`Divide: $\frac{5}{12}\cdot\frac{8}{5} = \frac{8}{12} = \frac{2}{3}$.`,
        ],
      },
    ],
  },
};

export default section;
