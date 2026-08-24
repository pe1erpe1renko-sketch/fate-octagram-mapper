import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Матрица судьбы по дате рождения — расчёт онлайн" },
      {
        name: "description",
        content:
          "Введите дату рождения и получите бесплатный расчёт матрицы судьбы: октаграмма, чакры, предназначение и разбор по годам.",
      },
      { property: "og:title", content: "Матрица судьбы по дате рождения — расчёт онлайн" },
      {
        property: "og:description",
        content: "Бесплатный расчёт и разбор матрицы судьбы по дате рождения.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
