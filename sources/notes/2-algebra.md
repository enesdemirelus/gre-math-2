# Part 2 Algebra: reference notes (ETS GRE Math Review)

Source: GRE Math Review (© 2024 ETS), `math-review.pdf`, Part 2, printed pages 36–91.
**Page numbers below are the printed page numbers in the page footers. PDF page = printed page + 1** (e.g., printed p. 36 = PDF p. 37). Every formula was checked against the page images, not only `mr.txt`.

Part 2 overview (p. 36): "The review of algebra begins with algebraic expressions, equations, inequalities, and functions and then progresses to several examples of applying them to solve real-life word problems. The review of algebra ends with coordinate geometry and graphs of functions as other important algebraic tools for solving problems."

Layout of Part 2:

| Section | Printed pages |
|---|---|
| 2.1 Algebraic Expressions | 36–40 |
| 2.2 Rules of Exponents | 40–43 |
| 2.3 Solving Linear Equations | 43–48 |
| 2.4 Solving Quadratic Equations | 48–51 |
| 2.5 Solving Linear Inequalities | 51–53 |
| 2.6 Functions | 53–54 |
| 2.7 Applications | 54–61 |
| 2.8 Coordinate Geometry | 61–72 |
| 2.9 Graphs of Functions | 72–79 |
| Algebra Exercises (1–21) | 80–85 |
| Answers to Algebra Exercises | 86–91 |

---

## 2.1 Algebraic Expressions (Math Review pp. 36–40)

### Definitions
- **Variable** (p. 36): "a letter that represents a quantity whose value is unknown." The letters $x$ and $y$ are often used, "although any symbol can be used."
- **Algebraic expression** (p. 36): "has one or more variables and can be written as a single **term** or as a sum of terms." Examples: $2x$; $y-\frac14$; $w^3z+5z^2-z^2+6$; $\frac{8}{n+p}$. Term counts: $2x$ is a single term, $y-\frac14$ has two terms, $w^3z+5z^2-z^2+6$ has four terms, and $\frac{8}{n+p}$ has one term.
- **Like terms** (p. 36): terms that "have the same variables, and the corresponding variables have the same exponents." Example: $5z^2$ and $-z^2$.
- **Constant term** (p. 36): "A term that has no variable."
- **Coefficient** (p. 36): "A number that is multiplied by variables is called the coefficient of a term."
- **Polynomial** (p. 37): "the sum of a finite number of terms in which each term is either a constant term or a product of a coefficient and one or more variables with positive integer exponents."
- **Degree** of a term (p. 37): "the sum of the exponents of the variables in the term." A variable written without an exponent has degree 1. The degree of a constant term is 0.
- **Degree of a polynomial** (p. 37): "the greatest degree of its terms."
- **Quadratic** and **cubic** polynomials (p. 37): polynomials of degrees 2 and 3, respectively.
- **Identity** (p. 39): "A statement of equality between two algebraic expressions that is true for all possible values of the variables involved."

### Facts, rules, formulas
- Worked degree examples (p. 37): $4x^6+7x^5-3x+2$ has four terms with coefficients $4, 7, -3$ and degrees $6, 5, 1, 0$. In $2x^2-7xy^3-5$ (two variables), the term $-7xy^3$ has coefficient $-7$ and degree $1+3=4$, so the polynomial has degree 4. $4x^3-12x^2-x+36$ is a cubic polynomial in one variable (p. 38).
- "The same rules that govern operations with numbers apply to operations with algebraic expressions." (p. 38)
- **Combining like terms** (p. 38): add their coefficients. $2x+5x=7x$; $w^3z+5z^2-z^2+6=w^3z+4z^2+6$; $3xy+2x-xy-3x=2xy-x$.
- **Factoring out a common factor** (p. 38): "A number or variable that is a factor of each term in an algebraic expression can be factored out." $4x+12=4(x+3)$; $15y^2-9y=3y(5y-3)$.
- **Simplifying a rational expression** (pp. 38–39): $\dfrac{7x^2+14x}{2x+4}=\dfrac{7x(x+2)}{2(x+2)}$, which is equivalent to $\dfrac{7x}{2}$ "for all values of $x$ for which the expression is defined", namely all $x\neq-2$. "A fraction is not defined when the denominator is equal to 0."
- **Multiplying expressions** (p. 39): "each term of the first expression is multiplied by each term of the second expression and the results are added." $(x+2)(3x-7)=x(3x)+x(-7)+2(3x)+2(-7)=3x^2-7x+6x-14=3x^2-x-14$.
- **Seven identities** (pp. 39–40):
  1. $ca+cb=c(a+b)$
  2. $ca-cb=c(a-b)$
  3. $(a+b)^2=a^2+2ab+b^2$
  4. $(a-b)^2=a^2-2ab+b^2$
  5. $a^2-b^2=(a+b)(a-b)$
  6. $(a+b)^3=a^3+3a^2b+3ab^2+b^3$
  7. $(a-b)^3=a^3-3a^2b+3ab^2-b^3$
- "Identities can be used to modify and simplify algebraic expressions" (p. 40). Example 2.1.15: $\dfrac{x^2-9}{4x-12}=\dfrac{(x+3)(x-3)}{4(x-3)}$, which is equivalent to $\dfrac{x+3}{4}$ for all $x\neq3$. The factor $x-3$ can be canceled only when $x-3\neq0$.

### Notation and conventions
- Juxtaposition means multiplication: $2x$, $w^3z$, $7xy^3$.
- A polynomial is "in one variable, $x$" or "in two variables, $x$ and $y$" (p. 37).
- "For values of $x$ where it is defined" / "for all $x \ne -2$" is how ETS words domain restrictions on simplified expressions.

### Gotchas
- Canceling a common factor gives an equivalent expression only where the original is defined. The original $\frac{7x^2+14x}{2x+4}$ is undefined at $x=-2$, and $\frac{x^2-9}{4x-12}$ is undefined at $x=3$, even though the simplified forms are defined there (pp. 39–40).
- When counting terms, a fraction such as $\frac{8}{n+p}$ is one term (p. 36).
- In a multi-variable term, the degree is the **sum** of the exponents. $-7xy^3$ has degree 4, not 3 (p. 37).

---

## 2.2 Rules of Exponents (Math Review pp. 40–43)

### Definitions
- In $x^a$, "where $x$ is raised to the power $a$, $x$ is called the **base** and $a$ is called the **exponent**." (p. 40)

