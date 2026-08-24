import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Матрица судьбы — интерактивная октаграмма" },
      {
        name: "description",
        content:
          "Интерактивная визуализация матрицы судьбы по дате рождения: октаграмма, оси, диагонали и возрастная шкала.",
      },
      { property: "og:title", content: "Матрица судьбы — интерактивная октаграмма" },
      {
        property: "og:description",
        content:
          "Постройте матрицу судьбы по дате рождения и изучайте точки октаграммы в интерактивной схеме.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
