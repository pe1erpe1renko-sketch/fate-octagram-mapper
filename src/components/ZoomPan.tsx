import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 4;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

interface View {
  zoom: number;
  x: number;
  y: number;
}

interface ZoomPanProps {
  /** Initial scale, chosen by the parent so the whole drawing fits. */
  initialZoom?: number;
  height: number;
  children: ReactNode;
}

/**
 * Generic zoom + pan surface: wheel / trackpad pinch, one-finger drag,
 * two-finger pinch, and imperative +/-/reset buttons rendered below.
 */
export function ZoomPan({ initialZoom = 1, height, children }: ZoomPanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>({ zoom: initialZoom, x: 0, y: 0 });

  // Reset when the caller changes the fitted zoom (e.g. viewport resize).
  useEffect(() => {
    setView({ zoom: initialZoom, x: 0, y: 0 });
  }, [initialZoom]);

  /** Zoom towards a point given in container coordinates. */
  const zoomAt = useCallback((nextZoomRaw: number, px: number, py: number) => {
    setView((prev) => {
      const next = clamp(nextZoomRaw, MIN_ZOOM, MAX_ZOOM);
      const k = next / prev.zoom;
      return {
        zoom: next,
        x: px - (px - prev.x) * k,
        y: py - (py - prev.y) * k,
      };
    });
  }, []);

  const zoomAtRef = useRef(zoomAt);
  zoomAtRef.current = zoomAt;

  // Native listener: React's onWheel is passive, preventDefault would be ignored.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      setView((prev) => {
        const next = clamp(prev.zoom * Math.exp(-dy * 0.0015), MIN_ZOOM, MAX_ZOOM);
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        const k = next / prev.zoom;
        return { zoom: next, x: px - (px - prev.x) * k, y: py - (py - prev.y) * k };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // ── Pointer handling: 1 pointer = drag, 2 pointers = pinch ──────────────
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ dist: number; cx: number; cy: number } | null>(null);

  const localPoint = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    return { x: clientX - (rect?.left ?? 0), y: clientY - (rect?.top ?? 0) };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, localPoint(e.clientX, e.clientY));
    pinchRef.current = null;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    const p = localPoint(e.clientX, e.clientY);
    const prev = pointers.current.get(e.pointerId)!;
    pointers.current.set(e.pointerId, p);

    if (pointers.current.size === 1) {
      setView((v) => ({ ...v, x: v.x + (p.x - prev.x), y: v.y + (p.y - prev.y) }));
      return;
    }

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      if (!a || !b) return;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const cx = (a.x + b.x) / 2;
      const cy = (a.y + b.y) / 2;
      const last = pinchRef.current;
      if (last && last.dist > 0) {
        setView((v) => {
          const next = clamp(v.zoom * (dist / last.dist), MIN_ZOOM, MAX_ZOOM);
          const k = next / v.zoom;
          return {
            zoom: next,
            x: cx - (cx - v.x) * k + (cx - last.cx),
            y: cy - (cy - v.y) * k + (cy - last.cy),
          };
        });
      }
      pinchRef.current = { dist, cx, cy };
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    pinchRef.current = null;
  };

  const buttonZoom = (factor: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    zoomAt(view.zoom * factor, (rect?.width ?? 0) / 2, (rect?.height ?? 0) / 2);
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{ height, touchAction: "none" }}
        className="relative w-full overflow-hidden border border-border bg-card"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          style={{
            transformOrigin: "0 0",
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})`,
          }}
        >
          {children}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <ControlButton label="+" onClick={() => buttonZoom(1.25)} />
        <ControlButton label="−" onClick={() => buttonZoom(1 / 1.25)} />
        <ControlButton
          label="сброс"
          onClick={() => setView({ zoom: initialZoom, x: 0, y: 0 })}
        />
        <span className="self-center text-xs text-muted-foreground">
          {Math.round(view.zoom * 100)}%
        </span>
      </div>
    </div>
  );
}

function ControlButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-10 border border-border bg-background px-3 py-1 text-sm text-foreground hover:bg-muted"
    >
      {label}
    </button>
  );
}