### Facts, rules, formulas
- **Equal-powers property** (p. 40): "For all integers $a$ and $b$ and all positive numbers $x$, except $x=1$, the following property holds: If $x^a=x^b$, then $a=b$." Example: if $2^{3c+1}=2^{10}$, then $3c+1=10$, so $c=3$.
- **Seven basic rules** (pp. 41–42). "In each rule, the bases $x$ and $y$ are nonzero real numbers and the exponents $a$ and $b$ are integers, unless stated otherwise."
  1. $x^{-a}=\dfrac{1}{x^a}$. Examples: $4^{-3}=\frac{1}{4^3}=\frac{1}{64}$; $x^{-10}=\frac{1}{x^{10}}$; $\frac{1}{2^{-a}}=2^a$.
  2. $(x^a)(x^b)=x^{a+b}$. Examples: $(3^2)(3^4)=3^{2+4}=3^6=729$; $(y^3)(y^{-1})=y^2$.
  3. $\dfrac{x^a}{x^b}=x^{a-b}=\dfrac{1}{x^{b-a}}$. Examples: $\frac{5^7}{5^4}=5^{7-4}=5^3=125$; $\frac{t^3}{t^8}=t^{-5}=\frac{1}{t^5}$.
  4. $x^0=1$. Examples: $7^0=1$; $(-3)^0=1$. "Note that $0^0$ is not defined." (p. 42)
  5. $(x^a)(y^a)=(xy)^a$. Examples: $(2^3)(3^3)=6^3=216$; $(10z)^3=10^3z^3=1{,}000z^3$.
  6. $\left(\dfrac{x}{y}\right)^a=\dfrac{x^a}{y^a}$. Examples: $\left(\frac34\right)^2=\frac{3^2}{4^2}=\frac{9}{16}$; $\left(\frac{r}{4t}\right)^3=\frac{r^3}{64t^3}$.
  7. $(x^a)^b=x^{ab}$. Examples: $(2^5)^2=2^{10}=1{,}024$; $(3y^6)^2=(3^2)(y^6)^2=9y^{12}$.
- "The rules above are identities that are used to simplify expressions." (p. 42)
- **Six cases of common mistakes** (p. 43): "Sometimes algebraic expressions look like they can be simplified in similar ways, but in fact they cannot."
  1. $(x^a)(y^b)\neq(xy)^{a+b}$. For example, $(2^4)(3^2)=144$ but $(2\times3)^{4+2}=6^6=46{,}656$.
  2. $(x^a)^b\neq x^ax^b$. Instead, $(x^a)^b=x^{ab}$ and $x^ax^b=x^{a+b}$. For example, $(4^2)^3=4^6$ and $4^24^3=4^5$.
  3. $(x+y)^a\neq x^a+y^a$. In particular, $(x+y)^2=x^2+2xy+y^2$: "the correct expansion contains the additional term $2xy$."
  4. $(-x)^2\neq -x^2$. Instead, $(-x)^2=x^2$. "Note carefully where each negative sign appears."
  5. $\sqrt{x^2+y^2}\neq x+y$.
  6. $\dfrac{a}{x+y}\neq\dfrac{a}{x}+\dfrac{a}{y}$. "But it *is* true that $\dfrac{x+y}{a}=\dfrac{x}{a}+\dfrac{y}{a}$."

### Notation and conventions
- In the rules, the exponents are integers and the bases are nonzero reals unless stated otherwise (p. 41).
- The equal-powers property requires a positive base other than 1 (p. 40).

### Gotchas
- $0^0$ is undefined (p. 42).
- The six "cases" above (p. 43): you cannot distribute an exponent over a sum, combine different bases with different exponents, confuse $(x^a)^b$ with $x^ax^b$, treat $(-x)^2$ as $-x^2$, take the square root term by term, or split a sum in the denominator.

---

## 2.3 Solving Linear Equations (Math Review pp. 43–48)

### Definitions
- **Equation** (p. 43): "a statement of equality between two mathematical expressions."
- **Solutions** (p. 43): "If an equation involves one or more variables, the values of the variables that make the equation true are called the solutions of the equation."
- **Solve an equation** (p. 43): "find the values of the variables that make the equation true, that is, the values that **satisfy the equation**."
- **Equivalent equations** (p. 43): "Two equations that have the same solutions." Example: $x+1=2$ and $2x+2=4$, both true when $x=1$ and false otherwise.
- **Linear equation** (p. 44): "an equation involving one or more variables in which each term in the equation is either a constant term or a variable multiplied by a coefficient. None of the variables are multiplied together or raised to a power greater than 1." Linear: $2x+1=7x$ and $10x-9y-z=3$. Not linear: $x+y^2=0$ and $xz=3$.
- **Linear equation in two variables** (pp. 45–46): can be written as $ax+by=c$, "where $a$, $b$, and $c$ are real numbers and neither $a$ nor $b$ is equal to 0." Example: $3x+2y=8$.
- **Ordered pair** / solution of a two-variable equation (p. 46): "an ordered pair of numbers $(x,y)$ that makes the equation true when the values of $x$ and $y$ are substituted into the equation." For $3x+2y=8$, both $(2,1)$ and $\left(-\frac23,5\right)$ are solutions, and $(1,2)$ is not.
- **System of equations** and **simultaneous equations** (p. 46): "A set of equations in two or more variables is called a system of equations, and the equations in the system are called simultaneous equations."
- **Solve a system** (p. 46): in two variables, find ordered pairs $(x,y)$ that satisfy all of the equations in the system. In three variables, find ordered triples $(x,y,z)$. "Solutions of systems with more than three variables are defined in a similar way."
- **Substitution method** (p. 46): "one equation is manipulated to express one variable in terms of the other. Then the expression is substituted in the other equation."
- **Elimination method** (p. 47): "the object is to make the coefficients of one variable the same in both equations so that one variable can be eliminated either by adding the equations together or by subtracting one from the other."

### Facts, rules, formulas
- General method (p. 43): "find successively simpler equivalent equations so that the simplest equivalent equation makes the solutions obvious."
- **Three rules for producing equivalent equations** (p. 44):
  1. "When the same constant is added to or subtracted from both sides of an equation, the equality is preserved and the new equation is equivalent to the original equation."
  2. "When both sides of an equation are multiplied or divided by the same **nonzero** constant, the equality is preserved and the new equation is equivalent to the original equation."
  3. "When an expression that occurs in an equation is replaced by an equivalent expression, the equality is preserved and the new equation is equivalent to the original equation." For example, $2(x+1)$ may be replaced by $2x+2$.
- One variable (p. 44): combine like terms and apply the rules until the solution is obvious. Example 2.3.1: $11x-4-8x=2(x+4)-2x$ becomes $3x-4=8$, so $x=4$.
- **Checking** (p. 45): substitute the solution into the original equation. If the left-hand and right-hand sides give the same value (8 and 8 here), the solution is correct.
- A linear equation can have **no solution** (p. 45): $2x+3=2(7+x)$ is equivalent to $3=14$, which is false.
- What looks like a linear equation can turn out to be an **identity** (p. 45): $3x-6=-3(2-x)$ is true for all $x$.
- "Every linear equation in two variables has infinitely many solutions." (p. 46)
- Systems of two linear equations in two variables (p. 46): "Often, such systems have a unique solution ... However, it is possible that the system will not have any solutions, or that it will have infinitely many solutions."
- Worked system (pp. 46–48): $4x+3y=13$ and $x+2y=2$. By substitution, $x=2-2y$ gives $y=-1$ and then $x=4$. By elimination, multiply the second equation by 4 to get $4x+8y=8$, then subtract to get $-5y=5$. The solution is $(x,y)=(4,-1)$.

