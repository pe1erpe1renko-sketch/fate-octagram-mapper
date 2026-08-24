import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlanCard } from "@/components/PlanCard";
import { useAccess } from "@/context/AccessContext";
import { PLANS, getPlan, type PlanId } from "@/lib/access";
import { createPayment } from "@/lib/payment";

const PAID_PLANS = PLANS.filter((plan) => plan.id !== "free");

export default function Pricing() {
  const { planId, setPlan } = useAccess();
  const [chosen, setChosen] = useState<PlanId | null>(null);
  const [pending, setPending] = useState(false);

  async function activateDemo(id: PlanId) {
    setPending(true);
    // Точка подключения провайдера: здесь появится редирект на paymentUrl.
    await createPayment(id);
    setPlan(id);
    setPending(false);
    setChosen(null);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 font-sans">
      <h1 className="text-xl font-semibold text-foreground">
        Откройте полный разбор своей матрицы
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Текущий тариф: {getPlan(planId).title}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PAID_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            recommended={plan.id === "path"}
            note={
              plan.id === "path"
                ? "Всего на 100 ₽ дороже разового — и это уже подписка со всеми возможностями"
                : undefined
            }
            active={plan.id === planId}
            onChoose={(id) => setChosen(id)}
          />
        ))}
      </div>

      <Link
        to="/"
        className="mt-6 inline-block border border-border bg-muted px-3 py-1 text-sm text-foreground hover:bg-accent"
      >
        На главную
      </Link>

      <Dialog open={chosen !== null} onOpenChange={(open) => !open && setChosen(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">
              Оплата подключается на следующем этапе
            </DialogTitle>
            <DialogDescription>
              Тариф «{chosen ? getPlan(chosen).title : ""}». Сейчас можно посмотреть, как выглядит
              доступ, в демо-режиме.
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            disabled={pending}
            onClick={() => chosen && activateDemo(chosen)}
            className="border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent disabled:opacity-60"
          >
            {pending ? "Активируем…" : "Активировать в демо-режиме"}
          </button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
