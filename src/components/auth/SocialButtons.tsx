import { Send } from "lucide-react";
import { loginWithProvider } from "@/lib/auth";
import { useUser, type Identity } from "@/context/UserContext";
import { useAuthModal } from "@/context/AuthModalContext";

/** Провайдеры входа. Иконки простые, чтобы не тянуть бренд-паки. */
const PROVIDERS = [
  { id: "telegram", label: "Telegram", mark: "TG" },
  { id: "max", label: "MAX", mark: "M" },
  { id: "yandex", label: "Яндекс", mark: "Я" },
  { id: "vk", label: "VK", mark: "VK" },
] as const;

export function SocialButtons() {
  const { login } = useUser();
  const { closeAuth } = useAuthModal();

  async function onClick(provider: string, label: string) {
    const result = await loginWithProvider(provider);
    login({
      type: result.identity.type as Identity["type"],
      value: result.identity.value,
      displayName: result.identity.displayName || label,
    });
    closeAuth();
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {PROVIDERS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onClick(p.id, p.label)}
          className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
        >
          {p.id === "telegram" ? (
            <Send className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[10px] font-semibold text-muted-foreground">
              {p.mark}
            </span>
          )}
          {p.label}
        </button>
      ))}
    </div>
  );
}
