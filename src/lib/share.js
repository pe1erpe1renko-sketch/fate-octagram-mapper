/**
 * Точка подключения пересылки прогнозов.
 * Сейчас — копирование в буфер обмена.
 * TODO: отправка в мессенджеры (Telegram/WhatsApp) — бот или deeplink-шеринг.
 */

/**
 * @param {{ date: string, personName: string, arcana: number, text: string }} forecast
 * @returns {Promise<{ ok: boolean, method: 'share'|'clipboard'|'none' }>}
 */
export async function shareForecast(forecast) {
  const payload = `Прогноз на ${forecast.date} — ${forecast.personName}\n` +
    `Аркан дня: ${forecast.arcana}\n\n${forecast.text}`;

  // TODO: здесь будет отправка в мессенджеры через бота (Telegram/WhatsApp).
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(payload);
      return { ok: true, method: 'clipboard' };
    }
  } catch {
    /* игнорируем: покажем пользователю ошибку выше */
  }
  return { ok: false, method: 'none' };
}
