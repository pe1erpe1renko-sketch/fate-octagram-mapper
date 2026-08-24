/**
 * Точка подключения авторизации.
 * Вход без пароля: письмо со ссылкой (magic link).
 * Сейчас — заглушка, реальная авторизация не подключена.
 */

/**
 * TODO: подключить Supabase Auth (supabase.auth.signInWithOtp({ email })).
 * @param {string} email
 * @returns {Promise<{ ok: boolean, email: string, demo: boolean }>}
 */
export async function sendMagicLink(email) {
  // TODO: подключить Supabase Auth — отправка письма со ссылкой для входа.
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true, email, demo: true };
}

/**
 * TODO: подключить Supabase Auth (проверка токена из ссылки, создание сессии).
 * @param {string} token
 * @returns {Promise<{ ok: boolean, email: string|null, demo: boolean }>}
 */
export async function verifyToken(token) {
  // TODO: подключить Supabase Auth — верификация токена и выдача сессии.
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { ok: Boolean(token), email: null, demo: true };
}

/** Простейшая проверка email для формы входа. */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}
