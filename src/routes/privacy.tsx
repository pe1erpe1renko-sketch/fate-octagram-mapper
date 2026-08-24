import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика обработки персональных данных — MATRIX" },
      { name: "description", content: "Как сервис «Матрица судьбы» обрабатывает персональные данные." },
      { property: "og:title", content: "Политика обработки персональных данных — MATRIX" },
      { property: "og:description", content: "Обработка персональных данных в сервисе." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-2xl px-4 py-10 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Политика обработки персональных данных</h1>
      <p className="mt-3 text-sm text-muted-foreground">Текст политики будет добавлен позднее.</p>
    </main>
  ),
});
