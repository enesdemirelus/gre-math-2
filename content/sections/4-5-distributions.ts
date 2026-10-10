import type { Section } from "../types";

const section: Section = {
  id: "4-5-distributions",
  number: "4.5",
  title: "Distributions, Random Variables, and Probability Distributions",
  part: "data-analysis",
  mrPages: "164–180",
  summary: String.raw`A histogram smoothed into a curve whose area is 1, a random variable as a number produced by chance, the expected value as a probability-weighted mean, and the normal distribution with its standardizing rule. Probability is area, and the GRE only needs the rounded interval values of the standard normal curve.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "From a histogram to a distribution curve" },
    {
      kind: "p",
      text: String.raw`You already know how to display data in a histogram (section 4.1). The GRE's step up is to treat a very large data set as a [[distribution-curve|distribution]] and to think of it through a smooth curve. Start from a [[frequency-distribution|frequency distribution]]: each value, or each interval of values, comes with the number of data that fall in it. Divide every frequency by the total number of data and you get a [[relative-frequency-distribution|relative frequency distribution]], where the heights are proportions that add up to 1 (MC p. 14).`,
    },
    {
      kind: "p",
      text: String.raw`Now imagine a data set with a huge number of values and very narrow bars. The tops of the bars blend into a smooth curve. That curve, called a [[distribution-curve|distribution curve]] (also a density curve or frequency curve), is a model of the relative frequency histogram. The vertical scale is adjusted so that the total area of the bars is 1, so the area under the whole curve is also 1 (MR p. 167).`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/hist-to-curve", props: { mode: "both" }, caption: String.raw`A relative frequency histogram and the smooth curve that models it. The bars have total area 1, and so does the region under the curve.` },
    },
    {
      kind: "p",
      text: String.raw`The one property you must carry away is this: the area under the curve in any vertical slice, exactly like the area of a histogram bar, is the proportion of the data lying in the corresponding interval on the horizontal axis (MR p. 167). If the slice between $a$ and $b$ has area $0.3$, then 30 percent of the data lie between $a$ and $b$. The scale of the vertical axis almost never matters; **areas** carry the information.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/hist-to-curve", props: { mode: "curve", slice: [2, 4] }, caption: String.raw`The shaded area is the proportion of the data that lie between $a$ and $b$.` },
    },
    {
      kind: "p",
      text: String.raw`Everything from section 4.2 still applies to a distribution: it has a mean, a median and a standard deviation, and these can be read off roughly from the picture. In the MR's lifetime example the notation is $M$ for the median, $m$ for the mean and $d$ for the standard deviation, and the tick marks $m - d$, $m + d$, $m + 2d$ locate data that are 1 or 2 standard deviations from the mean. For a data set in general, most of the data lie within 3 standard deviations of the mean (MR p. 148). Mean and median need not agree: in the MR's lifetime example the median is between 730 and 740 but the mean is between 750 and 760, because the long right tail pulls the mean up (MR p. 166; that a tail pulls the mean toward it is a standard fact, though not stated in general in the ETS Math Review).`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/skew", caption: String.raw`A distribution with a long right tail. The mean is pulled toward the tail, to the right of the median.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Random variables" },
    {
      kind: "p",
      text: String.raw`A [[random-variable|random variable]] is a variable whose value is a numerical outcome of a random experiment: it depends on chance (MR pp. 164, 167). Pick one value at random from a data set and call it $X$; that $X$ is a random variable. More generally, any quantity that results from a random experiment qualifies: the number of heads in 5 tosses, the number shown by a spinner, the lifetime of one randomly chosen bulb. ETS says the possible values of the random variable are the same as the possible outcomes of the experiment, or are numbers related to them (MR p. 172; MC p. 15).`,
    },
    {
      kind: "p",
      text: String.raw`There are two kinds, and the difference is how the values sit on the number line (MR pp. 174, 178; MC p. 15). A [[discrete-random-variable|discrete random variable]] has finitely many values, isolated points such as $0, 1, 2, 3$. A [[continuous-random-variable|continuous random variable]] takes values that fill a continuous interval of real numbers, such as all numbers between 0 and 2: heights, times and lifetimes, measured as finely as you like.`,
    },
    {
      kind: "p",
      text: String.raw`The event "$X$ equals 4" has probability $P(X = 4)$, and it is common to shorten this to $P(4)$. Events built from inequalities, like "$X > 3$", have probabilities too. If the random variable comes from picking a value out of a data set, then its probability distribution is the same as the relative frequency distribution of the data (MR p. 171). So "the probability that $X$ is in an interval" and "the proportion of the data in that interval" are one and the same number.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Probability distributions and expected value" },
    {
      kind: "p",
      text: String.raw`The [[probability-distribution|probability distribution]] of a random variable $X$ lists every possible value of $X$ with its probability, either as a table or as a [[probability-histogram|probability histogram]] (MR p. 170; MC p. 15). Two facts always hold. The probabilities are numbers from 0 to 1 that **add up to 1**, and the areas of the bars add up to 1 as well. And the area of each bar is proportional to the probability it represents (MR p. 174). Probabilities of different values add, because $X$ cannot take two values at once: if $X$ takes the values $1, 2, 3, 4$ with probabilities $0.1, 0.2, 0.3, 0.4$, then $P(X > 2) = P(3) + P(4) = 0.3 + 0.4 = 0.7$.`,
    },
    {
      kind: "p",
      text: String.raw`The mean of a random variable is its [[expected-value|expected value]] (MR p. 171). You compute it like a weighted mean, where each value is weighted by its probability: multiply every value by its probability and add (MR p. 172).`,
    },
    { kind: "math", tex: String.raw`\text{mean of } X \;=\; \text{expected value of } X \;=\; \sum x\,P(x)`, key: true },
    {
      kind: "p",
      text: String.raw`For the distribution above, the expected value is $1(0.1) + 2(0.2) + 3(0.3) + 4(0.4) = 0.1 + 0.4 + 0.9 + 1.6 = 3$. The $\sum$ notation is not ETS's; the MR just writes out the sum of the products $X\,P(X)$. On the histogram, the mean is the balance point: place a fulcrum there and the bars balance.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/prob-histogram", props: { values: [1, 2, 3, 4], probs: [0.1, 0.2, 0.3, 0.4], yTicks: [0, 0.1, 0.2, 0.3, 0.4], mean: 3, highlight: [3, 4], xLabel: "X" }, caption: String.raw`The probability distribution of $X$. The shaded bars give $P(X > 2) = 0.7$; the triangle marks the expected value, 3.` },
    },
    {
      kind: "p",
      text: String.raw`Play with the explorer below. Changing a weight changes the probabilities (a weight divided by the total), and the expected value, shown as a fraction and as a decimal, moves like a balance point.`,
    },
    {
      kind: "interactive",
      key: "4-5-distributions/expected-value-explorer",
      title: "Expected value explorer",
      caption: String.raw`The six values of $X$ have probabilities proportional to the weights. Watch how the mean (balance point) moves, and how $P(X<E(X))$ and $P(X>E(X))$ change. The mean is generally not one of the values of $X$.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Expected value is not the average of the listed values",
      text: String.raw`If $X$ can be $1, 2, 3, 4$ with unequal probabilities, the expected value is not $\frac{1+2+3+4}{4}$. It is the sum of value times probability. It also need not be a value $X$ can actually take: a random variable that is 0 or 1 with equal probabilities has expected value $0.5$.`,
    },
    {
      kind: "p",
      text: String.raw`When every possible value is equally likely, the histogram is flat: all bars have the same height. ETS calls this a [[uniform-distribution|uniform distribution]], because the probability is spread uniformly over all possible outcomes (MR p. 174). For a number drawn at random from $1, 2, \dots, 8$, each value has probability $\frac18$ and the expected value is the middle of the range, $4.5$. Any distribution that is symmetric about a point has its mean at that point.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/prob-histogram", props: { values: [1, 2, 3, 4, 5, 6, 7, 8], probs: [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125], yTicks: [0, 0.05, 0.1, 0.15], mean: 4.5, xLabel: "X" }, caption: String.raw`A uniform distribution: every value of $X$ has probability $\frac18$, and the mean sits at the center, 4.5.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Continuous distributions and the normal curve" },
    {
      kind: "p",
      text: String.raw`For a continuous random variable the probability distribution is a curve $y = f(x)$ that never dips below the horizontal axis. The region under the whole curve has area 1, and the probability that $X$ lies in the interval from $a$ to $b$ is the area of the region below the curve, above the axis and between the vertical lines $x = a$ and $x = b$ (MC pp. 15–16; MR p. 178). Notice what this implies. The event "$X = 3$" would correspond to a line segment, whose area is 0, so $P(X=3) = 0$ for a continuous random variable. Only intervals have positive probability; whether an endpoint is included or not makes no difference.`,
    },
    {
      kind: "p",
      text: String.raw`The mean of a continuous random variable is the point where the region under the curve would balance on a fulcrum. The median is the point $M$ where the vertical line $x = M$ splits the region into two parts of equal area (MC p. 16). The [[standard-deviation-rv|standard deviation]] still measures how spread out the distribution is about the mean: the greater it is, the greater the spread (MC p. 16).`,
    },
    {
      kind: "p",
      text: String.raw`The most important continuous distribution is the [[normal-distribution|normal distribution]], whose curve is shaped like a bell. Real data are never exactly normal, so the MR speaks of data that are [[approximately-normal|approximately normal]]: their relative frequency histogram is shaped somewhat like a bell and has four properties (MR p. 175):`,
    },
    {
      kind: "list",
      items: [
        String.raw`The mean, median, and mode are all nearly equal.`,
        String.raw`The data are grouped fairly symmetrically about the mean.`,
        String.raw`About two-thirds of the data are within 1 standard deviation of the mean.`,
        String.raw`Almost all of the data are within 2 standard deviations of the mean.`,
      ],
    },
    {
      kind: "p",
      text: String.raw`For a true normal distribution these hold in sharper form: the mean, median and mode are exactly equal, and the curve is perfectly symmetric about the line $x = m$. The left and right tails come closer and closer to the horizontal axis but never touch it (MR p. 176; MC p. 16). The only things that distinguish one normal curve from another are the mean, which sets the center, and the standard deviation, which sets the spread.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/normal-compare", props: { mode: "shift" }, caption: String.raw`Same standard deviation, different means: one curve is the other slid horizontally.` },
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/normal-compare", props: { mode: "spread" }, caption: String.raw`Same mean, different standard deviations: curve $A$ (blue) has the smaller one, so it is taller and narrower.` },
    },
    {
      kind: "p",
      text: String.raw`The less the standard deviation, the less spread out the curve is: at the mean the curve is higher, and moving away from the mean it falls toward the axis faster (MR p. 176). Total area is still 1, so a narrower curve has to be taller. This is the only way the GRE asks you to compare the standard deviations of two normal curves.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "4-5-distributions/normal-curve",
        props: { mean: 60, sd: 8, xmin: 28, xmax: 92, ticks: [36, 44, 52, 60, 68, 76, 84], vlines: [52, 68], shade: [52, 68], labels: [{ x: 60, text: "about 2/3", h: 0.14 }] },
        caption: String.raw`A normal distribution with mean 60 and standard deviation 8. Ticks mark the mean and the points 1, 2 and 3 standard deviations on either side. About two-thirds of the area lies between 52 and 68.`,
      },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The standard normal distribution and standardizing" },
    {
      kind: "p",
      text: String.raw`The [[standard-normal|standard normal distribution]] is the normal distribution with mean 0 and standard deviation 1. ETS does not make you look anything up in a table. Instead, Math Conventions Figure 7 gives the approximate probabilities for six intervals, cut at $-2, -1, 0, 1, 2$ (MC p. 16):`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-5-distributions/std-normal", caption: String.raw`Standard normal distribution with the approximate probabilities of the six intervals (the values given in Math Conventions Figure 7).` },
    },
    {
      kind: "p",
      text: String.raw`So the probability of lying between 0 and 1 is about $0.34$, between 1 and 2 about $0.14$, and above 2 about $0.02$, with the same values mirrored on the negative side. Combine them by adding. Within 1 standard deviation of the mean is $0.34 + 0.34 = 0.68$, which is the "about two-thirds"; more than 1 above the mean is $0.14 + 0.02 = 0.16$; and by symmetry exactly half lies on each side of the mean.`,
    },
    {
      kind: "p",
      text: String.raw`Any normal distribution can be converted to this standard one by [[standardizing]]: subtract the mean $m$ from the observed value and divide by the standard deviation $d$ (MR p. 180). The result says how many standard deviations the value is from the mean, and it is positive above the mean and negative below.`,
    },
    { kind: "math", tex: String.raw`\text{standardized value} \;=\; \frac{x - m}{d}`, key: true },
    {
      kind: "p",
      text: String.raw`For a normal distribution with mean 60 and standard deviation 8, the value 76 standardizes to $\frac{76-60}{8} = 2$ and the value 52 to $\frac{52-60}{8} = -1$. Now the standard normal figure applies directly: $P(52 < X < 76)$ is the area from $-1$ to $2$, so $0.34 + 0.34 + 0.14 = 0.82$. Many students call the standardized value a [[z-score|z-score]]; that name is common in textbooks but ETS does not use it.`,
    },
    {
      kind: "interactive",
      key: "4-5-distributions/normal-explorer",
      title: "Normal curve explorer",
      caption: String.raw`Change the mean and standard deviation, then shade an interval. The explorer converts each end to a position in standard deviations, adds up the Figure 7 regions, and, when an end is not a whole number of standard deviations, shows the range that Figure 7 can guarantee.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "How the GRE asks it",
      text: String.raw`Expect "a normally distributed variable has mean $m$ and standard deviation $d$; what is the probability that it is between ...?" with ends chosen at whole numbers of standard deviations, or a count of data values (multiply the probability by the number of data). Other questions only need symmetry ("$P(X < m - 1.5d) = P(X > m + 1.5d)$") or the area reading of the curve. If an end falls between whole numbers of standard deviations, use the figure to bracket the probability rather than to compute it. For example, a value $1.5$ standard deviations above the mean has probability above it between $0.02$ and $0.16$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "About the \"68–95–99.7 rule\"",
      text: String.raw`Many prep books summarize the normal curve with the "68–95–99.7 rule". That name is not ETS wording. ETS says "about two-thirds" within 1 standard deviation and "almost all" within 2. If a question needs more, it supplies the numbers; the rounded figure values give $0.68$ for within 1 SD and $0.96$ for within 2 SD, and ETS notes that more precise calculations (for example $P(3 < W < 7) = 0.683$ in its example) are beyond the scope of the review (MR p. 180).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Almost every question in this section is one of three moves. Read an **area** as a probability or a proportion (and remember the whole area is 1). Compute an **expected value** as a sum of value times probability, after finding any missing probability by making the probabilities add up to 1. Or **standardize** a normal value and add Figure 7 regions, using symmetry whenever you can.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Do not average the values when they have different probabilities. Do not say a continuous variable has a positive probability at a single point: its probability is 0. A narrower normal curve has the smaller standard deviation, and it is the taller one. When the question gives the mean and the SD, convert the numbers to whole standard deviations from the mean before adding regions, and watch the direction: "above 2" is $0.02$, but "below 2" is $0.98$. Finally, in a skewed distribution the mean and the median differ, so never use one for the other unless the distribution is symmetric.`,
    },
  ],

  /* ------------------------------------------------------------------ */
  terms: [
    {
      id: "frequency-distribution",
      term: "frequency distribution",
      turkish: "frekans dağılımı",
      definition: String.raw`A listing of data values, or of intervals of values, with the number of data (the frequency) that fall in each; the frequencies add up to the total number of data.`,
      source: "MC p. 14",
    },
    {
      id: "relative-frequency-distribution",
      term: "relative frequency distribution",
      turkish: "bağıl frekans dağılımı",
      definition: String.raw`A frequency distribution in which each frequency is divided by the total number of data, so the relative frequencies are proportions that add up to 1.`,
      source: "MC p. 14; MR p. 165",
    },
    {
      id: "distribution-curve",
      term: "distribution curve",
      turkish: "dağılım eğrisi (yoğunluk eğrisi)",
      definition: String.raw`A smooth curve that models a relative frequency histogram of a large data set, scaled so that the total area under it is 1. The area of any vertical slice is the proportion of the data in the corresponding interval. Also called a density curve or frequency curve.`,
      diagram: { key: "4-5-distributions/hist-to-curve", props: { mode: "curve", slice: [2, 4] } },
      source: "MR p. 167",
    },
    {
      id: "random-variable",
      term: "random variable",
      turkish: "rastgele değişken (rassal değişken)",
      definition: String.raw`A variable whose value is a numerical outcome of a random experiment; it depends on chance. A value chosen at random from a data set is an example.`,
      source: "MR pp. 164, 167, 172; MC p. 15",
    },
    {
      id: "discrete-random-variable",
      term: "discrete random variable",
      turkish: "kesikli rastgele değişken / ayrık rastgele değişken",
      definition: String.raw`A random variable whose values are discrete points on the number line (finitely many values when the experiment has finitely many outcomes).`,
      source: "MR p. 174; MC p. 15",
    },
    {
      id: "continuous-random-variable",
      term: "continuous random variable",
      turkish: "sürekli rastgele değişken",
      definition: String.raw`A random variable whose values form a continuous interval of real numbers, such as all numbers between 0 and 2. Its probabilities are areas of vertical slices under a curve; the probability of a single value is 0.`,
      source: "MR p. 178; MC p. 15",
    },
    {
      id: "probability-distribution",
      term: "probability distribution",
      turkish: "olasılık dağılımı",
      definition: String.raw`For a discrete random variable $X$, a table or histogram showing all possible values of $X$ and their probabilities $P(X)$. For a continuous random variable, a curve whose slice areas are probabilities.`,
      source: "MR p. 170; MC p. 15",
    },
    {
      id: "probability-histogram",
      term: "probability histogram",
      turkish: "olasılık histogramı",
      definition: String.raw`A histogram of a probability distribution: one bar per value of $X$, with area proportional to its probability. The bar areas add up to 1.`,
      diagram: { key: "4-5-distributions/prob-histogram", props: { values: [1, 2, 3, 4], probs: [0.1, 0.2, 0.3, 0.4], yTicks: [0, 0.1, 0.2, 0.3, 0.4], xLabel: "X" } },
      source: "MR pp. 170, 174",
    },
    {
      id: "expected-value",
      term: "expected value",
      turkish: "beklenen değer (matematiksel beklenti)",
      definition: String.raw`Another name for the mean of a random variable: the sum of each value of $X$ multiplied by its probability $P(X)$.`,
      formula: String.raw`\sum x\,P(x)`,
      diagram: { key: "4-5-distributions/prob-histogram", props: { values: [1, 2, 3, 4], probs: [0.1, 0.2, 0.3, 0.4], yTicks: [0, 0.1, 0.2, 0.3, 0.4], mean: 3, xLabel: "X" } },
      source: "MR pp. 171–172; MC p. 15",
    },
    {
      id: "uniform-distribution",
      term: "uniform distribution",
      turkish: "düzgün dağılım (tekdüze dağılım)",
      definition: String.raw`A distribution in which every possible outcome has the same probability, so the probability histogram is flat.`,
      diagram: { key: "4-5-distributions/prob-histogram", props: { values: [1, 2, 3, 4, 5, 6, 7, 8], probs: [0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125, 0.125], yTicks: [0, 0.05, 0.1, 0.15], xLabel: "X" } },
      source: "MR p. 174",
    },
    {
      id: "standard-deviation-rv",
      term: "standard deviation of a random variable",
      turkish: "standart sapma",
      definition: String.raw`A measure of dispersion that indicates how spread out the probability distribution of $X$ is from its mean; the greater it is, the greater the spread. Also called the standard deviation of the probability distribution of $X$.`,
      source: "MC p. 16; MR p. 171",
    },
    {
      id: "normal-distribution",
      term: "normal distribution",
      turkish: "normal dağılım",
      definition: String.raw`The most important continuous probability distribution, with a bell-shaped curve symmetric about the line $x = m$, where $m$ is both the mean and the median. The tails approach the horizontal axis but never touch it.`,
      diagram: { key: "4-5-distributions/normal-curve", props: { mean: 60, sd: 8, xmin: 28, xmax: 92, ticks: [36, 44, 52, 60, 68, 76, 84], meanLine: true } },
      source: "MR p. 176; MC p. 16",
    },
    {
      id: "approximately-normal",
      term: "approximately normally distributed",
      turkish: "yaklaşık normal dağılımlı",
      definition: String.raw`Describes data whose relative frequency distribution is shaped somewhat like a bell: mean, median and mode nearly equal, fairly symmetric about the mean, about two-thirds within 1 standard deviation of the mean and almost all within 2.`,
      source: "MR p. 175",
    },
    {
      id: "standard-normal",
      term: "standard normal distribution",
      turkish: "standart normal dağılım",
      definition: String.raw`The normal distribution with mean 0 and standard deviation 1. Approximate probabilities of the six intervals cut at $-2, -1, 0, 1, 2$ are $0.02, 0.14, 0.34, 0.34, 0.14, 0.02$.`,
      diagram: { key: "4-5-distributions/std-normal" },
      source: "MR p. 180; MC p. 16 (Figure 7)",
    },
    {
      id: "standardizing",
      term: "standardizing",
      turkish: "standartlaştırma",
      definition: String.raw`Converting a value $x$ from a normal distribution with mean $m$ and standard deviation $d$ to the standard normal scale: subtract $m$, then divide by $d$.`,
      formula: String.raw`\dfrac{x-m}{d}`,
      source: "MR p. 180",
    },
    {
      id: "z-score",
      term: "z-score",
      turkish: "z puanı (standart puan)",
      definition: String.raw`The standardized value $\frac{x-m}{d}$: the number of standard deviations $x$ is above the mean (positive) or below it (negative).`,
      note: "Not named in the ETS Math Review (ETS describes the procedure without this name)",
      formula: String.raw`z = \dfrac{x-m}{d}`,
      source: "Procedure: MR p. 180",
    },
  ],

  /* ------------------------------------------------------------------ */
  examples: [
    {
      id: "ex1",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`A random variable $X$ takes only the values $1, 2, 3, 4, 5$. Its probabilities are $P(1) = 0.15$, $P(2) = 0.25$, $P(3) = 0.30$, $P(5) = 0.10$, and $P(4)$ is not given. What is the expected value of $X$?`,
      answer: { kind: "decimal", value: "2.85" },
      explanation: [
        String.raw`The probabilities must add up to 1, so $P(4) = 1 - (0.15 + 0.25 + 0.30 + 0.10) = 1 - 0.80 = 0.20$.`,
        String.raw`Expected value $= 1(0.15) + 2(0.25) + 3(0.30) + 4(0.20) + 5(0.10) = 0.15 + 0.50 + 0.90 + 0.80 + 0.50 = 2.85$.`,
        String.raw`Trap: the plain average of the values, $3$, ignores the probabilities. The distribution puts more weight on the small values than on the large ones, so the mean is below 3.`,
      ],
    },
    {
      id: "ex2",
      type: "qc",
      difficulty: "hard",
      given: String.raw`$W$ is a normally distributed random variable with mean 40 and standard deviation 6.`,
      quantityA: String.raw`$P(W < 31)$`,
      quantityB: String.raw`$P(W > 49)$`,
      answer: "C",
      explanation: [
        String.raw`Standardize both ends: $\frac{31 - 40}{6} = -1.5$ and $\frac{49 - 40}{6} = 1.5$. They are the same distance from the mean, on opposite sides.`,
        String.raw`A normal distribution is symmetric about its mean, so the tail below $m - 1.5d$ has the same area as the tail above $m + 1.5d$. The quantities are equal.`,
        String.raw`Do not try to compute either number: $1.5$ standard deviations is not a whole number, so the figure values would only bracket each probability (between $0.02$ and $0.16$). Symmetry settles the comparison without any numbers.`,
      ],
    },
    {
      id: "ex3",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`A random variable $X$ is normally distributed with mean 72 and standard deviation 8. For which of the following values of $x$ is the probability that $X$ is greater than $x$ less than 0.05? Indicate all such values.`,
      choices: [String.raw`$56$`, String.raw`$72$`, String.raw`$80$`, String.raw`$88$`, String.raw`$96$`, String.raw`$104$`],
      answer: [3, 4, 5],
      explanation: [
        String.raw`Convert each value to standard deviations from the mean: $56$ is $-2$, $72$ is $0$, $80$ is $1$, $88$ is $2$, $96$ is $3$, $104$ is $4$.`,
        String.raw`From the figure, the area above $1$ is $0.14 + 0.02 = 0.16$, which is not less than $0.05$, and the area above $0$ is $0.5$. The area above $2$ is $0.02 < 0.05$, and the area above $3$ or $4$ is smaller still.`,
        String.raw`So the values are $88$, $96$ and $104$. Trap: $56$ is 2 standard deviations on the _low_ side, where the area above it is nearly everything, not a tail.`,
      ],
    },
    {
      id: "ex4",
      type: "mc1",
      difficulty: "medium",
      diagram: { key: "4-5-distributions/normal-curve", props: { mean: 50, sd: 10, xmin: 15, xmax: 85, ticks: [20, 30, 40, 50, 60, 70, 80], vlines: [40, 70], shade: [40, 70], meanLine: true } },
      stem: String.raw`The 2,000 values in a data set are approximately normally distributed with mean 50 and standard deviation 10. Using the approximate probabilities in Math Conventions Figure 7, about how many of the values are between 40 and 70?`,
      choices: [String.raw`$1{,}000$`, String.raw`$1{,}360$`, String.raw`$1{,}640$`, String.raw`$1{,}800$`, String.raw`$1{,}960$`],
      answer: 2,
      explanation: [
        String.raw`$40$ is 1 SD below the mean and $70$ is 2 SD above it, so the interval runs from $-1$ to $2$ on the standardized scale.`,
        String.raw`Add the regions: $0.34$ (from $-1$ to $0$) $+ 0.34$ (from $0$ to $1$) $+ 0.14$ (from $1$ to $2$) $= 0.82$.`,
        String.raw`$0.82 \times 2000 = 1640$. Trap: $1360$ is $0.68 \times 2000$, the count within 1 SD only; $1960$ is $0.98 \times 2000$.`,
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  quick: [
    {
      id: "q1",
      prompt: String.raw`What is the total area under any distribution curve?`,
      answer: String.raw`$1$`,
      explanation: String.raw`The vertical scale is adjusted so that the area under the whole curve is 1; a slice's area is a proportion or probability.`,
    },
    {
      id: "q2",
      prompt: String.raw`$X$ is a continuous random variable. What is $P(X = 7)$?`,
      answer: String.raw`$0$`,
      explanation: String.raw`A single value corresponds to a line segment under the curve, whose area is 0. Only intervals have positive probability.`,
    },
    {
      id: "q3",
      prompt: String.raw`$X$ equals 2 with probability $0.75$ and 10 with probability $0.25$. What is its expected value?`,
      answer: String.raw`$4$`,
      explanation: String.raw`$2(0.75) + 10(0.25) = 1.5 + 2.5 = 4$. The mean is pulled toward the likelier value, not placed at the midpoint 6.`,
    },
    {
      id: "q4",
      prompt: String.raw`A normal distribution has mean 71 and standard deviation 4. How many standard deviations above the mean is 83?`,
      answer: String.raw`$3$`,
      explanation: String.raw`$\frac{83 - 71}{4} = 3$.`,
    },
    {
      id: "q5",
      prompt: String.raw`For the standard normal distribution, about what is the probability that the value is greater than 1?`,
      answer: String.raw`$0.16$`,
      explanation: String.raw`From the figure: $0.14 + 0.02 = 0.16$.`,
    },
    {
      id: "q6",
      prompt: String.raw`Two normal curves have the same mean. Curve $P$ is taller and narrower than curve $Q$. Which has the greater standard deviation?`,
      answer: String.raw`$Q$`,
      explanation: String.raw`The less the standard deviation, the higher the curve at the mean and the faster it falls. The wider, lower curve $Q$ has the greater standard deviation.`,
    },
  ],

  /* ------------------------------------------------------------------ */
  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$X$ takes only the values $1, 2, 3$ with $P(1) = P(3) = a$ and $P(2) = 1 - 2a$, where $0 < a < \frac12$.`,
        quantityA: String.raw`The expected value of $X$`,
        quantityB: String.raw`$2$`,
        answer: "C",
        explanation: [
          String.raw`Expected value $= 1\cdot a + 2(1 - 2a) + 3\cdot a = a + 2 - 4a + 3a = 2$, for every $a$.`,
          String.raw`The same follows from symmetry: the distribution is symmetric about 2, so its mean is 2. The unknown $a$ does not matter; the answer is not (D).`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$X$ is normally distributed with mean 100 and standard deviation 4. $Y$ is normally distributed with mean 20 and standard deviation 6.`,
        quantityA: String.raw`$P(95 < X < 105)$`,
        quantityB: String.raw`$P(15 < Y < 25)$`,
        answer: "A",
        explanation: [
          String.raw`Both intervals extend exactly 5 on each side of their mean, but the standard deviations differ. For $X$ the interval is $\pm\frac54 = \pm 1.25$ standard deviations; for $Y$ it is $\pm\frac56 \approx \pm 0.83$ standard deviations.`,
          String.raw`A wider interval in standard deviations captures more of the area under a normal curve, so $P(95<X<105) > P(15<Y<25)$. (Check with the figure: $\pm 1$ SD holds about $0.68$ and $\pm 2$ SD about $0.96$, and $1.25$ is between $1$ and $2$, while $0.83$ is below $1$.)`,
          String.raw`Trap: equal "widths" do not mean equal probabilities. The means 100 and 20 are irrelevant.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$Z$ has the standard normal distribution.`,
        quantityA: String.raw`$P(Z < -1) + P(Z > 2)$`,
        quantityB: String.raw`$P(Z > 1)$`,
        answer: "A",
        explanation: [
          String.raw`By symmetry $P(Z < -1) = P(Z > 1)$, so Quantity A equals $P(Z>1) + P(Z>2)$.`,
          String.raw`Quantity A is therefore Quantity B plus $P(Z > 2)$, which is a positive number (about $0.02$). With the figure values: $A \approx 0.16 + 0.02 = 0.18$ and $B \approx 0.16$.`,
          String.raw`Trap: reading $P(Z<-1)+P(Z>2)$ as "between $-1$ and $2$" would give $0.82$.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`In a game, a player wins $\$10$ with probability $p$, wins $\$2$ with probability $0.3$, and otherwise loses $\$4$. If the expected value of the player's net winnings is $\$0.60$, what is the value of $p$?`,
        choices: [String.raw`$0.1$`, String.raw`$0.15$`, String.raw`$0.2$`, String.raw`$0.25$`, String.raw`$0.3$`],
        answer: 2,
        explanation: [
          String.raw`The probabilities must add to 1, so the player loses $\$4$ with probability $1 - p - 0.3 = 0.7 - p$.`,
          String.raw`Expected value: $10p + 2(0.3) + (-4)(0.7 - p) = 10p + 0.6 - 2.8 + 4p = 14p - 2.2$.`,
          String.raw`Set $14p - 2.2 = 0.6$: $14p = 2.8$, so $p = 0.2$. Trap: using $0.7$ for the loss probability (forgetting to subtract $p$) gives $10p - 2.2 = 0.6$, so $p = 0.28$, which is not a choice; subtracting the wins from 1 is the key step.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "hard",
        diagram: { key: "4-5-distributions/prob-histogram", props: { values: [0, 1, 2, 3, 4, 5], probs: [0.05, 0.15, 0.3, 0.25, 0.15, 0.1], yTicks: [0, 0.1, 0.2, 0.3], xLabel: "X" } },
        stem: String.raw`The figure shows the probability distribution of a random variable $X$. What is the probability that $X$ is greater than its expected value?`,
        choices: [String.raw`$0.25$`, String.raw`$0.35$`, String.raw`$0.40$`, String.raw`$0.50$`, String.raw`$0.60$`],
        answer: 3,
        explanation: [
          String.raw`Read the bars: $0.05, 0.15, 0.30, 0.25, 0.15, 0.10$ for $X = 0, \dots, 5$. They add up to 1.`,
          String.raw`Expected value $= 0(0.05) + 1(0.15) + 2(0.30) + 3(0.25) + 4(0.15) + 5(0.10) = 0.15 + 0.60 + 0.75 + 0.60 + 0.50 = 2.6$.`,
          String.raw`$X$ is greater than 2.6 when $X = 3, 4, 5$: $0.25 + 0.15 + 0.10 = 0.50$. Trap: the mean 2.6 is not a possible value, so the question is about which bars lie to its right; and the tallest bar (at 2) lies to its left.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`$X$ is normally distributed with mean 30 and standard deviation 4. Using Math Conventions Figure 7 for the standard normal distribution, which of the following events has the greatest probability?`,
        choices: [
          String.raw`$X < 22$`,
          String.raw`$X > 38$`,
          String.raw`$30 < X < 34$`,
          String.raw`$22 < X < 34$`,
          String.raw`$X > 26$`,
        ],
        answer: 4,
        explanation: [
          String.raw`Standardize: $22 \to -2$, $26 \to -1$, $34 \to 1$, $38 \to 2$.`,
          String.raw`$X<22$: $0.02$. $X>38$: $0.02$. $30<X<34$: $0.34$. $22<X<34$ is from $-2$ to $1$: $0.14 + 0.34 + 0.34 = 0.82$. $X>26$ is above $-1$: $0.34 + 0.34 + 0.14 + 0.02 = 0.84$.`,
          String.raw`So $X>26$ is the greatest ($0.84$ vs. $0.82$). The close call is by design: "above $-1$" includes the whole upper tail, which "between $-2$ and $1$" does not.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`A random variable $X$ takes the values $1, 2, 3, 4, 5$ with probabilities $0.05, 0.15, 0.20, 0.40, 0.20$ respectively. Indicate all of the following statements that are true.`,
        choices: [
          String.raw`The expected value of $X$ is greater than 3.`,
          String.raw`The expected value of $X$ is one of the possible values of $X$.`,
          String.raw`$P(X \ge 4) > \frac12$`,
          String.raw`$P(X < \text{expected value of } X) = 0.4$`,
          String.raw`$P(X > 2) = 0.85$`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`Expected value $= 0.05 + 0.30 + 0.60 + 1.60 + 1.00 = 3.55$.`,
          String.raw`(A) true: $3.55 > 3$. (B) false: $3.55$ is not in $\{1,2,3,4,5\}$.`,
          String.raw`(C) true: $P(X\ge4) = 0.40 + 0.20 = 0.60 > \frac12$. (D) true: the values below $3.55$ are $1, 2, 3$, with probability $0.05 + 0.15 + 0.20 = 0.40$.`,
          String.raw`(E) false: $P(X>2) = 0.20 + 0.40 + 0.20 = 0.80$, not $0.85$. ($0.85 = 1 - P(2)$ forgets that $P(1)$ is also excluded.)`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`$Y$ is normally distributed with mean 80 and standard deviation 10. Indicate all of the following statements that are true.`,
        choices: [
          String.raw`$P(Y < 70) > P(Y > 100)$`,
          String.raw`$P(Y < 75) = P(Y > 85)$`,
          String.raw`$P(Y = 80) > P(Y = 70)$`,
          String.raw`$P(Y < 60) > 0.05$`,
          String.raw`The median of $Y$ is 80.`,
        ],
        answer: [0, 1, 4],
        explanation: [
          String.raw`(A) true: $70$ is $-1$ SD and $100$ is $+2$ SD, so $P(Y<70) \approx 0.16$ and $P(Y>100) \approx 0.02$.`,
          String.raw`(B) true: $75$ and $85$ are both $0.5$ SD from the mean on opposite sides, and the distribution is symmetric.`,
          String.raw`(C) false: $Y$ is continuous, so the probability of any single value is 0; both sides are $0$, and $0 > 0$ is false. The curve is higher at 80 than at 70, but height is not probability.`,
          String.raw`(D) false: $60$ is $-2$ SD, and $P(Y < 60) \approx 0.02$, which is less than $0.05$. (E) true: for a normal distribution the mean and the median coincide.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`$X$ takes the values $1, 3, 5, 7$ with probabilities $0.4, 0.3, 0.2, 0.1$ respectively. What is the probability that $X$ is greater than its expected value? Enter your answer as a decimal.`,
        answer: { kind: "decimal", value: "0.3" },
        explanation: [
          String.raw`Expected value $= 1(0.4) + 3(0.3) + 5(0.2) + 7(0.1) = 0.4 + 0.9 + 1.0 + 0.7 = 3.0$.`,
          String.raw`The values greater than $3$ are $5$ and $7$: $0.2 + 0.1 = 0.3$. Trap: the value $3$ equals the mean, so it is not "greater than" it and must be left out.`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`In a normal distribution, the value 47 is exactly 1 standard deviation below the mean, and the value 77 is exactly 2 standard deviations above the mean. What is the mean of the distribution?`,
        answer: { kind: "decimal", value: "57" },
        explanation: [
          String.raw`Let the mean be $m$ and the standard deviation $d$. Then $47 = m - d$ and $77 = m + 2d$.`,
          String.raw`Subtract: $77 - 47 = 3d$, so $d = 10$. Then $m = 47 + 10 = 57$.`,
          String.raw`Check by standardizing: $\frac{47-57}{10} = -1$ and $\frac{77-57}{10} = 2$.`,
        ],
      },
    ],
  },
};

export default section;
