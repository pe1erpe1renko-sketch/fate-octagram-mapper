/**
 * КАРТА ПОЗИЦИЙ
 * =============
 * Единственный источник правды о том, из чего состоит разбор.
 * Отсюда берут данные: экран результата, пейволл, PDF, генерация текстов.
 *
 * Каждый раздел (section) состоит из слотов (slot).
 * Слот — это одна позиция матрицы, для которой нужен свой текст.
 *
 * path — адрес числа внутри результата calculateMatrix().
 * Например 'core.SE' → matrix.core.SE, 'chakras.rows.4.physics' → 5-я строка.
 *
 * КЛЮЧ ТЕКСТА в базе: `${slot.id}_${аркан}`  →  'money_channel_main_20'
 */

export const SECTIONS = [
  // ─────────────── ОТКРЫТО БЕСПЛАТНО ───────────────
  {
    id: 'character',
    title: 'Ваш характер и сильные стороны',
    lead: 'Как вы проявляетесь в жизни и какими вас видят другие.',
    access: 'free',
    slots: [
      { id: 'character_day',   label: 'Главный талант при рождении', path: 'core.W' },
      { id: 'character_month', label: 'Внутренняя сила',             path: 'core.N' },
      { id: 'character_year',  label: 'Что передано родом',          path: 'core.E' },
    ],
  },
  {
    id: 'comfort',
    title: 'Что даёт вам внутренний комфорт',
    lead: 'Состояние, в котором вы восстанавливаетесь и приходите в ресурс.',
    access: 'free',
    slots: [
      { id: 'comfort_core', label: 'Зона комфорта', path: 'core.C' },
    ],
  },
  {
    id: 'year_forecast',
    title: 'Разбор по годам',
    lead: 'Энергия текущего и будущих периодов вашей жизни.',
    access: 'free',
    dynamic: 'timeline', // слот выбирается селектором периода
    slots: [
      { id: 'year_energy', label: 'Энергия периода', path: 'today.arcana' },
    ],
  },
  {
    id: 'day_arcana',
    title: 'Аркан дня',
    lead: 'Ваша энергия на сегодня.',
    access: 'free',
    daily: true,
    slots: [
      { id: 'day_energy', label: 'Аркан дня', path: 'today.arcana' },
    ],
  },

  // ─────────────── ПОД ЗАМКОМ ───────────────
  {
    id: 'purpose',
    title: 'Предназначение: зачем вы здесь',
    lead: 'Четыре уровня задачи — от личной до планетарной.',
    access: 'paid',
    slots: [
      { id: 'purpose_personal',  label: 'Поиск себя',         path: 'purpose.personal.result' },
      { id: 'purpose_social',    label: 'Социализация',       path: 'purpose.social.result' },
      { id: 'purpose_spiritual', label: 'Духовная гармония',  path: 'purpose.spiritual.result' },
      { id: 'purpose_planetary', label: 'Планетарное',        path: 'purpose.planetary.result' },
    ],
  },
  {
    id: 'profession',
    title: 'Профессия и дело по душе',
    lead: 'В какой деятельности ваша энергия раскрывается лучше всего.',
    access: 'paid',
    slots: [
      { id: 'profession_talent', label: 'Профессиональный талант', path: 'core.N' },
      { id: 'profession_social', label: 'Реализация в социуме',    path: 'purpose.social.result' },
    ],
  },
  {
    id: 'money_flow',
    title: 'Через что к вам приходят деньги',
    lead: 'Ваш денежный канал и способ его открыть.',
    access: 'paid',
    slots: [
      { id: 'money_channel_main', label: 'Денежный канал',    path: 'core.SE' },
      { id: 'money_channel_way',  label: 'Как его раскрыть',  path: 'diagonals.SE.mid' },
    ],
  },
  {
    id: 'money_leak',
    title: 'Почему деньги утекают',
    lead: 'Где вы теряете ресурс и что с этим делать.',
    access: 'paid',
    slots: [
      { id: 'money_block',  label: 'Финансовый блок',       path: 'diagonals.SE.outer' },
      { id: 'money_status', label: 'Отношения со статусом', path: 'chakras.rows.4.physics' },
    ],
  },
  {
    id: 'relationships',
    title: 'Отношения: ваш сценарий в любви',
    lead: 'Как вы строите близость и что ищете в партнёре.',
    access: 'paid',
    slots: [
      { id: 'relation_line', label: 'Линия отношений',   path: 'core.SW' },
      { id: 'relation_way',  label: 'Путь к гармонии',   path: 'diagonals.SW.mid' },
    ],
  },
  {
    id: 'relation_blocks',
    title: 'Что мешает вам сближаться',
    lead: 'Внутренние барьеры, из-за которых близость даётся тяжело.',
    access: 'paid',
    slots: [
      { id: 'relation_block', label: 'Барьер близости',     path: 'diagonals.SW.outer' },
      { id: 'relation_heart', label: 'Состояние Анахаты',   path: 'chakras.rows.3.emotions' },
    ],
  },
  {
    id: 'sexuality',
    title: 'Сексуальность и притяжение',
    lead: 'Природа вашего влечения и то, как вы притягиваете.',
    access: 'paid',
    slots: [
      { id: 'sex_energy',     label: 'Сексуальная энергия', path: 'chakras.rows.5.energy' },
      { id: 'sex_attraction', label: 'Что вас притягивает', path: 'core.SW' },
    ],
  },
  {
    id: 'karma_40',
    title: 'Кармическая задача до 40 лет',
    lead: 'Что важно закрыть в первой половине жизни.',
    access: 'paid',
    slots: [
      { id: 'karma_material', label: 'Материальная задача', path: 'core.E' },
      { id: 'karma_main',     label: 'Главный урок',        path: 'core.S' },
    ],
  },
  {
    id: 'main_test',
    title: 'Главное испытание жизни',
    lead: 'Точка, через которую раскрывается ваша сила.',
    access: 'paid',
    slots: [
      { id: 'test_main', label: 'Главное испытание', path: 'core.S' },
    ],
  },
  {
    id: 'past_lives',
    title: 'Задачи прошлых воплощений',
    lead: 'Что вы принесли с собой и почему это повторяется.',
    access: 'paid',
    slots: [
      { id: 'past_debt', label: 'Кармический долг',  path: 'core.S' },
      { id: 'past_tail', label: 'Кармический хвост', path: 'diagonals.SW.outer' },
    ],
  },
  {
    id: 'male_line',
    title: 'Что тянется по мужской линии',
    lead: 'Программа рода по линии отца.',
    access: 'paid',
    slots: [
      { id: 'male_first',  label: 'Первая программа', path: 'ancestral.male.first' },
      { id: 'male_second', label: 'Вторая программа', path: 'ancestral.male.second' },
      { id: 'male_result', label: 'Итог линии',       path: 'ancestral.male.result' },
    ],
  },
  {
    id: 'female_line',
    title: 'Что тянется по женской линии',
    lead: 'Программа рода по линии матери.',
    access: 'paid',
    slots: [
      { id: 'female_first',  label: 'Первая программа', path: 'ancestral.female.first' },
      { id: 'female_second', label: 'Вторая программа', path: 'ancestral.female.second' },
      { id: 'female_result', label: 'Итог линии',       path: 'ancestral.female.result' },
    ],
  },
  {
    id: 'ancestral_gifts',
    title: 'Дары рода: на что опереться',
    lead: 'Ресурс, который род передал вам как поддержку.',
    access: 'paid',
    slots: [
      { id: 'gift_male',   label: 'Дар мужского рода', path: 'ancestral.male.result' },
      { id: 'gift_female', label: 'Дар женского рода', path: 'ancestral.female.result' },
    ],
  },
  {
    id: 'parents_karma',
    title: 'Детско-родительская карма',
    lead: 'Что осталось непрожитым в отношениях с родителями.',
    access: 'paid',
    slots: [
      { id: 'parents_link', label: 'Связь с родителями', path: 'chakras.rows.5.physics' },
      { id: 'parents_task', label: 'Задача отношений',   path: 'core.S' },
    ],
  },
  {
    id: 'children',
    title: 'Ваши дети: что важно знать',
    lead: 'Какую энергию вы передаёте детям.',
    access: 'paid',
    slots: [
      { id: 'children_energy', label: 'Энергия для детей', path: 'chakras.rows.5.emotions' },
      { id: 'children_role',   label: 'Ваша роль',         path: 'core.C' },
    ],
  },
  {
    id: 'health_map',
    title: 'Карта здоровья по чакрам',
    lead: 'Общее состояние вашего энергополя.',
    access: 'paid',
    slots: [
      { id: 'health_physics',  label: 'Итог: физика',  path: 'chakras.total.physics' },
      { id: 'health_energy',   label: 'Итог: энергия', path: 'chakras.total.energy' },
      { id: 'health_emotions', label: 'Итог: эмоции',  path: 'chakras.total.emotions' },
    ],
  },
  {
    id: 'body_zones',
    title: 'Уязвимые зоны организма',
    lead: 'На что обращать внимание в теле.',
    access: 'paid',
    slots: [
      { id: 'body_base', label: 'Муладхара: тело', path: 'chakras.rows.6.physics' },
    ],
  },
  {
    id: 'energy_leak',
    title: 'Где вы теряете энергию',
    lead: 'Каналы, через которые уходит ресурс.',
    access: 'paid',
    slots: [
      { id: 'energy_total', label: 'Общий энергопоток', path: 'chakras.total.energy' },
      { id: 'energy_weak',  label: 'Слабое звено',      path: 'chakras.rows.2.energy' },
    ],
  },
  {
    id: 'emotions',
    title: 'Эмоции и внутренние конфликты',
    lead: 'Что происходит внутри, когда снаружи всё хорошо.',
    access: 'paid',
    slots: [
      { id: 'emotion_total', label: 'Эмоциональный фон', path: 'chakras.total.emotions' },
      { id: 'emotion_mind',  label: 'Ум и тревога',      path: 'chakras.rows.1.emotions' },
    ],
  },
  {
    id: 'personal_brand',
    title: 'Как вас видят: личный бренд',
    lead: 'Впечатление, которое вы производите.',
    access: 'paid',
    slots: [
      { id: 'brand_face',   label: 'Внешнее проявление', path: 'core.W' },
      { id: 'brand_talent', label: 'Сильная сторона',    path: 'core.N' },
    ],
  },
  {
    id: 'rest',
    title: 'Ваш формат отдыха',
    lead: 'Как вы восстанавливаетесь по-настоящему.',
    access: 'paid',
    slots: [
      { id: 'rest_heart', label: 'Что наполняет', path: 'chakras.rows.3.physics' },
      { id: 'rest_joy',   label: 'Источник радости', path: 'chakras.rows.5.physics' },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
// СЛУЖЕБНОЕ
// ═══════════════════════════════════════════════════════════

/** Достаёт число из результата матрицы по строковому пути. */
export function resolvePath(matrix, path) {
  const value = path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), matrix);
  if (typeof value !== 'number') {
    throw new Error(`Путь "${path}" не даёт число. Проверьте карту позиций.`);
  }
  return value;
}

/** Ключ текста в базе: 'money_channel_main_20' */
export const textKey = (slotId, arcana) => `${slotId}_${arcana}`;

/** Плоский список всех слотов — для подсчёта объёма базы и для админки. */
export const ALL_SLOTS = SECTIONS.flatMap((s) =>
  s.slots.map((slot) => ({ ...slot, sectionId: s.id, sectionTitle: s.title, access: s.access }))
);

export const FREE_SECTIONS = SECTIONS.filter((s) => s.access === 'free');
export const PAID_SECTIONS = SECTIONS.filter((s) => s.access === 'paid');

/** Раскрывает все слоты для конкретной матрицы: что показать на экране. */
export function buildSectionData(matrix, { unlocked = false } = {}) {
  return SECTIONS.map((section) => ({
    id: section.id,
    title: section.title,
    lead: section.lead,
    access: section.access,
    locked: section.access === 'paid' && !unlocked,
    slots: section.slots.map((slot) => {
      const arcana = resolvePath(matrix, slot.path);
      return { id: slot.id, label: slot.label, arcana, key: textKey(slot.id, arcana) };
    }),
  }));
}
