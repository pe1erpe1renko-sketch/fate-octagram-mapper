import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_PLAN_ID,
  canAddDate as canAddDateFor,
  getCurrentPlan,
  hasAccess as hasAccessFor,
  type Plan,
  type PlanFeature,
  type PlanId,
} from "@/lib/access";

interface AccessValue {
  planId: PlanId;
  plan: Plan;
  setPlan: (planId: PlanId) => void;
  /** Разобранные даты в формате DD-MM-YYYY. */
  dates: string[];
  hasAccess: (feature: PlanFeature) => boolean;
  /** Можно ли добавить ещё одну дату (уже добавленные — не считаются заново). */
  canAddDate: (date?: string) => boolean;
  /** Регистрирует дату. false — превышен лимит тарифа. */
  addDate: (date: string) => boolean;
}

const AccessContext = createContext<AccessValue | null>(null);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanId] = useState<PlanId>(DEFAULT_PLAN_ID);
  const [dates, setDates] = useState<string[]>([]);

  const hasAccess = useCallback((feature: PlanFeature) => hasAccessFor(feature, planId), [planId]);

  const canAddDate = useCallback(
    (date?: string) => (date && dates.includes(date) ? true : canAddDateFor(dates.length, planId)),
    [dates, planId],
  );

  const addDate = useCallback(
    (date: string) => {
      let allowed = true;
      setDates((prev) => {
        if (prev.includes(date)) return prev;
        if (!canAddDateFor(prev.length, planId)) {
          allowed = false;
          return prev;
        }
        return [...prev, date];
      });
      return allowed;
    },
    [planId],
  );

  const value = useMemo<AccessValue>(
    () => ({
      planId,
      plan: getCurrentPlan(planId),
      setPlan: setPlanId,
      dates,
      hasAccess,
      canAddDate,
      addDate,
    }),
    [planId, dates, hasAccess, canAddDate, addDate],
  );

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess(): AccessValue {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess должен использоваться внутри <AccessProvider>");
  return ctx;
}
