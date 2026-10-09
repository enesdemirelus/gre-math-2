import type { Section } from "../types";

const section: Section = {
  id: "2-1-algebraic-expressions",
  number: "2.1",
  title: "Algebraic Expressions",
  part: "algebra",
  mrPages: "36–40",
  summary: String.raw`The vocabulary of algebra (terms, coefficients, degree), the routine moves (combine, factor, multiply out, cancel), and seven key identities that let you rewrite an expression into the form a GRE question is secretly asking about.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Variables, terms and expressions" },
    {
      kind: "p",
      text: String.raw`A [[variable]] is a letter that stands for a quantity whose value is unknown; $x$ and $y$ are the usual choices, but any symbol will do. An [[algebraic-expression|algebraic expression]] contains one or more variables and can be written as a single [[term]] or as a sum of terms (MR p. 36). Subtraction counts as adding a negative, so $3x^2 - 5x + 2$ is the sum of the three terms $3x^2$, $-5x$ and $2$.`,
    },
    {
      kind: "p",
      text: String.raw`Counting terms means counting the pieces joined by $+$ and $-$ at the top level, not inside a fraction or parentheses. So $\frac{6}{a+b}$ is a single term, and so is $4(x - 1)$ until you multiply it out. In $3x^2 - 5x + 2$, the number in front of a variable part is its [[coefficient]] ($3$ and $-5$), and the term with no variable, $2$, is the [[constant-term|constant term]]. Two terms are [[like-terms|like terms]] when they have the same variables raised to the same exponents: $4ab^2$ and $-ab^2$ are like terms, but $4ab^2$ and $4a^2b$ are not.`,
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`The sign belongs to the term. In $7 - 2y$, the coefficient of $y$ is $-2$, not $2$. A term written as just $y$ or $-y$ has coefficient $1$ or $-1$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Polynomials and degree" },
    {
      kind: "p",
      text: String.raw`A [[polynomial]] is a sum of finitely many terms, each of which is a constant or a coefficient times one or more variables raised to _positive integer_ exponents (MR p. 37). So $5x^3 - x + 8$ and $2x^2y - 7$ are polynomials, while $\frac{3}{x}$ and $\sqrt{x}$ are not: written as powers they would need the exponents $-1$ and $\frac{1}{2}$.`,
    },
    {
      kind: "p",
      text: String.raw`The [[degree-term|degree of a term]] is the _sum_ of the exponents of its variables; a variable written without an exponent has exponent 1, and a constant term has degree 0. The [[degree-polynomial|degree of a polynomial]] is the greatest degree among its terms. Polynomials of degree 2 and 3 are called [[quadratic-polynomial|quadratic]] and [[cubic-polynomial|cubic]] (MR p. 37).`,
    },
    {
      kind: "math",
      tex: String.raw`6x^2y^3 - 4x^4 + 9 \quad\text{has term degrees } 5,\ 4,\ 0 \text{, so its degree is } 5`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Add the exponents within a term",
      text: String.raw`In a term with several variables, the degree is the sum of all the exponents: $6x^2y^3$ has degree $2 + 3 = 5$, not 3. When the GRE asks for the degree of a product such as $(x^3y + 2)(xy^2 - 5)$, you only need the highest-degree term of each factor: $x^3y \cdot xy^2 = x^4y^3$ has degree 7.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Combining like terms and factoring out" },
    {
      kind: "p",
      text: String.raw`The same rules that govern operations with numbers govern operations with expressions (MR p. 38). Two moves come up in nearly every algebra question. First, you can **combine like terms** by adding their coefficients: $4ab^2 - ab^2 + 3a = 3ab^2 + 3a$. Unlike terms stay separate; $3ab^2 + 3a$ cannot be squeezed into one term.`,
    },
    {
      kind: "p",
      text: String.raw`Second, a number or variable that is a factor of every term can be [[factoring|factored out]]: $10x + 15 = 5(x + 3)$, and $6a^2b - 9ab^2 = 3ab(2a - 3b)$. This is the distributive identity $ca + cb = c(a + b)$ read from right to left (MR pp. 38–39). On the GRE, factoring out is often the whole trick: $\frac{x^2 + 5x}{x}$ is just $x + 5$ once you see the common factor $x$ (for $x \ne 0$).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Fractions of expressions: cancel factors, keep the restriction" },
    {
      kind: "p",
      text: String.raw`A fraction whose numerator and denominator are polynomials is often called a [[rational-expression|rational expression]]. To simplify one, factor the top and the bottom, then cancel a factor that appears in both. The result is [[equivalent-expressions|equivalent]] to the original only where the original is defined: a fraction is [[undefined]] when its denominator is 0 (MR pp. 38–39). For example,`,
    },
    { kind: "math", tex: String.raw`\frac{4x^2 + 12x}{3x + 9} = \frac{4x(x+3)}{3(x+3)} = \frac{4x}{3} \qquad \text{for all } x \ne -3` },
    {
      kind: "p",
      text: String.raw`The simplified form $\frac{4x}{3}$ is perfectly happy at $x = -3$, but the original expression is not defined there, so the equality holds only for $x \ne -3$. The GRE tests this directly: "for which values of $x$ is the expression undefined?" is answered from the _original_ denominator.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Cancel factors, never terms",
      text: String.raw`You may cancel only something that _multiplies_ the whole numerator and the whole denominator. $\frac{x + 6}{6}$ is not $x$, and $\frac{x^2 + 9}{x + 3}$ is not $x + 3$ (the numerator does not factor over the real numbers). Factor first; if no common factor appears, nothing cancels.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Multiplying expressions" },
    {
      kind: "p",
      text: String.raw`To multiply two expressions, multiply each term of the first by each term of the second and add the results (MR p. 39). With two binomials that gives four products, which a small grid keeps organised:`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-1-algebraic-expressions/product-grid",
        caption: String.raw`$(2x - 3)(x + 4) = 2x^2 + 8x - 3x - 12 = 2x^2 + 5x - 12$. The two accent-colored cells are the like terms that combine.`,
      },
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Compute only the term you need",
      text: String.raw`Many questions ask for one coefficient or for the constant term. The constant term of a product is the product of the constant terms: in $(2x - 3)(x + 4)$ it is $(-3)(4) = -12$. The $x$-coefficient comes only from the two "cross" products: $2x \cdot 4 + (-3) \cdot x = 5x$. Matching coefficients this way also solves "$(x + k)(x - 5) = x^2 + bx - 20$ for all $x$" problems in two lines.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Seven key identities" },
    {
      kind: "p",
      text: String.raw`An [[identity]] is an equation between two expressions that is true for _all_ values of the variables (MR p. 39). The Math Review gives seven examples of identities. The first two are factoring out a common factor; the rest are worth knowing in both directions, because the GRE uses them to expand and, even more often, to factor.`,
    },
    {
      kind: "math",
      key: true,
      tex: String.raw`\begin{aligned}
ca + cb &= c(a+b) & ca - cb &= c(a-b)\\[2pt]
(a+b)^2 &= a^2 + 2ab + b^2 & (a-b)^2 &= a^2 - 2ab + b^2\\[2pt]
a^2 - b^2 &= (a+b)(a-b) & &\\[2pt]
(a+b)^3 &= a^3 + 3a^2b + 3ab^2 + b^3 & (a-b)^3 &= a^3 - 3a^2b + 3ab^2 - b^3
\end{aligned}`,
    },
    {
      kind: "p",
      text: String.raw`An expression of the form $a^2 + 2ab + b^2$ is a [[perfect-square|perfect square]], and $a^2 - b^2$ is a [[difference-of-squares|difference of squares]]; prep books use these names, the Math Review just numbers the identities. Both have a picture. Square a side of length $a + b$ and it splits into $a^2$, $b^2$ and two $a \times b$ rectangles, which is exactly where the $2ab$ comes from.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-1-algebraic-expressions/area-model",
        props: { mode: "sum" },
        caption: String.raw`$(a + b)^2 = a^2 + 2ab + b^2$: the two accent-colored rectangles are the $2ab$ that $a^2 + b^2$ leaves out.`,
      },
    },
    {
      kind: "p",
      text: String.raw`For the difference of squares, remove a $b \times b$ corner from an $a \times a$ square. The L-shaped remainder cuts into two rectangles that fit together into one rectangle $a + b$ long and $a - b$ wide.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-1-algebraic-expressions/area-model",
        props: { mode: "dos" },
        caption: String.raw`$a^2 - b^2 = (a + b)(a - b)$: the lower piece of the L turns and moves beside the upper piece.`,
      },
    },
    {
      kind: "interactive",
      key: "2-1-algebraic-expressions/identity-explorer",
      title: "Identity explorer",
      caption: String.raw`Pick an identity and move $a$ and $b$. The area model and both sides of the identity update together, and the "trap" line shows what you get from the most common wrong expansion.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "How the GRE uses the identities" },
    {
      kind: "p",
      text: String.raw`**Simplifying.** The Math Review's own use is in fractions: factor the numerator and the denominator with the identities, then cancel (MR p. 40). For instance, $\frac{x^2 - 49}{2x + 14} = \frac{(x+7)(x-7)}{2(x+7)} = \frac{x-7}{2}$ for all $x \ne -7$.`,
    },
    {
      kind: "p",
      text: String.raw`**Sums and products without solving.** If a question gives you $x + y$ and $xy$ (or $x - y$ and $xy$), it almost never wants $x$ and $y$ themselves. It wants you to notice that $x^2 + y^2$ hides inside a square:`,
    },
    { kind: "math", key: true, tex: String.raw`x^2 + y^2 = (x+y)^2 - 2xy = (x-y)^2 + 2xy` },
    {
      kind: "p",
      text: String.raw`So if $x + y = 9$ and $xy = 14$, then $x^2 + y^2 = 81 - 28 = 53$. In the same spirit, $(x + y)^2 - (x - y)^2 = 4xy$, which settles many Quantitative Comparison questions in one line: the sign of $xy$ decides which square is larger.`,
    },
    {
      kind: "p",
      text: String.raw`**Difference of squares as a shortcut.** Whenever you see $x^2 - y^2$ alongside $x + y$ or $x - y$, divide: if $x - y = 3$ and $x^2 - y^2 = 39$, then $x + y = 13$. The identity also makes some arithmetic painless: $63^2 - 57^2 = (120)(6) = 720$, and $49 \times 51 = 50^2 - 1^2 = 2{,}499$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      text: String.raw`Watch for the hidden pattern $\left(x + \frac{1}{x}\right)^2 = x^2 + 2 + \frac{1}{x^2}$. It is identity 3 with $a = x$ and $b = \frac{1}{x}$, and the middle term is the constant $2$ because $x \cdot \frac{1}{x} = 1$.`,
    },
    {
      kind: "p",
      text: String.raw`The cube identities appear less often, usually as "what is the coefficient of ..." questions: in $(2x - 1)^3$ take $a = 2x$ and $b = 1$ in identity 7 to get $8x^3 - 12x^2 + 6x - 1$. Substitute whole terms, including their coefficients, for $a$ and $b$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Most algebraic-expression questions reward the same habit: before computing anything, ask which form the question wants. A fraction wants factoring and canceling; a question that gives sums and products wants a square; a comparison of two expressions wants their difference, simplified. Keep track of where the original expression is defined, and let the identities do the arithmetic.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`$(a + b)^2$ is not $a^2 + b^2$; the missing piece is $2ab$, and similarly $(a - b)^2$ is not $a^2 - b^2$. Subtracting an expression changes the sign of _every_ term: $5x - (2x - 3) = 3x + 3$. Cancel only common factors, never terms. A simplified fraction carries the restriction of the original (for example $x \ne -3$). And the degree of a term in several variables is the sum of its exponents.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "variable",
      term: "variable",
      turkish: "değişken",
      definition: String.raw`A letter that represents a quantity whose value is unknown; $x$ and $y$ are common, but any symbol can be used.`,
      source: "MR p. 36",
    },
    {
      id: "algebraic-expression",
      term: "algebraic expression",
      turkish: "cebirsel ifade",
      definition: String.raw`An expression that has one or more variables and can be written as a single term or as a sum of terms, e.g. $5k$, $m + \frac{2}{3}$, $\frac{9}{r - s}$.`,
      source: "MR p. 36",
    },
    {
      id: "term",
      term: "term",
      turkish: "terim",
      definition: String.raw`One of the parts that are added to form an algebraic expression. $3x^2 - 5x + 2$ has three terms; $\frac{6}{a + b}$ is a single term.`,
      source: "MR p. 36",
    },
    {
      id: "like-terms",
      term: "like terms",
      turkish: "benzer terimler",
      definition: String.raw`Terms that have the same variables, with the corresponding variables raised to the same exponents, e.g. $3t^4$ and $-8t^4$. Like terms are combined by adding their coefficients.`,
      source: "MR pp. 36, 38",
    },
    {
      id: "constant-term",
      term: "constant term",
      turkish: "sabit terim",
      definition: String.raw`A term that has no variable. Its degree is 0.`,
      source: "MR pp. 36–37",
    },
    {
      id: "coefficient",
      term: "coefficient",
      turkish: "katsayı",
      definition: String.raw`The number that is multiplied by the variables in a term; in $-4a^2b^5$ the coefficient is $-4$.`,
      source: "MR pp. 36–37",
    },
    {
      id: "polynomial",
      term: "polynomial",
      turkish: "polinom",
      definition: String.raw`The sum of a finite number of terms, each of which is either a constant term or a product of a coefficient and one or more variables with positive integer exponents.`,
      source: "MR p. 37",
    },
    {
      id: "degree-term",
      term: "degree (of a term)",
      turkish: "terimin derecesi",
      definition: String.raw`The sum of the exponents of the variables in the term. A variable written without an exponent has degree 1; a constant term has degree 0.`,
      formula: String.raw`-4a^2b^5:\ \text{degree } 2 + 5 = 7`,
      source: "MR p. 37",
    },
    {
      id: "degree-polynomial",
      term: "degree of a polynomial",
      turkish: "polinomun derecesi",
      definition: String.raw`The greatest degree of the polynomial's terms.`,
      source: "MR p. 37",
    },
    {
      id: "quadratic-polynomial",
      term: "quadratic polynomial",
      turkish: "ikinci dereceden polinom",
      definition: String.raw`A polynomial of degree 2, such as $3x^2 - 5x + 2$.`,
      source: "MR p. 37",
    },
    {
      id: "cubic-polynomial",
      term: "cubic polynomial",
      turkish: "üçüncü dereceden polinom",
      definition: String.raw`A polynomial of degree 3, such as $2x^3 + x^2 - 9x + 5$.`,
      source: "MR pp. 37–38",
    },
    {
      id: "factoring",
      term: "factor out (factoring)",
      turkish: "ortak çarpan parantezine alma / çarpanlarına ayırma",
      definition: String.raw`Rewriting an expression as a product. A number or variable that is a factor of each term can be factored out: $14t^2 - 21t = 7t(2t - 3)$.`,
      source: "MR p. 38",
    },
    {
      id: "rational-expression",
      term: "rational expression",
      turkish: "rasyonel ifade",
      definition: String.raw`A fraction whose numerator and denominator are polynomials, such as $\frac{5x^2 - 15x}{4x - 12}$. It is simplified by factoring and canceling common factors, for the values where it is defined.`,
      note: "Not named in the ETS Math Review",
      source: "MR pp. 38–40",
    },
    {
      id: "undefined",
      term: "undefined (not defined)",
      turkish: "tanımsız",
      definition: String.raw`A fraction is not defined when its denominator is equal to 0. $\frac{5x^2 - 15x}{4(x - 3)}$ is defined for all $x \ne 3$.`,
      source: "MR p. 39; MC p. 7",
    },
    {
      id: "equivalent-expressions",
      term: "equivalent (expressions)",
      turkish: "denk ifadeler / eşdeğer ifadeler",
      definition: String.raw`Said of a simplified form that equals the original expression for every value of the variable for which the original expression is defined (MR pp. 38–40).`,
      note: "Not defined in the ETS Math Review",
      source: "MR pp. 38–40",
    },
    {
      id: "identity",
      term: "identity",
      turkish: "özdeşlik",
      definition: String.raw`A statement of equality between two algebraic expressions that is true for all possible values of the variables involved, e.g. $a^2 - b^2 = (a + b)(a - b)$.`,
      source: "MR pp. 39–40",
    },
    {
      id: "perfect-square",
      term: "perfect square (trinomial)",
      turkish: "tam kare ifade",
      definition: String.raw`An expression of the form $a^2 + 2ab + b^2$ or $a^2 - 2ab + b^2$, which equals $(a + b)^2$ or $(a - b)^2$ (identities 3 and 4).`,
      formula: String.raw`a^2 \pm 2ab + b^2 = (a \pm b)^2`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 39",
    },
    {
      id: "difference-of-squares",
      term: "difference of (two) squares",
      turkish: "iki kare farkı",
      definition: String.raw`An expression of the form $a^2 - b^2$, which factors as $(a + b)(a - b)$ (identity 5).`,
      formula: String.raw`a^2 - b^2 = (a + b)(a - b)`,
      note: "Not named in the ETS Math Review",
      source: "MR p. 40",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "qc",
      difficulty: "medium",
      given: String.raw`$x - y = 4$ and $xy = 5$`,
      quantityA: String.raw`$x^2 + y^2$`,
      quantityB: String.raw`$25$`,
      answer: "A",
      explanation: [
        String.raw`You do not need $x$ and $y$. Use identity 4: $(x - y)^2 = x^2 - 2xy + y^2$, so $x^2 + y^2 = (x - y)^2 + 2xy$.`,
        String.raw`Substitute: $x^2 + y^2 = 4^2 + 2(5) = 16 + 10 = 26$.`,
        String.raw`$26 > 25$, so Quantity A is greater.`,
        String.raw`Trap: $4^2 + 5 = 21$ forgets that the cross term is $2xy$, not $xy$, and makes Quantity B look greater. (Check: $x = 5$, $y = 1$ satisfies both conditions, and $25 + 1 = 26$.)`,
      ],
    },
    {
      id: "ex2",
      type: "mc1",
      difficulty: "hard",
      stem: String.raw`When $(2x - 3)^3$ is written as a polynomial in the form $px^3 + qx^2 + rx + s$, what is the value of $q$?`,
      choices: [String.raw`$-54$`, String.raw`$-36$`, String.raw`$-18$`, String.raw`$18$`, String.raw`$36$`],
      answer: 1,
      explanation: [
        String.raw`Use identity 7, $(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$, with $a = 2x$ and $b = 3$.`,
        String.raw`The $x^2$ term is $-3a^2b = -3(2x)^2(3) = -3 \cdot 4x^2 \cdot 3 = -36x^2$, so $q = -36$.`,
        String.raw`For completeness, $(2x - 3)^3 = 8x^3 - 36x^2 + 54x - 27$.`,
        String.raw`Traps: $-18$ comes from writing $a^2 = 2x^2$ instead of $(2x)^2 = 4x^2$; $54$ (and its negative) is the $x$-coefficient $3ab^2 = 3(2x)(9)$.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`What is the value of $2{,}024^2 - 2{,}016^2$?`,
      answer: { kind: "decimal", value: "32320" },
      explanation: [
        String.raw`Difference of squares: $a^2 - b^2 = (a + b)(a - b)$ with $a = 2{,}024$ and $b = 2{,}016$.`,
        String.raw`$a + b = 4{,}040$ and $a - b = 8$, so the value is $4{,}040 \times 8 = 32{,}320$.`,
        String.raw`The on-screen calculator would also work, but the identity is faster and avoids an eight-digit entry error.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`Which of the following expressions are equal to $(x - y)^2$ for all numbers $x$ and $y$? Indicate all such expressions.`,
      choices: [
        String.raw`$x^2 - y^2$`,
        String.raw`$(y - x)^2$`,
        String.raw`$x^2 - 2xy + y^2$`,
        String.raw`$(x + y)^2 - 4xy$`,
        String.raw`$x^2 + y^2$`,
        String.raw`$-(x - y)(y - x)$`,
      ],
      answer: [1, 2, 3, 5],
      explanation: [
        String.raw`Identity 4 gives $(x - y)^2 = x^2 - 2xy + y^2$, so the third expression is correct.`,
        String.raw`$(y - x)^2$: since $y - x = -(x - y)$ and $(-u)^2 = u^2$, it equals $(x - y)^2$. Correct.`,
        String.raw`$(x + y)^2 - 4xy = x^2 + 2xy + y^2 - 4xy = x^2 - 2xy + y^2$. Correct.`,
        String.raw`$-(x - y)(y - x) = (x - y)\cdot[-(y - x)] = (x - y)(x - y)$. Correct.`,
        String.raw`$x^2 - y^2$ and $x^2 + y^2$ fail: try $x = 3$, $y = 1$, where $(x - y)^2 = 4$ but they give $8$ and $10$.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`What is the degree of the polynomial $5x^3y^2 - 2x^4 + 7$?`,
      answer: String.raw`$5$`,
      explanation: String.raw`The term degrees are $3 + 2 = 5$, $4$ and $0$; the greatest is 5.`,
    },
    {
      id: "q2",
      prompt: String.raw`How many terms does $3x^2 - x + \frac{4}{x + 1}$ have?`,
      answer: String.raw`$3$`,
      explanation: String.raw`$3x^2$, $-x$ and $\frac{4}{x+1}$; a fraction counts as one term.`,
    },
    {
      id: "q3",
      prompt: String.raw`Simplify $5pq - 4q - 2pq + 7q$.`,
      answer: String.raw`$3pq + 3q$`,
      explanation: String.raw`Combine like terms: $5pq - 2pq = 3pq$ and $-4q + 7q = 3q$.`,
    },
    {
      id: "q4",
      prompt: String.raw`Factor $12m^2 - 18m$ completely.`,
      answer: String.raw`$6m(2m - 3)$`,
      explanation: String.raw`The greatest common factor of the two terms is $6m$.`,
    },
    {
      id: "q5",
      prompt: String.raw`Multiply out $(3x - 2)(x + 4)$.`,
      answer: String.raw`$3x^2 + 10x - 8$`,
      explanation: String.raw`$3x^2 + 12x - 2x - 8$; the cross terms combine to $10x$.`,
    },
    {
      id: "q6",
      prompt: String.raw`Simplify $\frac{x^2 - 25}{3x + 15}$, and say where the result is valid.`,
      answer: String.raw`$\frac{x - 5}{3}$ for all $x \ne -5$`,
      explanation: String.raw`$\frac{(x+5)(x-5)}{3(x+5)}$; the factor $x + 5$ cancels only where it is not 0.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$x < y < 0$`,
        quantityA: String.raw`$(x + y)^2$`,
        quantityB: String.raw`$(x - y)^2$`,
        answer: "A",
        explanation: [
          String.raw`Expand both: Quantity A is $x^2 + 2xy + y^2$ and Quantity B is $x^2 - 2xy + y^2$. Their difference is A $-$ B $= 4xy$.`,
          String.raw`Both $x$ and $y$ are negative, so $xy > 0$ and $4xy > 0$.`,
          String.raw`Quantity A is greater. (Check: $x = -3$, $y = -1$ gives $16$ versus $4$.) Note that the order $x < y$ does not matter; only the sign of $xy$ does.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$x > -2$ and $x \ne 2$`,
        quantityA: String.raw`$\dfrac{x^2 - 4}{2 - x}$`,
        quantityB: String.raw`$x + 2$`,
        answer: "B",
        explanation: [
          String.raw`Factor the numerator: $x^2 - 4 = (x + 2)(x - 2)$. The denominator is $2 - x = -(x - 2)$.`,
          String.raw`So for $x \ne 2$, Quantity A $= \frac{(x + 2)(x - 2)}{-(x - 2)} = -(x + 2)$.`,
          String.raw`Since $x > -2$, $x + 2 > 0$. So Quantity A is negative and Quantity B is positive: Quantity B is greater.`,
          String.raw`Trap: canceling $x - 2$ against $2 - x$ as if they were equal gives $x + 2$ and the answer (C). They are negatives of each other.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$a + b = 6$ and $ab = 7$`,
        quantityA: String.raw`$a^3 + b^3$`,
        quantityB: String.raw`$90$`,
        answer: "C",
        explanation: [
          String.raw`Identity 6 gives $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 = a^3 + b^3 + 3ab(a + b)$.`,
          String.raw`So $a^3 + b^3 = (a + b)^3 - 3ab(a + b) = 6^3 - 3(7)(6) = 216 - 126 = 90$.`,
          String.raw`The quantities are equal. (Here $a$ and $b$ are $3 + \sqrt{2}$ and $3 - \sqrt{2}$, real numbers, but you never need them.)`,
          String.raw`Trap: $(a + b)^3 = 216$ is not $a^3 + b^3$; the middle terms $3a^2b + 3ab^2$ must be removed.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`If $x + \dfrac{1}{x} = 5$, what is the value of $x^2 + \dfrac{1}{x^2}$?`,
        choices: [String.raw`$21$`, String.raw`$23$`, String.raw`$25$`, String.raw`$27$`, String.raw`$29$`],
        answer: 1,
        explanation: [
          String.raw`Square both sides using identity 3 with $a = x$ and $b = \frac{1}{x}$: $\left(x + \frac{1}{x}\right)^2 = x^2 + 2 \cdot x \cdot \frac{1}{x} + \frac{1}{x^2} = x^2 + 2 + \frac{1}{x^2}$.`,
          String.raw`So $25 = x^2 + \frac{1}{x^2} + 2$, and $x^2 + \frac{1}{x^2} = 23$.`,
          String.raw`Trap: $25$ comes from squaring each term separately and dropping the cross term $2$; $27$ adds it instead of subtracting.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`For all values of $x$, $(3x + k)(x - 2) = 3x^2 + 7x + m$, where $k$ and $m$ are constants. What is the value of $m$?`,
        choices: [String.raw`$-26$`, String.raw`$-13$`, String.raw`$-2$`, String.raw`$13$`, String.raw`$26$`],
        answer: 0,
        explanation: [
          String.raw`Multiply out: $(3x + k)(x - 2) = 3x^2 - 6x + kx - 2k = 3x^2 + (k - 6)x - 2k$.`,
          String.raw`Since this equals $3x^2 + 7x + m$ for all $x$, the coefficients match: $k - 6 = 7$, so $k = 13$, and $m = -2k = -26$.`,
          String.raw`Trap: $13$ is $k$, not $m$; $-13$ forgets the factor 2 in $-2k$.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`When $(x^3y + 2y^2)(xy^2 - 5x)$ is multiplied out and like terms are combined, what is the sum of the coefficients?`,
        choices: [String.raw`$-12$`, String.raw`$-10$`, String.raw`$-4$`, String.raw`$3$`, String.raw`$12$`],
        answer: 0,
        explanation: [
          String.raw`Multiply out: $x^4y^3 - 5x^4y + 2xy^4 - 10xy^2$. No two of these are like terms, so the coefficients are $1, -5, 2, -10$, and their sum is $-12$.`,
          String.raw`Shortcut: the sum of the coefficients is the value of the expression at $x = y = 1$: $(1 + 2)(1 - 5) = (3)(-4) = -12$.`,
          String.raw`Trap: dropping a sign, e.g. using $(1 + 2)(1 + 5)$ or $(3)(4)$, gives $12$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`For which of the following values of $x$ is the expression $\dfrac{x^2 - 9}{x^2 + 3x}$ undefined? Indicate all such values.`,
        choices: [String.raw`$-9$`, String.raw`$-3$`, String.raw`$0$`, String.raw`$3$`, String.raw`$9$`],
        answer: [1, 2],
        explanation: [
          String.raw`A fraction is undefined exactly when its denominator is 0. Factor the denominator: $x^2 + 3x = x(x + 3)$, which is 0 when $x = 0$ or $x = -3$.`,
          String.raw`Trap: the expression simplifies to $\frac{(x + 3)(x - 3)}{x(x + 3)} = \frac{x - 3}{x}$, which looks defined at $x = -3$. But the simplification is valid only where the original is defined, so $-3$ is still excluded.`,
          String.raw`$x = 3$ makes the _numerator_ 0, so the expression equals $0$ there; that is defined.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`Positive integers $x$ and $y$ satisfy $x^2 - y^2 = 15$. Which of the following could be the value of $x + y$? Indicate all such values.`,
        choices: [String.raw`$1$`, String.raw`$3$`, String.raw`$5$`, String.raw`$8$`, String.raw`$15$`],
        answer: [2, 4],
        explanation: [
          String.raw`Factor: $(x + y)(x - y) = 15$. Since $x$ and $y$ are positive integers and the product is positive, $x + y$ and $x - y$ are positive integers with $x + y > x - y$.`,
          String.raw`The factor pairs of 15 with the larger factor first are $15 \times 1$ and $5 \times 3$.`,
          String.raw`$x + y = 15$, $x - y = 1$ gives $x = 8$, $y = 7$. $x + y = 5$, $x - y = 3$ gives $x = 4$, $y = 1$. Both work: $64 - 49 = 15$ and $16 - 1 = 15$.`,
          String.raw`So $x + y$ could be 5 or 15. The values 1 and 3 would make $x + y$ smaller than $x - y$, which is impossible for positive $y$; 8 does not divide 15.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`If $n > 0$ and $(n + 3)^2 - (n - 3)^2 = 4n^2$, what is the value of $n$?`,
        answer: { kind: "decimal", value: "3" },
        explanation: [
          String.raw`Expand the left side: $(n^2 + 6n + 9) - (n^2 - 6n + 9) = 12n$. (Or use the difference of squares: $(2n)(6) = 12n$.)`,
          String.raw`So $12n = 4n^2$, which gives $4n^2 - 12n = 4n(n - 3) = 0$, so $n = 0$ or $n = 3$.`,
          String.raw`Since $n > 0$, $n = 3$. Trap: dividing both sides by $n$ without the condition $n \ne 0$ hides the root $n = 0$; here the condition $n > 0$ is what rules it out.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`If $x \ne 4$ and $\dfrac{x^2 - 16}{x^2 - 8x + 16} = -5$, what is the value of $x$? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 8, denominator: 3 },
        explanation: [
          String.raw`Factor with identities 5 and 4: $\frac{(x + 4)(x - 4)}{(x - 4)^2} = \frac{x + 4}{x - 4}$ for $x \ne 4$.`,
          String.raw`Solve $\frac{x + 4}{x - 4} = -5$: $x + 4 = -5x + 20$, so $6x = 16$ and $x = \frac{8}{3}$.`,
          String.raw`Check: $x = \frac{8}{3}$ gives $\frac{8/3 + 4}{8/3 - 4} = \frac{20/3}{-4/3} = -5$, and $x \ne 4$.`,
        ],
      },
    ],
  },
};

export default section;
