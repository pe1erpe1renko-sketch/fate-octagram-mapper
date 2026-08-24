/**
 * Точка подключения выгрузки разбора в PDF.
 * TODO: генерация на бэкенде (server function + шаблон), здесь только заглушка.
 */

/**
 * @param {object} matrix — результат calculateMatrix()
 * @returns {Promise<{ ok: boolean, url: string|null, demo: boolean }>}
 */
export async function generatePDF(matrix) {
  // TODO: генерация на бэкенде — вернуть ссылку на готовый файл.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { ok: true, url: null, demo: true, birthDate: matrix?.birthDate ?? null };
}
