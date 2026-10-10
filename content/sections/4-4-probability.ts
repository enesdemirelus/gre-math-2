import type { Section } from "../types";

const section: Section = {
  id: "4-4-probability",
  number: "4.4",
  title: "Probability",
  part: "data-analysis",
  mrPages: "157–164",
  summary: String.raw`Outcomes, events and the ratio formula for equally likely outcomes; the rules for "or" (add, minus the overlap), "and" for independent events (multiply), and how a draw without replacement changes the second probability.`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Experiments, outcomes and events" },
    {
      kind: "p",
      text: String.raw`[[probability|Probability]] describes uncertainty with a number. Start with a [[probability-experiment|probability experiment]] (or random experiment): something whose result, called its [[outcome]], is uncertain. The possible outcomes are all known in advance; which one will happen is not. The set of all possible outcomes is the [[sample-space|sample space]], and any particular set of outcomes is an [[event]]. For one roll of a six-sided die the sample space is $\{1, 2, 3, 4, 5, 6\}$, and "the roll is even" is the event $\{2, 4, 6\}$ (MR p. 157).`,
    },
    {
      kind: "p",
      text: String.raw`The probability of an event $E$, written $P(E)$, is a number from 0 to 1 inclusive that says how likely $E$ is when the experiment is performed: the larger the number, the more likely the event. When a question says an item is chosen "at random" (random selection), it means every outcome is [[equally-likely|equally likely]], and then probability is a counting problem (MR pp. 158–159; MC p. 15):`,
    },
    { kind: "math", tex: String.raw`P(E) = \frac{\text{number of outcomes in the event } E}{\text{number of possible outcomes in the experiment}}`, key: true },
    {
      kind: "p",
      text: String.raw`A jar holds 12 marbles, 5 of them green. One marble drawn at random has $P(\text{green}) = \frac{5}{12}$. For a [[fair-die|fair]] six-sided die, $P(\text{prime}) = \frac{3}{6} = \frac{1}{2}$ because the primes 2, 3, 5 are three of six equally likely outcomes. The ratio formula is only valid when the outcomes are equally likely; if they are not (a weighted spinner, say), you must work from the probability of each outcome instead, as later in this section.`,
    },
    {
      kind: "p",
      text: String.raw`Section 4.3 is the engine here: the numerator and denominator are counts. If 2 people are chosen at random from a group of 6 women and 4 men, the probability both are women is $\dfrac{\binom{6}{2}}{\binom{10}{2}} = \dfrac{15}{45} = \dfrac{1}{3}$. The same answer comes from one draw at a time, $\frac{6}{10} \cdot \frac{5}{9} = \frac{1}{3}$, and it is worth knowing both routes so you can pick whichever is shorter.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Basic facts about probability" },
    {
      kind: "p",
      text: String.raw`Six facts cover everything about a single event (MR p. 159). An event that is certain has probability 1; one that is certain not to occur has probability 0; one that is possible but not certain has probability strictly between 0 and 1. The probability that $E$ does _not_ occur (the [[complement]] of $E$) is $1 - P(E)$. The probability of an event is the sum of the probabilities of the outcomes in it, and the probabilities of all the possible outcomes of an experiment add up to 1.`,
    },
    { kind: "math", tex: String.raw`0 \le P(E) \le 1, \qquad P(\text{not } E) = 1 - P(E)`, key: true },
    {
      kind: "aside",
      tone: "tip",
      title: "\"At least one\" usually means subtract from 1",
      text: String.raw`When the event is awkward ("at least one," "not all the same"), count or compute its complement and subtract from 1. If a spinner has $P(\text{red}) = 0.35$, then $P(\text{not red}) = 0.65$ with no further work. This is not a separate ETS rule; it is fact 4 applied to a cleverly chosen event.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Combining events: \"or\" and \"and\"" },
    {
      kind: "p",
      text: String.raw`ETS writes "$E$ and $F$" for the event that both occur (the outcomes in the intersection $E \cap F$) and "$E$ or $F$" for the event that at least one occurs (the union $E \cup F$, "or" including "both"). Because probabilities are sums over outcomes, the counting rule from 4.3 carries over directly (MR p. 160).`,
    },
    { kind: "math", tex: String.raw`P(E \text{ or } F) = P(E) + P(F) - P(E \text{ and } F)`, key: true },
    {
      kind: "p",
      text: String.raw`Take two rolls of a fair die, with the 36 ordered pairs as outcomes. Let $E$ be "the sum is 8" and $F$ be "doubles." There are 5 outcomes with sum 8 and 6 doubles, and $(4, 4)$ is in both. So $P(E \text{ or } F) = \frac{5}{36} + \frac{6}{36} - \frac{1}{36} = \frac{10}{36} = \frac{5}{18}$. The picture shows the same overlap: five shaded cells for $E$, six outlined cells for $F$, and exactly one cell with both marks.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-4-probability/dice-grid", props: { fill: "sum=8", outline: "doubles" }, caption: String.raw`Shaded: sum is 8 (5 cells). Outlined: doubles (6 cells). The cell $(4, 4)$ carries both marks, so it is counted once.` },
    },
    {
      kind: "p",
      text: String.raw`Events that cannot occur at the same time are [[mutually-exclusive|mutually exclusive]]: odd and even on one roll, for example. For them $P(E \text{ and } F) = 0$, and the rule simplifies to $P(E \text{ or } F) = P(E) + P(F)$. Careful: "rolling a 4" and "rolling an even number" are _not_ mutually exclusive, since a 4 is even.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Independent events" },
    {
      kind: "p",
      text: String.raw`Two events are [[independent-events|independent]] if the occurrence of either does not affect the occurrence of the other: tossing a coin and then rolling a die, or the weather on two unrelated days. For independent events, the probability that both occur is the product (MR p. 160). In fact, $E$ and $F$ are independent if and only if $P(E \text{ and } F) = P(E)\,P(F)$ (MC p. 15), which is also the test to apply when a problem asks whether two events are independent.`,
    },
    { kind: "math", tex: String.raw`P(E \text{ and } F) = P(E)\,P(F) \qquad (E, F \text{ independent})`, key: true },
    {
      kind: "p",
      text: String.raw`Suppose the chance of rain is $0.4$ on Monday and $0.25$ on Tuesday, and the two days are independent. Then $P(\text{both days}) = (0.4)(0.25) = 0.1$, and $P(\text{rain at least once}) = 0.4 + 0.25 - 0.1 = 0.55$. The complement route agrees and is quicker: no rain on either day has probability $(0.6)(0.75) = 0.45$, and $1 - 0.45 = 0.55$.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-4-probability/event-venn", props: { labels: ["Mon", "Tue"], counts: { a: "0.30", ab: "0.10", b: "0.15", none: "0.45" }, highlight: ["a", "b", "ab"] }, caption: String.raw`Probabilities of the four regions for the rain example. The four numbers add to 1; the shaded union has probability $0.30 + 0.10 + 0.15 = 0.55$.` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Mutually exclusive is not independent",
      text: String.raw`If $P(E) \ne 0$ and $P(F) \ne 0$, then $E$ and $F$ cannot be both mutually exclusive and independent (MR p. 160). Mutually exclusive events are strongly dependent: if one occurs, the other is impossible. The tell-tale signs: "or" with exclusive events means _add_; "and" with independent events means _multiply_. A frequent GRE trap is to apply the shortcut for one kind to the other.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Outcomes that are not equally likely" },
    {
      kind: "p",
      text: String.raw`If outcomes are not equally likely, the ratio formula fails, but fact 5 and fact 6 still work: add outcome probabilities, and make all of them add to 1. A spinner has four sectors that land with probabilities $p$, $p$, $2p$ and $4p$. Then $8p = 1$, so $p = \frac{1}{8}$, and the probabilities are $\frac18, \frac18, \frac14, \frac12$. The chance of one of the first two sectors is $\frac18 + \frac18 = \frac14$. Notice that the sector with probability $2p$ is not "2 out of 4": counting sectors would give the wrong answer.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "When the first event changes the second" },
    {
      kind: "p",
      text: String.raw`Two events that happen one after the other are not always independent; they can be [[dependent-events|dependent]]. Drawing items from a drawer one at a time without putting them back is the standard example: the first draw changes what is left. ETS phrases the rule this way: the probability that **both** events happen equals the probability that the first happens multiplied by the probability that, **given that the first event has already happened**, the second happens as well (MR p. 164). In more formal courses this second factor is called a [[conditional-probability|conditional probability]], though the Math Review itself does not use that name or any special notation.`,
    },
    { kind: "math", tex: String.raw`P(\text{first and second}) = P(\text{first}) \cdot P(\text{second, given the first has happened})`, key: true },
    {
      kind: "p",
      text: String.raw`A drawer holds 5 black socks and 3 white socks, and two are taken at random [[without-replacement|without replacement]]. The probability the first is black is $\frac58$. Given that, the drawer holds 4 black and 3 white, so the second is white with probability $\frac37$. Hence $P(\text{black, then white}) = \frac58 \cdot \frac37 = \frac{15}{56}$. The tree displays all four paths; each path's probability is the product of the numbers along it, and the four leaf probabilities add to 1.`,
    },
    {
      kind: "diagram",
      diagram: {
        key: "4-4-probability/prob-tree",
        props: {
          stages: [
            { label: "B", p: "5/8", children: [{ label: "B", p: "4/7", result: "5/14" }, { label: "W", p: "3/7", result: "15/56" }] },
            { label: "W", p: "3/8", children: [{ label: "B", p: "5/7", result: "15/56" }, { label: "W", p: "2/7", result: "3/28" }] },
          ],
          highlight: [[0, 1]],
        },
        caption: String.raw`First draw (left) and second draw (right). Highlighted: black, then white, $\frac58 \cdot \frac37 = \frac{15}{56}$. The probabilities on the second set of branches are recomputed from what remains.`,
      },
    },
    {
      kind: "p",
      text: String.raw`To get "one of each color," add the two paths that give it (they are mutually exclusive): $\frac{15}{56} + \frac{15}{56} = \frac{15}{28}$. Now compare with replacement: if each sock were returned before the next draw, the draws would be independent and the second-draw probabilities would stay $\frac58$ and $\frac38$. Use the simulator to see the difference between the two kinds of drawing, and how a simulated frequency settles toward the exact probability.`,
    },
    {
      kind: "interactive",
      key: "4-4-probability/prob-simulator",
      title: "Probability simulator",
      caption: String.raw`Choose dice or a bag of colored balls, pick an event, and compare the exact probability (favorable over possible) with the relative frequency from random trials. Toggle with/without replacement to see how the answer changes.`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "Reading the question",
      text: String.raw`"Two are drawn at random" with no mention of replacement means they are different items drawn together, which is the same as drawing one after another without replacement; the sequential product and the ratio of combinations $\binom{\cdot}{2}/\binom{\cdot}{2}$ give the same answer. "A coin is tossed three times" or "a die is rolled twice" means independent repeated trials; multiply.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Decide what kind of problem it is before computing. Single event with equally likely outcomes: favorable over possible, counting with 4.3 when the sets are large. "Not," "at least one": one minus the complement. "Or": add and subtract the overlap, or simply add if the events are mutually exclusive. "And": multiply if independent; if the first event changes the second, multiply by the probability of the second _given_ the first. Finally, compare your answer with the sanity range 0 to 1, and with your intuition: an "or" probability can never be smaller than either piece, and an "and" probability can never be larger.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Using favorable-over-possible when outcomes are not equally likely; forgetting to subtract the overlap in an "or" for events that are not mutually exclusive; multiplying probabilities of dependent events without updating the second; treating "mutually exclusive" as if it meant "independent"; and counting outcomes of two rolls as unordered (the 36 ordered pairs, not 21 unordered ones, are equally likely).`,
    },
  ],

  terms: [
    { id: "probability", term: "probability", turkish: "olasılık", definition: String.raw`A way of describing uncertainty in numerical terms. The probability of an event is a number from 0 to 1, inclusive, that indicates how likely the event is when the experiment is performed; the greater the number, the more likely the event.`, formula: String.raw`0 \le P(E) \le 1`, source: "MR pp. 157–158" },
    { id: "probability-experiment", term: "probability experiment (random experiment)", turkish: "olasılık deneyi (rastgele deney)", definition: String.raw`An experiment whose result, or outcome, is uncertain. All the possible outcomes are known beforehand, but which one occurs is not.`, source: "MR p. 157" },
    { id: "outcome", term: "outcome", turkish: "sonuç (çıktı)", definition: String.raw`The result of a probability experiment, such as 4 on one roll of a die.`, source: "MR p. 157" },
    { id: "sample-space", term: "sample space", turkish: "örnek uzay", definition: String.raw`The set of all possible outcomes of a random experiment. For one roll of a six-sided die it is $\{1, 2, 3, 4, 5, 6\}$.`, source: "MR p. 157" },
    { id: "event", term: "event", turkish: "olay", definition: String.raw`Any particular set of outcomes of an experiment. Its probability is written $P(E)$.`, formula: String.raw`P(E)`, source: "MR p. 157; MC p. 15" },
    { id: "equally-likely", term: "equally likely (random selection)", turkish: "eş olasılıklı (rastgele seçim)", definition: String.raw`Random selection means each item is equally likely to be selected. When all outcomes are equally likely, the probability of an event is the number of outcomes in the event divided by the number of possible outcomes.`, formula: String.raw`P(E) = \frac{\text{outcomes in } E}{\text{possible outcomes}}`, source: "MR pp. 158–159; MC p. 15" },
    { id: "fair-die", term: "fair die", turkish: "hilesiz (adil) zar", definition: String.raw`A die whose 6 outcomes are equally likely, so each has probability $\frac{1}{6}$.`, source: "MR p. 159" },
    { id: "complement", term: "complement of an event", turkish: "tümleyen olay", definition: String.raw`The event that $E$ does not occur. Its probability is $1 - P(E)$.`, formula: String.raw`P(\text{not } E) = 1 - P(E)`, note: "Not named in the ETS Math Review (the fact itself is stated on p. 159)", source: "MR p. 159" },
    { id: "mutually-exclusive", term: "mutually exclusive events", turkish: "ayrık (bağdaşmaz) olaylar", definition: String.raw`Events that cannot occur at the same time, so $P(E \text{ and } F) = 0$. For them, $P(E \text{ or } F) = P(E) + P(F)$.`, formula: String.raw`P(E \text{ or } F) = P(E) + P(F)`, diagram: { key: "4-4-probability/event-venn", props: { layout: "disjoint" } }, source: "MR p. 160; MC p. 15" },
    { id: "independent-events", term: "independent events", turkish: "bağımsız olaylar", definition: String.raw`Events $E$ and $F$ such that the occurrence of either does not affect the occurrence of the other. They are independent if and only if $P(E \text{ and } F) = P(E)\,P(F)$.`, formula: String.raw`P(E \text{ and } F) = P(E)\,P(F)`, source: "MR p. 160; MC p. 15" },
    { id: "dependent-events", term: "dependent events", turkish: "bağımlı olaylar", definition: String.raw`Events that happen sequentially where the first may affect the second. The probability that both happen is the probability of the first times the probability of the second given that the first has already happened.`, note: "ETS describes this idea (MR p. 164) without using the word \"dependent\" as a defined term", source: "MR p. 164" },
    { id: "conditional-probability", term: "conditional probability", turkish: "koşullu olasılık", definition: String.raw`The probability that an event happens given that another event has already happened, such as the chance the second sock is white given that the first was black. Then $P(\text{both}) = P(\text{first}) \cdot P(\text{second, given the first})$.`, formula: String.raw`P(\text{both}) = P(\text{first}) \cdot P(\text{second, given first})`, note: "Not named in the ETS Math Review, which says \"given that the first event has already happened\"; the ETS Quantitative Reasoning overview lists conditional probability among the tested topics", source: "MR p. 164" },
    { id: "without-replacement", term: "without replacement", turkish: "yerine koymadan (iadesiz)", definition: String.raw`Drawing items one after another without putting earlier ones back, so each draw changes what remains. The draws are then not independent. (Putting each item back before the next draw is "with replacement," which keeps the draws independent.)`, note: "\"With replacement\" is not used in the ETS Math Review", source: "MR p. 164" },
  ],

  examples: [
    {
      id: "e1",
      type: "mc1",
      difficulty: "medium",
      stem: String.raw`A jar contains 6 green, 4 yellow and 2 white marbles. Two marbles are drawn at random without replacement. What is the probability that both marbles are the same color?`,
      choices: [String.raw`$\dfrac{1}{6}$`, String.raw`$\dfrac{2}{9}$`, String.raw`$\dfrac{1}{3}$`, String.raw`$\dfrac{4}{9}$`, String.raw`$\dfrac{1}{2}$`],
      answer: 2,
      explanation: [
        String.raw`"Same color" is three mutually exclusive cases (both green, both yellow, both white), so add their probabilities.`,
        String.raw`Both green: $\frac{6}{12} \cdot \frac{5}{11} = \frac{30}{132}$. Both yellow: $\frac{4}{12} \cdot \frac{3}{11} = \frac{12}{132}$. Both white: $\frac{2}{12} \cdot \frac{1}{11} = \frac{2}{132}$.`,
        String.raw`Total: $\frac{44}{132} = \frac{1}{3}$.`,
        String.raw`Check by combinations: $\dfrac{\binom{6}{2} + \binom{4}{2} + \binom{2}{2}}{\binom{12}{2}} = \dfrac{15 + 6 + 1}{66} = \dfrac{1}{3}$. Trap: using $\frac{6}{12} \cdot \frac{6}{12}$ (with replacement) gives different values.`,
      ],
    },
    {
      id: "e2",
      type: "qc",
      difficulty: "medium",
      given: String.raw`$E$ and $F$ are independent events, with $P(E) = 0.3$ and $P(F) = 0.5$.`,
      quantityA: String.raw`$P(E \text{ or } F)$`,
      quantityB: String.raw`$0.8$`,
      answer: "B",
      explanation: [
        String.raw`Independent events with positive probabilities are not mutually exclusive, so the overlap must be subtracted.`,
        String.raw`$P(E \text{ and } F) = (0.3)(0.5) = 0.15$, so $P(E \text{ or } F) = 0.3 + 0.5 - 0.15 = 0.65$.`,
        String.raw`Quantity A is $0.65 < 0.8$ = Quantity B. Trap: $0.8 = P(E) + P(F)$ is the answer you would get by wrongly treating the events as mutually exclusive.`,
      ],
    },
    {
      id: "e3",
      type: "ne",
      difficulty: "hard",
      stem: String.raw`A fair six-sided die is rolled twice. What is the probability that the first roll is even or the sum of the two rolls is 7? Enter your answer as a fraction.`,
      answer: { kind: "fraction", numerator: 7, denominator: 12 },
      explanation: [
        String.raw`There are 36 equally likely ordered pairs. First roll even: $3 \cdot 6 = 18$ pairs. Sum is 7: 6 pairs.`,
        String.raw`Both: first roll even and sum 7 gives $(2, 5), (4, 3), (6, 1)$, which is 3 pairs.`,
        String.raw`$P = \frac{18 + 6 - 3}{36} = \frac{21}{36} = \frac{7}{12}$. Trap: adding $\frac12 + \frac16$ without removing the 3 overlapping pairs gives $\frac23$.`,
      ],
    },
    {
      id: "e4",
      type: "mcm",
      difficulty: "hard",
      stem: String.raw`A fair six-sided die is rolled once. Let $E$ be "the number is even," $F$ be "the number is at most 4," and $G$ be "the number is at least 5." Which of the following statements are true? Indicate all such statements.`,
      choices: [
        String.raw`$E$ and $F$ are independent.`,
        String.raw`$E$ and $G$ are independent.`,
        String.raw`$F$ and $G$ are mutually exclusive.`,
        String.raw`$F$ and $G$ are independent.`,
        String.raw`$E$ and $F$ are mutually exclusive.`,
      ],
      answer: [0, 1, 2],
      explanation: [
        String.raw`$E = \{2, 4, 6\}$, $F = \{1, 2, 3, 4\}$, $G = \{5, 6\}$. Test independence with $P(\text{both}) = P(E)P(F)$.`,
        String.raw`$E$ and $F$: both $= \{2, 4\}$, $\frac{2}{6} = \frac13$, and $\frac12 \cdot \frac23 = \frac13$. Independent, so the first statement is true.`,
        String.raw`$E$ and $G$: both $= \{6\}$, $\frac16$, and $\frac12 \cdot \frac13 = \frac16$. Independent, so true.`,
        String.raw`$F$ and $G$ share no outcome, so they are mutually exclusive (true). Their probabilities are positive, so they cannot also be independent: $0 \ne \frac23 \cdot \frac13 = \frac29$ (false).`,
        String.raw`$E$ and $F$ share 2 and 4, so they are not mutually exclusive (false).`,
      ],
    },
  ],

  quick: [
    { id: "k1", prompt: String.raw`If $P(E) = 0.35$, what is the probability that $E$ does not occur?`, answer: String.raw`$0.65$`, explanation: String.raw`$1 - 0.35 = 0.65$.` },
    { id: "k2", prompt: String.raw`A bag has 3 red and 5 blue balls. One is drawn at random. What is $P(\text{red})$?`, answer: String.raw`$\frac38$`, explanation: String.raw`3 favorable out of 8 equally likely.` },
    { id: "k3", prompt: String.raw`Can two events with positive probabilities be both mutually exclusive and independent?`, answer: String.raw`No`, explanation: String.raw`Mutually exclusive means $P(E \text{ and } F) = 0$, but independence needs it to equal $P(E)P(F) > 0$.` },
    { id: "k4", prompt: String.raw`$E$ and $F$ are independent with $P(E) = 0.2$ and $P(F) = 0.5$. Find $P(E \text{ and } F)$.`, answer: String.raw`$0.1$`, explanation: String.raw`Multiply: $0.2 \times 0.5$.` },
    { id: "k5", prompt: String.raw`A box holds 4 black and 6 white tiles. Two are drawn without replacement. What is the probability both are white?`, answer: String.raw`$\frac13$`, explanation: String.raw`$\frac{6}{10} \cdot \frac{5}{9} = \frac{30}{90} = \frac13$.` },
    { id: "k6", prompt: String.raw`$P(E) = 0.5$, $P(F) = 0.4$, and $E$, $F$ are mutually exclusive. Find $P(E \text{ or } F)$.`, answer: String.raw`$0.9$`, explanation: String.raw`Add: no overlap to subtract.` },
  ],

  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`A fair coin is tossed 5 times.`,
        quantityA: String.raw`The probability of exactly 2 heads`,
        quantityB: String.raw`The probability of at least 4 heads`,
        answer: "A",
        explanation: [
          String.raw`There are $2^5 = 32$ equally likely sequences of heads and tails.`,
          String.raw`Exactly 2 heads: choose which 2 of the 5 tosses are heads, $\binom{5}{2} = 10$ sequences, so $\frac{10}{32}$.`,
          String.raw`At least 4 heads: exactly 4 ($\binom{5}{4} = 5$) or exactly 5 (1), so $\frac{6}{32}$. Since $\frac{10}{32} > \frac{6}{32}$, Quantity A is greater.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "hard",
        given: String.raw`$P(E) = 0.5$, $P(F) = 0.4$, and $P(E \text{ or } F) = 0.7$.`,
        quantityA: String.raw`$P(E \text{ and } F)$`,
        quantityB: String.raw`$P(E)\,P(F)$`,
        answer: "C",
        explanation: [
          String.raw`From the "or" rule: $0.7 = 0.5 + 0.4 - P(E \text{ and } F)$, so $P(E \text{ and } F) = 0.2$.`,
          String.raw`$P(E)P(F) = (0.5)(0.4) = 0.2$. The quantities are equal (so the events happen to be independent).`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$P(E) = 0.5$ and $P(F) = 0.5$.`,
        quantityA: String.raw`$P(E \text{ or } F)$`,
        quantityB: String.raw`$0.75$`,
        answer: "D",
        explanation: [
          String.raw`$P(E \text{ or } F) = 1 - P(E \text{ and } F)$ here, and $P(E \text{ and } F)$ can be anywhere from 0 to 0.5 depending on the overlap.`,
          String.raw`If the events are independent, $P(E \text{ and } F) = 0.25$ and $P(E \text{ or } F) = 0.75$ (equal). If they are mutually exclusive, it is 1 (greater). If $E = F$, it is 0.5 (less). The relationship cannot be determined.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`A box holds 5 red and 4 blue balls. Three balls are drawn at random without replacement. What is the probability that all three have the same color?`,
        choices: [String.raw`$\dfrac{1}{12}$`, String.raw`$\dfrac{1}{9}$`, String.raw`$\dfrac{1}{6}$`, String.raw`$\dfrac{2}{9}$`, String.raw`$\dfrac{1}{3}$`],
        answer: 2,
        explanation: [
          String.raw`All red: $\frac59 \cdot \frac48 \cdot \frac37 = \frac{60}{504} = \frac{5}{42}$. All blue: $\frac49 \cdot \frac38 \cdot \frac27 = \frac{24}{504} = \frac{1}{21}$.`,
          String.raw`Add the two exclusive cases: $\frac{5}{42} + \frac{2}{42} = \frac{7}{42} = \frac16$.`,
          String.raw`Check by combinations: $\dfrac{\binom{5}{3} + \binom{4}{3}}{\binom{9}{3}} = \dfrac{10 + 4}{84} = \dfrac{1}{6}$.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A die is weighted so that the probability of rolling the number $k$ is proportional to $k$, for $k = 1, 2, \dots, 6$. If the die is rolled twice, and the rolls are independent, what is the probability that both rolls are even?`,
        choices: [String.raw`$\dfrac{1}{4}$`, String.raw`$\dfrac{2}{7}$`, String.raw`$\dfrac{16}{49}$`, String.raw`$\dfrac{1}{2}$`, String.raw`$\dfrac{4}{7}$`],
        answer: 2,
        explanation: [
          String.raw`The probabilities are proportional to $k$ means $P(k) = \frac{k}{c}$ for a constant $c$; the six probabilities add to 1, and $1 + 2 + \dots + 6 = 21$, so $c = 21$ and $P(k) = \frac{k}{21}$. These are not equally likely, so the ratio formula would be wrong.`,
          String.raw`$P(\text{even}) = \frac{2 + 4 + 6}{21} = \frac{12}{21} = \frac47$.`,
          String.raw`Independent rolls: $\left(\frac47\right)^2 = \frac{16}{49}$. Trap: $\frac47$ is the probability for a single roll, and $\frac14$ is the answer for a fair die.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`Box $X$ contains 3 red and 2 blue balls. Box $Y$ contains 1 red and 4 blue balls. One of the two boxes is chosen at random, each box being equally likely, and then one ball is drawn at random from the chosen box. What is the probability that the ball is red?`,
        choices: [String.raw`$\dfrac{1}{5}$`, String.raw`$\dfrac{3}{10}$`, String.raw`$\dfrac{2}{5}$`, String.raw`$\dfrac{1}{2}$`, String.raw`$\dfrac{3}{5}$`],
        answer: 2,
        explanation: [
          String.raw`A red ball can come by two mutually exclusive paths. Path 1: box $X$ is chosen and a red ball is drawn: $\frac12 \cdot \frac35 = \frac{3}{10}$ (first event, then the second given the first).`,
          String.raw`Path 2: box $Y$ then red: $\frac12 \cdot \frac15 = \frac{1}{10}$.`,
          String.raw`Add the paths: $\frac{3}{10} + \frac{1}{10} = \frac{4}{10} = \frac25$. Trap: pooling all the balls (4 red out of 10) happens to give the same value here only because the boxes have equal sizes; do not rely on it.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`A fair six-sided die is rolled twice. Which of the following events have probability $\frac12$? Indicate all such events.`,
        choices: [
          String.raw`The sum of the two rolls is even.`,
          String.raw`The first roll is greater than the second roll.`,
          String.raw`The first roll is even.`,
          String.raw`The two rolls differ in parity (one even, one odd).`,
          String.raw`At least one of the rolls is even.`,
          String.raw`The sum of the two rolls is greater than 7.`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`Count among the 36 ordered pairs. Sum even: both even or both odd, $9 + 9 = 18$, so $\frac12$.`,
          String.raw`First greater than second: $\frac{36 - 6}{2} = 15$, so $\frac{15}{36} \ne \frac12$ (ties are removed).`,
          String.raw`First even: 18, so $\frac12$. Parities differ: $2 \cdot 3 \cdot 3 = 18$, so $\frac12$.`,
          String.raw`At least one even: $1 - \frac14 = \frac34$. Sum greater than 7 (8 to 12): $5 + 4 + 3 + 2 + 1 = 15$, so $\frac{15}{36}$.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`For events $E$ and $F$, $P(E) = 0.4$, $P(F) = 0.5$ and $P(E \text{ or } F) = 0.9$. Which of the following statements must be true? Indicate all such statements.`,
        choices: [
          String.raw`$E$ and $F$ are mutually exclusive.`,
          String.raw`$E$ and $F$ are independent.`,
          String.raw`The probability that neither $E$ nor $F$ occurs is $0.1$.`,
          String.raw`The probability that $E$ occurs or $F$ does not occur is $0.5$.`,
          String.raw`The probability that $F$ occurs and $E$ does not occur is $0.1$.`,
        ],
        answer: [0, 2, 3],
        explanation: [
          String.raw`$0.9 = 0.4 + 0.5 - P(E \text{ and } F)$ gives $P(E \text{ and } F) = 0$: mutually exclusive, so the first statement is true.`,
          String.raw`Independence would need $P(E \text{ and } F) = 0.2$, so the second statement is false. (Both probabilities are positive, so exclusive events cannot be independent.)`,
          String.raw`Neither occurs: $1 - 0.9 = 0.1$, true.`,
          String.raw`Since $E$ and $F$ cannot occur together, whenever $E$ occurs $F$ does not. So "$E$ or not $F$" is just "not $F$": $1 - 0.5 = 0.5$, true.`,
          String.raw`$F$ and not $E$ is the same as $F$ (because $F$ forces not $E$): probability $0.5$, not $0.1$, so false.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`A bag holds 4 red, 3 blue and 2 green balls. Two balls are drawn at random without replacement. What is the probability that the two balls are different colors? Enter your answer as a fraction.`,
        answer: { kind: "fraction", numerator: 13, denominator: 18 },
        explanation: [
          String.raw`Use the complement: the balls are the same color if both red, both blue or both green.`,
          String.raw`$\dfrac{\binom{4}{2} + \binom{3}{2} + \binom{2}{2}}{\binom{9}{2}} = \dfrac{6 + 3 + 1}{36} = \dfrac{10}{36} = \dfrac{5}{18}$.`,
          String.raw`Different colors: $1 - \frac{5}{18} = \frac{13}{18}$. (Counting the three pair-of-colors cases directly gives $\frac{12 + 8 + 6}{36} = \frac{26}{36}$, the same.)`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`Events $B$ and $C$ are independent. $P(B) = 0.4$ and $P(B \text{ or } C) = 0.76$. What is $P(C)$? Enter your answer as a decimal.`,
        answer: { kind: "decimal", value: "0.6" },
        explanation: [
          String.raw`Independent: $P(B \text{ and } C) = 0.4\,x$ where $x = P(C)$.`,
          String.raw`$0.76 = 0.4 + x - 0.4x = 0.4 + 0.6x$, so $0.6x = 0.36$ and $x = 0.6$.`,
          String.raw`Shortcut: $P(\text{neither}) = 1 - 0.76 = 0.24 = (0.6)(1 - x)$, so $1 - x = 0.4$ and $x = 0.6$.`,
        ],
      },
    ],
  },
};

export default section;
