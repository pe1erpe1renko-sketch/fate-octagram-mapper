import { Link } from "@tanstack/react-router";
import { LogIn, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";

/**
 * Карточка пользователя внизу панели.
 * Показывает displayName и value из identity, не зная способа входа
 * (email / telegram / vk).
 */
export function SidebarUser({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <Link
        to="/login"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
      >
        <LogIn className="h-4 w-4" />
        Войти
      </Link>
    );
  }

  const { displayName, value } = user.identity;
  const initial = (displayName || value || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
        {initial}
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-sm text-foreground">{displayName}</span>
        <span className="block truncate text-xs text-muted-foreground">{value}</span>
      </span>
      <button
        type="button"
        onClick={logout}
        aria-label="Выйти"
        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
