import type { Section, DiagramRef } from "../types";

const D = "4-1-presenting-data";
const SCALE_NOTE = String.raw`Drawn to scale: values can be read from the gridlines.`;

/* ---------------- shared data displays (all numbers verified with python3) ---------------- */

const libraryBars = {
  title: "Books borrowed in one week",
  categories: ["Eastside", "Harbor", "Midtown", "Parkview", "Westgate"],
  series: [{ name: "Books", values: [350, 600, 450, 750, 250] }],
  yMax: 800,
  yStep: 100,
  yMinor: 50,
  yLabel: "Books borrowed",
};

const rainGrouped = {
  title: "October rainfall",
  categories: ["Station|A", "Station|B", "Station|C", "Station|D"],
  series: [
    { name: "2023", values: [80, 120, 40, 100] },
    { name: "2024", values: [60, 140, 70, 90] },
  ],
  mode: "grouped",
  yMax: 160,
  yStep: 20,
  yMinor: 10,
  yLabel: "Millimeters",
};

const ticketsStacked = {
  title: "Theater tickets sold",
  categories: ["Fri", "Sat", "Sun", "Mon"],
  series: [
    { name: "Child", values: [60, 90, 110, 30] },
    { name: "Adult", values: [140, 160, 130, 50] },
  ],
  mode: "stacked",
  yMax: 250,
  yStep: 50,
  yMinor: 25,
  yLabel: "Tickets",
};

const brokenBars = {
  title: "Units sold per month",
  categories: ["Jan", "Feb", "Mar", "Apr"],
  series: [{ name: "Units", values: [52, 58, 61, 55] }],
  yMin: 40,
  yMax: 65,
  yStep: 5,
  yLabel: "Units",
};

const waitHist = {
  title: "Waiting time of 50 patients",
  edges: [0, 10, 20, 30, 40, 50, 60],
  counts: [4, 9, 15, 12, 7, 3],
  yMax: 16,
  yStep: 4,
  yMinor: 2,
  xLabel: "Waiting time (minutes)",
  yLabel: "Number of patients",
  showValues: true,
};

const carsRelHist = {
  title: "Cars per household (40 households)",
  edges: [-0.5, 0.5, 1.5, 2.5, 3.5, 4.5],
  counts: [10, 35, 30, 17.5, 7.5],
  tickMode: "mids",
  midLabels: ["0", "1", "2", "3", "4"],
  yMax: 40,
  yStep: 10,
  yMinor: 5,
  fmt: { suffix: "%" },
  xLabel: "Number of cars",
  yLabel: "Relative frequency",
  showValues: true,
};

const budgetCircle = {
  title: "Monthly household budget",
  totalText: "Total: $2,400",
  slices: [
    { label: "Housing", value: 40 },
    { label: "Food", value: 20 },
    { label: "Transport", value: 15 },
    { label: "Savings", value: 10 },
    { label: "Utilities", value: 10 },
    { label: "Other", value: 5 },
  ],
};

const heatScatter = {
  title: "Heating cost and temperature",
  points: [
    [20, 9.4], [24, 8.1], [28, 8.4], [32, 8.4], [36, 7.1], [40, 6.4], [44, 6.9], [48, 6.7],
    [52, 5.4], [56, 5.5], [60, 4.5], [64, 5.0], [68, 4.4], [72, 3.5], [76, 3.7], [80, 2.6],
  ],
  xMin: 10,
  xMax: 90,
  xStep: 10,
  yMax: 10,
  yStep: 2,
  yMinor: 1,
  xLabel: "Outdoor temperature (°F)",
  yLabel: "Daily heating cost ($)",
  trend: [20, 9, 80, 3],
  trendLabel: "trend line",
  trendLabelPos: [70, 6.6],
};

const visitsLine = {
  title: "Website visits (thousands)",
  xs: ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  series: [{ name: "Visits", values: [100, 130, 150, 140, 80, 110, 160, 170, 190] }],
  yMax: 200,
  yStep: 20,
  yMinor: 10,
  yLabel: "Visits (thousands)",
  xLabel: "Year",
};

const ref = (name: string, props: object, caption?: string): DiagramRef => ({ key: `${D}/${name}`, props: props as Record<string, unknown>, caption });

