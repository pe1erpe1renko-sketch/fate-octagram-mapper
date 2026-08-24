export function linkTelegram(userId: string): Promise<{
  ok: boolean;
  linkUrl: string | null;
  demo: boolean;
  userId?: string;
}>;
