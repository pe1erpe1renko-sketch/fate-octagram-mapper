import { useState } from "react";

const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1930 + 1 }, (_, i) => CURRENT_YEAR - i);

const pad = (n: number) => String(n).padStart(2, "0");

/** Число дней в месяце — чтобы селектор дня не предлагал 31 февраля. */
function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

interface DateInputProps {
  /** 'YYYY-MM-DD' */
  value: string;
  onSubmit: (birthDate: string) => void;
}

export function DateInput({ value, onSubmit }: DateInputProps) {
  const [y0, m0, d0] = value.split("-").map(Number);
  const [year, setYear] = useState(y0 ?? 1998);
  const [month, setMonth] = useState(m0 ?? 7);
  const [day, setDay] = useState(d0 ?? 13);

  const maxDay = daysInMonth(month, year);
  const safeDay = Math.min(day, maxDay);

  return (
    <form
      className="flex flex-wrap items-end gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(`${year}-${pad(month)}-${pad(safeDay)}`);
      }}
    >
      <Field label="День">
        <select
          className="border border-border bg-background px-2 py-1 text-sm"
          value={safeDay}
          onChange={(e) => setDay(Number(e.target.value))}
        >
          {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </Field>

      <Field label="Месяц">
        <select
          className="border border-border bg-background px-2 py-1 text-sm"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {MONTHS.map((name, i) => (
            <option key={name} value={i + 1}>{name}</option>
          ))}
        </select>
      </Field>

      <Field label="Год">
        <select
          className="border border-border bg-background px-2 py-1 text-sm"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {YEARS.map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </Field>

      <button
        type="submit"
        className="border border-border bg-muted px-3 py-1 text-sm text-foreground hover:bg-accent"
      >
        Построить матрицу
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted-foreground">
      {label}
      {children}
    </label>
  );
}
