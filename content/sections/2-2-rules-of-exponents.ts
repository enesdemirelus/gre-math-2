import type { Section } from "../types";

const section: Section = {
  id: "2-2-rules-of-exponents",
  number: "2.2",
  title: "Rules of Exponents",
  part: "algebra",
  mrPages: "40–43",
  summary: String.raw`The seven rules that simplify any product, quotient or power of powers; the six look-alike "rules" that are false; how to solve equations like $4^{x+2} = 8^{x-1}$ by matching bases; and how to compare or combine enormous powers such as $3^{40}$ and $2^{60}$ without a calculator.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The seven rules" },
    {
      kind: "p",
      text: String.raw`In the algebraic expression $x^a$, $x$ is the [[base]] and $a$ is the [[exponent]], and we say $x$ is [[raised-to-power|raised to the power]] $a$ (MR p. 40). Section 1.3 covered what a single power means; this section is about _combining_ powers. The Math Review lists seven rules. In each, the bases $x$ and $y$ are nonzero real numbers and the exponents $a$ and $b$ are integers, unless stated otherwise (MR p. 41).`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{array}{lll}
\text{Rule 1:} & x^{-a} = \dfrac{1}{x^a} & 4^{-3} = \dfrac{1}{64} \\[10pt]
\text{Rule 2:} & x^a\, x^b = x^{a+b} & 3^2 \cdot 3^4 = 3^6 \\[10pt]
\text{Rule 3:} & \dfrac{x^a}{x^b} = x^{a-b} = \dfrac{1}{x^{b-a}} & \dfrac{t^3}{t^8} = t^{-5} = \dfrac{1}{t^5} \\[10pt]
\text{Rule 4:} & x^0 = 1 & (-3)^0 = 1 \\[10pt]
\text{Rule 5:} & x^a\, y^a = (xy)^a & 2^3 \cdot 5^3 = 10^3 \\[10pt]
\text{Rule 6:} & \left(\dfrac{x}{y}\right)^a = \dfrac{x^a}{y^a} & \left(\dfrac{r}{2t}\right)^3 = \dfrac{r^3}{8t^3} \\[10pt]
\text{Rule 7:} & \left(x^a\right)^b = x^{ab} & \left(3y^4\right)^2 = 9y^8
\end{array}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`These rules are [[identity|identities]]: they hold for every allowed value of the letters, and their job is to simplify expressions (MR p. 42). Read them as three families. Rules 2 and 3 handle the **same base**: multiply by adding exponents, divide by subtracting. Rules 5 and 6 handle the **same exponent**: a product or quotient of different bases can be gathered under one exponent, and an exponent outside parentheses distributes over a product or quotient inside. Rule 7 handles a **power of a power**: multiply the exponents. Rules 1 and 4 are the definitions of negative and zero exponents from Section 1.3, and $0^0$ is still not defined (MR p. 42).`,
    },
    {
      kind: "p",
      text: String.raw`A typical simplification uses several rules in a row. Distribute the outer exponent first (Rules 5 and 7), then combine like bases (Rule 3), then clear negative exponents (Rule 1):`,
    },
    {
      kind: "math",
      tex: String.raw`\frac{\left(2x^3y^{-2}\right)^3}{4x^5y^{-4}} = \frac{8x^9y^{-6}}{4x^5y^{-4}} = 2x^{9-5}y^{-6-(-4)} = 2x^4y^{-2} = \frac{2x^4}{y^2}`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "The coefficient is raised too",
      text: String.raw`In $\left(2x^3\right)^3$ the 2 is a factor inside the parentheses, so Rule 5 cubes it: $2^3x^9 = 8x^9$. Multiplying it by 3 instead (giving $6x^9$) is a common slip, and so is forgetting it altogether ($2x^9$).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Rewrite everything in a common base" },
    {
      kind: "p",
      text: String.raw`Rules 2 and 3 apply only when the bases match, so the standard GRE move is to rewrite every base as a power of the same prime. Know the small powers cold: $4 = 2^2$, $8 = 2^3$, $16 = 2^4$, $32 = 2^5$, $64 = 2^6$; $9 = 3^2$, $27 = 3^3$, $81 = 3^4$; $25 = 5^2$, $125 = 5^3$. Then Rule 7 turns each power into a power of the prime:`,
    },
    { kind: "math", tex: String.raw`\frac{8^4 \cdot 4^{-3}}{2^5} = \frac{\left(2^3\right)^4 \cdot \left(2^2\right)^{-3}}{2^5} = \frac{2^{12} \cdot 2^{-6}}{2^5} = 2^{12 - 6 - 5} = 2^1 = 2` },
    {
      kind: "p",
      text: String.raw`Composite bases split into primes with Rule 5: $12^5 = \left(2^2 \cdot 3\right)^5 = 2^{10} \cdot 3^5$ and $6^n = 2^n \cdot 3^n$. The reverse direction is just as useful: $2^{7} \cdot 5^{7} = 10^{7}$, so $2^{9} \cdot 5^{7} = 2^2 \cdot 10^7 = 40{,}000{,}000$.`,
    },
    {
      kind: "interactive",
      key: "2-2-rules-of-exponents/exponent-drill",
      title: "Exponent drill",
      caption: String.raw`Type the exponent (or the value of $x$) and press Check. Each problem comes with a step-by-step solution naming the rule used. Pick a problem type to practice one skill at a time.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Solving equations with the same base" },
    {
      kind: "p",
      text: String.raw`Once two powers have the same base, you can compare their exponents directly. The Math Review states the property carefully: for all integers $a$ and $b$ and all positive numbers $x$ except $x = 1$, if $x^a = x^b$, then $a = b$ (MR p. 40).`,
    },
    { kind: "math", tex: String.raw`x > 0,\ x \ne 1,\ \ x^a = x^b \;\Longrightarrow\; a = b`, key: true },
    {
      kind: "p",
      text: String.raw`The hypotheses are there for a reason. With base 1, $1^2 = 1^7$ but $2 \ne 7$; with base $-1$, $(-1)^2 = (-1)^4$; with base 0, $0^2 = 0^5$. So the method is: rewrite both sides with one positive base other than 1, set the exponents equal, and solve the resulting linear equation. For example:`,
    },
    {
      kind: "math",
      tex: String.raw`9^{x+1} = 27^{x-1} \;\Longrightarrow\; 3^{2x+2} = 3^{3x-3} \;\Longrightarrow\; 2x + 2 = 3x - 3 \;\Longrightarrow\; x = 5`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE phrases it",
      text: String.raw`These usually arrive as "If $2^{3n} \cdot 4^{n} = 2^{20}$, what is $n$?" (here $2^{3n + 2n} = 2^{20}$, so $n = 4$) or as a QC that compares the solution of such an equation with a number. The first step is always the same: one base on each side.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Fractional exponents" },
    {
      kind: "p",
      text: String.raw`The Math Review states its rules for integer exponents only. You may still meet a [[fractional-exponent|fractional exponent]], defined as a root (a standard convention, though not stated in the ETS Math Review): for $x > 0$ and positive integers $m$ and $n$,`,
    },
    { kind: "math", tex: String.raw`x^{\frac{1}{n}} = \sqrt[n]{x} \qquad\qquad x^{\frac{m}{n}} = \left(\sqrt[n]{x}\right)^m = \sqrt[n]{x^m}`, key: true },
    {
      kind: "p",
      text: String.raw`So $9^{\frac{1}{2}} = 3$, $8^{\frac{2}{3}} = \left(\sqrt[3]{8}\right)^2 = 4$, and $16^{-\frac{3}{4}} = \frac{1}{\left(\sqrt[4]{16}\right)^3} = \frac{1}{8}$. With a positive base, all seven rules and the equal-exponents property continue to hold for fractional (indeed for all real) exponents, again a standard fact outside the Math Review. That is what lets you solve $4^x = 8$ by writing $2^{2x} = 2^3$, so $x = \frac{3}{2}$, or use $2^x = 3$ to find $8^x = \left(2^x\right)^3 = 27$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`Take the root first when the numbers are large: $27^{\frac{4}{3}} = \left(\sqrt[3]{27}\right)^4 = 3^4 = 81$ is easy, whereas $\sqrt[3]{27^4}$ means finding the cube root of 531,441. And keep fractional exponents on positive bases; the rules can fail for negative bases.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Sums of powers and huge comparisons" },
    {
      kind: "p",
      text: String.raw`No rule combines a **sum** of powers, but you can [[factor-out|factor out]] a common power and then apply the rules (factoring out is from MR p. 38). Two patterns come up constantly. Several copies of the same power: $3^{10} + 3^{10} + 3^{10} = 3 \cdot 3^{10} = 3^{11}$, and $2^{30} + 2^{30} = 2^{31}$. Different powers of one base: factor out the smallest.`,
    },
    { kind: "math", tex: String.raw`5^{12} - 5^{10} = 5^{10}\left(5^2 - 1\right) = 24 \cdot 5^{10} \qquad\quad \frac{2^{20} + 2^{18}}{2^{18}} = \frac{2^{18}\left(2^2 + 1\right)}{2^{18}} = 5`, key: true },
    {
      kind: "p",
      text: String.raw`To compare two enormous powers, make either the bases or the exponents match. Same base: the bigger exponent wins when the base is greater than 1, so $8^{10} = 2^{30} > 2^{29}$. Same exponent: the bigger positive base wins, so to compare $3^{40}$ and $2^{60}$, pull out the common factor 20 from the exponents with Rule 7:`,
    },
    { kind: "math", tex: String.raw`3^{40} = \left(3^2\right)^{20} = 9^{20} \qquad 2^{60} = \left(2^3\right)^{20} = 8^{20} \qquad\Longrightarrow\qquad 3^{40} > 2^{60}` },
    {
      kind: "aside",
      tone: "tip",
      title: "Speed tip",
      text: String.raw`$2^{10} = 1{,}024 \approx 10^3$ gives quick estimates: $2^{40} \approx 10^{12}$, slightly more. For "which is greatest" lists of huge powers, find the greatest common factor of all the exponents and rewrite each power with that exponent; then compare only the bases.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Six look-alikes that are false" },
    {
      kind: "p",
      text: String.raw`The Math Review closes the section with six "cases" of expressions that look as if they simplify but do not (MR p. 43). Every one of them shows up as a wrong answer choice.`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{array}{ll}
1. & x^a y^b \ne (xy)^{a+b} \\[4pt]
2. & \left(x^a\right)^b \ne x^a x^b \\[4pt]
3. & (x + y)^a \ne x^a + y^a \\[4pt]
4. & (-x)^2 \ne -x^2 \\[4pt]
5. & \sqrt{x^2 + y^2} \ne x + y \\[4pt]
6. & \dfrac{a}{x + y} \ne \dfrac{a}{x} + \dfrac{a}{y}
\end{array}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`Case 1: Rule 5 needs the _same_ exponent; $2^4 \cdot 3^2 = 144$, while $6^6 = 46{,}656$. Case 2: a power of a power multiplies exponents, a product adds them, so $\left(4^2\right)^3 = 4^6$ but $4^2 \cdot 4^3 = 4^5$. Case 3: exponents do not distribute over sums; $(x + y)^2 = x^2 + 2xy + y^2$, and it is the middle term $2xy$ that the false version drops. Case 4: $(-x)^2 = x^2$; watch where each negative sign is. Case 5: roots do not distribute over sums either ($\sqrt{9 + 16} = 5$, not 7). Case 6: a sum in the denominator cannot be split, although a sum in the numerator can: $\frac{x + y}{a} = \frac{x}{a} + \frac{y}{a}$ (MR p. 43).`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Test a suspicious step with numbers",
      text: String.raw`If you are not sure whether a manipulation is legal, try $x = 1$, $y = 2$ (or $x = 2$, $a = 3$). A real identity survives every test; a look-alike almost always fails the first one. For instance $(1 + 2)^2 = 9$ but $1^2 + 2^2 = 5$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Almost every exponent problem on the GRE yields to the same plan: rewrite with prime bases, apply the rules to products, quotients and powers, factor out a common power from any sum, and, in an equation, set exponents equal once the bases match. When comparing, make bases or exponents match first.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Adding exponents when powers are added instead of multiplied ($2^5 + 2^5 = 2^6$, not $2^{10}$ and not $4^5$). Multiplying exponents in a product, or adding them in a power of a power. Multiplying the bases together in $2^n \cdot 2^n$ (it is $2^{2n} = 4^n$, not $4^{2n}$). Forgetting to raise a coefficient. Setting exponents equal when the bases differ, or when the base is 1, 0 or $-1$. And in a QC like $\left(x^2\right)^3$ versus $x^2 \cdot x^3$, remembering that $x$ may be negative or between 0 and 1.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "base",
      term: "base",
      turkish: "taban",
      definition: String.raw`In the expression $x^a$, the number $x$ that is raised to the power $a$.`,
      source: "MR p. 40",
    },
    {
      id: "exponent",
      term: "exponent",
      turkish: "üs",
      definition: String.raw`In the expression $x^a$, the number $a$ to which the base is raised.`,
      source: "MR p. 40",
    },
    {
      id: "raised-to-power",
      term: "raised to the power",
      turkish: "kuvvetini almak (üssünü almak)",
      definition: String.raw`"$x$ is raised to the power $a$" describes the expression $x^a$; for example, $2^5$ is 2 raised to the fifth power.`,
      source: "MR p. 40",
    },
    {
      id: "identity",
      term: "identity",
      turkish: "özdeşlik",
      definition: String.raw`A statement of equality between two algebraic expressions that is true for all possible values of the variables involved. The seven rules of exponents are identities used to simplify expressions.`,
      formula: String.raw`\left(x^a\right)\left(x^b\right) = x^{a+b}`,
      source: "MR pp. 39, 42",
    },
    {
      id: "product-rule",
      term: "product of powers (Rule 2)",
      turkish: "aynı tabanlı üslü sayılarda çarpma",
      definition: String.raw`Powers of the same nonzero base are multiplied by adding the exponents.`,
      formula: String.raw`x^a x^b = x^{a+b}`,
      note: "The Math Review calls it Rule 2 and gives it no name",
      source: "MR p. 41",
    },
    {
      id: "quotient-rule",
      term: "quotient of powers (Rule 3)",
      turkish: "aynı tabanlı üslü sayılarda bölme",
      definition: String.raw`Powers of the same nonzero base are divided by subtracting the exponents.`,
      formula: String.raw`\frac{x^a}{x^b} = x^{a-b} = \frac{1}{x^{b-a}}`,
      note: "The Math Review calls it Rule 3 and gives it no name",
      source: "MR p. 41",
    },
    {
      id: "power-rule",
      term: "power of a power (Rule 7)",
      turkish: "üssün üssü (kuvvetin kuvveti)",
      definition: String.raw`A power raised to a power: multiply the exponents. Not to be confused with a product of powers, where exponents are added.`,
      formula: String.raw`\left(x^a\right)^b = x^{ab}`,
      note: "The Math Review calls it Rule 7 and gives it no name",
      source: "MR pp. 42–43",
    },
    {
      id: "fractional-exponent",
      term: "fractional exponent",
      turkish: "rasyonel üs / kesirli üs",
      definition: String.raw`For $x > 0$ and positive integers $m$, $n$: $x^{1/n}$ is the $n$th root of $x$, and $x^{m/n} = \left(\sqrt[n]{x}\right)^m$.`,
      formula: String.raw`8^{\frac{2}{3}} = \left(\sqrt[3]{8}\right)^2 = 4`,
      note: "Not named in the ETS Math Review",
    },
    {
      id: "factor-out",
      term: "factor out",
      turkish: "ortak çarpan parantezine almak",
      definition: String.raw`To write a factor common to every term of an expression outside parentheses, as in $15y^2 - 9y = 3y(5y - 3)$. With powers: $2^{12} + 2^{10} = 2^{10}\left(2^2 + 1\right)$.`,
      source: "MR p. 38",
    },
    {
      id: "expansion",
      term: "expansion",
      turkish: "açılım",
      definition: String.raw`Writing a power of a sum as a sum of terms. The correct expansion of $(x + y)^2$ is $x^2 + 2xy + y^2$, which contains the additional term $2xy$.`,
      formula: String.raw`(x + y)^2 = x^2 + 2xy + y^2`,
      source: "MR pp. 39, 43",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`For all nonzero $x$ and $y$, $\dfrac{\left(3x^{-2}y^{3}\right)^{2}}{9x^{-5}y} = $`,
      choices: [String.raw`$\dfrac{y^5}{x^9}$`, String.raw`$\dfrac{xy^5}{3}$`, String.raw`$xy^5$`, String.raw`$xy^6$`, String.raw`$x^{9}y^5$`],
      answer: 2,
      explanation: [
        String.raw`Square everything inside the parentheses (Rules 5 and 7): $\left(3x^{-2}y^3\right)^2 = 9x^{-4}y^{6}$.`,
        String.raw`Divide like bases by subtracting exponents (Rule 3): $\frac{9x^{-4}y^6}{9x^{-5}y^1} = x^{-4-(-5)}y^{6-1} = x^{1}y^{5}$.`,
        String.raw`So the expression equals $xy^5$.`,
        String.raw`Traps: $\frac{y^5}{x^9}$ computes $-4 - 5$ instead of $-4 - (-5)$; $\frac{xy^5}{3}$ forgets to square the coefficient 3; $xy^6$ forgets the $y$ in the denominator; $x^9y^5$ squares $x^{-2}$ to $x^{4}$, losing the sign of the exponent.`,
      ],
    },
    {
      id: "ex2",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`If $4^{x+2} = 8^{x-1}$, what is the value of $x$?`,
      answer: { kind: "decimal", value: "7" },
      explanation: [
        String.raw`Rewrite both sides with base 2 (Rule 7): $4^{x+2} = 2^{2x+4}$ and $8^{x-1} = 2^{3x-3}$.`,
        String.raw`The base 2 is positive and not 1, so the exponents are equal: $2x + 4 = 3x - 3$, giving $x = 7$.`,
        String.raw`Check: $4^9 = 2^{18}$ and $8^6 = 2^{18}$.`,
      ],
    },
    {
      id: "ex3",
      type: "qc",
      difficulty: "medium",
      quantityA: String.raw`$5^{21} - 5^{20}$`,
      quantityB: String.raw`$4 \cdot 5^{20}$`,
      answer: "C",
      explanation: [
        String.raw`Factor the smaller power out of Quantity A: $5^{21} - 5^{20} = 5^{20}(5 - 1) = 4 \cdot 5^{20}$.`,
        String.raw`That is exactly Quantity B, so the quantities are equal.`,
        String.raw`Trap: $5^{21} - 5^{20} = 5^{1}$ (subtracting exponents) uses Rule 3, which is for _dividing_ powers, not subtracting them.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`Which of the following are equal to $2^{12}$ ? Indicate all such expressions.`,
      choices: [
        String.raw`$4^6$`,
        String.raw`$\left(2^3\right)\left(2^4\right)$`,
        String.raw`$\left(2^3\right)^4$`,
        String.raw`$2^{11} + 2^{11}$`,
        String.raw`$2^6 + 2^6$`,
        String.raw`$\dfrac{6^{12}}{3^{12}}$`,
      ],
      answer: [0, 2, 3, 5],
      explanation: [
        String.raw`$4^6 = \left(2^2\right)^6 = 2^{12}$: yes. $\left(2^3\right)^4 = 2^{12}$: yes (Rule 7).`,
        String.raw`$\left(2^3\right)\left(2^4\right) = 2^7$: no; a product adds exponents (case 2 on MR p. 43).`,
        String.raw`$2^{11} + 2^{11} = 2 \cdot 2^{11} = 2^{12}$: yes. $2^6 + 2^6 = 2^7$: no.`,
        String.raw`$\frac{6^{12}}{3^{12}} = \left(\frac{6}{3}\right)^{12} = 2^{12}$: yes (Rule 6).`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Simplify $\left(x^3\right)^4 \cdot x^{-5}$ for $x \ne 0$.`,
      answer: String.raw`$x^7$`,
      explanation: String.raw`$\left(x^3\right)^4 = x^{12}$ (Rule 7), and $x^{12} \cdot x^{-5} = x^7$ (Rule 2).`,
    },
    {
      id: "q2",
      prompt: String.raw`Evaluate $\dfrac{2^{-3} \cdot 2^{8}}{2^{2}}$.`,
      answer: String.raw`$8$`,
      explanation: String.raw`$2^{-3 + 8 - 2} = 2^3 = 8$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Write $2^{15} + 2^{15}$ as a single power of 2.`,
      answer: String.raw`$2^{16}$`,
      explanation: String.raw`Two equal terms: $2 \cdot 2^{15} = 2^{16}$.`,
    },
    {
      id: "q4",
      prompt: String.raw`If $3^{2x} = 81$, what is $x$?`,
      answer: String.raw`$2$`,
      explanation: String.raw`$81 = 3^4$, so $2x = 4$ and $x = 2$.`,
    },
    {
      id: "q5",
      prompt: String.raw`Evaluate $8^{\frac{2}{3}}$ and $25^{-\frac{1}{2}}$.`,
      answer: String.raw`$4$ and $\frac{1}{5}$`,
      explanation: String.raw`$8^{2/3} = \left(\sqrt[3]{8}\right)^2 = 4$; $25^{-1/2} = \frac{1}{\sqrt{25}} = \frac{1}{5}$.`,
    },
    {
      id: "q6",
      prompt: String.raw`Is $(x + 3)^2 = x^2 + 9$ an identity?`,
      answer: String.raw`No`,
      explanation: String.raw`$(x + 3)^2 = x^2 + 6x + 9$. The two sides agree only when $x = 0$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$x \ne 0$`,
        quantityA: String.raw`$\left(x^2\right)^3$`,
        quantityB: String.raw`$x^2 \cdot x^3$`,
        answer: "D",
        explanation: [
          String.raw`Quantity A $= x^{6}$ (Rule 7) and Quantity B $= x^{5}$ (Rule 2).`,
          String.raw`If $x = 2$: $64 > 32$, A is greater. If $x = 1$: both equal 1.`,
          String.raw`(Also, if $x = \frac{1}{2}$: $\frac{1}{64} < \frac{1}{32}$, B is greater.) The relationship cannot be determined: (D).`,
          String.raw`Trap: treating both as $x^6$ (case 2 on MR p. 43) gives (C); assuming $x$ is an integer greater than 1 gives (A).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        quantityA: String.raw`$3^{40}$`,
        quantityB: String.raw`$2^{60}$`,
        answer: "A",
        explanation: [
          String.raw`Make the exponents match. The exponents 40 and 60 share the factor 20.`,
          String.raw`$3^{40} = \left(3^2\right)^{20} = 9^{20}$ and $2^{60} = \left(2^3\right)^{20} = 8^{20}$.`,
          String.raw`With the same positive exponent, the greater base gives the greater power: $9^{20} > 8^{20}$. Quantity A is greater.`,
          String.raw`Trap: "60 is a bigger exponent" ignores that the base is smaller. Exponents can only be compared directly when the bases are the same.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        quantityA: String.raw`$\dfrac{9^{10} - 9^{9}}{8}$`,
        quantityB: String.raw`$3^{18}$`,
        answer: "C",
        explanation: [
          String.raw`Factor the smaller power out of the numerator: $9^{10} - 9^9 = 9^9(9 - 1) = 8 \cdot 9^9$.`,
          String.raw`So Quantity A $= \frac{8 \cdot 9^9}{8} = 9^9$.`,
          String.raw`$9^9 = \left(3^2\right)^9 = 3^{18}$, which is Quantity B. The quantities are equal.`,
          String.raw`Trap: computing $9^{10} - 9^9$ as $9^1$ and getting $\frac{9}{8}$.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`If $\dfrac{5^{n} \cdot 25^{4}}{125^{2}} = 5^{7}$, what is the value of $n$?`,
        choices: [String.raw`$1$`, String.raw`$3$`, String.raw`$5$`, String.raw`$7$`, String.raw`$9$`],
        answer: 2,
        explanation: [
          String.raw`Rewrite in base 5: $25^4 = 5^8$ and $125^2 = 5^6$.`,
          String.raw`The left side is $5^{n + 8 - 6} = 5^{n + 2}$.`,
          String.raw`Setting exponents equal: $n + 2 = 7$, so $n = 5$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`If $2^{x} = 3$, what is the value of $8^{x+1}$ ?`,
        choices: [String.raw`$24$`, String.raw`$27$`, String.raw`$72$`, String.raw`$216$`, String.raw`$512$`],
        answer: 3,
        explanation: [
          String.raw`You do not need $x$ itself. Write $8^{x+1}$ in terms of $2^x$: $8^{x+1} = 8^x \cdot 8$.`,
          String.raw`$8^x = \left(2^3\right)^x = \left(2^x\right)^3 = 3^3 = 27$ (Rule 7, which holds for any real exponent when the base is positive).`,
          String.raw`So $8^{x+1} = 27 \cdot 8 = 216$.`,
          String.raw`Traps: $27$ forgets the $+1$; $24 = 8 \cdot 3$ forgets to cube; $72 = 8 \cdot 9$ squares instead of cubing.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`Which of the following is greatest?`,
        choices: [String.raw`$2^{60}$`, String.raw`$3^{40}$`, String.raw`$5^{30}$`, String.raw`$7^{20}$`, String.raw`$10^{20}$`],
        answer: 2,
        explanation: [
          String.raw`All the exponents are multiples of 10, so write each number as a power with exponent 10.`,
          String.raw`$2^{60} = 64^{10}$, $3^{40} = 81^{10}$, $5^{30} = 125^{10}$, $7^{20} = 49^{10}$, $10^{20} = 100^{10}$.`,
          String.raw`Now compare the bases: 125 is the greatest, so $5^{30}$ is the greatest.`,
          String.raw`Trap: $10^{20}$ looks largest because of the base 10, but $5^{30} = 125^{10} > 100^{10}$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following equations are true for **all** nonzero numbers $x$ and $y$? Indicate all such equations.`,
        choices: [
          String.raw`$\left(x^2y\right)^3 = x^6y^3$`,
          String.raw`$(x + y)^2 = x^2 + y^2$`,
          String.raw`$\dfrac{x^{-2}}{x^{-5}} = x^3$`,
          String.raw`$(-x)^2 = -x^2$`,
          String.raw`$\left(x^3\right)^2 = x^3 x^2$`,
          String.raw`$\dfrac{x^2 + y^2}{y^2} = \dfrac{x^2}{y^2} + 1$`,
          String.raw`$\sqrt{x^2} = x$`,
        ],
        answer: [0, 2, 5],
        explanation: [
          String.raw`$\left(x^2y\right)^3 = x^6y^3$: true (Rules 5 and 7).`,
          String.raw`$(x + y)^2 = x^2 + y^2$: false; it is missing $2xy$ (try $x = y = 1$: $4 \ne 2$).`,
          String.raw`$\frac{x^{-2}}{x^{-5}} = x^{-2 - (-5)} = x^3$: true (Rule 3).`,
          String.raw`$(-x)^2 = -x^2$: false; $(-x)^2 = x^2 > 0$ while $-x^2 < 0$.`,
          String.raw`$\left(x^3\right)^2 = x^6$ but $x^3x^2 = x^5$: false (try $x = 2$).`,
          String.raw`$\frac{x^2 + y^2}{y^2} = \frac{x^2}{y^2} + \frac{y^2}{y^2}$: true; a sum in the numerator may be split (MR p. 43).`,
          String.raw`$\sqrt{x^2} = x$: false for negative $x$; $\sqrt{(-2)^2} = 2$. In general $\sqrt{x^2} = |x|$.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`For which of the following values of $k$ is $x = 3$ the **only** integer solution of the equation $k^{x} = k^{2x - 3}$ ? Indicate all such values.`,
        choices: [String.raw`$-1$`, String.raw`$0$`, String.raw`$\frac{1}{2}$`, String.raw`$1$`, String.raw`$10$`],
        answer: [2, 4],
        explanation: [
          String.raw`$x = 3$ always works, since both sides are then $k^3$. The question is whether other integers work too.`,
          String.raw`$k = \frac{1}{2}$ and $k = 10$: positive and not 1, so equal powers force equal exponents: $x = 2x - 3$, so $x = 3$ only. Both qualify.`,
          String.raw`$k = 1$: $1^x = 1^{2x-3} = 1$ for every integer $x$. Not unique.`,
          String.raw`$k = -1$: $2x - 3$ is always odd, so the right side is always $-1$; the left side is $-1$ for every odd $x$ ($x = 1, 3, 5, \ldots$). Not unique.`,
          String.raw`$k = 0$: for $x = 2$, both sides are $0^2 = 0^1 = 0$, so $x = 2$ is another solution. Not unique.`,
          String.raw`This is why the Math Review's property requires a positive base other than 1 (MR p. 40).`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`If $9^{n} + 9^{n} + 9^{n} = 3^{25}$, what is the value of $n$?`,
        answer: { kind: "decimal", value: "12" },
        explanation: [
          String.raw`Three equal terms: $9^n + 9^n + 9^n = 3 \cdot 9^n$.`,
          String.raw`In base 3: $3 \cdot 9^n = 3^1 \cdot 3^{2n} = 3^{2n + 1}$.`,
          String.raw`So $2n + 1 = 25$ and $n = 12$.`,
          String.raw`Trap: writing $9^n + 9^n + 9^n = 27^n$ (adding the bases) gives $3^{3n} = 3^{25}$, which has no integer solution.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`What is the value of $\dfrac{3^{10} + 3^{9}}{3^{11} - 3^{9}}$ ? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 1, denominator: 2 },
        explanation: [
          String.raw`Factor $3^9$, the smallest power, out of both the numerator and the denominator.`,
          String.raw`Numerator: $3^9(3 + 1) = 4 \cdot 3^9$. Denominator: $3^9(3^2 - 1) = 8 \cdot 3^9$.`,
          String.raw`The quotient is $\frac{4}{8} = \frac{1}{2}$.`,
          String.raw`Trap: "cancelling" exponents term by term, as in $\frac{3^{10}}{3^{11}} + \frac{3^{9}}{-3^{9}}$, splits a sum in the denominator, which case 6 on MR p. 43 forbids.`,
        ],
      },
    ],
  },
};

export default section;
