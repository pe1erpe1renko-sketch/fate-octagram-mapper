import type { SectionData } from "@/lib/contentPositions";
import { SectionAccordion } from "./SectionAccordion";
import { LockedSection } from "./LockedSection";

interface SectionListProps {
  sections: SectionData[];
}

export function SectionList({ sections }: SectionListProps) {
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-foreground">Разделы разбора</h2>
      <div className="mt-3 flex flex-col gap-2">
        {sections.map((section) =>
          section.locked ? (
            <LockedSection key={section.id} section={section} />
          ) : (
            <SectionAccordion key={section.id} section={section} />
          ),
        )}
      </div>
    </section>
  );
}
