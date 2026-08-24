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

/**
 * TODO: подключить провайдера — отмена подписки (без возврата средств,
 * доступ сохраняется до конца оплаченного периода).
 * @param {string} planId
 * @returns {Promise<{ ok: boolean, planId: string, activeUntil: string, demo: boolean }>}
 */
export async function cancelSubscription(planId) {
  // TODO: вызов API провайдера на отмену рекуррентного списания.
  await new Promise((resolve) => setTimeout(resolve, 400));
  const until = new Date();
  until.setMonth(until.getMonth() + 1);
  return { ok: true, planId, activeUntil: until.toISOString().slice(0, 10), demo: true };
}
