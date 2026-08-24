import type { Chakras } from "@/lib/matrixEngine";

/**
 * Карта здоровья. Первая колонка зафиксирована (sticky),
 * остальное скроллится по горизонтали — на мобильном «Эмоции» не уезжают.
 */
export function ChakraTable({ chakras }: { chakras: Chakras }) {
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-foreground">Карта здоровья</h2>
      <div className="mt-3 overflow-x-auto border border-border">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="bg-muted text-left text-xs text-muted-foreground">
              <th className="sticky left-0 z-10 bg-muted px-3 py-2 font-medium">Чакра</th>
              <th className="px-3 py-2 font-medium">Физика</th>
              <th className="px-3 py-2 font-medium">Энергия</th>
              <th className="px-3 py-2 font-medium">Эмоции</th>
            </tr>
          </thead>
          <tbody>
            {chakras.rows.map((row) => (
              <tr key={row.key} className="border-t border-border">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-background px-3 py-2 text-left font-normal"
                  style={{ borderLeft: `6px solid ${row.color}` }}
                >
                  <span className="block text-foreground">{row.name}</span>
                  <span className="block text-xs text-muted-foreground">{row.sphere}</span>
                </th>
                <td className="px-3 py-2 tabular-nums">{row.physics}</td>
                <td className="px-3 py-2 tabular-nums">{row.energy}</td>
                <td className="px-3 py-2 tabular-nums">{row.emotions}</td>
              </tr>
            ))}
            <tr className="border-t border-border font-semibold">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-background px-3 py-2 text-left"
                style={{ borderLeft: "6px solid var(--border)" }}
              >
                Итог
              </th>
              <td className="px-3 py-2 tabular-nums">{chakras.total.physics}</td>
              <td className="px-3 py-2 tabular-nums">{chakras.total.energy}</td>
              <td className="px-3 py-2 tabular-nums">{chakras.total.emotions}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
