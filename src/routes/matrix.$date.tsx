import { createFileRoute } from "@tanstack/react-router";
import MatrixResult from "@/pages/MatrixResult";

export const Route = createFileRoute("/matrix/$date")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: (typeof search["name"] === "string" ? search["name"] : undefined) as string | undefined,
  }),
  head: ({ params }) => {
    const title = `Матрица судьбы на ${params.date} — расчёт и разбор`;
    const description =
      "Готовый расчёт матрицы судьбы: октаграмма, карта здоровья по чакрам, предназначения, родовые программы и разбор по годам.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: MatrixPage,
});

function MatrixPage() {
  const { date } = Route.useParams();
  const { name } = Route.useSearch();
  return <MatrixResult date={date} name={name} />;
}
