import { useState } from "react";
import type { SectionData } from "@/lib/contentPositions";
import { SectionAccordion } from "./SectionAccordion";
import { LockedSection } from "./LockedSection";
import { UnlockModal } from "./UnlockModal";

interface SectionListProps {
  sections: SectionData[];
  /** Дата рождения YYYY-MM-DD — показывается в пейволле. */
  birthDate: string;
}

export function SectionList({ sections, birthDate }: SectionListProps) {
  const [paywall, setPaywall] = useState<SectionData | null>(null);

  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-foreground">Разделы разбора</h2>
      <div className="mt-3 flex flex-col gap-2">
        {sections.map((section) =>
          section.locked ? (
            <LockedSection key={section.id} section={section} onUnlock={setPaywall} />
          ) : (
            <SectionAccordion key={section.id} section={section} />
          ),
        )}
      </div>
      <UnlockModal section={paywall} birthDate={birthDate} onClose={() => setPaywall(null)} />
    </section>
  );
}
