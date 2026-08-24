import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { isValidEmail, registerWithEmail } from "@/lib/auth";
import { useUser } from "@/context/UserContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { SocialButtons } from "./SocialButtons";
import { Divider, FieldIcon } from "./parts";

export function RegisterForm() {
  const { login } = useUser();
  const { closeAuth, setMode } = useAuthModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const canSubmit = terms && consent && !busy;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Введите корректный email");
      return;
    }
    setBusy(true);
    const result = await registerWithEmail(name, email, password);
    login({
      type: "email",
      value: result.identity.value,
      displayName: result.identity.displayName,
    });
    setBusy(false);
    closeAuth();
  }

  return (
    <div>
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
          M
        </span>
        <h2 className="mt-3 text-lg font-semibold text-foreground">Создать аккаунт</h2>
        <p className="mt-1 text-sm text-muted-foreground">Первый разбор матрицы — бесплатно</p>
      </div>

      <div className="mt-5">
        <SocialButtons />
      </div>

      <Divider>ИЛИ ПО EMAIL</Divider>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <FieldIcon icon={User}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            autoComplete="name"
            className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </FieldIcon>

        <FieldIcon icon={Mail}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </FieldIcon>

        <FieldIcon icon={Lock}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            autoComplete="new-password"
            className="w-full bg-transparent py-2.5 pl-9 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </FieldIcon>

        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            Я принимаю{" "}
            <Link to="/terms" className="underline">
              Пользовательское соглашение
            </Link>{" "}
            и{" "}
            <Link to="/privacy" className="underline">
              Политику обработки персональных данных
            </Link>
          </span>
        </label>

        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5"
          />
          <span>Я даю Согласие на обработку персональных данных</span>
        </label>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={!canSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Создать аккаунт
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Демо-режим: авторизация без проверки
      </p>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <button type="button" onClick={() => setMode("login")} className="text-foreground underline">
          Войти
        </button>
      </p>
    </div>
  );
}
