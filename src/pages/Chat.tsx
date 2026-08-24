import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { calculateMatrix } from "@/lib/matrixEngine";
import { sendMessage } from "@/lib/chat";
import { useAccess } from "@/context/AccessContext";
import { useUser } from "@/context/UserContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { ChatMessage } from "@/components/ChatMessage";

const toIso = (date: string) => date.split("-").reverse().join("-");

export default function Chat() {
  const { plan } = useAccess();
  const { user, savedDates, chat, appendChat, chatUsedToday, countChatMessage } = useUser();
  const { openAuth } = useAuthModal();
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const matrix = useMemo(() => {
    const first = savedDates[0];
    return first ? calculateMatrix(toIso(first.date)) : null;
  }, [savedDates]);

  const limit = plan.chatPerDay;
  const left = Math.max(0, limit - chatUsedToday);

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
        <h1 className="text-lg font-semibold text-foreground">Чат</h1>
        <p className="mt-3 rounded-lg border border-border p-4 text-sm text-muted-foreground">
          Войдите, чтобы начать общение.
        </p>
        <button
          type="button"
          onClick={() => openAuth("login")}
          className="mt-3 inline-block rounded-md border border-border bg-muted px-3 py-1.5 text-sm text-foreground hover:bg-accent"
        >
          Войти
        </button>
      </main>
    );
  }

  if (limit === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
        <h1 className="text-lg font-semibold text-foreground">Чат</h1>
        <p className="mt-3 border border-border p-3 text-sm text-muted-foreground">
          Чат с эзотериком доступен на тарифе «Свой путь» и выше — 10 сообщений в день и больше.
        </p>
        <Link
          to="/pricing"
          className="mt-3 inline-block border border-border bg-muted px-3 py-1.5 text-sm text-foreground hover:bg-accent"
        >
          Посмотреть тарифы
        </Link>
      </main>
    );
  }

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value || pending || left <= 0) return;

    appendChat({ role: "user", content: value });
    countChatMessage();
    setText("");
    setPending(true);
    const reply = await sendMessage(value, chat, { matrix });
    appendChat({ role: "assistant", content: reply.content });
    setPending(false);
    inputRef.current?.focus();
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-col px-4 py-8 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Чат</h1>
      <p className="mt-1 text-xs text-muted-foreground">
        Осталось сообщений сегодня: {left} из {limit}
      </p>

      <section className="mt-4 flex min-h-[240px] flex-col gap-2">
        {!chat.length && (
          <p className="text-sm text-muted-foreground">
            Задайте вопрос — обсудим спокойно, опираясь на вашу матрицу.
          </p>
        )}
        {chat.map((turn, i) => (
          <ChatMessage key={i} turn={turn} />
        ))}
        {pending && <p className="text-xs text-muted-foreground">Печатает…</p>}
      </section>

      {left > 0 ? (
        <form className="mt-4 flex gap-2" onSubmit={onSend}>
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ваш вопрос"
            className="flex-1 border border-border bg-background px-3 py-2 text-sm text-foreground"
          />
          <button
            type="submit"
            disabled={pending}
            className="border border-border bg-muted px-3 py-2 text-sm text-foreground hover:bg-accent disabled:opacity-60"
          >
            Отправить
          </button>
        </form>
      ) : (
        <div className="mt-4 border border-border p-3 text-sm text-muted-foreground">
          Дневной лимит исчерпан, он обновится в полночь.{" "}
          <Link to="/pricing" className="underline">
            Больше сообщений
          </Link>
        </div>
      )}
    </main>
  );
}
