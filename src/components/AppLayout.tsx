import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

/** Обёртка приложения: панель слева, контент справа. */
export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Десктоп: фиксированная панель */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden lg:block">
        <Sidebar />
      </aside>

      {/* Мобильный: выезжающая панель с затемнением */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div className="absolute inset-y-0 left-0">
            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label="Открыть меню"
        onClick={() => setOpen(true)}
        className="fixed left-3 top-3 z-40 rounded-lg border border-border bg-background p-2 text-foreground lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1 lg:ml-[260px]">
        <div className="pt-14 lg:pt-0">{children}</div>
      </div>
    </div>
  );
}
