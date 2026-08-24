import { useAuthModal } from "@/context/AuthModalContext";

/** Экран профиля для неавторизованного пользователя. */
export default function GuestProfile() {
  const { openAuth } = useAuthModal();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[480px] flex-col items-center justify-center px-4 py-12 text-center font-sans">
      <h1 className="text-2xl font-semibold text-foreground">Войдите в аккаунт</h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Чтобы увидеть всю историю ваших разборов, получить доступ к чату с ИИ-эзотериком,
        ежедневным прогнозам и многому другому, нажмите кнопку ниже.
      </p>
      <button
        type="button"
        onClick={() => openAuth("login")}
        className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Войти
      </button>
    </main>
  );
}
