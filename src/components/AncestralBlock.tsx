import type { AncestralLine } from "@/lib/matrixEngine";

function Circle({ value }: { value: number }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-sm tabular-nums text-foreground">
      {value}
    </span>
  );
}

function Line({ label, line }: { label: string; line: AncestralLine }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-36 shrink-0 text-xs text-muted-foreground">{label}</span>
      <Circle value={line.first} />
      <Circle value={line.second} />
      <Circle value={line.result} />
    </div>
  );
}

export function AncestralBlock({
  ancestral,
}: {
  ancestral: { male: AncestralLine; female: AncestralLine };
}) {
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-foreground">Родовые программы</h2>
      <div className="mt-3 flex flex-col gap-3">
        <Line label="Мужская линия" line={ancestral.male} />
        <Line label="Женская линия" line={ancestral.female} />
      </div>
    </section>
  );
}
