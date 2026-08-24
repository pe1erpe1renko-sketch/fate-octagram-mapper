import type { Today } from "@/lib/matrixEngine";

const DATE_FORMAT = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function DayArcanaCard({ today }: { today: Today }) {
  return (
    <section className="mt-4 border border-border p-4">
      <p className="text-xs text-muted-foreground">{DATE_FORMAT.format(new Date())}</p>
      <h2 className="mt-1 text-base font-semibold text-foreground">
        Аркан дня: {today.arcana}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Текст-заглушка: сегодня энергия аркана {today.arcana} задаёт тон дню. Подробная
        трактовка появится, когда будет подключён контентный слой.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Ваш период: аркан {today.arcana}, до смены {today.yearsToChange} лет.
      </p>
    </section>
  );
}
