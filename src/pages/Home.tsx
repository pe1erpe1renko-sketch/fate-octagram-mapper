import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DateInput } from "@/components/DateInput";
import { ForecastFeed } from "@/components/ForecastFeed";
import { MyMatrices } from "@/components/MyMatrices";

const DEFAULT_DATE = "1998-07-13";

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
      <h1 className="text-xl font-semibold text-foreground">Матрица судьбы по дате рождения</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Введите дату — получите расчёт и разбор бесплатно
      </p>

      <section className="mt-6 flex flex-col gap-4">
        <label className="flex max-w-xs flex-col gap-1 text-xs text-muted-foreground">
          Имя (необязательно)
          <input
            className="border border-border bg-background px-2 py-1 text-sm text-foreground"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
          />
        </label>

        <DateInput
          value={DEFAULT_DATE}
          onSubmit={(birthDate) => {
            const [y, m, d] = birthDate.split("-");
            navigate({
              to: "/matrix/$date",
              params: { date: `${d}-${m}-${y}` },
              search: { name: name.trim() || undefined },
            });
          }}
        />
      </section>

      <ForecastFeed />
      <MyMatrices />
    </main>
  );
}
