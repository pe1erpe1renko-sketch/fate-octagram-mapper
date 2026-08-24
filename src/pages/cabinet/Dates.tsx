import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { calculateMatrix } from "@/lib/matrixEngine";
import { DateInput } from "@/components/DateInput";
import { useAccess } from "@/context/AccessContext";
import { useUser } from "@/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** 'DD-MM-YYYY' → 'YYYY-MM-DD' */
const toIso = (date: string) => date.split("-").reverse().join("-");

export default function CabinetDates() {
  const { plan } = useAccess();
  const { savedDates, addSavedDate, removeSavedDate } = useUser();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [limitOpen, setLimitOpen] = useState(false);

  const limit = plan.dates === Infinity ? "∞" : plan.dates;
  const canAdd = savedDates.length < plan.dates;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Матрица</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Разобрано дат: {savedDates.length} из {limit}
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {savedDates.map((entry) => (
          <DateCard key={entry.id} entry={entry} onRemove={() => removeSavedDate(entry.id)} />
        ))}
      </ul>

      {adding ? (
        <section className="mt-4 border border-border p-3">
          <label className="flex max-w-xs flex-col gap-1 text-xs text-muted-foreground">
            Имя (необязательно)
            <input
              className="border border-border bg-background px-2 py-1 text-sm text-foreground"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="mt-3">
            <DateInput
              value="1998-07-13"
              onSubmit={(iso) => {
                const [y, m, d] = iso.split("-");
                addSavedDate({ name: name.trim() || "Без имени", date: `${d}-${m}-${y}` });
                setName("");
                setAdding(false);
              }}
            />
          </div>
          <button
            type="button"
            onClick={() => setAdding(false)}
            className="mt-2 text-xs text-muted-foreground hover:underline"
          >
            Отмена
          </button>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => (canAdd ? setAdding(true) : setLimitOpen(true))}
          className="mt-4 border border-border bg-muted px-3 py-1.5 text-sm text-foreground hover:bg-accent"
        >
          Добавить дату
        </button>
      )}

      <Dialog open={limitOpen} onOpenChange={setLimitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Достигнут лимит дат</DialogTitle>
            <DialogDescription>
              На тарифе «{plan.title}» доступно дат: {limit}. Чтобы разбирать больше дат, перейдите
              на расширенный тариф.
            </DialogDescription>
          </DialogHeader>
          <Link
            to="/pricing"
            className="border border-border bg-muted px-3 py-2 text-center text-sm text-foreground hover:bg-accent"
          >
            Посмотреть тарифы
          </Link>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function DateCard({
  entry,
  onRemove,
}: {
  entry: { id: string; name: string; date: string };
  onRemove: () => void;
}) {
  const center = useMemo(() => {
    try {
      return calculateMatrix(toIso(entry.date)).core.C;
    } catch {
      return null;
    }
  }, [entry.date]);

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border border-border p-3">
      <div>
        <div className="text-sm text-foreground">{entry.name}</div>
        <div className="text-xs text-muted-foreground">
          {entry.date.replace(/-/g, ".")}
          {center !== null && ` · центральный аркан ${center}`}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/matrix/$date"
          params={{ date: entry.date }}
          search={{ name: entry.name }}
          className="border border-border px-2 py-1 text-xs text-foreground hover:bg-accent"
        >
          Открыть
        </Link>
        {entry.id !== "self" && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-muted-foreground hover:underline"
          >
            Удалить
          </button>
        )}
      </div>
    </li>
  );
}
