import type { ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import Login from "@/pages/Login";

/** Экраны кабинета доступны только после входа (демо-авторизация). */
export function RequireUser({ children }: { children: ReactNode }) {
  const { user } = useUser();
  if (!user) return <Login />;
  return <>{children}</>;
}
