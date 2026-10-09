import type { Section } from "../types";

const section: Section = {
  id: "1-4-decimals",
  number: "1.4",
  title: "Decimals",
  part: "arithmetic",
  mrPages: "14–16",
  summary: String.raw`Place value and the names of the digits, converting between decimals and fractions, terminating vs. repeating decimals (and how to tell which from the denominator), digits far out in a repeating decimal, and the ETS rounding convention.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Place value" },
    {
      kind: "p",
      text: String.raw`The [[decimal-number-system|decimal number system]] writes every number with powers of 10: each [[digit]] (0 through 9) has a [[place-value|place value]] that is a power of 10, set by its position relative to the [[decimal-point|decimal point]] (MR p. 14). Moving one place to the left multiplies the place value by 10; moving one place to the right divides it by 10.`,
    },
    {
      kind: "diagram",
      diagram: { key: "1-4-decimals/place-value", props: { value: "4,068.257" }, caption: String.raw`The places of the digits of $4{,}068.257$. To the left of the point: ones (units), tens, hundreds, thousands. To the right: tenths, hundredths, thousandths.` },
    },
    {
      kind: "p",
      text: String.raw`Writing each digit times its place value gives the number's [[expanded-form|expanded form]]. In powers of 10, the ones place is $10^0$ and the places to the right of the point are negative powers (MR pp. 14–15):`,
    },
    { kind: "math", tex: String.raw`4{,}068.257 = 4(10^3) + 0(10^2) + 6(10^1) + 8(10^0) + 2(10^{-1}) + 5(10^{-2}) + 7(10^{-3})`, key: true },
    {
      kind: "p",
      text: String.raw`The GRE names digits by their place: in $4{,}068.257$ the [[units-digit|ones (units) digit]] is 8, the [[tens-digit|tens digit]] is 6, the [[tenths-digit|tenths digit]] is 2, the [[hundredths-digit|hundredths digit]] is 5 and the [[thousandths-digit|thousandths digit]] is 7. Notice the near-twins: _tens_ (left of the point) and _tenths_ (right of the point) are different places. Click the digits below to see each place and its value.`,
    },
    {
      kind: "interactive",
      key: "1-4-decimals/place-value-explorer",
      title: "Place-value and rounding explorer",
      caption: String.raw`Type a number or pick one. Click a digit to see its place, its value as a power of 10, and the number rounded to that place by the ETS rule. Use $\times 10$ and $\div 10$ to watch every digit shift one place.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Comma and period are swapped in Turkish",
      text: String.raw`The GRE uses a period for the decimal point and commas to group digits in threes for numbers 1,000 or greater (MC p. 4). Turkish does the opposite: _3,125_ in a Turkish textbook is three and one hundred twenty-five thousandths, but on the GRE $3{,}125$ is three thousand one hundred twenty-five. Read every number the ETS way.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How many digits?",
      text: String.raw`When the GRE says "a three-digit positive integer," it counts the ones digit and everything to its left, with a leftmost digit that is not 0. So $5{,}000$ is a four-digit integer, but $047$ is not a three-digit integer (MC p. 4). The three-digit integers are 100 through 999.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "From decimal to fraction" },
    {
      kind: "p",
      text: String.raw`A decimal with finitely many digits after the point is an integer divided by a power of 10: drop the point and divide by $10^k$, where $k$ is the number of digits after the point (MR p. 15). Then reduce if you can.`,
    },
    { kind: "math", tex: String.raw`0.375 = \frac{375}{1{,}000} = \frac{3}{8}, \qquad 2.04 = \frac{204}{100} = \frac{51}{25}`, key: true },
    {
      kind: "p",
      text: String.raw`This is also the cleanest way to do decimal arithmetic by hand. Write each decimal as a digit string times a power of 10: $(0.003)(0.02) = (3 \times 10^{-3})(2 \times 10^{-2}) = 6 \times 10^{-5} = 0.00006$. For a quotient, multiply the top and the bottom by the same power of 10 to clear the decimals (that is just an equivalent fraction): $\frac{0.48}{0.0006} = \frac{4{,}800}{6} = 800$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Shifting the decimal point",
      text: String.raw`Multiplying by $10^k$ moves every digit $k$ places to the left, which looks like moving the decimal point $k$ places to the right: $0.0905 \times 10^3 = 90.5$. Dividing by $10^k$ moves the point $k$ places to the left: $36.45 \div 10^2 = 0.3645$. This follows directly from place value.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "From fraction to decimal: terminate or repeat" },
    {
      kind: "p",
      text: String.raw`To turn a fraction into a decimal, divide the numerator by the denominator (long division, or the on-screen calculator). The result either stops, a [[terminating-decimal|terminating decimal]] such as $\frac{7}{16} = 0.4375$, or goes on forever with a block of digits that repeats, a [[repeating-decimal|repeating decimal]] such as $\frac{5}{6} = 0.8333\ldots$ (MR p. 15). The [[repeating-part|repeating part]] is marked with a bar over it (MR p. 15; MC p. 4):`,
    },
    { kind: "math", tex: String.raw`\frac{5}{6} = 0.8\overline{3}, \qquad \frac{4}{11} = 0.\overline{36}, \qquad \frac{3}{7} = 0.\overline{428571}` },
    {
      kind: "p",
      text: String.raw`The bar covers only the digits that repeat: in $0.8\overline{3}$ the 8 appears once and then 3s go on forever. The Math Review then states the key fact in both directions: every fraction with integers in the numerator and denominator is equivalent to a decimal that terminates or repeats, and every terminating or repeating decimal represents a rational number (MR p. 16).`,
    },
    { kind: "math", tex: String.raw`x \text{ is rational} \iff \text{the decimal for } x \text{ terminates or repeats}`, key: true },
    {
      kind: "p",
      text: String.raw`A decimal that neither terminates nor repeats is therefore not rational; such numbers are [[irrational-number|irrational numbers]] (MR p. 16). $\sqrt{2} = 1.41421356\ldots$ is one. So is $0.3033033303333\ldots$, where the groups of 3s between the 0s keep getting longer: it has a pattern, but no fixed block that repeats.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Pattern is not repetition",
      text: String.raw`"Has a pattern" and "repeats" are different. A decimal repeats only if, from some point on, one fixed block of digits recurs forever. And watch the classic comparison: $0.3 < \frac{1}{3} = 0.\overline{3}$, and $0.33 < 0.\overline{3}$ too.`,
    },
    {
      kind: "p",
      text: String.raw`Going backwards from a repeating decimal to a fraction uses a standard technique not shown in the Math Review: multiply by a power of 10 that shifts one full block, and subtract. If $x = 0.\overline{36}$, then $100x = 36.\overline{36}$, so $99x = 36$ and $x = \frac{36}{99} = \frac{4}{11}$. A pure repeating block of $k$ digits over $k$ nines is the quick version: $0.\overline{81} = \frac{81}{99} = \frac{9}{11}$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Which fractions terminate?" },
    {
      kind: "p",
      text: String.raw`You can tell without dividing. Here is a standard fact, though not stated in the ETS Math Review: a fraction **in lowest terms** has a terminating decimal exactly when its denominator has no prime factors other than 2 and 5. The reason is that a terminating decimal is an integer over $10^k = 2^k 5^k$, so only 2s and 5s can be left in the denominator after reducing.`,
    },
    { kind: "math", tex: String.raw`\frac{a}{b} \text{ in lowest terms terminates} \iff b = 2^m 5^n \text{ for some integers } m, n \ge 0`, key: true },
    {
      kind: "p",
      text: String.raw`Reduce first. $\frac{21}{56}$ has a 7 in the denominator, but $\frac{21}{56} = \frac{3}{8}$ and $8 = 2^3$, so it terminates: $0.375$. In the other direction, $\frac{7}{30}$ has $30 = 2 \cdot 3 \cdot 5$, and the 3 cannot cancel, so it repeats: $0.2\overline{3}$. A terminating fraction also tells you its length: with $b = 2^m 5^n$, the decimal has exactly the larger of $m$ and $n$ digits after the point, e.g. $\frac{3}{40} = \frac{3}{2^3 \cdot 5} = \frac{75}{1{,}000} = 0.075$.`,
    },
    {
      kind: "p",
      text: String.raw`Why must a non-terminating decimal repeat? In the long division of $a$ by $b$, each step leaves a remainder from 1 to $b - 1$ (a remainder of 0 means the decimal has ended). So within $b$ steps some remainder must come back, and from then on the division retraces the same steps, so the digits repeat with a block of at most $b - 1$ digits. The explorer shows the remainders for any fraction you choose.`,
    },
    {
      kind: "interactive",
      key: "1-4-decimals/decimal-expansion",
      title: "Decimal expansion explorer",
      caption: String.raw`Enter a fraction. The explorer reduces it, factors the denominator, predicts "terminates" or "repeats" before dividing, and then shows the decimal with its repeating block, the long-division remainders, and any digit you ask for.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Digits far out in a repeating decimal" },
    {
      kind: "p",
      text: String.raw`A favorite GRE question asks for, say, the 100th digit to the right of the decimal point. Find the block length, then use remainders (Section 1.1). For $\frac{3}{7} = 0.\overline{428571}$ the block has 6 digits. Since $100 = 6(16) + 4$, the 100th digit is the 4th digit of the block, which is 5.`,
    },
    { kind: "math", tex: String.raw`n = (\text{block length})q + r,\ 1 \le r \le \text{block length} \;\Longrightarrow\; n\text{th digit} = r\text{th digit of the block}` },
    {
      kind: "p",
      text: String.raw`If some digits come before the block, count them off first. In $\frac{7}{22} = 0.3\overline{18}$, the first digit is 3; after that, the digits alternate 1, 8, 1, 8, \ldots, so the even-numbered digits are 1 and the odd-numbered ones from the 3rd on are 8.`,
    },
    {
      kind: "aside",
      tone: "tip",
      text: String.raw`A remainder of 0 means the _last_ digit of the block, not the first. With block 428571, the 6th, 12th and 600th digits are all 1.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Comparing decimals" },
    {
      kind: "p",
      text: String.raw`To compare positive decimals, line up the decimal points and compare place by place from the left; the first place where they differ decides. Pad with zeros if that helps: $0.4$ vs. $0.389$ is $0.400$ vs. $0.389$, so $0.4$ is larger even though $0.389$ "has more digits." For a decimal against a fraction, convert one of them; $\frac{5}{8} = 0.625 > 0.62$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Rounding the ETS way" },
    {
      kind: "p",
      text: String.raw`The Math Review gives no rounding rule; the Math Conventions do (MC p. 4). [[rounding|Rounding]] to a place means choosing the nearer of the two possibilities at that place. When a positive number is exactly halfway, round to the **greater** possibility; when a negative number is exactly halfway, round to the **lesser** possibility. In other words, halves go away from 0.`,
    },
    { kind: "math", tex: String.raw`47.625 \to 47.63 \ (\text{nearest hundredth}), \qquad -12.45 \to -12.5 \ (\text{nearest tenth})`, key: true },
    {
      kind: "p",
      text: String.raw`Other examples: $0.0449$ to the nearest hundredth is $0.04$ (only the next digit, 4, matters), and $2{,}999.96$ to the nearest ten is $3{,}000$. The GRE also asks the reverse question: which numbers round to a given value? A number rounds to $4.3$ (nearest tenth) exactly when $4.25 \le x < 4.35$. The left end is included because a half rounds up; the right end is excluded because $4.35$ rounds to $4.4$.`,
    },
    {
      kind: "diagram",
      diagram: { key: "1-4-decimals/rounding-interval", props: { min: 4.2, max: 4.4, step: 0.05, lo: 4.25, hi: 4.35, target: 4.3, places: 2, targetPlaces: 1 }, caption: String.raw`The positive numbers that round to $4.3$ (nearest tenth): $4.25 \le x < 4.35$.` },
    },
    {
      kind: "p",
      text: String.raw`For negative numbers the closed end switches sides. A half goes to the _lesser_ possibility, so $-4.25$ rounds to $-4.3$ while $-4.35$ rounds to $-4.4$. Hence $x$ rounds to $-4.3$ exactly when $-4.35 < x \le -4.25$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Round once, from the original number",
      text: String.raw`Never round in stages. $4.346$ to the nearest tenth is $4.3$; rounding first to $4.35$ and then to $4.4$ is wrong. Also, rounding is not cutting off digits: $6.78$ to the nearest tenth is $6.8$, not $6.7$.`,
    },
    {
      kind: "aside",
      tone: "gre",
      text: String.raw`Numeric Entry questions that want a rounded answer say so, e.g. "Give your answer to the nearest hundredth." If a multiple-choice question asks for an approximate value without saying how close, pick the choice closest to the exact value (MC p. 17).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Decimals on the GRE come down to three skills: reading places correctly (and powers of 10), moving between decimals and fractions (finite decimal = integer over $10^k$; a fraction in lowest terms terminates exactly when its denominator is made of 2s and 5s), and handling the ETS rounding rule, including the "which numbers round to this?" interval.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Confusing tens with tenths. Reading a Turkish-style comma as a decimal point. Deciding "terminates or not" before reducing the fraction. Treating a patterned decimal like $0.1010010001\ldots$ as repeating. Assuming $0.3 = \frac{1}{3}$. Forgetting that a block-position remainder of 0 means the last digit of the block. Rounding in stages, or rounding negative halves toward 0.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "decimal-number-system",
      term: "decimal number system",
      turkish: "onluk sayı sistemi (onluk taban)",
      definition: String.raw`The system of writing numbers with powers of 10, in which the place value of each digit is a power of 10. On the GRE, numbers are in base 10 unless otherwise noted.`,
      source: "MR p. 14; MC p. 4",
    },
    {
      id: "digit",
      term: "digit",
      turkish: "rakam",
      definition: String.raw`One of the ten symbols 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 used to write numbers in base 10.`,
      source: "MC p. 4",
    },
    {
      id: "place-value",
      term: "place value",
      turkish: "basamak değeri",
      definition: String.raw`The power of 10 that a digit's position stands for. In $4{,}068.257$ the 6 is in the tens place, so it contributes $6 \times 10 = 60$.`,
      source: "MR p. 14",
    },
    {
      id: "decimal-point",
      term: "decimal point",
      turkish: "ondalık ayırıcı (Türkçede virgül)",
      definition: String.raw`The period written to the right of the ones digit. Commas separate groups of three digits to the left of it in numbers 1,000 or greater.`,
      source: "MC p. 4",
    },
    {
      id: "units-digit",
      term: "ones digit / units digit",
      turkish: "birler basamağındaki rakam",
      definition: String.raw`The digit immediately to the left of the decimal point; its place value is $10^0 = 1$.`,
      source: "MR p. 14; MC p. 4",
    },
    {
      id: "tens-digit",
      term: "tens, hundreds, thousands digit",
      turkish: "onlar, yüzler, binler basamağı",
      definition: String.raw`The digits one, two and three places to the left of the ones digit, with place values $10^1$, $10^2$ and $10^3$.`,
      source: "MR p. 14",
    },
    {
      id: "tenths-digit",
      term: "tenths digit",
      turkish: "onda birler basamağı",
      definition: String.raw`The first digit to the right of the decimal point; its place value is $10^{-1} = \frac{1}{10}$.`,
      source: "MR p. 14",
    },
    {
      id: "hundredths-digit",
      term: "hundredths digit",
      turkish: "yüzde birler basamağı",
      definition: String.raw`The second digit to the right of the decimal point; its place value is $10^{-2} = \frac{1}{100}$.`,
      source: "MR p. 14",
    },
    {
      id: "thousandths-digit",
      term: "thousandths digit",
      turkish: "binde birler basamağı",
      definition: String.raw`The third digit to the right of the decimal point; its place value is $10^{-3} = \frac{1}{1{,}000}$.`,
      source: "MR p. 14",
    },
    {
      id: "expanded-form",
      term: "expanded form",
      turkish: "çözümleme (basamak değerlerine ayırma)",
      definition: String.raw`A number written as the sum of each digit times its place value, e.g. $30.4 = 3(10^1) + 0(10^0) + 4(10^{-1})$.`,
      note: "Not named in the ETS Math Review",
      source: "MR pp. 14–15",
    },
    {
      id: "terminating-decimal",
      term: "terminating decimal",
      turkish: "sonlu ondalık gösterim",
      definition: String.raw`A decimal with finitely many digits after the decimal point, such as $0.4375$. Every such decimal is an integer divided by a power of 10.`,
      source: "MR p. 15",
    },
    {
      id: "repeating-decimal",
      term: "repeating decimal",
      turkish: "devirli ondalık gösterim / devirli sayı",
      definition: String.raw`A decimal in which a block of digits repeats without end, such as $0.8333\ldots = 0.8\overline{3}$.`,
      source: "MR p. 15; MC p. 4",
    },
    {
      id: "repeating-part",
      term: "repeating part (bar notation)",
      turkish: "devreden kısım (devir çizgisi)",
      definition: String.raw`The block of digits that repeats in a repeating decimal, often shown with a bar over it: $0.\overline{36} = 0.363636\ldots$.`,
      source: "MR p. 15; MC p. 4",
    },
    {
      id: "irrational-number",
      term: "irrational number",
      turkish: "irrasyonel sayı",
      definition: String.raw`A number whose decimal neither terminates nor repeats, such as $\sqrt{2}$. Irrational numbers are not rational.`,
      source: "MR p. 16",
    },
    {
      id: "rounding",
      term: "rounding",
      turkish: "yuvarlama",
      definition: String.raw`Replacing a number by the nearest value at a given place. If a positive number is exactly halfway, it is rounded to the greater possibility; if a negative number is exactly halfway, to the lesser possibility.`,
      source: "MC p. 4",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`What is the 75th digit to the right of the decimal point in the decimal equivalent of $\frac{5}{13}$ ?`,
      choices: [String.raw`$1$`, String.raw`$3$`, String.raw`$4$`, String.raw`$5$`, String.raw`$8$`],
      answer: 2,
      explanation: [
        String.raw`Divide (or use the calculator): $\frac{5}{13} = 0.384615384615\ldots = 0.\overline{384615}$, a block of 6 digits.`,
        String.raw`$75 = 6(12) + 3$, so the 75th digit is the 3rd digit of the block.`,
        String.raw`The block is 3, 8, 4, 6, 1, 5, so the answer is 4.`,
      ],
    },
    {
      id: "ex2",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`Which of the following fractions are equivalent to terminating decimals? Indicate all such fractions.`,
      choices: [String.raw`$\frac{7}{12}$`, String.raw`$\frac{21}{56}$`, String.raw`$\frac{9}{75}$`, String.raw`$\frac{11}{30}$`, String.raw`$\frac{39}{130}$`, String.raw`$\frac{14}{45}$`],
      answer: [1, 2, 4],
      explanation: [
        String.raw`Reduce each fraction first, then check whether the denominator has any prime factor other than 2 and 5.`,
        String.raw`$\frac{7}{12}$: lowest terms, $12 = 2^2 \cdot 3$. Repeats ($0.58\overline{3}$).`,
        String.raw`$\frac{21}{56} = \frac{3}{8}$, $8 = 2^3$. Terminates ($0.375$).`,
        String.raw`$\frac{9}{75} = \frac{3}{25}$, $25 = 5^2$. Terminates ($0.12$).`,
        String.raw`$\frac{11}{30}$: lowest terms, $30 = 2 \cdot 3 \cdot 5$. Repeats ($0.3\overline{6}$).`,
        String.raw`$\frac{39}{130} = \frac{3}{10}$ (both divisible by 13). Terminates ($0.3$). This is the trap: $130 = 2 \cdot 5 \cdot 13$ looks bad until you reduce.`,
        String.raw`$\frac{14}{45}$: lowest terms, $45 = 3^2 \cdot 5$. Repeats ($0.3\overline{1}$).`,
      ],
    },
    {
      id: "ex3",
      type: "qc",
      difficulty: "medium",
      given: String.raw`$x$ is a positive number. When $x$ is rounded to the nearest tenth, the result is $4.3$.`,
      quantityA: String.raw`$x$`,
      quantityB: String.raw`$4.3$`,
      answer: "D",
      explanation: [
        String.raw`By the ETS rule (halves round up for positive numbers), $x$ rounds to $4.3$ exactly when $4.25 \le x < 4.35$.`,
        String.raw`$x = 4.3$ gives equality; $x = 4.28$ makes Quantity B greater; $x = 4.34$ makes Quantity A greater.`,
        String.raw`The relationship cannot be determined: (D).`,
      ],
    },
    {
      id: "ex4",
      type: "ne",
      difficulty: "hard",
      stem: String.raw`The repeating decimal $0.2\overline{45} = 0.24545\ldots$ is equal to the fraction $\frac{a}{b}$. Give $\frac{a}{b}$ as a fraction.`,
      answer: { kind: "fraction", numerator: 27, denominator: 110 },
      explanation: [
        String.raw`Let $x = 0.2\overline{45}$. The block "45" has 2 digits, and one digit (the 2) comes before it.`,
        String.raw`$1{,}000x = 245.\overline{45}$ and $10x = 2.\overline{45}$. Both have the same repeating tail, so subtracting cancels it: $990x = 243$.`,
        String.raw`$x = \frac{243}{990} = \frac{27}{110}$ (divide by 9).`,
        String.raw`Check: $110 = 2 \cdot 5 \cdot 11$ contains an 11, so $\frac{27}{110}$ must repeat, and indeed $27 \div 110 = 0.24545\ldots$`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`In $3{,}804.6172$, which digit is the hundredths digit, and which is the hundreds digit?`,
      answer: String.raw`Hundredths: 1. Hundreds: 8.`,
      explanation: String.raw`Two places right of the point is hundredths (1); two places left of the ones digit is hundreds (8).`,
    },
    {
      id: "q2",
      prompt: String.raw`Write $0.0625$ as a fraction in lowest terms.`,
      answer: String.raw`$\frac{1}{16}$`,
      explanation: String.raw`$0.0625 = \frac{625}{10{,}000}$, and dividing both by 625 gives $\frac{1}{16}$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Does $\frac{7}{40}$ terminate? If so, what is it?`,
      answer: String.raw`Yes: $0.175$`,
      explanation: String.raw`$40 = 2^3 \cdot 5$, only 2s and 5s, so it terminates after 3 digits: $\frac{7}{40} = \frac{175}{1{,}000}$.`,
    },
    {
      id: "q4",
      prompt: String.raw`Round $-2.65$ to the nearest tenth.`,
      answer: String.raw`$-2.7$`,
      explanation: String.raw`It is exactly halfway between $-2.7$ and $-2.6$; a negative number goes to the lesser possibility (MC p. 4).`,
    },
    {
      id: "q5",
      prompt: String.raw`Which is greater, $0.\overline{3}$ or $0.333$?`,
      answer: String.raw`$0.\overline{3}$`,
      explanation: String.raw`They agree for three places, but $0.\overline{3} = 0.3333\ldots$ has a 3 in the ten-thousandths place, where $0.333$ has 0.`,
    },
    {
      id: "q6",
      prompt: String.raw`Compute $(0.12)(0.003)$.`,
      answer: String.raw`$0.00036$`,
      explanation: String.raw`$(12 \times 10^{-2})(3 \times 10^{-3}) = 36 \times 10^{-5} = 0.00036$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        quantityA: String.raw`$0.\overline{18}$`,
        quantityB: String.raw`$\frac{2}{11}$`,
        answer: "C",
        explanation: [
          String.raw`A two-digit repeating block over 99: $0.\overline{18} = \frac{18}{99} = \frac{2}{11}$.`,
          String.raw`Or divide: $2 \div 11 = 0.181818\ldots$ The quantities are equal.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$k$ is an integer with $2 \le k \le 20$, and $\frac{1}{k}$ is equivalent to a terminating decimal.`,
        quantityA: String.raw`The number of possible values of $k$`,
        quantityB: String.raw`$6$`,
        answer: "A",
        explanation: [
          String.raw`$\frac{1}{k}$ is already in lowest terms, so it terminates exactly when $k$ has no prime factors other than 2 and 5.`,
          String.raw`From 2 to 20 those are $2, 4, 5, 8, 10, 16, 20$: seven values.`,
          String.raw`$7 > 6$, so Quantity A is greater. Easy values to miss: $16 = 2^4$ ($\frac{1}{16} = 0.0625$) and $20 = 2^2 \cdot 5$ ($\frac{1}{20} = 0.05$).`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`When the positive number $x$ is rounded to the nearest tenth, the result is $6.2$. When $x$ is rounded to the nearest hundredth, the result is $r$.`,
        quantityA: String.raw`$r$`,
        quantityB: String.raw`$6.25$`,
        answer: "D",
        explanation: [
          String.raw`Rounding to $6.2$ (nearest tenth) means $6.15 \le x < 6.25$.`,
          String.raw`If $x = 6.2$, then $r = 6.20 < 6.25$, so Quantity B is greater.`,
          String.raw`If $x = 6.249$, then $x$ still rounds to $6.2$ (it is less than $6.25$), but to the nearest hundredth it rounds to $r = 6.25$, so the quantities are equal.`,
          String.raw`Both outcomes are possible, so the answer is (D). The trap is to assume that $r$ must be less than $6.25$ because $x$ is.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`$\dfrac{(0.0048)(250)}{0.06} =$`,
        choices: [String.raw`$0.2$`, String.raw`$2$`, String.raw`$20$`, String.raw`$200$`, String.raw`$2{,}000$`],
        answer: 2,
        explanation: [
          String.raw`Numerator: $(48 \times 10^{-4})(250) = 12{,}000 \times 10^{-4} = 1.2$.`,
          String.raw`$\frac{1.2}{0.06} = \frac{120}{6} = 20$ (multiply top and bottom by 100).`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`What is the sum of the first 50 digits to the right of the decimal point in the decimal equivalent of $\frac{17}{55}$ ?`,
        choices: [String.raw`$216$`, String.raw`$219$`, String.raw`$221$`, String.raw`$225$`, String.raw`$228$`],
        answer: 1,
        explanation: [
          String.raw`$\frac{17}{55} = 0.30909\ldots = 0.3\overline{09}$: the first digit is 3, then the block "09" repeats.`,
          String.raw`Digits 2 through 50 are 49 digits: they start 0, 9, 0, 9, \ldots, so the even-numbered positions 2, 4, \ldots, 50 hold 0 (25 of them) and the odd-numbered positions 3, 5, \ldots, 49 hold 9 (24 of them).`,
          String.raw`Sum $= 3 + 24(9) = 3 + 216 = 219$.`,
          String.raw`Traps: 216 forgets the leading 3; 225 counts 25 nines.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "easy",
        stem: String.raw`If $t = 5(10^2) + 3(10^{-1}) + 7(10^{-3})$, what is the value of $t$ ?`,
        choices: [String.raw`$50.307$`, String.raw`$500.307$`, String.raw`$500.37$`, String.raw`$503.07$`, String.raw`$5{,}000.307$`],
        answer: 1,
        explanation: [
          String.raw`$5(10^2) = 500$, $3(10^{-1}) = 0.3$ and $7(10^{-3}) = 0.007$.`,
          String.raw`The hundredths place gets a 0 because no $10^{-2}$ term appears: $t = 500.307$.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`When the number $x$ is rounded to the nearest hundredth, the result is $-4.27$. Which of the following could be the value of $x$ ? Indicate all such values.`,
        choices: [String.raw`$-4.2751$`, String.raw`$-4.275$`, String.raw`$-4.2738$`, String.raw`$-4.27$`, String.raw`$-4.2652$`, String.raw`$-4.265$`, String.raw`$-4.2649$`],
        answer: [2, 3, 4, 5],
        explanation: [
          String.raw`For negative numbers, an exact half goes to the lesser possibility (MC p. 4). So $-4.275$ rounds to $-4.28$, and $-4.265$ rounds to $-4.27$.`,
          String.raw`Hence $x$ rounds to $-4.27$ exactly when $-4.275 < x \le -4.265$.`,
          String.raw`$-4.2751$ and $-4.275$ round to $-4.28$: no. $-4.2738$, $-4.27$, $-4.2652$ and $-4.265$: yes. $-4.2649$ is closer to $-4.26$: no.`,
          String.raw`Trap: using the positive-number habit ("halves round up") would include $-4.275$ and exclude $-4.265$, the exact reverse of the ETS rule.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following numbers are rational? Indicate all such numbers.`,
        choices: [
          String.raw`$0.\overline{37}$`,
          String.raw`$5.0125$`,
          String.raw`$0.5055055505555\ldots$, in which each group of 5s has one more 5 than the group before it`,
          String.raw`$\frac{\pi}{4}$`,
          String.raw`$0.12\overline{7}$`,
        ],
        answer: [0, 1, 4],
        explanation: [
          String.raw`Rational exactly when the decimal terminates or repeats (MR p. 16).`,
          String.raw`$0.\overline{37}$ repeats ($= \frac{37}{99}$): rational. $5.0125$ terminates ($= \frac{50{,}125}{10{,}000}$): rational. $0.12\overline{7}$ repeats: rational.`,
          String.raw`The patterned decimal never settles into a fixed repeating block, so it is irrational, like the Math Review's own example of this kind.`,
          String.raw`$\frac{\pi}{4}$ is a fractional expression, not a fraction: $\pi$ is irrational, and an irrational number divided by 4 is still irrational (if $\frac{\pi}{4}$ were a fraction $\frac{c}{d}$, then $\pi = \frac{4c}{d}$ would be one too).`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`What is the value of $\left(0.\overline{3}\right)\left(0.\overline{81}\right)$ ? Give your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 3, denominator: 11 },
        explanation: [
          String.raw`Convert each repeating decimal: $0.\overline{3} = \frac{3}{9} = \frac{1}{3}$ and $0.\overline{81} = \frac{81}{99} = \frac{9}{11}$.`,
          String.raw`Multiply: $\frac{1}{3}\cdot\frac{9}{11} = \frac{3}{11}$.`,
          String.raw`Check: $\frac{3}{11} = 0.\overline{27}$, and $(0.3333)(0.8181) \approx 0.2727$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`When $\frac{1}{(2^4)(5^7)}$ is written as a decimal, how many zeros are there between the decimal point and the first nonzero digit?`,
        answer: { kind: "decimal", value: "6" },
        explanation: [
          String.raw`Make the denominator a power of 10 by supplying the missing 2s: multiply top and bottom by $2^3$.`,
          String.raw`$\frac{1}{(2^4)(5^7)} = \frac{2^3}{(2^7)(5^7)} = \frac{8}{10^7} = 0.0000008$.`,
          String.raw`The 8 is in the 7th place after the point, so 6 zeros come before it.`,
        ],
      },
    ],
  },
};

export default section;
