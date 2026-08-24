import { createFileRoute } from "@tanstack/react-router";
import CabinetChat from "@/pages/cabinet/Chat";
import { RequireUser } from "@/components/RequireUser";

export const Route = createFileRoute("/cabinet/chat")({
  head: () => ({
    meta: [
      { title: "Чат с эзотериком — личный кабинет" },
      {
        name: "description",
        content: "Спокойный разговор о вашей матрице: вопросы, ответы и дневной лимит сообщений.",
      },
      { property: "og:title", content: "Чат с эзотериком — личный кабинет" },
      { property: "og:description", content: "Диалог с опорой на вашу матрицу судьбы." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireUser>
      <CabinetChat />
    </RequireUser>
  ),
});
