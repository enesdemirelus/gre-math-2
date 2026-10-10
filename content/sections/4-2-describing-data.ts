import type { Section } from "../types";

const section: Section = {
  id: "4-2-describing-data",
  number: "4.2",
  title: "Numerical Methods for Describing Data",
  part: "data-analysis",
  mrPages: "139–149",
  summary: String.raw`The statistics the GRE asks about, computed exactly the way ETS computes them: mean, median, mode, quartiles, percentiles, range, IQR, standard deviation (divide by $n$), and standardization. Plus the question type that hides in all of them: what happens to each statistic when the data change?`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Three families of statistics" },
    {
      kind: "p",
      text: String.raw`A list of numbers is hard to compare with another list, so we boil it down to a few numbers called statistics. ETS sorts them into three families (MR p. 139; MC p. 13). The [[central-tendency|measures of central tendency]] (mean, median, mode) say where the "center" of the data sits on the number line. The [[position-measures|measures of position]] (quartiles, percentiles) say where a given value sits relative to the rest. The [[dispersion|measures of dispersion]] (range, interquartile range, standard deviation) say how spread out the data are.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "\"Average\" means the arithmetic mean",
      text: String.raw`On the GRE, "average (arithmetic mean)" is the mean, and the word "average" never means median or mode (MC p. 13). Only when a question gives a rate ("average speed") does it mean something else. Also, a "data set" is a _list_: repeated values count, and order is irrelevant (MC p. 13).`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Mean and weighted mean" },
    {
      kind: "p",
      text: String.raw`To find the [[mean]] of $n$ numbers, add them and divide by $n$ (MR p. 140). For the list $8, 14, 9, 21, 13$ the sum is $65$, so the mean is $65 \div 5 = 13$.`,
    },
    { kind: "math", tex: String.raw`\text{mean} = \frac{\text{sum of the } n \text{ numbers}}{n}`, key: true },
    {
      kind: "p",
      text: String.raw`When a list contains repeated values, it is quicker to count each distinct value once and say how many times it occurs. That count is the value's [[weight]] (its frequency), and the mean becomes a [[weighted-mean|weighted mean]] of the distinct values (MR pp. 140–141). Suppose ten quiz scores are four 3s, one 5, three 8s and two 10s. The weights are $4, 1, 3, 2$, and they add up to the number of scores, $10$.`,
    },
    {
      kind: "math",
      tex: String.raw`\text{mean} = \frac{4(3) + 1(5) + 3(8) + 2(10)}{4+1+3+2} = \frac{61}{10} = 6.1`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`The same idea combines groups. If group $P$ has $p$ members with mean $m_P$ and group $Q$ has $q$ members with mean $m_Q$, the mean of everybody is $\frac{p\,m_P + q\,m_Q}{p+q}$: each group's mean is weighted by its _size_. The combined mean is never simply the average of the two means unless $p = q$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Balance-point shortcut",
      text: String.raw`The combined mean lies between the two group means, closer to the bigger group. If the groups have sizes in the ratio $p:q$, then the distances from the combined mean to $m_P$ and $m_Q$ are in the ratio $q:p$ (reversed). Take a class of 20 with mean 60 and a class of 30 with mean 80. The gap between the means is $20$, and the combined mean sits $\frac{30}{50}$ of the way from the smaller class's mean toward the larger class's: $60 + 20\cdot\frac{30}{50} = 72$.`,
    },
    {
      kind: "p",
      text: String.raw`The mean is sensitive to extreme values, because every number contributes its full size to the sum. Keep that in mind for the median, which is not.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Median and mode" },
    {
      kind: "p",
      text: String.raw`To find the [[median]], first order the numbers from least to greatest. If $n$ is odd, the median is the middle number of the ordered list; if $n$ is even, there are two middle numbers and the median is their average (MR p. 141). For $17, 4, 30, 9, 11$ the ordered list is $4, 9, 11, 17, 30$, so the median is $11$. Add a sixth number, $25$: the ordered list is $4, 9, 11, 17, 25, 30$ and the median is $\frac{11+17}{2} = 14$, a number that is not even in the list.`,
    },
    {
      kind: "p",
      text: String.raw`The median does not have to split the data into equal counts when values repeat. In $2, 5, 5, 5, 9, 10$ the median is $5$, yet one number lies below it and two lie above it (MR p. 141).`,
    },
    {
      kind: "p",
      text: String.raw`Resistance to extreme values is the reason the median exists. Replace $30$ by $300$ in the list $4, 9, 11, 17, 30$: the mean jumps from $14.2$ to $68.2$, while the median stays $11$.`,
    },
    {
      kind: "p",
      text: String.raw`The [[mode]] is the number that occurs most frequently. A list may have more than one mode: $2, 5, 5, 7, 9, 9, 12$ has modes $5$ and $9$ (MR p. 142).`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Order first",
      text: String.raw`The most common median error is taking the middle of the list _as written_. Always sort. And when a question gives a table of values with frequencies, count positions in the expanded list: the median of 14 numbers is the average of the 7th and 8th.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Quartiles and percentiles" },
    {
      kind: "p",
      text: String.raw`The three [[quartile|quartiles]] $Q_1, Q_2, Q_3$ cut the ordered data into four roughly equal groups: least value to $Q_1$, $Q_1$ to $Q_2$, $Q_2$ to $Q_3$, and $Q_3$ to the greatest value. In all cases $Q_2$ is the median (MR p. 142). Statisticians use several rules for $Q_1$ and $Q_3$; ETS uses "perhaps the most common" one: after ordering the data, $Q_1$ is the median of the first half and $Q_3$ is the median of the second half.`,
    },
    {
      kind: "p",
      text: String.raw`Take twelve numbers: $3, 5, 6, 6, 8, 9, 11, 12, 12, 15, 18, 24$. Here $n = 12$ is even, so the halves are the first six and the last six numbers.`,
    },
    {
      kind: "math",
      tex: String.raw`Q_1 = \text{median of } 3,5,6,6,8,9 = 6, \qquad Q_2 = \frac{9+11}{2} = 10, \qquad Q_3 = \text{median of } 11,12,12,15,18,24 = \frac{12+15}{2} = 13.5`,
    },
    {
      kind: "p",
      text: String.raw`Notice that a quartile need not be a member of the list: $Q_2 = 10$ and $Q_3 = 13.5$ are averages of two data values.`,
    },
    {
      kind: "p",
      text: String.raw`If $n$ is odd, the MR's wording does not say whether the middle number belongs to a half. The convention that agrees with ETS's published answer to one of its exercises (MR p. 194) is to leave the median out of both halves, and this site uses it. For $4, 7, 7, 9, 12, 13, 17, 18, 31$ the median is $12$, the lower half is $4, 7, 7, 9$ and the upper half is $13, 17, 18, 31$. So $Q_1 = 7$ and $Q_3 = \frac{17+18}{2} = 17.5$. (Keeping the 12 in both halves would give $Q_3 = 17$ instead, which is why a well-posed question avoids relying on the rule when $n$ is odd.)`,
    },
    {
      kind: "p",
      text: String.raw`The phrase "in a quartile" refers to the four groups: a value "below the first quartile" is "in the first quartile" (MR p. 143).`,
    },
    {
      kind: "p",
      text: String.raw`[[percentile|Percentiles]] do the same job with 99 cut points $P_1, \dots, P_{99}$ that divide the data into 100 roughly equal groups, mostly for very large lists. They agree with the quartiles: $Q_1 = P_{25}$, $Q_2 = P_{50}$ (the median), $Q_3 = P_{75}$ (MR p. 143; MC p. 14). The MR gives no single rule for computing other percentiles, so a GRE question will not make you apply one; it will ask what a percentile _means_ ("about 90% of the data lie below $P_{90}$").`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Range, interquartile range, outliers" },
    {
      kind: "p",
      text: String.raw`The [[range]] is the greatest value minus the least value, $G - L$. The [[interquartile-range|interquartile range]] (IQR) is $Q_3 - Q_1$ and measures the spread of the middle half of the data (MR p. 143). For the twelve numbers above, the range is $24 - 3 = 21$ and the IQR is $13.5 - 6 = 7.5$.`,
    },
    {
      kind: "math",
      tex: String.raw`\text{range} = G - L, \qquad \text{IQR} = Q_3 - Q_1`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`An [[outlier]] is a value unusually small or large compared with the rest. The range is directly affected by outliers; the IQR usually is not. Replace $24$ by $80$ in the twelve numbers: the range leaps from $21$ to $77$, the median stays $10$, and the IQR stays $7.5$, because $Q_1$ and $Q_3$ did not move. (The mean, for the record, rises from $10.75$ to about $15.42$.)`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "\"Not usually affected\" is not \"never affected\"",
      text: String.raw`The IQR ignores an outlier only if the outlier stays in the outer quarter. If a change shuffles which numbers are in the middle half, the quartiles can move. Always recompute the halves rather than quoting the rule.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Boxplots" },
    {
      kind: "p",
      text: String.raw`A [[boxplot]] (box-and-whisker plot) draws five numbers on a number line: the least value $L$, $Q_1$, the median $M$, $Q_3$, and the greatest value $G$. A box spans $Q_1$ to $Q_3$ (split in two at the median), and whiskers run out to $L$ and $G$ (MR p. 144). Because the plot is drawn to scale (MC p. 11), you can read all five numbers directly off the axis.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "4-2-describing-data/box-plot",
        props: { plots: [{ L: 3, Q1: 6, M: 10, Q3: 13.5, G: 24 }], min: 0, max: 26, step: 2, letters: true },
        caption: String.raw`The twelve numbers $3, 5, 6, 6, 8, 9, 11, 12, 12, 15, 18, 24$: $L = 3$, $Q_1 = 6$, $M = 10$, $Q_3 = 13.5$, $G = 24$.`,
      },
    },
    {
      kind: "p",
      text: String.raw`Each of the four pieces (left whisker, left box, right box, right whisker) holds roughly a quarter of the data, whatever its length. A long piece means the data in that quarter are spread out; a short piece means they are packed together. Boxplots are ideal for side-by-side comparison. In the figure below, list $X$ has the larger median and the shorter range, but list $Y$ has the smaller IQR: its middle half is much more tightly packed.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "4-2-describing-data/box-plot",
        props: {
          plots: [
            { label: "List X", L: 20, Q1: 30, M: 56, Q3: 78, G: 90 },
            { label: "List Y", L: 5, Q1: 38, M: 46, Q3: 56, G: 95 },
          ],
          min: 0,
          max: 100,
          step: 10,
        },
        caption: String.raw`Medians: $56$ vs. $46$. Ranges: $70$ vs. $90$. IQRs: $48$ vs. $18$.`,
      },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "What a boxplot cannot tell you",
      text: String.raw`It does not show the mean, the mode, the standard deviation or how many data points there are, and it does not say which values the data take between the marks. Statements like "list $Y$ has the smaller mean" cannot be concluded from the figure. (There are minor variations in how boxplots are drawn, such as marking outliers with symbols; the median at the center and the four quartile groups are always shown, MR p. 144.)`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Standard deviation" },
    {
      kind: "p",
      text: String.raw`The range and IQR use only two or three of the data. The [[standard-deviation|standard deviation]] uses every number: it measures how far the data typically lie from the mean (MR p. 145). The more spread away from the mean, the larger it is; the more clustered around the mean, the smaller. ETS gives the procedure in five steps: (1) compute the mean; (2) find the difference between the mean and each value; (3) square each difference; (4) average the squared differences; (5) take the nonnegative square root.`,
    },
    {
      kind: "math",
      tex: String.raw`\sigma = \sqrt{\frac{(x_1-m)^2 + (x_2-m)^2 + \cdots + (x_n-m)^2}{n}} \qquad (m = \text{mean})`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`Do it for $2, 3, 5, 8, 12$. The mean is $\frac{30}{5} = 6$, and the differences from the mean are $-4, -3, -1, 2, 6$ (the figure shows them to scale). Their squares are $16, 9, 1, 4, 36$, which sum to $66$. The average of the squares is $\frac{66}{5} = 13.2$, so the standard deviation is $\sqrt{13.2} \approx 3.63$.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "4-2-describing-data/deviations",
        props: { data: [2, 3, 5, 8, 12], min: 0, max: 14, step: 2 },
        caption: String.raw`Each value's signed difference from the mean $6$. Squaring makes the far-out value $12$ count $36$, more than all the others combined ($30$).`,
      },
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Divide by n, not n − 1",
      text: String.raw`In the step "average the squared differences," ETS divides by $n$. This is also called the population standard deviation. A _sample_ standard deviation divides by $n-1$, but it is always qualified with the word "sample," and the GRE's plain "standard deviation" never means it (MR p. 146; MC p. 14). For the list above the sample version would be $\sqrt{66/4} \approx 4.06$, a wrong answer on the GRE.`,
    },
    {
      kind: "p",
      text: String.raw`Most GRE standard-deviation questions are comparisons, and for those you almost never need the arithmetic. Compare lists with the same number of values and the same mean by asking which has more of its data far from the mean. In the figure, both rows have mean $5$, but the second row has its points farther out, so its standard deviation ($\sqrt{8} \approx 2.83$) is larger than the first row's ($\sqrt{2} \approx 1.41$).`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "4-2-describing-data/dot-plot",
        props: { rows: [{ label: "Row 1", data: [3, 4, 5, 6, 7] }, { label: "Row 2", data: [1, 3, 5, 7, 9] }], min: 0, max: 10, step: 1, showMean: true },
        caption: String.raw`Same mean, different spread.`,
      },
    },
    {
      kind: "interactive",
      key: "4-2-describing-data/dot-plot-lab",
      title: "Dot plot lab",
      caption: String.raw`Tap the number line to add points (or switch to "Tap to remove"). Watch which statistics react when you add a far-out point, and which do not.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Standardization" },
    {
      kind: "p",
      text: String.raw`Is a 62 on one test better than a 640 on another? To compare, convert each value to a count of standard deviations above or below its own mean. [[standardization|Standardization]] subtracts the mean and divides by the standard deviation (MR p. 148).`,
    },
    { kind: "math", tex: String.raw`\text{standardized value} = \frac{x - m}{d}`, key: true },
    {
      kind: "p",
      text: String.raw`With mean $m = 50$ and standard deviation $d = 8$: the value $62$ standardizes to $\frac{12}{8} = 1.5$ (1.5 standard deviations above the mean), and $41$ standardizes to $\frac{-9}{8} \approx -1.1$ (a negative sign means below the mean). The mean itself standardizes to $0$. In any group of data, most values are within 3 standard deviations of the mean, so after standardizing, most are between $-3$ and $3$ (MR pp. 148–149).`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Comparing across scales",
      text: String.raw`To decide who did better relative to their own group, compare standardized values, not raw scores. Watch the signs: $-0.75$ is _greater_ than $-0.8$ (closer to the mean), even though $0.8$ is the larger magnitude.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "When the data change" },
    {
      kind: "p",
      text: String.raw`A favorite GRE move is to change every value in a list in the same way and ask about a statistic, without giving the actual data. Two rules cover everything. **Adding the same constant $c$ to every value** slides the whole picture along the number line: the mean, median, mode and every quartile increase by $c$, while the range, IQR and standard deviation are unchanged, because the gaps between values did not change. **Multiplying every value by $k > 0$** stretches the picture: every statistic of position or center is multiplied by $k$, and so are the range, IQR and standard deviation (the MR shows these as answers to its exercises, p. 194).`,
    },
    {
      kind: "math",
      tex: String.raw`x \to kx + c: \quad \text{mean, median} \to k(\cdot) + c, \qquad \text{range, IQR, SD} \to |k|\,(\cdot)`,
      key: true,
    },
    {
      kind: "p",
      text: String.raw`For a negative $k$ the same formulas hold (with $|k|$ for the spreads, since a spread cannot be negative); this follows directly from the definitions, though the MR only shows positive cases. A negative $k$ also flips the order, so the old $Q_3$ becomes the new $Q_1$ (after multiplying by $k$ and adding $c$). For example, if a list has mean $6$, median $5$ and standard deviation $3$, the list $10 - 2x$ has mean $-2$, median $0$ and standard deviation $6$.`,
    },
    {
      kind: "interactive",
      key: "4-2-describing-data/transform-explorer",
      title: "Transform the data",
      caption: String.raw`Slide $k$ and $c$ and compare each statistic with its rule. Then switch to "Add one more value" to see the effect of a single new number.`,
    },
    {
      kind: "p",
      text: String.raw`The second kind of change adds, removes, or replaces a single value. The effects depend on where the new value falls. A new value above the mean raises the mean; below the mean lowers it; _equal_ to the mean leaves it unchanged. That last case has a twist for the standard deviation: the sum of squared differences stays the same but is now divided by a larger $n$, so the standard deviation _decreases_ (unless all values were already equal). A value far from the rest raises the range and the standard deviation a lot, and the mean some, but the median and IQR only a little. The median shifts only by one position in the ordered list, so it moves far less than the mean.`,
    },
    {
      kind: "p",
      text: String.raw`Merging two lists is the one operation where the medians of the parts are not enough: the median of the combined list cannot be determined from the two medians alone. The combined mean, in contrast, is the weighted mean from earlier.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps in this section",
      text: String.raw`Sorting before finding a median or quartile. Using $n$, not $n-1$, in the standard deviation. Forgetting that a quartile can be the average of two data values. Assuming an outlier can never change the IQR. Averaging two group means when the groups differ in size. Believing that adding a value equal to the mean leaves the standard deviation unchanged. Using $k$ instead of $|k|$ for a spread after multiplying by a negative number. And reading means or counts off a boxplot, which shows neither.`,
    },
  ],

  terms: [
    {
      id: "central-tendency",
      term: "measures of central tendency",
      turkish: "merkezi eğilim ölçüleri",
      definition: String.raw`Statistics that indicate the "center" of the data along the number line: the mean, the median and the mode.`,
      source: "MR p. 140; MC p. 13",
    },
    {
      id: "position-measures",
      term: "measures of position",
      turkish: "konum ölçüleri",
      definition: String.raw`Statistics that describe where a value lies relative to the rest of the data. The most common are quartiles and percentiles.`,
      source: "MR p. 142; MC p. 13",
    },
    {
      id: "dispersion",
      term: "measures of dispersion",
      turkish: "yayılım (dağılım) ölçüleri",
      definition: String.raw`Statistics that indicate the degree of spread of the data: the range, the interquartile range and the standard deviation.`,
      source: "MR p. 143; MC p. 13",
    },
    {
      id: "mean",
      term: "mean (arithmetic mean, average)",
      turkish: "aritmetik ortalama",
      definition: String.raw`The sum of the $n$ numbers divided by $n$. On the GRE, "average" means the arithmetic mean.`,
      formula: String.raw`\text{mean} = \frac{\text{sum}}{n}`,
      source: "MR p. 140; MC pp. 13–14",
    },
    {
      id: "weight",
      term: "weight (frequency)",
      turkish: "ağırlık / frekans (tekrar sayısı)",
      definition: String.raw`The number of times a value appears in the list. The weights of the distinct values add up to the number of numbers in the list.`,
      source: "MR p. 141",
    },
    {
      id: "weighted-mean",
      term: "weighted mean",
      turkish: "ağırlıklı ortalama",
      definition: String.raw`The mean computed from the distinct values, each multiplied by its weight, with the sum divided by the sum of the weights.`,
      formula: String.raw`\frac{w_1x_1 + \cdots + w_kx_k}{w_1 + \cdots + w_k}`,
      source: "MR pp. 140–141",
    },
    {
      id: "median",
      term: "median",
      turkish: "medyan (ortanca)",
      definition: String.raw`After ordering the numbers from least to greatest: the middle number if $n$ is odd; the average of the two middle numbers if $n$ is even.`,
      source: "MR p. 141; MC p. 14",
    },
    {
      id: "mode",
      term: "mode",
      turkish: "mod (tepe değer)",
      definition: String.raw`The number that occurs most frequently in the list. A list may have more than one mode.`,
      source: "MR p. 142; MC p. 14",
    },
    {
      id: "quartile",
      term: "quartile",
      turkish: "çeyrek (çeyreklik)",
      definition: String.raw`Three numbers $Q_1, Q_2, Q_3$ that divide the ordered data into four roughly equal groups; $Q_2$ is the median. In ETS's rule, $Q_1$ is the median of the first half of the ordered data and $Q_3$ is the median of the second half.`,
      source: "MR pp. 142–143; MC p. 14",
    },
    {
      id: "percentile",
      term: "percentile",
      turkish: "yüzdelik (persentil)",
      definition: String.raw`The 99 numbers $P_1, \dots, P_{99}$ that divide the ordered data into 100 roughly equal groups. $Q_1 = P_{25}$, the median is $P_{50}$, $Q_3 = P_{75}$.`,
      source: "MR p. 143; MC p. 14",
    },
    {
      id: "range",
      term: "range",
      turkish: "açıklık (değişim aralığı)",
      definition: String.raw`The greatest number in the data minus the least number, $G - L$.`,
      formula: String.raw`G - L`,
      source: "MR p. 143; MC p. 14",
    },
    {
      id: "interquartile-range",
      term: "interquartile range (IQR)",
      turkish: "çeyrekler açıklığı / çeyrekler arası genişlik",
      definition: String.raw`The third quartile minus the first quartile, $Q_3 - Q_1$; it measures the spread of the middle half of the data and is not usually affected by outliers.`,
      formula: String.raw`Q_3 - Q_1`,
      source: "MR p. 143; MC p. 14",
    },
    {
      id: "outlier",
      term: "outlier",
      turkish: "aykırı değer",
      definition: String.raw`A data value unusually small or unusually large compared with the rest of the data. The range is directly affected by outliers.`,
      source: "MR p. 143",
    },
    {
      id: "boxplot",
      term: "boxplot (box-and-whisker plot)",
      turkish: "kutu grafiği (kutu-bıyık grafiği)",
      definition: String.raw`A display of the five numbers $L, Q_1, M, Q_3, G$ on a number line: a box for each of the two middle quartile groups and whiskers out to the least and greatest values.`,
      diagram: { key: "4-2-describing-data/box-plot", props: { plots: [{ L: 3, Q1: 6, M: 10, Q3: 13.5, G: 24 }], min: 0, max: 26, step: 2, letters: true } },
      source: "MR p. 144",
    },
    {
      id: "standard-deviation",
      term: "standard deviation",
      turkish: "standart sapma",
      definition: String.raw`The nonnegative square root of the average of the squared differences between each value and the mean (divide by $n$). Also called the population standard deviation. The greater the spread about the mean, the greater it is.`,
      formula: String.raw`\sigma = \sqrt{\frac{\sum (x_i - m)^2}{n}}`,
      source: "MR pp. 145–146; MC p. 14",
    },
    {
      id: "sample-standard-deviation",
      term: "sample standard deviation",
      turkish: "örnek standart sapması",
      definition: String.raw`A different measure that divides the sum of the squared differences by $n - 1$ instead of $n$. It is always qualified with "sample"; plain "standard deviation" on the GRE divides by $n$.`,
      formula: String.raw`\sqrt{\frac{\sum (x_i - m)^2}{n-1}}`,
      source: "MR p. 146; MC p. 14",
    },
    {
      id: "standardization",
      term: "standardization",
      turkish: "standartlaştırma",
      definition: String.raw`Subtracting the mean from each value and then dividing the result by the standard deviation. The result is the number of standard deviations the value lies above (positive) or below (negative) the mean.`,
      formula: String.raw`\frac{x - m}{d}`,
      source: "MR p. 148",
    },
  ],

  examples: [
    {
      id: "ex-1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`The mean score of 28 students on an exam is 71. The mean score of the girls is 68 and the mean score of the boys is 75. How many of the 28 students are girls?`,
      choices: ["12", "14", "15", "16", "18"],
      answer: 3,
      explanation: [
        String.raw`Let $g$ be the number of girls, so $28 - g$ are boys. The total of all scores is $71 \cdot 28 = 1988$, and it also equals $68g + 75(28-g)$.`,
        String.raw`$68g + 2100 - 75g = 1988$, so $7g = 112$ and $g = 16$.`,
        String.raw`Quicker, by balance: $71$ is $3$ above $68$ and $4$ below $75$, so the sizes are in the reversed ratio, girls : boys $= 4 : 3$. Of $28$ students that is $16$ girls and $12$ boys. The trap answer $12$ counts the boys.`,
      ],
    },
    {
      id: "ex-2",
      type: "qc",
      difficulty: "medium",
      given: String.raw`List $L$ consists of positive numbers that are not all equal. List $P$ is formed by multiplying every number in $L$ by 3 and then subtracting 20. List $Q$ is formed by multiplying every number in $L$ by $-4$.`,
      quantityA: String.raw`The standard deviation of the numbers in list $P$`,
      quantityB: String.raw`The standard deviation of the numbers in list $Q$`,
      answer: "B",
      explanation: [
        String.raw`Let $\sigma > 0$ be the standard deviation of $L$ (positive because the numbers are not all equal).`,
        String.raw`Subtracting 20 does not change the spread, and multiplying by 3 multiplies it by 3: the standard deviation of $P$ is $3\sigma$.`,
        String.raw`Multiplying by $-4$ multiplies the spread by $|-4| = 4$: the standard deviation of $Q$ is $4\sigma$. (The negative sign only flips the picture; a standard deviation is never negative.) Since $4\sigma > 3\sigma$, Quantity B is greater.`,
      ],
    },
    {
      id: "ex-3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`Eleven numbers are $14, 6, 21, 9, 17, 12, 25, 6, 30, 19, 11$. Let $Q_1$ be the median of the numbers below the median of the list and $Q_3$ the median of the numbers above it (the median itself is in neither group). What is the interquartile range, $Q_3 - Q_1$?`,
      answer: { kind: "decimal", value: "12" },
      explanation: [
        String.raw`Order the numbers: $6, 6, 9, 11, 12, 14, 17, 19, 21, 25, 30$. The median is the 6th number, $14$.`,
        String.raw`Below the median: $6, 6, 9, 11, 12$ with median $9$, so $Q_1 = 9$. Above it: $17, 19, 21, 25, 30$ with median $21$, so $Q_3 = 21$.`,
        String.raw`IQR $= 21 - 9 = 12$. (If the 14 were kept in both halves, the answer would be 10, which is why the stem states the rule.)`,
      ],
    },
    {
      id: "ex-4",
      type: "mcm",
      difficulty: "hard",
      diagram: {
        key: "4-2-describing-data/box-plot",
        props: {
          plots: [
            { label: "List A", L: 20, Q1: 30, M: 50, Q3: 70, G: 90 },
            { label: "List B", L: 10, Q1: 38, M: 47, Q3: 58, G: 100 },
          ],
          min: 0,
          max: 100,
          step: 10,
        },
        caption: String.raw`Boxplots of two lists of numbers, A and B.`,
      },
      stem: String.raw`The boxplots above summarize list $A$ and list $B$. Indicate all of the following statements that must be true.`,
      choices: [
        String.raw`The range of list $B$ is greater than the range of list $A$.`,
        String.raw`The interquartile range of list $A$ is greater than the interquartile range of list $B$.`,
        String.raw`The median of list $B$ is greater than the median of list $A$.`,
        String.raw`The mean of list $B$ is greater than the mean of list $A$.`,
        String.raw`At least half of the numbers in list $A$ are greater than 45.`,
        String.raw`The least number in list $A$ is greater than the first quartile of list $B$.`,
      ],
      answer: [0, 1, 4],
      explanation: [
        String.raw`Read the five numbers: list $A$ has $L=20$, $Q_1=30$, $M=50$, $Q_3=70$, $G=90$; list $B$ has $L=10$, $Q_1=38$, $M=47$, $Q_3=58$, $G=100$.`,
        String.raw`Ranges: $70$ for $A$, $90$ for $B$, so the first statement is true. IQRs: $40$ for $A$, $20$ for $B$, so the second is true.`,
        String.raw`Medians: $50$ for $A$, $47$ for $B$, so the third is false. The fourth is not determined, because a boxplot does not show the mean.`,
        String.raw`At least half of the numbers in $A$ are at least $50$ (the median), hence greater than $45$, so the fifth is true. The sixth is false: $20 < 38$.`,
      ],
    },
  ],

  quick: [
    {
      id: "q-1",
      prompt: String.raw`What is the median of $15, 2, 20, 6, 11, 9$?`,
      answer: String.raw`$10$`,
      explanation: String.raw`Ordered: $2, 6, 9, 11, 15, 20$. The two middle numbers are $9$ and $11$, so the median is $10$.`,
    },
    {
      id: "q-2",
      prompt: String.raw`What are the modes of $3, 3, 5, 8, 8, 9$?`,
      answer: String.raw`$3$ and $8$`,
      explanation: String.raw`Each occurs twice, more than any other value, so the list has two modes.`,
    },
    {
      id: "q-3",
      prompt: String.raw`$Q_2$ is another name for which of these: the mean, the median, or the mode?`,
      answer: String.raw`The median (also $P_{50}$).`,
      explanation: String.raw`The second quartile is always the median, whatever rule is used for $Q_1$ and $Q_3$.`,
    },
    {
      id: "q-4",
      prompt: String.raw`What is the standard deviation of a list in which all six numbers equal 7?`,
      answer: String.raw`$0$`,
      explanation: String.raw`Every difference from the mean is $0$, so the average of the squared differences is $0$.`,
    },
    {
      id: "q-5",
      prompt: String.raw`A list has mean 5 and standard deviation 2. Every number is multiplied by 3 and then 4 is added. What are the new mean and standard deviation?`,
      answer: String.raw`Mean $19$, standard deviation $6$`,
      explanation: String.raw`Mean: $3(5) + 4 = 19$. The spread is multiplied by $3$ and unaffected by adding $4$: $3 \cdot 2 = 6$.`,
    },
    {
      id: "q-6",
      prompt: String.raw`The mean of a list is 70 and the standard deviation is 8. How many standard deviations from the mean is 58, and on which side?`,
      answer: String.raw`$1.5$ standard deviations below the mean`,
      explanation: String.raw`$\frac{58-70}{8} = -1.5$.`,
    },
  ],

  quiz: {
    questions: [
      {
        id: "z-1",
        type: "qc",
        difficulty: "hard",
        given: String.raw`List $S$ consists of 10 numbers that are not all equal. The mean of the numbers in $S$ is 20, and 20 is one of the numbers. List $T$ is formed by removing one 20 from $S$.`,
        quantityA: String.raw`The standard deviation of the numbers in $S$`,
        quantityB: String.raw`The standard deviation of the numbers in $T$`,
        answer: "B",
        explanation: [
          String.raw`The mean of $T$ is $\frac{200 - 20}{9} = 20$, unchanged. So the differences from the mean are the same, and the removed 20 contributed a difference of $0$.`,
          String.raw`Let $D > 0$ be the sum of squared differences ($D > 0$ because the numbers are not all equal). Then $\sigma_S = \sqrt{D/10}$ and $\sigma_T = \sqrt{D/9}$.`,
          String.raw`Since $\frac{D}{9} > \frac{D}{10}$, Quantity B is greater.`,
        ],
      },
      {
        id: "z-2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`List $L$ is $2, 4, 6, 8, 10, 12, 14, 16$. List $M$ is formed by replacing 14 in $L$ with 160.`,
        quantityA: String.raw`The interquartile range of $M$`,
        quantityB: String.raw`The interquartile range of $L$`,
        answer: "A",
        explanation: [
          String.raw`For $L$: lower half $2, 4, 6, 8$ gives $Q_1 = 5$; upper half $10, 12, 14, 16$ gives $Q_3 = 13$. IQR $= 8$.`,
          String.raw`For $M$, reorder first: $2, 4, 6, 8, 10, 12, 16, 160$. Lower half is unchanged, $Q_1 = 5$. Upper half is $10, 12, 16, 160$, so $Q_3 = \frac{12+16}{2} = 14$. IQR $= 9$.`,
          String.raw`The trap is "outliers don't affect the IQR." The outlier itself didn't, but replacing 14 changed which numbers sit in the upper half. Quantity A is greater.`,
        ],
      },
      {
        id: "z-3",
        type: "qc",
        difficulty: "medium",
        given: String.raw`Group $P$ has mean 40 and group $Q$ has mean 60. Each group has at least one member. The two groups are combined into one list.`,
        quantityA: String.raw`The mean of the combined list`,
        quantityB: String.raw`50`,
        answer: "D",
        explanation: [
          String.raw`The combined mean is a weighted mean of $40$ and $60$, with the group sizes as weights. It is $50$ only if the groups have equal size.`,
          String.raw`If $P$ is larger, the mean is below $50$ (for instance, sizes $3$ and $1$ give $\frac{120+60}{4} = 45$). If $Q$ is larger, it is above $50$. The relationship cannot be determined.`,
        ],
      },
      {
        id: "z-4",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`The mean of 25 numbers is 62. Two more numbers are added, and the mean of all 27 numbers is 64. If one of the two added numbers is 70, what is the other?`,
        choices: ["78", "88", "98", "108", "118"],
        answer: 3,
        explanation: [
          String.raw`The original total is $25 \cdot 62 = 1550$ and the new total is $27 \cdot 64 = 1728$.`,
          String.raw`The two added numbers sum to $1728 - 1550 = 178$, so the other is $178 - 70 = 108$.`,
        ],
      },
      {
        id: "z-5",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`Each of the following lists has six numbers and all of them have the same mean. Which list has the greatest standard deviation?`,
        choices: [
          String.raw`$2, 4, 5, 5, 6, 8$`,
          String.raw`$1, 1, 5, 5, 9, 9$`,
          String.raw`$0, 5, 5, 5, 5, 10$`,
          String.raw`$1, 3, 5, 5, 7, 9$`,
          String.raw`$3, 3, 5, 5, 7, 7$`,
        ],
        answer: 1,
        explanation: [
          String.raw`Every list has sum $30$, so the common mean is $5$. Compare the sums of squared differences (same $n$, so no need to divide): $(2,4,5,5,6,8)$: $20$; $(1,1,5,5,9,9)$: $64$; $(0,5,5,5,5,10)$: $50$; $(1,3,5,5,7,9)$: $40$; $(3,3,5,5,7,7)$: $16$.`,
          String.raw`The trap is the list with two outer values, $0$ and $10$: it has the greatest range, but its other four numbers sit exactly on the mean. The list $1, 1, 5, 5, 9, 9$ has four numbers each 4 away from the mean, so it wins ($\sigma = \sqrt{64/6} \approx 3.27$ versus $\sqrt{50/6} \approx 2.89$).`,
        ],
      },
      {
        id: "z-6",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A list $S$ has mean 50 and standard deviation 10. List $T$ is formed by multiplying each number in $S$ by 0.4 and then adding 12. A number in $S$ is 1.5 standard deviations above the mean of $S$. What is the corresponding number in $T$?`,
        choices: ["26", "32", "38", "44", "77"],
        answer: 2,
        explanation: [
          String.raw`The number in $S$ is $50 + 1.5(10) = 65$. In $T$ it becomes $0.4(65) + 12 = 26 + 12 = 38$.`,
          String.raw`Check by standardization: $T$ has mean $0.4(50) + 12 = 32$ and standard deviation $0.4(10) = 4$, and $32 + 1.5(4) = 38$. A number keeps its standardized value, $1.5$, under $x \to kx + c$ with $k > 0$.`,
        ],
      },
      {
        id: "z-7",
        type: "mcm",
        difficulty: "medium",
        diagram: {
          key: "4-2-describing-data/box-plot",
          props: { plots: [{ L: 12, Q1: 20, M: 26, Q3: 44, G: 90 }], min: 0, max: 100, step: 10, letters: true },
          caption: String.raw`Boxplot of a list of 20 numbers.`,
        },
        stem: String.raw`The boxplot above summarizes a list of 20 numbers. Indicate all of the following statements that must be true.`,
        choices: [
          String.raw`The range of the numbers is 78.`,
          String.raw`The interquartile range is 24.`,
          String.raw`The mean of the numbers is greater than 26.`,
          String.raw`At least 10 of the numbers are greater than or equal to 26.`,
          String.raw`The number 44 is in the list.`,
          String.raw`Exactly 5 of the numbers are less than 20.`,
        ],
        answer: [0, 1, 3],
        explanation: [
          String.raw`Range $= 90 - 12 = 78$ and IQR $= 44 - 20 = 24$: the first two are true.`,
          String.raw`The median of 20 numbers is the average of the 10th and 11th, so the 11th through 20th (ten numbers) are at least $26$: the fourth is true.`,
          String.raw`The boxplot does not show the mean, so the third is not determined. For $n = 20$ each quartile is the average of two data values ($Q_3$ is the average of the 15th and 16th), so $44$ need not be in the list. And since $Q_1 = 20$ is the average of the 5th and 6th numbers, the 6th is at least $20$, so at most 5 numbers are less than $20$, but possibly fewer: "exactly 5" is not forced.`,
        ],
      },
      {
        id: "z-8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`A list $x$ consists of the numbers $1, 3, 4, 5, 7, 8, 9, 11$. A new list is formed by replacing each number $x$ by $10 - 2x$. Indicate all of the following statements that are true.`,
        choices: [
          String.raw`The mean of the new list is $-2$.`,
          String.raw`The first quartile of the new list is $3$.`,
          String.raw`The first quartile of the new list is $-7$.`,
          String.raw`The range of the new list is $-20$.`,
          String.raw`The interquartile range of the new list is $10$.`,
          String.raw`The standard deviation of the new list is twice that of the original list.`,
          String.raw`The standard deviation of the new list is 8 times that of the original list.`,
        ],
        answer: [0, 2, 4, 5],
        explanation: [
          String.raw`Original list: mean $\frac{48}{8} = 6$, median $6$, $Q_1 = \frac{3+4}{2} = 3.5$, $Q_3 = \frac{8+9}{2} = 8.5$, range $10$, IQR $5$.`,
          String.raw`New list: mean $10 - 2(6) = -2$ (true). Multiplying by $-2$ flips the order, so the new $Q_1$ comes from the old $Q_3$: $10 - 2(8.5) = -7$ (true), while $3 = 10 - 2(3.5)$ is the new $Q_3$ (so "first quartile is 3" is false).`,
          String.raw`The range is $2 \cdot 10 = 20$, never negative (false for $-20$). The IQR is $2 \cdot 5 = 10$ (true). The standard deviation is multiplied by $|-2| = 2$ (true); adding the constant does nothing, so "8 times" is false.`,
        ],
      },
      {
        id: "z-9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`The numbers in a list are $1, 1, 3, 7, 9, 15$. Each number is tripled and then 4 is subtracted to form a new list. What is the standard deviation of the new list?`,
        answer: { kind: "decimal", value: "15" },
        explanation: [
          String.raw`Original list: mean $\frac{36}{6} = 6$. Differences: $-5, -5, -3, 1, 3, 9$; squares: $25, 25, 9, 1, 9, 81$, sum $150$. Divide by $n = 6$: $25$, so $\sigma = 5$.`,
          String.raw`Tripling multiplies the standard deviation by $3$; subtracting $4$ does nothing: $3 \cdot 5 = 15$.`,
          String.raw`(Dividing by $n-1$ would give $\sqrt{30} \approx 5.48$ and the wrong answer.)`,
        ],
      },
      {
        id: "z-10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`A list contains the number 1 twice, 3 three times, 6 once, 7 four times, 10 twice, 13 three times, and 18 once. What is the interquartile range of the list?`,
        answer: { kind: "decimal", value: "8.5" },
        explanation: [
          String.raw`There are $2+3+1+4+2+3+1 = 16$ numbers. In order: $1, 1, 3, 3, 3, 6, 7, 7 \mid 7, 7, 10, 10, 13, 13, 13, 18$.`,
          String.raw`$Q_1$ is the median of the first eight, $1,1,3,3,3,6,7,7$: the average of its 4th and 5th numbers, $\frac{3+3}{2} = 3$. $Q_3$ is the median of the last eight, $7,7,10,10,13,13,13,18$: $\frac{10+13}{2} = 11.5$. The IQR is $11.5 - 3 = 8.5$.`,
        ],
      },
    ],
  },
};

export default section;
