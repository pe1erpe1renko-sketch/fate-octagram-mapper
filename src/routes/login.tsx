import { createFileRoute } from "@tanstack/react-router";
import Login from "@/pages/Login";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Вход в личный кабинет — Матрица судьбы" },
      {
        name: "description",
        content: "Вход без пароля: получите ссылку для входа на почту и откройте личный кабинет.",
      },
      { property: "og:title", content: "Вход в личный кабинет — Матрица судьбы" },
      { property: "og:description", content: "Вход по ссылке из письма, без пароля." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});