### Notation and conventions
- A solution of a system is written as "$x=4$ and $y=-1$, or $(x,y)=(4,-1)$" (p. 47).

### Gotchas
- Rule 2 requires a nonzero constant (p. 44).
- A linear equation in one variable may have no solution, or it may be an identity (p. 45).
- A system may have one solution, none, or infinitely many (p. 46).

---

## 2.4 Solving Quadratic Equations (Math Review pp. 48–51)

### Definitions
- **Quadratic equation** in the variable $x$ (p. 48): "an equation that can be written in the form $ax^2+bx+c=0$ where $a$, $b$, and $c$ are real numbers and $a\neq0$."
- **Quadratic formula** (p. 48):
  $$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$
  "where the notation $\pm$ is shorthand for indicating two solutions – one that uses the plus sign and the other that uses the minus sign."

### Facts, rules, formulas
- "Quadratic equations have zero, one, or two real solutions." (p. 48)
- The sign of the expression under the square root sign decides the number of solutions. ETS does **not** use the word "discriminant"; it says "the expression under the square root sign."
  - **Positive → two real solutions.** Example 2.4.1 (pp. 48–49): $2x^2-x-6=0$ with $a=2$, $b=-1$, $c=-6$ gives $x=\frac{1\pm\sqrt{49}}{4}=\frac{1\pm7}{4}$, so $x=2$ and $x=-\frac32$.
  - **Zero → one solution.** Example 2.4.2 (pp. 49–50): $x^2+4x+4=0$ gives $x=\frac{-4\pm\sqrt0}{2(1)}=-2$. "Thus this quadratic equation has only one solution."
  - **Negative → no real solution.** Example 2.4.3 (p. 50): $x^2+x+5=0$ gives $-19$ under the root. "Since square roots of negative numbers are not real numbers, $x$ is not a real number, and there is no real solution."
- **Solving by factoring** (pp. 50–51): "Some quadratic equations can be solved more quickly by factoring." "When a product is equal to 0, at least one of the factors must be equal to 0."
  - $2x^2-x-6=(2x+3)(x-2)=0$, so $x=-\frac32$ or $x=2$.
  - $5x^2+3x-2=(5x-2)(x+1)=0$, so $x=\frac25$ or $x=-1$.

### Notation and conventions
- In the formula, substitute $a$, $b$, $c$ with their signs, e.g. $-(-1)\pm\sqrt{(-1)^2-4(2)(-6)}$ over $2(2)$ (p. 49).

### Gotchas
- $a\neq0$ is part of the definition (p. 48).
- Only **real** solutions count. A negative value under the root means no real solution (p. 50). The conventions also state that all numbers are real.
- Keep the signs of $b$ and $c$ when substituting (p. 49).

---

## 2.5 Solving Linear Inequalities (Math Review pp. 51–53)

### Definitions
- **Inequality** (p. 51): "A mathematical statement that uses one of the following four inequality signs":
  - $<$ less than
  - $>$ greater than
  - $\le$ less than or equal to
  - $\ge$ greater than or equal to
- Inequalities "are similar to equations, except that the two sides are related by one of the inequality signs instead of the equality sign" (p. 51). Example: $4x+1\le7$ is "a linear inequality in one variable, which states that $4x+1$ is less than or equal to 7."
- **Solve an inequality** (p. 51): "find the set of all values of the variable that make the inequality true."
- **Solution set** (p. 51): that set of values.
- **Equivalent inequalities** (p. 51): "Two inequalities that have the same solution set."

### Facts, rules, formulas
- Procedure (p. 52): it is similar to solving a linear equation. Simplify the inequality "by isolating the variable on one side of the inequality," using two rules:
  1. "When the same constant is added to or subtracted from both sides of an inequality, the direction of the inequality is preserved and the new inequality is equivalent to the original."
  2. "When both sides of the inequality are multiplied or divided by the same nonzero constant, the direction of the inequality is *preserved if the constant is positive* but the direction is *reversed if the constant is negative*. In either case, the new inequality is equivalent to the original."
- Example 2.5.1 (p. 52): $-3x+5\le17$ gives $-3x\le12$. Dividing by $-3$ **and reversing** gives $\frac{-3x}{-3}\ge\frac{12}{-3}$, so $x\ge-4$. The solution set is "all numbers greater than or equal to $-4$."
- Example 2.5.2 (pp. 52–53): $\frac{4x+9}{11}<5$ gives $4x+9<55$, then $4x<46$, so $x<\frac{46}{4}=11.5$.
- From 2.7 (p. 60): "taking the positive fourth root of each side of an inequality preserves the direction of the inequality. It is also true that taking the positive square root or any other positive root of each side of an inequality preserves the direction of the inequality." The example applies this to positive quantities. *(note, not ETS: both sides are positive in that example.)*

### Gotchas
- **Reverse the inequality when multiplying or dividing both sides by a negative number** (p. 52). This is the central emphasis of the section.
- The answer is a **set** of values (the solution set), not a single number (p. 51).

---

## 2.6 Functions (Math Review pp. 53–54)

### Definitions
- **Function** (p. 53): "An algebraic expression in one variable can be used to define a function of that variable." Functions are "usually denoted by letters such as $f$, $g$, and $h$." Example: $f(x)=3x+5$.
- **Value of $f$ at $x$** (p. 53): $f(x)$ "is called the value of $f$ at $x$ and is obtained by substituting the value of $x$ in the expression." Example: $f(1)=3(1)+5=8$.
- **Input and output** (p. 53): "It might be helpful to think of a function $f$ as a machine that takes an input, which is a value of the variable $x$, and produces the corresponding output, $f(x)$."
- **Domain** (p. 53): "the set of all permissible inputs, that is, all permissible values of the variable $x$."
- **Piecewise-defined function** is introduced in 2.9 (p. 74).

### Facts, rules, formulas
- "For any function, each input $x$ gives exactly one output $f(x)$. However, more than one value of $x$ can give the same output $f(x)$." Example: $g(x)=x^2-2x+3$ has $g(0)=3$ and $g(2)=3$ (p. 53).
- The domain may be given explicitly and restricted. Example: $h(x)=x^2-4$ for $-2\le x\le2$ (p. 53).
- "**Without an explicit restriction, the domain is assumed to be the set of all values of $x$ for which $f(x)$ is a real number.**" (p. 53)
- Domain examples:
  - Example 2.6.1 (p. 53): $f(x)=\dfrac{2x}{x-6}$ is not defined at $x=6$ "because $\frac{12}{0}$ is not defined." Its domain is all real numbers except 6.
  - Example 2.6.2 (p. 54): $g(x)=x^3+\sqrt{x+2}-10$. Here $g(x)$ "is not a real number if $x<-2$," so the domain is all real $x$ with $x\ge-2$.
  - Example 2.6.3 (p. 54): $h(x)=|x|$ is "the distance between $x$ and 0 on the number line," with domain all real numbers. Also $h(x)=h(-x)$ for all real $x$, because $x$ and $-x$ are the same distance from 0.
