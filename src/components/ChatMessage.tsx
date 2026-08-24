import type { ChatTurn } from "@/context/UserContext";

/** Одно сообщение в чате. */
export function ChatMessage({ turn }: { turn: ChatTurn }) {
  const mine = turn.role === "user";
  return (
    <div className={mine ? "flex justify-end" : "flex justify-start"}>
      <div
        className={
          "max-w-[80%] whitespace-pre-wrap border px-3 py-2 text-sm " +
          (mine
            ? "border-border bg-muted text-foreground"
            : "border-border bg-background text-foreground")
        }
      >
        {turn.content}
      </div>
    </div>
  );
}
