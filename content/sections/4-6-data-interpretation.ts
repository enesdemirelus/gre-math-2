import type { Section, DiagramRef } from "../types";

const D = "4-1-presenting-data";
const D6 = "4-6-data-interpretation";

/* ---------------- shared data displays (all numbers verified with python3) ---------------- */

// Lesson figure: a broken scale makes a small difference look huge.
const brokenDemo: DiagramRef = {
  key: `${D}/bar-graph`,
  props: {
    title: "Mean monthly rent, Town R",
    categories: ["2020", "2024"],
    series: [{ name: "Rent", values: [1180, 1240] }],
    yMin: 1150,
    yMax: 1250,
    yStep: 25,
    yMinor: 5,
    fmt: { prefix: "$" },
    showValues: true,
  },
  caption: String.raw`Above the break, the 2024 bar is three times as tall as the 2020 bar, yet the rent rose only from \$1180 to \$1240 (about 5%).`,
};

// Example set B: bar graph with a broken scale
const rentBars: DiagramRef = {
  key: `${D}/bar-graph`,
  props: {
    title: "Mean monthly rent, Town X",
    categories: ["2019", "2020", "2021", "2022", "2023"],
    series: [{ name: "Rent", values: [1180, 1210, 1250, 1330, 1390] }],
    yMin: 1000,
    yMax: 1400,
    yStep: 100,
    yMinor: 50,
    fmt: { prefix: "$" },
    showValues: true,
    yLabel: "Dollars per month",
  },
  caption: String.raw`Note the zigzag: the vertical scale is broken and starts at \$1000, not 0.`,
};

// Quiz set 1: segmented bar graph + table
const salesBars: DiagramRef = {
  key: `${D}/bar-graph`,
  props: {
    title: "Units sold by Greenfield Cycles",
    categories: ["2019", "2020", "2021", "2022"],
    series: [
      { name: "In-store", values: [42, 38, 40, 36] },
      { name: "Online", values: [18, 27, 35, 44] },
    ],
    mode: "stacked",
    yMax: 80,
    yStep: 10,
    yMinor: 5,
    yLabel: "Units (in thousands)",
    showValues: true,
  },
  caption: String.raw`Each bar is split into in-store (lower part) and online (upper part) units. The number printed in each part is its value.`,
};

// Quiz set 2: two stacked line graphs
const bakeryPanels: DiagramRef = {
  key: `${D6}/two-line-panels`,
  props: {
    top: {
      title: "Hartley Bakery: annual revenue",
      xs: ["2018", "2019", "2020", "2021", "2022", "2023"],
      series: [{ name: "Revenue", values: [24, 27, 21, 30, 33, 36] }],
      yMin: 15,
      yMax: 40,
      yStep: 5,
      yLabel: "$ millions",
      showValues: true,
    },
    bottom: {
      title: "Hartley Bakery: number of stores",
      xs: ["2018", "2019", "2020", "2021", "2022", "2023"],
      series: [{ name: "Stores", values: [12, 12, 10, 15, 16, 18] }],
      yMin: 0,
      yMax: 20,
      yStep: 5,
      yMinor: 1,
      yLabel: "Stores",
      showValues: true,
    },
  },
  caption: String.raw`Two displays, two different vertical scales. The upper scale is broken (it starts at \$15 million).`,
};

// Quiz set 3: paired circle graphs
const budgetCircles: DiagramRef = {
  key: `${D6}/paired-circle-graphs`,
  props: {
    first: {
      title: "Riverton city budget, 2015",
      totalText: "Total: $240 million",
      slices: [
        { label: "Schools", value: 35 },
        { label: "Roads", value: 20 },
        { label: "Health", value: 25 },
        { label: "Parks", value: 8 },
        { label: "Other", value: 12 },
      ],
    },
    second: {
      title: "Riverton city budget, 2025 (projected)",
      totalText: "Total: $300 million",
      slices: [
        { label: "Schools", value: 30 },
        { label: "Roads", value: 24 },
        { label: "Health", value: 28 },
        { label: "Parks", value: 6 },
        { label: "Other", value: 12 },
      ],
    },
  },
  caption: String.raw`Percents in each graph are percents of that graph's own total.`,
};

