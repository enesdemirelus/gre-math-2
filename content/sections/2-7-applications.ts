import type { Section } from "../types";

const section: Section = {
  id: "2-7-applications",
  number: "2.7",
  title: "Applications",
  part: "algebra",
  mrPages: "54–61",
  summary: String.raw`Word problems the GRE builds from algebra: translating words into expressions, averages, mixtures, distance–rate–time, work, two-unknown systems, profit, and simple and compound interest. The skill is the same every time: name the unknown, find the one quantity that is conserved or added, and write one equation.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "From words to algebra" },
    {
      kind: "p",
      text: String.raw`Every [[word-problem|word problem]] starts with a translation. The Math Review calls translating verbal descriptions into algebraic expressions "an essential initial step," and in its first worked example it adds that assigning a variable to the quantity being sought "is an important beginning to solving the problem" (MR pp. 54–55). So the first line of your scratch work should always be a sentence of the form "let $x$ be …", with units.`,
    },
    {
      kind: "p",
      text: String.raw`Most translations are mechanical once you read them slowly. "The square of $x$ is multiplied by 3, and then 5 is subtracted" is $3x^2 - 5$. A price $p$ "decreased by 15 percent" is $0.85p$, and a salary $s$ "increased by 8 percent" is $1.08s$. If $y$ liters are shared so that one person gets 2 liters and the other 3 people split the rest equally, each of the 3 gets $\frac{y-2}{3}$ liters (MR p. 54 has examples of exactly this kind).`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Order and grouping",
      text: String.raw`"7 less than $x$" is $x - 7$, not $7 - x$. "Twice the sum of $x$ and 5" is $2(x + 5)$, but "the sum of twice $x$ and 5" is $2x + 5$. The conventions add a related rule: a mathematical expression inside a phrase is read on its own first, and only then together with the words (MC p. 18). And "the difference between" two quantities means the greater minus the lesser unless the question says otherwise (MC p. 17).`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "What the context gives you for free",
      text: String.raw`If a variable counts existing objects or is an amount of money, the context implies it is positive unless the question says otherwise (MC pp. 17–18). Numbers in a question are exact, even if in real life they would be rounded (MC p. 17). Common unit conversions such as minutes to hours or cents to dollars are not given to you; less common ones are (MC p. 18).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Average problems" },
    {
      kind: "p",
      text: String.raw`The [[average|average (arithmetic mean)]] of $n$ numbers is their sum divided by $n$. In word problems the useful form is the one solved for the sum, because sums are what you can add and subtract when numbers join or leave a group.`,
    },
    { kind: "math", tex: String.raw`\text{average} = \frac{\text{sum}}{n} \quad\Longleftrightarrow\quad \text{sum} = n \times \text{average}`, key: true },
    {
      kind: "p",
      text: String.raw`For example, if four test scores average 78 and you want a five-test average of 80, the five scores must sum to $5 \times 80 = 400$, and the first four already sum to $4 \times 78 = 312$, so the fifth score must be $88$. The same idea combines groups: if 20 students average 70 and 30 other students average 80, all 50 students together average $\frac{20(70) + 30(80)}{50} = \frac{3{,}800}{50} = 76$, not $75$. The larger group pulls the combined average toward its own.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "\"Average\" can mean a rate",
      text: String.raw`On the GRE, "average" by itself means the arithmetic mean of a list, but without the words "arithmetic mean" it can also refer to a rate or a ratio, as in "average number of miles per hour" or "average weight per truckload" (MC p. 13). Average speed, below, is the important case: it is a ratio of totals, not a mean of speeds.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Mixture problems" },
    {
      kind: "p",
      text: String.raw`A [[mixture]] problem tracks one ingredient as its percentage of the whole changes. The percentage is a fraction (amount of the ingredient over the total amount) and the key is to see which of those two amounts stays fixed. If only water is added, the amount of salt does not change; only the total grows (MR p. 55 makes the same point with oil added to vinegar).`,
    },
    { kind: "math", tex: String.raw`\text{percent of ingredient} = \frac{\text{amount of ingredient}}{\text{total amount}} \times 100\%`, key: true },
    {
      kind: "p",
      text: String.raw`Suppose 20 liters of a solution are 30 percent salt, and you want to add $x$ liters of water to make it 12 percent salt. The salt is $(0.30)(20) = 6$ liters before and after, while the total becomes $20 + x$. So $\frac{6}{20 + x} = 0.12$, which gives $20 + x = 50$ and $x = 30$ liters.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "2-7-applications/mixture-bars",
        props: { before: 20, after: 50, part: 6, unit: "L", partLabel: "salt" },
        caption: String.raw`Adding 30 liters of water: the salt stays at 6 liters while the total goes from 20 to 50 liters, so the salt share falls from 30% to 12%. Drawn to scale.`,
      },
    },
    {
      kind: "p",
      text: String.raw`When two solutions are mixed, nothing is fixed, but the ingredient amounts _add_. To make 30 liters of a 20 percent acid solution from a 10 percent and a 40 percent solution, let $a$ and $b$ be the liters used. Then $a + b = 30$ (total) and $0.10a + 0.40b = (0.20)(30) = 6$ (acid). Substituting $a = 30 - b$ gives $3 + 0.30b = 6$, so $b = 10$ and $a = 20$. That is a [[system-of-equations|system of equations]], which we return to below.`,
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`Do not add percentages. Mixing 10 liters of a 10 percent solution with 10 liters of a 40 percent solution gives 25 percent only because the volumes are equal; with unequal volumes, add the ingredient amounts and divide by the total volume.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Distance, rate and time" },
    {
      kind: "p",
      text: String.raw`Motion problems rest on one formula: the distance traveled equals the [[rate]] (speed) times the time (MR p. 56). Its two rearrangements, $r = \frac{d}{t}$ and $t = \frac{d}{r}$, are the ones you use most.`,
    },
    { kind: "math", tex: String.raw`d = rt`, key: true },
    {
      kind: "p",
      text: String.raw`The units must agree. If the rate is in miles per _hour_, the time must be in hours (MR p. 56): driving 45 minutes at 56 miles per hour covers $56 \times \frac{45}{60} = 42$ miles, not $56 \times 45$. Two standard set-ups also come straight from $d = rt$. If two travelers move toward each other (or apart), the distance between them changes by the _sum_ of their speeds each hour. If one chases the other in the same direction, the gap closes at the _difference_ of their speeds.`,
    },
    {
      kind: "p",
      text: String.raw`The [[average-speed|average speed]] for a whole trip is a rate in the sense of the conventions (MC p. 13): total distance divided by total time. Drive 120 miles out at 40 miles per hour (3 hours) and the same 120 miles back at 60 miles per hour (2 hours). The average speed is $\frac{240}{5} = 48$ miles per hour, not $\frac{40 + 60}{2} = 50$. The slower leg takes longer, so it gets more weight.`,
    },
    { kind: "math", tex: String.raw`\text{average speed} = \frac{\text{total distance}}{\text{total time}}`, key: true },
    {
      kind: "aside",
      tone: "tip",
      title: "Round trips at two speeds",
      text: String.raw`For equal distances at speeds $a$ and $b$, the average speed is $\frac{2ab}{a + b}$ (a standard consequence of $d = rt$, though not stated in the ETS Math Review): $\frac{2(40)(60)}{100} = 48$. It is always less than $\frac{a+b}{2}$ unless $a = b$. If instead the two speeds are held for equal _times_, the average speed is exactly $\frac{a + b}{2}$.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Work problems: add the rates" },
    {
      kind: "p",
      text: String.raw`A work problem is a rate problem in disguise. If a machine finishes a job in 3 hours, its [[work-rate|rate]] is $\frac{1}{3}$ of the job per hour. When machines work simultaneously, their rates add, and the combined time is the reciprocal of the combined rate (MR pp. 56–57). Times never add.`,
    },
    { kind: "math", tex: String.raw`\frac{1}{a} + \frac{1}{b} = \frac{1}{T} \quad\Longrightarrow\quad T = \frac{ab}{a + b}`, key: true },
    {
      kind: "p",
      text: String.raw`For example, pipe $A$ alone fills a tank in 4 hours and pipe $B$ alone in 6 hours. Together they fill $\frac{1}{4} + \frac{1}{6} = \frac{5}{12}$ of the tank per hour, so the tank takes $\frac{12}{5} = 2.4$ hours, or 2 hours 24 minutes. A quick sanity check: the combined time must be less than the faster machine's time alone (4 hours) and more than half of it (2 hours).`,
    },
    {
      kind: "interactive",
      key: "2-7-applications/work-rate-explorer",
      title: "Work-rate explorer",
      caption: String.raw`Set each machine's time to do the job alone. The bars show the rates (fractions of the job per hour) adding up; the combined time is the reciprocal of the total. Switch $B$ to a drain to see rates subtract.`,
    },
    {
      kind: "p",
      text: String.raw`Three variations come up often. If one pipe _drains_, its rate counts as negative: a fill pipe at $\frac{1}{4}$ per hour with a drain at $\frac{1}{10}$ per hour fills at $\frac{3}{20}$ per hour. If a machine works alone for a while first, subtract the part it finished and divide the rest of the job by the combined rate. And if the job is "$k$ liters" or "a batch of $n$ parts" rather than "one job," the answer is the same: the job size cancels.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Two unknowns, two facts" },
    {
      kind: "p",
      text: String.raw`Many problems describe two kinds of item with a total count and a total value. Each total gives one linear equation, and together they form a [[system-of-equations|system of equations]] (MR pp. 57–58). Say a club sells tickets at \$8 and \$12, sells 50 tickets, and takes in \$480. With $a$ cheap and $b$ expensive tickets:`,
    },
    { kind: "math", tex: String.raw`\begin{aligned} a + b &= 50 \\ 8a + 12b &= 480 \end{aligned}` },
    {
      kind: "p",
      text: String.raw`Substituting $a = 50 - b$ gives $400 + 4b = 480$, so $b = 20$ and $a = 30$. There is a faster way to see the same step: if all 50 tickets had been the \$8 kind, the take would be \$400; each \$12 ticket adds \$4 more, and $\frac{80}{4} = 20$ of them make up the difference.`,
    },
    {
      kind: "aside",
      tone: "watch",
      text: String.raw`Answer the question that was asked. A system gives you both unknowns, and the wrong one is almost always among the answer choices.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Profit" },
    {
      kind: "p",
      text: String.raw`[[profit|Profit]] is [[revenue]] from sales minus the total cost of production (MR p. 58). The conventions make this the default meaning: profit is gross profit, sales revenue minus the cost of production or acquisition, and other amounts (taxes, salaries) count only if the question gives them (MC p. 17). With a price of $p$ dollars per unit, a cost of $c$ dollars per unit, and $n$ units sold:`,
    },
    { kind: "math", tex: String.raw`\text{profit} = \text{revenue} - \text{cost} = np - nc = n(p - c)`, key: true },
    {
      kind: "p",
      text: String.raw`Profit questions often ask for a threshold, so the equation becomes an inequality. Suppose producing 400 gadgets costs \$2,000 for setup plus \$15 per gadget, all 400 are sold at $p$ dollars each, and the profit must be at least \$6,000. Then $400p - (2{,}000 + 400 \cdot 15) \ge 6{,}000$, so $400p \ge 14{,}000$ and $p \ge 35$. The price must be at least \$35.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Simple and compound interest" },
    {
      kind: "p",
      text: String.raw`[[interest|Interest]] is what an investment earns over a period of time. With [[simple-interest|simple interest]], interest is computed only on the initial deposit, the [[principal]], for the whole period. With [[compound-interest|compound interest]], interest is added to the principal at regular intervals (annually, quarterly, monthly), and after each [[compounding|compounding]] the next interest is earned on the new, larger principal (MR p. 58).`,
    },
    {
      kind: "p",
      text: String.raw`ETS writes the formulas with $P$ the amount invested, $r$ the [[annual-rate|annual interest rate]] **in percent** (so 6 percent is $r = 6$, which is why every formula divides by 100), $t$ the number of years, and $V$ the value at the end of $t$ years (MR pp. 58–59).`,
    },
    { kind: "math", tex: String.raw`\text{simple:}\quad V = P\left(1 + \frac{rt}{100}\right)`, key: true },
    { kind: "math", tex: String.raw`\text{compounded annually:}\quad V = P\left(1 + \frac{r}{100}\right)^{t}`, key: true },
    { kind: "math", tex: String.raw`\text{compounded } n \text{ times per year:}\quad V = P\left(1 + \frac{r}{100n}\right)^{nt}`, key: true },
    {
      kind: "p",
      text: String.raw`Take \$5,000 at 4 percent for 3 years. Simple interest gives $5{,}000(1 + 0.12) = \$5{,}600$. Compounded annually, $5{,}000(1.04)^3 = \$5{,}624.32$. Compounded quarterly, $n = 4$, so each quarter pays $\frac{4}{400} = 1$ percent and there are $4 \times 3 = 12$ quarters: $5{,}000(1.01)^{12} \approx \$5{,}634.13$. More frequent compounding at the same annual rate always ends a little higher, and the gap between simple and compound interest widens with time.`,
    },
    {
      kind: "interactive",
      key: "2-7-applications/interest-growth",
      title: "Simple vs. compound interest",
      caption: String.raw`Change the principal, rate, number of years and compounding frequency. Simple interest grows along a straight line; compound interest grows by a constant factor per period, so it curves upward.`,
    },
    {
      kind: "p",
      text: String.raw`The formulas also run backwards. To have \$11,025 after 2 years at 5 percent compounded annually, you need $P(1.05)^2 = 11{,}025$, so $P = \frac{11{,}025}{1.1025} = \$10{,}000$ (MR p. 60 solves one like this). To find a rate, isolate the power and take a root: since both sides are positive, taking the positive square root, fourth root or any other positive root of each side preserves the direction of an inequality, and a fourth root is a square root taken twice (MR pp. 60–61).`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Interest traps",
      text: String.raw`"Earns \$1,000 in interest" is a statement about $V - P$, not $V$: set $V \ge P + 1{,}000$. For quarterly compounding the rate per period is $\frac{r}{400}$ and the exponent is $4t$; changing one without the other is the classic slip. And "6 percent" is $r = 6$ in the ETS formulas, so do not divide by 100 twice.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Every problem in this section fits one template: name the unknown with units, find the quantity that is _conserved_ (the salt in a mixture, the distance in a round trip, the total in an average) or _added_ (rates in a work problem, ingredient amounts when mixing, item counts and values in a system), and write one equation. Then check that the answer is the quantity asked for, in the units asked for.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Averaging two speeds instead of dividing total distance by total time. Adding times (or averaging them) in a work problem instead of adding rates. Adding percentages of solutions with different volumes. Mixing minutes and hours. Reporting the wrong unknown from a system. Using the value $V$ when the question asks for the interest $V - P$, or forgetting to change both the rate per period and the number of periods when compounding is not annual.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "word-problem",
      term: "word problem",
      turkish: "sözel problem",
      definition: String.raw`A problem stated in words. Translating the verbal description into algebraic expressions is the essential first step; begin by assigning a variable to the quantity that is sought.`,
      source: "MR pp. 54–55",
    },
    {
      id: "average",
      term: "average (arithmetic mean)",
      turkish: "aritmetik ortalama",
      definition: String.raw`The sum of a list of numbers divided by the number of numbers. Without the qualification "arithmetic mean," "average" can also refer to a rate or a ratio, such as average miles per hour.`,
      formula: String.raw`\text{average} = \frac{\text{sum}}{n}`,
      source: "MR pp. 54–55; MC p. 13",
    },
    {
      id: "mixture",
      term: "mixture",
      turkish: "karışım",
      definition: String.raw`A combination of ingredients, such as vinegar and oil, in which each ingredient makes up a percent of the whole (for example, by weight). In mixture problems, the amount of an ingredient that is not added or removed stays the same.`,
      source: "MR p. 55",
    },
    {
      id: "rate",
      term: "rate (speed)",
      turkish: "hız",
      definition: String.raw`Distance per unit of time, such as miles per hour. Distance equals rate times time; the time must be expressed in the same unit as the rate (hours for miles per hour).`,
      formula: String.raw`d = rt`,
      source: "MR pp. 55–56",
    },
    {
      id: "average-speed",
      term: "average speed",
      turkish: "ortalama hız",
      definition: String.raw`For a whole trip, the total distance divided by the total time. It is a rate, not the arithmetic mean of the speeds on the separate parts of the trip.`,
      formula: String.raw`\frac{\text{total distance}}{\text{total time}}`,
      note: "The phrase is used in the ETS Math Review (Example 2.7.6), but the total-distance-over-total-time formula is not stated there; it follows from d = rt and the convention that “average” can mean a rate.",
      source: "MR p. 55; MC p. 13",
    },
    {
      id: "work-rate",
      term: "rate of work (production rate)",
      turkish: "iş hızı (birim zamanda yapılan iş)",
      definition: String.raw`The fraction of a job done per unit of time. A machine that takes $a$ hours to do a job alone works at $\frac{1}{a}$ of the job per hour. Machines working simultaneously add their rates.`,
      formula: String.raw`\frac{1}{a} + \frac{1}{b} = \frac{1}{T}`,
      source: "MR pp. 56–57",
    },
    {
      id: "system-of-equations",
      term: "system of equations",
      turkish: "denklem sistemi",
      definition: String.raw`Two (or more) equations in the same unknowns that must hold at the same time. In word problems each given total (a count, a cost) supplies one equation.`,
      source: "MR p. 57",
    },
    {
      id: "revenue",
      term: "revenue",
      turkish: "gelir / hasılat",
      definition: String.raw`The money taken in from sales: the number of units sold times the selling price per unit.`,
      source: "MR p. 58",
    },
    {
      id: "profit",
      term: "profit",
      turkish: "kâr",
      definition: String.raw`Revenue from the sales minus the total production cost. On the GRE, profit means gross profit (sales revenue minus the cost of production or acquisition) unless other amounts are explicitly given.`,
      formula: String.raw`\text{profit} = \text{revenue} - \text{cost}`,
      source: "MR p. 58; MC p. 17",
    },
    {
      id: "interest",
      term: "interest",
      turkish: "faiz",
      definition: String.raw`The amount earned on an investment during a specified time period. It can be computed as simple interest or compound interest.`,
      source: "MR p. 58",
    },
    {
      id: "principal",
      term: "principal",
      turkish: "anapara",
      definition: String.raw`The amount on which interest is computed: the initial deposit for simple interest, and the preceding principal plus the interest just added after each compounding.`,
      source: "MR p. 58",
    },
    {
      id: "simple-interest",
      term: "simple interest",
      turkish: "basit faiz",
      definition: String.raw`Interest based only on the initial deposit (the principal) for the entire time period. At a simple annual interest rate of $r$ percent, $P$ grows to $V = P\left(1 + \frac{rt}{100}\right)$ after $t$ years.`,
      formula: String.raw`V = P\left(1 + \frac{rt}{100}\right)`,
      source: "MR p. 58",
    },
    {
      id: "compound-interest",
      term: "compound interest",
      turkish: "bileşik faiz",
      definition: String.raw`Interest that is added to the principal at regular time intervals; after each compounding, interest is earned on the new principal.`,
      formula: String.raw`V = P\left(1 + \frac{r}{100n}\right)^{nt}`,
      source: "MR pp. 58–59",
    },
    {
      id: "compounding",
      term: "compounded (annually, quarterly, monthly)",
      turkish: "faizin anaparaya eklenmesi (yıllık / üç aylık / aylık dönemlerle)",
      definition: String.raw`Interest is said to be compounded each time it is added to the principal. Compounded annually means once a year ($n = 1$), quarterly means 4 times a year ($n = 4$), and monthly means 12 times a year ($n = 12$).`,
      source: "MR pp. 58–60",
    },
    {
      id: "annual-rate",
      term: "annual interest rate of r percent",
      turkish: "yıllık faiz oranı (yüzde r)",
      definition: String.raw`The yearly interest rate, written as a percent: in the ETS formulas $r = 6$ means 6 percent, so $r$ is divided by 100 (or by $100n$ when interest is compounded $n$ times per year).`,
      source: "MR pp. 58–59",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "ex1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`A cyclist rides 30 miles up a hill at an average speed of 10 miles per hour and then returns down the same 30-mile route at an average speed of 30 miles per hour. What is the cyclist's average speed, in miles per hour, for the entire round trip?`,
      choices: [String.raw`$12$`, String.raw`$15$`, String.raw`$18$`, String.raw`$20$`, String.raw`$24$`],
      answer: 1,
      explanation: [
        String.raw`Average speed is total distance over total time. Total distance: $30 + 30 = 60$ miles.`,
        String.raw`Times: up $\frac{30}{10} = 3$ hours, down $\frac{30}{30} = 1$ hour, so 4 hours in all.`,
        String.raw`Average speed $= \frac{60}{4} = 15$ miles per hour. (Check with the round-trip shortcut: $\frac{2(10)(30)}{10 + 30} = 15$.)`,
        String.raw`Trap: $20$ is the mean of the two speeds. The slow leg lasts three times as long as the fast one, so it dominates.`,
      ],
    },
    {
      id: "ex2",
      type: "ne",
      difficulty: "hard",
      stem: String.raw`Working alone at its constant rate, pipe $A$ fills a tank in 6 hours. Working alone at its constant rate, pipe $B$ fills the same tank in 9 hours. Starting with the tank empty, pipe $A$ runs alone for 2 hours, and then pipe $B$ is also opened. How many more hours will it take the two pipes, working together, to fill the tank? Give your answer as a decimal.`,
      answer: { kind: "decimal", value: "2.4" },
      suffix: "hours",
      explanation: [
        String.raw`Rates: $A$ fills $\frac{1}{6}$ of the tank per hour and $B$ fills $\frac{1}{9}$.`,
        String.raw`In its first 2 hours alone, $A$ fills $2 \cdot \frac{1}{6} = \frac{1}{3}$ of the tank, leaving $\frac{2}{3}$.`,
        String.raw`Together: $\frac{1}{6} + \frac{1}{9} = \frac{3}{18} + \frac{2}{18} = \frac{5}{18}$ of the tank per hour.`,
        String.raw`Time for the rest: $\frac{2}{3} \div \frac{5}{18} = \frac{2}{3} \cdot \frac{18}{5} = \frac{12}{5} = 2.4$ hours.`,
        String.raw`Trap: $\frac{18}{5} = 3.6$ hours is the time to fill the _whole_ tank together; the first $\frac{1}{3}$ is already done.`,
      ],
    },
    {
      id: "ex3",
      type: "qc",
      difficulty: "hard",
      given: String.raw`Ana invests \$1,000 at a simple annual interest rate of 10 percent. Ben invests \$1,000 at an annual interest rate of 9.6 percent, compounded annually. Neither makes any other deposits or withdrawals.`,
      quantityA: String.raw`The value of Ana's investment at the end of 2 years`,
      quantityB: String.raw`The value of Ben's investment at the end of 2 years`,
      answer: "B",
      explanation: [
        String.raw`Ana (simple): $V = 1{,}000\left(1 + \frac{10 \cdot 2}{100}\right) = 1{,}000(1.2) = \$1{,}200$.`,
        String.raw`Ben (compounded annually): $V = 1{,}000(1.096)^2$. Since $1.096^2 = 1 + 2(0.096) + 0.096^2 = 1.192 + 0.009216 = 1.201216$, his value is $\$1{,}201.216$, about $\$1{,}201.22$.`,
        String.raw`Quantity B is greater, by about \$1.22. In the second year Ben earns interest on his first year's interest ($9.6\%$ of \$96, about \$9.22), which more than makes up for his lower rate ($0.4\%$ of \$1,000 per year, \$8 over two years).`,
        String.raw`Trap: "10 percent beats 9.6 percent" is true for one year, but not here.`,
      ],
    },
    {
      id: "ex4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`A container holds 40 liters of a solution that is 25 percent acid by volume. Which of the following, each done separately to the original solution, would produce a solution that is exactly 20 percent acid by volume? Indicate all such actions.`,
      choices: [
        String.raw`Add 5 liters of water.`,
        String.raw`Add 10 liters of water.`,
        String.raw`Add 10 liters of a solution that is 10 percent acid.`,
        String.raw`Add 20 liters of a solution that is 10 percent acid.`,
        String.raw`Pour out 8 liters of the solution and replace them with 8 liters of water.`,
      ],
      answer: [1, 3, 4],
      explanation: [
        String.raw`The original solution has $(0.25)(40) = 10$ liters of acid. For each action, compute acid over total.`,
        String.raw`5 L water: $\frac{10}{45} \approx 22.2\%$. No. 10 L water: $\frac{10}{50} = 20\%$. Yes.`,
        String.raw`10 L of 10%: acid $10 + 1 = 11$, total 50, $\frac{11}{50} = 22\%$. No. 20 L of 10%: acid $10 + 2 = 12$, total 60, $\frac{12}{60} = 20\%$. Yes.`,
        String.raw`Pour out 8 L: the 8 liters removed are 25% acid, so they take 2 liters of acid with them, leaving 8 liters of acid in 32 liters. Adding 8 liters of water restores the total to 40: $\frac{8}{40} = 20\%$. Yes.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`Translate: "5 less than twice the number $x$."`,
      answer: String.raw`$2x - 5$`,
      explanation: String.raw`"Twice $x$" is $2x$; "5 less than" it subtracts 5 from it, not the other way round.`,
    },
    {
      id: "q2",
      prompt: String.raw`Four numbers have an average (arithmetic mean) of 15. A fifth number is added and the average of all five is 17. What is the fifth number?`,
      answer: String.raw`$25$`,
      explanation: String.raw`Sums: $5(17) - 4(15) = 85 - 60 = 25$.`,
    },
    {
      id: "q3",
      prompt: String.raw`Working alone, machine $A$ does a job in 3 hours and machine $B$ does it in 6 hours. How long do they take working together?`,
      answer: String.raw`2 hours`,
      explanation: String.raw`$\frac{1}{3} + \frac{1}{6} = \frac{1}{2}$ of the job per hour, so 2 hours.`,
    },
    {
      id: "q4",
      prompt: String.raw`How many miles does a car cover in 20 minutes at 45 miles per hour?`,
      answer: String.raw`15 miles`,
      explanation: String.raw`$45 \times \frac{20}{60} = 15$. Convert the minutes to hours first.`,
    },
    {
      id: "q5",
      prompt: String.raw`What is the value of \$2,000 after 3 years at a simple annual interest rate of 5 percent?`,
      answer: String.raw`$\$2{,}300$`,
      explanation: String.raw`$2{,}000\left(1 + \frac{5 \cdot 3}{100}\right) = 2{,}000(1.15) = 2{,}300$.`,
    },
    {
      id: "q6",
      prompt: String.raw`Write the value of \$1,000 after 2 years at an annual rate of 8 percent, compounded quarterly, and estimate it to the nearest dollar.`,
      answer: String.raw`$1{,}000(1.02)^8 \approx \$1{,}172$`,
      explanation: String.raw`$n = 4$: the rate per quarter is $\frac{8}{400} = 0.02$ and there are $4 \times 2 = 8$ quarters; $1.02^8 \approx 1.1717$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`Car $X$ drives for 2 hours at 40 miles per hour and then for 2 hours at 60 miles per hour. Car $Y$ drives 120 miles at 40 miles per hour and then 120 miles at 60 miles per hour.`,
        quantityA: String.raw`The average speed of car $X$ for its whole trip, in miles per hour`,
        quantityB: String.raw`The average speed of car $Y$ for its whole trip, in miles per hour`,
        answer: "A",
        explanation: [
          String.raw`Car $X$: distance $80 + 120 = 200$ miles in 4 hours, so its average speed is $\frac{200}{4} = 50$.`,
          String.raw`Car $Y$: times $\frac{120}{40} = 3$ and $\frac{120}{60} = 2$ hours, so $\frac{240}{5} = 48$.`,
          String.raw`Quantity A is greater. Equal _times_ at two speeds average to the mean of the speeds; equal _distances_ give more weight to the slower speed, because more time is spent at it.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`Working alone at their constant rates, machine $A$ does a certain job in $x$ hours and machine $B$ does it in $y$ hours, where $0 < x < y$. Working together at those rates, the two machines do the job in $t$ hours.`,
        quantityA: String.raw`$t$`,
        quantityB: String.raw`$\frac{x}{2}$`,
        answer: "A",
        explanation: [
          String.raw`Rates add: $\frac{1}{t} = \frac{1}{x} + \frac{1}{y}$.`,
          String.raw`Since $y > x > 0$, $\frac{1}{y} < \frac{1}{x}$, so $\frac{1}{t} < \frac{1}{x} + \frac{1}{x} = \frac{2}{x}$.`,
          String.raw`Both sides are positive, so taking reciprocals reverses the inequality: $t > \frac{x}{2}$. Quantity A is greater for every allowed $x$ and $y$.`,
          String.raw`Intuition: $\frac{x}{2}$ is the time two copies of the _faster_ machine would need. Pairing $A$ with a slower machine must take longer. (If $x = y$ were allowed, the quantities could be equal.)`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`An amount $P > 0$ is invested for 1 year in one of two ways: at an annual interest rate of 6 percent, compounded monthly, or at a simple annual interest rate of 6.2 percent.`,
        quantityA: String.raw`The value at the end of the year with 6 percent compounded monthly`,
        quantityB: String.raw`The value at the end of the year with 6.2 percent simple interest`,
        answer: "B",
        explanation: [
          String.raw`Monthly: $n = 12$, so $V = P\left(1 + \frac{6}{1{,}200}\right)^{12} = P(1.005)^{12}$. Simple: $V = P(1.062)$.`,
          String.raw`$1.005^{12} \approx 1.0617$ (the calculator gives $1.06168$), which is less than $1.062$.`,
          String.raw`Since $P > 0$, multiplying both by $P$ keeps the order: Quantity B is greater, whatever $P$ is.`,
          String.raw`Trap: compounding helps, but monthly compounding of 6% adds only about 0.17 percentage points in one year, not 0.2.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`How many liters of a solution that is 60 percent alcohol must be added to 30 liters of a solution that is 20 percent alcohol to produce a solution that is 30 percent alcohol?`,
        choices: [String.raw`$5$`, String.raw`$7.5$`, String.raw`$10$`, String.raw`$12$`, String.raw`$15$`],
        answer: 2,
        explanation: [
          String.raw`Let $x$ be the liters of 60% solution. Alcohol amounts add: $0.60x + (0.20)(30) = 0.30(30 + x)$.`,
          String.raw`So $0.60x + 6 = 9 + 0.30x$, which gives $0.30x = 3$ and $x = 10$.`,
          String.raw`Check: $\frac{6 + 6}{40} = 0.30$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Car $A$ leaves a town at 9:00 a.m. and drives along a highway at a constant 48 miles per hour. Car $B$ leaves the same town at 9:30 a.m. and follows the same highway in the same direction at a constant 60 miles per hour. At what time does car $B$ catch up with car $A$?`,
        choices: [String.raw`10:30 a.m.`, String.raw`11:00 a.m.`, String.raw`11:30 a.m.`, String.raw`12:00 noon`, String.raw`12:30 p.m.`],
        answer: 2,
        explanation: [
          String.raw`At 9:30, car $A$ has a head start of $48 \times \frac{1}{2} = 24$ miles.`,
          String.raw`From then on the gap closes at $60 - 48 = 12$ miles per hour, so it closes in $\frac{24}{12} = 2$ hours.`,
          String.raw`$B$ catches $A$ at 11:30 a.m. Check: $A$ has driven $48 \times 2.5 = 120$ miles and $B$ has driven $60 \times 2 = 120$ miles.`,
          String.raw`Trap: 11:00 a.m. measures the 2 hours from 9:00 instead of from 9:30.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`An investor will deposit \$8,000 for 2 years at an annual interest rate of $r$ percent, compounded semiannually (twice a year). If $r$ is an integer and the investment must earn at least \$1,000 in interest, what is the least possible value of $r$?`,
        choices: [String.raw`$5$`, String.raw`$6$`, String.raw`$7$`, String.raw`$8$`, String.raw`$9$`],
        answer: 1,
        explanation: [
          String.raw`With $n = 2$ and $t = 2$: $V = 8{,}000\left(1 + \frac{r}{200}\right)^{4}$. Earning at least \$1,000 means $V \ge 9{,}000$.`,
          String.raw`Divide by 8,000: $\left(1 + \frac{r}{200}\right)^4 \ge 1.125$. Taking positive fourth roots preserves the inequality: $r \ge 200\left(\sqrt[4]{1.125} - 1\right) \approx 5.98$.`,
          String.raw`So the least integer is 6. Check both neighbors: $8{,}000(1.03)^4 \approx 9{,}004.07 \ge 9{,}000$, but $8{,}000(1.025)^4 \approx 8{,}830.50 < 9{,}000$.`,
          String.raw`Trap: simple interest would need $8{,}000 \cdot \frac{2r}{100} \ge 1{,}000$, i.e. $r \ge 6.25$, suggesting 7; compounding brings the threshold just under 6.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`Working alone at its constant rate, machine $B$ does a certain job in 12 hours. Working alone at its constant rate, machine $A$ does the same job in more than 4 hours but less than 6 hours. Which of the following could be the number of hours the two machines take to do the job working together at their constant rates? Indicate all such numbers.`,
        choices: [String.raw`$2.5$`, String.raw`$3$`, String.raw`$3.2$`, String.raw`$3.5$`, String.raw`$3.9$`, String.raw`$4$`, String.raw`$4.5$`],
        answer: [2, 3, 4],
        explanation: [
          String.raw`If $A$ takes $a$ hours, the combined time is $T = \frac{12a}{a + 12}$ (from $\frac{1}{a} + \frac{1}{12} = \frac{1}{T}$).`,
          String.raw`A slower $A$ (larger $a$) means a smaller combined rate and so a longer combined time: $T$ increases as $a$ increases.`,
          String.raw`At $a = 4$: $T = \frac{48}{16} = 3$. At $a = 6$: $T = \frac{72}{18} = 4$. Since $4 < a < 6$, $3 < T < 4$ strictly.`,
          String.raw`So $3.2$, $3.5$ and $3.9$ are possible; $3$ and $4$ are excluded because the bounds on $a$ are strict.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`A company's cost to produce $x$ units of a gadget is \$5,000 plus \$8 per unit, and each unit is sold for \$18. If all $x$ units produced are sold, which of the following values of $x$ give a profit of at least \$2,000? Indicate all such values.`,
        choices: [String.raw`$500$`, String.raw`$650$`, String.raw`$699$`, String.raw`$700$`, String.raw`$750$`, String.raw`$1{,}000$`],
        answer: [3, 4, 5],
        explanation: [
          String.raw`Profit $=$ revenue $-$ cost $= 18x - (5{,}000 + 8x) = 10x - 5{,}000$.`,
          String.raw`$10x - 5{,}000 \ge 2{,}000$ gives $x \ge 700$.`,
          String.raw`So 700, 750 and 1,000 work. At $x = 699$ the profit is \$1,990, just short.`,
          String.raw`Trap: dividing \$2,000 by the \$10 margin per unit gives 200 and ignores the fixed \$5,000.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`A driver travels from town $P$ to town $Q$ at an average speed of 50 miles per hour and returns from $Q$ to $P$ along the same road at an average speed of $v$ miles per hour. If the average speed for the entire round trip is 60 miles per hour, what is the value of $v$?`,
        answer: { kind: "decimal", value: "75" },
        explanation: [
          String.raw`Let the one-way distance be $d$ miles. Total distance $2d$; total time $\frac{d}{50} + \frac{d}{v}$.`,
          String.raw`Set $\frac{2d}{\frac{d}{50} + \frac{d}{v}} = 60$. The $d$ cancels: $\frac{2}{\frac{1}{50} + \frac{1}{v}} = 60$, so $\frac{1}{50} + \frac{1}{v} = \frac{1}{30}$.`,
          String.raw`$\frac{1}{v} = \frac{1}{30} - \frac{1}{50} = \frac{5 - 3}{150} = \frac{1}{75}$, so $v = 75$.`,
          String.raw`Check with $d = 150$: 3 hours out, 2 hours back, $\frac{300}{5} = 60$. Trap: $70$ comes from averaging the speeds, $\frac{50 + 70}{2} = 60$.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`A theater sold 240 tickets for one show. Adult tickets cost \$15 each and child tickets cost \$9 each, and the total revenue from the tickets was \$3,000. How many child tickets were sold?`,
        answer: { kind: "decimal", value: "100" },
        suffix: "child tickets",
        explanation: [
          String.raw`Let $a$ and $c$ be the numbers of adult and child tickets: $a + c = 240$ and $15a + 9c = 3{,}000$.`,
          String.raw`Substitute $a = 240 - c$: $3{,}600 - 15c + 9c = 3{,}000$, so $6c = 600$ and $c = 100$.`,
          String.raw`Check: 140 adults and 100 children give $2{,}100 + 900 = 3{,}000$. Trap: 140 is the number of adult tickets.`,
        ],
      },
    ],
  },
};

export default section;
