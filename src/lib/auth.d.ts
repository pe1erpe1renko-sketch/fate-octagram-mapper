export function sendMagicLink(email: string): Promise<{ ok: boolean; email: string; demo: boolean }>;
export function verifyToken(token: string): Promise<{ ok: boolean; email: string | null; demo: boolean }>;
export function isValidEmail(email: string): boolean;
