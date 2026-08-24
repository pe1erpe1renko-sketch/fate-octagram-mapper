import { useState } from "react";
import { POINT_CODES, type Matrix, type PointCode } from "@/lib/matrixEngine";
import type { LayerState } from "./OctagramLayers";

// ── Геометрия ──────────────────────────────────────────────────────────────
export const VIEW_SIZE = 640;
const CX = 320;
const CY = 320;
const R = 230;
const TIMELINE_R = 275;

interface XY {
  x: number;
  y: number;
}

/** Точка на окружности радиуса r: ось Y в SVG инвертирована. */
function polar(angleDeg: number, r: number): XY {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) };
}

/** Точка на доле t пути от a к b. */
function lerp(a: XY, b: XY, t: number): XY {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

/** Единичный вектор, перпендикулярный отрезку a→b. */
function perpendicular(a: XY, b: XY): XY {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: -dy / len, y: dx / len };
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

/** Доли полного пути оси: начало = 0, центр = 0.5, конец = 1. */
const AXIS_FRACTIONS: Array<{ key: "startOuter" | "startMid" | "startInner" | "endMid" | "endOuter" | "end"; t: number }> = [
  { key: "startOuter", t: 0.125 },
  { key: "startMid", t: 0.25 },
  { key: "startInner", t: 0.375 },
  { key: "endMid", t: 0.7 },
  { key: "endOuter", t: 0.85 },
  { key: "end", t: 1.0 },
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
  hitR: number;
  fontSize: number;
}

function buildOuterPoints(matrix: Matrix): OctagramPoint[] {
  return (Object.keys(OUTER) as Array<Exclude<PointCode, "C">>).map((code) => {
    const meta = POINT_CODES[code];
    const pos = OUTER[code];
    return {
      id: code,
      title: meta.title,
      hint: meta.hint,
      arcana: matrix.core[code],
      x: pos.x,
      y: pos.y,
      r: 26,
      hitR: 34,
      fontSize: 19,
    };
  });
}

function buildCenterPoint(matrix: Matrix): OctagramPoint {
  return {
    id: "C",
    title: POINT_CODES.C.title,
    hint: POINT_CODES.C.hint,
    arcana: matrix.core.C,
    x: CX,
    y: CY,
    r: 28,
    hitR: 34,
    fontSize: 22,
  };
}

function buildAxisPoints(matrix: Matrix): OctagramPoint[] {
  const axisDefs = [
    { axis: matrix.axes.horizontal, from: OUTER.W, to: OUTER.E, id: "H", name: "Горизонталь (Физика)" },
    { axis: matrix.axes.vertical, from: OUTER.N, to: OUTER.S, id: "V", name: "Вертикаль (Энергия)" },
  ] as const;

  const points: OctagramPoint[] = [];
  axisDefs.forEach(({ axis, from, to, id, name }) => {
    AXIS_FRACTIONS.forEach(({ key, t }) => {
      const pos = lerp(from, to, t);
      points.push({
        id: `${id}-${key}`,
        title: `${name} — ${AXIS_LABELS[key] ?? key}`,
        hint: "Точка оси.",
        arcana: axis[key],
        x: pos.x,
        y: pos.y,
        r: 13,
        hitR: 22,
        fontSize: 11,
      });
    });
  });
  return points;
}

function buildDiagonalPoints(matrix: Matrix): OctagramPoint[] {
  const points: OctagramPoint[] = [];
  (["NW", "NE", "SE", "SW"] as const).forEach((code) => {
    const ray = matrix.diagonals[code];
    const corner = OUTER[code];
    ([
      { key: "outer", t: 0.32, value: ray.outer },
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
        r: 13,
        hitR: 22,
        fontSize: 11,
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const outerPoints = buildOuterPoints(matrix);
  const diagonalPoints = buildDiagonalPoints(matrix);
  const axisPoints = buildAxisPoints(matrix);
  const centerPoint = buildCenterPoint(matrix);

  const octagonPath = (["W", "NW", "N", "NE", "E", "SE", "S", "SW"] as const)
    .map((c) => `${OUTER[c].x},${OUTER[c].y}`)
    .join(" ");

  const renderPoint = (p: OctagramPoint) => (
    <PointCircle
      key={p.id}
      point={p}
      selected={selectedId === p.id}
      hovered={hoveredId === p.id}
      onHover={setHoveredId}
      onSelect={onSelect}
    />
  );

  return (
    <svg
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      width={VIEW_SIZE}
      height={VIEW_SIZE}
      className="select-none"
      role="img"
      aria-label="Матрица судьбы"
    >
      {/* 1. Линии */}
      <g fill="none" stroke="#cccccc" strokeWidth={1}>
        <polygon points={octagonPath} />
        <polygon points={(["W", "N", "E", "S"] as const).map((c) => `${OUTER[c].x},${OUTER[c].y}`).join(" ")} />
        <polygon points={(["NW", "NE", "SE", "SW"] as const).map((c) => `${OUTER[c].x},${OUTER[c].y}`).join(" ")} />
        <line x1={OUTER.W.x} y1={OUTER.W.y} x2={OUTER.E.x} y2={OUTER.E.y} />
        <line x1={OUTER.N.x} y1={OUTER.N.y} x2={OUTER.S.x} y2={OUTER.S.y} />
        <line x1={OUTER.NW.x} y1={OUTER.NW.y} x2={OUTER.SE.x} y2={OUTER.SE.y} />
        <line x1={OUTER.NE.x} y1={OUTER.NE.y} x2={OUTER.SW.x} y2={OUTER.SW.y} />
      </g>

      {/* 2. Возрастная шкала */}
      {layers.timeline && <TimelineLayer timeline={matrix.timeline} />}

      {/* 3–6. Точки: внешние → диагонали → оси → центр */}
      <g>{outerPoints.map(renderPoint)}</g>
      <g>{diagonalPoints.map(renderPoint)}</g>
      <g>{axisPoints.map(renderPoint)}</g>
      <g>{renderPoint(centerPoint)}</g>

      {/* 7. Подписи слоёв */}
      {layers.ancestral && <AncestralLayer />}
      {layers.money && <ZoneBadge corner="SE" symbol="$" color="#1a7f37" />}
      {layers.relations && <ZoneBadge corner="SW" symbol="♥" color="#c62828" />}
    </svg>
  );
}

function PointCircle({
  point,
  selected,
  hovered,
  onHover,
  onSelect,
}: {
  point: OctagramPoint;
  selected: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (p: OctagramPoint) => void;
}) {
  const stroke = selected ? "#333333" : hovered ? "#666666" : "#999999";
  const strokeWidth = selected ? 3 : hovered ? 2 : 1;
  const fill = hovered && !selected ? "#f2f2f2" : "#ffffff";

  return (
    <g transform={`translate(${point.x} ${point.y})`}>
      <g style={{ pointerEvents: "none" }}>
        <circle r={point.r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
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
      <circle
        r={point.hitR}
        fill="transparent"
        className="cursor-pointer"
        role="button"
        aria-label={`${point.title}: аркан ${point.arcana}`}
        onClick={() => onSelect(point)}
        onMouseEnter={() => onHover(point.id)}
        onMouseLeave={() => onHover(null)}
      />
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

/** Подписи родовых линий вдоль диагоналей, на пустом участке между mid и центром. */
function AncestralLabel({ corner, text, angle, sign }: { corner: "NW" | "NE"; text: string; angle: number; sign: number }) {
  const base = lerp(OUTER[corner], CENTER, 0.78);
  const n = perpendicular(OUTER[corner], CENTER);
  const x = base.x + n.x * 14 * sign;
  const y = base.y + n.y * 14 * sign;
  const transform = `rotate(${angle}, ${x}, ${y})`;
  return (
    <g transform={transform}>
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
        {text}
      </text>
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

function AncestralLayer() {
  return (
    <g fontFamily="system-ui, sans-serif" fontSize={9} fill="#888888" style={{ pointerEvents: "none" }}>
      <AncestralLabel corner="NW" text="линия мужского рода" angle={-45} sign={-1} />
      <AncestralLabel corner="NE" text="линия женского рода" angle={45} sign={1} />
    </g>
  );
}

/** Значок зоны рядом с диагональю, со смещением наружу перпендикулярно линии. */
function ZoneBadge({ corner, symbol, color }: { corner: "SE" | "SW"; symbol: string; color: string }) {
  const base = lerp(CENTER, OUTER[corner], 0.45);
  const n = perpendicular(CENTER, OUTER[corner]);
  const sign = corner === "SE" ? 1 : -1;
  const pos = { x: base.x + n.x * 22 * sign, y: base.y + n.y * 22 * sign };
  return (
    <text
      x={pos.x}
      y={pos.y}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={22}
      fill={color}
      fontFamily="system-ui, sans-serif"
      style={{ pointerEvents: "none" }}
    >
      {symbol}
    </text>
  );
}
