/**
 * Точка подключения Telegram-бота.
 * TODO: связать аккаунт с ботом (deeplink t.me/<bot>?start=<token>) и хранить chat_id.
 */

/**
 * @param {string} userId
 * @returns {Promise<{ ok: boolean, linkUrl: string|null, demo: boolean }>}
 */
export async function linkTelegram(userId) {
  // TODO: выдать одноразовый токен привязки и вернуть deeplink на бота.
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { ok: true, linkUrl: null, demo: true, userId };
}
