/**
 * Точка подключения платёжного провайдера.
 * Сейчас — заглушка: реальная оплата не подключена.
 */

/**
 * TODO: подключить провайдера. Возвращает URL страницы оплаты.
 * @param {string} planId
 * @returns {Promise<{ ok: boolean, planId: string, paymentUrl: string, demo: boolean }>}
 */
export async function createPayment(planId) {
  // TODO: заменить на реальный вызов провайдера (создание платёжной сессии).
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    ok: true,
    planId,
    paymentUrl: `https://payment-provider.example/checkout?plan=${planId}`,
    demo: true,
  };
}
