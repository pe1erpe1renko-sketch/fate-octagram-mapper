import { createFileRoute } from "@tanstack/react-router";
import Pricing from "@/pages/Pricing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Тарифы — полный разбор матрицы судьбы" },
      {
        name: "description",
        content:
          "Тарифы полного разбора матрицы судьбы: разовый разбор, подписки со множеством дат, арканом дня и чатом с эзотериком.",
      },
      { property: "og:title", content: "Тарифы — полный разбор матрицы судьбы" },
      {
        property: "og:description",
        content: "Разблокируйте закрытые разделы разбора матрицы судьбы.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});
