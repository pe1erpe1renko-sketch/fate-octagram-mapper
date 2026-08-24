import { createFileRoute } from "@tanstack/react-router";
import Profile from "@/pages/Profile";
import GuestProfile from "@/pages/GuestProfile";
import { useUser } from "@/context/UserContext";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Профиль и подписка — Матрица судьбы" },
      {
        name: "description",
        content: "Управление тарифом и подпиской, PDF-разбор, Telegram-бот, звук и музыка.",
      },
      { property: "og:title", content: "Профиль и подписка — Матрица судьбы" },
      { property: "og:description", content: "Настройки аккаунта и подписки." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfileRoute,
});

function ProfileRoute() {
  const { user } = useUser();
  return user ? <Profile /> : <GuestProfile />;
}