const section: Section = {
  id: "4-6-data-interpretation",
  number: "4.6",
  title: "Data Interpretation Examples",
  part: "data-analysis",
  mrPages: "180–184",
  summary: String.raw`How to attack a Data Interpretation set: read the display before the question, decide whether to estimate or compute, turn a graph into a percent change, and keep the bases straight in two-panel displays.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Read the display before the question" },
    {
      kind: "p",
      text: String.raw`A [[data-interpretation-set|Data Interpretation set]] is one table, graph, or pair of displays followed by several questions that all use it. The display is the same for every question in the set, it may contain more than one graph or table, and some of its data may never be asked about (MC p. 18). So the first thirty seconds go to the display, not to question 1. Read the title, the axis labels, the units ("in thousands", "in millions of dollars"), the [[legend]], and any footnote. Most wrong answers in this format come from a misread unit or from a misread scale, not from hard arithmetic.`,
    },
    {
      kind: "p",
      text: String.raw`Two conventions limit what you may use. Each question in a set is treated separately: nothing but the display carries over from one question to the next, so a hypothetical in question 2 ("suppose the 2025 total is 10% lower") does not apply to question 3 (MC p. 18). And you use only the data shown plus everyday facts (12 months in a year, 100 cents in a dollar); do not import outside knowledge, and do not assume anything the display does not say (MC pp. 17–18).`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Broken scales",
      text: String.raw`If a vertical axis does not start at 0, the display is drawn with a [[broken-scale|broken scale]] (MC p. 16); in this site's graphs the break is drawn as a zigzag. Then the bar heights are _not_ proportional to the values: a bar that looks three times as tall may be only 5% larger. Never compare bar heights by eye on such a graph. Read each value off the gridlines, then compute.`,
    },
    { kind: "diagram", diagram: brokenDemo },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Estimate or compute?" },
    {
      kind: "p",
      text: String.raw`Look at the five answer choices before you decide how precisely to work. When the question says "approximately" and the choices are spread out (say 20%, 30%, 40%, 50%, 60%), a rough reading of the graph and mental rounding is enough, and exact arithmetic only costs time. When the choices are close together, or the question asks for an exact value in a numeric-entry box, read the numbers carefully and compute. For "approximately" questions with no stated degree of approximation, choose the answer closest to the value you compute (MC p. 17).`,
    },
    {
      kind: "p",
      text: String.raw`Estimation has a rule of its own: round in a direction you can control. If you need $\frac{44}{35}$, compare it with a benchmark: $\frac{5}{4} = 1.25$ and $44 > 43.75 = \frac{5}{4}\cdot 35$, so the ratio is a little above 1.25. Benchmarks ($\frac{1}{10},\ \frac{1}{8},\ \frac{1}{4},\ \frac{1}{3}$) turn most graph arithmetic into a comparison, and a comparison is all a quantitative comparison item needs.`,
    },
    {
      kind: "interactive",
      key: "4-6-data-interpretation/EstimationTrainer",
      title: "Estimation trainer: percent change from a graph",
      caption: String.raw`Estimate first, using the gridlines and benchmark fractions. Then reveal the exact value and see how far off you were.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Percent change from a graph" },
    {
      kind: "p",
      text: String.raw`The most common computation in this format is the [[percent-change|percent change]] between two values the graph shows. Read both values, subtract, and divide by the _starting_ value, the base (MR pp. 24–25):`,
    },
    { kind: "math", tex: String.raw`\text{percent change} = \frac{\text{new} - \text{old}}{\text{old}} \times 100\%`, key: true },
    {
      kind: "p",
      text: String.raw`A rise from 80 to 100 is a 25% increase, but a fall from 100 back to 80 is only a 20% decrease, because the base changed. The question wording tells you which base to use: "the percent increase from 2021 to 2023" has 2021 as the base. A related trap is the difference between a percent and a [[percentage-point|percentage point]]: a share that moves from 20% to 25% has risen by 5 percentage points, but the share itself has grown by 25%.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Fast percent change",
      text: String.raw`Do not always divide. To test "more than 20%", compute 20% of the old value and compare it with the change. To compare two percent changes (a quantitative comparison favorite), compare the ratios $\frac{\text{new}}{\text{old}}$ directly, or cross-multiply.`,
    },
    {
      kind: "p",
      text: String.raw`On a [[segmented-bar-graph|segmented bar graph]] the top of a bar is the total, and a segment's value is the difference between two heights, so a percent change of one part uses the segment's own values, not the bar tops. Check whether the graph prints the segment values or only the cumulative heights before you subtract.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Percents, totals, and two-panel displays" },
    {
      kind: "p",
      text: String.raw`When a table or graph gives percents, ask immediately: percent _of what_? That whole is the [[base-of-percent|base]]. Within one display, percents with the same base compare directly, so if one sector of a [[circle-graph|circle graph]] is 24% and another is 8%, the first is three times the second. Across two displays with different totals they do not: a count is percent times total, so a smaller percent of a larger total can be the larger count.`,
    },
    {
      kind: "math",
      tex: String.raw`\text{count} = \frac{\text{percent}}{100} \times \text{total}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`Imagine 30% of 400 and 35% of 300. The percent is smaller in the first case, yet $0.30 \times 400 = 120$ beats $0.35 \times 300 = 105$. Two-panel displays (two circle graphs for two years, a table with a "total" row, or one graph stacked over another with different vertical scales) are built to set exactly this trap. Before any comparison, write down each panel's total and units.`,
    },
    {
      kind: "interactive",
      key: "4-6-data-interpretation/BaseTrap",
      title: "Same percent, different totals",
      caption: String.raw`Set the percent and the total for two years. The counts, not the percents, decide which is larger.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: `${D6}/paired-circle-graphs`,
        props: {
          first: { title: "Club budget, Year 1", totalText: "Total: $80,000", slices: [{ label: "Travel", value: 30 }, { label: "Supplies", value: 45 }, { label: "Events", value: 25 }] },
          second: { title: "Club budget, Year 2", totalText: "Total: $120,000", slices: [{ label: "Travel", value: 25 }, { label: "Supplies", value: 40 }, { label: "Events", value: 35 }] },
        },
        caption: String.raw`Travel falls from 30% to 25%, yet the dollar amount rises from \$24,000 to \$30,000.`,
      },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Venn diagrams as data displays" },
    {
      kind: "p",
      text: String.raw`Some data sets are shown as Venn diagrams. A number printed next to a circle is the total for that whole set; a number inside a region counts only that region (MC p. 17). Read carefully which kind each number is. For example, if 52 students take Spanish, 38 take French and 15 take both, then $52 - 15 = 37$ take only Spanish, $38 - 15 = 23$ take only French, and $52 + 38 - 15 = 75$ take at least one. If the class has 90 students, $90 - 75 = 15$ take neither (MR pp. 183–184 work an example of this kind).`,
    },
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`A reliable routine is: scan the display (title, units, scales, legend, notes); read the question and underline what it asks for (a value, a change, a percent, a comparison); decide estimate or exact from the answer choices; read the needed values off the gridlines; compute with the correct base; and sanity-check the size of the answer against the picture. When a statement is "indicate all that apply", test each statement separately and keep a quick tally; a statement that needs exact data may be settled by a rough bound.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE sets the traps",
      text: String.raw`Expect: a unit in thousands or millions that the answer must respect; a broken vertical scale; percents from two different totals; "percent of" versus "percent greater than"; and a question that asks for the _difference_ when you computed a ratio. Remember also that "difference between two quantities" means the positive difference (MC p. 17), and that "profit" means sales revenue minus cost (MC p. 17).`,
    },
  ],

  terms: [
    {
      id: "data-interpretation-set",
      term: "Data Interpretation set",
      turkish: String.raw`veri yorumlama soru grubu`,
      definition: String.raw`A group of questions that all refer to the same display of data, which may contain more than one graph or table. Each question is considered separately; only information in the display is carried over.`,
      source: "MC p. 18",
    },
    {
      id: "legend",
      term: "legend",
      turkish: String.raw`açıklama (lejant)`,
      definition: String.raw`The key of a graph that says which shading or line style stands for which variable, as in a grouped or segmented bar graph.`,
      note: "Used but not defined in the ETS Math Review",
      source: "MR p. 132",
    },
    {
      id: "broken-scale",
      term: "broken scale",
      turkish: String.raw`kırık ölçek`,
      definition: String.raw`An axis that does not begin at 0, drawn with a break in the axis (MC p. 16). The visible heights then do not show the proportions of the values.`,
      note: "ETS shows such a break (MR p. 137) without naming a term",
      source: "MR p. 137",
    },
    {
      id: "segmented-bar-graph",
      term: "segmented bar graph",
      turkish: String.raw`bölmeli (yığmalı) sütun grafiği`,
      definition: String.raw`A bar graph in which each bar is divided, or segmented, into smaller rectangles showing how the variable is separated into related variables. Also called a stacked bar graph.`,
      source: "MR p. 132",
    },
    {
      id: "circle-graph",
      term: "circle graph",
      turkish: String.raw`daire grafiği`,
      definition: String.raw`A graph that shows how a whole is separated into parts; the area of each sector is proportional to the part of the whole it represents. Often called a pie chart.`,
      source: "MR pp. 135–136",
    },
    {
      id: "percent-change",
      term: "percent change",
      turkish: String.raw`yüzde değişim`,
      definition: String.raw`The amount of change from an initial positive amount to another positive amount, expressed as a percent of the initial amount (the base). Percent increase is the amount of increase divided by the base.`,
      formula: String.raw`\frac{\text{new}-\text{old}}{\text{old}}\times 100\%`,
      source: "MR pp. 24–25",
    },
    {
      id: "base-of-percent",
      term: "base of a percent",
      turkish: String.raw`yüzdenin alındığı bütün (ana değer)`,
      definition: String.raw`The whole that a percent is a percent of. Percents with different bases (for example, from different totals) cannot be compared as if they described the same quantity.`,
      note: "ETS says the bases of the percents are different (MR p. 181) without a formal definition",
      source: "MR pp. 24–25, 181",
    },
    {
      id: "percentage-point",
      term: "percentage point",
      turkish: String.raw`yüzde puan`,
      definition: String.raw`The unit used for the difference between two percents; a share going from 20% to 25% rises by 5 percentage points, which is a 25% increase of the share.`,
      note: "Used but not defined in the ETS Math Review",
      source: "MR p. 181",
    },
  ],

  /* ------------------------------------------------------------------ */
  exampleSets: [
    {
      id: "ex-museum",
      title: "Visitors to the Lakeview Museum by ticket type",
      intro: String.raw`Percent of all visitors in each year.`,
      table: {
        header: ["Ticket type", "2022", "2023"],
        rows: [
          ["Adult", "40%", "36%"],
          ["Student", "25%", "28%"],
          ["Senior", "15%", "14%"],
          ["Child", "12%", "14%"],
          ["Member", "8%", "8%"],
          ["Total", "100%", "100%"],
          ["Total number of visitors", "18,500", "21,200"],
        ],
      },
    },
    { id: "ex-rent", title: "Mean monthly rent in Town X", diagram: rentBars },
  ],

  examples: [
    {
      id: "ex1",
      setId: "ex-museum",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`About how many more student visitors were there in 2023 than in 2022?`,
      choices: ["600", "1,000", "1,300", "1,700", "2,100"],
      answer: 2,
      explanation: [
        String.raw`The percents have different bases, so convert each to a count first.`,
        String.raw`2023: $0.28 \times 21{,}200 = 5{,}936$. 2022: $0.25 \times 18{,}500 = 4{,}625$.`,
        String.raw`Difference: $5{,}936 - 4{,}625 = 1{,}311 \approx 1{,}300$.`,
        String.raw`Estimating gives the same answer: $0.28 \times 21{,}000 \approx 5{,}900$ and $0.25 \times 18{,}500 \approx 4{,}600$, so the gap is about 1,300. The trap is to subtract percents (3 percentage points) and multiply by one of the totals.`,
      ],
    },
    {
      id: "ex2",
      setId: "ex-museum",
      type: "qc",
      difficulty: "medium",
      quantityA: String.raw`The number of Adult visitors in 2023`,
      quantityB: String.raw`The number of Adult visitors in 2022`,
      answer: "A",
      explanation: [
        String.raw`The Adult share fell from 40% to 36%, but the total rose from 18,500 to 21,200.`,
        String.raw`Quantity A: $0.36 \times 21{,}200 = 7{,}632$. Quantity B: $0.40 \times 18{,}500 = 7{,}400$.`,
        String.raw`Quantity A is greater. Quick check without a calculator: the total grew by about 14.6%, while the share shrank by only 10% of itself ($\frac{36}{40} = 0.9$), and $1.146 \times 0.9 > 1$.`,
      ],
    },
    {
      id: "ex3",
      setId: "ex-rent",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`By what percent did the mean monthly rent increase from 2019 to 2023? Give your answer to the nearest whole percent.`,
      answer: { kind: "decimal", value: "18" },
      suffix: "%",
      explanation: [
        String.raw`Read the values from the labels (and check them against the gridlines): $1180$ in 2019 and $1390$ in 2023.`,
        String.raw`Percent increase $= \frac{1390 - 1180}{1180} \times 100\% = \frac{210}{1180} \times 100\% \approx 17.8\%$, which rounds to 18.`,
        String.raw`The broken scale is the trap: above the break the 2023 bar is about twice as tall as the 2019 bar, but the rent is only about 18% higher.`,
      ],
    },
    {
      id: "ex4",
      setId: "ex-rent",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`For which of the following years was the percent increase in mean monthly rent over the previous year greater than 4%? Indicate all such years.`,
      choices: ["2020", "2021", "2022", "2023"],
      answer: [2, 3],
      explanation: [
        String.raw`Test 4% of the previous year's rent against the actual rise.`,
        String.raw`2020: rise 30, 4% of 1180 is 47.2, no. 2021: rise 40, 4% of 1210 is 48.4, no.`,
        String.raw`2022: rise 80, 4% of 1250 is 50, yes. 2023: rise 60, 4% of 1330 is 53.2, yes (the exact value is about 4.5%).`,
        String.raw`Answer: 2022 and 2023. The comparison "rise versus 4% of the base" avoids four long divisions.`,
      ],
    },
  ],

  quick: [
    {
      id: "q-venn",
      prompt: String.raw`A Venn diagram of 120 club members shows 64 next to circle $R$ (runners), 47 next to circle $S$ (swimmers), and 18 in the overlap. How many members are neither runners nor swimmers?`,
      answer: String.raw`$120 - (64 + 47 - 18) = 120 - 93 = 27$.`,
      explanation: String.raw`The numbers next to the circles are set totals, so the overlap is counted in both; subtract it once.`,
    },
    {
      id: "q1",
      prompt: String.raw`A bar graph's vertical axis starts at 1000 and has a zigzag near the bottom. If one bar is twice as tall as another, is its value twice as large?`,
      answer: String.raw`No. The scale is broken, so heights are not proportional to the values (only their order is preserved). Read the values and compute.`,
    },
    {
      id: "q2",
      prompt: String.raw`A share goes from 40% to 50% of a total. What are the change in percentage points and the percent increase of the share?`,
      answer: String.raw`10 percentage points; a 25% increase ($\frac{10}{40}$).`,
    },
    {
      id: "q3",
      prompt: String.raw`A circle graph labeled "Total: \$600" has a sector of 15%. How much is that sector?`,
      answer: String.raw`$0.15 \times 600 = \$90$.`,
    },
    {
      id: "q4",
      prompt: String.raw`A value rises from 50 to 70, then falls back from 70 to 50. Give the percent increase and the percent decrease.`,
      answer: String.raw`40% increase, about 28.6% decrease (different bases: 50 and 70).`,
    },
    {
      id: "q5",
      prompt: String.raw`Each question in a Data Interpretation set says "suppose" something. Does it hold for the next question?`,
      answer: String.raw`No. Each question is considered separately; only the display's data carry over (MC p. 18).`,
    },
    {
      id: "q6",
      prompt: String.raw`A graph's axis says "in thousands" and a bar reaches 36. What number of units does it show?`,
      answer: String.raw`36,000.`,
    },
  ],

  /* ------------------------------------------------------------------ */
  quiz: {
    sets: [
      {
        id: "sales",
        title: "Greenfield Cycles: units sold and average revenue per unit",
        diagram: salesBars,
        table: {
          caption: String.raw`Average revenue per unit sold (dollars)`,
          header: ["Channel", "2021", "2022"],
          rows: [
            ["Online", "450", "470"],
            ["In-store", "400", "410"],
          ],
        },
      },
      { id: "bakery", title: "Hartley Bakery: revenue and stores", diagram: bakeryPanels },
      { id: "budget", title: "Riverton city budget", diagram: budgetCircles },
    ],
    questions: [
      /* ---- set sales ---- */
      {
        id: "z1",
        setId: "sales",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Over the four years 2019–2022 combined, approximately what percent of the units sold were sold online?`,
        choices: ["35%", "40%", "44%", "48%", "55%"],
        answer: 2,
        explanation: [
          String.raw`Add the online segments: $18 + 27 + 35 + 44 = 124$ thousand. The bar totals are $60, 65, 75, 80$, which sum to $280$ thousand.`,
          String.raw`$\frac{124}{280} \approx 0.443$, about 44%.`,
          String.raw`The trap is to use only the 2022 share ($\frac{44}{80} = 55\%$) or to average the four yearly percents without noticing that the totals differ.`,
        ],
      },
      {
        id: "z2",
        setId: "sales",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`Which of the following statements are true? Indicate all such statements.`,
        choices: [
          String.raw`In-store units decreased in every year after 2019.`,
          String.raw`Online units in 2022 were more than double online units in 2019.`,
          String.raw`Online units were more than half of all units in 2022.`,
          String.raw`Online revenue in 2021 was greater than in-store revenue in 2021.`,
          String.raw`Online revenue in 2022 exceeded in-store revenue in 2022 by more than \$5 million.`,
        ],
        answer: [1, 2, 4],
        explanation: [
          String.raw`A: in-store units were $42, 38, 40, 36$; they rose from 2020 to 2021. False.`,
          String.raw`B: $\frac{44}{18} \approx 2.44 > 2$. True.`,
          String.raw`C: $44 > 40$, half of 80. True.`,
          String.raw`D: revenue in thousands of dollars: online $35 \times 450 = 15{,}750$; in-store $40 \times 400 = 16{,}000$. In-store is greater. False; the online segment is smaller even though the price is higher.`,
          String.raw`E: $44 \times 470 = 20{,}680$ and $36 \times 410 = 14{,}760$ (thousand dollars), a difference of $5{,}920$ thousand, i.e. $5.92$ million, greater than 5 million. True.`,
        ],
      },
      {
        id: "z3",
        setId: "sales",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`In 2022, online sales brought in what percent of the combined online and in-store revenue? Give your answer to the nearest whole percent.`,
        answer: { kind: "decimal", value: "58" },
        suffix: "%",
        explanation: [
          String.raw`Online: $44{,}000 \times 470 = 20{,}680{,}000$ dollars. In-store: $36{,}000 \times 410 = 14{,}760{,}000$ dollars.`,
          String.raw`Total: $35{,}440{,}000$. Share: $\frac{20{,}680}{35{,}440} \approx 0.5835$, which rounds to 58%.`,
          String.raw`Note the unit: the share of units online in 2022 is 55%, but online units carry a higher price, so the revenue share is higher.`,
        ],
      },
      {
        id: "z4",
        setId: "sales",
        type: "qc",
        difficulty: "hard",
        quantityA: String.raw`The percent increase in online units from 2021 to 2022`,
        quantityB: String.raw`The percent increase in total units from 2019 to 2021`,
        answer: "A",
        explanation: [
          String.raw`A: $\frac{44 - 35}{35} = \frac{9}{35} \approx 25.7\%$. B: totals went from $60$ to $75$, and $\frac{15}{60} = 25\%$.`,
          String.raw`Without dividing: $25\%$ of 35 is $8.75$, and the actual rise is $9$, which is more. So Quantity A is greater, but only barely, so use exact values rather than eyeballing.`,
        ],
      },
      /* ---- set bakery ---- */
      {
        id: "z5",
        setId: "bakery",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`From 2019 to 2020, by what percent did Hartley's revenue per store decrease? Give your answer to the nearest whole percent.`,
        answer: { kind: "decimal", value: "7" },
        suffix: "%",
        explanation: [
          String.raw`Revenue per store $=$ revenue $\div$ stores. 2019: $\frac{27}{12} = 2.25$ million. 2020: $\frac{21}{10} = 2.10$ million.`,
          String.raw`Percent decrease $= \frac{2.25 - 2.10}{2.25} = \frac{0.15}{2.25} \approx 0.0667$, about 7%.`,
          String.raw`The trap is to quote the revenue drop alone (from 27 to 21, about 22%); the store count fell too, which cushions the per-store figure.`,
        ],
      },
      {
        id: "z6",
        setId: "bakery",
        type: "qc",
        difficulty: "medium",
        quantityA: String.raw`The percent increase in revenue from 2020 to 2023`,
        quantityB: String.raw`The percent increase in the number of stores from 2020 to 2023`,
        answer: "B",
        explanation: [
          String.raw`Revenue: $\frac{36 - 21}{21} = \frac{15}{21} \approx 71.4\%$. Stores: $\frac{18 - 10}{10} = 80\%$.`,
          String.raw`The upper graph looks steeper because of its broken scale and its larger vertical spread, but steepness is not percent change. Quantity B is greater.`,
        ],
      },
      {
        id: "z7",
        setId: "bakery",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`Revenue per store in 2022 was approximately what percent of revenue per store in 2018?`,
        choices: ["92%", "97%", "103%", "108%", "115%"],
        answer: 2,
        explanation: [
          String.raw`2018: $\frac{24}{12} = 2.00$ million per store. 2022: $\frac{33}{16} \approx 2.06$ million per store.`,
          String.raw`$\frac{2.0625}{2.00} \approx 1.03$, about 103%.`,
          String.raw`Estimation route: revenue rose by a factor $\frac{33}{24} = 1.375$ and stores by $\frac{16}{12} \approx 1.33$; the ratio of the two is slightly above 1.`,
        ],
      },
      /* ---- set budget ---- */
      {
        id: "z8",
        setId: "budget",
        type: "qc",
        difficulty: "hard",
        quantityA: String.raw`The 2025 projected dollar amount for Health`,
        quantityB: String.raw`The 2015 dollar amount for Schools`,
        answer: "C",
        explanation: [
          String.raw`2025 Health: $28\% \times 300 = 84$ million. 2015 Schools: $35\% \times 240 = 84$ million.`,
          String.raw`The quantities are equal (choice C), even though 28% looks well below 35%: the totals differ.`,
        ],
      },
      {
        id: "z9",
        setId: "budget",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`For which of the following categories is the 2025 projected dollar amount more than 20% greater than the 2015 dollar amount? Indicate all such categories.`,
        choices: ["Schools", "Roads", "Health", "Parks", "Other"],
        answer: [1, 2, 4],
        explanation: [
          String.raw`Dollar amounts (millions), 2015 to 2025: Schools $84 \to 90$ (+7.1%); Roads $48 \to 72$ (+50%); Health $60 \to 84$ (+40%); Parks $19.2 \to 18$ (a decrease); Other $28.8 \to 36$ (+25%).`,
          String.raw`Roads, Health, and Other. "Other" has the same 12% share in both years, yet its dollar amount grows by 25% because the total grows by 25% ($\frac{300}{240} = 1.25$).`,
        ],
      },
      {
        id: "z10",
        setId: "budget",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`The 2025 projected amount for Schools and Parks combined is approximately what percent of the 2015 amount for Schools and Parks combined?`,
        choices: ["90%", "100%", "105%", "112%", "120%"],
        answer: 2,
        explanation: [
          String.raw`2025: $(30\% + 6\%) \times 300 = 0.36 \times 300 = 108$ million. 2015: $(35\% + 8\%) \times 240 = 0.43 \times 240 = 103.2$ million.`,
          String.raw`$\frac{108}{103.2} \approx 1.0465$, about 105%. Adding the percents first is allowed because both sectors belong to the same graph (same base).`,
        ],
      },
    ],
  },
};

export default section;
