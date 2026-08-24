import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SavedDate {
  id: string;
  name: string;
  /** DD-MM-YYYY */
  date: string;
}

export interface Person {
  id: string;
  name: string;
  /** DD-MM-YYYY */
  date: string;
}

export interface ForecastEntry {
  id: string;
  /** YYYY-MM-DD — день прогноза */
  day: string;
  personId: string;
  personName: string;
  arcana: number;
  text: string;
}

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export interface UserSettings {
  music: boolean;
  sfx: boolean;
}

interface UserValue {
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;

  savedDates: SavedDate[];
  addSavedDate: (entry: Omit<SavedDate, "id">) => void;
  removeSavedDate: (id: string) => void;

  people: Person[];
  addPerson: (entry: Omit<Person, "id">) => void;
  removePerson: (id: string) => void;

  forecasts: ForecastEntry[];
  addForecasts: (entries: ForecastEntry[]) => void;

  chat: ChatTurn[];
  appendChat: (turn: ChatTurn) => void;
  /** Сообщений отправлено сегодня (сбрасывается в полночь). */
  chatUsedToday: number;
  countChatMessage: () => void;

  settings: UserSettings;
  setSetting: (key: keyof UserSettings, value: boolean) => void;
}

const UserContext = createContext<UserValue | null>(null);

const today = () => new Date().toISOString().slice(0, 10);
const uid = () => Math.random().toString(36).slice(2, 10);

/** Демо-дата по умолчанию — та же, что на главной. */
const DEMO_DATE: SavedDate = { id: "self", name: "Я", date: "13-07-1998" };

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [savedDates, setSavedDates] = useState<SavedDate[]>([DEMO_DATE]);
  const [people, setPeople] = useState<Person[]>([]);
  const [forecasts, setForecasts] = useState<ForecastEntry[]>([]);
  const [chat, setChat] = useState<ChatTurn[]>([]);
  const [chatUsage, setChatUsage] = useState({ day: today(), used: 0 });
  const [settings, setSettings] = useState<UserSettings>({ music: false, sfx: false });

  const login = useCallback((email: string) => setUser({ email }), []);
  const logout = useCallback(() => setUser(null), []);

  const addSavedDate = useCallback((entry: Omit<SavedDate, "id">) => {
    setSavedDates((prev) =>
      prev.some((d) => d.date === entry.date) ? prev : [...prev, { ...entry, id: uid() }],
    );
  }, []);
  const removeSavedDate = useCallback(
    (id: string) => setSavedDates((prev) => prev.filter((d) => d.id !== id)),
    [],
  );

  const addPerson = useCallback((entry: Omit<Person, "id">) => {
    setPeople((prev) => [...prev, { ...entry, id: uid() }]);
  }, []);
  const removePerson = useCallback(
    (id: string) => setPeople((prev) => prev.filter((p) => p.id !== id)),
    [],
  );

  const addForecasts = useCallback((entries: ForecastEntry[]) => {
    setForecasts((prev) => {
      const known = new Set(prev.map((f) => f.id));
      const fresh = entries.filter((e) => !known.has(e.id));
      return fresh.length ? [...fresh, ...prev] : prev;
    });
  }, []);

  const appendChat = useCallback((turn: ChatTurn) => setChat((prev) => [...prev, turn]), []);

  const countChatMessage = useCallback(() => {
    setChatUsage((prev) => (prev.day === today() ? { ...prev, used: prev.used + 1 } : { day: today(), used: 1 }));
  }, []);

  const setSetting = useCallback((key: keyof UserSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const chatUsedToday = chatUsage.day === today() ? chatUsage.used : 0;

  const value = useMemo<UserValue>(
    () => ({
      user,
      login,
      logout,
      savedDates,
      addSavedDate,
      removeSavedDate,
      people,
      addPerson,
      removePerson,
      forecasts,
      addForecasts,
      chat,
      appendChat,
      chatUsedToday,
      countChatMessage,
      settings,
      setSetting,
    }),
    [
      user, login, logout,
      savedDates, addSavedDate, removeSavedDate,
      people, addPerson, removePerson,
      forecasts, addForecasts,
      chat, appendChat, chatUsedToday, countChatMessage,
      settings, setSetting,
    ],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser должен использоваться внутри <UserProvider>");
  return ctx;
}
