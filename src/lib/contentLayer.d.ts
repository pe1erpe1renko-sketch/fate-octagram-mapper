/** Types for the untouched JS content layer (src/lib/contentLayer.js). */
import type { ResolvedSlot, SectionData } from "./contentPositions";

export const CONTENT_MODE: "stub" | "live";

export interface SlotContext {
  key: string;
  slotLabel: string;
  arcana: number;
  sectionTitle: string;
  sectionLead?: string;
}

export interface TextResult {
  text: string;
  source: "cache" | "seed" | "generated" | "placeholder";
  error?: string;
}

export type ResolvedSlotText = ResolvedSlot & TextResult;

export function getText(slotContext: SlotContext): Promise<TextResult>;
export function getSectionTexts(
  section: SectionData,
): Promise<Omit<SectionData, "slots"> & { slots: ResolvedSlotText[] }>;
