import type { OctagramPoint } from "./Octagram";

interface PointPanelProps {
  point: OctagramPoint | null;
}

export function PointPanel({ point }: PointPanelProps) {
  if (!point) {
    return (
      <div className="border border-border p-4 text-sm text-muted-foreground">
        Выберите любую точку матрицы, чтобы увидеть описание.
      </div>
    );
  }

  return (
    <div className="border border-border p-4">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">
        {point.id}
      </div>
      <h2 className="mt-1 text-base font-semibold text-foreground">{point.title}</h2>
      <p className="mt-1 text-sm text-foreground">Аркан: {point.arcana}</p>
      <p className="mt-2 text-sm text-muted-foreground">{point.hint}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        Заглушка текста трактовки. Здесь будет описание аркана {point.arcana} для
        позиции «{point.title}» — текст подставит команда контента.
      </p>
    </div>
  );
}