- For $f(x)=3x+5$ and $g(x)=x^2-2x+3$, the domain is all real numbers (p. 53).

### Notation and conventions
- $f(x)$ is read as the value of $f$ at $x$. A domain restriction is written after the formula, e.g. "for $-2\le x\le2$" or "for $x\ge0$".

### Gotchas
- Exclude inputs that make a denominator 0 or put a negative number under a square root (pp. 53–54).
- Different inputs can give the same output, but one input can never give two outputs (p. 53).

---

## 2.7 Applications (Math Review pp. 54–61)

### Definitions
- **Interest** (p. 58): the amount "earned on an investment during a specified time period." It can be computed as simple interest or compound interest.
- **Simple interest** (p. 58): "based only on the initial deposit, which serves as the amount on which interest is computed, called the **principal**, for the entire time period."
- **Compound interest** (p. 58): "interest is added to the principal at regular time intervals, such as annually, quarterly, and monthly. Each time interest is added to the principal, the interest is said to be compounded. After each compounding, interest is earned on the new principal, which is the sum of the preceding principal and the interest just added."
- **Profit** (Example 2.7.9, p. 58): "revenue from the sales minus the total production cost."

### Translating words into algebra (p. 54)
"Translating verbal descriptions into algebraic expressions is an essential initial step in solving word problems."
- "the square of the number $x$ is multiplied by 3 and then 10 is added": $3x^2+10$
- salary $s$ "increased by 14 percent": $1.14s$
- $y$ gallons shared so that 1 person gets 1 gallon and the remaining 4 split the rest equally: $\dfrac{y-1}{4}$ each

### Application types ETS covers (under the subheading "Average, Mixture, Rate, and Work Problems", pp. 54–58, plus "Interest", pp. 58–61)
1. **Average (arithmetic mean)**, Example 2.7.4 (pp. 54–55). Scores 82, 74, 90 and an unknown $x$ have mean 85: $\dfrac{82+74+90+x}{4}=\dfrac{246+x}{4}=85$, so $x=94$. ETS stresses that "This initial step of assigning a variable to the quantity that is sought is an important beginning to solving the problem."
2. **Mixture**, Example 2.7.5 (p. 55). A 12-gram mixture of vinegar and oil is 40% vinegar by weight. Adding $x$ grams of oil to make it 25% vinegar gives $\dfrac{(0.40)(12)}{12+x}=0.25$, so $4.8=3+0.25x$ and $x=7.2$ grams. The amount of vinegar stays the same.
3. **Rate (distance)**, Example 2.7.6 (pp. 55–56): "$d=rt$". The distance $d$ in miles equals the rate $r$ in miles per hour times the time $t$ in hours. "since the rates are given in miles per *hour*, it is necessary to express the times in hours." Here 40 minutes $=\frac{40}{60}$ hour. Equal distances give $(51)\left(\frac{40}{60}\right)=(54)\left(\frac{x}{60}\right)$, so $x=\frac{(51)(40)}{54}\approx37.8$ minutes.
4. **Work (combined rates)**, Example 2.7.7 (pp. 56–57). Machine A makes a batch in 3 h, so $\frac13$ batch per hour. Machine B makes a batch in 2 h, so $\frac12$ batch per hour. Together they take $x$ hours, so $\frac1x$ batch per hour. "adding their individual production rates" gives $\dfrac13+\dfrac12=\dfrac1x$, so $\frac56=\frac1x$ and $x=\frac65$ hours, or 1 hour 12 minutes.
5. **System of equations (cost and count)**, Example 2.7.8 (pp. 57–58). Apples cost \$0.15 and pears \$0.20, with 21 pieces costing \$3.80: $0.15a+0.20p=3.80$ and $a+p=21$. Substitution gives $0.05p=0.65$, so $p=13$ pears.
6. **Profit inequality**, Example 2.7.9 (p. 58). Cost is \$30 per radio and 500 are sold at price $y$, with profit over \$8,200: $500(y-30)>8{,}200$, so $500y>23{,}200$ and $y>46.4$. The price must be greater than \$46.40.
7. **Interest** (pp. 58–61). $P$ is the amount invested, $r$ is the annual interest rate **in percent**, $t$ is the number of years, and $V$ is the value at the end of $t$ years.
   - **Simple interest**, "simple annual interest rate of $r$ percent" (p. 58):
     $$V=P\left(1+\frac{rt}{100}\right)$$
   - **Compound interest, compounded annually**, "annual interest rate of $r$ percent, compounded annually" (p. 59):
     $$V=P\left(1+\frac{r}{100}\right)^{t}$$
   - **Compound interest, compounded $n$ times per year** (p. 59):
     $$V=P\left(1+\frac{r}{100n}\right)^{nt}$$
   - Example 2.7.10 (p. 59): \$10,000 at 6% simple interest for $\frac12$ year gives $\$10{,}000\left(1+0.06\left(\frac12\right)\right)=\$10{,}000(1.03)=\$10{,}300$.
   - Example 2.7.11 (pp. 59–60): find $P$ such that $P(1+0.035)^3=\$1{,}000$. Then $P=\dfrac{\$1{,}000}{(1+0.035)^3}\approx\$902$ (nearest dollar).
   - Example 2.7.12 (pp. 60–61): \$20,000 for 1 year compounded quarterly must earn at least \$1,000 interest. So $\$20{,}000\left(1+\frac{r}{400}\right)^4\ge\$21{,}000$, which gives $\left(1+\frac{r}{400}\right)^4\ge1.05$, then $1+\frac{r}{400}\ge\sqrt[4]{1.05}$, so $r\ge400\left(\sqrt[4]{1.05}-1\right)$. Here $400\left(\sqrt[4]{1.05}-1\right)=400\left(\sqrt{\sqrt{1.05}}-1\right)\approx4.9$, so the least rate is about 4.9% per year, compounded quarterly.
   - Facts used (pp. 60–61): taking the positive fourth root, positive square root, "or any other positive root" of each side of an inequality preserves its direction. "for any number $x\ge0$, $\sqrt[4]{x}=\sqrt{\sqrt{x}}$". So the fourth root can be computed by taking the square root twice.

ETS does not present a separate "weighted average" formula in Part 2. Example 2.7.4 is a plain arithmetic mean. *(note, not ETS: weighted mean is covered in Part 4 Data Analysis, if anywhere.)*

