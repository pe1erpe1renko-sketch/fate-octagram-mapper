import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Пользовательское соглашение — MATRIX" },
      { name: "description", content: "Условия использования сервиса «Матрица судьбы»." },
      { property: "og:title", content: "Пользовательское соглашение — MATRIX" },
      { property: "og:description", content: "Условия использования сервиса." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-2xl px-4 py-10 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Пользовательское соглашение</h1>
      <p className="mt-3 text-sm text-muted-foreground">Текст соглашения будет добавлен позднее.</p>
    </main>
  ),
});
