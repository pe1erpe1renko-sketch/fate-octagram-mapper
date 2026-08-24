/**
 * Единственный источник правды о правах доступа.
 * Чистая логика без React — контекст (src/context/AccessContext.tsx) хранит состояние.
 */

export const PLANS = [
  { id: 'free',   title: 'Бесплатно',      price: 0,    period: null,
    dates: 1, forecasts: 0, chatPerDay: 0, unlockSections: false },
  { id: 'single', title: 'Разовый разбор', price: 490,  period: 'once',
    dates: 1, forecasts: 0, chatPerDay: 0, unlockSections: true },
  { id: 'path',   title: 'Свой путь',      price: 590,  period: 'month',
    dates: 3, forecasts: 0, chatPerDay: 10, unlockSections: true },
  { id: 'circle', title: 'Близкий круг',   price: 990,  period: 'month',
    dates: 10, forecasts: 3, chatPerDay: 30, unlockSections: true },
  { id: 'nolimit',title: 'Без границ',     price: 1790, period: 'month',
    dates: Infinity, forecasts: 10, chatPerDay: 200, unlockSections: true },
];

export const DEFAULT_PLAN_ID = 'free';

/** Текущий план по идентификатору (fallback — бесплатный). */
export function getPlan(planId) {
  return PLANS.find((plan) => plan.id === planId) || PLANS[0];
}

/**
 * Текущий план. Идентификатор приходит из контекста; без аргумента — бесплатный.
 * @param {string} [planId]
 */
export function getCurrentPlan(planId) {
  return getPlan(planId || DEFAULT_PLAN_ID);
}

/**
 * Есть ли у плана доступ к возможности.
 * Булевы поля — как есть, числовые — «больше нуля».
 * @param {string} feature — 'unlockSections' | 'forecasts' | 'chatPerDay' | 'dates'
 * @param {string} [planId]
 */
export function hasAccess(feature, planId) {
  const plan = getCurrentPlan(planId);
  const value = plan[feature];
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  return false;
}

/**
 * Можно ли разобрать ещё одну дату при уже разобранных count.
 * @param {number} count
 * @param {string} [planId]
 */
export function canAddDate(count, planId) {
  return count < getCurrentPlan(planId).dates;
}

/** Состав тарифов для страницы /pricing. */
export const PLAN_FEATURES = {
  single: [
    'Полный разбор одной даты',
    'PDF-версия разбора',
    'Доступ навсегда',
  ],
  path: [
    'Всё из разового разбора',
    '3 даты',
    'Ежедневный аркан дня',
    'Чат с эзотериком — 10 сообщений в день',
    'Архив прогнозов',
  ],
  circle: [
    'Всё из «Своего пути»',
    '10 дат',
    'Ежедневные прогнозы на 3 близких с пересылкой',
    'Чат — 30 сообщений в день',
  ],
  nolimit: [
    'Всё из «Близкого круга»',
    'Безлимит дат',
    'Прогнозы на 10 близких',
    'Чат без ограничений',
  ],
};
