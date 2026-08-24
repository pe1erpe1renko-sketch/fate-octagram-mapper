import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Разделитель с надписью по центру. */
export function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[10px] tracking-wider text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/** Обёртка поля с иконкой слева. */
export function FieldIcon({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="relative rounded-lg border border-border bg-background">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      {children}
    </div>
  );
}
