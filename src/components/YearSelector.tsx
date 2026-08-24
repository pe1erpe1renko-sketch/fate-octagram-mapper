import { useEffect, useState } from "react";
import { getText } from "@/lib/contentLayer";
import { textKey } from "@/lib/contentPositions";
import type { Matrix, TimelinePoint } from "@/lib/matrixEngine";
import { SectionSkeleton } from "./SectionAccordion";

const SLOT_ID = "year_energy";
const SLOT_LABEL = "Энергия периода";
const SECTION_TITLE = "Разбор по годам";
const SECTION_LEAD = "Энергия текущего и будущих периодов вашей жизни.";

const fmt = (n: number) => String(n).replace(".", ",");
const periodLabel = (point: TimelinePoint) => `${fmt(point.age)}–${fmt(point.age + 2.5)} лет`;

export function YearSelector({ matrix }: { matrix: Matrix }) {
  const currentIndex = Math.max(
    0,
    matrix.timeline.findIndex((p) => p.age === matrix.today.from),
  );
  const [index, setIndex] = useState(currentIndex);
  const [text, setText] = useState<string | null>(null);

  const point = matrix.timeline[index] ?? matrix.timeline[0]!;

  useEffect(() => {
    let active = true;
    setText(null);
    getText({
      key: textKey(SLOT_ID, point.arcana),
      slotLabel: SLOT_LABEL,
      arcana: point.arcana,
      sectionTitle: SECTION_TITLE,
      sectionLead: SECTION_LEAD,
    }).then((result) => {
      if (active) setText(result.text);
    });
    return () => {
      active = false;
    };
  }, [point.arcana]);

  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-foreground">{SECTION_TITLE}</h2>
      <p className="text-xs text-muted-foreground">{SECTION_LEAD}</p>

      <select
        className="mt-3 border border-border bg-background px-2 py-1 text-sm"
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        aria-label="Период жизни"
      >
        {matrix.timeline.map((p, i) => (
          <option key={p.age} value={i}>
            {periodLabel(p)}
            {i === currentIndex ? " — текущий" : ""}
          </option>
        ))}
      </select>

      <p className="mt-3 text-sm text-foreground">
        Аркан периода: <span className="font-semibold tabular-nums">{point.arcana}</span>
      </p>

      <div className="mt-2">
        {text === null ? (
          <SectionSkeleton />
        ) : (
          text.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))
        )}
      </div>
    </section>
  );
}
