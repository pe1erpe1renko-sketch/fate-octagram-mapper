import { useState } from "react";
import { getSectionTexts, type ResolvedSlotText } from "@/lib/contentLayer";
import type { SectionData } from "@/lib/contentPositions";

/** Раскрывающийся бесплатный раздел: тексты грузятся при первом раскрытии. */
export function SectionAccordion({ section }: { section: SectionData }) {
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState<ResolvedSlotText[] | null>(null);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && !slots && !loading) {
      setLoading(true);
      try {
        const filled = await getSectionTexts(section);
        setSlots(filled.slots);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="border border-border">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left hover:bg-accent"
        onClick={toggle}
        aria-expanded={open}
      >
        <span>
          <span className="block text-sm font-medium text-foreground">{section.title}</span>
          <span className="block text-xs text-muted-foreground">{section.lead}</span>
        </span>
        <span className="text-muted-foreground">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="border-t border-border px-4 py-3">
          {loading || !slots ? <SectionSkeleton /> : <SlotList slots={slots} />}
        </div>
      )}
    </div>
  );
}

function SlotList({ slots }: { slots: ResolvedSlotText[] }) {
  return (
    <div className="flex flex-col gap-5">
      {slots.map((slot) => (
        <article key={slot.key}>
          <h3 className="text-sm font-medium text-foreground">
            {slot.label} — аркан {slot.arcana}
          </h3>
          {slot.text.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="flex flex-col gap-2" aria-hidden>
      {[90, 100, 96, 70].map((w, i) => (
        <div key={i} className="h-3 animate-pulse bg-muted" style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}
