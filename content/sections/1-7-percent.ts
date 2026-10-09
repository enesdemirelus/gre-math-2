import type { Section } from "../types";

const section: Section = {
  id: "1-7-percent",
  number: "1.7",
  title: "Percent",
  part: "arithmetic",
  mrPages: "21–27",
  summary: String.raw`Percent as "per hundred": finding a part, a whole or a percent, percents above 100%, and percent change measured from the initial value. The GRE's favourite traps live here: the wrong base, "percent of" versus "percent greater than", and successive changes that do not add.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Percent means per hundred" },
    {
      kind: "p",
      text: String.raw`The word [[percent]] means _per hundred_, or _hundredths_. A percent is a ratio that usually describes a [[part]] of a [[whole]], where the whole is thought of as 100 parts: 32 percent is 32 parts out of 100. Every percent has a fraction equivalent, with the part in the numerator and the whole in the denominator, and a [[decimal-equivalent|decimal equivalent]] (MR p. 21). The symbol $\%$ simply replaces the word "percent."`,
    },
    { kind: "math", tex: String.raw`p\% = \frac{p}{100}, \qquad 7\% = \frac{7}{100} = 0.07, \qquad 0.4\% = \frac{0.4}{100} = 0.004`, key: true },
    {
      kind: "p",
      text: String.raw`Converting is just moving the decimal point two places: to go from a percent to a decimal, divide by 100; to go from a decimal to a percent, multiply by 100 and attach the symbol. In practice you will almost always compute with the decimal (or a simple fraction such as $25\% = \frac{1}{4}$, $12.5\% = \frac{1}{8}$, $40\% = \frac{2}{5}$) and only convert back to a percent at the end.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "The symbol matters",
      text: String.raw`$0.05$ and $0.05\%$ are different numbers. $0.05 = 5\%$, but $0.05\% = \frac{0.05}{100} = 0.0005$, a hundred times smaller (MR p. 22). Percents below 1% show up in interest-rate and data questions; read the % sign carefully.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Part, whole and percent" },
    {
      kind: "p",
      text: String.raw`Almost every basic percent question links three numbers, the part, the whole and the percent, and gives you two of them. One relationship covers all three cases. Write it either with the decimal equivalent or as a proportion; the Math Review uses both (MR pp. 22–24).`,
    },
    { kind: "math", tex: String.raw`\text{part} = \frac{p}{100}\cdot\text{whole} \qquad\Longleftrightarrow\qquad \frac{\text{part}}{\text{whole}} = \frac{p}{100}`, key: true },
    {
      kind: "p",
      text: String.raw`**Find the percent:** divide the part by the whole, then multiply by 100. "27 is what percent of 36?" gives $\frac{27}{36} = 0.75 = 75\%$. **Find the part:** multiply the whole by the decimal. $35\%$ of $260$ is $0.35 \times 260 = 91$. **Find the whole:** divide the part by the decimal. "54 is 45% of what number?" gives $0.45z = 54$, so $z = \frac{54}{0.45} = 120$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Translate word by word",
      text: String.raw`In a percent sentence, "of" means multiply, "is" means equals, and "what number" is the unknown. "18 is 40% of what number?" becomes $18 = 0.4z$. The number right after "of" is the whole. This also tells you that $a\%$ of $b$ equals $b\%$ of $a$, since both are $\frac{ab}{100}$: $8\%$ of $75$ is the same as $75\%$ of $8$, which is 6.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The base, and percents greater than 100%" },
    {
      kind: "p",
      text: String.raw`Nothing forces the part to be smaller than the whole. In general the whole is called the [[base]] of the percent, and when the number being compared is greater than the base, the percent is greater than 100% (MR p. 24). For instance, 63 is $175\%$ of 36, because $\frac{63}{36} = 1.75$; and $240\%$ of $15$ is $2.4 \times 15 = 36$. The decimal equivalent of $175\%$ is $1.75$, and of $240\%$ is $2.4$.`,
    },
    {
      kind: "p",
      text: String.raw`Thinking "base" rather than "whole" is what makes the harder questions work. In "$A$ is what percent of $B$?" the base is $B$, the quantity after "of," and you always divide by the base. Swapping the roles changes the answer: 63 is $175\%$ of 36, but 36 is only about $57.1\%$ of 63.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Percent change: measure from where you started" },
    {
      kind: "p",
      text: String.raw`When a quantity changes from one positive amount to another, the amount of change can be expressed as a percent of the _initial_ amount. This is the [[percent-change|percent change]] (MR p. 24). If the quantity went up, it is a [[percent-increase|percent increase]]; if it went down, a [[percent-decrease|percent decrease]]. In both cases the base is the initial value, before the change (MR p. 25).`,
    },
    { kind: "math", tex: String.raw`\text{percent change} = \frac{\text{new} - \text{old}}{\text{old}} \times 100\%`, key: true },
    {
      kind: "p",
      text: String.raw`A salary that rises from $\$48{,}000$ to $\$54{,}000$ has increased by $\frac{6{,}000}{48{,}000} = 12.5\%$. A price that falls from $\$250$ to $\$215$ has decreased by $\frac{35}{250} = 14\%$. If a quantity doubles, the increase equals the starting amount, so the percent increase is $100\%$ (MR p. 25), not $200\%$. Tripling is a $200\%$ increase, and in general a quantity that becomes $k$ times as large has increased by $(k - 1) \times 100\%$.`,
    },
    {
      kind: "interactive",
      key: "1-7-percent/percent-change-calculator",
      title: "Percent change calculator",
      caption: String.raw`Set an old and a new value. The change is always divided by the old value, the base. Notice that the trip back (new to old) has the same amount of change but a different base, so a different percent.`,
    },
    {
      kind: "p",
      text: String.raw`The calculator shows an asymmetry that the GRE tests constantly. Going from 80 to 100 is a $\frac{20}{80} = 25\%$ increase, but going back from 100 to 80 is only a $\frac{20}{100} = 20\%$ decrease. The amount of change is the same; the base is not. For an increase the base is the smaller number, and for a decrease it is the larger number (MR p. 25), so for the same two numbers the percent increase is always larger than the percent decrease.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Undoing a change",
      text: String.raw`A 20% decrease is _not_ undone by a 20% increase. To get from 80 back to 100 you need 25%. Likewise, if a price after a 25% increase is $\$150$, the original price is $\frac{150}{1.25} = \$120$, not $150 - 0.25(150) = \$112.50$: the 25% was a percent of the original, which is unknown, so divide by the multiplier.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Applying a change: multiply by one number" },
    {
      kind: "p",
      text: String.raw`To increase a quantity by $12\%$ you can compute $12\%$ of it and add, but it is faster to notice that the result is $100\% + 12\% = 112\%$ of the original, so you multiply by $1.12$ (MR pp. 25–26). In the same way, a decrease of $8\%$ leaves $100\% - 8\% = 92\%$, a factor of $0.92$. Prep books call this factor the [[multiplier]]; the Math Review just writes the decimal equivalent of the new percent.`,
    },
    { kind: "math", tex: String.raw`\text{increase by } p\%: \;\times\left(1 + \frac{p}{100}\right) \qquad \text{decrease by } p\%: \;\times\left(1 - \frac{p}{100}\right)`, key: true },
    {
      kind: "p",
      text: String.raw`So $\$2{,}400$ increased by $15\%$ is $2{,}400 \times 1.15 = \$2{,}760$, and $\$2{,}400$ decreased by $15\%$ is $2{,}400 \times 0.85 = \$2{,}040$. The multiplier also turns "find the original" questions into one division: if $\$2{,}040$ is the price after a $15\%$ cut, the original is $\frac{2{,}040}{0.85} = \$2{,}400$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: '"Percent of" versus "percent greater than"' },
    {
      kind: "p",
      text: String.raw`These two phrasings sound alike and differ by exactly 100 percentage points. "$A$ is $p\%$ of $B$" means $A = \frac{p}{100}B$. "$A$ is $p\%$ [[percent-greater-than|greater than]] $B$" (or "more than") describes a percent increase with $B$ as the base, so $A = \left(1 + \frac{p}{100}\right)B$; similarly "$A$ is $p\%$ less than $B$" means $A = \left(1 - \frac{p}{100}\right)B$. The Math Review reads "8% less than" the earlier enrollment as $0.92$ times it and "6% greater than" as $1.06$ times it (MR p. 26).`,
    },
    {
      kind: "p",
      text: String.raw`So if $A = 90$ and $B = 60$, then $A$ is $150\%$ of $B$ but only $50\%$ greater than $B$; and $B$ is $\frac{30}{90} \approx 33.3\%$ less than $A$, since now $A$ is the base. Every "greater than" or "less than" statement has a base: the quantity after "than."`,
    },
    {
      kind: "aside",
      tone: "gre",
      text: String.raw`GRE answer choices are built from these mix-ups. If the correct statement is "$A$ is $150\%$ of $B$," expect "$A$ is $150\%$ greater than $B$" among the choices, and if $A$ is $25\%$ greater than $B$, expect "$B$ is $25\%$ less than $A$" (it is actually $20\%$ less). Before choosing, rewrite each claim as an equation with a multiplier.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Successive percent changes" },
    {
      kind: "p",
      text: String.raw`A quantity can undergo several [[successive-percent-changes|successive percent changes]], and the base of each change is the result of the one before (MR p. 26). With multipliers this is painless: apply them one after another. A $10\%$ decrease followed by a $30\%$ increase multiplies the original by $0.90 \times 1.30 = 1.17$, a net $17\%$ increase, not the $20\%$ you get by adding.`,
    },
    { kind: "math", tex: String.raw`\left(1 + \frac{a}{100}\right)\left(1 + \frac{b}{100}\right) = 1 + \frac{a + b}{100} + \frac{ab}{10{,}000}`, key: true },
    {
      kind: "p",
      text: String.raw`Here $a$ and $b$ are signed (negative for a decrease). The extra term $\frac{ab}{10{,}000}$ is why percent changes do not simply add. When one change is up and the other down, $ab$ is negative and the net result is _below_ the sum. The classic case: up $20\%$ then down $20\%$ gives $1.2 \times 0.8 = 0.96$, a net $4\%$ decrease. Because multiplication is commutative, the order does not matter: down $20\%$ then up $20\%$ also gives $0.96$.`,
    },
    {
      kind: "interactive",
      key: "1-7-percent/successive-change-explorer",
      title: "Successive change explorer",
      caption: String.raw`Start at 100 and apply two percent changes in a row. Compare the true net change with the naive sum $a + b$; the gap is always $\frac{ab}{100}$ percentage points.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Start with 100",
      text: String.raw`When a question gives only percents and no actual amounts, let the original quantity be 100. Then every intermediate value is itself a percent of the original, and the final answer can be read off directly: $100 \to 110 \to 99$ is a net $1\%$ decrease.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Percent versus percentage points" },
    {
      kind: "p",
      text: String.raw`When the quantities being compared are themselves percents, there are two different ways to describe a change. If a rate goes from $20\%$ to $25\%$, it has risen by 5 [[percentage-point|percentage points]] (the plain difference), but by $\frac{5}{20} = 25\%$ in the percent-change sense. The Math Review uses the phrase in a data example and adds the more important warning: a rise from $20\%$ to $22.1\%$ of a smaller total can be a _decrease_ in the actual number, because "the bases of the percents are different" (MR p. 182).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Every percent question comes down to one question: _percent of what?_ Identify the base (the whole, the initial value, or the quantity after "of" or "than"), turn every percent into a decimal or a multiplier, and chain the multipliers. If amounts are missing, start from 100.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Dividing a change by the new value instead of the old one. Calling a doubling a $200\%$ increase (it is $100\%$). Adding successive percent changes ($+20\%$ then $-20\%$ is $-4\%$, not $0\%$). Undoing an increase of $p\%$ with a decrease of $p\%$. Confusing "$150\%$ of" with "$150\%$ greater than." Comparing two percents of different totals as if they were amounts. And misreading $0.5\%$ as $0.5$.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "percent",
      term: "percent (%)",
      turkish: "yüzde (%)",
      definition: String.raw`Per hundred, or hundredths. Percents are ratios often used to represent parts of a whole, where the whole is considered as having 100 parts; they can be converted to fraction or decimal equivalents.`,
      formula: String.raw`p\% = \frac{p}{100}`,
      source: "MR p. 21",
    },
    {
      id: "part",
      term: "part",
      turkish: "parça / kısım",
      definition: String.raw`In the fraction equivalent of a percent, the numerator: the amount being expressed as a percent of the whole.`,
      formula: String.raw`\frac{\text{part}}{\text{whole}} = \frac{p}{100}`,
      source: "MR pp. 21–22",
    },
    {
      id: "whole",
      term: "whole",
      turkish: "bütün",
      definition: String.raw`In the fraction equivalent of a percent, the denominator: the amount that counts as $100\%$. More generally it is called the base.`,
      source: "MR pp. 21–22, 24",
    },
    {
      id: "decimal-equivalent",
      term: "decimal equivalent (of a percent)",
      turkish: "ondalık gösterim / ondalık karşılık",
      definition: String.raw`The decimal obtained by dividing the percent by 100, e.g. $12\% = 0.12$ and $250\% = 2.5$. To find a percent of a number, multiply the number by this decimal.`,
      source: "MR pp. 21–24",
    },
    {
      id: "base",
      term: "base (of a percent)",
      turkish: "esas değer / ilk değer (başlangıç değeri)",
      definition: String.raw`The whole that a percent is taken of. When the number compared is greater than the base, the percent is greater than $100\%$. For a percent change, the base is the initial value, before the change.`,
      source: "MR pp. 24–25",
    },
    {
      id: "percent-change",
      term: "percent change",
      turkish: "yüzde değişim",
      definition: String.raw`When a quantity changes from an initial positive amount to another positive amount, the amount of change expressed as a percent of the initial amount.`,
      formula: String.raw`\frac{\text{new} - \text{old}}{\text{old}} \times 100\%`,
      source: "MR pp. 24–25",
    },
    {
      id: "percent-increase",
      term: "percent increase",
      turkish: "yüzde artış",
      definition: String.raw`The amount of increase divided by the base (the initial, smaller value), expressed as a percent. A quantity that doubles has a $100\%$ increase.`,
      formula: String.raw`\frac{\text{amount of increase}}{\text{base}} \times 100\%`,
      source: "MR p. 25",
    },
    {
      id: "percent-decrease",
      term: "percent decrease",
      turkish: "yüzde azalış / yüzde azalma",
      definition: String.raw`The amount of decrease divided by the base (the initial, larger value), expressed as a percent.`,
      formula: String.raw`\frac{\text{amount of decrease}}{\text{base}} \times 100\%`,
      source: "MR p. 25",
    },
    {
      id: "successive-percent-changes",
      term: "successive percent changes",
      turkish: "ardışık yüzde değişimler",
      definition: String.raw`Several percent changes applied one after another, where the base of each change is the result of the preceding change. The multipliers multiply; the percents do not add.`,
      source: "MR pp. 26–27",
    },
    {
      id: "percent-greater-than",
      term: "p% greater than / p% less than",
      turkish: "%p fazlası / %p eksiği",
      definition: String.raw`"$A$ is $p\%$ greater than $B$" means $A = \left(1 + \frac{p}{100}\right)B$; "$A$ is $p\%$ less than $B$" means $A = \left(1 - \frac{p}{100}\right)B$. This is a percent change with base $B$, the initial quantity (MR p. 25), read as in the MR's example "6% greater than" $= 1.06\times$ (MR p. 26).`,
      source: "MR pp. 25–26",
    },
    {
      id: "multiplier",
      term: "multiplier (growth factor)",
      turkish: "çarpan",
      definition: String.raw`The decimal equivalent of the new percent after a change: $1.12$ for a $12\%$ increase, $0.92$ for an $8\%$ decrease. Multiplying by it applies the change in one step.`,
      note: "Not named in the ETS Math Review",
      source: "MR pp. 25–26",
    },
    {
      id: "percentage-point",
      term: "percentage point",
      turkish: "yüzde puan",
      definition: String.raw`The unit for the plain difference between two percents: a change from $20\%$ to $25\%$ is an increase of 5 percentage points, which is a $25\%$ increase.`,
      note: "Used but not defined in the ETS Math Review (only in a data analysis example)",
      source: "MR p. 182",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`After its price was reduced by 15 percent, a jacket sold for $\$153$. What was the price of the jacket before the reduction?`,
      choices: [String.raw`$\$130.05$`, String.raw`$\$168.00$`, String.raw`$\$175.95$`, String.raw`$\$180.00$`, String.raw`$\$183.60$`],
      answer: 3,
      explanation: [
        String.raw`Let the original price be $P$. A 15% reduction leaves $85\%$ of $P$, so $0.85P = 153$.`,
        String.raw`$P = \frac{153}{0.85} = 180$.`,
        String.raw`Check: $15\%$ of $180$ is $27$, and $180 - 27 = 153$.`,
        String.raw`Trap: $\$175.95 = 153 \times 1.15$ adds 15% of the _sale_ price. The 15% was a percent of the original price, which is the base, so divide by the multiplier instead.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`$k$, $m$ and $n$ are positive. $k$ is $60\%$ greater than $m$, and $m$ is $60\%$ less than $n$.`,
      quantityA: String.raw`$k$`,
      quantityB: String.raw`$n$`,
      answer: "B",
      explanation: [
        String.raw`Translate each statement into a multiplier. "$k$ is 60% greater than $m$": $k = 1.6m$. "$m$ is 60% less than $n$": $m = 0.4n$.`,
        String.raw`Substitute: $k = 1.6(0.4n) = 0.64n$.`,
        String.raw`Since $n > 0$, $0.64n < n$, so Quantity B is greater.`,
        String.raw`Trap: "$+60\%$ and $-60\%$ cancel" gives (C). The two percents have different bases ($m$ and $n$), so they do not cancel.`,
      ],
    },
    {
      id: "ex3",
      type: "ne",
      difficulty: "hard",
      stem: String.raw`Of the people who answered a survey, $40\%$ were adults and the rest were teenagers. If $25\%$ of the adults and $60\%$ of the teenagers answered "yes" to the first question, what percent of the people who answered "yes" were adults? Give your answer to the nearest tenth of a percent.`,
      answer: { kind: "decimal", value: "21.7" },
      suffix: "%",
      explanation: [
        String.raw`No totals are given, so suppose 100 people answered: 40 adults and 60 teenagers.`,
        String.raw`"Yes" answers: $0.25 \times 40 = 10$ adults and $0.60 \times 60 = 36$ teenagers, for 46 in all.`,
        String.raw`The base is now the 46 "yes" answers: $\frac{10}{46} \approx 0.2174$, so about $21.7\%$.`,
        String.raw`Trap: $25\%$ is the percent of _adults_ who said yes; the question asks for a percent of the _yes group_. Changing the base changes the answer.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`$X$ and $Y$ are positive, and $X$ is $25\%$ greater than $Y$. Which of the following statements must be true? Indicate all such statements.`,
      choices: [
        String.raw`$Y$ is $20\%$ less than $X$.`,
        String.raw`$Y$ is $25\%$ less than $X$.`,
        String.raw`$X$ is $125\%$ of $Y$.`,
        String.raw`$Y$ is $80\%$ of $X$.`,
        String.raw`$X - Y$ is $25\%$ of $X$.`,
      ],
      answer: [0, 2, 3],
      explanation: [
        String.raw`Write the given as $X = 1.25Y$, so $Y = \frac{X}{1.25} = 0.8X$.`,
        String.raw`$Y = 0.8X$ says both "$Y$ is $80\%$ of $X$" (true) and "$Y$ is $20\%$ less than $X$" (true). So "$25\%$ less" is false.`,
        String.raw`$X = 1.25Y$ is "$X$ is $125\%$ of $Y$": true.`,
        String.raw`$X - Y = 0.25Y = 0.2X$, which is $25\%$ of $Y$ but $20\%$ of $X$: the last statement is false.`,
        String.raw`Answer: the first, third and fourth statements.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`What is $0.5\%$ of $840$?`,
      answer: String.raw`$4.2$`,
      explanation: String.raw`$0.5\% = 0.005$, and $0.005 \times 840 = 4.2$.`,
    },
    {
      id: "q2",
      prompt: String.raw`18 is what percent of 15?`,
      answer: String.raw`$120\%$`,
      explanation: String.raw`The base is 15: $\frac{18}{15} = 1.2 = 120\%$.`,
    },
    {
      id: "q3",
      prompt: String.raw`42 is $35\%$ of what number?`,
      answer: String.raw`$120$`,
      explanation: String.raw`$0.35z = 42$, so $z = \frac{42}{0.35} = 120$.`,
    },
    {
      id: "q4",
      prompt: String.raw`A value rises from 80 to 100. What is the percent increase? If it then falls back from 100 to 80, what is the percent decrease?`,
      answer: String.raw`$25\%$ increase; $20\%$ decrease`,
      explanation: String.raw`The change is 20 both times, but the bases are 80 and then 100.`,
    },
    {
      id: "q5",
      prompt: String.raw`A price is increased by $8\%$ and the new price is then decreased by $8\%$. What is the net percent change?`,
      answer: String.raw`a $0.64\%$ decrease`,
      explanation: String.raw`$1.08 \times 0.92 = 0.9936 = 99.36\%$ of the original, which is $0.64\%$ less than $100\%$.`,
    },
    {
      id: "q6",
      prompt: String.raw`An interest rate goes from $4\%$ to $5\%$. By how many percentage points did it rise, and by what percent?`,
      answer: String.raw`1 percentage point; $25\%$`,
      explanation: String.raw`The difference is $5 - 4 = 1$ point; the percent increase is $\frac{1}{4} = 25\%$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$x$ and $y$ are positive numbers with $x > y$.`,
        quantityA: String.raw`The number obtained by taking $x\%$ of $y$ and then increasing the result by $y\%$`,
        quantityB: String.raw`The number obtained by taking $y\%$ of $x$ and then increasing the result by $x\%$`,
        answer: "B",
        explanation: [
          String.raw`First steps: $x\%$ of $y$ is $\frac{xy}{100}$, and $y\%$ of $x$ is also $\frac{xy}{100}$. Swapping the percent and the number never changes "percent of".`,
          String.raw`The increases are different. Quantity A is $\frac{xy}{100}\left(1 + \frac{y}{100}\right)$ and Quantity B is $\frac{xy}{100}\left(1 + \frac{x}{100}\right)$.`,
          String.raw`The common factor $\frac{xy}{100}$ is positive, so compare $1 + \frac{y}{100}$ with $1 + \frac{x}{100}$. Since $x > y$, Quantity B is greater. (Check: $x = 50$, $y = 20$ gives $10 \times 1.2 = 12$ versus $10 \times 1.5 = 15$.)`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "medium",
        given: String.raw`The price of item $P$ was increased by $p$ percent and the price of item $Q$ was decreased by $p$ percent, where $0 < p < 100$. After these changes, the prices of $P$ and $Q$ were equal.`,
        quantityA: String.raw`The price of $P$ before the change`,
        quantityB: String.raw`The price of $Q$ before the change`,
        answer: "B",
        explanation: [
          String.raw`Let the original prices be $P$ and $Q$. Then $P\left(1 + \frac{p}{100}\right) = Q\left(1 - \frac{p}{100}\right)$.`,
          String.raw`Since $0 < p < 100$, the left multiplier is greater than 1 and the right multiplier is between 0 and 1. For the products to be equal, $P$ must be smaller than $Q$.`,
          String.raw`For example, with $p = 20$: $1.2P = 0.8Q$ gives $Q = 1.5P$. Quantity B is greater, whatever $p$ is.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`In 2019, $30\%$ of the employees of Company K worked remotely. In 2020, the number of employees was $20\%$ greater than in 2019, and $35\%$ of the 2020 employees worked remotely.`,
        quantityA: String.raw`The percent increase in the number of employees working remotely from 2019 to 2020`,
        quantityB: String.raw`$40\%$`,
        answer: "C",
        explanation: [
          String.raw`Let the 2019 workforce be 100. Then 30 worked remotely.`,
          String.raw`In 2020 there were $1.2 \times 100 = 120$ employees, and $0.35 \times 120 = 42$ worked remotely.`,
          String.raw`Percent increase $= \frac{42 - 30}{30} = \frac{12}{30} = 40\%$. The quantities are equal.`,
          String.raw`Traps: "5" treats the change from $30\%$ to $35\%$ (5 percentage points) as the answer; $\frac{5}{30} \approx 16.7\%$ ignores that the base of the percents grew by $20\%$.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A store sets the list price of a lamp $60\%$ above the store's cost. During a sale, the lamp is sold for $25\%$ off the list price. The store's profit on the sale is what percent of the store's cost?`,
        choices: [String.raw`$15\%$`, String.raw`$20\%$`, String.raw`$25\%$`, String.raw`$35\%$`, String.raw`$45\%$`],
        answer: 1,
        explanation: [
          String.raw`Let the cost be 100. The list price is $1.6 \times 100 = 160$.`,
          String.raw`The sale price is $0.75 \times 160 = 120$.`,
          String.raw`Profit $= 120 - 100 = 20$, which is $20\%$ of the cost of 100.`,
          String.raw`Trap: $60\% - 25\% = 35\%$ adds percents with different bases (cost and list price).`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`If $x$ is $150\%$ greater than $y$, and $y$ is $20\%$ of $z$, where $x$, $y$ and $z$ are positive, then $x$ is what percent of $z$?`,
        choices: [String.raw`$30\%$`, String.raw`$34\%$`, String.raw`$50\%$`, String.raw`$130\%$`, String.raw`$170\%$`],
        answer: 2,
        explanation: [
          String.raw`"$150\%$ greater than $y$" means $x = (1 + 1.5)y = 2.5y$.`,
          String.raw`"$y$ is $20\%$ of $z$" means $y = 0.2z$.`,
          String.raw`So $x = 2.5(0.2z) = 0.5z$, and $x$ is $50\%$ of $z$.`,
          String.raw`Trap: reading "$150\%$ greater than" as "$150\%$ of" gives $1.5 \times 0.2 = 0.3$, or $30\%$.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`The price of a share of stock increased by $25\%$ and then decreased by $p\%$. After both changes, the price was $10\%$ less than the price before the increase. What is the value of $p$?`,
        choices: [String.raw`$15$`, String.raw`$25$`, String.raw`$28$`, String.raw`$30$`, String.raw`$35$`],
        answer: 2,
        explanation: [
          String.raw`With multipliers: $1.25\left(1 - \frac{p}{100}\right) = 0.90$.`,
          String.raw`So $1 - \frac{p}{100} = \frac{0.90}{1.25} = 0.72$, and $p = 28$.`,
          String.raw`Check with a price of 100: $100 \to 125 \to 125 \times 0.72 = 90$, which is $10\%$ below 100.`,
          String.raw`Trap: $25 + 10 = 35$ adds the percents. The second change has the larger base 125, so a smaller percent suffices.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`From 2020 to 2021, the value of a certain index increased by $50\%$. From 2021 to 2022, the value of the index decreased by $40\%$. Which of the following statements must be true? Indicate all such statements.`,
        choices: [
          String.raw`The value in 2022 was $10\%$ less than the value in 2020.`,
          String.raw`The value in 2020 was $10\%$ greater than the value in 2022.`,
          String.raw`The amount of the decrease from 2021 to 2022 was greater than the amount of the increase from 2020 to 2021.`,
          String.raw`The value in 2021 was more than $60\%$ greater than the value in 2022.`,
          String.raw`The value in 2022 was $90\%$ less than the value in 2020.`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`Let the 2020 value be 100. Then 2021 is $1.5 \times 100 = 150$ and 2022 is $0.6 \times 150 = 90$.`,
          String.raw`First: $90$ is $10\%$ less than $100$. True.`,
          String.raw`Second: the base is now 90; $\frac{100 - 90}{90} \approx 11.1\%$, not $10\%$. False.`,
          String.raw`Third: the decrease is $150 - 90 = 60$, the increase is $150 - 100 = 50$. True: $40\%$ is the smaller percent, but it is taken of the larger base 150.`,
          String.raw`Fourth: $\frac{150 - 90}{90} = \frac{2}{3} \approx 66.7\% > 60\%$. True.`,
          String.raw`Fifth: $90$ is $90\%$ _of_ $100$, which is $10\%$ less, not $90\%$ less. False.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Which of the following quantities are greater than 60? Indicate all such quantities.`,
        choices: [
          String.raw`$250\%$ of $24$`,
          String.raw`$0.6\%$ of $12{,}000$`,
          String.raw`The number that is $125\%$ greater than $28$`,
          String.raw`The number that is $40\%$ less than $105$`,
          String.raw`The result of decreasing $75$ by $20\%$`,
          String.raw`$15\%$ of $15\%$ of $2{,}800$`,
        ],
        answer: [1, 2, 3, 5],
        explanation: [
          String.raw`$250\%$ of $24$: $2.5 \times 24 = 60$, not greater than 60.`,
          String.raw`$0.6\%$ of $12{,}000$: $0.006 \times 12{,}000 = 72$. Yes.`,
          String.raw`$125\%$ greater than $28$: $2.25 \times 28 = 63$. Yes. (Reading it as $125\%$ of 28 gives 35.)`,
          String.raw`$40\%$ less than $105$: $0.6 \times 105 = 63$. Yes.`,
          String.raw`$75$ decreased by $20\%$: $0.8 \times 75 = 60$. No.`,
          String.raw`$15\%$ of $15\%$ of $2{,}800$: $0.15 \times 0.15 \times 2{,}800 = 0.0225 \times 2{,}800 = 63$. Yes.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`A 40-kilogram mixture of sand and gravel is $15\%$ sand by weight. How many kilograms of sand must be added so that the resulting mixture is $32\%$ sand by weight?`,
        answer: { kind: "decimal", value: "10" },
        suffix: "kilograms",
        explanation: [
          String.raw`The mixture contains $0.15 \times 40 = 6$ kilograms of sand.`,
          String.raw`Adding $x$ kilograms of sand raises both the part and the whole: $\frac{6 + x}{40 + x} = 0.32$.`,
          String.raw`$6 + x = 12.8 + 0.32x$, so $0.68x = 6.8$ and $x = 10$.`,
          String.raw`Check: $\frac{16}{50} = 32\%$. Trap: $(0.32 - 0.15) \times 40 = 6.8$ forgets that the whole grows too.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`In an election, $62.5\%$ of the 48,000 registered voters voted. In the next election, the number of registered voters was $5\%$ greater, and $60\%$ of the registered voters voted. By what percent did the number of people who voted increase from the first election to the next?`,
        answer: { kind: "decimal", value: "0.8" },
        suffix: "%",
        explanation: [
          String.raw`First election: $0.625 \times 48{,}000 = 30{,}000$ voted.`,
          String.raw`Next election: $1.05 \times 48{,}000 = 50{,}400$ registered, and $0.6 \times 50{,}400 = 30{,}240$ voted.`,
          String.raw`Percent increase $= \frac{30{,}240 - 30{,}000}{30{,}000} = \frac{240}{30{,}000} = 0.008 = 0.8\%$.`,
          String.raw`Faster: the multiplier is $\frac{1.05 \times 0.6}{0.625} = 1.008$. Trap: the turnout rate fell by 2.5 percentage points, yet the number of voters rose, because the base grew.`,
        ],
      },
    ],
  },
};

export default section;
