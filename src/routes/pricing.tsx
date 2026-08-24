import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Полный разбор матрицы судьбы — тарифы" },
      {
        name: "description",
        content:
          "Страница тарифов полного разбора матрицы судьбы: предназначение, деньги, отношения, здоровье и родовые программы.",
      },
      { property: "og:title", content: "Полный разбор матрицы судьбы — тарифы" },
      {
        property: "og:description",
        content: "Разблокируйте закрытые разделы разбора матрицы судьбы.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Полный разбор</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Страница-заглушка. Здесь будут тарифы и оплата закрытых разделов.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block border border-border bg-muted px-3 py-1 text-sm text-foreground hover:bg-accent"
      >
        На главную
      </Link>
    </main>
  );
}
