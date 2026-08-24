/** Types for the untouched JS map of sections (src/lib/contentPositions.js). */
import type { Matrix } from "./matrixEngine";

export interface SectionSlotDef {
  id: string;
  label: string;
  path: string;
}

export interface SectionDef {
  id: string;
  title: string;
  lead: string;
  access: "free" | "paid";
  dynamic?: string;
  daily?: boolean;
  slots: SectionSlotDef[];
}

export const SECTIONS: SectionDef[];
export const FREE_SECTIONS: SectionDef[];
export const PAID_SECTIONS: SectionDef[];

export interface ResolvedSlot {
  id: string;
  label: string;
  arcana: number;
  key: string;
}

export interface SectionData {
  id: string;
  title: string;
  lead: string;
  access: "free" | "paid";
  locked: boolean;
  slots: ResolvedSlot[];
}

export function resolvePath(matrix: Matrix, path: string): number;
export function textKey(slotId: string, arcana: number): string;
export function buildSectionData(
  matrix: Matrix,
  options?: { unlocked?: boolean },
): SectionData[];
