import { useEffect, useRef, useState } from "react";

/** Точка + кольцо с инерцией. Только для устройств с мышью. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setEnabled(fine && !touch);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
    }

    function tick() {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`;
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-1.5 w-1.5 rounded-full bg-foreground"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-50 h-7 w-7 rounded-full border border-muted-foreground/60"
      />
    </>
  );
}
