import type { Part } from "./types";

export interface OutlineEntry {
  id: string;
  number: string;
  title: string;
  part: Part;
}

export const PART_TITLES: Record<Part, string> = {
  arithmetic: "Arithmetic",
  algebra: "Algebra",
  geometry: "Geometry",
  "data-analysis": "Data Analysis",
};

// Section list of the ETS GRE Math Review.
export const OUTLINE: OutlineEntry[] = [
  { id: "1-1-integers", number: "1.1", title: "Integers", part: "arithmetic" },
  { id: "1-2-fractions", number: "1.2", title: "Fractions", part: "arithmetic" },
  { id: "1-3-exponents-and-roots", number: "1.3", title: "Exponents and Roots", part: "arithmetic" },
  { id: "1-4-decimals", number: "1.4", title: "Decimals", part: "arithmetic" },
  { id: "1-5-real-numbers", number: "1.5", title: "Real Numbers", part: "arithmetic" },
  { id: "1-6-ratio", number: "1.6", title: "Ratio", part: "arithmetic" },
  { id: "1-7-percent", number: "1.7", title: "Percent", part: "arithmetic" },
  { id: "2-1-algebraic-expressions", number: "2.1", title: "Algebraic Expressions", part: "algebra" },
  { id: "2-2-rules-of-exponents", number: "2.2", title: "Rules of Exponents", part: "algebra" },
  { id: "2-3-linear-equations", number: "2.3", title: "Solving Linear Equations", part: "algebra" },
  { id: "2-4-quadratic-equations", number: "2.4", title: "Solving Quadratic Equations", part: "algebra" },
  { id: "2-5-linear-inequalities", number: "2.5", title: "Solving Linear Inequalities", part: "algebra" },
  { id: "2-6-functions", number: "2.6", title: "Functions", part: "algebra" },
  { id: "2-7-applications", number: "2.7", title: "Applications", part: "algebra" },
  { id: "2-8-coordinate-geometry", number: "2.8", title: "Coordinate Geometry", part: "algebra" },
  { id: "2-9-graphs-of-functions", number: "2.9", title: "Graphs of Functions", part: "algebra" },
  { id: "3-1-lines-and-angles", number: "3.1", title: "Lines and Angles", part: "geometry" },
  { id: "3-2-polygons", number: "3.2", title: "Polygons", part: "geometry" },
  { id: "3-3-triangles", number: "3.3", title: "Triangles", part: "geometry" },
  { id: "3-4-quadrilaterals", number: "3.4", title: "Quadrilaterals", part: "geometry" },
  { id: "3-5-circles", number: "3.5", title: "Circles", part: "geometry" },
  { id: "3-6-three-dimensional-figures", number: "3.6", title: "Three-Dimensional Figures", part: "geometry" },
  { id: "4-1-presenting-data", number: "4.1", title: "Methods for Presenting Data", part: "data-analysis" },
  { id: "4-2-describing-data", number: "4.2", title: "Numerical Methods for Describing Data", part: "data-analysis" },
  { id: "4-3-counting-methods", number: "4.3", title: "Counting Methods", part: "data-analysis" },
  { id: "4-4-probability", number: "4.4", title: "Probability", part: "data-analysis" },
  { id: "4-5-distributions", number: "4.5", title: "Distributions, Random Variables, and Probability Distributions", part: "data-analysis" },
  { id: "4-6-data-interpretation", number: "4.6", title: "Data Interpretation Examples", part: "data-analysis" },
];
