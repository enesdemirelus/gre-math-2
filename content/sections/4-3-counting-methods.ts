import type { Section } from "../types";

const section: Section = {
  id: "4-3-counting-methods",
  number: "4.3",
  title: "Counting Methods",
  part: "data-analysis",
  mrPages: "149–157",
  summary: String.raw`Sets and Venn diagrams, the inclusion-exclusion count for a union, and the three counting engines the GRE uses: the multiplication principle, permutations (order matters) and combinations (order does not).`,

  lesson: [
    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Sets, lists and counting their members" },
    {
      kind: "p",
      text: String.raw`A [[set]] is a collection of objects that share some property; the objects are its [[element|elements]] (or members). A set is [[finite-set|finite]] if its members can be completely counted, so it can be written out in curly brackets, like $\{0, 2, 4, 6, 8\}$; otherwise it is an infinite set, like the set of all integers. The set with no members at all is the [[empty-set|empty set]], written $\varnothing$. If every member of $A$ is also a member of $B$, then $A$ is a [[subset]] of $B$, and by convention $\varnothing$ is a subset of every set (MR p. 149).`,
    },
    {
      kind: "p",
      text: String.raw`The number of elements of a finite set $S$ is written $|S|$, so $|\{3, 8, 11\}| = 3$ and $|\varnothing| = 0$. Be careful about what "set" promises: when the elements of a set are given, **order is irrelevant and repetitions do not count as extra elements**. So $\{4, 9, 4\}$ and $\{9, 4\}$ are the same set, with $|S| = 2$. A [[list]] is the opposite: its members are ordered and repetitions are counted, so the lists $4, 9, 4$ and $9, 4, 4$ are different, and each has three entries (MR p. 149; MC p. 13).`,
    },
    {
      kind: "aside",
      tone: "gre",
      title: "\"Data set\" is really a list",
      text: String.raw`The Math Conventions point out that "data set" and "set of data" are not sets in the mathematical sense: they mean a list of data, because repeated values are kept and matter (MC p. 13). A "set of exam scores" containing 70 twice has two 70s. And "the integers from 4 to 9, inclusive" is a collection of six integers.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Union, intersection and Venn diagrams" },
    {
      kind: "p",
      text: String.raw`Two sets combine in two ways. The [[intersection]] $S \cap T$ is the set of elements in **both** $S$ and $T$. The [[union]] $S \cup T$ is the set of elements in $S$ or $T$ **or both**. If $S$ and $T$ have no elements in common they are [[disjoint]] (also called mutually exclusive), which is the same as $S \cap T = \varnothing$ (MR p. 150).`,
    },
    {
      kind: "p",
      text: String.raw`A [[venn-diagram|Venn diagram]] draws sets as circular regions that overlap when the sets share elements and stay apart when they are disjoint. Often the circles sit inside a rectangle that stands for a [[universal-set|universal set]], of which all the sets involved are subsets; the part of the rectangle outside every circle then represents the elements that belong to none of the sets (MR p. 150).`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-3-counting-methods/venn2", props: { highlight: ["a", "b", "ab"], counts: { a: "only A", ab: "both", b: "only B", none: "neither" } }, caption: String.raw`The shaded region is $A \cup B$. The overlap is $A \cap B$, and the unshaded rest of the rectangle is "neither."` },
    },
    {
      kind: "p",
      text: String.raw`Suppose a survey of 60 people finds that 35 own a bicycle, 28 own a car, and 12 own both. If you simply add $35 + 28$ you count those 12 bicycle-and-car owners twice, once in each group. The [[inclusion-exclusion|inclusion-exclusion principle]] fixes this: the number of elements in the union equals the sum of the individual counts minus the count of the intersection (MR p. 151).`,
    },
    { kind: "math", tex: String.raw`|A \cup B| = |A| + |B| - |A \cap B|`, key: true },
    {
      kind: "p",
      text: String.raw`Here $|A \cup B| = 35 + 28 - 12 = 51$ people own at least one of the two, so $60 - 51 = 9$ own neither. When two sets are disjoint the intersection term is $0$, and the count is just $|B| + |C|$. Rearranged, the same formula finds a missing overlap: $|A \cap B| = |A| + |B| - |A \cup B|$. On the GRE the "neither" group is usually what makes the problem work, because the total, the union and the overlap are tied together by $\text{total} = |A \cup B| + \text{neither}$.`,
    },
    {
      kind: "interactive",
      key: "4-3-counting-methods/venn-explorer",
      title: "Venn explorer",
      caption: String.raw`Set the total and the sizes of $A$ and $B$, then slide the overlap. Notice the minimum overlap that is forced when $|A| + |B|$ exceeds the total, and how "only $A$," "only $B$," and "neither" update. The second tab handles three sets.`,
    },
    {
      kind: "p",
      text: String.raw`Three sets work the same way, but the safest method is to count by **regions**. Three overlapping circles make seven regions plus the outside, and a problem usually supplies the numbers piece by piece: the center first (in all three), then the pairs with the center subtracted, then the single-set regions. The Math Review's three-circle figure has two of the circles disjoint, and it states inclusion-exclusion only for two sets; for three overlapping sets, count regions rather than trying to recall a longer formula.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-3-counting-methods/venn3", props: { counts: { a: 8, b: 6, c: 5, ab: 4, ac: 3, bc: 2, abc: 1, none: 7 }, highlight: ["ab", "ac", "bc"] }, caption: String.raw`The shaded regions hold elements in exactly two of the three sets: $4 + 3 + 2 = 9$. Then $|A| = 8 + 4 + 3 + 1 = 16$, and 29 elements lie in at least one set.` },
    },
    {
      kind: "aside",
      tone: "watch",
      title: "\"Both\" often means the whole overlap",
      text: String.raw`If a problem says "13 students take both A and B," decide whether that 13 includes the students who also take C. The number of students in $A \cap B$ includes those in all three sets; the number taking _exactly_ A and B does not. Draw the diagram and put the center in first.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "The multiplication principle" },
    {
      kind: "p",
      text: String.raw`Suppose two choices are made one after the other, and the second choice is independent of the first (the number of options for it does not depend on what you chose first). If there are $k$ possibilities for the first and $m$ for the second, there are $km$ possibilities for the pair. This is the [[multiplication-principle|multiplication principle]], and it extends to any number of independent choices: multiply the numbers of possibilities (MR p. 151).`,
    },
    { kind: "math", tex: String.raw`\underbrace{n_1 \cdot n_2 \cdots n_r}_{\text{number of options at each step}}`, key: true },
    {
      kind: "p",
      text: String.raw`A [[tree-diagram|tree]] shows why. Choose one of 2 shirts and then one of 3 pairs of pants: the tree has 2 branches, each splitting into 3, so $2 \cdot 3 = 6$ outfits. The same thinking counts three-letter codes drawn from the letters $A$ through $E$. If letters may repeat, each of the three positions has 5 options, giving $5 \cdot 5 \cdot 5 = 125$. If repeats are not allowed, the options shrink as letters are used up: $5 \cdot 4 \cdot 3 = 60$. The choices are no longer independent in the strict sense, but a modified multiplication principle still works because the _number_ of options at each step is the same whatever you chose before (MR p. 152).`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-3-counting-methods/choice-tree", props: { first: ["S1", "S2"], second: ["P1", "P2", "P3"], firstTitle: "shirt", secondTitle: "pants" }, caption: String.raw`Six leaves, one for each outfit: $2 \cdot 3 = 6$.` },
    },
    {
      kind: "p",
      text: String.raw`The habit to build is the "slot" picture: draw one box per decision, write in each box how many options that decision has at that moment, and multiply. When one position has a restriction (for instance, a leading digit cannot be 0, or the last digit must be even), **fill the restricted position first**, then fill the others; this avoids the over-counting that comes from fixing it afterwards. If a restriction applies in two different ways, split into cases and add the case counts.`,
    },
    {
      kind: "diagram",
      diagram: { key: "4-3-counting-methods/slots", props: { items: [5, 4, 3], result: 60, names: ["1st letter", "2nd letter", "3rd letter"] }, caption: String.raw`Three-letter codes from $A, \dots, E$ with no repeated letter.` },
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Factorials and permutations" },
    {
      kind: "p",
      text: String.raw`How many ways can 6 different books be placed in a row? There are 6 options for the first spot, then 5, then 4, and so on down to 1. Each order is a [[permutation]], and the product is the number of permutations of 6 objects. The product has its own symbol, [[factorial|$n!$]] ("$n$-factorial"), and by special definition $0! = 1$ (MR p. 153).`,
    },
    { kind: "math", tex: String.raw`n! = n(n-1)(n-2)\cdots(3)(2)(1), \qquad 0! = 1`, key: true },
    {
      kind: "p",
      text: String.raw`So the books can be ordered in $6! = 720$ ways. Factorials let you peel off a factor: $n! = n\,(n-1)!$, and likewise $n! = n(n-1)(n-2)!$. That is how ratios are simplified without computing huge numbers, e.g. $\dfrac{9!}{7!} = 9 \cdot 8 = 72$.`,
    },
    {
      kind: "p",
      text: String.raw`Often you do not order everything, only some of the objects. If 8 runners finish a race and the first three places receive gold, silver and bronze, you are selecting **and ordering** 3 of the 8. That is the number of [[permutations-n-k|permutations of $n$ objects taken $k$ at a time]], written $\,{}_nP_k$ (with $k \le n$). The count is the first $k$ factors of $n!$, and multiplying and dividing by $(n-k)!$ turns it into a ratio of factorials (MR p. 154):`,
    },
    { kind: "math", tex: String.raw`{}_nP_k = n(n-1)(n-2)\cdots(n-k+1) = \frac{n!}{(n-k)!}`, key: true },
    {
      kind: "p",
      text: String.raw`For the medals, $\,{}_8P_3 = 8 \cdot 7 \cdot 6 = 336 = \frac{8!}{5!}$. Use the product form when $k$ is small: write exactly $k$ factors, starting at $n$ and going down.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Combinations" },
    {
      kind: "p",
      text: String.raw`Now suppose the three runners are not ranked: you simply need to choose a 3-person team out of the 8. The selection $\{A, B, C\}$ is one team no matter how the names are listed. A selection of $k$ objects from $n$ in which order does **not** matter is a [[combination]]. The number is read "$n$ choose $k$" and written $\,{}_nC_k$ or $\binom{n}{k}$ (MR p. 156).`,
    },
    {
      kind: "p",
      text: String.raw`The derivation is worth owning because it is also the fastest way to compute. If you select with order, every team of 3 appears $3! = 6$ times (once for each ordering of its members). So (ways to select without order) $\times$ (ways to order each selection) $=$ (ways to select with order), and dividing gives the combination formula (MR p. 155):`,
    },
    { kind: "math", tex: String.raw`{}_nC_k = \binom{n}{k} = \frac{{}_nP_k}{k!} = \frac{n!}{k!\,(n-k)!}`, key: true },
    {
      kind: "p",
      text: String.raw`Teams of 3 from 8: $\dfrac{336}{6} = 56$. Put another way, $\binom{n}{k}$ is the number of subsets with $k$ elements of an $n$-element set. That viewpoint explains two edge cases that the formula handles correctly: $\binom{n}{0} = 1$ (the only subset with no elements is $\varnothing$) and $\binom{n}{n} = 1$ (the only subset with all $n$ elements is the set itself). It also explains the symmetry $\binom{n}{k} = \binom{n}{n-k}$: choosing which $k$ objects to take is the same as choosing which $n-k$ to leave behind. So $\binom{8}{5} = \binom{8}{3} = 56$ (MR pp. 156–157).`,
    },
    {
      kind: "interactive",
      key: "4-3-counting-methods/perm-comb-explorer",
      title: "Permutation vs. combination explorer",
      caption: String.raw`Pick $n$ and $k$ and list every selection. In "order matters" mode, same-colored chips are the same set in a different order; each combination shows up exactly $k!$ times, which is why $_nP_k = {}_nC_k \cdot k!$.`,
    },
    {
      kind: "aside",
      tone: "tip",
      title: "Which one is it?",
      text: String.raw`Ask: _if I swap two of the selected objects, do I get something different?_ Gold-silver-bronze, president/treasurer/secretary, and "arrange in a row" are different when swapped, so use permutations. A committee, a hand of cards, a subset, a team are the same when swapped, so use combinations. If the question first picks a group and then gives its members different jobs, do both: combination to pick the group, then multiply by the number of ways to assign the jobs.`,
    },

    /* ---------------------------------------------------------------- */
    { kind: "heading", text: "Putting it together" },
    {
      kind: "p",
      text: String.raw`Most GRE counting problems are one of four shapes: a union count with a "neither" group; a sequence of independent choices (multiply); an ordered selection ($\,{}_nP_k$ or a factorial); or an unordered one ($\binom{n}{k}$). The harder versions mix them, usually with a restriction. Three techniques cover almost all of those: handle the restricted slot first; count a restriction by subtraction (total, minus the arrangements that break the rule), as in "committees of 4 from 9 people in which two particular people are not both chosen" $= \binom{9}{4} - \binom{7}{2} = 126 - 21 = 105$; and split into cases that cannot overlap and add them. (Subtraction and case splitting are standard methods built on the principles above; the Math Review does not name them.)`,
    },
    {
      kind: "p",
      text: String.raw`A last useful consequence of the multiplication principle: each element of an $n$-element set is either in a subset or out of it, 2 choices each, so there are $2^n$ subsets in all (a standard fact, though not stated in the ETS Math Review). It also agrees with the 8 tosses of a coin in the Math Review, which give $2^8 = 256$ sequences.`,
    },
    {
      kind: "aside",
      tone: "watch",
      title: "Classic traps",
      text: String.raw`Forgetting that a set ignores order and repetition while a list does not; multiplying when you should add (cases that cannot happen together are added; steps done one after another are multiplied); using $\,{}_nP_k$ for a committee; allowing repeats when the problem says "distinct" or forbidding them when it does not; forgetting that $0! = 1$ and $\binom{n}{0} = 1$; and, in Venn problems, subtracting the overlap twice or forgetting the "neither" group.`,
    },
  ],

  terms: [
    { id: "set", term: "set", turkish: "küme", definition: String.raw`A collection of objects that have some property. When the elements are given, order does not matter and repetitions are not counted as additional elements.`, source: "MR p. 149; MC p. 12", diagram: { key: "4-3-counting-methods/venn2", props: { highlight: ["a", "ab"], layout: "subset", universe: false, labels: ["A", "B"] } } },
    { id: "element", term: "element (member)", turkish: "eleman", definition: String.raw`An object that belongs to a set. ETS uses "element" and "member" interchangeably.`, source: "MR p. 149" },
    { id: "finite-set", term: "finite set", turkish: "sonlu küme", definition: String.raw`A set whose members can be completely counted, so it can be listed in curly brackets, such as $\{0, 2, 4, 6, 8\}$. A set that is not finite is infinite (for example, the set of all integers). The number of elements of a finite set $S$ is $|S|$.`, formula: String.raw`|S|`, source: "MR p. 149" },
    { id: "empty-set", term: "empty set", turkish: "boş küme", definition: String.raw`The set that has no members, denoted $\varnothing$, so $|\varnothing| = 0$. A set with one or more members is nonempty.`, formula: String.raw`\varnothing`, source: "MR p. 149" },
    { id: "subset", term: "subset", turkish: "alt küme", definition: String.raw`$A$ is a subset of $B$ if all of the members of $A$ are also members of $B$. By convention, $\varnothing$ is a subset of every set.`, diagram: { key: "4-3-counting-methods/venn2", props: { layout: "subset", highlight: ["ab"], universe: false } }, source: "MR p. 149; MC p. 13" },
    { id: "list", term: "list", turkish: "liste (sıralı dizilim)", definition: String.raw`Like a finite set but with two differences: the members are ordered, and elements can be repeated with the repetitions mattering. The lists $1, 2, 3, 2$ and $1, 2, 2, 3$ are different, though as sets they are the same.`, source: "MR p. 149; MC p. 13" },
    { id: "intersection", term: "intersection", turkish: "kesişim", definition: String.raw`The set $S \cap T$ of all elements that are in both $S$ and $T$.`, formula: String.raw`S \cap T`, diagram: { key: "4-3-counting-methods/venn2", props: { highlight: ["ab"] } }, source: "MR p. 150" },
    { id: "union", term: "union", turkish: "birleşim", definition: String.raw`The set $S \cup T$ of all elements that are in $S$ or $T$ or both.`, formula: String.raw`S \cup T`, diagram: { key: "4-3-counting-methods/venn2", props: { highlight: ["a", "b", "ab"] } }, source: "MR p. 150" },
    { id: "disjoint", term: "disjoint (mutually exclusive) sets", turkish: "ayrık kümeler", definition: String.raw`Sets that have no elements in common, so their intersection is the empty set.`, formula: String.raw`S \cap T = \varnothing`, diagram: { key: "4-3-counting-methods/venn2", props: { layout: "disjoint" } }, source: "MR p. 150; MC p. 13" },
    { id: "venn-diagram", term: "Venn diagram", turkish: "Venn şeması", definition: String.raw`A picture in which sets are circular regions that overlap if they have elements in common and do not overlap if they are disjoint.`, diagram: { key: "4-3-counting-methods/venn2", props: { counts: { a: 23, ab: 12, b: 16, none: 9 } } }, source: "MR p. 150" },
    { id: "universal-set", term: "universal set", turkish: "evrensel küme", definition: String.raw`The set, drawn as a rectangle around the circles of a Venn diagram, of which all the other sets involved are subsets. The part outside every circle represents elements in none of those sets.`, diagram: { key: "4-3-counting-methods/venn2", props: { highlight: ["none"] } }, source: "MR p. 150" },
    { id: "inclusion-exclusion", term: "inclusion-exclusion principle", turkish: "dahil etme–hariç tutma (kapsama–dışlama) ilkesi", definition: String.raw`The number of elements in the union of two finite sets equals the sum of their individual numbers of elements minus the number of elements in their intersection. The subtraction avoids counting the intersection twice.`, formula: String.raw`|A\cup B| = |A| + |B| - |A\cap B|`, source: "MR pp. 150–151" },
    { id: "multiplication-principle", term: "multiplication principle", turkish: "çarpma kuralı (çarpma yoluyla sayma)", definition: String.raw`If two choices are made in sequence, the second independent of the first, with $k$ possibilities for the first and $m$ for the second, there are $km$ possibilities for the pair. For more independent choices, multiply the numbers of possibilities.`, formula: String.raw`k \cdot m`, diagram: { key: "4-3-counting-methods/choice-tree", props: { first: ["S1", "S2"], second: ["P1", "P2", "P3"] } }, source: "MR p. 151" },
    { id: "tree-diagram", term: "tree diagram", turkish: "ağaç şeması", definition: String.raw`A diagram whose branches show the choices made in order; each path from the root to an end is one possible outcome.`, note: "Not named in the ETS Math Review", source: "MR p. 151 (the idea of sequential choices)", diagram: { key: "4-3-counting-methods/choice-tree", props: { first: ["A", "B"], second: ["x", "y"] } } },
    { id: "permutation", term: "permutation", turkish: "permütasyon (sıralama)", definition: String.raw`Each order in which $n$ objects can be arranged. The number of permutations of $n$ objects is $n!$.`, formula: String.raw`n!`, diagram: { key: "4-3-counting-methods/slots", props: { items: [4, 3, 2, 1], result: 24 } }, source: "MR p. 153" },
    { id: "factorial", term: "$n$-factorial", turkish: "faktöriyel", definition: String.raw`The product $n! = n(n-1)(n-2)\cdots(3)(2)(1)$ of the positive integers up to $n$. By special definition, $0! = 1$.`, formula: String.raw`n! = n(n-1)\cdots 2\cdot 1`, source: "MR p. 153" },
    { id: "permutations-n-k", term: "permutations of $n$ objects taken $k$ at a time", turkish: "n elemanlı kümenin r'li permütasyonları, P(n, r)", definition: String.raw`The number of ways to select and order $k$ of $n$ objects ($k \le n$), denoted $\,{}_nP_k$.`, formula: String.raw`{}_nP_k = \frac{n!}{(n-k)!}`, diagram: { key: "4-3-counting-methods/slots", props: { items: [8, 7, 6], result: 336 } }, source: "MR p. 154" },
    { id: "combination", term: "combination ($n$ choose $k$)", turkish: "kombinasyon, C(n, r)", definition: String.raw`The number of ways to choose $k$ of $n$ objects ($k \le n$) when the chosen objects are not put in order; equal to the number of $k$-element subsets of an $n$-element set. Written $\,{}_nC_k$ or $\binom{n}{k}$.`, formula: String.raw`\binom{n}{k} = \frac{n!}{k!\,(n-k)!}`, source: "MR p. 156" },
  ],

  examples: [
    {
      id: "e1",
      type: "qc",
      difficulty: "medium",
      given: String.raw`In a club of 30 members, 19 play chess, 17 play go, and 6 play neither game.`,
      quantityA: String.raw`The number of members who play both chess and go`,
      quantityB: String.raw`The number of members who play chess but not go`,
      answer: "A",
      explanation: [
        String.raw`The universal set has 30 members and 6 are outside both circles, so $|\text{chess} \cup \text{go}| = 30 - 6 = 24$.`,
        String.raw`Inclusion-exclusion: $24 = 19 + 17 - |\text{both}|$, so $|\text{both}| = 36 - 24 = 12$.`,
        String.raw`Chess but not go: $19 - 12 = 7$.`,
        String.raw`Quantity A is 12 and Quantity B is 7, so Quantity A is greater. Trap: the 19 and 17 are totals that include the overlap; "chess" is not "chess only."`,
      ],
    },
    {
      id: "e2",
      type: "mc1",
      difficulty: "hard",
      stem: String.raw`How many four-digit positive integers have four different digits and are even?`,
      choices: [String.raw`$1{,}792$`, String.raw`$2{,}296$`, String.raw`$2{,}520$`, String.raw`$3{,}024$`, String.raw`$4{,}536$`],
      answer: 1,
      explanation: [
        String.raw`Fill the most restricted slot, the last digit, first, and split into cases because the first digit cannot be 0.`,
        String.raw`Case 1: the last digit is 0. The first three digits are then an ordered selection of different digits from the other nine: $9 \cdot 8 \cdot 7 = 504$.`,
        String.raw`Case 2: the last digit is 2, 4, 6 or 8 (4 choices). The first digit cannot be 0 or the last digit, so it has 8 choices; the second has 8 (ten digits minus the two already used); the third has 7: $4 \cdot 8 \cdot 8 \cdot 7 = 1{,}792$.`,
        String.raw`Total: $504 + 1{,}792 = 2{,}296$.`,
        String.raw`Traps: $5 \cdot 9 \cdot 8 \cdot 7 = 2{,}520$ ignores that the first digit loses an option when the last digit is nonzero; $1{,}792$ forgets the case ending in 0; $4{,}536 = 9 \cdot 9 \cdot 8 \cdot 7$ ignores "even."`,
      ],
    },
    {
      id: "e3",
      type: "ne",
      difficulty: "medium",
      stem: String.raw`A committee of 4 is to be chosen from 9 people. Two of the 9 people refuse to serve together, though either one may serve alone. How many different committees are possible?`,
      answer: { kind: "decimal", value: "105" },
      explanation: [
        String.raw`Count all committees, then subtract the forbidden ones. All committees: $\binom{9}{4} = \frac{9 \cdot 8 \cdot 7 \cdot 6}{24} = 126$.`,
        String.raw`Forbidden committees contain both of the two people; the other 2 members come from the remaining 7: $\binom{7}{2} = 21$.`,
        String.raw`$126 - 21 = 105$.`,
      ],
    },
    {
      id: "e4",
      type: "mcm",
      difficulty: "medium",
      stem: String.raw`Which of the following are equal to the number of ways to choose 3 people from a group of 10? Indicate all such expressions.`,
      choices: [String.raw`$\dfrac{10!}{3!\,7!}$`, String.raw`$\binom{10}{7}$`, String.raw`$\dfrac{{}_{10}P_3}{3!}$`, String.raw`$\,{}_{10}P_3$`, String.raw`$\dfrac{10!}{3!}$`],
      answer: [0, 1, 2],
      explanation: [
        String.raw`The count is $\binom{10}{3} = \frac{10!}{3!\,7!} = 120$, so the first choice is right.`,
        String.raw`By symmetry $\binom{10}{7} = \binom{10}{3} = 120$: choosing 3 to take is choosing 7 to leave.`,
        String.raw`$\frac{{}_{10}P_3}{3!} = \frac{720}{6} = 120$: ordered selections divided by the $3!$ orderings of each.`,
        String.raw`$\,{}_{10}P_3 = 720$ counts ordered selections, and $\frac{10!}{3!}$ is far larger still.`,
      ],
    },
  ],

  quick: [
    { id: "k1", prompt: String.raw`How many elements does the set $\{5, 2, 5, 9, 2\}$ have, and how many entries does the list $5, 2, 5, 9, 2$ have?`, answer: String.raw`3 and 5`, explanation: String.raw`A set ignores repeats ($\{2, 5, 9\}$); a list keeps them.` },
    { id: "k2", prompt: String.raw`If $|A| = 14$, $|B| = 9$ and $|A \cap B| = 4$, what is $|A \cup B|$?`, answer: String.raw`19`, explanation: String.raw`$14 + 9 - 4 = 19$.` },
    { id: "k3", prompt: String.raw`Simplify $\dfrac{7!}{5!}$.`, answer: String.raw`42`, explanation: String.raw`$7 \cdot 6 \cdot 5!/5! = 42$, which is $\,{}_7P_2$.` },
    { id: "k4", prompt: String.raw`How many 4-character strings can be made from the digits 0 to 9 if repeats are allowed? If they are not allowed?`, answer: String.raw`$10{,}000$; $5{,}040$`, explanation: String.raw`$10^4 = 10{,}000$ and $10 \cdot 9 \cdot 8 \cdot 7 = 5{,}040$.` },
    { id: "k5", prompt: String.raw`Evaluate $\binom{11}{9}$.`, answer: String.raw`55`, explanation: String.raw`By symmetry $\binom{11}{9} = \binom{11}{2} = \frac{11 \cdot 10}{2} = 55$.` },
    { id: "k6", prompt: String.raw`How many subsets with no elements does a 12-element set have, and how many with all 12?`, answer: String.raw`1 and 1`, explanation: String.raw`Only $\varnothing$ and the set itself: $\binom{12}{0} = \binom{12}{12} = 1$.` },
  ],

  quiz: {
    questions: [
      {
        id: "z1",
        type: "qc",
        difficulty: "medium",
        given: String.raw`$S$ is a set with 8 elements.`,
        quantityA: String.raw`The number of subsets of $S$ that have exactly 3 elements`,
        quantityB: String.raw`The number of subsets of $S$ that have exactly 5 elements`,
        answer: "C",
        explanation: [
          String.raw`$\binom{8}{3} = \frac{8 \cdot 7 \cdot 6}{6} = 56$ and $\binom{8}{5} = \binom{8}{3} = 56$.`,
          String.raw`The symmetry $\binom{n}{k} = \binom{n}{n-k}$ is the quick route: picking 3 elements to include is the same as picking the 5 to leave out. The quantities are equal.`,
        ],
      },
      {
        id: "z2",
        type: "qc",
        difficulty: "medium",
        quantityA: String.raw`The number of three-letter codes that can be formed from the letters $A, B, C, D, E, F$ if no letter may be used twice`,
        quantityB: String.raw`The number of three-letter codes that can be formed from the letters $A, B, C, D, E$ if letters may be repeated`,
        answer: "B",
        explanation: [
          String.raw`Quantity A: $6 \cdot 5 \cdot 4 = 120$. Quantity B: $5 \cdot 5 \cdot 5 = 125$.`,
          String.raw`The extra letter in A's alphabet does not beat the freedom to repeat in B. Quantity B is greater.`,
        ],
      },
      {
        id: "z3",
        type: "qc",
        difficulty: "hard",
        given: String.raw`Of 50 students, 30 take mathematics and 28 take physics.`,
        quantityA: String.raw`The number of students who take both mathematics and physics`,
        quantityB: String.raw`10`,
        answer: "D",
        explanation: [
          String.raw`The problem does not say every student takes at least one of the courses. At most $30 + 28 - |\text{both}| \le 50$ students are in the union, so $|\text{both}| \ge 8$. Also $|\text{both}| \le 28$.`,
          String.raw`If 8 students take both (and everyone takes at least one), Quantity A is less than 10. If 12 take both, Quantity A exceeds 10. Both outcomes are consistent with the given information, so the relationship cannot be determined.`,
        ],
      },
      {
        id: "z4",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`Each of 70 students studies at least one of three languages: French, German and Spanish. Of these, 40 study French, 30 study German, and 25 study Spanish. Also 12 study both French and German, 10 study both French and Spanish, 8 study both German and Spanish, and 5 study all three. How many of the 70 students study exactly two of the three languages?`,
        choices: [String.raw`$10$`, String.raw`$15$`, String.raw`$20$`, String.raw`$25$`, String.raw`$30$`],
        answer: 1,
        explanation: [
          String.raw`"Study both French and German" includes the 5 who study all three, so those who study exactly French and German number $12 - 5 = 7$. Similarly French and Spanish only: $10 - 5 = 5$; German and Spanish only: $8 - 5 = 3$.`,
          String.raw`Exactly two languages: $7 + 5 + 3 = 15$.`,
          String.raw`Check by regions: French only $40 - 7 - 5 - 5 = 23$, German only $30 - 7 - 3 - 5 = 15$, Spanish only $25 - 5 - 3 - 5 = 12$; and $23 + 15 + 12 + 7 + 5 + 3 + 5 = 70$. Trap: answering 30 (the sum of the pairwise counts) counts the 5 triple-language students three times.`,
        ],
      },
      {
        id: "z5",
        type: "mc1",
        difficulty: "medium",
        stem: String.raw`A committee of 3 is to be chosen from 7 men and 5 women. How many different committees include at least one woman?`,
        choices: [String.raw`$145$`, String.raw`$165$`, String.raw`$185$`, String.raw`$205$`, String.raw`$220$`],
        answer: 2,
        explanation: [
          String.raw`Count all committees and subtract the ones with no woman. All: $\binom{12}{3} = \frac{12 \cdot 11 \cdot 10}{6} = 220$.`,
          String.raw`All men: $\binom{7}{3} = 35$.`,
          String.raw`$220 - 35 = 185$. Trap: 220 ignores the condition; adding cases (1, 2, or 3 women) works too but takes three products: $5 \cdot 21 + 10 \cdot 7 + 10 = 105 + 70 + 10 = 185$.`,
        ],
      },
      {
        id: "z6",
        type: "mc1",
        difficulty: "hard",
        stem: String.raw`Six people stand in a row for a photograph. In how many different orders can they stand if two particular people, Ana and Bo, must not be next to each other?`,
        choices: [String.raw`$240$`, String.raw`$360$`, String.raw`$480$`, String.raw`$600$`, String.raw`$720$`],
        answer: 2,
        explanation: [
          String.raw`Total orders: $6! = 720$.`,
          String.raw`Orders in which Ana and Bo are adjacent: glue them into one block. The block and the other 4 people make 5 items, which can be ordered in $5! = 120$ ways, and the pair can be ordered in 2 ways inside the block: $240$.`,
          String.raw`Not adjacent: $720 - 240 = 480$. Trap: 240 is the count of the _forbidden_ orders.`,
        ],
      },
      {
        id: "z7",
        type: "mcm",
        difficulty: "medium",
        stem: String.raw`Set $A$ has 6 elements and set $B$ has 4 elements. Which of the following could be the number of elements in $A \cup B$? Indicate all such numbers.`,
        choices: [String.raw`$3$`, String.raw`$5$`, String.raw`$6$`, String.raw`$8$`, String.raw`$10$`, String.raw`$11$`],
        answer: [2, 3, 4],
        explanation: [
          String.raw`$|A \cup B| = 6 + 4 - |A \cap B|$, and $|A \cap B|$ can be any whole number from 0 to 4.`,
          String.raw`So $|A \cup B|$ ranges over $10, 9, 8, 7, 6$. The smallest case ($B$ a subset of $A$) gives 6, the largest (disjoint sets) gives 10.`,
          String.raw`From the choices: 6, 8, and 10 are possible; 3 and 5 are less than $|A| = 6$, and 11 is more than $6 + 4$.`,
        ],
      },
      {
        id: "z8",
        type: "mcm",
        difficulty: "hard",
        stem: String.raw`A club with 9 members chooses a team of 5 and then names one of the 5 team members as captain. Which of the following expressions give the number of ways to do this? Indicate all such expressions.`,
        choices: [String.raw`$5\binom{9}{5}$`, String.raw`$9\binom{8}{4}$`, String.raw`$4\binom{9}{5}$`, String.raw`$\dfrac{{}_9P_5}{4!}$`, String.raw`$5!\binom{9}{5}$`],
        answer: [0, 1, 3],
        explanation: [
          String.raw`Team first, then captain: $\binom{9}{5} \cdot 5 = 126 \cdot 5 = 630$. So the first choice is correct.`,
          String.raw`Captain first, then the other 4 team members from the remaining 8: $9 \cdot \binom{8}{4} = 9 \cdot 70 = 630$. Also correct.`,
          String.raw`$\,{}_9P_5 = 15{,}120$, and $\frac{15{,}120}{24} = 630$, correct: $\,{}_9P_5$ orders all five, and dividing by $4!$ keeps only which one is first (the captain) while ignoring the order of the other four.`,
          String.raw`$4\binom{9}{5} = 504$ gives the captain only 4 options. $5!\binom{9}{5} = 15{,}120$ counts every ordering of the whole team, not just the captain.`,
        ],
      },
      {
        id: "z9",
        type: "ne",
        difficulty: "hard",
        stem: String.raw`How many three-digit positive integers are odd and have three different digits?`,
        answer: { kind: "decimal", value: "320" },
        explanation: [
          String.raw`Fill the most restricted slot first. Units digit: odd, so 5 choices (1, 3, 5, 7, 9).`,
          String.raw`Hundreds digit: not 0 and not the units digit, so $10 - 2 = 8$ choices (the 0 and the chosen odd digit are both excluded, and they are different digits).`,
          String.raw`Tens digit: any digit not already used, so 8 choices.`,
          String.raw`$5 \cdot 8 \cdot 8 = 320$. Trap: choosing the hundreds digit first gives a case split (an odd or an even hundreds digit changes how many odd units digits remain).`,
        ],
      },
      {
        id: "z10",
        type: "ne",
        difficulty: "medium",
        stem: String.raw`A project group is to have 4 members: exactly 2 chosen from 6 mathematics students and exactly 2 chosen from 5 computer science students. How many different groups are possible?`,
        answer: { kind: "decimal", value: "150" },
        explanation: [
          String.raw`The two choices are independent, so multiply: $\binom{6}{2} \cdot \binom{5}{2}$.`,
          String.raw`$\binom{6}{2} = 15$ and $\binom{5}{2} = 10$, so $15 \cdot 10 = 150$. Do not use $\binom{11}{4}$, which ignores the "exactly 2 from each" condition.`,
        ],
      },
    ],
  },
};

export default section;
