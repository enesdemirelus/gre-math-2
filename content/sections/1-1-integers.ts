import type { Section } from "../types";

const section: Section = {
  id: "1-1-integers",
  number: "1.1",
  title: "Integers",
  part: "arithmetic",
  mrPages: "3–7",
  summary: String.raw`Factors and multiples, LCM and GCD, division with a remainder (including negative dividends), even and odd, primes and prime factorization, and the counting tricks the GRE builds on them: how many divisors, which remainder, what must be even.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Integers and signs" },
    {
      kind: "p",
      text: String.raw`The [[integer|integers]] are $1, 2, 3, \ldots$, their negatives $-1, -2, -3, \ldots$, and $0$: the set $\{\ldots, -2, -1, 0, 1, 2, \ldots\}$. The positive integers are greater than 0, the negative integers are less than 0, and **0 is neither positive nor negative** (MR p. 3). Sums, differences and products of integers are always integers; only division can leave the integers, which is why it gets its own treatment below.`,
    },
    {
      kind: "p",
      text: String.raw`The three sign facts for products are the ones you already use: positive times positive is positive, negative times negative is positive, and positive times negative is negative (MR p. 3). Their GRE use is in reasoning without numbers: if $xy < 0$, exactly one of $x$ and $y$ is negative; if $xyz > 0$, an even number of the three (zero or two) are negative.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Read the restrictions",
      text: String.raw`On the GRE a letter can be any real number unless the question restricts it (MC p. 5). "$n$ is an integer" allows $0$ and negative values; only "positive integer" rules them out. Many Quantitative Comparison traps are a value like $0$, $-1$ or a negative even number that the question never excluded.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Factors, multiples and divisibility" },
    {
      kind: "p",
      text: String.raw`When integers are multiplied, each of them is a [[factor]] (or **divisor**) of the product, the product is a [[multiple]] of each of them, and the product is [[divisible]] by each of them (MR p. 3). Since $(4)(15) = 60$, both $4$ and $15$ are factors of $60$, and $60$ is a multiple of both. These words are reserved for integers (MC p. 4).`,
    },
    {
      kind: "p",
      text: String.raw`Two details make the definitions bite. First, **factors come in signed pairs**: because $(-2)(-30) = 60$, the integer $-2$ is a factor of 60 too. So 60 has 12 positive factors and 24 factors in all, and 49 has exactly six factors: $\pm 1$, $\pm 7$, $\pm 49$. When the GRE wants only the positive ones, it says "positive divisors" or "positive factors." Second, the edge cases with 0 and 1 (MR p. 4):`,
    },
    {
      kind: "list",
      items: [
        String.raw`$1$ is a factor of every integer, but $1$ is a multiple only of $1$ and $-1$.`,
        String.raw`$0$ is a multiple of every integer, but $0$ is a factor only of $0$.`,
        String.raw`Every nonzero integer has infinitely many multiples, but only finitely many factors.`,
      ],
    },
    {
      kind: "p",
      text: String.raw`One more fact from MR p. 4 that saves time: if $d$ is a divisor of $c$, then $c \div d$ is also a divisor of $c$. That is why divisors pair up: for 60 the pairs are $1 \cdot 60$, $2 \cdot 30$, $3 \cdot 20$, $4 \cdot 15$, $5 \cdot 12$, $6 \cdot 10$. To list the divisors of $n$, test $1, 2, 3, \ldots$ up to $\sqrt{n}$ and write down each partner.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Quick divisibility tests",
      text: String.raw`These are standard facts, though not stated in the ETS Math Review: an integer is divisible by 3 (or 9) exactly when the sum of its digits is; by 4 when its last two digits form a multiple of 4; by 8 when its last three digits do; by 5 when it ends in 0 or 5; and by 6 when it is divisible by both 2 and 3. For example, $7{,}128$ has digit sum 18, so it is divisible by 9, and $128 = 8 \cdot 16$, so it is divisible by 8.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Least common multiple and greatest common divisor" },
    {
      kind: "p",
      text: String.raw`For two nonzero integers $c$ and $d$, the [[lcm|least common multiple]] is the least _positive_ integer that is a multiple of both, and the [[gcd|greatest common divisor]] (or greatest common factor) is the greatest positive integer that divides both (MR p. 4). Listing works for small numbers: the positive multiples of 12 are $12, 24, 36, 48, \ldots$ and those of 18 are $18, 36, \ldots$, so the LCM of 12 and 18 is 36; their common positive divisors are $1, 2, 3, 6$, so the GCD is 6. Both are positive even when $c$ or $d$ is negative.`,
    },
    {
      kind: "p",
      text: String.raw`For larger numbers, use prime factorizations (a standard method, though not stated in the ETS Math Review): the GCD takes each common prime to the **smaller** of its two exponents, and the LCM takes every prime that appears to the **larger** exponent. With $84 = (2^2)(3)(7)$ and $90 = (2)(3^2)(5)$:`,
    },
    {
      kind: "math",
      tex: String.raw`\text{GCD} = (2)(3) = 6, \qquad \text{LCM} = (2^2)(3^2)(5)(7) = 1{,}260`,
    },
    {
      kind: "p",
      text: String.raw`Because each prime's two exponents are split between the GCD and the LCM, for positive integers $a$ and $b$ the product of the GCD and the LCM equals $ab$ (also a standard fact, not stated in the ETS Math Review). Check: $6 \cdot 1{,}260 = 7{,}560 = 84 \cdot 90$.`,
    },
    { kind: "math", tex: String.raw`\text{GCD}(a,b)\cdot \text{LCM}(a,b) = ab \quad (a, b \text{ positive integers})`, key: true },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE disguises LCM",
      text: String.raw`"Two lights flash every 18 and every 24 seconds and flash together now; when do they next flash together?" is an LCM question (72 seconds). "What is the largest tile size that exactly fits both lengths?" or "into how many identical groups can both sets be split?" is a GCD question.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Quotient and remainder" },
    {
      kind: "p",
      text: String.raw`If $d$ is not a divisor of $c$, the result of $c \div d$ can be seen as a fraction, as a decimal, or as an integer [[quotient]] with an integer [[remainder]] (MR p. 4). The GRE uses the last view constantly, and ETS defines it precisely: to divide an integer $c$ by a positive integer $d$, find the **greatest multiple of $d$ that is less than or equal to $c$**, call it $qd$; then $q$ is the quotient and $r = c - qd$ is the remainder. The remainder is always at least 0 and less than $d$ (MR p. 5).`,
    },
    { kind: "math", tex: String.raw`c = qd + r, \qquad 0 \le r < d`, key: true },
    {
      kind: "p",
      text: String.raw`So 47 divided by 6 is 7 remainder 5, since $(7)(6) = 42$ is the greatest multiple of 6 not exceeding 47. Two special cases: the remainder is 0 **if and only if** $c$ is divisible by $d$, and when $0 \le c < d$ the quotient is 0 and the remainder is $c$ itself (9 divided by 20 is 0 remainder 9). The number being divided, $c$, is usually called the [[dividend]]; the MR simply calls it "the integer $c$."`,
    },
    {
      kind: "p",
      text: String.raw`**Negative dividends.** The rule "greatest multiple of $d$ that is $\le c$" still applies, and it pushes you _left_ on the number line, below $c$. For $-23 \div 5$, the greatest multiple of 5 that is $\le -23$ is $-25 = (-5)(5)$, so the quotient is $-5$ and the remainder is $-23 - (-25) = 2$:`,
    },
    { kind: "math", tex: String.raw`-23 = (-5)(5) + 2` },
    {
      kind: "diagram",
      diagram: {
        key: "1-1-integers/remainder-line",
        props: { n: -23, d: 5 },
        caption: String.raw`The greatest multiple of 5 that is less than or equal to $-23$ is $-25$; the remainder is the distance from $-25$ up to $-23$, which is 2.`,
      },
    },
    {
      kind: "p",
      text: String.raw`The tempting answer "$-4$ remainder $-3$" (from $-23 = (-4)(5) - 3$) is wrong on the GRE, because a remainder is never negative (MR p. 5). If a calculation hands you a negative remainder, add $d$ to it and subtract 1 from the quotient. The Math Conventions state the same rule for any nonzero divisor: $n = qd + r$ with $0 \le r < |d|$, and $r = 0$ if and only if $n$ is a multiple of $d$ (MC p. 5).`,
    },
    {
      kind: "interactive",
      key: "1-1-integers/remainder-explorer",
      title: "Remainder explorer",
      caption: String.raw`Move $n$ (including negative values) and $d$. The filled dot is the greatest multiple of $d$ that is less than or equal to $n$; the remainder is the distance from it up to $n$, always from $0$ to $d - 1$.`,
    },
    {
      kind: "p",
      text: String.raw`**Turning a remainder statement into algebra.** "When $n$ is divided by 7, the remainder is 3" means $n = 7k + 3$ for some integer $k$. The possible values are $\ldots, -11, -4, 3, 10, 17, \ldots$, spaced 7 apart, and the least positive one is 3 itself. Once $n$ is written this way, questions about $2n$, $n + 5$ or $n^2$ become routine: $2n = 14k + 6$, so $2n$ leaves remainder 6; $n + 5 = 7k + 8 = 7(k + 1) + 1$, so $n + 5$ leaves remainder 1.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Remainder traps",
      text: String.raw`Do not "divide the absolute value and attach a minus sign": $-23 \div 5$ is not $-4$ remainder $3$ and not $-4$ remainder $-3$. Do not forget the candidates with quotient 0 (the least positive $n$ with remainder 3 on division by 7 is 3, not 10). And a remainder can never equal or exceed the divisor, so "remainder 7 on division by 7" is impossible.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Even and odd" },
    {
      kind: "p",
      text: String.raw`An integer divisible by 2 is [[even]]; every other integer is [[odd]], and an odd integer always leaves remainder 1 when divided by 2 (MR p. 6). Parity has nothing to do with sign: $0$, $-4$ and $-18$ are even, and $-7$ is odd (MC p. 5). The six sum and product facts (MR p. 6) boil down to two rules:`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{aligned} &\text{even} \pm \text{even} = \text{even}, \quad \text{odd} \pm \text{odd} = \text{even}, \quad \text{even} \pm \text{odd} = \text{odd} \\ &\text{a product is even if and only if at least one factor is even} \end{aligned}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`(The MR states the facts for sums; differences behave the same way, since $a - b = a + (-b)$ and $-b$ has the same parity as $b$.) Powers follow from the product rule: for a positive integer exponent, $n^k$ has the same parity as $n$. So if $n$ is odd, $n^3 + n$ is odd $+$ odd $=$ even. A product of integers is odd only if _every_ factor is odd.`,
    },
    {
      kind: "p",
      text: String.raw`Parity combines naturally with [[consecutive-integers]], integers that follow one another without gaps, such as $n, n+1, n+2$. Of two consecutive integers, one is even and one is odd, so their product $n(n+1)$ is always even and their sum $2n + 1$ is always odd. More generally, among any $k$ consecutive integers exactly one is a multiple of $k$ (a standard fact, though not stated in the ETS Math Review), so the product of three consecutive integers is always a multiple of both 2 and 3, hence of 6.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Counting a run of integers",
      text: String.raw`"The integers from 0 to 9" means 10 integers, with or without the word "inclusive" (MC p. 13). In general, the integers from $a$ to $b$ number $b - a + 1$: there are $40 - 15 + 1 = 26$ integers from 15 to 40. The multiples of 6 from 1 to 200 are $6 \cdot 1, \ldots, 6 \cdot 33$, so there are 33 of them, since $6 \cdot 33 = 198 \le 200 < 204$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Sums of consecutive integers",
      text: String.raw`Consecutive integers are evenly spaced, so their average is the middle value (or the average of the two middle values), and the sum is (number of terms) $\times$ (average). Five consecutive integers with sum 85 have average 17, so they are $15, 16, 17, 18, 19$. Six consecutive integers have a sum that is always odd: the average is a half-integer, $k + \frac{1}{2}$, and $6\left(k + \frac{1}{2}\right) = 6k + 3$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Primes and prime factorization" },
    {
      kind: "p",
      text: String.raw`A [[prime|prime number]] is an integer greater than 1 whose only positive divisors are 1 and itself; the first ten are $2, 3, 5, 7, 11, 13, 17, 19, 23, 29$. An integer greater than 1 that is not prime is [[composite]] (MR pp. 6–7). Three facts settle most "which of these is prime?" items: **1 is not prime**, **2 is the only even prime**, and 0 and negative integers are neither prime nor composite, since both definitions require an integer greater than 1.`,
    },
    {
      kind: "p",
      text: String.raw`Every integer greater than 1 either is prime or can be written as a product of primes, its [[prime-divisor|prime divisors]], and this [[prime-factorization]] is **unique** (MR p. 6). ETS writes it as a product of prime powers in parentheses, for example $360 = (2^3)(3^2)(5)$. Uniqueness is what makes factorizations so powerful: every divisor of $360$ must be of the form $(2^a)(3^b)(5^c)$ with $0 \le a \le 3$, $0 \le b \le 2$, $0 \le c \le 1$, and nothing else can divide it.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Checking whether n is prime",
      text: String.raw`To decide whether $n$ is prime, it is enough to test the primes up to $\sqrt{n}$ (a standard fact, though not stated in the ETS Math Review): if $n = ab$ with $1 < a \le b$, then $a \le \sqrt{n}$. For 221, test 2, 3, 5, 7, 11, 13 (since $15^2 = 225 > 221$): $221 = (13)(17)$, so it is composite. For 223, none of these divides it, so 223 is prime.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Counting divisors" },
    {
      kind: "p",
      text: String.raw`The description of divisors above turns counting into multiplication. A positive divisor of $(2^3)(3^2)$ is $(2^a)(3^b)$ with 4 choices for $a$ ($0, 1, 2, 3$) and 3 choices for $b$ ($0, 1, 2$), so there are $4 \times 3 = 12$ positive divisors of $72$. The grid shows all of them. In general (a standard fact, though not stated in the ETS Math Review):`,
    },
    {
      kind: "math",
      tex: String.raw`n = \left(p_1^{a_1}\right)\left(p_2^{a_2}\right)\cdots\left(p_k^{a_k}\right) \;\Longrightarrow\; \text{number of positive divisors} = (a_1 + 1)(a_2 + 1)\cdots(a_k + 1)`,
      key: true,
    },
    {
      kind: "diagram",
      diagram: {
        key: "1-1-integers/divisor-grid",
        props: { p: 2, a: 3, s: 3, b: 2 },
        caption: String.raw`The positive divisors of $72 = (2^3)(3^2)$: each entry is its row label times its column label, giving $(3 + 1)(2 + 1) = 12$ divisors.`,
      },
    },
    {
      kind: "p",
      text: String.raw`The same idea answers restricted counts. The **odd** divisors of 72 are the ones with $a = 0$ (the top row): $1, 3, 9$. The divisors that are **multiples of 6** have $a \ge 1$ and $b \ge 1$: $3 \times 2 = 6$ of them. And because the GRE counts factors of both signs unless it says "positive," 72 has $24$ integer factors.`,
    },
    {
      kind: "p",
      text: String.raw`Divisors also explain which integers have an **odd** number of positive divisors: the divisors pair up as $d$ and $\frac{n}{d}$, and a divisor is unpaired only when $d = \frac{n}{d}$, that is, $n = d^2$. So $n$ has an odd number of positive divisors exactly when $n$ is a perfect square (a standard fact, though not stated in the ETS Math Review); in the formula, every exponent is even. A prime has exactly 2 positive divisors, and $p^2$ for a prime $p$ has exactly 3.`,
    },
    {
      kind: "interactive",
      key: "1-1-integers/factor-explorer",
      title: "Factor explorer",
      caption: String.raw`Enter one or two positive integers. You get each prime factorization in ETS form, the divisor list, the count $(a_1 + 1)(a_2 + 1)\cdots$, and the GCD and LCM read off from the smaller and larger exponents.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Divisibility of powers",
      text: String.raw`"If $n$ is a positive integer and $n^2$ is divisible by 50, what must divide $n$?" Factor: $50 = (2)(5^2)$. Since $n^2$ has every prime of $n$ with a doubled exponent, $2 \mid n^2$ forces $2 \mid n$ and $5^2 \mid n^2$ forces $5 \mid n$. So $10$ must divide $n$, and $n = 10$ shows that nothing larger is forced ($n^2 = 100$ is divisible by 50).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Almost every GRE integer question rewards one of three moves: **factor into primes** (divisor counts, GCD and LCM, "must divide" questions), **write the remainder form** $n = qd + r$ with $0 \le r < d$ (remainder questions, including ones with negative numbers), or **track parity** (even/odd questions about expressions in unknown integers). When a question gives only properties ("$n$ is odd," "$k$ is a multiple of 12"), test two or three allowed values, deliberately including small and negative ones, before trusting a pattern.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Counting only positive factors when the question says "factors" (49 has six). Treating 1 as prime, or forgetting that 2 is prime and even. Forgetting that 0 is even and that negative integers can be even or odd. Giving a negative remainder, or $|n| \div d$ with a minus sign, for a negative dividend. Missing the quotient-0 case in remainder questions. Assuming that a larger number has more divisors (144 has 15 positive divisors; 210 has 16).`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "integer",
      term: "integer",
      turkish: "tam sayı",
      definition: String.raw`One of the numbers $1, 2, 3, \ldots$, their negatives $-1, -2, -3, \ldots$, or $0$. The positive integers are greater than 0, the negative integers are less than 0, and 0 is neither positive nor negative.`,
      source: "MR p. 3; MC p. 5",
    },
    {
      id: "factor",
      term: "factor / divisor",
      turkish: "çarpan / bölen",
      definition: String.raw`When integers are multiplied, each of them is a factor (divisor) of the product. Factors include negative integers: $-2$ is a factor of 60 since $(-2)(-30) = 60$.`,
      source: "MR p. 3; MC p. 4",
    },
    {
      id: "multiple",
      term: "multiple",
      turkish: "kat",
      definition: String.raw`An integer $t$ is a multiple of each of its factors: if $rs = t$ for integers $r$ and $s$, then $t$ is a multiple of $r$ and of $s$. Every nonzero integer has infinitely many multiples, and 0 is a multiple of every integer.`,
      source: "MR pp. 3–4; MC p. 4",
    },
    {
      id: "divisible",
      term: "divisible",
      turkish: "bölünebilir (tam bölünür)",
      definition: String.raw`An integer is divisible by each of its divisors: 60 is divisible by 12 because 12 is a divisor of 60.`,
      source: "MR p. 3",
    },
    {
      id: "lcm",
      term: "least common multiple (LCM)",
      turkish: "en küçük ortak kat (EKOK)",
      definition: String.raw`For two nonzero integers $c$ and $d$, the least positive integer that is a multiple of both $c$ and $d$.`,
      source: "MR p. 4; MC p. 5",
    },
    {
      id: "gcd",
      term: "greatest common divisor (GCD) / greatest common factor",
      turkish: "en büyük ortak bölen (EBOB)",
      definition: String.raw`For two nonzero integers $c$ and $d$, the greatest positive integer that is a divisor of both $c$ and $d$.`,
      source: "MR p. 4; MC p. 5",
    },
    {
      id: "quotient",
      term: "quotient",
      turkish: "bölüm",
      definition: String.raw`When an integer $c$ is divided by a positive integer $d$, the integer $q$ such that $qd$ is the greatest multiple of $d$ that is less than or equal to $c$.`,
      formula: String.raw`c = qd + r`,
      source: "MR pp. 4–5",
    },
    {
      id: "remainder",
      term: "remainder",
      turkish: "kalan",
      definition: String.raw`The integer $r = c - qd$ left when $c$ is divided by $d$. It is always greater than or equal to 0 and less than $d$ (less than $|d|$ in the Math Conventions), and it is 0 if and only if $c$ is divisible by $d$.`,
      formula: String.raw`0 \le r < d`,
      source: "MR p. 5; MC p. 5",
    },
    {
      id: "dividend",
      term: "dividend",
      turkish: "bölünen",
      definition: String.raw`The number being divided: in $c \div d$, $c$ is the dividend and $d$ is the divisor.`,
      note: "Not named in the ETS Math Review",
    },
    {
      id: "even",
      term: "even integer",
      turkish: "çift tam sayı (çift sayı)",
      definition: String.raw`An integer that is divisible by 2: $\{\ldots, -4, -2, 0, 2, 4, \ldots\}$. Even integers are not necessarily positive; 0 is even.`,
      source: "MR p. 6; MC p. 5",
    },
    {
      id: "odd",
      term: "odd integer",
      turkish: "tek tam sayı (tek sayı)",
      definition: String.raw`An integer that is not divisible by 2: $\{\ldots, -3, -1, 1, 3, \ldots\}$. Divided by 2, an odd integer always leaves remainder 1.`,
      source: "MR p. 6; MC p. 5",
    },
    {
      id: "consecutive-integers",
      term: "consecutive integers",
      turkish: "ardışık tam sayılar",
      definition: String.raw`Integers that follow one another in order without gaps, such as $n$, $n + 1$, $n + 2$.`,
      note: "Not named in the ETS Math Review",
      source: "MC p. 13 (used, not defined)",
    },
    {
      id: "prime",
      term: "prime number",
      turkish: "asal sayı",
      definition: String.raw`An integer greater than 1 that has only two positive divisors: 1 and itself. The first ten are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29; 1 is not prime, and 2 is the only even prime.`,
      source: "MR p. 6; MC p. 5",
    },
    {
      id: "composite",
      term: "composite number",
      turkish: "asal olmayan sayı / bileşik sayı",
      definition: String.raw`An integer greater than 1 that is not a prime number. The first ten are 4, 6, 8, 9, 10, 12, 14, 15, 16, 18.`,
      source: "MR p. 7; MC p. 5",
    },
    {
      id: "prime-divisor",
      term: "prime divisor",
      turkish: "asal bölen / asal çarpan",
      definition: String.raw`A divisor of an integer that is a prime number; the primes in its prime factorization. The prime divisors of 360 are 2, 3 and 5.`,
      source: "MR p. 6",
    },
    {
      id: "prime-factorization",
      term: "prime factorization",
      turkish: "asal çarpanlarına ayırma",
      definition: String.raw`The expression of an integer greater than 1 that is not prime as a product of prime numbers. It is unique, apart from the order of the factors; ETS writes it as a product of prime powers, e.g. $800 = (2^5)(5^2)$.`,
      source: "MR pp. 6–7",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`When the integer $n$ is divided by 6, the remainder is 4. What is the remainder when $-n$ is divided by 6?`,
      choices: [String.raw`$0$`, String.raw`$1$`, String.raw`$2$`, String.raw`$3$`, String.raw`$4$`],
      answer: 2,
      explanation: [
        String.raw`Write the remainder statement as algebra: $n = 6k + 4$ for some integer $k$.`,
        String.raw`Then $-n = -6k - 4$. The remainder must be between 0 and 5, so borrow one more 6: $-n = -6k - 6 + 2 = 6(-k - 1) + 2$.`,
        String.raw`The quotient is $-k - 1$ and the remainder is $2$. Check with $n = 4$: $-4 = (-1)(6) + 2$.`,
        String.raw`Trap: answering 4 (or "$-4$") by copying the remainder of $n$. A remainder is never negative; $-4$ must become $-4 + 6 = 2$.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      quantityA: String.raw`The number of positive divisors of $144$`,
      quantityB: String.raw`The number of positive divisors of $210$`,
      answer: "B",
      explanation: [
        String.raw`Factor both: $144 = (2^4)(3^2)$ and $210 = (2)(3)(5)(7)$.`,
        String.raw`Count with $(a_1 + 1)(a_2 + 1)\cdots$: $144$ has $(4 + 1)(2 + 1) = 15$ positive divisors; $210$ has $(1 + 1)^4 = 16$.`,
        String.raw`Quantity B is greater. (Cross-check: 144 is a perfect square, so its count must be odd.)`,
        String.raw`Trap: assuming the larger number, or the one with bigger exponents, has more divisors. Many distinct primes beat a few high powers.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`The greatest common divisor of the positive integers $36$ and $b$ is $6$, and their least common multiple is $180$. What is the value of $b$?`,
      answer: { kind: "decimal", value: "30" },
      explanation: [
        String.raw`For positive integers, GCD $\times$ LCM $= $ the product of the two numbers: $6 \cdot 180 = 36b$, so $b = \frac{1{,}080}{36} = 30$.`,
        String.raw`Check with factorizations: $36 = (2^2)(3^2)$ and $30 = (2)(3)(5)$. Smaller exponents: $(2)(3) = 6$. Larger exponents: $(2^2)(3^2)(5) = 180$.`,
        String.raw`Without the product fact: $b$ must contain $5$ (it is in the LCM but not in 36), exactly one 2 and one 3 (the GCD has $2^1$ and $3^1$, while 36 has $2^2$ and $3^2$), and no other primes. So $b = (2)(3)(5) = 30$.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`$m$ and $n$ are integers, and $m + 3n$ is odd. Which of the following must be odd? Indicate all such expressions.`,
      choices: [
        String.raw`$m - n$`,
        String.raw`$mn$`,
        String.raw`$m^2 + n^2$`,
        String.raw`$(m + 1)(n + 1)$`,
        String.raw`$2m + n$`,
        String.raw`$m^2 n + 1$`,
      ],
      answer: [0, 2, 5],
      explanation: [
        String.raw`$3n$ has the same parity as $n$, so $m + 3n$ odd means $m + n$ is odd: one of $m$, $n$ is even and the other is odd. We do not know which.`,
        String.raw`$m - n$: even minus odd or odd minus even, always odd. **Yes.**`,
        String.raw`$mn$: one factor is even, so the product is even. No. $(m + 1)(n + 1)$: $m + 1$ and $n + 1$ also have opposite parity, so one is even and the product is even. No.`,
        String.raw`$m^2 + n^2$: squares keep parity, so this is even $+$ odd, odd. **Yes.**`,
        String.raw`$2m + n$: $2m$ is even, so this has the parity of $n$, which could be either ($m = 1, n = 0$ gives 2; $m = 0, n = 1$ gives 1). No.`,
        String.raw`$m^2 n + 1$: $m^2 n$ contains the even one of $m$ and $n$ as a factor, so it is even, and adding 1 makes it odd. **Yes.**`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`What are the quotient and remainder when $-17$ is divided by $5$?`,
      answer: String.raw`Quotient $-4$, remainder $3$`,
      explanation: String.raw`The greatest multiple of 5 that is $\le -17$ is $-20 = (-4)(5)$, and $-17 - (-20) = 3$.`,
    },
    {
      id: "q2",
      prompt: String.raw`How many positive divisors does $(2^3)(5^2)(7)$ have?`,
      answer: String.raw`$24$`,
      explanation: String.raw`$(3 + 1)(2 + 1)(1 + 1) = 4 \cdot 3 \cdot 2 = 24$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Find the GCD and the LCM of $48$ and $180$.`,
      answer: String.raw`GCD $12$, LCM $720$`,
      explanation: String.raw`$48 = (2^4)(3)$ and $180 = (2^2)(3^2)(5)$. Smaller exponents: $(2^2)(3) = 12$. Larger: $(2^4)(3^2)(5) = 720$. Check: $12 \cdot 720 = 8{,}640 = 48 \cdot 180$.`,
    },
    {
      id: "q4",
      prompt: String.raw`Which of $-3$, $0$, $1$, $2$, $51$ are prime?`,
      answer: String.raw`Only $2$`,
      explanation: String.raw`Primes are integers greater than 1, which rules out $-3$, $0$ and $1$; and $51 = (3)(17)$.`,
    },
    {
      id: "q5",
      prompt: String.raw`How many integers (positive and negative) are factors of $9$?`,
      answer: String.raw`$6$`,
      explanation: String.raw`$\pm 1$, $\pm 3$, $\pm 9$. Factors include negatives unless the question says "positive."`,
    },
    {
      id: "q6",
      prompt: String.raw`If $n$ is an integer, is $n^2 + n + 1$ even, odd, or can it be either?`,
      answer: String.raw`Always odd`,
      explanation: String.raw`$n^2 + n = n(n + 1)$ is a product of consecutive integers, so it is even; adding 1 makes it odd.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`When the positive integer $n$ is divided by $8$, the remainder is $5$.`,
        quantityA: String.raw`The remainder when $3n$ is divided by $8$`,
        quantityB: String.raw`The remainder when $3n$ is divided by $4$`,
        answer: "A",
        explanation: [
          String.raw`$n = 8k + 5$, so $3n = 24k + 15 = 8(3k + 1) + 7$. Quantity A is $7$.`,
          String.raw`Since $3n = 8(3k + 1) + 7 = 4(6k + 2) + 4 + 3 = 4(6k + 3) + 3$, Quantity B is $3$.`,
          String.raw`Quantity A is greater for every allowed $n$. Check with $n = 5$: $15 = (1)(8) + 7 = (3)(4) + 3$; with $n = 13$: $39 = (4)(8) + 7 = (9)(4) + 3$.`,
          String.raw`Trap: answering $3 \times 5 = 15$ for Quantity A. A remainder must be less than the divisor, so reduce: $15 = 8 + 7$.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$x$ is a positive integer, and $12$ is a factor of $x$.`,
        quantityA: String.raw`The number of positive divisors of $x$`,
        quantityB: String.raw`$6$`,
        answer: "D",
        explanation: [
          String.raw`Every divisor of 12 also divides $x$, so $x$ has at least the six positive divisors $1, 2, 3, 4, 6, 12$. Quantity A is at least 6.`,
          String.raw`If $x = 12 = (2^2)(3)$, it has exactly $(2 + 1)(1 + 1) = 6$ positive divisors: the quantities are equal.`,
          String.raw`If $x = 24 = (2^3)(3)$, it has $(3 + 1)(1 + 1) = 8$: Quantity A is greater.`,
          String.raw`Two allowed values give different comparisons, so the answer is (D). Trap: noticing only the lower bound and picking (A), or testing only $x = 12$ and picking (C).`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$a$, $b$ and $c$ are consecutive integers, and $a < b < c$.`,
        quantityA: String.raw`$ac$`,
        quantityB: String.raw`$b^2$`,
        answer: "B",
        explanation: [
          String.raw`Consecutive means $a = b - 1$ and $c = b + 1$.`,
          String.raw`Then $ac = (b - 1)(b + 1) = b^2 - 1$, which is exactly 1 less than $b^2$ for every integer $b$, including negative values and $b = 0$ (where $ac = (-1)(1) = -1$ and $b^2 = 0$).`,
          String.raw`Quantity B is greater.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`What is the least positive integer that leaves a remainder of $3$ when divided by $4$, a remainder of $4$ when divided by $5$, and a remainder of $5$ when divided by $6$?`,
        choices: [String.raw`$19$`, String.raw`$29$`, String.raw`$59$`, String.raw`$61$`, String.raw`$119$`],
        answer: 2,
        explanation: [
          String.raw`In each case the remainder is 1 less than the divisor, so $n + 1$ is divisible by 4, by 5 and by 6.`,
          String.raw`The least positive common multiple of 4, 5 and 6 is the LCM: $4 = 2^2$, $5$, $6 = (2)(3)$, so LCM $= (2^2)(3)(5) = 60$.`,
          String.raw`So $n + 1 = 60$ and $n = 59$. Check: $59 = (14)(4) + 3 = (11)(5) + 4 = (9)(6) + 5$.`,
          String.raw`Traps: $119 = 120 - 1$ uses the product $4 \cdot 5 \cdot 6$ instead of the LCM; $61$ adds 1 instead of subtracting; $29$ fails for 4 ($29 = (7)(4) + 1$); $19$ fails for 6 ($19 = (3)(6) + 1$).`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`How many of the positive divisors of $360$ are odd?`,
        choices: [String.raw`$4$`, String.raw`$6$`, String.raw`$8$`, String.raw`$12$`, String.raw`$24$`],
        answer: 1,
        explanation: [
          String.raw`$360 = (2^3)(3^2)(5)$. An odd divisor has no factor 2, so it is a divisor of $(3^2)(5) = 45$.`,
          String.raw`$45$ has $(2 + 1)(1 + 1) = 6$ positive divisors: $1, 3, 5, 9, 15, 45$.`,
          String.raw`Trap: 24 is the total number of positive divisors of 360, $(3 + 1)(2 + 1)(1 + 1)$; the odd ones are the $a = 0$ slice of that count.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`When the integer $n$ is divided by $8$, the quotient is $-5$ and the remainder is $3$. What is the remainder when $n$ is divided by $6$?`,
        choices: [String.raw`$1$`, String.raw`$2$`, String.raw`$3$`, String.raw`$4$`, String.raw`$5$`],
        answer: 4,
        explanation: [
          String.raw`$n = qd + r = (-5)(8) + 3 = -37$.`,
          String.raw`The greatest multiple of 6 that is less than or equal to $-37$ is $-42 = (-7)(6)$.`,
          String.raw`Remainder $= -37 - (-42) = 5$, so $-37 = (-7)(6) + 5$.`,
          String.raw`Trap: dividing 37 by 6 (remainder 1) and ignoring the sign, or writing $-37 = (-6)(6) - 1$ with the illegal remainder $-1$. Adding 6 to $-1$ gives the correct remainder 5.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`$n$ is a positive integer, and $n^3$ is divisible by $72$. Which of the following must be a divisor of $n$? Indicate all such integers.`,
        choices: [String.raw`$2$`, String.raw`$3$`, String.raw`$4$`, String.raw`$6$`, String.raw`$9$`, String.raw`$12$`, String.raw`$18$`],
        answer: [0, 1, 3],
        explanation: [
          String.raw`$72 = (2^3)(3^2)$. Each prime of $n$ appears in $n^3$ with three times its exponent in $n$, and $n^3$ has no other primes.`,
          String.raw`$2^3 \mid n^3$ needs the exponent of 2 in $n$ to be at least 1. $3^2 \mid n^3$ needs the exponent of 3 in $n$ to be at least 1 (since $3 \cdot 1 = 3 \ge 2$). So $n$ must be a multiple of $(2)(3) = 6$.`,
          String.raw`$n = 6$ works: $6^3 = 216 = (3)(72)$. So only the divisors of 6 are forced: 2, 3 and 6.`,
          String.raw`4, 9, 12 and 18 do not divide 6, so they are not forced. Trap: thinking $3^2 \mid n^3$ forces $9 \mid n$.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following statements are true? Indicate all such statements.`,
        choices: [
          String.raw`$0$ is an even integer.`,
          String.raw`$-3$ is a prime number.`,
          String.raw`The product of any two prime numbers is odd.`,
          String.raw`There is exactly one even prime number.`,
          String.raw`Every composite number has at least three positive divisors.`,
          String.raw`$1$ is a composite number.`,
        ],
        answer: [0, 3, 4],
        explanation: [
          String.raw`First: true. $0 = (0)(2)$ is divisible by 2.`,
          String.raw`Second: false. Primes are integers greater than 1.`,
          String.raw`Third: false. $(2)(3) = 6$ is even.`,
          String.raw`Fourth: true. 2 is prime, and every other even integer greater than 2 has 2 as a divisor besides 1 and itself.`,
          String.raw`Fifth: true. A composite number $n$ is greater than 1 and not prime, so it has a positive divisor other than 1 and $n$; together with 1 and $n$ that makes at least three.`,
          String.raw`Sixth: false. Composite numbers are greater than 1; 1 is neither prime nor composite.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`How many positive divisors of $720$ are multiples of $12$?`,
        answer: { kind: "decimal", value: "12" },
        explanation: [
          String.raw`$720 = (2^4)(3^2)(5)$ and $12 = (2^2)(3)$.`,
          String.raw`A divisor of 720 that is a multiple of 12 has the form $12k$, where $12k$ divides $720$, that is, $k$ divides $\frac{720}{12} = 60$.`,
          String.raw`$60 = (2^2)(3)(5)$ has $(2 + 1)(1 + 1)(1 + 1) = 12$ positive divisors, so there are 12 such divisors of 720 (from $12 \cdot 1 = 12$ up to $12 \cdot 60 = 720$).`,
          String.raw`Equivalently, count exponents: the power of 2 can be $2, 3, 4$ (3 choices), the power of 3 can be $1, 2$ (2 choices), and the power of 5 can be $0, 1$ (2 choices): $3 \cdot 2 \cdot 2 = 12$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`The sum of $8$ consecutive integers is $92$. What is the greatest of these integers?`,
        answer: { kind: "decimal", value: "15" },
        explanation: [
          String.raw`The average of the 8 integers is $\frac{92}{8} = 11.5$. For consecutive integers the average is the average of the two middle ones, so the 4th and 5th integers are 11 and 12.`,
          String.raw`The integers are $8, 9, 10, 11, 12, 13, 14, 15$, and the greatest is $15$.`,
          String.raw`Algebra check: $n + (n + 1) + \cdots + (n + 7) = 8n + 28 = 92$, so $n = 8$ and $n + 7 = 15$.`,
        ],
      },
    ],
  },
};

export default section;
