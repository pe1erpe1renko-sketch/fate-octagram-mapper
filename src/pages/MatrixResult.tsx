import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { calculateMatrix } from "@/lib/matrixEngine";
import { buildSectionData } from "@/lib/contentPositions";
import { Octagram, VIEW_SIZE, type OctagramPoint } from "@/components/Octagram";
import { OctagramLayers, type LayerState } from "@/components/OctagramLayers";
import { ZoomPan } from "@/components/ZoomPan";
import { PointPanel } from "@/components/PointPanel";
import { ChakraTable } from "@/components/ChakraTable";
import { PurposeBlock } from "@/components/PurposeBlock";
import { AncestralBlock } from "@/components/AncestralBlock";
import { SectionList } from "@/components/SectionList";
import { YearSelector } from "@/components/YearSelector";
import { DayArcanaCard } from "@/components/DayArcanaCard";

const MOBILE_BREAKPOINT = 768;

/** Разделы с собственными блоками на странице — в общем списке не дублируются. */
const OWN_BLOCKS = new Set(["year_forecast", "day_arcana"]);

/** 'DD-MM-YYYY' → 'YYYY-MM-DD' | null */
export function parseUrlDate(raw: string): string | null {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(raw);
  if (!match) return null;
  const [, dd, mm, yyyy] = match;
  const day = Number(dd);
  const month = Number(mm);
  const year = Number(yyyy);
  const date = new Date(year, month - 1, day);
  const valid =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  if (!valid || year < 1900 || year > new Date().getFullYear()) return null;
  return `${yyyy}-${mm}-${dd}`;
}

const RU_DATE = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default function MatrixResult({ date, name }: { date: string; name?: string | undefined }) {
  const birthDate = useMemo(() => parseUrlDate(date), [date]);

  if (!birthDate) return <InvalidDate raw={date} />;
  return <Result birthDate={birthDate} name={name} />;
}

function InvalidDate({ raw }: { raw: string }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Некорректная дата</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Не удалось прочитать дату «{raw}». Ожидается формат ДД-ММ-ГГГГ, например 13-07-1998.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block border border-border bg-muted px-3 py-1 text-sm text-foreground hover:bg-accent"
      >
        На главную
      </Link>
    </main>
  );
}

function Result({ birthDate, name }: { birthDate: string; name?: string | undefined }) {
  const matrix = useMemo(() => calculateMatrix(birthDate), [birthDate]);
  const sections = useMemo(
    () => buildSectionData(matrix, { unlocked: false }).filter((s) => !OWN_BLOCKS.has(s.id)),
    [matrix],
  );

  const [selected, setSelected] = useState<OctagramPoint | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [layers, setLayers] = useState<LayerState>({
    timeline: false,
    ancestral: true,
    money: true,
    relations: true,
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  const stageHeight = isMobile ? 420 : 620;
  const [fitZoom, setFitZoom] = useState(1);

  useEffect(() => {
    const measure = () => {
      const width = Math.min(window.innerWidth - 32, 720);
      setFitZoom(Math.min(width / VIEW_SIZE, stageHeight / VIEW_SIZE));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stageHeight]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 font-sans">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {name ? `${name} — матрица судьбы` : "Матрица судьбы"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Дата рождения: {RU_DATE.format(new Date(birthDate))}
          </p>
        </div>
        <Link
          to="/"
          className="border border-border bg-muted px-3 py-1 text-sm text-foreground hover:bg-accent"
        >
          Изменить дату
        </Link>
      </header>

      <DayArcanaCard today={matrix.today} />

      <section className="mt-6">
        <OctagramLayers value={layers} onChange={setLayers} />
        <ZoomPan initialZoom={fitZoom} height={stageHeight}>
          <Octagram
            matrix={matrix}
            layers={layers}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
          />
        </ZoomPan>
      </section>

      <section className="mt-4">
        <PointPanel point={selected} />
      </section>

      <ChakraTable chakras={matrix.chakras} />
      <PurposeBlock purpose={matrix.purpose} />
      <AncestralBlock ancestral={matrix.ancestral} />
      <YearSelector matrix={matrix} />
      <SectionList sections={sections} />
    </main>
  );
}
