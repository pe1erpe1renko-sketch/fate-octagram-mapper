import { Lock } from "lucide-react";
import type { SectionData } from "@/lib/contentPositions";

interface LockedSectionProps {
  section: SectionData;
  onUnlock: (section: SectionData) => void;
}

/** Закрытый раздел: заголовок и lead видны полностью, без блюра. */
export function LockedSection({ section, onUnlock }: LockedSectionProps) {
  return (
    <div className="flex items-start justify-between gap-3 border border-border px-4 py-3">
      <div className="flex items-start gap-3">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <div>
          <p className="text-sm font-medium text-foreground">{section.title}</p>
          <p className="text-xs text-muted-foreground">{section.lead}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onUnlock(section)}
        className="shrink-0 text-sm text-foreground underline"
      >
        Разблокировать
      </button>
    </div>
  );
}
