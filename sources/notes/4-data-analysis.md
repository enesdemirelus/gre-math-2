# Part 4 — Data Analysis (ETS GRE Math Review) — reference notes

**Page numbering.** "pp." = the page number printed in the footer of the GRE Math Review ("GRE Math Review 125").
Verified against the PDF: **PDF page = printed page + 1** throughout Part 4 (e.g. printed p. 125 = PDF p. 126).
Part 4 runs printed pp. 125–197 (PDF 126–198). Math Conventions pages ("Conv. p.") equal the PDF page numbers.

Source wording is quoted where precision matters. Anything marked **(note, not ETS)** is my own clarification.

General ETS caveat (Math Review intro, PDF p. 2, unnumbered): "this review is not intended to be all-inclusive — the test may include some concepts that are not explicitly presented in this review."

---

## Scope notes (what ETS does / does not cover)

- **Inferential statistics:** neither the Math Review nor the Math Conventions contains an explicit statement that inferential statistics is not tested. (The "not tested" statement is on ETS's Quantitative Reasoning overview web page, which is not one of the documents read here.) **(note, not ETS)** What the Math Review does say:
  - Precise normal-distribution probabilities from calculators/tables: "Such calculations are beyond the scope of this review." (p. 180)
  - Sample standard deviation (divide by $n-1$) is mentioned only as a terminology note; the GRE "standard deviation" is the population SD (divide by $n$). (p. 146; Conv. p. 14)
  - No confidence intervals, hypothesis tests, regression formulas, correlation coefficients, sampling distributions, or significance appear anywhere in Part 4. **(note, not ETS)**
- **Terms from our checklist that ETS does NOT use** **(note, not ETS)**:
  - "least squares" / "regression line": ETS says only **trend** and "a line or a curve that best represents the trend" / "trend line" (p. 137). No formula for fitting it.
  - "z-score": ETS uses **standardization** and "number of standard deviations above/below the mean" (pp. 146–149, 180).
  - "time plot": ETS calls it a **line graph**; with time on the horizontal axis it is "often called a **time series**" (p. 139).
  - "conditional probability" and the notation $P(F \mid E)$: not used. ETS phrases it as "the probability that, *given that the first event has already happened*, the second event will happen as well" (p. 164).
  - "68–95–99.7 rule": not stated numerically in the text. Text says "About two-thirds … within 1 standard deviation" and "Almost all … within 2 standard deviations" (p. 175). The 34% / 14% / 2% regions appear only in figures (Data Analysis Figure 21, p. 190; Conventions Figure 7, Conv. p. 16).
  - "Skewed", "outlier rule (1.5 IQR)", "variance", "stem-and-leaf", "dot plot", "two-way table" as named terms: not used. (A two-way table does appear in Exercise 13, p. 188, unnamed.)

---

## 4.1 Methods for Presenting Data (Math Review pp. 125–139)

### Definitions
- **Variable** (p. 125): "a variable is any characteristic that can vary for a population of individuals or objects." Variables can be **quantitative, or numerical** (e.g. age) or **categorical, or nonnumerical** (e.g. eye color).
- **Distribution of a variable / distribution of data** (p. 125): "indicates how frequently different categorical or numerical data values are observed in the data." Data "are collected from a population by observing one or more variables."
- **Frequency, or count** (p. 125): "the number of times that the category or numerical value appears in the data."
- **Frequency distribution** (p. 125): "a table or graph that presents the categories or numerical values along with their corresponding frequencies."
- **Relative frequency** (p. 125): "the corresponding frequency divided by the total number of data." May be expressed as percents, fractions, or decimals (p. 126).
- **Relative frequency distribution** (p. 126): "a table or graph that presents the relative frequencies of the categories or numerical values."
- **Tables** (p. 126): a frequency distribution is often a 2-column table (values in first column, frequencies in second); relative frequency table has same layout. With many values, values "are often grouped together in a smaller number of groups."
- **Bar graph, or bar chart** (p. 130): "each of the data categories or numerical values is represented by a rectangular bar, and the height of each bar is proportional to the corresponding frequency or relative frequency. All of the bars are drawn with the same width, and the bars can be presented either vertically or horizontally." Bar graphs "enable comparisons across several categories more easily than tables do."
- **Segmented bar graph, or stacked bar graph** (p. 132): "similar to a regular bar graph except that … each rectangular bar is divided, or segmented, into smaller rectangles that show how the variable is 'separated' into other related variables."
- **Classes** (p. 133): intervals into which values of a numerical variable are grouped. "divide the entire interval of values into smaller intervals of equal length and then count the values that fall into each interval."
- **Histogram** (pp. 133–134): graphs of frequency distributions "similar to bar graphs, but they must have a number line for the horizontal axis, which represents the numerical variable. Also, in a histogram, there are no regular spaces between the bars. Any spaces between bars in a histogram indicate that there are no data in the intervals represented by the spaces." A variable with few values: "a bar centered over the value" (p. 134).
- **Circle graphs, often called pie charts** (p. 135): "used to represent data that have been separated into a small number of categories. They illustrate how a whole is separated into parts. … the area of the circle representing each category is proportional to the part of the whole that the category represents." May represent a frequency distribution, relative frequency distribution, or "any total amount that is distributed into a small number of categories."
- **Sector** (p. 136): "Each part of a circle graph is called a sector."
- **Scatterplot** (p. 136): "useful for showing the relationship between two numerical variables whose values can be observed in a single population of individuals or objects." One variable on horizontal axis, other on vertical; each individual gives an ordered pair plotted as a point.
- **Trend** (p. 137): "an overall pattern, or trend, in the relationship between the two variables." "In many cases, a line or a curve that best represents the trend is also displayed in the graph and is used to make predictions about the population." **Trend line** used in Example 4.1.12 (pp. 137–138).
- **Line graph** (pp. 138–139): "useful for showing the relationship between two numerical variables, especially if one of the variables is time." "There is at most one data point for each value on the horizontal axis, similar to a function. The data points are in order from left to right, and consecutive data points are connected by a line segment."
- **Time series** (p. 139): when one variable is time it goes on the horizontal axis, "labeled with regular time intervals. The data points may represent an interval of time, such as an entire day or year, or just an instant of time. Such a line graph is often called a time series."

### Facts / formulas
- Relative frequencies total 100% (percents) or 1 (decimals/fractions) (p. 128).
- Histogram bar area: "Because the bars all have the same width, the area of each bar is proportional to the amount of data that the bar represents." (p. 135)
- With bars of width 1, "the sum of the areas of the bars equals the sum of the relative frequencies, which is 100% or 1" — "central to the discussion of probability distributions in Section 4.5." (p. 135)
- Circle graph central angle (p. 136): central angle is proportional; e.g. 7% of $360^\circ$ $= 25.2^\circ$. In general $\text{central angle} = (\text{percent}) \times 360^\circ$ **(general form: note, not ETS; ETS gives the worked case)**.
- Trend-line slope (p. 138): estimate two points on the line, e.g. $(0, 5.8)$ and $(100, 3.2)$:
  $$\frac{3.2-5.8}{100-0}=\frac{-2.6}{100}=-0.026$$
  hours per unit; ×10 → 0.26 hour per 10 units; ×60 → about 16 minutes per 10 units.
- Line graph: greatest increase between consecutive points = steepest positive segment (greatest slope) (p. 139).

### Data displays (what ETS shows and how they are read)
- **Ex. 4.1.3 (pp. 126–127):** 25 values (number of children in families) → 2-column frequency table (0:3, 1:5, 2:7, 3:6, 4:3, 5:1; Total 25) and relative-frequency table (12%, 20%, 28%, 24%, 12%, 4%; Total 100%). Tables have a "Total" row.
- **Ex. 4.1.4 (p. 128):** 30 test scores, 18 distinct values, grouped into classes 61–70, 71–80, 81–90, 91–100 with frequencies.
- **Ex. 4.1.5–4.1.6 (pp. 128–129):** general data tables (year vs. per-capita income with \$ and commas; planets with two numeric columns, units stated in column headers "(in millions of kilometers)").
- **Data Analysis Figure 1 (p. 131):** vertical bar graph, title in caps, y-axis "Enrollment" 0–8,000 with gridlines every 1,000 and minor ticks, five categories. Read: greatest/least bar; estimate a value (College D ≈ 6,400).
- **Figure 2 (p. 132):** grouped (side-by-side) bar graph, two variables (Fall 2009 dark, Spring 2010 light), legend box. Read: compare pairs; greatest decrease.
- **Figure 3 (p. 133):** segmented/stacked bar graph, full-time (white, top) vs part-time (gray, bottom); total = bar top, parts by subtraction (D: total ≈ 6,400, part-time ≈ 2,200, full-time ≈ 4,200).
- Bar graphs may also compare numerical data (temperatures, dollar amounts, percents, heights, weights); categories may be numerical such as years (p. 133).
- **Figure 4 (p. 135, repeated pp. 165, 169):** relative frequency histogram, x-axis "Number of Children" 0–5 (bars centered on values, no gaps), y-axis "Relative Frequency" 0%–30% in steps of 5%. Read shape: "mound with one peak," central values 2 and 3, "close to being symmetric."
- **Figure 5 / Figure 18 (pp. 136, 182):** circle graph with title, "Total: \$3,980 million," sectors labeled with category and percent (47, 25, 12, 7, 5, 4); small sectors labeled with leader lines.
- **Figure 6 (p. 137):** scatterplot of 50 points with a labeled trend line; y-axis has a **broken scale** (0.0 then jump to 3.0–6.0, shown with a zigzag break). Reading predictions from a vertical line at a given x (index 70 → ≈ 4 hours).
- **Figure 7 (p. 139):** line graph / time series, years 2001–2009 on x-axis, enrollment 0–5,000.
- In 4.6 and Exercises: table with percents and totals row plus "Total number of complaints" row (p. 180); two circle graphs side by side with different totals (Fig. 23, p. 192); multi-line graph with three series (Total dashed, Public solid, Private gray) and y-axes on both sides (Fig. 22, p. 191); grouped bar graph of percents with a dashed vertical separator and a footnote giving the bases (Fig. 24, p. 193); Venn diagram (Fig. 19, p. 183); two-way table (Ex. 13, p. 188).

### Exercise styles
- No exercises at section end; Part 4 exercises are at pp. 185–193 (see 4.6 below).

### Gotchas ETS emphasizes
- Histogram ≠ bar graph: histogram needs a number line x-axis and no regular gaps; a gap means an empty interval (p. 134).
- Circle graph sector area (and central angle) is proportional to the percent (p. 136).
- Trend-line slope is negative when the variable decreases; convert units carefully (hours → minutes) (p. 138).
- Scale may be broken / not start at 0 (Figure 6, p. 137).

---

## 4.2 Numerical Methods for Describing Data (Math Review pp. 139–149)

### Definitions
- **Statistics, or statistical measures** (p. 139): grouped as **measures of central tendency**, **measures of position**, **measures of dispersion**.
- **Measures of central tendency** (p. 140): "indicate the 'center' of the data along the number line." Three: (1) "the arithmetic mean—usually called the average or simply the mean", (2) the median, (3) the mode.
- **Mean** (p. 140): "To calculate the mean of n numbers, take the sum of the n numbers and divide it by n."
- **Weighted mean / weight** (pp. 140–141): when values repeat, the mean is "a weighted mean of only those values in the list that are different." "The number of times a value appears in the list, or the frequency, is called the weight of that value." "the sum of the weights is the number of numbers in the list."
- **Median** (p. 141) — ETS method, exact wording: "To calculate the median of n numbers, first order the numbers from least to greatest. If n is odd, then the median is the middle number in the ordered list of numbers. If n is even, then there are two middle numbers, and the median is the average of these two numbers."
- **Mode** (p. 142): "the number that occurs most frequently in the list." "A list of numbers may have more than one mode" (e.g. 1, 2, 3, 3, 3, 5, 7, 10, 10, 10, 20 has modes 3 and 10).
- **Measures of position** (p. 142): basic positions labeled **L** (least), **G** (greatest), **M** (median). Most common measures of position: **quartiles** and **percentiles**; they "may or may not themselves be values in the data."
- **Quartiles $Q_1, Q_2, Q_3$** (p. 142): "three quartile numbers, called the first quartile, the second quartile, and the third quartile, that divide the data into four roughly equal groups." Groups: L to $Q_1$, $Q_1$ to $Q_2$, $Q_2$ to $Q_3$, $Q_3$ to G.
- **ETS quartile rule — exact wording** (p. 142): "Because the number of data may not be divisible by 4, there are various rules to determine the exact values of $Q_1$ and $Q_3$, and some statisticians use different rules, but in all cases $Q_2$ is equal to the median M. We use perhaps the most common rule for determining the values of $Q_1$ and $Q_3$. According to this rule, after the data are listed in increasing order, $Q_1$ is the median of the first half of the data in the ordered list and $Q_3$ is the median of the second half of the data in the ordered list."
  - Worked case, $n = 16$ (pp. 142–143): 2, 4, 4, 5, 7, 7, 7, 7 | 7, 7, 8, 8, 9, 9, 9, 9 → $Q_2 = 7$, $Q_1 = 6$ (average of 5 and 7), $Q_3 = 8.5$ (average of 8 and 9).
  - Odd $n$: ETS's text does not spell out whether the median is included in the halves. ETS's answer to Exercise 2 (data 19, 21, 22, 22, 28, 31, 33, 44, 50; answer IQR = 17, p. 194) is consistent only with **excluding the median** from both halves: $Q_1 = \frac{21+22}{2}=21.5$, $Q_3=\frac{33+44}{2}=38.5$, $38.5-21.5=17$. **(note, not ETS — inferred from ETS's answer)**
- **"In a quartile"** (p. 143): "The phrase 'in a quartile' refers to being in one of the four groups determined by $Q_1$, $Q_2$, and $Q_3$." E.g. 4 is "below the first quartile" = "in the first quartile."
- **Percentiles** (p. 143): "mostly used for very large lists"; "the 99 percentiles $P_1, P_2, P_3, \ldots, P_{99}$ divide the data into 100 groups." "statisticians apply various rules to determine values of percentiles" (no single rule given).
- **Measures of dispersion** (p. 143): "indicate the degree of spread of the data." Most common: range, interquartile range, standard deviation.
- **Range** (p. 143): "the difference between the greatest number G in the data and the least number L in the data; that is, $G-L$." E.g. 11, 10, 5, 13, 21 → $21-5=16$.
- **Outliers** (p. 143): "Sometimes a data value is unusually small or unusually large in comparison with the rest of the data. Such data are called outliers because they lie so far out from the rest of the data. The range is directly affected by outliers." (No numerical outlier rule is given.)
- **Interquartile range** (p. 143): "the difference between the third quartile and the first quartile; that is, $Q_3-Q_1$. Thus, the interquartile range measures the spread of the middle half of the data." "not usually affected by outliers."
- **Boxplots or box-and-whisker plots** (p. 144): the five numbers $L, Q_1, Q_2, Q_3, G$ "plotted along a number line to show where the four quartile groups lie … a box is used to identify each of the two middle quartile groups of data, and 'whiskers' extend outward from the boxes to the least and greatest values."
- **Standard deviation** (p. 145): "a measure of spread that depends on each number in the list. Using the mean as the center of the data, the standard deviation takes into account how much each value differs from the mean and then takes a type of average of these differences." **ETS procedure, exact wording** — "The standard deviation of a group of numerical data is computed by
  1. calculating the mean of the values,
  2. finding the difference between the mean and each of the values,
  3. squaring each of the differences,
  4. finding the average of the squared differences, and
  5. taking the nonnegative square root of the average of the squared differences."
- **Sample standard deviation / population standard deviation** (p. 146): "Note on terminology: The term 'standard deviation' defined above is slightly different from another measure of dispersion, the sample standard deviation. The latter term is qualified with the word 'sample' and is computed by dividing the sum of the squared differences by $n-1$ instead of $n$. … preferred for technical reasons for a sample of data that is taken from a larger population of data. Sometimes the standard deviation is called the population standard deviation to help distinguish it from the sample standard deviation."
- **Standardization** (p. 148): "The process of subtracting the mean from each value and then dividing the result by the standard deviation is called standardization." It "provides a measure of position relative to the rest of the data independently of the variable for which the data was collected and the units of the variable."

### Facts / formulas
- Mean: $\dfrac{6+4+7+10+4}{5}=\dfrac{31}{5}=6.2$ (p. 140).
- Weighted mean (p. 141): $\dfrac{1(2)+2(4)+1(5)+6(7)+2(8)+4(9)}{1+2+1+6+2+4}=\dfrac{109}{16}=6.8125$.
  General form **(note, not ETS)**: $\bar{x}=\dfrac{\sum w_i x_i}{\sum w_i}$.
- Mean sensitive to extreme values; median "fairly unaffected" (p. 141): 4, 4, 6, 7, 10 → 4, 4, 6, 7, 24 changes mean 6.2 → $\frac{45}{5}=9$, median stays 6.
- Median with repeated values may split unequal counts: median of the 16-number list is 7 but 4 data are below and 6 above (p. 141).
- $Q_1=P_{25}$, $M=Q_2=P_{50}$, $Q_3=P_{75}$ (p. 143).
- Range $=G-L$; IQR $=Q_3-Q_1$ (p. 143). Ex. 4.2.6: range $9-2=7$, IQR $8.5-6=2.5$ (p. 144).
- Standard deviation (population), ETS steps in symbols **(symbolic form: note, not ETS)**: $$\sigma=\sqrt{\frac{(x_1-m)^2+(x_2-m)^2+\cdots+(x_n-m)^2}{n}}$$ — divide by $n$, not $n-1$.
- Ex. 4.2.8 (p. 146): data 0, 7, 8, 10, 10; mean 7; squared differences $(7-0)^2,(7-7)^2,(7-8)^2,(7-10)^2,(7-10)^2$ = 49, 0, 1, 9, 9; average $\frac{68}{5}=13.6$; SD $=\sqrt{13.6}\approx 3.7$.
- Number of SDs from the mean (pp. 146–148), mean 32.5, $d=7.1$: 1 SD above $=32.5+d=39.6$; 2 SD above $=32.5+2d=46.7$; a value $p$ is $\dfrac{p-32.5}{7.1}$ standard deviations from the mean. $48 \to \frac{15.5}{7.1}\approx 2.2$; $30\to\frac{-2.5}{7.1}\approx-0.4$ ("the negative sign indicates that the rating is 0.4 standard deviation below the mean"); $20\to\frac{-12.5}{7.1}\approx-1.8$. The mean itself is 0 standard deviations from the mean (p. 148).
  General: standardized value $=\dfrac{x-m}{d}$ (p. 148; p. 180 "subtract m … then divide the result by d").
- **Fact** (p. 148): "In any group of data, most of the data are within 3 standard deviations of the mean."
- (p. 149) "when *any group of data* are standardized, most of the data are transformed to an interval on the number line centered about 0 and extending from $-3$ to 3. The mean is always transformed to 0."
- SD qualitative: "the more the data are spread away from the mean, the greater the standard deviation; and the more the data are clustered around the mean, the lesser the standard deviation." (p. 145)
- Effects of transformations (from Exercise 1–2 answers, p. 194): adding 7 to each value adds 7 to mean, median, mode, leaves range unchanged; multiplying by 3 multiplies mean, median, mode, range, IQR and SD by 3 (SD $\approx 3(10.22)=30.66$); subtracting 2 leaves IQR and SD unchanged. (ETS gives these as answers, not as stated rules.)

### Data displays
- **Figure 8 (p. 144):** single horizontal boxplot over a number line 0–10, with labels L, $Q_1$, M, $Q_3$, G under the plot; median line inside box.
- **Figure 9 (p. 145):** two boxplots (List 1, List 2) stacked over one shared axis 100–900; read medians (≈450 vs ≈550), ranges (≈520 vs ≈500), IQRs (≈430 vs ≈220).
- "There are a few variations in the way boxplots are drawn—the position of the ends of the boxes can vary slightly, and some boxplots identify outliers with certain symbols—but all boxplots show the center of the data at the median and illustrate the spread of the data in each of the four quartile groups. As such, boxplots are useful for comparing sets of data side by side." (p. 144)

### Exercise styles
- See Exercises 1–5 below (compute statistics of a list; effect of shifting/scaling; combine groups; read a boxplot).

### Gotchas ETS emphasizes
- Median requires ordering first; even $n$ → average of two middle numbers (p. 141).
- A list may have more than one mode (p. 142).
- Quartile/percentile rules vary among statisticians; ETS uses "median of each half" (p. 142).
- Outliers affect range directly; IQR not usually affected (p. 143).
- GRE "standard deviation" divides by $n$; the "sample standard deviation" (divide by $n-1$) is a different, qualified term (p. 146).
- Negative standardized value = below the mean (p. 147).
- Median of combined groups cannot be determined from the groups' medians alone (Exercise 3 answer, p. 194); mean of combined groups is the weighted mean.

---

## 4.3 Counting Methods (Math Review pp. 149–157)

### Definitions
- **Set** (p. 149): "a collection of objects that have some property." **Members** or **elements**: the objects of a set.
- **Finite** set: "their members can be completely counted"; can be listed in curly brackets, e.g. $\{0, 2, 4, 6, 8\}$. **Infinite** sets: sets that are not finite (e.g. all integers). (p. 149)
- **Empty set** (p. 149): "A set that has no members is called the empty set and is denoted by the symbol $\varnothing$." **Nonempty**: one or more members.
- **Subset** (p. 149): "If A and B are sets and all of the members of A are also members of B, then A is a subset of B." "by convention, $\varnothing$ is a subset of every set."
- **List** (p. 149): "like a finite set, having members that can all be listed, but with two differences. In a list, the members are ordered … Also, elements can be repeated in a list and the repetitions matter." E.g. lists 1, 2, 3, 2 and 1, 2, 2, 3 are different. For sets, "repetitions are not counted as additional elements and the order of the elements does not matter": $\{1, 2, 3, 2\}$ and $\{3, 1, 2\}$ are the same set.
- **Number of elements** $|S|$ (p. 149): if $S=\{6.2, -9, \pi, 0.01, 0\}$ then $|S|=5$; $|\varnothing|=0$.
- **Intersection** (p. 150): "the set of all elements that are in both S and T," denoted $S\cap T$.
- **Union** (p. 150): "the set of all elements that are in either S or T or both," denoted $S\cup T$.
- **Disjoint or mutually exclusive** (p. 150): "If sets S and T have no elements in common."
- **Venn diagram** (p. 150): "sets are represented by circular regions that overlap if they have elements in common but do not overlap if they are disjoint. Sometimes the circular regions are drawn inside a rectangular region, which represents a **universal set**, of which all other sets involved are subsets."
- **Inclusion-exclusion principle** (p. 150): "relates the numbers of elements in the union and intersection of two finite sets. The number of elements in the union of two sets equals the sum of their individual numbers of elements minus the number of elements in their intersection."
- **Multiplication principle** (p. 151): "Suppose there are two choices to be made sequentially and that the second choice is independent of the first choice. Suppose also that there are k different possibilities for the first choice and m different possibilities for the second choice. The multiplication principle states that under those conditions, there are km different possibilities for the pair of choices." For more than two independent choices: product of the numbers of possibilities.
- **Permutation** (p. 153): each order of n objects "is called a permutation, and the product above is called the number of permutations of n objects."
- **n-factorial** $n!$ (p. 153): special symbol for $n(n-1)(n-2)\cdots(3)(2)(1)$. "As a special definition, $0! = 1$."
- **Permutations of n objects taken k at a time** (p. 154): "the number of ways to select and order k objects out of n objects … commonly denoted by the notation ${}_nP_k$." ($k\le n$)
- **Combinations of n objects taken k at a time** (p. 156): k objects chosen from n, $k\le n$, "but that the k objects will not be put in order." Also called **n choose k**; "two notations commonly used to denote this number are ${}_nC_k$ and $\binom{n}{k}$."

### Facts / formulas
- $|A\cup B| = |A| + |B| - |A\cap B|$ (p. 151); "the subtraction is necessary to avoid counting the elements in $A\cap B$ twice."
- $|B\cup C| = |B| + |C|$ because $B\cap C=\varnothing$ (p. 151).
- Multiplication principle examples: $(5)(3)=15$ meals (p. 151); password $(10)(26)(26)(26)=175{,}760$ with repetition, $(10)(26)(25)(24)=156{,}000$ without repetition (p. 152) — "if repetitions … are not allowed … the choices are not all independent, but a modification of the multiplication principle can still be applied"; coin tossed 8 times: $(2)(2)\cdots(2)=2^8=256$ (p. 152).
- Orders of n objects: $n(n-1)(n-2)\cdots(3)(2)(1)=n!$ (p. 153). $1!=1$, $2!=(2)(1)$, $3!=(3)(2)(1)$, $4!=(4)(3)(2)(1)$; $0!=1$.
- $n! = n(n-1)! = n(n-1)(n-2)! = n(n-1)(n-2)(n-3)!$ and so on (p. 153).
- $10!=3{,}628{,}800$ (p. 154).
- Permutations (p. 154):
  $$n(n-1)(n-2)\cdots(n-k+1) = n(n-1)(n-2)\cdots(n-k+1)\frac{(n-k)!}{(n-k)!}=\frac{n!}{(n-k)!}={}_nP_k$$
  E.g. $(7)(6)(5)(4)(3)=2{,}520=\dfrac{7!}{(7-5)!}$ (pp. 154–155).
- Select-with-order vs without (p. 155):
  (number of ways to select without order) × (number of ways to order) = (number of ways to select with order); so
  $$\text{(without order)}=\frac{\text{(with order)}}{\text{(number of ways to order)}};\qquad \frac{5!/2!}{3!}=\frac{5!}{3!\,2!}=10.$$
- Combinations (p. 156): $${}_nC_k=\binom{n}{k}=\frac{n!}{k!\,(n-k)!}$$ E.g. $\dfrac{9!}{3!\,(9-3)!}=\dfrac{9!}{3!\,6!}=\dfrac{(9)(8)(7)}{(3)(2)(1)}=84$.
- "given a set S consisting of n elements, n choose k is simply the number of subsets of S that consist of k elements." (p. 156)
- Formula holds for $k=0$ and $k=n$ (pp. 156–157): $n$ choose $0$ $=\dfrac{n!}{0!\,n!}=1$ (only the empty set); $n$ choose $n$ $=\dfrac{n!}{n!\,0!}=1$ (only S itself).
- Symmetry (p. 157): $n$ choose $k$ = $n$ choose $(n-k)$: $$\frac{n!}{(n-k)!\,(n-(n-k))!}=\frac{n!}{(n-k)!\,k!}=\frac{n!}{k!\,(n-k)!}$$

### Data displays
- **Figure 10 (p. 150):** Venn diagram with three circles A, B, C in rectangle U; A∪C shown with vertical stripes, B horizontal stripes, A∩B cross-hatched; B and C do not overlap ($B\cap C=\varnothing$).
- Lists of arrangements written out (ABC ACB BAC BCA CAB CBA, p. 152; ten 3-letter selections, p. 155).

### Exercise styles
- See Exercises 6–10 below (arrangements of letters; seating with a fixed position; digit-restricted counting; choosing subsets; ordered vs unordered prizes).

### Gotchas ETS emphasizes
- Sets ignore order and repetition; lists don't (p. 149).
- Repetition allowed vs not allowed changes the count (p. 152).
- Order matters → permutations; order doesn't → combinations; divide by the number of orderings (p. 155).
- $0! = 1$ (p. 153).

---

## 4.4 Probability (Math Review pp. 157–164)

### Definitions
- **Probability** (opening, p. 157): "a way of describing uncertainty in numerical terms."
- **Probability experiment, also called a random experiment** (p. 157): "an experiment for which the result, or **outcome**, is uncertain. We assume that all of the possible outcomes of an experiment are known before the experiment is performed, but which outcome will actually occur is unknown."
- **Sample space** (p. 157): "The set of all possible outcomes of a random experiment." **Event**: "any particular set of outcomes." (6-sided die: sample space $\{1, 2, 3, 4, 5, 6\}$.)
- **Probability of an event** (p. 158): "a number from 0 to 1, inclusive, that indicates the likelihood that the event occurs when the experiment is performed. The greater the number, the more likely the event."
- **Random selection / equally likely** (p. 158): "The assumption of random selection means that each of the names is equally likely to be selected."
- Notation: "For any event E, the probability that E occurs is often written as $P(E)$." (p. 158)
- **Fair** die: the 6 outcomes are equally likely (p. 159).
- Events **"both E and F occur"** = outcomes in $E\cap F$; **"E or F, or both, occur"** = outcomes in $E\cup F$ (p. 159).
- **Mutually exclusive** events (p. 160): "Events that cannot occur at the same time." (odd vs. even on one roll; but rolling a 4 and rolling an even number are not mutually exclusive.)
- **Independent** (p. 160): "E and F are said to be independent if the occurrence of either event does not affect the occurrence of the other."
- Shorter notation (p. 161): "E and F" for "both E and F occur"; "E or F" for "E or F or both occur."
- Dependent sequential events (p. 164): "Two events that happen sequentially are not always independent. The occurrence of the first event may affect the occurrence of the second event. In this case, the probability that *both* events happen is equal to the probability that the first event happens multiplied by the probability that, *given that the first event has already happened*, the second event will happen as well." (ETS does not use the name "conditional probability" or $P(F\mid E)$ notation.)

### Facts / formulas
- Equally likely outcomes (p. 159):
  $$P(E)=\frac{\text{the number of outcomes in the event }E}{\text{the number of possible outcomes in the experiment}}$$
  Fair die: $P(4)=\frac16$; $P(\text{odd})=\frac36=\frac12$. Ex. 4.4.1: $P(J)=\frac{7}{15}$ (p. 158).
- Six general facts (p. 159):
  1. If E is certain to occur, $P(E)=1$.
  2. If E is certain *not* to occur, $P(E)=0$.
  3. If E is possible but not certain, $0<P(E)<1$.
  4. The probability that E will not occur is $1-P(E)$.
  5. $P(E)$ is the sum of the probabilities of the outcomes in E.
  6. The sum of the probabilities of all possible outcomes of an experiment is 1.
- Three rules (p. 160, restated p. 161):
  - Rule 1 (inclusion-exclusion applied to probability): $P(E \text{ or } F)=P(E)+P(F)-P(E \text{ and } F)$
  - Rule 2: $P(E \text{ or } F)=P(E)+P(F)$ if E and F are mutually exclusive (since $P(\text{both } E \text{ and } F \text{ occur})=0$).
  - Rule 3: $P(E \text{ and } F)=P(E)P(F)$ if E and F are independent. Fair die twice: $P(E)P(F)=\left(\frac16\right)\left(\frac16\right)=\frac1{36}$; the experiment is "rolling the die twice," outcomes are ordered pairs.
- Mutually exclusive vs independent (p. 160): "if $P(E)\neq 0$ and $P(F)\neq 0$, then events E and F cannot be both mutually exclusive and independent."
- Non-independence check (Ex. 4.4.2, p. 161): $E$ = roll 3, $F$ = roll odd: $P(E \text{ and } F)=P(E)=\frac16 \neq P(E)P(F)=\left(\frac16\right)\left(\frac12\right)=\frac1{12}$.
- Complement (Ex. 4.4.3, p. 161): 12-sided die, $P(\text{not }4)=1-\frac1{12}=\frac{11}{12}$; $P(\text{multiple of 5 or odd})=\frac2{12}+\frac6{12}-\frac1{12}=\frac7{12}$, checked by direct count of 1, 3, 5, 7, 9, 10, 11 (p. 162).
- Independent "or" (Ex. 4.4.4, p. 162): $P(B \text{ or } C)=P(B)+P(C)-P(B)P(C)=0.40+0.85-(0.40)(0.85)=1.25-0.34=0.91$; mutually exclusive: $P(A \text{ or } B)=0.23+0.40=0.63$.
- Non-equally-likely outcomes (Ex. 4.4.5, pp. 162–163): weighted die, $1=p+p+p+p+p+2p=7p$, so $P(1)=\cdots=P(5)=\frac17$, $P(6)=\frac27$. Two rolls (Ex. 4.4.6, p. 163): $P(\text{odd})=\frac37$, $P(\text{even})=\frac47$, $P(\text{odd then even})=\left(\frac37\right)\left(\frac47\right)=\frac{12}{49}$.
- Without replacement (Ex. 4.4.7, p. 164): 5 orange, 4 red, 1 blue; $P(\text{red first})=\frac4{10}=\frac25$; then orange given red first $=\frac59$; product $\left(\frac25\right)\left(\frac59\right)=\frac29$.

### Data displays
- None (die/box/disk scenarios in text).

### Exercise styles
- See Exercises 11–15 below (random integer with digit conditions; without-replacement; probabilities from a two-way table including "given" subgroups; solving for unknown probabilities using mutually exclusive / independent rules; independent "both / at least one / neither").

### Gotchas ETS emphasizes
- Use the ratio formula only when outcomes are equally likely (Ex. 4.4.5: "the 6 outcomes are *not equally likely*", p. 163).
- Subtract the overlap in "or" unless events are mutually exclusive (p. 160).
- Mutually exclusive ≠ independent (p. 160).
- Sequential draws without replacement are not independent; recompute the second probability from what remains (p. 164).

---

## 4.5 Distributions of Data, Random Variables, and Probability Distributions (Math Review pp. 164–180)

### Definitions
- **Random variables** (intro, p. 164): "variables whose values depend on chance."
- **Distribution curve** (also **density curve**, **frequency curve**) (p. 167): a smooth curve modeling a relative frequency histogram of a large data set; vertical scale adjusted so total area of bars is 1, so "the area under the curve that models the distribution is also 1." "the main property of a distribution curve is that the area under the curve in any vertical slice, just like a histogram bar, represents the proportion of the data that lies in the corresponding interval on the horizontal axis."
- **Random variable** (p. 167): "Given a distribution of data, a variable, say X, may be used to represent a randomly chosen value from the distribution. Such a variable X is an example of a random variable, which is a variable whose value is a numerical outcome of a random experiment." More generally (p. 172): "A random variable can be any quantity whose value is the result of a random experiment. The possible values of the random variable are the same as the outcomes of the experiment."
- **Probability distribution of X** (p. 170): the table showing all possible values of X and their probabilities.
- **Mean of the random variable X / expected value** (p. 171): "Another name for the mean of a random variable is expected value."
- **Discrete random variables** (p. 174): "their values consist of discrete points on a number line."
- **Uniform distribution** (p. 174): fair die → each bar of the probability histogram the same height; "Such a flat histogram indicates a uniform distribution, since the probability is distributed uniformly over all possible outcomes."
- **Approximately normally distributed** data (p. 175): relative frequency distribution "shaped somewhat like a bell"; four properties (below). A random variable X chosen from such a distribution "is approximately normally distributed."
- **Continuous probability distribution** (p. 176): "The region below such a curve [a distribution/density curve] represents a distribution called a continuous probability distribution."
- **Normal distribution** (p. 176): "the most important one" of the continuous probability distributions; "has a bell-shaped curve."
- **Continuous random variable** (p. 178): random variable associated with a continuous probability distribution, where areas of vertical slices under the curve "are equal to probabilities of a random variable associated with the distribution."
- **Standard normal distribution** (p. 180): "a normal distribution with a mean of 0 and standard deviation equal to 1."

### Facts / formulas
- Ex. 4.5.1 (pp. 165–167): 800 lifetimes in 50 classes of 10 hours (601–610, …, 1,091–1,100); M (median) between 730 and 740, m (mean) between 750 and 760; $m-d$ between 660 and 670; $m+d$ between 840 and 850; $m+2d\approx 930$; $m+3d$ between 1,010 and 1,020; "most of the data are within 3 standard deviations of the mean, that is, between the numbers $m-3d$ and $m+3d$." ($m-3d$ is off the graph.) Notation: **M** median, **m** mean, **d** standard deviation.
- Ex. 4.5.2 (pp. 168–170): $P(X=3)=\frac6{25}=0.24$; "It is common to use the shorter notation $P(3)$ instead of $P(X=3)$." Area of the $X=3$ bar as a proportion of total bar area equals this probability.
  $P(X>3)=P(4)+P(5)=\frac3{25}+\frac1{25}=0.12+0.04=0.16$ (mutually exclusive values).
  Mean $=\dfrac{0(3)+1(5)+2(7)+3(6)+4(3)+5(1)}{25}=\dfrac{54}{25}=2.16$; $P(X<2.16)=P(0)+P(1)+P(2)=\frac{15}{25}=0.6$.
- **Statement** (p. 171): "For a random variable that represents a randomly chosen value from a distribution of data, the probability distribution of the random variable is the same as the relative frequency distribution of the data."
- Descriptive statistics (mean, median, SD) apply to probability distributions: the X distribution has mean 2.16, median 2, SD about 1.3 (p. 171).
- **Expected value** (pp. 171–172):
  $$\text{mean of } X \;(\text{expected value of } X) = 0P(0)+1P(1)+2P(2)+3P(3)+4P(4)+5P(5)$$
  "the mean of the random variable X is the sum of the products $X\,P(X)$ for all values of X, that is, the sum of each value of X multiplied by its corresponding probability $P(X)$." In sigma form **(note, not ETS)**: $\sum x\,P(x)$.
- Ex. 4.5.3 (pp. 172–174): weighted die Y; mean $=P(1)+2P(2)+3P(3)+4P(4)+5P(5)+6P(6)=\frac17+\frac27+\frac37+\frac47+\frac57+\frac{12}7=\frac{27}7\approx 3.86$.
- Probabilities in each distribution sum to 1; sum of the areas of the bars in a probability histogram is 1 (p. 174).
- **Fundamental Link** (p. 174): "In a histogram representing the probability distribution of a random variable, the area of each bar is proportional to the probability represented by the bar."
- **Approximately normal data — four properties, exact wording** (p. 175):
  - Property 1: The mean, median, and mode are all nearly equal.
  - Property 2: The data are grouped fairly symmetrically about the mean.
  - Property 3: About two-thirds of the data are within 1 standard deviation of the mean.
  - Property 4: Almost all of the data are within 2 standard deviations of the mean.
- Normal distribution (p. 176): properties above hold "except that the mean, median, and mode are exactly the same and the distribution is perfectly symmetric about the mean." "The less the standard deviation, the less spread out the curve is; that is to say, at the mean the curve is higher and as you move away from the mean in either direction it drops down toward the horizontal axis faster."
- Same spread, different centers ($-10$ and $5$): same shape, one shifts horizontally onto the other (p. 177). Same center (0), different spreads: high/narrow has smaller SD than low/wide (p. 177).
- Continuous case (p. 178): area under the curve is 1; probabilities = areas of vertical slices; events are intervals such as $1<X<3$ and $X>10$; "the probability of an event such as $X=3$ would correspond to the area of a line segment, which is 0."
- Ex. 4.5.4 (pp. 178–179): W normal, mean 5, SD 2. 3 and 7 are 1 SD away; 1 and 9 are 2 SD; $-1$ and 11 are 3 SD. $P(W>5)=\frac12$ (symmetry); $P(3<W<7)\approx\frac23$; best estimate of $P(W<-1)$ among 0.5, 0.1, 0.05, 0.01 is 0.01 ("much less than 5 percent").
- Standardizing a normal distribution (p. 180): "subtract m from any observed value of the normal distribution and then divide the result by d." I.e. $\dfrac{x-m}{d}$.
- More precise values: $P(3<W<7)=0.683$, $P(W<-1)=0.0013$; "Such calculations are beyond the scope of this review." (p. 180)
- Approximate normal-region percents used in an exercise figure (Data Analysis Figure 21, p. 190): between $m$ and $m\pm d$: 34% each; between $m\pm d$ and $m\pm 2d$: 14% each; beyond $m\pm 2d$: 2% each. Conventions Figure 7 (Conv. p. 16) gives the same as probabilities for the standard normal: 0.02, 0.14, 0.34, 0.34, 0.14, 0.02 over intervals split at $-2, -1, 0, 1, 2$.

### Data displays
- **Figure 11 (p. 166):** relative-frequency histogram with 50 thin bars, x-axis 600–1,100, no y-scale, right-skewed shape; arrows below the axis marking $m-d$, M, m, $m+d$, $m+2d$, $m+3d$.
- **Figure 12 (p. 173):** probability table (Y, P(Y) as fractions) plus probability histogram with y-axis in sevenths ($0, \frac17, \frac27, \frac37$), x-axis "Value of Y."
- **Figure 13 (p. 175):** "Approximately Normal Relative Frequency Distribution" — bell-shaped histogram with dashed line at m and heavier lines at $m\pm d$, $m\pm 2d$, $m\pm 3d$.
- **Figure 14 (p. 176):** shaded normal curve with vertical lines at $m-3d,\ldots,m+3d$.
- **Figures 15–16 (pp. 177–178):** two normal curves on a $-30$ to $30$ axis (same spread/different centers; same center/different spreads).
- **Figure 17 (p. 179):** normal curve, mean 5, SD 2, axis $-2$ to 12, vertical lines at 1, 3, 5, 7, 9.

### Exercise styles
- See Exercises 4 and 16 below (mean/median of a discrete distribution from a relative-frequency table; counts and probabilities from a normal distribution using the 34/14/2 figure).

### Gotchas ETS emphasizes
- Mean and median can differ in a skewed distribution (Figure 11: M between 730–740, mean between 750–760) (p. 166).
- Probability of a single value for a continuous random variable is 0 (p. 178).
- Smaller SD → taller, narrower normal curve (pp. 176–177).
- Normal "about two-thirds within 1 SD", "almost all within 2 SD" (p. 175) vs. general "most of the data within 3 SD" for any data (p. 148).

---

## 4.6 Data Interpretation Examples (Math Review pp. 180–184) + Data Analysis Exercises (pp. 185–193) and Answers (pp. 194–197)

### Definitions
- No new definitions; applies 4.1–4.5.

### Facts / methods shown
- **Ex. 4.6.1 (pp. 180–182)**, table "Distribution of Customer Complaints Received by Airline P, 2003 and 2004" (percents by category, Total 100.0%, plus row "Total number of complaints" 22,998 and 13,278):
  - A count = percent × total: $(0.01)(22{,}998)\approx 230$.
  - Percent decrease $=\left(\frac{9{,}720}{22{,}998}\right)\times 100\%\approx 42\%$.
  - Key gotcha: same percent in both years does **not** mean the same number when totals differ; a percent rising by more than 2 percentage points does not mean the number rose — "the bases of the percents are different" (20% of 22,998 > 22.1% of 13,278).
- **Ex. 4.6.2 (pp. 182–183)**, circle graph (Fig. 18): ratio of two categories equals ratio of their percents "because the percents have the same base" (47 to 12 ≈ 4 to 1). Value $=0.25\times\$3{,}980$ million $=\$995$ million; percent-increase reversal: $1.3x=995$, $x\approx 765$.
- **Ex. 4.6.3 (pp. 183–184)**, Venn diagram (Fig. 19) of 250 travelers, Africa 93, Asia 155, both 70 (shaded):
  - "Africa but not Asia": $93-70=23$.
  - "at least one": $93+155-70=178$ (correct the double counting).
  - "neither": $250=N+178$, $N=72$.
  - Numbers above circles = circle totals; number in the overlap = the intersection.

### Data displays
- Table with percents and a "Total number" row (p. 180); circle graph with dollar total (p. 182); Venn diagram in a rectangle titled with the total surveyed, set totals printed above circles, shaded intersection with its count (p. 183).
- Exercise displays: boxplot over a finely ticked axis 100–150 (Fig. 20, p. 186); relative-frequency table for a random variable (p. 186); two-way table, rows "Live on campus / Live off campus" × columns Freshmen–Seniors, no totals shown (p. 188); normal curve with 2/14/34/34/14/2 percent regions (Fig. 21, p. 190); three-series line graph, "(in billions of dollars)", 1995–2001 (Fig. 22, p. 191); paired circle graphs 2001 vs 2025 (projected) with different totals (150 million vs 175 million) (Fig. 23, p. 192); grouped bar graph of percents of gross income for 2003 vs 2004 with footnoted incomes (\$50,000; \$45,000) (Fig. 24, p. 193).

### Exercise styles (one line each; not copied)
- Ex. 1 (p. 185): mean/median/mode/range of a list, then after adding a constant.
- Ex. 2 (p. 185): mean/median/mode/range/IQR of an odd-length list with given SD; effect of multiplying by a constant and of subtracting a constant on all statistics including SD.
- Ex. 3 (p. 185): combined mean of two groups (weighted); recognize combined median is not determinable.
- Ex. 4 (p. 186): mean and median of a discrete random variable from a relative-frequency table.
- Ex. 5 (p. 186): read range, quartiles, IQR from a boxplot; use a given percentile to estimate a count between $Q_3$ and that percentile.
- Ex. 6–7 (pp. 186–187): orderings of distinct letters; arrangements with one person fixed in a seat.
- Ex. 8 (p. 187): count 3-digit integers with parity and excluded-digit conditions (multiplication principle).
- Ex. 9–10 (p. 187): combinations (choose a subset) vs permutations (ordered prizes) for the same group.
- Ex. 11 (p. 187): probability for a random 2-digit integer having digit conditions (inclusion-exclusion, complement).
- Ex. 12 (p. 188): complement and two draws without replacement.
- Ex. 13 (p. 188): probabilities from a two-way table, including restricted ("given") subgroups.
- Ex. 14 (p. 189): solve for unknown probabilities using mutually exclusive and independent rules.
- Ex. 15 (p. 189): two independent events: both, at least one, neither.
- Ex. 16 (p. 190): normal distribution counts/probabilities via mean ± SD regions; answer to nearest 0.05.
- Ex. 17 (p. 191): line graph — greatest year-over-year increase; part as percent of total.
- Ex. 18 (p. 192): two circle graphs with different totals — counts above a threshold; ratio across years; which categories increase in number (not percent).
- Ex. 19 (p. 193): bar graph of percents with different income bases — dollar amount from percents; greatest percent increase between years.

### Gotchas ETS emphasizes
- Percents of different totals cannot be compared as counts (pp. 181–182; Ex. 18, Ex. 19).
- Ratio of two sectors in one circle graph = ratio of their percents (same base) (p. 183).
- Inclusion-exclusion in Venn problems; "neither" = total − union (p. 184).

---

## Relevant Math Conventions (GRE Math Conventions, © 2024 ETS; Conv. page = PDF page)

### Numbers and Quantities (Conv. p. 4) — as applied to data
- Numbers 1,000 or greater use commas to separate groups of three digits (item 2).
- "one billion means 1,000,000,000, or $10^9$ (not $10^{12}$, as in some countries)" (item 4).
- Rounding (item 5): a positive number halfway between two possibilities rounds to the greater (23.5 → 24; 123.985 to nearest 0.01 → 123.99); a negative halfway number rounds to the lesser ($-36.5 \to -37$).

### Mathematical Expressions, Symbols, and Variables (Conv. pp. 5–7)
- Letters label objects including "set S, list T, event E, random variable X" (item 1, p. 5).
- $n!$: "n factorial, which is the product of all positive integers less than or equal to n, where n is any positive integer and, as a special definition, $0! = 1$." (item 5, p. 7)
- $\approx$: "x is approximately equal to y" (item 5, p. 6).

### Coordinate Systems (Conv. pp. 11–12) — applies to scatterplots/line graphs/number lines
- "Coordinate systems, such as xy-planes and number lines, are drawn to scale. Therefore, you can read, estimate, or compare quantities in such figures by sight or by measurement" (item 1, p. 11).
- "Intermediate grid lines or tick marks in a coordinate system are evenly spaced unless otherwise noted." (item 7, p. 12)

### Sets, Lists, and Sequences (Conv. pp. 12–13)
1. Sets: finite or infinite; listed in curly brackets e.g. $\{2, 4, 6, 8\}$; "When the elements of a set are given, repetitions are *not* counted as additional elements and the order of the elements is *not* relevant." Elements = members; nonempty; empty set $\varnothing$; intersection $A\cap B$ = elements in both; union $A\cup B$ = elements "in A or B, or both"; subset; "By convention, the empty set is a subset of every set." No elements in common → "**disjoint** sets or **mutually exclusive** sets." (pp. 12–13)
2. Lists: "repetitions *are* counted as additional elements and the order of the elements *is* relevant." (list 3, 1, 2, 3, 3 has five numbers) (p. 13)
3. "The terms **data set** and **set of data** are not sets in the mathematical sense given above. Rather they refer to a list of data because there may be repetitions in the data, and if there are repetitions, they would be relevant." (p. 13)
4. Sequences: lists, finite or infinite; subscript notation $a_1, a_2, a_3, \ldots, a_n, \ldots$; ellipsis at end = infinite (p. 13).
5. "the integers from 0 to 9, inclusive" refers to 10 integers "with or without 'inclusive' at the end"; "during the years from 1985 to 2005" refers to 21 years. (p. 13)

### Data and Statistics (Conv. pp. 13–14)
1. "Numerical data are sometimes given in lists and sometimes displayed in other ways, such as in tables, bar graphs, or circle graphs. Various statistics, or measures of data, appear in questions: measures of central tendency—mean, median, and mode; measures of position—quartiles and percentiles; and measures of dispersion—standard deviation, range, and interquartile range." (p. 13)
2. "**average** (arithmetic mean)" of a list = "the sum of the data divided by the number of data. The term **average** does not refer to either **median** or **mode** in the test. Without the qualification of 'arithmetic mean,' **average** can refer to a rate or the ratio of one quantity to another, as in 'average number of miles per hour' or 'average weight per truckload.'" (p. 13)
3. "For a finite set or list of numbers, the **mean** of the numbers refers to the *arithmetic mean* unless otherwise noted." (p. 14)
4. Median: odd number of data → middle number in increasing order; even → "the arithmetic mean of the two middle numbers." (p. 14)
5. Mode: "the most frequently occurring number in the list. Thus, there may be more than one mode for a list of data." (p. 14)
6. Quartiles: three numbers dividing data in increasing order "into four groups that are roughly equal in size"; second quartile is the median. "the four groups themselves are sometimes referred to as quartiles—**first quartile**, **second quartile**, **third quartile**, and **fourth quartile**. The latter usage is clarified by the word 'in,' as in the phrase 'the cow's weight is *in* the third quartile of the weights of the herd.'" (p. 14)
7. Percentiles: "99 numbers that divide the data into 100 groups that are roughly equal in size. The 25th percentile equals the first quartile; the 50th percentile equals the second quartile, or median; and the 75th percentile equals the third quartile." (p. 14)
8. Standard deviation: "For a list of data, where the arithmetic mean is denoted by m, the **standard deviation** of the data refers to the nonnegative square root of the mean of the squared differences between m and each of the data. … The greater the standard deviation, the greater the spread of the data about the mean. This statistic is also known as the **population standard deviation** (not to be confused with the 'sample standard deviation,' a closely related statistic)." (p. 14)
9. "the **range** of the data is the greatest number in the list minus the least number. The **interquartile range** of the data is the third quartile minus the first quartile." (p. 14)

### Data Distributions and Probability Distributions (Conv. pp. 14–16)
1. **Frequency distributions**: "discrete data values are repeated with various frequencies or where preestablished intervals of possible values have frequencies corresponding to the numbers of values in the intervals" (example: 300 lightbulb lifetimes, rounded to nearest hour, in 10 intervals 501–550, …, 951–1,000; frequencies sum to 300). (p. 14)
2. **Relative frequency distributions**: "each frequency … is divided by the total number of data in the distribution." (p. 14)
3. "When a question refers to a random selection or a random sample, all possible samples of equal size have the same probability of being selected unless there is information to the contrary." (p. 15)
4. Probability experiments / random experiments with a finite number of outcomes; event = "any particular set of outcomes"; "every event E has a probability, denoted by $P(E)$, where $0 \le P(E) \le 1$." Equally likely: $P(E)=\dfrac{\text{the number of outcomes in the event }E}{\text{the number of possible outcomes in the experiment}}$. (p. 15)
5. "E and F" = intersection of events; "E or F" = union. (p. 15)
6. Mutually exclusive: $P(E \text{ and } F)=0$. (p. 15)
7. Independent: "the occurrence of either event does not affect the occurrence of the other … Events E and F are independent if and only if $P(E \text{ and } F)=P(E)P(F)$." (p. 15)
8. **Random variable**: "a variable that represents values resulting from a random experiment," either the actual numerical outcomes or "related to the outcomes more indirectly." (p. 15)
9. **Discrete random variable**: from an experiment with finitely many outcomes, finitely many values. **Continuous random variable**: values "form a continuous interval of real numbers, such as all of the numbers between 0 and 2." (p. 15)
10. Value $X=a$ has probability $P(X=a)$ or just $P(a)$. "A histogram (or a table) showing all of the values of X and their probabilities $P(X)$ is called the **probability distribution** of X. The **mean of the random variable** X is the sum of the products $X\,P(X)$ for all values of X." (p. 15)
11. Mean of X "is also called the **expected value** of X or the **mean of the probability distribution** of X." (p. 15)
12. Continuous X: interval $a\le X\le b$ has probability $P(a\le X\le b)$; distribution represented by a curve $y=f(x)$, $f$ nonnegative; $P(a\le X\le b)$ "is equal to the area of the region that is below the curve, above the x-axis, and between the vertical lines $x=a$ and $x=b$. The area of the entire region under the curve is 1." (pp. 15–16)
13. "The **mean of a continuous random variable** X is the point m on the x-axis at which the region under the distribution curve would perfectly balance if a fulcrum were placed at $x=m$. The **median** of X is the point M on the x-axis at which the line $x=M$ divides the region under the distribution curve into two regions of equal area." (p. 16)
14. **Standard deviation of a random variable**: measure of dispersion of the probability distribution about its mean; greater SD → greater spread; "also known as the **standard deviation of the probability distribution** of X." (p. 16)
15. **Normal distribution**: curve "shaped like a bell"; X "**normally distributed**"; "symmetric about the line $x=m$, where m is the mean as well as the median. The right and left tails of the distribution approach the x-axis but never touch it." (p. 16)
16. **Standard normal distribution**: mean 0, SD 1; Conventions Figure 7 shows approximate probabilities 0.02 (below $-2$), 0.14 ($-2$ to $-1$), 0.34 ($-1$ to 0), 0.34 (0 to 1), 0.14 (1 to 2), 0.02 (above 2). (p. 16)

### Graphical Representations of Data (Conv. pp. 16–17)
1. "Graphical data presentations, such as bar graphs, circle graphs, and line graphs, *are* drawn to scale; therefore, you can read, estimate, or compare data values by sight or by measurement." (p. 16)
2. "Scales, grid lines, dots, bars, shadings, solid and dashed lines, legends, etc., are used on graphs to indicate the data. Sometimes scales that do not begin at 0 are used, and sometimes broken scales are used." (p. 16)
3. "Standard conventions apply to graphs of data unless otherwise indicated. For example, a circle graph represents 100 percent of the data indicated in the graph's title, and the areas of the individual sectors are proportional to the percents they represent." (p. 16)
4. Venn diagrams: sets as circular regions and regions formed by intersections; sometimes inside a rectangle = universal set. "A number placed in a region is the number of elements in the subset represented by the smallest region containing the number, unless otherwise noted. Sometimes a number is placed above a circular region to indicate the number of elements in the set represented by the circular region." (p. 17)

### Miscellaneous Guidelines (Conv. pp. 17–18) — relevant to data questions
1. Numbers given are exact, even if real-life values would be rounded ("30 percent" is exactly 30). (p. 17)
2. An integer given as a number of objects is the total number of such objects; fractions/percents likewise ("one-fifth, or 20 percent, of the 50 marbles … are green" → 10 green, 40 not). (p. 17)
3. Multiple-choice "approximate" without stated degree → choose the answer closest to the computed value. (p. 17)
4. "difference between two quantities" means positive difference (greater minus lesser); e.g. "For which two consecutive years was the difference in annual rainfall least?" means least absolute value of the difference. (p. 17)
5. Profit = gross profit (sales revenue minus cost of production or acquisition). (p. 17)
6. Common meanings of months, years, etc. (p. 17)
7. Variables for numbers of existing objects or monetary amounts are greater than 0 unless noted. (pp. 17–18)
8. Unit conversions are given unless common (minutes/hours, dollars/cents, metric). (p. 18)
9. Some given information may be unnecessary. (p. 18)
10. Do not introduce unwarranted assumptions (no time zones/daylight savings; no sales tax unless mentioned). (p. 18)
11. "The display of data in a Data Interpretation set of questions is the same for each question in the set. Also, the display may contain more than one graph or table. Each question will refer to the data presentation, but it may happen that some part of the data will have no question that refers to it." (p. 18)
12. "In a Data Interpretation set of questions, each question should be considered separately from the others. No information except what is given in the display of data should be carried over from one question to another." (p. 18)
13. Interpret mathematical expressions separately from surrounding words (e.g. "the sum of the first two consecutive integers greater than $n+6$" means $(n+7)+(n+8)$). (p. 18)
