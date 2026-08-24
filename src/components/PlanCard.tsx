import { Check } from "lucide-react";
import type { Plan } from "@/lib/access";
import { PLAN_FEATURES } from "@/lib/access";

interface PlanCardProps {
  plan: Plan;
  recommended?: boolean;
  note?: string | undefined;
  active?: boolean;
  onChoose: (planId: Plan["id"]) => void;
}

const PERIOD_LABEL: Record<string, string> = { month: "/мес", once: "разово" };

export function PlanCard({ plan, recommended, note, active, onChoose }: PlanCardProps) {
  const features = PLAN_FEATURES[plan.id as keyof typeof PLAN_FEATURES] ?? [];

  return (
    <div
      className={`flex flex-col gap-3 border p-4 ${
        recommended ? "border-2 border-foreground" : "border-border"
      }`}
    >
      <div>
        {recommended && (
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Рекомендуем</p>
        )}
        <h2 className="text-base font-semibold text-foreground">{plan.title}</h2>
        <p className="mt-1 text-lg text-foreground">
          {plan.price} ₽
          <span className="text-sm text-muted-foreground">
            {" "}
            {PERIOD_LABEL[plan.period ?? ""] ?? ""}
          </span>
        </p>
        {note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}
      </div>

      <ul className="flex flex-1 flex-col gap-1 text-sm text-foreground">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onChoose(plan.id)}
        className="border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent"
      >
        {active ? "Активен" : "Выбрать"}
      </button>
    </div>
  );
}
