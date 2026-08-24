/**
 * Type declarations for the untouched JS engine (src/lib/matrixEngine.js).
 * The JS file is the single source of truth for all calculations.
 */

export type PointCode = "W" | "N" | "E" | "S" | "C" | "NW" | "NE" | "SE" | "SW";

export interface PointMeta {
  code: PointCode;
  title: string;
  hint: string;
}

export const POINT_CODES: Record<PointCode, PointMeta>;

export interface Core {
  W: number;
  N: number;
  E: number;
  S: number;
  C: number;
  NW: number;
  NE: number;
  SE: number;
  SW: number;
}

export interface Axis {
  start: number;
  startOuter: number;
  startMid: number;
  startInner: number;
  center: number;
  endMid: number;
  endOuter: number;
  end: number;
}

export interface Ray {
  corner: number;
  outer: number;
  mid: number;
}

export interface TimelinePoint {
  age: number;
  arcana: number;
  kind: "decade" | "half" | "quarter";
}

export interface ChakraRow {
  key: string;
  name: string;
  sphere: string;
  color: string;
  physics: number;
  energy: number;
  emotions: number;
}

export interface Chakras {
  rows: ChakraRow[];
  total: { physics: number; energy: number; emotions: number };
}

export interface AncestralLine {
  first: number;
  second: number;
  result: number;
}

export interface Purpose {
  personal: { sky: number; earth: number; result: number; title: string; hint: string };
  social: { male: number; female: number; result: number; title: string; hint: string };
  spiritual: { result: number; title: string; hint: string };
  planetary: { result: number; title: string; hint: string };
}

export interface Today {
  age: number;
  from: number;
  to: number;
  arcana: number;
  nextArcana: number;
  yearsToChange: number;
}

export interface Matrix {
  birthDate: string;
  core: Core;
  axes: { horizontal: Axis; vertical: Axis };
  diagonals: { NW: Ray; NE: Ray; SE: Ray; SW: Ray };
  chakras: Chakras;
  ancestral: { male: AncestralLine; female: AncestralLine };
  purpose: Purpose;
  timeline: TimelinePoint[];
  today: Today;
}

export function toArcana(n: number): number;
export function calculateMatrix(birthDate: string): Matrix;

