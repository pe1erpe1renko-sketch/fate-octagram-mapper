import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { calculateMatrix, toArcana } from "@/lib/matrixEngine";
import { getText } from "@/lib/contentLayer";
import { useAccess } from "@/context/AccessContext";
import { useUser, type ForecastEntry } from "@/context/UserContext";
import { ForecastCard } from "@/components/ForecastCard";

const toIso = (date: string) => date.split("-").reverse().join("-");

/** Последние 7 дней, новые первыми. */
function lastWeek(): string[] {
  const days: string[] = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

/** Аркан дня: сумма цифр календарного дня и центра матрицы. */
function dayArcana(day: string, center: number) {
  const digits = day.replace(/-/g, "").split("").reduce((sum, ch) => sum + Number(ch), 0);
  return toArcana(digits + center);
}

export default function CabinetForecast() {
  const { plan } = useAccess();
  const { savedDates, people, forecasts, addForecasts, addPerson } = useUser();
  const [activeId, setActiveId] = useState("self");
  const [loading, setLoading] = useState(false);

  const canForecast = plan.forecasts > 0 || plan.chatPerDay > 0;
  const hasPeopleTabs = plan.forecasts > 0;

  const self = savedDates[0];
  const tabs = useMemo(
    () => [{ id: "self", name: "Я", date: self?.date ?? "13-07-1998" }, ...people],
    [self, people],
  );
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]!;

  // Демонстрационная лента: 7 записей за последнюю неделю через контентный слой.
  useEffect(() => {
    let cancelled = false;
    const days = lastWeek();
    const needed = days.filter((day) => !forecasts.some((f) => f.id === `${active.id}_${day}`));
    if (!needed.length) return;

    setLoading(true);
    (async () => {
      const matrix = calculateMatrix(toIso(active.date));
      const entries: ForecastEntry[] = await Promise.all(
        needed.map(async (day) => {
          const arcana = dayArcana(day, matrix.core.C);
          const { text } = await getText({
            key: `daily_${arcana}`,
            slotLabel: "Аркан дня",
            arcana,
            sectionTitle: "Прогноз на день",
            sectionLead: "Короткая подсказка на сегодня",
          });
          return {
            id: `${active.id}_${day}`,
            day,
            personId: active.id,
            personName: active.name,
            arcana,
            text,
          };
        }),
      );
      if (!cancelled) {
        addForecasts(entries.sort((a, b) => (a.day < b.day ? 1 : -1)));
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [active, forecasts, addForecasts]);

  const visible = forecasts
    .filter((f) => f.personId === active.id)
    .sort((a, b) => (a.day < b.day ? 1 : -1));

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Прогноз</h1>

      {!canForecast && (
        <p className="mt-3 border border-border bg-muted px-3 py-2 text-xs text-foreground">
          Подписка неактивна. Новые прогнозы появятся после продления.{" "}
          <Link to="/pricing" className="underline">
            Тарифы
          </Link>
        </p>
      )}

      {hasPeopleTabs ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              className={
                "border px-2 py-1 text-xs " +
                (tab.id === active.id
                  ? "border-foreground bg-muted text-foreground"
                  : "border-border text-muted-foreground hover:bg-accent")
              }
            >
              {tab.name}
            </button>
          ))}
          {people.length < plan.forecasts && (
            <button
              type="button"
              onClick={() =>
                addPerson({ name: `Близкий ${people.length + 1}`, date: "13-07-1998" })
              }
              className="border border-dashed border-border px-2 py-1 text-xs text-muted-foreground hover:bg-accent"
            >
              + близкий ({people.length} из {plan.forecasts})
            </button>
          )}
        </div>
      ) : (
        <p className="mt-4 border border-border p-3 text-xs text-muted-foreground">
          Добавьте близких — доступно на тарифе «Близкий круг».{" "}
          <Link to="/pricing" className="underline">
            Посмотреть
          </Link>
        </p>
      )}

      <section className="mt-4 flex flex-col gap-2">
        {loading && !visible.length && (
          <div className="h-24 animate-pulse border border-border bg-muted" />
        )}
        {visible.map((entry) => (
          <ForecastCard key={entry.id} entry={entry} />
        ))}
      </section>

      <p className="mt-4 text-xs text-muted-foreground">
        Архив прогнозов сохраняется навсегда, даже если подписка закончилась.
      </p>
    </main>
  );
}
