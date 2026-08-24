export interface LayerState {
  timeline: boolean;
  ancestral: boolean;
  money: boolean;
  relations: boolean;
}

export const LAYER_LABELS: Array<{ key: keyof LayerState; label: string }> = [
  { key: "timeline", label: "Возрастная шкала" },
  { key: "ancestral", label: "Родовые линии" },
  { key: "money", label: "Зона денег" },
  { key: "relations", label: "Зона отношений" },
];

interface OctagramLayersProps {
  value: LayerState;
  onChange: (next: LayerState) => void;
}

export function OctagramLayers({ value, onChange }: OctagramLayersProps) {
  return (
    <div className="flex flex-wrap gap-4 py-2">
      {LAYER_LABELS.map(({ key, label }) => (
        <label key={key} className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={value[key]}
            onChange={(e) => onChange({ ...value, [key]: e.target.checked })}
          />
          {label}
        </label>
      ))}
    </div>
  );
}
