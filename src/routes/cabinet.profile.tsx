import { createFileRoute } from "@tanstack/react-router";
import CabinetProfile from "@/pages/cabinet/Profile";
import { RequireUser } from "@/components/RequireUser";

export const Route = createFileRoute("/cabinet/profile")({
  head: () => ({
    meta: [
      { title: "Профиль и подписка — личный кабинет" },
      {
        name: "description",
        content: "Управление тарифом и подпиской, PDF-разбор, Telegram-бот, звук и музыка.",
      },
      { property: "og:title", content: "Профиль и подписка — личный кабинет" },
      { property: "og:description", content: "Настройки аккаунта и подписки." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireUser>
      <CabinetProfile />
    </RequireUser>
  ),
});
