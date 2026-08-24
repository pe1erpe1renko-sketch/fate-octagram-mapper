import { useMemo, useState } from "react";
import { calculateMatrix } from "@/lib/matrixEngine";
import { cancelSubscription } from "@/lib/payment";
import { generatePDF } from "@/lib/pdf";
import { linkTelegram } from "@/lib/telegram";
import { useAccess } from "@/context/AccessContext";
import { useUser } from "@/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const toIso = (date: string) => date.split("-").reverse().join("-");
const RU_DATE = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default function Profile() {
  const { plan, setPlan } = useAccess();
  const { user, logout, savedDates, settings, setSetting } = useUser();
  const [subOpen, setSubOpen] = useState(false);
  const [tgOpen, setTgOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const nextCharge = useMemo(() => {
    if (plan.period !== "month") return null;
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return RU_DATE.format(d);
  }, [plan.period]);

  async function onCancel() {
    await cancelSubscription(plan.id);
    setPlan("free");
    setSubOpen(false);
    setNotice("Подписка отменена (демо). Архив прогнозов сохранён.");
  }

  async function onPdf() {
    const first = savedDates[0];
    const matrix = first ? calculateMatrix(toIso(first.date)) : null;
    const result = await generatePDF(matrix);
    setNotice(result.url ? "Файл готов" : "PDF будет генерироваться на бэкенде (демо).");
  }

  async function onTelegram() {
    await linkTelegram(user?.identity.value ?? "demo");
    setTgOpen(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 font-sans">
      <h1 className="text-lg font-semibold text-foreground">Профиль</h1>

      <dl className="mt-4 border border-border p-3 text-sm">
        <Row label="Аккаунт" value={user?.identity.value ?? "—"} />
        <Row label="Тариф" value={plan.title} />
        <Row label="Следующее списание" value={nextCharge ?? "—"} />
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Action onClick={() => setSubOpen(true)}>Управлять подпиской</Action>
        <Action onClick={onPdf}>Скачать PDF разбора</Action>
        <Action onClick={onTelegram}>Подключить Telegram-бота</Action>
        <Action onClick={logout}>Выход</Action>
      </div>

      {notice && <p className="mt-3 text-xs text-muted-foreground">{notice}</p>}

      <section className="mt-6 flex flex-col gap-2 border border-border p-3">
        <Toggle
          label="Фоновая музыка"
          checked={settings.music}
          onChange={(v) => setSetting("music", v)}
        />
        <Toggle
          label="Звуковые эффекты"
          checked={settings.sfx}
          onChange={(v) => setSetting("sfx", v)}
        />
      </section>

      <Dialog open={subOpen} onOpenChange={setSubOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Управление подпиской</DialogTitle>
            <DialogDescription>
              Текущий тариф: {plan.title}
              {nextCharge ? `, следующее списание ${nextCharge}.` : "."} Доступ сохраняется до конца
              оплаченного периода.
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            onClick={onCancel}
            className="border border-border px-3 py-2 text-sm text-destructive hover:bg-accent"
          >
            Отменить подписку
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={tgOpen} onOpenChange={setTgOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Скоро</DialogTitle>
            <DialogDescription>
              Telegram-бот в разработке: он будет присылать аркан дня и прогнозы на близких.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border py-1 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

function Action({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-border bg-muted px-3 py-1.5 text-sm text-foreground hover:bg-accent"
    >
      {children}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
