import { Link } from "@tanstack/react-router";
import { MessageCircle, CreditCard, User, Plus, type LucideIcon } from "lucide-react";
import { SidebarUser } from "@/components/SidebarUser";

interface NavItem {
  to: "/chat" | "/pricing" | "/profile";
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  group: string | null;
  items: NavItem[];
}

/** Структура меню: добавление группы требует правки только этого массива. */
export const NAV_ITEMS: NavGroup[] = [
  {
    group: null,
    items: [
      { to: "/chat", label: "Чат", icon: MessageCircle },
      { to: "/pricing", label: "Тарифы", icon: CreditCard },
      { to: "/profile", label: "Профиль", icon: User },
    ],
  },
];

/** Боковая панель: логотип, главное действие, пункты меню, карточка пользователя. */
export function Sidebar({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full w-[260px] flex-col border-r border-border bg-background font-sans">
      <div className="px-5 py-5">
        <Link
          to="/"
          onClick={onNavigate}
          className="text-sm font-semibold tracking-[0.3em] text-foreground"
        >
          MATRIX
        </Link>
      </div>

      <div className="border-t border-border" />

      <div className="px-4 py-4">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Новая матрица
        </Link>
      </div>

      <div className="border-t border-border" />

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {NAV_ITEMS.map((group, i) => (
          <div key={group.group ?? `g${i}`} className="mb-3 last:mb-0">
            {group.group && (
              <div className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                {group.group}
              </div>
            )}
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    activeProps={{ className: "bg-accent text-foreground" }}
                    inactiveProps={{ className: "text-muted-foreground hover:bg-accent/50" }}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-3">
        <SidebarUser onNavigate={onNavigate} />
      </div>
    </div>
  );
}
