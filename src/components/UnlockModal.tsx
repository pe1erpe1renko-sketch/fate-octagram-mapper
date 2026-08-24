import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SectionData } from "@/lib/contentPositions";

const RU_DATE = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

interface UnlockModalProps {
  section: SectionData | null;
  /** Дата рождения в формате YYYY-MM-DD. */
  birthDate: string;
  onClose: () => void;
}

/** Пейволл внутри раздела: показывает, что уже готово и чего не хватает. */
export function UnlockModal({ section, birthDate, onClose }: UnlockModalProps) {
  const open = section !== null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-md">
        {section && (
          <>
            <DialogHeader>
              <DialogTitle className="text-base">{section.title}</DialogTitle>
              <DialogDescription>Посчитано всё, кроме текста</DialogDescription>
            </DialogHeader>

            <div>
              <div className="h-2 w-full bg-muted">
                <div className="h-2 w-3/4 bg-foreground" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">3 из 4</p>
            </div>

            <ul className="flex flex-col gap-1 text-sm text-foreground">
              <Step done>Дата принята: {RU_DATE.format(new Date(birthDate))}</Step>
              <Step done>Матрица построена — все точки посчитаны</Step>
              <Step done>Раздел выбран: «{section.title}»</Step>
              <Step>Осталось: текст по этим арканам</Step>
            </ul>

            <p className="text-xs text-muted-foreground">
              {section.slots.map((slot) => `${slot.label} — аркан ${slot.arcana}`).join(", ")}
            </p>

            <Link
              to="/pricing"
              className="border border-border bg-muted px-3 py-2 text-center text-sm text-foreground hover:bg-accent"
            >
              Открыть полный доступ
            </Link>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Step({ done, children }: { done?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      {done ? (
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
      ) : (
        <span className="mt-0.5 w-4 shrink-0 text-center text-muted-foreground" aria-hidden>
          ·
        </span>
      )}
      <span className={done ? "" : "text-muted-foreground"}>{children}</span>
    </li>
  );
}
