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

export interface Matrix {
  birthDate: string;
  core: Core;
  axes: { horizontal: Axis; vertical: Axis };
  diagonals: { NW: Ray; NE: Ray; SE: Ray; SW: Ray };
  chakras: unknown;
  ancestral: unknown;
  purpose: unknown;
  timeline: TimelinePoint[];
  today: unknown;
}

export function toArcana(n: number): number;
export function calculateMatrix(birthDate: string): Matrix;
