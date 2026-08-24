export function sendMagicLink(email: string): Promise<{ ok: boolean; email: string; demo: boolean }>;
export function verifyToken(token: string): Promise<{ ok: boolean; email: string | null; demo: boolean }>;
export function isValidEmail(email: string): boolean;
export interface AuthIdentity {
  type: string;
  value: string;
  displayName: string;
}
export interface AuthResult {
  ok: boolean;
  demo: boolean;
  identity: AuthIdentity;
}
export function loginWithProvider(provider: string): Promise<AuthResult>;
export function loginWithEmail(email: string, password: string): Promise<AuthResult>;
export function registerWithEmail(name: string, email: string, password: string): Promise<AuthResult>;
