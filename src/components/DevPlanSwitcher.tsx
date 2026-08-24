import { useAccess } from "@/context/AccessContext";
import { PLANS, type PlanId } from "@/lib/access";

/** Скрытый демонстрационный переключатель тарифа (в подвале). */
export function DevPlanSwitcher() {
  const { planId, setPlan } = useAccess();

  return (
    <footer className="mt-12 border-t border-border px-4 py-4">
      <label className="mx-auto flex max-w-3xl items-center gap-2 text-xs text-muted-foreground">
        DEV: переключение тарифа
        <select
          className="border border-border bg-background px-2 py-1 text-xs text-foreground"
          value={planId}
          onChange={(e) => setPlan(e.target.value as PlanId)}
        >
          {PLANS.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.title}
            </option>
          ))}
        </select>
      </label>
    </footer>
  );
}