### Notation and conventions
- The rate $r$ in the interest formulas is a **percent**, so it is divided by 100. "Quarterly" means $n=4$, which gives $\frac{r}{400}$ (p. 60).
- Money is written with \$ and commas, e.g. \$10,000 (pp. 59–61).
- Answers are rounded as the question asks: "to the nearest dollar", "to the nearest 0.1 percent" (pp. 59–60).

### Gotchas
- Units must agree. Convert minutes to hours when the rate is per hour (p. 56).
- In the mixture problem, only oil is added, so the amount of vinegar stays $(0.40)(12)$ while the total becomes $12+x$ (p. 55).
- For work problems, add the **rates** ($\frac{1}{\text{time}}$), not the times (pp. 56–57).
- "Interest of at least \$1,000" means the final **value** must be at least principal + interest $=\$21{,}000$ (p. 60).
- Profit = revenue − total production cost (p. 58). The conventions add that it does not include other amounts unless they are given.

---

## 2.8 Coordinate Geometry (Math Review pp. 61–72)

### Definitions
- **Rectangular coordinate system**, also called the **$xy$-coordinate system** or **$xy$-plane** (p. 61): "Two real number lines that are perpendicular to each other and that intersect at their respective zero points."
- **$x$-axis** is the horizontal number line, and the **$y$-axis** is the vertical number line (p. 61).
- **Origin** (p. 61): "The point where the two axes intersect," denoted by $O$. The positive half of the $x$-axis is to the right of the origin, and the positive half of the $y$-axis is above it.
- **Quadrants** (p. 62): the four regions into which the axes divide the plane, labeled I, II, III, IV (Algebra Figure 1). I is upper right, II is upper left, III is lower left, and IV is lower right.
- **$x$-coordinate** and **$y$-coordinate** (p. 62): each point $J$ is identified with an ordered pair $(x,y)$ of real numbers and is denoted $J(x,y)$. The first number is the $x$-coordinate and the second is the $y$-coordinate.
- **Reflection** and **symmetry** (p. 63), using $J(4,2)$, $K(-4,2)$, $L(-4,-2)$, $M(4,-2)$:
  - $M$ is the **reflection of $J$ about the $x$-axis**: $M$ and $J$ are **symmetric about the $x$-axis**.
  - $K$ is the **reflection of $J$ about the $y$-axis**: they are **symmetric about the $y$-axis**.
  - $L$ is the **reflection of $J$ about the origin**: they are **symmetric about the origin**.
- **Graph of an equation** (p. 64): "In the $xy$-plane, the graph of an equation in the variables $x$ and $y$ is the set of all points whose ordered pairs $(x,y)$ satisfy the equation."
- **Slope** and **$y$-intercept** (p. 64): "The graph of a linear equation of the form $y=mx+b$ is a straight line in the $xy$-plane, where $m$ is called the slope of the line and $b$ is called the $y$-intercept."
- **$x$-intercepts** (p. 64): "the $x$-coordinates of the points at which the graph intersects the $x$-axis." The **$y$-intercepts** are "the $y$-coordinates of the points at which the graph intersects the $y$-axis." "Sometimes the terms $x$-intercept and $y$-intercept refer to the actual intersection points."
- **Slope through two points** (p. 65): for $Q(x_1,y_1)$ and $R(x_2,y_2)$ with $x_1\neq x_2$, the slope "is defined as"
  $$\frac{y_2-y_1}{x_2-x_1}$$
  This is "often called 'rise over run,' where *rise* is the change in $y$ when moving from $Q$ to $R$ and *run* is the change in $x$ when moving from $Q$ to $R$."
- **Parallel** and **perpendicular** lines (p. 65): "Two lines are parallel if their slopes are equal. Two lines are perpendicular if their slopes are negative reciprocals of each other." Example: $y=2x+5$ is perpendicular to $y=-\frac12x+9$.
- **Line of symmetry** (p. 70): the line $y=x$ is a line of symmetry for the graphs of $y=2x+5$ and $y=\frac12x-\frac52$.
- **Parabola** and **vertex** (pp. 70–71): see below.
- **Circle** (p. 71): see below.

