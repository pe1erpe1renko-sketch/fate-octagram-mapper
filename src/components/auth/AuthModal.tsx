import { useEffect } from "react";
import { X } from "lucide-react";
import { useAuthModal } from "@/context/AuthModalContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

/** Модалка авторизации: два режима в одном окне, закрытие по Escape и клику вне. */
export function AuthModal() {
  const { open, mode, closeAuth } = useAuthModal();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuth();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeAuth]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={closeAuth}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-lg"
      >
        <button
          type="button"
          onClick={closeAuth}
          aria-label="Закрыть"
          className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
