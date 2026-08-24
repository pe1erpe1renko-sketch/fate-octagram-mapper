import { Link } from "@tanstack/react-router";

/** Полоса апгрейда после покупки разового разбора. */
export function UpgradeBanner() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-border bg-muted px-4 py-3">
      <p className="text-sm text-foreground">
        Вы открыли одну дату. За 590 ₽ в месяц — три даты, аркан дня, чат и архив.
      </p>
      <Link
        to="/pricing"
        className="shrink-0 border border-border bg-background px-3 py-1 text-sm text-foreground hover:bg-accent"
      >
        Перейти на Свой путь
      </Link>
    </div>
  );
}
