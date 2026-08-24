import { createFileRoute } from "@tanstack/react-router";
import CabinetForecast from "@/pages/cabinet/Forecast";
import { RequireUser } from "@/components/RequireUser";

export const Route = createFileRoute("/cabinet/forecast")({
  head: () => ({
    meta: [
      { title: "Ежедневный прогноз — личный кабинет" },
      {
        name: "description",
        content: "Лента ежедневных прогнозов с арканом дня для себя и близких, архив сохраняется.",
      },
      { property: "og:title", content: "Ежедневный прогноз — личный кабинет" },
      { property: "og:description", content: "Аркан дня и короткий разбор на каждый день." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RequireUser>
      <CabinetForecast />
    </RequireUser>
  ),
});
