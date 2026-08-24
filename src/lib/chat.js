/**
 * Точка подключения чата.
 * Сейчас — заглушка: ответ приходит через секунду.
 */

import { CHAT_SYSTEM_PROMPT, buildMatrixContext } from './chatPrompt.js';

const STUB_REPLIES = [
  'Понимаю. Давайте разберём это спокойно: что именно сейчас беспокоит больше всего?',
  'В вашей матрице этот участок отвечает за то, как вы договариваетесь с собой. Расскажите, как это проявляется в жизни?',
  'Похоже, тут важнее не аркан, а конкретная ситуация. Опишите её парой предложений — обсудим.',
  'Это нормальная точка сомнений. Что бы вы сделали, если бы точно знали, что вас поддержат?',
];

/**
 * TODO: подключить провайдера (модель + ключ). Возвращает текст ответа.
 * @param {string} text — сообщение пользователя
 * @param {Array<{role: 'user'|'assistant', content: string}>} history
 * @param {{ matrix?: object }} [options]
 * @returns {Promise<{ role: 'assistant', content: string, demo: boolean }>}
 */
export async function sendMessage(text, history = [], options = {}) {
  // TODO: подключить провайдера. Готовый запрос выглядит так:
  //   messages = [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: text }]
  const systemPrompt = [CHAT_SYSTEM_PROMPT, buildMatrixContext(options.matrix)]
    .filter(Boolean)
    .join('\n\n');
  void systemPrompt;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  const reply = STUB_REPLIES[history.length % STUB_REPLIES.length];
  return { role: 'assistant', content: reply, demo: true };
}
