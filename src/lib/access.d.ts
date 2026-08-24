export type PlanId = "free" | "single" | "path" | "circle" | "nolimit";
export type PlanFeature = "unlockSections" | "forecasts" | "chatPerDay" | "dates";

export interface Plan {
  id: PlanId;
  title: string;
  price: number;
  period: "once" | "month" | null;
  dates: number;
  forecasts: number;
  chatPerDay: number;
  unlockSections: boolean;
}

export const PLANS: Plan[];
export const DEFAULT_PLAN_ID: PlanId;
export function getPlan(planId?: string): Plan;
export function getCurrentPlan(planId?: string): Plan;
export function hasAccess(feature: PlanFeature, planId?: string): boolean;
export function canAddDate(count: number, planId?: string): boolean;
export const PLAN_FEATURES: Record<Exclude<PlanId, "free">, string[]>;
