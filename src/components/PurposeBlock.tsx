import type { Purpose } from "@/lib/matrixEngine";

function Num({ label, value }: { label: string; value: number }) {
  return (
    <span className="inline-flex items-baseline gap-1 text-xs text-muted-foreground">
      {label}
      <span className="text-sm text-foreground tabular-nums">{value}</span>
    </span>
  );
}

function Card({
  title,
  hint,
  parts,
  result,
}: {
  title: string;
  hint: string;
  parts?: React.ReactNode;
  result: number;
}) {
  return (
    <article className="border border-border p-3">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      {parts && <div className="mt-2 flex flex-wrap gap-3">{parts}</div>}
      <p className="mt-2 text-sm text-foreground">
        Результат: <span className="font-semibold tabular-nums">{result}</span>
      </p>
    </article>
  );
}

export function PurposeBlock({ purpose }: { purpose: Purpose }) {
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-foreground">Предназначения</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Card
          title={purpose.personal.title}
          hint={purpose.personal.hint}
          parts={
            <>
              <Num label="Небо" value={purpose.personal.sky} />
              <Num label="Земля" value={purpose.personal.earth} />
            </>
          }
          result={purpose.personal.result}
        />
        <Card
          title={purpose.social.title}
          hint={purpose.social.hint}
          parts={
            <>
              <Num label="М" value={purpose.social.male} />
              <Num label="Ж" value={purpose.social.female} />
            </>
          }
          result={purpose.social.result}
        />
        <Card
          title={purpose.spiritual.title}
          hint={purpose.spiritual.hint}
          result={purpose.spiritual.result}
        />
        <Card
          title={purpose.planetary.title}
          hint={purpose.planetary.hint}
          result={purpose.planetary.result}
        />
      </div>
    </section>
  );
}