const section: Section = {
  id: "4-1-presenting-data",
  number: "4.1",
  title: "Methods for Presenting Data",
  part: "data-analysis",
  mrPages: "125–139",
  summary: String.raw`Frequency tables, bar graphs, histograms, circle graphs, scatterplots and line graphs: how each display is built, what its axes promise, and how to read values off it exactly, or approximately when the question says so.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Variables, frequencies and relative frequencies" },
    {
      kind: "p",
      text: String.raw`Data analysis starts with a [[variable]]: any characteristic that can vary across a population of individuals or objects. A [[quantitative-variable|quantitative (numerical) variable]] is a number, such as age or the number of cars in a household; a [[categorical-variable|categorical (nonnumerical) variable]] is a label, such as eye color. The [[distribution]] of a variable tells you how often each category or value shows up (MR p. 125).`,
    },
    {
      kind: "p",
      text: String.raw`The number of times a value occurs is its [[frequency]] (or count). A [[frequency-distribution|frequency distribution]] pairs every value with its frequency, usually as a two-column table. Dividing each frequency by the total number of data gives the [[relative-frequency|relative frequency]]; a table of these is a [[relative-frequency-distribution|relative frequency distribution]]. Relative frequencies can be written as fractions, decimals or percents, and they always add up to $1$, or $100\%$ (MR pp. 125–128).`,
    },
    {
      kind: "math",
      tex: String.raw`\begin{array}{c|c|c} \text{Cars} & \text{Frequency} & \text{Relative frequency}\\ \hline 0 & 4 & 10\%\\ 1 & 14 & 35\%\\ 2 & 12 & 30\%\\ 3 & 7 & 17.5\%\\ 4 & 3 & 7.5\%\\ \hline \text{Total} & 40 & 100\% \end{array}`,
    },
    {
      kind: "p",
      text: String.raw`The table above summarizes a survey of $40$ households. Each relative frequency is a frequency over $40$: $\frac{7}{40} = 17.5\%$. The conversion works backward too, and the GRE likes that direction: if you are told that the $14$ households with one car are $35\%$ of the survey, then the total is $14 \div 0.35 = 40$.`,
    },
    {
      kind: "p",
      text: String.raw`When a numerical variable has many different values, the values are grouped into [[class|classes]]: the whole range is cut into intervals of equal length, and you count how many values land in each. Test scores from $41$ to $100$ might be grouped into the classes $41$–$50$, $51$–$60$, and so on. You gain a readable table and lose the individual values: from a class count you can never recover exactly which scores were in it (MR p. 133).`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Frequency or relative frequency?",
      text: String.raw`A question about "how many" needs a frequency; "what fraction" or "what percent" needs a relative frequency. Many Data Interpretation items give you one and ask for the other, so the bridge is always the total: frequency $=$ relative frequency $\times$ total.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Bar graphs" },
    {
      kind: "p",
      text: String.raw`In a [[bar-graph|bar graph]] (or bar chart) each category or value gets a rectangular bar. All the bars have the same width, and the height of each bar is proportional to its frequency or relative frequency. Bars may be vertical or horizontal. Bar graphs make comparisons across categories easier than a table does (MR p. 130).`,
    },
    { kind: "diagram", diagram: ref("bar-graph", libraryBars, String.raw`A bar graph. ${SCALE_NOTE} Parkview is $750$; Westgate is $250$.`) },
    {
      kind: "p",
      text: String.raw`Reading is the whole skill. Find the top of the bar, slide horizontally to the vertical axis, and read the gridlines. Here Midtown is exactly $450$ because its top sits on the lighter gridline halfway between $400$ and $500$. A question will say "approximately" when the top falls between gridlines, and then your answer is judged to the precision of the picture. Look at the axis before you look at the bars: the title, the unit, and whether the numbers are in thousands or millions decide the answer.`,
    },
    {
      kind: "p",
      text: String.raw`Two bars per category (the same categories at two times, say) give a grouped, or side-by-side, bar graph. The legend tells you which shading is which series.`,
    },
    { kind: "diagram", diagram: ref("bar-graph", rainGrouped, String.raw`Side-by-side bars. Station B received $140$ mm in 2024, up $20$ mm from $120$ mm in 2023; Station A fell from $80$ mm to $60$ mm.`) },
    {
      kind: "p",
      text: String.raw`A [[segmented-bar-graph|segmented (stacked) bar graph]] splits each bar into pieces that show how the variable separates into related parts. The top of the whole bar is the total. The bottom segment is read straight off the axis, but each higher segment must be read as a _difference_: its size is the level of its top edge minus the level of its bottom edge (MR p. 132).`,
    },
    { kind: "diagram", diagram: ref("bar-graph", ticketsStacked, String.raw`Segmented bars. On Saturday the total is $250$; the child segment ends at $90$, so adult tickets are $250 - 90 = 160$.`) },
    {
      kind: "aside",
      tone: "watch",
      title: "The top of a segment is not the segment's size",
      text: String.raw`On Sunday the adult segment's top edge is at $240$, but the adult tickets sold are $240 - 110 = 130$. Reading the top edge as the quantity is the standard stacked-bar mistake, and the wrong answer choice is usually sitting there waiting for it.`,
    },
    {
      kind: "p",
      text: String.raw`The Math Conventions warn that graphs use "scales that do not begin at 0" and "[[broken-scale|broken scales]]" (MC p. 16). A zigzag on the axis tells you part of the scale was skipped. Heights then stop being proportional to values, so compare the labeled numbers, not the looks of the bars.`,
    },
    { kind: "diagram", diagram: ref("bar-graph", brokenBars, String.raw`A broken scale: the axis jumps from $0$ to $40$, so the bars exaggerate the differences between values that are actually close.`) },
    {
      kind: "p",
      text: String.raw`In that figure the January and February bars rise $12$ and $18$ units above the $40$ line, so February looks $1.5$ times as large. The true values are $52$ and $58$, a ratio of only $58/52 \approx 1.12$. Anytime the axis does not start at $0$, read numbers, and compute ratios and percent changes from the numbers.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Histograms" },
    {
      kind: "p",
      text: String.raw`A [[histogram]] graphs the frequency distribution of a numerical variable, and it looks like a bar graph with two differences. The horizontal axis is a number line, so the classes sit in order and to scale; and there are no regular spaces between bars. A space between bars means that the interval it covers contains no data at all (MR pp. 133–134).`,
    },
    { kind: "diagram", diagram: ref("histogram", waitHist, String.raw`The class $20$–$30$ is the tallest ($15$ patients). Adding the bar heights gives $4+9+15+12+7+3 = 50$ patients. Each class includes its left endpoint but not its right.`) },
    {
      kind: "p",
      text: String.raw`Because the bars have equal width, the area of each bar is proportional to the amount of data it represents, so height alone does the comparing. When the numerical variable takes only a few values, such as the number of cars in a household, the bars are centered over the values themselves, and the heights can be relative frequencies. If the bar widths are $1$, the total area is exactly $100\%$, or $1$; that fact becomes the heart of probability distributions in Section 4.5 (MR p. 135).`,
    },
    { kind: "diagram", diagram: ref("histogram", carsRelHist, String.raw`A relative frequency histogram: each bar is centered on its value and its height is the percent of households. The heights add to $10+35+30+17.5+7.5 = 100$.`) },
    {
      kind: "p",
      text: String.raw`The shape tells a story. This one is a mound with a single peak at $1$ car and a tail trailing to the right. The class width matters, too: grouping the same data into wide classes smooths out detail, and narrow classes expose it. Try it below.`,
    },
    {
      kind: "interactive",
      key: `${D}/histogram-explorer`,
      title: "Histogram class-width explorer",
      caption: String.raw`The same $40$ scores, grouped into classes of different widths. Notice that the bar heights always add up to $40$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Histogram versus bar graph",
      text: String.raw`If the horizontal axis is a number line with touching bars, it is a histogram, and a gap means "no data here". If the horizontal axis lists separate categories, it is a bar graph, and gaps between bars are just decoration. Also remember what a histogram cannot tell you: the individual values inside a class.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Circle graphs" },
    {
      kind: "p",
      text: String.raw`A [[circle-graph|circle graph]] (often called a pie chart) shows how a whole is separated into a few parts. Each part is a [[sector|sector]], and its area (and its central angle) is proportional to the part of the whole that it represents (MR pp. 135–136). By convention, the whole circle is $100\%$ of whatever the title says it is (MC p. 16).`,
    },
    { kind: "diagram", diagram: ref("circle-graph", budgetCircle, String.raw`The Housing sector is $40\%$ of the circle: its central angle is $0.40 \times 360^\circ = 144^\circ$ and it stands for $0.40 \times \$2{,}400 = \$960$.`) },
    {
      kind: "math",
      tex: String.raw`\text{central angle} = \text{percent} \times 360^\circ, \qquad \text{amount} = \text{percent} \times \text{total}`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`The second formula is the one the GRE uses most. A circle graph usually shows percents and a total, and the question asks for dollars or people, or the reverse. (The central-angle formula is the general form of the $360^\circ$ idea; the Math Review illustrates it with a single worked case.) Below, one data set is shown three ways. Switch displays and watch what stays the same (the proportions) and what changes (the labels).`,
    },
    {
      kind: "interactive",
      key: `${D}/display-explorer`,
      title: "One data set, three displays",
      caption: String.raw`Frequency bars, relative frequency bars and a circle graph all come from the same counts. The central angle is the percent times $360^\circ$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Two circle graphs, two different wholes",
      text: String.raw`Percents from different circle graphs are percents of different totals. A $20\%$ sector of a graph with total $400$ is $80$ items, which is more than a $30\%$ sector of a graph with total $200$ ($60$ items). Before comparing sectors across graphs, convert both to actual amounts.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Scatterplots and trend lines" },
    {
      kind: "p",
      text: String.raw`A [[scatterplot]] shows the relationship between two numerical variables observed on the same individuals. One variable goes on the horizontal axis, the other on the vertical axis, and each individual becomes a point $(x, y)$. The cloud of points often shows an overall pattern, a [[trend-line|trend]], and a line or curve that best represents it, a trend line, is often drawn and used to make predictions (MR pp. 136–137).`,
    },
    { kind: "diagram", diagram: ref("scatterplot", heatScatter, String.raw`Sixteen days: as the outdoor temperature rises, the heating cost falls. The trend line passes through $(20, 9)$ and $(80, 3)$.`) },
    {
      kind: "p",
      text: String.raw`The GRE favors one computation here: the slope of the trend line. Pick two points that sit exactly on gridlines, ideally far apart, and use the slope formula, keeping track of the units. Slope is "units of $y$ per unit of $x$".`,
    },
    {
      kind: "math",
      tex: String.raw`\text{slope} = \frac{3 - 9}{80 - 20} = \frac{-6}{60} = -0.1 \ \text{dollars per }^\circ\text{F}`,
    },
    {
      kind: "p",
      text: String.raw`So the trend line predicts that each $10^\circ$ rise in temperature lowers the daily cost by about $\$1$. Notice that the trend line is the model; the data points are the evidence. A point can sit well above or below the line, and the line's prediction at a given $x$ is read where the vertical line at that $x$ meets the trend line, not where the nearest dot is. And predictions are safest inside the range of the data. At $x = 120$ the line would give a negative cost, which is nonsense.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Convert units last",
      text: String.raw`If the question asks for "cents per degree" or "minutes per 10 units", compute the slope in the graph's own units first, then multiply or divide. Converting dollars to cents inside the slope formula is a common source of slips.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Line graphs and time series" },
    {
      kind: "p",
      text: String.raw`A [[line-graph|line graph]] also relates two numerical variables, and is especially natural when one of them is time. There is at most one point for each value on the horizontal axis, as for a function, and consecutive points are joined by line segments. When time is on the horizontal axis, labeled at regular intervals, the line graph is called a [[time-series|time series]] (MR pp. 138–139).`,
    },
    { kind: "diagram", diagram: ref("line-graph", visitsLine, String.raw`A time series. ${SCALE_NOTE} Visits fell from $140$ (2019) to $80$ (2020), then rose to $110$ (2021).`) },
    {
      kind: "p",
      text: String.raw`The steepest upward segment is the greatest increase; the steepest downward segment is the greatest decrease. Between 2021 and 2022 the line climbs from $110$ to $160$, a rise of $50$, the largest of any year in the graph. But be careful to separate _change_ from _percent change_. The percent change divides by the earlier value:`,
    },
    {
      kind: "math",
      tex: String.raw`\text{percent change} = \frac{\text{new} - \text{old}}{\text{old}} \times 100\%`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`From 2016 to 2017 the graph rises by $30$ (from $100$ to $130$), and from 2020 to 2021 it also rises by $30$ (from $80$ to $110$). The increases are equal in size, yet the percent increases are $30\%$ and $37.5\%$: the same change on a smaller base is a bigger percent. A question that asks for the "greatest percent increase" is not necessarily the steepest segment.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Almost every question in this area is solved the same way: identify what the display is (bar graph, histogram, circle graph, and so on), read the axes and the title before anything else, pull out the exact numbers from the gridlines, and only then do the arithmetic. The Math Conventions promise that graphs are drawn to scale (MC p. 16), so when a question says "approximately", you may read between gridlines.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "The classic traps",
      text: String.raw`Reading the top edge of a stacked segment as its size. Trusting bar heights when the axis is broken or does not start at $0$. Treating a histogram gap as decoration. Comparing percents from circle graphs with different totals. Confusing a change with a percent change. And mixing up a frequency with a relative frequency: always say to yourself which one you are holding, and what the total is.`,
    },
  ],

  /* ================================================================== */
  terms: [
    {
      id: "variable",
      term: "variable",
      turkish: "değişken",
      definition: String.raw`Any characteristic that can vary for a population of individuals or objects. Data are collected from a population by observing one or more variables.`,
      source: "MR p. 125",
    },
    {
      id: "quantitative-variable",
      term: "quantitative (numerical) variable",
      turkish: "nicel (sayısal) değişken",
      definition: String.raw`A variable whose values are numbers, such as age.`,
      source: "MR p. 125",
    },
    {
      id: "categorical-variable",
      term: "categorical (nonnumerical) variable",
      turkish: "nitel (kategorik) değişken",
      definition: String.raw`A variable whose values are categories rather than numbers, such as eye color.`,
      source: "MR p. 125",
    },
    {
      id: "distribution",
      term: "distribution",
      turkish: "dağılım",
      definition: String.raw`The distribution of a variable (or of data) indicates how frequently different categorical or numerical values are observed in the data.`,
      source: "MR p. 125",
    },
    {
      id: "frequency",
      term: "frequency (count)",
      turkish: "frekans / sıklık",
      definition: String.raw`The number of times a category or numerical value appears in the data.`,
      source: "MR p. 125",
    },
    {
      id: "frequency-distribution",
      term: "frequency distribution",
      turkish: "frekans dağılımı (frekans tablosu)",
      definition: String.raw`A table or graph that presents the categories or numerical values along with their corresponding frequencies.`,
      source: "MR p. 125",
    },
    {
      id: "relative-frequency",
      term: "relative frequency",
      turkish: "bağıl frekans / göreli frekans",
      definition: String.raw`The frequency of a category or value divided by the total number of data. It may be given as a fraction, decimal or percent.`,
      formula: String.raw`\text{relative frequency} = \frac{\text{frequency}}{\text{total number of data}}`,
      source: "MR pp. 125–126",
    },
    {
      id: "relative-frequency-distribution",
      term: "relative frequency distribution",
      turkish: "bağıl frekans dağılımı",
      definition: String.raw`A table or graph that presents the relative frequencies of the categories or numerical values. The relative frequencies add up to $100\%$ (or $1$).`,
      source: "MR pp. 126, 128",
    },
    {
      id: "class",
      term: "class",
      turkish: "sınıf (sınıf aralığı)",
      definition: String.raw`One of the intervals of equal length into which the values of a numerical variable are grouped; the data falling in each interval are counted.`,
      source: "MR p. 133",
    },
    {
      id: "bar-graph",
      term: "bar graph (bar chart)",
      turkish: "sütun grafiği / çubuk grafiği",
      definition: String.raw`Each category or value is shown as a rectangular bar of the same width, with height proportional to its frequency or relative frequency. Bars may be vertical or horizontal.`,
      diagram: ref("bar-graph", { ...libraryBars, highlight: 3 }, String.raw`Each bar's height is proportional to its value (Parkview highlighted).`),
      source: "MR p. 130",
    },
    {
      id: "segmented-bar-graph",
      term: "segmented (stacked) bar graph",
      turkish: "yığılmış sütun grafiği / bölmeli sütun grafiği",
      definition: String.raw`A bar graph in which each bar is divided into smaller rectangles that show how the variable is separated into related parts.`,
      diagram: ref("bar-graph", ticketsStacked, String.raw`Each bar is split into child and adult tickets.`),
      source: "MR p. 132",
    },
    {
      id: "histogram",
      term: "histogram",
      turkish: "histogram",
      definition: String.raw`A graph of a frequency distribution of a numerical variable. It has a number line as its horizontal axis and no regular spaces between bars; a space means there are no data in that interval.`,
      diagram: ref("histogram", { ...waitHist, highlight: [2] }, String.raw`The number line is the horizontal axis; bars touch.`),
      source: "MR pp. 133–134",
    },
    {
      id: "circle-graph",
      term: "circle graph (pie chart)",
      turkish: "daire grafiği (pasta grafiği)",
      definition: String.raw`A graph that shows how a whole is separated into a small number of parts. The area of each sector is proportional to the part of the whole it represents.`,
      diagram: ref("circle-graph", budgetCircle, String.raw`The whole circle is $100\%$ of the total shown.`),
      source: "MR p. 135; MC p. 16",
    },
    {
      id: "sector",
      term: "sector (of a circle graph)",
      turkish: "daire dilimi",
      definition: String.raw`Each part of a circle graph. Its central angle is its percent of $360^\circ$.`,
      diagram: ref("circle-graph", { ...budgetCircle, highlight: 0, showAngle: true }, String.raw`The Housing sector: $40\%$ of $360^\circ$ is $144^\circ$.`),
      source: "MR p. 136",
    },
    {
      id: "scatterplot",
      term: "scatterplot",
      turkish: "serpme diyagramı / dağılım grafiği",
      definition: String.raw`A graph that shows the relationship between two numerical variables observed on the same individuals. Each individual is plotted as a point $(x, y)$.`,
      diagram: ref("scatterplot", { ...heatScatter, trend: undefined, trendLabel: undefined }),
      source: "MR p. 136",
    },
    {
      id: "trend-line",
      term: "trend (trend line)",
      turkish: "eğilim / eğilim doğrusu",
      definition: String.raw`An overall pattern in the relationship between two variables. A line or curve that best represents the trend is often drawn on the scatterplot and used to make predictions.`,
      diagram: ref("scatterplot", heatScatter),
      source: "MR pp. 137–138",
    },
    {
      id: "line-graph",
      term: "line graph",
      turkish: "çizgi grafiği",
      definition: String.raw`A graph relating two numerical variables, especially when one is time. There is at most one point for each value on the horizontal axis, and consecutive points are connected by line segments.`,
      diagram: ref("line-graph", visitsLine),
      source: "MR pp. 138–139",
    },
    {
      id: "time-series",
      term: "time series",
      turkish: "zaman serisi",
      definition: String.raw`A line graph with time on the horizontal axis, labeled at regular intervals. Each point may represent an interval of time (a day, a year) or an instant.`,
      source: "MR p. 139",
    },
    {
      id: "broken-scale",
      term: "broken scale",
      turkish: "kırık (kesikli) ölçek",
      definition: String.raw`An axis that skips part of its range, usually marked with a zigzag. Heights no longer stay proportional to values, so read the labeled numbers.`,
      diagram: ref("bar-graph", brokenBars),
      note: "Not named in the ETS Math Review; the Math Conventions mention broken scales",
      source: "MC p. 16",
    },
  ],

  /* ================================================================== */
  examples: [
    {
      id: "e1",
      type: "mc1",
      difficulty: "medium",
      diagram: ref(
        "bar-graph",
        {
          title: "Online orders by week",
          categories: ["Week|1", "Week|2", "Week|3", "Week|4"],
          series: [
            { name: "Standard", values: [150, 225, 50, 150] },
            { name: "Express", values: [50, 75, 25, 50] },
          ],
          mode: "stacked",
          yMax: 300,
          yStep: 50,
          yMinor: 25,
          yLabel: "Orders",
        },
        SCALE_NOTE,
      ),
      stem: String.raw`In the segmented bar graph, the express orders are the top segment of each bar. For which week was the express share of that week's orders greatest?`,
      choices: [String.raw`Week 1`, String.raw`Week 2`, String.raw`Week 3`, String.raw`Week 4`, String.raw`The share was the same in all four weeks`],
      answer: 2,
      explanation: [
        String.raw`Read the segments as differences. The bar totals are $200$, $300$, $75$, $200$; the standard segments end at $150$, $225$, $50$, $150$; so express orders are $50$, $75$, $25$, $50$.`,
        String.raw`Express shares: $\frac{50}{200} = 25\%$, $\frac{75}{300} = 25\%$, $\frac{25}{75} = 33.\overline{3}\%$, $\frac{50}{200} = 25\%$.`,
        String.raw`Week 3 has the smallest bar and the smallest express count, but the largest express share. The trap is to pick Week 2, which has the tallest express segment.`,
      ],
    },
    {
      id: "e2",
      type: "ne",
      difficulty: "medium",
      diagram: ref(
        "circle-graph",
        {
          title: "Annual expenses",
          totalText: "Total: $480,000",
          slices: [
            { label: "Salaries", value: 45 },
            { label: "Rent", value: 20 },
            { label: "Marketing", value: 15 },
            { label: "Equipment", value: 12 },
            { label: "Other", value: 8 },
          ],
          hidePercent: [4],
        },
        String.raw`The percent for Other is not printed.`,
      ),
      stem: String.raw`In the circle graph, the percent for the Other sector is not shown. What is the measure, in degrees, of the central angle of the Other sector?`,
      suffix: "degrees",
      answer: { kind: "decimal", value: "28.8" },
      explanation: [
        String.raw`A circle graph represents $100\%$ of the total, so Other is $100 - (45 + 20 + 15 + 12) = 8\%$.`,
        String.raw`Central angle $= 0.08 \times 360^\circ = 28.8^\circ$. (The dollar total, $\$480{,}000$, is not needed for the angle; it would give $0.08 \times 480{,}000 = \$38{,}400$ for Other.)`,
      ],
    },
    {
      id: "e3",
      type: "qc",
      difficulty: "medium",
      diagram: ref(
        "histogram",
        {
          title: "Commute times of 80 workers",
          edges: [0, 10, 20, 30, 40, 50, 60],
          counts: [8, 22, 26, 14, 7, 3],
          yMax: 28,
          yStep: 4,
          yMinor: 2,
          xLabel: "Commute time (minutes)",
          yLabel: "Number of workers",
        },
        String.raw`Each class includes its left endpoint but not its right.`,
      ),
      quantityA: String.raw`The percent of the workers whose commute is less than $20$ minutes`,
      quantityB: String.raw`The percent of the workers whose commute is at least $30$ minutes`,
      answer: "A",
      explanation: [
        String.raw`Read the bar heights: $8, 22, 26, 14, 7, 3$, which add up to $80$ workers.`,
        String.raw`Quantity A: classes $0$–$10$ and $10$–$20$ give $8 + 22 = 30$ workers, and $\frac{30}{80} = 37.5\%$.`,
        String.raw`Quantity B: classes from $30$ up give $14 + 7 + 3 = 24$ workers, and $\frac{24}{80} = 30\%$.`,
        String.raw`$37.5\% > 30\%$, so Quantity A is greater. Notice that the tallest bar ($26$, at $20$–$30$) belongs to neither quantity.`,
      ],
    },
    {
      id: "e4",
      type: "mcm",
      difficulty: "hard",
      diagram: ref(
        "line-graph",
        {
          title: "Revenue of two stores ($ thousands)",
          xs: ["2018", "2019", "2020", "2021", "2022", "2023"],
          series: [
            { name: "Store X", values: [60, 80, 70, 100, 120, 110] },
            { name: "Store Y", values: [50, 60, 90, 80, 100, 130], dashed: true },
          ],
          yMax: 140,
          yStep: 20,
          yMinor: 10,
          yLabel: "Revenue ($ thousands)",
          xLabel: "Year",
        },
        String.raw`Store X: solid line. Store Y: dashed line.`,
      ),
      stem: String.raw`In which of the following years did Store X's revenue exceed Store Y's revenue by more than $20\%$ of Store Y's revenue? Indicate all such years.`,
      choices: [String.raw`2018`, String.raw`2019`, String.raw`2020`, String.raw`2021`, String.raw`2022`, String.raw`2023`],
      answer: [1, 3],
      explanation: [
        String.raw`Read both series: X is $60, 80, 70, 100, 120, 110$ and Y is $50, 60, 90, 80, 100, 130$.`,
        String.raw`The excess of X over Y relative to Y is $\frac{10}{50} = 20\%$ in 2018, $\frac{20}{60} = 33.\overline{3}\%$ in 2019, negative in 2020, $\frac{20}{80} = 25\%$ in 2021, $\frac{20}{100} = 20\%$ in 2022, and negative in 2023.`,
        String.raw`"More than $20\%$" excludes exactly $20\%$, so 2018 and 2022 fail. Only 2019 and 2021 qualify. Both exact-$20\%$ years are the trap.`,
      ],
    },
  ],

  /* ================================================================== */
  quick: [
    {
      id: "q1",
      prompt: String.raw`In a data set of $36$ values, the value $7$ appears $9$ times. What are its frequency and its relative frequency?`,
      answer: String.raw`Frequency $9$; relative frequency $25\%$.`,
      explanation: String.raw`The frequency is the count, $9$. The relative frequency is $\frac{9}{36} = \frac14 = 25\%$.`,
    },
    {
      id: "q2",
      prompt: String.raw`A sector of a circle graph represents $35\%$ of the whole. What is its central angle?`,
      answer: String.raw`$126^\circ$`,
      explanation: String.raw`$0.35 \times 360^\circ = 126^\circ$.`,
    },
    {
      id: "q3",
      prompt: String.raw`A histogram with equal-width classes has a visible empty space between two bars. What does the space mean?`,
      answer: String.raw`There are no data in the interval the space covers.`,
      explanation: String.raw`In a histogram the horizontal axis is a number line with no regular spaces between bars, so a space is a class with frequency $0$ (MR p. 134).`,
    },
    {
      id: "q4",
      prompt: String.raw`A time series has the values $80$ and then $110$ in consecutive years. What is the percent increase?`,
      answer: String.raw`$37.5\%$`,
      explanation: String.raw`$\frac{110 - 80}{80} = \frac{30}{80} = 37.5\%$. Divide by the earlier value.`,
    },
    {
      id: "q5",
      prompt: String.raw`A trend line passes through $(10, 40)$ and $(50, 28)$. What is its slope, and by how much does the predicted $y$ change when $x$ increases by $10$?`,
      answer: String.raw`Slope $-0.3$; $y$ drops by $3$.`,
      explanation: String.raw`$\frac{28 - 40}{50 - 10} = \frac{-12}{40} = -0.3$, and $10 \times (-0.3) = -3$.`,
    },
    {
      id: "q6",
      prompt: String.raw`On a bar graph whose vertical axis starts at $40$ (broken from $0$), bars A and B reach $50$ and $60$. How many times as tall as bar A does bar B look above the $40$ line, and what is the true ratio of their values?`,
      answer: String.raw`It looks $2$ times as tall; the true ratio is $1.2$.`,
      explanation: String.raw`Above the $40$ line the bars are $10$ and $20$ units tall, which looks like a ratio of $2$. The values are $50$ and $60$, so $\frac{60}{50} = 1.2$.`,
    },
  ],

  /* ================================================================== */
  quiz: {
    sets: [
      {
        id: "recycling",
        title: String.raw`Recycling collected in four neighborhoods`,
        intro: String.raw`Questions 1 to 3 refer to the graph. Amounts are in tons per year.`,
        diagram: ref(
          "bar-graph",
          {
            title: "Recycling collected (tons)",
            categories: ["Northgate", "Riverside", "Old|Town", "Hillcrest"],
            series: [
              { name: "2023", values: [30, 45, 25, 50] },
              { name: "2024", values: [40, 35, 35, 55] },
            ],
            mode: "grouped",
            yMax: 60,
            yStep: 10,
            yMinor: 5,
            yLabel: "Tons",
          },
          SCALE_NOTE,
        ),
      },
      {
        id: "budget",
        title: String.raw`Activity budget of a school`,
        intro: String.raw`Questions 4 to 6 refer to the circle graph. The percent for the Trips sector is not shown.`,
        diagram: ref("circle-graph", {
          title: "Activity budget",
          totalText: "Total: $15,000",
          slices: [
            { label: "Sports", value: 32 },
            { label: "Music", value: 24 },
            { label: "Drama", value: 16 },
            { label: "Clubs", value: 12 },
            { label: "Trips", value: 10 },
            { label: "Supplies", value: 6 },
          ],
          hidePercent: [4],
        }),
      },
    ],
    questions: [
      {
        id: "z1",
        type: "qc",
        setId: "recycling",
        difficulty: "medium",
        quantityA: String.raw`The percent increase in recycling collected, 2023 to 2024, in Old Town`,
        quantityB: String.raw`The percent increase in recycling collected, 2023 to 2024, in Northgate`,
        answer: "A",
        explanation: [
          String.raw`Both neighborhoods rose by $10$ tons, so the absolute changes tie. The percent change depends on the starting amount.`,
          String.raw`Old Town: $\frac{35 - 25}{25} = 40\%$. Northgate: $\frac{40 - 30}{30} = 33.\overline{3}\%$.`,
          String.raw`The same increase on the smaller base ($25$) is the bigger percent, so Quantity A is greater.`,
        ],
      },
      {
        id: "z2",
        type: "mc1",
        setId: "recycling",
        difficulty: "medium",
        stem: String.raw`By approximately what percent did the total recycling collected in the four neighborhoods change from 2023 to 2024?`,
        choices: [String.raw`$5\%$ increase`, String.raw`$7.5\%$ increase`, String.raw`$10\%$ increase`, String.raw`$12.5\%$ increase`, String.raw`$15\%$ increase`],
        answer: 2,
        explanation: [
          String.raw`Add each year first: 2023 total $30 + 45 + 25 + 50 = 150$; 2024 total $40 + 35 + 35 + 55 = 165$.`,
          String.raw`Change $= \frac{165 - 150}{150} = 10\%$.`,
          String.raw`The trap is averaging the four neighborhood percent changes ($33.\overline{3}$, $-22.\overline{2}$, $40$, $10$), which gives about $15.3\%$, the choice marked $15\%$. Percent changes of parts cannot be averaged without weights; combine the amounts instead.`,
        ],
      },
      {
        id: "z3",
        type: "mcm",
        setId: "recycling",
        difficulty: "hard",
        stem: String.raw`For which of the following neighborhoods was the 2024 amount at least $10\%$ greater than the 2023 amount? Indicate all such neighborhoods.`,
        choices: [String.raw`Northgate`, String.raw`Riverside`, String.raw`Old Town`, String.raw`Hillcrest`],
        answer: [0, 2, 3],
        explanation: [
          String.raw`The ratios 2024 to 2023 are $\frac{40}{30} \approx 1.33$, $\frac{35}{45} \approx 0.78$, $\frac{35}{25} = 1.40$, $\frac{55}{50} = 1.10$.`,
          String.raw`"At least $10\%$ greater" means a ratio of $1.10$ or more, and Hillcrest is exactly $1.10$ ($5$ tons on a base of $50$), so it counts. Riverside decreased.`,
        ],
      },
      {
        id: "z4",
        type: "ne",
        setId: "budget",
        difficulty: "hard",
        stem: String.raw`Next year the total budget will be $\$18{,}000$. If the dollar amount for Trips does not change, Trips will be what percent of next year's budget? Give your answer to the nearest tenth of a percent.`,
        suffix: "%",
        answer: { kind: "decimal", value: "8.3" },
        explanation: [
          String.raw`Trips is not labeled, so find it: the other sectors total $32 + 24 + 16 + 12 + 6 = 90\%$, so Trips is $10\%$.`,
          String.raw`Dollar amount: $0.10 \times 15{,}000 = \$1{,}500$.`,
          String.raw`Next year: $\frac{1{,}500}{18{,}000} = 0.08\overline{3} \approx 8.3\%$.`,
        ],
      },
      {
        id: "z5",
        type: "qc",
        setId: "budget",
        difficulty: "hard",
        quantityA: String.raw`The measure of the central angle of the Drama sector and the Supplies sector combined`,
        quantityB: String.raw`$80^\circ$`,
        answer: "B",
        explanation: [
          String.raw`The two sectors are $16\% + 6\% = 22\%$ of the circle.`,
          String.raw`$0.22 \times 360^\circ = 79.2^\circ$, which is less than $80^\circ$. Quantity B is greater.`,
          String.raw`The two are close, so estimating "about $80^\circ$" would be a mistake; compute the exact angle.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        setId: "budget",
        difficulty: "medium",
        stem: String.raw`How many dollars more is budgeted for Sports than for Drama and Clubs combined?`,
        choices: [String.raw`$\$300$`, String.raw`$\$450$`, String.raw`$\$600$`, String.raw`$\$750$`, String.raw`$\$900$`],
        answer: 2,
        explanation: [
          String.raw`Drama and Clubs together are $16\% + 12\% = 28\%$, and Sports is $32\%$, a difference of $4$ percentage points.`,
          String.raw`$0.04 \times 15{,}000 = \$600$.`,
        ],
      },
      {
        id: "z7",
        type: "mc1",
        difficulty: "hard",
        diagram: ref(
          "histogram",
          {
            title: "Books read last month (survey)",
            edges: [-0.5, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5],
            counts: [5, 15, 30, 25, 20, 5],
            tickMode: "mids",
            midLabels: ["0", "1", "2", "3", "4", "5"],
            yMax: 30,
            yStep: 5,
            fmt: { suffix: "%" },
            xLabel: "Number of books",
            yLabel: "Relative frequency",
          },
          SCALE_NOTE,
        ),
        stem: String.raw`In the survey, exactly $36$ students read exactly $1$ book. How many students read at least $3$ books?`,
        choices: [String.raw`$72$`, String.raw`$96$`, String.raw`$108$`, String.raw`$120$`, String.raw`$144$`],
        answer: 3,
        explanation: [
          String.raw`The bar over $1$ reaches $15\%$, and that group has $36$ students, so the number surveyed is $36 \div 0.15 = 240$.`,
          String.raw`At least $3$ books: $25\% + 20\% + 5\% = 50\%$ of $240$, which is $120$.`,
          String.raw`The heights are relative frequencies, not counts; reading $25 + 20 + 5 = 50$ students would be the trap.`,
        ],
      },
      {
        id: "z8",
        type: "ne",
        difficulty: "hard",
        diagram: ref(
          "scatterplot",
          {
            title: "Resale value of 12 cars",
            points: [[0.5, 21.1], [1, 18.9], [2, 18.5], [2.5, 16.4], [3.5, 16.1], [4, 15.9], [5, 13.0], [6, 11.6], [7, 11.2], [8, 8.4], [9, 8.0], [9.5, 6.5]],
            xMin: 0,
            xMax: 10,
            xStep: 1,
            yMin: 3,
            yMax: 24,
            yStep: 3,
            xLabel: "Age (years)",
            yLabel: "Value ($ thousands)",
            trend: [2, 18, 8, 9],
            trendLabel: "trend line",
            trendLabelPos: [8.2, 13],
          },
          String.raw`The vertical scale is broken between $0$ and $3$.`,
        ),
        stem: String.raw`According to the trend line, by approximately how many dollars does the resale value of a car decrease per month of age? Give your answer to the nearest dollar.`,
        prefix: "$",
        answer: { kind: "decimal", value: "125" },
        explanation: [
          String.raw`The trend line passes through the gridline points $(2, 18)$ and $(8, 9)$. Slope $= \frac{9 - 18}{8 - 2} = -1.5$ thousand dollars per year.`,
          String.raw`That is $\$1{,}500$ per year, and $\frac{1{,}500}{12} = \$125$ per month.`,
          String.raw`Values are in thousands and ages are in years; converting both is the whole question.`,
        ],
      },
      {
        id: "z9",
        type: "qc",
        difficulty: "hard",
        diagram: ref(
          "line-graph",
          {
            title: "Annual rainfall (cm)",
            xs: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
            series: [{ name: "Rainfall", values: [70, 80, 60, 90, 70, 40, 60, 100, 80] }],
            yMax: 120,
            yStep: 20,
            yMinor: 10,
            yLabel: "Rainfall (cm)",
            xLabel: "Year",
          },
          SCALE_NOTE,
        ),
        quantityA: String.raw`The percent increase in rainfall from 2017 to 2018`,
        quantityB: String.raw`The percent increase in rainfall from 2020 to 2021`,
        answer: "C",
        explanation: [
          String.raw`Read the values: 2017 is $60$, 2018 is $90$, 2020 is $40$, 2021 is $60$.`,
          String.raw`A: $\frac{90 - 60}{60} = 50\%$. B: $\frac{60 - 40}{40} = 50\%$.`,
          String.raw`The first rise ($30$ cm) is larger than the second ($20$ cm), but percent increases are equal. Quantity A and B are equal.`,
        ],
      },
      {
        id: "z10",
        type: "mcm",
        difficulty: "hard",
        diagram: ref(
          "histogram",
          {
            title: "Values in a sample of 36",
            edges: [0, 10, 20, 30, 40, 50, 60],
            counts: [4, 8, 0, 12, 9, 3],
            yMax: 14,
            yStep: 2,
            xLabel: "Value",
            yLabel: "Frequency",
          },
          String.raw`Each class includes its left endpoint but not its right.`,
        ),
        stem: String.raw`The histogram shows the frequency distribution of $36$ values. Which of the following statements must be true? Indicate all such statements.`,
        choices: [
          String.raw`No value lies in the class $20$–$30$.`,
          String.raw`Fewer than $30\%$ of the values are less than $30$.`,
          String.raw`More than half of the values are at least $30$.`,
          String.raw`Exactly one third of the values lie in the tallest class.`,
          String.raw`The class $40$–$50$ contains more values than the classes $0$–$10$ and $10$–$20$ together.`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`Frequencies: $4, 8, 0, 12, 9, 3$, total $36$.`,
          String.raw`The gap at $20$–$30$ is an empty class, so the first statement is true.`,
          String.raw`Values less than $30$: $4 + 8 + 0 = 12$, which is $\frac{12}{36} = 33.\overline{3}\%$, not fewer than $30\%$, so the second is false.`,
          String.raw`Values at least $30$: $12 + 9 + 3 = 24$, which is $\frac{24}{36} \approx 66.7\%$, more than half. True.`,
          String.raw`The tallest class has $12$ values and $\frac{12}{36} = \frac13$. True.`,
          String.raw`Class $40$–$50$ has $9$ values, but the classes $0$–$10$ and $10$–$20$ have $4 + 8 = 12$ together, so the last statement is false.`,
        ],
      },
    ],
  },
};

export default section;