### Facts, rules, formulas
- **Locating a point** (p. 62): the point $(x,y)$ is $|x|$ units to the right of the $y$-axis if $x$ is positive, or $|x|$ units to the left if $x$ is negative. It is $|y|$ units above the $x$-axis if $y$ is positive, or $|y|$ units below if $y$ is negative. "If $x=0$, the point lies on the $y$-axis, and if $y=0$, the point lies on the $x$-axis." The origin is $(0,0)$.
- "**Unless otherwise noted, the units used on the $x$-axis and the $y$-axis are the same.**" (p. 62)
- Points whose coordinates differ only in sign are reflections of one another (p. 63): $(x,y)$ reflected about the $x$-axis is $(x,-y)$, about the $y$-axis is $(-x,y)$, and about the origin is $(-x,-y)$. *(note, not ETS: the general coordinate rule is inferred from the $J,K,L,M$ example; ETS shows only that example.)*
- **Distance between two points** (pp. 63–64): ETS uses the **Pythagorean theorem**, not a named distance formula. For $Q(-2,-3)$ and $R(4,1.5)$, build the right triangle with vertex $S(4,-3)$. The horizontal side is $4-(-2)=6$ and the vertical side is $1.5-(-3)=4.5$, so $QR=\sqrt{6^2+4.5^2}=\sqrt{56.25}=7.5$. This cross-references Geometry, Section 3.3. *(note, not ETS: the general form $d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$ is never written out in the Math Review.)*
- **Midpoint formula: not stated anywhere in Part 2.** *(note, not ETS: do not attribute a midpoint formula to the Math Review.)*
- **Horizontal and vertical lines** (p. 65): "A horizontal line has a slope of 0, since the rise is 0 for any two points on the line. Therefore, the equation of every horizontal line has the form $y=b$, where $b$ is the $y$-intercept. The slope of a vertical line is not defined, since the run is 0. The equation of every vertical line has the form $x=a$, where $a$ is the $x$-intercept."
- **Finding the equation of a line** (Example 2.8.1, pp. 65–66): for $Q(-2,-3)$ and $R(4,1.5)$ the slope is $\frac{1.5-(-3)}{4-(-2)}=\frac{4.5}{6}=0.75$. Substitute a point into $y=0.75x+b$: $-3=(0.75)(-2)+b$, so $b=-1.5$ and the line is $y=0.75x-1.5$. The $y$-intercept read from the graph is only "close to" $-1.5$, and substitution gives the exact value.
- **Finding the $x$-intercept** (p. 67): "you can find the $x$-intercept of a line by setting $y=0$ in an equation of the line and solving it for $x$." For $0=0.75x-1.5$, $x=\frac{1.5}{0.75}=2$.
- **Systems of equations shown graphically** (Example 2.8.2, p. 67): write each equation in the form $y=\dots$: $y=-\frac43x+\frac{13}{3}$ and $y=-\frac12x+1$. "The solution of the system of equations is the point at which the two graphs intersect," here $(4,-1)$ (Algebra Figure 4).
- **Systems of linear inequalities shown graphically** (Example 2.8.3, pp. 68–69): $x-3y\ge-6$ and $2x+y\ge-1$ are equivalent to $y\le\frac13x+2$ and $y\ge-2x-1$. "the graph of $y\le\frac13x+2$ consists of the line $y=\frac13x+2$ and the entire region below it." The graph of $y\ge-2x-1$ "consists of the line $y=-2x-1$ and the entire region *above* it." The solution set is the intersection of the two graphs, which is the shaded region in Algebra Figure 5, "including the two half-lines that form the boundary."
- **Symmetry about $y=x$** (p. 69): "The line $y=x$ passes through the origin, has a slope of 1, and makes a 45-degree angle with each axis. For any point with coordinates $(a,b)$, the point with interchanged coordinates $(b,a)$ is the reflection of $(a,b)$ about the line $y=x$." "It follows that interchanging $x$ and $y$ in the equation of any graph yields another graph that is the reflection of the original graph about the line $y=x$." In Example 2.8.4 (p. 70), $y=2x+5$ becomes $x=2y+5$, which is $y=\frac12x-\frac52$ (Algebra Figure 6).
- **Graphing quadratic equations / parabola** (pp. 70–71): "The graph of a quadratic equation of the form $y=ax^2+bx+c$, where $a$, $b$, and $c$ are constants and $a\neq0$, is a **parabola**."
  - "The $x$-intercepts of the parabola are the solutions of the equation $ax^2+bx+c=0$."
  - "If $a$ is positive, the parabola opens upward and the **vertex** is its lowest point. If $a$ is negative, the parabola opens downward and the vertex is its highest point."
  - "Every parabola that is the graph of a quadratic equation of the form $y=ax^2+bx+c$ is symmetric with itself about the vertical line that passes through its vertex. In particular, the two $x$-intercepts are equidistant from this line of symmetry."
  - Example 2.8.5 (p. 71): $y=x^2-2x-3$ has $x$-intercepts $-1$ and $3$, vertex $(1,-4)$, line of symmetry $x=1$, and $y$-intercept $y=0^2-2(0)-3=-3$ (Algebra Figure 7). "The $y$-intercept is the $y$-coordinate of the point on the parabola at which $x=0$."
  - **No vertex formula** (such as $x=-\frac{b}{2a}$) is stated. *(note, not ETS: ETS finds the vertex from the graph and from symmetry of the intercepts; the axis lies midway between the $x$-intercepts.)*
- **Circles** (pp. 71–72): "The graph of an equation of the form $(x-a)^2+(y-b)^2=r^2$ is a **circle** with its center at the point $(a,b)$ and with radius $r>0$."
  $$ (x-a)^2+(y-b)^2=r^2 $$
  Example 2.8.6 (p. 72): center at the origin with radius 10 gives $x^2+y^2=100$. Center $(6,-5)$ with radius 3 gives $(x-6)^2+(y+5)^2=9$ (Algebra Figure 8).

### Notation and conventions
- A point is written $J(x,y)$. The origin is $O$. Quadrants are Roman numerals I to IV, numbered counterclockwise from the upper right (Algebra Figure 1).
- The axes use the same units unless otherwise noted (p. 62).
- "$x$-intercept" usually means a number (the coordinate), but sometimes means the point (p. 64).

### Gotchas
- The slope formula requires $x_1\neq x_2$. A vertical line has **undefined** slope, not zero slope (p. 65).
- Do not trust a $y$-intercept estimated from a graph. Substitute a point to get the exact value (p. 66).
- Solving the inequalities for $y$ shows which side to shade: "$\le$" means on or below the line and "$\ge$" means on or above it. The boundary lines are included for $\le$ and $\ge$ (pp. 68–69).
- In the circle equation, $(y+5)^2$ means $b=-5$. Note the sign flip, as in $(x-6)^2+(y+5)^2=9$ having center $(6,-5)$ (p. 72).

---

## 2.9 Graphs of Functions (Math Review pp. 72–79)

### Definitions
- **Graphing a function** (p. 72): "To graph a function in the $xy$-plane, you represent each input $x$ and its corresponding output $f(x)$ as a point $(x,y)$, where $y=f(x)$. In other words, you use the $x$-axis for the input and the $y$-axis for the output."
- **Piecewise-defined function** (p. 74): $h(x)=|x|$ can be expressed as
  $$h(x)=\begin{cases} x, & x\ge0\\ -x, & x<0\end{cases}$$
- **Reflection** about the $x$-axis (p. 75): see below.
- **Shifted upward / downward / to the left / to the right** (p. 77), **stretched vertically** and **shrunk vertically** (p. 79): see below.

### Facts, rules, formulas (graphs of elementary functions)
- **Linear function** (Example 2.9.1, p. 72): the graph of $f(x)=-\frac12x+1$ is the line $y=-\frac12x+1$.
- **Quadratic function** (Example 2.9.2, p. 73): the graph of $g(x)=x^2$ is the parabola $y=x^2$.
- **Intersections of two graphs** (pp. 73–74): the graphs of $f$ and $g$ intersect at the points where $g(x)=f(x)$. Setting $x^2=-\frac12x+1$ gives $2x^2+x-2=0$, so $x=\frac{-1\pm\sqrt{1+16}}{4}$. That is, $x=\frac{-1+\sqrt{17}}{4}\approx0.78$ and $x=\frac{-1-\sqrt{17}}{4}\approx-1.28$. The $y$-values come from either $f$ or $g$, giving the intersection points $\approx(0.78,0.61)$ and $(-1.28,1.64)$.
- **Absolute value function** (Example 2.9.3, p. 74): the graph of $h(x)=|x|$ "is V-shaped and consists of two linear pieces, $y=x$ and $y=-x$, joined at the origin" (Algebra Figure 10). This cross-references Arithmetic, Section 1.5.
- **Square root functions** (Example 2.9.4, p. 75):
  - $j(x)=\sqrt{x}$ for $x\ge0$ is the "positive square root function." Its graph is "the upper half of a parabola lying on its side."
  - $k(x)=-\sqrt{x}$ for $x\ge0$ is the "negative square root function." Its graph is "the lower half of the parabola lying on its side."
  - Reason: $y=\sqrt x$ and $y=-\sqrt x$ "are reflections of the right and left halves, respectively, of the parabola $y=x^2$ about the line $y=x$." Squaring gives $y^2=x$, and interchanging $x$ and $y$ gives $y=x^2$ (Algebra Figure 11).
