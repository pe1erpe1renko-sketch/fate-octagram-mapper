import { createFileRoute } from "@tanstack/react-router";
import CabinetDates from "@/pages/cabinet/Dates";
import { RequireUser } from "@/components/RequireUser";

export const Route = createFileRoute("/cabinet/")({
  head: () => ({
    meta: [
      { title: "Мои даты — личный кабинет Матрицы судьбы" },
      {
        name: "description",
        content: "Сохранённые даты рождения с центральным арканом и быстрым переходом к разбору.",
      },
      { property: "og:title", content: "Мои даты — личный кабинет Матрицы судьбы" },
      { property: "og:description", content: "Список сохранённых дат и лимит тарифа." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireUser>
      <CabinetDates />
    </RequireUser>
  ),
});
