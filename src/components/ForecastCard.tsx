import { useState } from "react";
import { shareForecast } from "@/lib/share";
import type { ForecastEntry } from "@/context/UserContext";

const RU_DATE = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

function formatDay(day: string) {
  const [y, m, d] = day.split("-").map(Number);
  return RU_DATE.format(new Date(y!, (m ?? 1) - 1, d ?? 1));
}

/** Одна запись ленты ежедневных прогнозов. */
export function ForecastCard({ entry }: { entry: ForecastEntry }) {
  const [notice, setNotice] = useState<string | null>(null);

  async function onShare() {
    const result = await shareForecast({
      date: formatDay(entry.day),
      personName: entry.personName,
      arcana: entry.arcana,
      text: entry.text,
    });
    setNotice(result.ok ? "Текст скопирован в буфер обмена" : "Не удалось скопировать");
    setTimeout(() => setNotice(null), 2500);
  }

  return (
    <article className="border border-border p-3">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-xs text-muted-foreground">
          {formatDay(entry.day)} · {entry.personName}
        </div>
        <div className="text-xs text-foreground">Аркан дня: {entry.arcana}</div>
      </header>
      <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{entry.text}</p>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onShare}
          className="border border-border px-2 py-1 text-xs text-foreground hover:bg-accent"
        >
          Поделиться
        </button>
        {notice && <span className="text-xs text-muted-foreground">{notice}</span>}
      </div>
    </article>
  );
}