- **Reflection in the $x$-axis** (p. 75): "$y=-\sqrt{x}$ is the reflection of $y=\sqrt{x}$ about the $x$-axis. In general, for any function $h$, the graph of $y=-h(x)$ is the **reflection** of the graph of $y=h(x)$ about the $x$-axis."
- **Vertical shifts** (Example 2.9.5, pp. 75–76): $f(x)=|x|+2$ is $y=|x|$ shifted upward by 2 units (Algebra Figure 12). $k(x)=|x|-5$ is shifted downward by 5 units.
- **Horizontal shifts** (Example 2.9.6, pp. 76–77): $g(x)=(x+1)^2$ is $y=x^2$ shifted **to the left** by 1 unit (Algebra Figure 13). $j(x)=(x-4)^2$ is shifted **to the right** by 4 units.
- "To double-check the direction of a shift, you can plot some corresponding values of the original function and the shifted function." (p. 77)
- **Translation rules** (p. 77): "for any function $h(x)$ and any positive number $c$":
  - The graph of $h(x)+c$ is the graph of $h(x)$ **shifted upward** by $c$ units.
  - The graph of $h(x)-c$ is the graph of $h(x)$ **shifted downward** by $c$ units.
  - The graph of $h(x+c)$ is the graph of $h(x)$ **shifted to the left** by $c$ units.
  - The graph of $h(x-c)$ is the graph of $h(x)$ **shifted to the right** by $c$ units.
- **Combined transformations** (Example 2.9.7, pp. 77–79):
  - $f(x)=2|x-1|$ is $y=|x|$ "shifted to the right by 1 unit and then stretched, or dilated, vertically away from the $x$-axis by a factor of 2" (Algebra Figure 14).
  - $h(x)=\frac12|x-1|$ is $y=|x|$ shifted right 1 unit "and then shrunk, or contracted, vertically toward the $x$-axis by a factor of $\frac12$."
  - $g(x)=-\dfrac{x^2}{4}$ is $y=x^2$ "contracted vertically toward the $x$-axis by a factor of $\frac14$ and then reflected in the $x$-axis" (Algebra Figure 15).
- **Stretch and shrink rules** (p. 79): "for any function $h(x)$ and any positive number $c$":
  - The graph of $ch(x)$ is the graph of $h(x)$ **stretched vertically** by a factor of $c$ if $c>1$.
  - The graph of $ch(x)$ is the graph of $h(x)$ **shrunk vertically** by a factor of $c$ if $0<c<1$.
- ETS covers only **vertical** stretches and shrinks. Horizontal stretches such as $h(cx)$ are not covered. *(note, not ETS.)*

### Notation and conventions
- The shift and stretch rules are stated for a **positive** $c$ (pp. 77, 79).
- Dashed curves in the figures show the original graph and solid curves show the transformed graph (Figures 12–15).
- Domain restrictions are written next to the definition, e.g. "$j(x)=\sqrt{x}$ for $x\ge0$" (p. 75).

### Gotchas
- **The horizontal shift goes against the sign**: $h(x+c)$ moves **left** and $h(x-c)$ moves **right** (p. 77). ETS suggests plotting a few values to double-check (p. 77).
- A negative factor reflects the graph in the $x$-axis: $-h(x)$ (p. 75), as in $-\frac{x^2}{4}$ (p. 78).
- Order matters in the worked descriptions. ETS states "shifted ... and then stretched" and "contracted ... and then reflected" (p. 78).

---

## Algebra Exercises (pp. 80–85) and Answers (pp. 86–91)

**Exercise styles**: The 21 exercises cover these types:
- translate words into expressions (Ex. 1)
- simplify polynomials and rational expressions (Ex. 2)
- evaluate functions, including $\frac{y}{|y|}$ (Ex. 3–4)
- simplify with the exponent rules (Ex. 5)
- solve linear and quadratic equations (Ex. 6)
- solve 2×2 linear systems (Ex. 7)
- solve linear inequalities (Ex. 8)
- word problems: digits, ratio, percent increase, ticket prices, simple interest split, opposite-direction travel, charter cost per person, profit expressions (Ex. 9–16)
- coordinate geometry with a right triangle: coordinates, lengths, perimeter, area, line equation (Ex. 17)
- slope, intercepts and line equations (Ex. 18)
- parabola intercepts and vertex (Ex. 19)
- circle center, radius and area (Ex. 20)
- domain and graph descriptions for a constant, a linear, a quadratic, a square-root and an $x+|x|$ function (Ex. 21)

Answers are short final values or expressions, sometimes with an equivalent alternative form ("or ..."). The answer to Ex. 21(e) rewrites $x+|x|$ as the piecewise function $2x$ for $x\ge0$ and $0$ for $x<0$, and notes that "Every nonpositive number is an $x$-intercept" (p. 91).

---

## Relevant Math Conventions

Source: *Math Conventions for the GRE General Test* (© 2024 ETS), `conventions.pdf`. Printed page numbers equal PDF page numbers in this document.

**General (p. 2)**
- The symbols and terminology are "conventional at the high school level, and most of these appear in the Math Review. Whenever nonstandard or special notation or terminology is used in a test question, it is explicitly introduced in the question."

**Numbers and Quantities (p. 4)**
- 1. "All numbers used in the test questions are real numbers." Integers, rational numbers and irrational numbers are considered, "but imaginary numbers are not." "all quantities are real numbers, although quantities may involve units of measurement." This is why a quadratic with a negative value under the root has no solution on the test.
- 3. "a two-digit integer": the counted digits are the ones digit and all digits to the left, and the leftmost digit is not 0. For example, 031 is not a three-digit integer. This is relevant to digit word problems such as Ex. 9.
- 5. Rounding: a positive number halfway between two possibilities is rounded to the greater one (23.5 → 24). A negative number is rounded to the lesser one ($-36.5\to-37$). This is relevant to "nearest dollar" and "nearest 0.1 percent" answers.
- 12. "The integer 0 is neither positive nor negative" (p. 5).

