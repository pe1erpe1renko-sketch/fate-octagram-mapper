import { useEffect, useMemo, useState } from "react";
import { calculateMatrix } from "@/lib/matrixEngine";
import { Octagram, VIEW_SIZE, type OctagramPoint } from "@/components/Octagram";
import { OctagramLayers, type LayerState } from "@/components/OctagramLayers";
import { ZoomPan } from "@/components/ZoomPan";
import { PointPanel } from "@/components/PointPanel";
import { DateInput } from "@/components/DateInput";

const DEFAULT_DATE = "1998-07-13";
const MOBILE_BREAKPOINT = 768;

export default function Index() {
  const [birthDate, setBirthDate] = useState(DEFAULT_DATE);
  const [selected, setSelected] = useState<OctagramPoint | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [layers, setLayers] = useState<LayerState>({
    timeline: false,
    ancestral: true,
    money: true,
    relations: true,
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const apply = () => setIsMobile(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  const matrix = useMemo(() => calculateMatrix(birthDate), [birthDate]);

  // Стартовый масштаб подобран так, чтобы вся октаграмма помещалась.
  const [fitZoom, setFitZoom] = useState(1);
  const stageHeight = isMobile ? 420 : 620;

  useEffect(() => {
    const measure = () => {
      const width = Math.min(window.innerWidth - 32, 720);
      setFitZoom(Math.min(width / VIEW_SIZE, stageHeight / VIEW_SIZE));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stageHeight]);

  const visibleLayers: LayerState = {
    ...layers,
    timeline: layers.timeline && !isMobile ? true : layers.timeline,
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Матрица судьбы</h1>

      <section className="mt-4">
        <DateInput
          value={birthDate}
          onSubmit={(next) => {
            setBirthDate(next);
            setSelected(null);
          }}
        />
      </section>

      <section className="mt-4">
        <OctagramLayers value={layers} onChange={setLayers} />
        <ZoomPan initialZoom={fitZoom} height={stageHeight}>
          <Octagram
            matrix={matrix}
            layers={visibleLayers}
            selectedId={selected?.id ?? null}
            onSelect={setSelected}
          />
        </ZoomPan>
      </section>

      <section className="mt-4">
        <PointPanel point={selected} />
      </section>
    </main>
  );
}
