import type { Section } from "../types";

const section: Section = {
  id: "2-6-functions",
  number: "2.6",
  title: "Functions",
  part: "algebra",
  mrPages: "53–54",
  summary: String.raw`Function notation, the value of a function, the domain (stated or assumed), the absolute value function, and the two pieces of notation the GRE layers on top: composition $g(f(x))$ and special operations defined inside a question.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "A function is a rule with one output per input" },
    {
      kind: "p",
      text: String.raw`An algebraic expression in one variable can be used to define a [[function]] of that variable. Functions are usually named with letters such as $f$, $g$ and $h$. The expression $4x - 7$, for instance, defines a function $p$ by $p(x) = 4x - 7$. The symbol $p(x)$ is read "$p$ of $x$" and is called the [[value|value]] of $p$ at $x$: you get it by substituting a number for $x$ in the expression. So $p(3) = 4(3) - 7 = 5$ (MR p. 53).`,
    },
    { kind: "math", tex: String.raw`p(x) = 4x - 7 \quad\Longrightarrow\quad p(3) = 4(3) - 7 = 5`, key: false },
    {
      kind: "p",
      text: String.raw`The Math Review suggests picturing a function as a machine: you feed it an [[input]], a value of $x$, and it produces the corresponding [[output]], $f(x)$. The one rule every function obeys is that **each input gives exactly one output**. The reverse is not required: several inputs may share an output. With $g(x) = x^2 - 6x + 1$ we get $g(1) = -4$ and $g(5) = -4$; two inputs, one output, and $g$ is still a perfectly good function (MR p. 53).`,
    },
    {
      kind: "diagram",
      diagram: { key: "2-6-functions/mapping", props: { variant: "both" }, caption: String.raw`Left: a function (two inputs may share an output). Right: not a function, because the input 2 is sent to two different outputs.` },
    },
    {
      kind: "interactive",
      key: "2-6-functions/function-machine",
      title: "Function machine",
      caption: String.raw`Pick a rule and an input. The machine shows the substitution step by step and refuses inputs outside the domain. Turn on the second machine to see a composition $g(f(x))$: the output of $f$ becomes the input of $g$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE uses it",
      text: String.raw`Most function questions are substitution questions in disguise: "if $f(x) = \dots$, what is $f(-2)$?" or "for which value of $k$ is $f(k) = 10$?" The second kind is an equation in $k$. And because two inputs can share an output, an equation like $f(k) = 10$ may have more than one solution; QC and "indicate all" questions are built on exactly that.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Substituting numbers and expressions" },
    {
      kind: "p",
      text: String.raw`Substitution is mechanical, but it is where points are lost. Replace _every_ $x$ with the input, wrapped in parentheses, and then follow the order of operations. With $f(x) = x^2 - 3x$, the value at $-4$ is $(-4)^2 - 3(-4) = 16 + 12 = 28$. Without the parentheses you might write $-4^2$, which the GRE reads as $-(4^2) = -16$, since exponentiation comes before negation (MC p. 6).`,
    },
    {
      kind: "p",
      text: String.raw`The input does not have to be a number. The GRE regularly asks for things like $f(a + 2)$ or $f(2x)$: substitute the whole expression for $x$ and simplify.`,
    },
    { kind: "math", tex: String.raw`f(a + 2) = (a + 2)^2 - 3(a + 2) = a^2 + 4a + 4 - 3a - 6 = a^2 + a - 2` },
    {
      kind: "aside",
      tone: "watch",
      title: "Function notation is not multiplication",
      text: String.raw`$f(a + 2)$ is not $f \cdot a + f \cdot 2$, and in general $f(a + 2) \ne f(a) + f(2)$. In the example, $f(a) + f(2) = a^2 - 3a - 2$, which differs from $a^2 + a - 2$ for every $a \ne 0$. Likewise $f(2x)$ is usually not $2f(x)$. Always substitute; never distribute $f$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The domain: which inputs are allowed" },
    {
      kind: "p",
      text: String.raw`The [[domain]] of a function is the set of all permissible inputs, that is, all permissible values of $x$. Sometimes a question states it outright, as in "$k(x) = 9 - x^2$ for $0 \le x \le 3$"; then inputs outside that interval are simply not allowed, even though the formula could be evaluated there. When nothing is stated, the domain is **assumed to be the set of all real numbers $x$ for which $f(x)$ is a real number** (MR p. 53; MC p. 7). Polynomials such as $p$, $g$ and $f$ above have all real numbers as their domain.`,
    },
    {
      kind: "p",
      text: String.raw`Because every number on the GRE is real, the assumed domain comes down to avoiding the expressions that are [[undefined]] (MC p. 7). On the test that means two things: **no division by 0**, and **no square root of a negative number**. (The Conventions also list $0^0$ as undefined, but it almost never matters in a domain question.)`,
    },
    {
      kind: "list",
      items: [
        String.raw`$q(x) = \dfrac{x + 5}{x^2 - 16}$: the denominator is 0 at $x = 4$ and $x = -4$, so the domain is all real numbers except $4$ and $-4$.`,
        String.raw`$r(x) = \sqrt{7 - x}$: we need $7 - x \ge 0$, so the domain is all $x \le 7$. Note that $r(7) = 0$ is allowed; the square root of 0 is fine.`,
        String.raw`$s(x) = \dfrac{\sqrt{x + 1}}{x - 3}$: both rules apply, so the domain is all $x \ge -1$ except $x = 3$.`,
      ],
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-6-functions/domain-line",
        props: { min: -3, max: 6, from: -1, fromClosed: true, holes: [3], ticks: [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6] },
        caption: String.raw`The domain of $s(x) = \frac{\sqrt{x + 1}}{x - 3}$: every $x \ge -1$ except $3$.`,
      },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Do not simplify the restriction away",
      text: String.raw`$\dfrac{x^2 - 9}{x - 3}$ equals $x + 3$ for every $x \ne 3$, but the function defined by the fraction is still undefined at $x = 3$. Find the domain from the formula _as given_, before cancelling anything. Also watch the difference between $x - 2 \ge 0$ under a square root (endpoint allowed) and $x - 2 > 0$ when the square root sits in a denominator (endpoint excluded, since $\frac{1}{\sqrt{0}}$ is division by 0).`,
    },
    {
      kind: "p",
      text: String.raw`The set of outputs a function actually produces is called its [[range]] in most textbooks. The Math Review does not use the word, but the GRE does ask about outputs in plain language: "which of the following could be a value of $f(x)$?" For $r(x) = \sqrt{7 - x}$ every output is $\ge 0$; for $p(x) = 4x - 7$ every real number is an output.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The absolute value function" },
    {
      kind: "p",
      text: String.raw`The [[absolute-value-function|absolute value function]] $h(x) = |x|$ gives the distance between $x$ and 0 on the number line. Its domain is all real numbers, and since $x$ and $-x$ are the same distance from 0, $h(-x) = h(x)$ for every real $x$ (MR p. 54). So $h(-6) = h(6) = 6$, and the equation $|x| = 6$ has two solutions, $6$ and $-6$: another case of two inputs sharing one output.`,
    },
    { kind: "math", tex: String.raw`h(x) = |x|, \qquad h(-x) = h(x) \ \text{for all real } x`, key: true },
    {
      kind: "aside",
      tone: "tip",
      text: String.raw`When a function contains $|x|$, split into the cases $x \ge 0$ (where $|x| = x$) and $x < 0$ (where $|x| = -x$). Section 2.9 turns this into a piecewise formula and a V-shaped graph.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Composition: one function inside another" },
    {
      kind: "p",
      text: String.raw`The Math Conventions add one piece of notation the Math Review does not cover: if $f$ and $g$ are functions, the [[composition]] of $g$ with $f$ is written $g(f(x))$ (MC p. 7). It means "apply $f$ first, then apply $g$ to the result." Work from the inside out.`,
    },
    {
      kind: "p",
      text: String.raw`Take $f(x) = 2x - 1$ and $g(x) = x^2 + 1$. Then $g(f(3)) = g(5) = 26$, while $f(g(3)) = f(10) = 19$. The order matters: in general $g(f(x))$ and $f(g(x))$ are different functions. To get a formula, substitute the whole inner expression into the outer function.`,
    },
    { kind: "math", tex: String.raw`g(f(x)) = (2x - 1)^2 + 1 = 4x^2 - 4x + 2, \qquad f(g(x)) = 2(x^2 + 1) - 1 = 2x^2 + 1`, key: false },
    {
      kind: "diagram",
      diagram: { key: "2-6-functions/machine", props: { variant: "composition" }, caption: String.raw`$g(f(x))$: the output of $f$ is the input of $g$. With $x = 3$: $f(3) = 5$, then $g(5) = 26$.` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Inside first, and check the inner output",
      text: String.raw`$g(f(x))$ is _not_ $g(x) \cdot f(x)$. And a composition can fail even when $x$ is in the domain of $f$: the value $f(x)$ must also be in the domain of $g$. For example, if $f(x) = x - 4$ and $g(x) = \sqrt{x}$, then $f(1) = -3$ is fine, but $g(f(1)) = \sqrt{-3}$ is not a real number.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Special operations defined in a question" },
    {
      kind: "p",
      text: String.raw`The GRE sometimes invents a symbol and defines it on the spot (MC p. 7): "The operation $\star$ is defined for all numbers $a$ and $b$ by $a \star b = ab - b^2$." Such a [[defined-operation|defined operation]] is just a function of two inputs with an unusual name. Nothing about it is "standard"; the definition in the question is all there is, so apply it literally: the first number goes where $a$ is, the second where $b$ is.`,
    },
    { kind: "math", tex: String.raw`3 \star 2 = (3)(2) - 2^2 = 2, \qquad 2 \star 3 = (2)(3) - 3^2 = -3` },
    {
      kind: "p",
      text: String.raw`As the example shows, a defined operation need not be commutative, so never swap the inputs. Nested expressions are evaluated from the innermost parentheses out, exactly like composition: $(3 \star 2) \star 1 = 2 \star 1 = 2 - 1 = 1$. One-input symbols work the same way; for instance "for every nonzero $x$, let $x^{\#} = x - \frac{1}{x}$" defines a function of $x$, so $2^{\#} = \frac{3}{2}$. Watch the stated domain of the operation ("for all integers", "for all nonzero $x$"): it tells you which inputs are legal.`,
    },
    {
      kind: "interactive",
      key: "2-6-functions/operator-evaluator",
      title: "Defined-operation evaluator",
      caption: String.raw`Choose an operation and the two inputs. The evaluator shows the substitution for $a \circ b$ and for $b \circ a$ side by side, so you can see when order matters and when an input is not allowed.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Equations with a defined operation",
      text: String.raw`If a question says "$4 \star k = k \star 4$" or "$x^{\#} = 3$", write out both sides using the definition. You get an ordinary equation in one variable, often a quadratic, which may have two solutions. Then use any condition in the question (such as "$k \ne 4$" or "$x > 0$") to pick the right one.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Nearly every function question on the GRE reduces to careful substitution plus one of three follow-ups: solve an equation that came out of the substitution, decide which inputs are allowed (the domain), or decide which outputs are possible. Composition and defined operations add only bookkeeping: work from the inside out and never change the order of the inputs.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Dropping the parentheses when you substitute a negative number ($-3^2 = -9$, not 9). Treating $f(a + b)$ as $f(a) + f(b)$. Cancelling a factor before finding the domain, or forgetting that a square root in a denominator needs a strictly positive radicand. Computing $f(g(x))$ when the question asked for $g(f(x))$. Assuming a defined operation is commutative. And forgetting the second solution of $f(k) = c$ when two inputs can share an output.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "function",
      term: "function",
      turkish: "fonksiyon",
      definition: String.raw`A rule, often given by an algebraic expression in one variable, that assigns to each permissible input $x$ exactly one output $f(x)$. Different inputs may give the same output.`,
      diagram: { key: "2-6-functions/mapping", props: { variant: "function" } },
      source: "MR p. 53",
    },
    {
      id: "value",
      term: "value of f at x",
      turkish: "f'nin x'teki değeri / x'in görüntüsü",
      definition: String.raw`The number $f(x)$, obtained by substituting the value of $x$ in the expression that defines $f$. For $f(x) = 4x - 7$, the value of $f$ at 3 is $f(3) = 5$.`,
      formula: String.raw`f(x)`,
      source: "MR p. 53",
    },
    {
      id: "input",
      term: "input",
      turkish: "girdi",
      definition: String.raw`A value of the variable $x$ that is fed into a function.`,
      diagram: { key: "2-6-functions/machine", props: { variant: "single" } },
      source: "MR p. 53",
    },
    {
      id: "output",
      term: "output",
      turkish: "çıktı",
      definition: String.raw`The value $f(x)$ that a function produces from the input $x$. Each input has exactly one output.`,
      diagram: { key: "2-6-functions/machine", props: { variant: "single" } },
      source: "MR p. 53",
    },
    {
      id: "domain",
      term: "domain",
      turkish: "tanım kümesi",
      definition: String.raw`The set of all permissible inputs of a function. If it is not given explicitly, it is assumed to be the set of all real numbers $x$ for which $f(x)$ is a real number.`,
      diagram: {
        key: "2-6-functions/domain-line",
        props: { min: -3, max: 6, from: -1, fromClosed: true, holes: [3], ticks: [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6] },
      },
      source: "MR p. 53; MC p. 7",
    },
    {
      id: "range",
      term: "range",
      turkish: "görüntü kümesi",
      definition: String.raw`The set of all outputs $f(x)$ as $x$ runs through the domain. For $f(x) = \sqrt{7 - x}$ the range is all $y \ge 0$.`,
      note: "Not named in the ETS Math Review",
    },
    {
      id: "undefined",
      term: "undefined (not defined)",
      turkish: "tanımsız",
      definition: String.raw`Describes an expression that has no real value, such as $\frac{x}{0}$, $\sqrt{x}$ for $x < 0$, or $0^0$. Inputs that make a function's expression undefined are not in its assumed domain.`,
      source: "MC p. 7; MR p. 53",
    },
    {
      id: "absolute-value-function",
      term: "absolute value function",
      turkish: "mutlak değer fonksiyonu",
      definition: String.raw`The function $h(x) = |x|$, the distance between $x$ and 0 on the number line. Its domain is all real numbers, and $h(-x) = h(x)$ for all $x$.`,
      formula: String.raw`h(x) = |x|`,
      source: "MR p. 54",
    },
    {
      id: "composition",
      term: "composition",
      turkish: "bileşke fonksiyon (fonksiyonların bileşkesi)",
      definition: String.raw`For functions $f$ and $g$, the composition of $g$ with $f$ is $g(f(x))$: apply $f$ to $x$, then apply $g$ to the result.`,
      formula: String.raw`g(f(x))`,
      diagram: { key: "2-6-functions/machine", props: { variant: "composition" } },
      source: "MC p. 7",
    },
    {
      id: "defined-operation",
      term: "special symbol / defined operation",
      turkish: "tanımlanmış işlem (soruda tanımlanan özel işlem)",
      definition: String.raw`A nonstandard symbol, such as $\star$ or $\#$, introduced and defined inside a test question, e.g. "$a \star b = ab - b^2$ for all numbers $a$ and $b$." Apply the definition literally.`,
      source: "MC pp. 2, 7",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`The functions $f$ and $g$ are defined by $f(x) = x^2 - 2$ and $g(x) = 3x + 1$. If $f(g(t)) = 47$, what is the sum of all possible values of $t$?`,
      choices: [String.raw`$-\frac{8}{3}$`, String.raw`$-\frac{2}{3}$`, String.raw`$0$`, String.raw`$\frac{2}{3}$`, String.raw`$2$`],
      answer: 1,
      explanation: [
        String.raw`Work from the inside out: $g(t) = 3t + 1$, so $f(g(t)) = (3t + 1)^2 - 2$.`,
        String.raw`Set it equal to 47: $(3t + 1)^2 = 49$, so $3t + 1 = 7$ or $3t + 1 = -7$.`,
        String.raw`That gives $t = 2$ or $t = -\frac{8}{3}$, and the sum is $2 - \frac{8}{3} = -\frac{2}{3}$.`,
        String.raw`Traps: $2$ forgets the negative square root. $0$ comes from composing in the wrong order: $g(f(t)) = 3(t^2 - 2) + 1 = 47$ gives $t^2 = \frac{52}{3}$, whose two solutions add to 0.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`The function $h$ is defined by $h(x) = \dfrac{\sqrt{x + 3}}{x^2 - 4x}$.`,
      quantityA: String.raw`The number of integers $n$ with $-5 \le n \le 6$ that are in the domain of $h$`,
      quantityB: String.raw`$8$`,
      answer: "C",
      explanation: [
        String.raw`No domain is stated, so the domain is every $x$ for which $h(x)$ is a real number.`,
        String.raw`The square root needs $x + 3 \ge 0$, that is, $x \ge -3$. The denominator $x^2 - 4x = x(x - 4)$ must not be 0, so $x \ne 0$ and $x \ne 4$.`,
        String.raw`Integers from $-5$ to $6$ that pass both tests: $-3, -2, -1, 1, 2, 3, 5, 6$. That is 8 integers ($-5$ and $-4$ fail the square root; $0$ and $4$ fail the denominator).`,
        String.raw`The quantities are equal. Trap: forgetting $x = 0$ as a zero of the denominator gives 9, and forgetting that $x = -3$ is allowed ($\sqrt{0} = 0$) gives 7.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`The operation $\odot$ is defined for all numbers $x$ and $y$ by $x \odot y = x^2 - xy + y$. If $4 \odot k = k \odot 4$ and $k \ne 4$, what is the value of $k$?`,
      answer: { kind: "decimal", value: "-3" },
      explanation: [
        String.raw`Apply the definition literally, keeping the order: $4 \odot k = 16 - 4k + k = 16 - 3k$ and $k \odot 4 = k^2 - 4k + 4$.`,
        String.raw`Set them equal: $16 - 3k = k^2 - 4k + 4$, so $k^2 - k - 12 = 0$, which factors as $(k - 4)(k + 3) = 0$.`,
        String.raw`$k = 4$ is excluded (with equal inputs the two sides are trivially equal), so $k = -3$.`,
        String.raw`Check: $4 \odot (-3) = 16 + 12 - 3 = 25$ and $(-3) \odot 4 = 9 + 12 + 4 = 25$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`The function $f$ is defined for all real numbers $x$ by $f(x) = x^2 - 4x$. Which of the following statements are true? Indicate all such statements.`,
      choices: [
        String.raw`$f(1) = f(3)$`,
        String.raw`$f(-x) = f(x)$ for all $x$`,
        String.raw`$f(2 + t) = f(2 - t)$ for all $t$`,
        String.raw`If $f(a) = f(b)$, then $a = b$.`,
        String.raw`$f(x + 1) = x^2 - 2x - 3$ for all $x$`,
      ],
      answer: [0, 2, 4],
      explanation: [
        String.raw`First: $f(1) = 1 - 4 = -3$ and $f(3) = 9 - 12 = -3$. True.`,
        String.raw`Second: $f(-x) = x^2 + 4x$, which differs from $x^2 - 4x$ whenever $x \ne 0$ (e.g. $f(-1) = 5$ but $f(1) = -3$). False.`,
        String.raw`Third: $f(2 + t) = (2 + t)^2 - 4(2 + t) = t^2 - 4$, and $f(2 - t) = (2 - t)^2 - 4(2 - t) = t^2 - 4$. True.`,
        String.raw`Fourth: the first statement is a counterexample ($f(1) = f(3)$ but $1 \ne 3$). A function needs one output per input, not one input per output. False.`,
        String.raw`Fifth: $f(x + 1) = (x + 1)^2 - 4(x + 1) = x^2 + 2x + 1 - 4x - 4 = x^2 - 2x - 3$. True.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`If $p(x) = 5 - 2x$, what is $p(-3)$?`,
      answer: String.raw`$11$`,
      explanation: String.raw`$5 - 2(-3) = 5 + 6 = 11$.`,
    },
    {
      id: "q2",
      prompt: String.raw`What is the domain of $f(x) = \dfrac{1}{x^2 - 25}$?`,
      answer: String.raw`All real numbers except $5$ and $-5$`,
      explanation: String.raw`The denominator $x^2 - 25$ is 0 exactly when $x = \pm 5$.`,
    },
    {
      id: "q3",
      prompt: String.raw`What is the domain of $g(x) = \sqrt{2x - 8}$? What changes if the function is $\dfrac{1}{\sqrt{2x - 8}}$?`,
      answer: String.raw`$x \ge 4$; for the reciprocal, $x > 4$`,
      explanation: String.raw`$2x - 8 \ge 0$ gives $x \ge 4$. In the denominator the root must also be nonzero, so $x = 4$ is excluded.`,
    },
    {
      id: "q4",
      prompt: String.raw`If $f(x) = x + 3$ and $g(x) = x^2$, what are $g(f(-5))$ and $f(g(-5))$?`,
      answer: String.raw`$4$ and $28$`,
      explanation: String.raw`$f(-5) = -2$, so $g(f(-5)) = 4$. $g(-5) = 25$, so $f(g(-5)) = 28$.`,
    },
    {
      id: "q5",
      prompt: String.raw`For all numbers $a$ and $b$, let $a \otimes b = 2a - b^2$. What is $3 \otimes 4$? What is $4 \otimes 3$?`,
      answer: String.raw`$-10$ and $-1$`,
      explanation: String.raw`$2(3) - 4^2 = 6 - 16 = -10$; $2(4) - 3^2 = 8 - 9 = -1$. The order of the inputs matters.`,
    },
    {
      id: "q6",
      prompt: String.raw`If $h(x) = |x|$, how many real numbers $x$ satisfy $h(x) = 7$? How many satisfy $h(x) = -7$?`,
      answer: String.raw`Two ($7$ and $-7$); none`,
      explanation: String.raw`$|x|$ is a distance, so it is never negative, and each positive value is taken at two inputs.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`The function $f$ is defined by $f(x) = \sqrt{20 - 4x}$.`,
        quantityA: String.raw`The greatest integer in the domain of $f$`,
        quantityB: String.raw`$f(1)$`,
        answer: "A",
        explanation: [
          String.raw`The domain is all $x$ with $20 - 4x \ge 0$, that is, $x \le 5$. The greatest integer in it is $5$ (and $f(5) = \sqrt{0} = 0$ is a real number, so 5 is allowed).`,
          String.raw`$f(1) = \sqrt{20 - 4} = \sqrt{16} = 4$.`,
          String.raw`$5 > 4$, so Quantity A is greater. Trap: excluding the endpoint gives 4 and the wrong answer (C).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`The function $g$ is defined for all $x \ne 1$ by $g(x) = \dfrac{x + 1}{x - 1}$, and $t > 1$.`,
        quantityA: String.raw`$g(g(t))$`,
        quantityB: String.raw`$t$`,
        answer: "C",
        explanation: [
          String.raw`First check that $g(g(t))$ makes sense: for $t > 1$, $g(t) = \frac{t + 1}{t - 1}$ is greater than 1 (the numerator exceeds the positive denominator), so $g(t) \ne 1$ is in the domain of $g$.`,
          String.raw`Substitute $u = g(t)$: $g(u) = \frac{u + 1}{u - 1}$. Here $u + 1 = \frac{t + 1 + t - 1}{t - 1} = \frac{2t}{t - 1}$ and $u - 1 = \frac{t + 1 - (t - 1)}{t - 1} = \frac{2}{t - 1}$.`,
          String.raw`So $g(g(t)) = \frac{2t}{t - 1} \div \frac{2}{t - 1} = t$. The quantities are equal for every $t > 1$.`,
          String.raw`Spot check with $t = 5$: $g(5) = \frac{6}{4} = \frac{3}{2}$, and $g\!\left(\frac{3}{2}\right) = \frac{5/2}{1/2} = 5$.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`The function $f$ is defined by $f(x) = x^2 - 6x$, and $a$ and $b$ are numbers such that $f(a) = f(b)$.`,
        quantityA: String.raw`$a + b$`,
        quantityB: String.raw`$6$`,
        answer: "D",
        explanation: [
          String.raw`$f(a) = f(b)$ means $a^2 - 6a = b^2 - 6b$, so $a^2 - b^2 - 6(a - b) = 0$, which factors as $(a - b)(a + b - 6) = 0$.`,
          String.raw`So either $a + b = 6$ or $a = b$. Nothing in the question says $a$ and $b$ are different.`,
          String.raw`With $a = 1$, $b = 5$: $f(1) = f(5) = -5$ and $a + b = 6$, equal to Quantity B. With $a = b = 10$: $f(a) = f(b)$ trivially and $a + b = 20 > 6$.`,
          String.raw`The relationship cannot be determined: (D). Trap: answering (C) assumes $a \ne b$, which the question does not state.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "easy",
        stem: String.raw`If $f(x) = 2x^2 - x$ for all $x$, which of the following is equal to $f(x - 1)$?`,
        choices: [
          String.raw`$2x^2 - x - 1$`,
          String.raw`$2x^2 - 3x + 1$`,
          String.raw`$2x^2 - 4x + 3$`,
          String.raw`$2x^2 - 5x + 1$`,
          String.raw`$2x^2 - 5x + 3$`,
        ],
        answer: 4,
        explanation: [
          String.raw`Substitute $x - 1$ for every $x$: $f(x - 1) = 2(x - 1)^2 - (x - 1)$.`,
          String.raw`$2(x^2 - 2x + 1) - x + 1 = 2x^2 - 4x + 2 - x + 1 = 2x^2 - 5x + 3$.`,
          String.raw`Traps: $2x^2 - x - 1$ is $f(x) - 1$, not $f(x - 1)$; $2x^2 - 5x + 1$ forgets that $-(x - 1) = -x + 1$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`The functions $f$ and $g$ are defined by $f(x) = 2x + 3$ and $g(x) = x^2 - 1$. What is the product of all real numbers $x$ for which $f(g(x)) = g(f(x))$?`,
        choices: [String.raw`$-7$`, String.raw`$-\frac{7}{2}$`, String.raw`$0$`, String.raw`$\frac{7}{2}$`, String.raw`$7$`],
        answer: 3,
        explanation: [
          String.raw`$f(g(x)) = 2(x^2 - 1) + 3 = 2x^2 + 1$.`,
          String.raw`$g(f(x)) = (2x + 3)^2 - 1 = 4x^2 + 12x + 8$.`,
          String.raw`Setting them equal: $2x^2 + 12x + 7 = 0$. Its discriminant is $144 - 56 = 88 > 0$, so there are two real solutions.`,
          String.raw`For $ax^2 + bx + c = 0$ the product of the roots is $\frac{c}{a} = \frac{7}{2}$. (Or multiply the roots $\frac{-12 \pm \sqrt{88}}{4}$ directly: $\frac{144 - 88}{16} = \frac{7}{2}$.)`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`What is the domain of the function $f$ defined by $f(x) = \dfrac{1}{\sqrt{x^2 - 2x - 8}}$?`,
        choices: [
          String.raw`All real numbers $x$ with $-2 < x < 4$`,
          String.raw`All real numbers $x$ with $x < -2$ or $x > 4$`,
          String.raw`All real numbers $x$ with $x \le -2$ or $x \ge 4$`,
          String.raw`All real numbers except $-2$ and $4$`,
          String.raw`All real numbers`,
        ],
        answer: 1,
        explanation: [
          String.raw`The square root needs $x^2 - 2x - 8 \ge 0$, and because it is in a denominator it also must not be 0. So we need $x^2 - 2x - 8 > 0$.`,
          String.raw`$x^2 - 2x - 8 = (x - 4)(x + 2)$, which is positive when both factors have the same sign: $x > 4$ or $x < -2$.`,
          String.raw`Traps: the third choice allows $x = -2$ and $x = 4$, where the denominator is $\sqrt{0} = 0$. The first choice is exactly where the radicand is negative.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`No domain is stated for any of the functions below. For which of them is the domain the set of all real numbers? Indicate all such functions.`,
        choices: [
          String.raw`$f(x) = \sqrt{x^2 + 1}$`,
          String.raw`$f(x) = \dfrac{1}{x^2 - 2x + 1}$`,
          String.raw`$f(x) = \sqrt{|x| - x}$`,
          String.raw`$f(x) = \dfrac{x}{x^2 + 4}$`,
          String.raw`$f(x) = \dfrac{x^2 - 4}{x + 2}$`,
          String.raw`$f(x) = \sqrt{x - |x|}$`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`$\sqrt{x^2 + 1}$: $x^2 + 1 \ge 1 > 0$ always. All real numbers.`,
          String.raw`$\frac{1}{x^2 - 2x + 1} = \frac{1}{(x - 1)^2}$: undefined at $x = 1$. No.`,
          String.raw`$\sqrt{|x| - x}$: if $x \ge 0$, $|x| - x = 0$; if $x < 0$, $|x| - x = -2x > 0$. Never negative, so all real numbers.`,
          String.raw`$\frac{x}{x^2 + 4}$: the denominator is at least 4. All real numbers.`,
          String.raw`$\frac{x^2 - 4}{x + 2}$: undefined at $x = -2$, even though it simplifies to $x - 2$ elsewhere. No.`,
          String.raw`$\sqrt{x - |x|}$: for $x < 0$, $x - |x| = 2x < 0$, so negative inputs are excluded (the domain is $x \ge 0$). No.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`The operation $\oplus$ is defined for all numbers $a$ and $b$ by $a \oplus b = a + b - ab$. Which of the following statements are true for all numbers $a$, $b$ and $c$? Indicate all such statements.`,
        choices: [
          String.raw`$a \oplus b = b \oplus a$`,
          String.raw`$a \oplus 0 = a$`,
          String.raw`$a \oplus 1 = a$`,
          String.raw`$(a \oplus b) \oplus c = a \oplus (b \oplus c)$`,
          String.raw`$a \oplus a \ge 0$`,
        ],
        answer: [0, 1, 3],
        explanation: [
          String.raw`The key observation: $1 - (a \oplus b) = 1 - a - b + ab = (1 - a)(1 - b)$.`,
          String.raw`First: $a + b - ab$ is symmetric in $a$ and $b$. True.`,
          String.raw`Second: $a \oplus 0 = a + 0 - 0 = a$. True. Third: $a \oplus 1 = a + 1 - a = 1$, not $a$ (unless $a = 1$). False.`,
          String.raw`Fourth: by the observation, $1 - \big((a \oplus b) \oplus c\big) = (1 - a)(1 - b)(1 - c) = 1 - \big(a \oplus (b \oplus c)\big)$. True.`,
          String.raw`Fifth: $a \oplus a = 2a - a^2$; with $a = 3$ this is $6 - 9 = -3 < 0$. False.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`The function $f$ is defined by $f(x) = x^2 + kx$, where $k$ is a constant. If $f(3) = f(-5)$, what is the value of $f(1)$?`,
        answer: { kind: "decimal", value: "3" },
        explanation: [
          String.raw`$f(3) = 9 + 3k$ and $f(-5) = 25 - 5k$.`,
          String.raw`Setting them equal: $9 + 3k = 25 - 5k$, so $8k = 16$ and $k = 2$.`,
          String.raw`Then $f(x) = x^2 + 2x$ and $f(1) = 1 + 2 = 3$. Trap: stopping at $k = 2$ answers a different question.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`The functions $f$ and $g$ are defined by $f(x) = ax + 3$ and $g(x) = 2x - 5$, where $a$ is a constant. If $f(g(x)) = g(f(x))$ for all real numbers $x$, what is the value of $a$? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 2, denominator: 5 },
        explanation: [
          String.raw`$f(g(x)) = a(2x - 5) + 3 = 2ax - 5a + 3$.`,
          String.raw`$g(f(x)) = 2(ax + 3) - 5 = 2ax + 1$.`,
          String.raw`The $x$-terms already match, so the constant terms must match too: $-5a + 3 = 1$, giving $a = \frac{2}{5}$.`,
          String.raw`Check with $x = 0$: $f(g(0)) = f(-5) = -2 + 3 = 1$ and $g(f(0)) = g(3) = 1$.`,
        ],
      },
    ],
  },
};

export default section;