**Mathematical Expressions, Symbols, and Variables (pp. 5–7)**
- 1 (p. 5). "italic letters like $x$ are used to denote numbers, constants, and variables. Letters are also used to label various objects, such as line $\ell$, point $P$, function $f$, ... The meaning of a letter is determined by the context."
- 2 (pp. 5–6). "When numbers, constants, or variables are given, their possible values are all real numbers unless otherwise restricted." Example restrictions: $n$ is a nonzero integer; $1\le x<\pi$; $T$ is the tens digit of a two-digit positive integer, so $T$ is an integer from 1 to 9.
- 3 (p. 6). Standard symbols are $+,-,\times,\div$. "multiplication is usually denoted by juxtaposition, often with parentheses," e.g. $2y$ and $(3)(4.5)$. "division is usually denoted with a horizontal fraction bar," e.g. $\frac{w}{3}$. Mixed numbers are sometimes used, such as $4\frac38=\frac{35}{8}$ and $-10\frac12=-\frac{21}{2}$. Exponents: $2^{10}=1{,}024$, $10^{-2}=\frac{1}{100}$, and "$x^0=1$ for all nonzero numbers $x$."
- 4 (p. 6). **Order of operations**: "parentheses, exponentiation, negation, multiplication and division (from left to right), addition and subtraction (from left to right)." For example, $1+2\times4=9$. Also, "$-3^2$ means 'the negative of "3 squared"' because exponentiation takes precedence over negation. Therefore, $-3^2=-9$, but $(-3)^2=9$." This matches Case 4 of 2.2.
- 5 (pp. 6–7). Standard symbols:
  - $x\le y$: $x$ is less than or equal to $y$
  - $x\neq y$: $x$ is not equal to $y$
  - $x\approx y$: $x$ is approximately equal to $y$
  - $|x|$: the absolute value of $x$
  - $\sqrt{x}$: "the nonnegative square root of $x$, where $x\ge0$"
  - $-\sqrt{x}$: "the negative square root of $x$, where $x>0$"
  - $n!$: $n$ factorial
  - $k\parallel m$: lines $k$ and $m$ are parallel
  - $k\perp m$: lines $k$ and $m$ are perpendicular
  - $\angle B$: angle $B$
- 6 (p. 7). "Because all numbers are assumed to be real, some expressions are not defined": $\frac{x}{0}$ for every $x$; $\sqrt{x}$ if $x<0$; $0^0$. These are the basis for domain restrictions.
- 7 (p. 7). Special operations may be defined in a question. Examples: $r\lozenge s=\dfrac{rs}{1+r^2}$ for all integers $r,s$, and $\sim x=-\dfrac1x$ for all nonzero $x$.
- 8 (p. 7). "Sometimes juxtaposition of letters does *not* denote multiplication," as with a three-digit integer $BCD$ whose digits are $B$, $C$, $D$. Context decides.
- 9 (p. 7). **Function notation**:
  - Example A: "$g$ is defined for all $x\neq2$ by $g(x)=\dfrac{1}{2-x}$."
  - Example B: "If the domain of a function $f$ is not given explicitly, it is assumed to be the set of all real numbers $x$ for which $f(x)$ is a real number." This matches Math Review p. 53.
  - Example C: "the **composition** of $g$ with $f$ is denoted by $g(f(x))$." Composition does not appear in Part 2 of the Math Review.

**Geometry (p. 8)**
- 2. "Lines are assumed to be 'straight' lines that extend in both directions without end." This applies to lines in the $xy$-plane.
- 6. "The distance between a point and a line is the length of the perpendicular line segment from the point to the line."

**Geometric Figures (p. 9)**
- 4. "Geometric figures are not necessarily drawn to scale." Base answers on geometric reasoning, not on estimates by sight. This contrasts with coordinate systems, which *are* drawn to scale; see below.

**Coordinate Systems (pp. 11–12)**
- 1. "Coordinate systems, such as $xy$-planes and number lines, are drawn to scale. Therefore, you can read, estimate, or compare quantities in such figures by sight or by measurement, including geometric figures that appear in coordinate systems."
- 2. A horizontal number line has its positive direction to the right, and a vertical one has its positive direction upward, unless otherwise noted.
- 3. "As in geometry, distances in a coordinate system are nonnegative."
- 4. "The $xy$-plane may also be referred to as the rectangular coordinate plane or the rectangular coordinate system."
- 5. The $x$-axis is horizontal with its positive direction to the right. The $y$-axis is vertical with its positive direction upward. "The units on the $x$-axis have the same length as the units on the $y$-axis unless otherwise noted." The axes meet at the origin $O$ and partition the plane into four quadrants (Conventions Figure 5).
- 6 (p. 12). Each point has coordinates $(x,y)$. For example, $P(2,-8)$ is 2 units right of the $y$-axis and 8 units below the $x$-axis.
- 7 (p. 12). "Intermediate grid lines or tick marks in a coordinate system are evenly spaced unless otherwise noted."
- 8 (p. 12). "The term $x$-intercept refers to the $x$-coordinate of the point at which a graph in the $xy$-plane intersects the $x$-axis. The term $y$-intercept is used analogously. Sometimes the terms $x$-intercept and $y$-intercept refer to the actual intersection points."

**Sets, Lists, and Sequences (pp. 12–13)**
- 1. Solution sets are sets: repetitions do not count and order does not matter. The empty set is $\emptyset$. *(note, not ETS: relevance to solution sets is my inference.)*
- 4 (p. 13). A sequence may be given by a formula for the $n$th term, e.g. $b_n=2n-1$.
- 5 (p. 13). "the integers from 0 to 9, inclusive" refers to 10 integers, "with or without 'inclusive' at the end."

**Data and Statistics (p. 13)**
- 2. "average (arithmetic mean)" is the sum of the data divided by the number of data. Without the qualifier "arithmetic mean," "average can refer to a rate or the ratio of one quantity to another, as in 'average number of miles per hour'." This is relevant to the average-score and average-speed problems in 2.7.

**Miscellaneous Guidelines (pp. 17–18)**
- 1 (p. 17). "Numbers given in a question are to be used as exact numbers, even though in some real-life settings they are likely to have been rounded."
- 2 (p. 17). An integer given as the number of certain objects is taken as the total number of such objects. Fractions and percents are read the same way.
- 3 (p. 17). For an approximate multiple-choice answer with no stated degree of approximation, the correct choice is the one "closest in value to the quantity that can be computed from the information given."
- 4 (p. 17). "difference between two quantities" means the positive difference, unless otherwise indicated.
- 5 (p. 17). "**profit** ... refers to gross profit, which is the sales revenue minus the cost of production or acquisition. The profit does not involve any other amounts unless they are explicitly given." This matches Example 2.7.9 and Ex. 16.
- 7 (pp. 17–18). "In questions involving real-life scenarios in which a variable is given to represent a number of existing objects or a monetary amount, the context implies that the variable is greater than 0 unless otherwise noted." Example: in "Jane sold $x$ rugs ... profit of $y$ dollars," $x>0$ and $y>0$.
- 8 (p. 18). Unit conversions are given in the question unless they are common, "such as the relationships between minutes and hours, dollars and cents, and metric units." This matches the minutes-to-hours conversion in Example 2.7.6.
- 9 (p. 18). A question may contain information that is not needed.
- 10 (p. 18). "do not introduce unwarranted assumptions." For example, trip times are unaffected by time zones or daylight saving time unless these are mentioned, and sales tax is not included unless mentioned.
- 13 (p. 18). In a phrase that mixes words and math, interpret each mathematical expression *separately* first. "the sum of the first two consecutive integers greater than $n+6$" means $(n+7)+(n+8)$, not $(n+1)+(n+2)+6$. "for all $x\ge0$" is shorthand for "for all numbers $x$ such that $x\ge0$."
