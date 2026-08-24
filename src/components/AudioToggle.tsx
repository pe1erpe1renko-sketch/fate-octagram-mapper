import { useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";

/**
 * Переключатели фоновой музыки и звуковых эффектов (левый верхний угол).
 * Трек — заглушка: дизайнер подставит файл в /audio/ambient.mp3.
 */
const AMBIENT_SRC = "/audio/ambient.mp3"; // TODO: дизайнер подставит трек

export function AudioToggle() {
  const { settings, setSetting } = useUser();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);

  // Браузеры блокируют автозапуск: стартуем только после первого клика по странице.
  useEffect(() => {
    function onFirstClick() {
      unlockedRef.current = true;
      if (settings.music) void audioRef.current?.play().catch(() => undefined);
    }
    window.addEventListener("pointerdown", onFirstClick, { once: true });
    return () => window.removeEventListener("pointerdown", onFirstClick);
  }, [settings.music]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.loop = true;
    if (settings.music && unlockedRef.current) {
      void audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  }, [settings.music]);

  return (
    <div className="fixed right-3 top-3 z-40 flex gap-2">
      <audio ref={audioRef} src={AMBIENT_SRC} preload="none" />
      <ToggleButton
        active={settings.music}
        onClick={() => setSetting("music", !settings.music)}
        label="Музыка"
        icon="♪"
      />
      <ToggleButton
        active={settings.sfx}
        onClick={() => setSetting("sfx", !settings.sfx)}
        label="Звук"
        icon="🔉"
      />
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={`${label}: ${active ? "включено" : "выключено"}`}
      className={
        "h-8 w-8 border text-xs " +
        (active
          ? "border-foreground bg-muted text-foreground"
          : "border-border bg-background text-muted-foreground")
      }
    >
      {icon}
    </button>
  );
}
