import { useState } from "react";
import { isValidEmail, sendMagicLink } from "@/lib/auth";
import { useUser } from "@/context/UserContext";

/** Вход без пароля: письмо со ссылкой + демо-вход. */
export default function Login() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Проверьте адрес почты");
      return;
    }
    setError(null);
    setSending(true);
    await sendMagicLink(email);
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <main className="mx-auto max-w-sm px-4 py-16 font-sans">
        <h1 className="text-lg font-semibold text-foreground">Ссылка отправлена на почту</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Мы отправили ссылку для входа на {email}. Откройте письмо и перейдите по ссылке.
        </p>
        <button
          type="button"
          onClick={() => login(email)}
          className="mt-6 w-full border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent"
        >
          Войти в демо-режиме
        </button>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-2 w-full px-3 py-2 text-xs text-muted-foreground hover:underline"
        >
          Изменить адрес
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-sm px-4 py-16 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Вход в личный кабинет</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Пароль не нужен — отправим ссылку для входа на почту.
      </p>
      <form className="mt-6 flex flex-col gap-2" onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="border border-border bg-background px-3 py-2 text-sm text-foreground"
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
        <button
          type="submit"
          disabled={sending}
          className="border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent disabled:opacity-60"
        >
          {sending ? "Отправляем…" : "Получить ссылку для входа"}
        </button>
      </form>
    </main>
  );
}
