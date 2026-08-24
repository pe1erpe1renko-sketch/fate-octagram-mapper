import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

export type AuthMode = "login" | "register";

interface AuthModalValue {
  open: boolean;
  mode: AuthMode;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  setMode: (mode: AuthMode) => void;
}

const AuthModalContext = createContext<AuthModalValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const openAuth = useCallback((next: AuthMode = "login") => {
    setMode(next);
    setOpen(true);
  }, []);
  const closeAuth = useCallback(() => setOpen(false), []);

  const value = useMemo<AuthModalValue>(
    () => ({ open, mode, openAuth, closeAuth, setMode }),
    [open, mode, openAuth, closeAuth],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal(): AuthModalValue {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal должен использоваться внутри <AuthModalProvider>");
  return ctx;
}
