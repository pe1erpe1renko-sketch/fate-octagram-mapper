import { createFileRoute } from "@tanstack/react-router";
import Chat from "@/pages/Chat";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Чат с эзотериком — Матрица судьбы" },
      {
        name: "description",
        content: "Спокойный разговор о вашей матрице: вопросы, ответы и дневной лимит сообщений.",
      },
      { property: "og:title", content: "Чат с эзотериком — Матрица судьбы" },
      { property: "og:description", content: "Диалог с опорой на вашу матрицу судьбы." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Chat,
});
