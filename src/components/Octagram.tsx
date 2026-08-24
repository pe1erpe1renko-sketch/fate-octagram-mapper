import { POINT_CODES, type Matrix, type PointCode } from "@/lib/matrixEngine";
import type { LayerState } from "./OctagramLayers";

// ── Геометрия ──────────────────────────────────────────────────────────────
export const VIEW_SIZE = 560;
const CX = 280;
const CY = 280;
const R = 200;
const TIMELINE_R = 240;

const OUTER_ANGLES: Record<Exclude<PointCode, "C">, number> = {
  W: 180,
  NW: 135,
  N: 90,
  NE: 45,
  E: 0,
  SE: 315,
  S: 270,
  SW: 225,
};

interface XY {
  x: number;
  y: number;
}

/** Точка на окружности радиуса r: ось Y в SVG инвертирована. */
function polar(angleDeg: number, r: number): XY {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) };
}

/** Точка на доле t пути от a к b (t может быть > 1). */
function lerp(a: XY, b: XY, t: number): XY {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

const OUTER: Record<Exclude<PointCode, "C">, XY> = {
  W: polar(180, R),
  NW: polar(135, R),
  N: polar(90, R),
  NE: polar(45, R),
  E: polar(0, R),
  SE: polar(315, R),
  S: polar(270, R),
  SW: polar(225, R),
};
const CENTER: XY = { x: CX, y: CY };

/** Доли пути от края к центру (центр = 1.0). */
const AXIS_FRACTIONS: Array<{ key: "startOuter" | "startMid" | "startInner" | "endMid" | "endOuter" | "end"; t: number }> = [
  { key: "startOuter", t: 0.25 },
  { key: "startMid", t: 0.5 },
  { key: "startInner", t: 0.75 },
  { key: "endMid", t: 1.225 },
  { key: "endOuter", t: 1.375 },
  { key: "end", t: 1.5 },
];

const AXIS_LABELS: Record<string, string> = {
  startOuter: "Ось: внешняя точка (край)",
  startMid: "Ось: середина (край ↔ центр)",
  startInner: "Ось: внутренняя точка (у центра)",
  endMid: "Ось: середина (центр ↔ конец)",
  endOuter: "Ось: внешняя точка (у конца)",
  end: "Ось: конечная точка",
};

// ── Модель точки ───────────────────────────────────────────────────────────
export interface OctagramPoint {
  id: string;
  title: string;
  hint: string;
  arcana: number;
  x: number;
  y: number;
  r: number;
  fontSize: number;
}

function buildPoints(matrix: Matrix): OctagramPoint[] {
  const points: OctagramPoint[] = [];

  // Восемь внешних точек
  (Object.keys(OUTER) as Array<Exclude<PointCode, "C">>).forEach((code) => {
    const meta = POINT_CODES[code];
    const pos = OUTER[code];
    points.push({
      id: code,
      title: meta.title,
      hint: meta.hint,
      arcana: matrix.core[code],
      x: pos.x,
      y: pos.y,
      r: 26,
      fontSize: 20,
    });
  });

  // Центр
  points.push({
    id: "C",
    title: POINT_CODES.C.title,
    hint: POINT_CODES.C.hint,
    arcana: matrix.core.C,
    x: CX,
    y: CY,
    r: 30,
    fontSize: 24,
  });

  // Горизонтальная ось (от W к E) и вертикальная (от N к S)
  const axisDefs = [
    { axis: matrix.axes.horizontal, from: OUTER.W, to: OUTER.E, id: "H", name: "Горизонталь (Физика)" },
    { axis: matrix.axes.vertical, from: OUTER.N, to: OUTER.S, id: "V", name: "Вертикаль (Энергия)" },
  ] as const;

  axisDefs.forEach(({ axis, from, id, name }) => {
    AXIS_FRACTIONS.forEach(({ key, t }) => {
      const pos = lerp(from, CENTER, t);
      points.push({
        id: `${id}-${key}`,
        title: `${name} — ${AXIS_LABELS[key] ?? key}`,
        hint: "Точка оси.",
        arcana: axis[key],
        x: pos.x,
        y: pos.y,
        r: 14,
        fontSize: 12,
      });
    });
  });

  // Диагонали
  (["NW", "NE", "SE", "SW"] as const).forEach((code) => {
    const ray = matrix.diagonals[code];
    const corner = OUTER[code];
    ([
      { key: "outer", t: 0.3, value: ray.outer },
      { key: "mid", t: 0.6, value: ray.mid },
    ] as const).forEach(({ key, t, value }) => {
      const pos = lerp(corner, CENTER, t);
      points.push({
        id: `${code}-${key}`,
        title: `${POINT_CODES[code].title} — ${key === "outer" ? "внешняя" : "средняя"} точка луча`,
        hint: "Точка родового луча.",
        arcana: value,
        x: pos.x,
        y: pos.y,
        r: 14,
        fontSize: 12,
      });
    });
  });

  return points;
}

// ── Компонент ──────────────────────────────────────────────────────────────
interface OctagramProps {
  matrix: Matrix;
  layers: LayerState;
  selectedId: string | null;
  onSelect: (point: OctagramPoint) => void;
}

export function Octagram({ matrix, layers, selectedId, onSelect }: OctagramProps) {
  const points = buildPoints(matrix);
  const octagonPath = (["W", "NW", "N", "NE", "E", "SE", "S", "SW"] as const)
    .map((c) => `${OUTER[c].x},${OUTER[c].y}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      width={VIEW_SIZE}
      height={VIEW_SIZE}
      className="select-none"
      role="img"
      aria-label="Матрица судьбы"
    >
      {/* Линии */}
      <g fill="none" stroke="#cccccc" strokeWidth={1}>
        <polygon points={octagonPath} />
        <polygon points={(["W", "N", "E", "S"] as const).map((c) => `${OUTER[c].x},${OUTER[c].y}`).join(" ")} />
        <polygon points={(["NW", "NE", "SE", "SW"] as const).map((c) => `${OUTER[c].x},${OUTER[c].y}`).join(" ")} />
        <line x1={OUTER.W.x} y1={OUTER.W.y} x2={OUTER.E.x} y2={OUTER.E.y} />
        <line x1={OUTER.N.x} y1={OUTER.N.y} x2={OUTER.S.x} y2={OUTER.S.y} />
        <line x1={OUTER.NW.x} y1={OUTER.NW.y} x2={OUTER.SE.x} y2={OUTER.SE.y} />
        <line x1={OUTER.NE.x} y1={OUTER.NE.y} x2={OUTER.SW.x} y2={OUTER.SW.y} />
      </g>

      {layers.timeline && <TimelineLayer timeline={matrix.timeline} />}
      {layers.ancestral && <AncestralLayer />}
      {layers.money && <ZoneBadge corner="SE" symbol="$" />}
      {layers.relations && <ZoneBadge corner="SW" symbol="♥" />}

      {/* Точки */}
      <g>
        {points.map((p) => (
          <PointCircle
            key={p.id}
            point={p}
            selected={selectedId === p.id}
            onSelect={onSelect}
          />
        ))}
      </g>
    </svg>
  );
}

function PointCircle({
  point,
  selected,
  onSelect,
}: {
  point: OctagramPoint;
  selected: boolean;
  onSelect: (p: OctagramPoint) => void;
}) {
  return (
    <g
      transform={`translate(${point.x} ${point.y})`}
      className="cursor-pointer"
      onClick={() => onSelect(point)}
      role="button"
      aria-label={`${point.title}: аркан ${point.arcana}`}
    >
      <g className="transition-transform duration-100 hover:scale-110" style={{ transformOrigin: "center" }}>
        <circle
          r={point.r}
          fill="#ffffff"
          stroke={selected ? "#333333" : "#999999"}
          strokeWidth={selected ? 3 : 1}
        />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={point.fontSize}
          fill="#222222"
          fontFamily="system-ui, sans-serif"
        >
          {point.arcana}
        </text>
      </g>
    </g>
  );
}

/** Возрастная шкала: 32 точки по кругу, от W по часовой стрелке. */
function TimelineLayer({ timeline }: { timeline: Matrix["timeline"] }) {
  return (
    <g>
      <circle cx={CX} cy={CY} r={TIMELINE_R} fill="none" stroke="#e5e5e5" strokeWidth={1} />
      {timeline.map((point) => {
        const angle = 180 - (point.age / 80) * 360;
        const pos = polar(angle, TIMELINE_R);
        const isDecade = point.age % 10 === 0;
        const label = polar(angle, TIMELINE_R + 22);
        return (
          <g key={point.age}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isDecade ? 7 : 3}
              fill="#ffffff"
              stroke="#999999"
              strokeWidth={1}
            />
            {isDecade && (
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={11}
                fill="#666666"
                fontFamily="system-ui, sans-serif"
              >
                {point.age}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

/** Подписи родовых линий вдоль диагоналей. */
function AncestralLayer() {
  return (
    <g fontFamily="system-ui, sans-serif" fontSize={10} fill="#777777">
      <text
        transform={`translate(${lerp(OUTER.SE, CENTER, 1.55).x} ${lerp(OUTER.SE, CENTER, 1.55).y}) rotate(-45)`}
        textAnchor="middle"
      >
        линия мужского рода
      </text>
      <text
        transform={`translate(${lerp(OUTER.SW, CENTER, 1.55).x} ${lerp(OUTER.SW, CENTER, 1.55).y}) rotate(45)`}
        textAnchor="middle"
      >
        линия женского рода
      </text>
    </g>
  );
}

/** Значок зоны рядом с угловой точкой. */
function ZoneBadge({ corner, symbol }: { corner: "SE" | "SW"; symbol: string }) {
  const pos = lerp(OUTER[corner], CENTER, 0.15);
  return (
    <text
      x={pos.x}
      y={pos.y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={20}
      fill="#777777"
      fontFamily="system-ui, sans-serif"
    >
      {symbol}
    </text>
  );
}
