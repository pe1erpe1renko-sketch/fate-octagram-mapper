export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

export function sendMessage(
  text: string,
  history?: ChatTurn[],
  options?: { matrix?: unknown },
): Promise<{ role: "assistant"; content: string; demo: boolean }>;
