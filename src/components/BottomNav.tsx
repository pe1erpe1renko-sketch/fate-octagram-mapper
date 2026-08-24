import { Link } from "@tanstack/react-router";

const ITEMS = [
  { to: "/cabinet", label: "Матрица", icon: "◇", exact: true },
  { to: "/cabinet/forecast", label: "Прогноз", icon: "◷", exact: false },
  { to: "/cabinet/chat", label: "Чат", icon: "💬", exact: false },
  { to: "/cabinet/profile", label: "Профиль", icon: "☺", exact: false },
] as const;

/** Нижняя навигация как в мобильном приложении — видна на всех экранах. */
export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background">
      <ul className="mx-auto flex max-w-3xl">
        {ITEMS.map((item) => (
          <li key={item.to} className="flex-1">
            <Link
              to={item.to}
              activeOptions={{ exact: item.exact }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-0.5 py-2 text-[11px]"
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
