// Схема метаданных модуля, урока и задания и их проверка.

export const TASK_TYPES = {
  recall: 'Набрать по памяти',
  predict: 'Предсказать результат',
  'fix-bug': 'Исправить баг',
  implement: 'Реализовать по тикету',
  refactor: 'Рефакторинг',
  'write-tests': 'Написать тесты',
} as const;

export const TASK_ROLES = {
  warmup: 'Разминка',
  main: 'Основное',
  real: 'Реальная задача',
} as const;

// Виды неверных решений. По правилам курса их три: частичное, с гонкой,
// без краевого случая. Пока в модуле нет асинхронности, гонку заменяет
// типичная ошибка (common-mistake).
export const WRONG_KINDS = {
  partial: 'Частичное решение',
  race: 'Решение с гонкой',
  'edge-case': 'Нет краевого случая',
  'common-mistake': 'Типичная ошибка',
} as const;

export type TaskType = keyof typeof TASK_TYPES;
export type TaskRole = keyof typeof TASK_ROLES;
export type WrongKind = keyof typeof WRONG_KINDS;

export interface WrongMeta {
  name: string;
  kind: WrongKind;
  explanation: string;
}

export interface MutantMeta {
  name: string;
  description: string;
}

export interface TaskMeta {
  order: number;
  title: string;
  type: TaskType;
  role: TaskRole;
  difficulty: 1 | 2 | 3 | 4 | 5;
  minutes: number;
  language: 'js' | 'ts';
  tags: string[];
  hints: [string, string, string];
  wrong: WrongMeta[];
  mutants?: MutantMeta[];
  show?: string[];
}

export interface ModuleMeta {
  number: number;
  title: string;
  summary: string;
  weeks: number;
}

export interface LessonMeta {
  order: number;
  title: string;
  summary: string;
}

type Errors = string[];

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isInt(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= min && value <= max;
}

export function validateTaskMeta(raw: unknown): Errors {
  const errors: Errors = [];
  if (typeof raw !== 'object' || raw === null) return ['meta.yaml: ожидался объект'];
  const m = raw as Record<string, unknown>;

  if (!isInt(m.order, 1, 99)) errors.push('order: целое число от 1 до 99');
  if (!isString(m.title)) errors.push('title: непустая строка');
  if (!isString(m.type) || !(m.type in TASK_TYPES)) errors.push(`type: одно из ${Object.keys(TASK_TYPES).join(', ')}`);
  if (!isString(m.role) || !(m.role in TASK_ROLES)) errors.push(`role: одно из ${Object.keys(TASK_ROLES).join(', ')}`);
  if (!isInt(m.difficulty, 1, 5)) errors.push('difficulty: целое число от 1 до 5');
  if (!isInt(m.minutes, 1, 600)) errors.push('minutes: время в минутах, целое число');
  if (m.language !== 'js' && m.language !== 'ts') errors.push('language: js или ts');
  if (!Array.isArray(m.tags) || m.tags.length === 0 || !m.tags.every(isString)) errors.push('tags: непустой список строк');
  if (!Array.isArray(m.hints) || m.hints.length !== 3 || !m.hints.every(isString)) {
    errors.push('hints: ровно три подсказки (направление, шаг, почти решение)');
  }
  if (!Array.isArray(m.wrong) || m.wrong.length !== 3) {
    errors.push('wrong: ровно три неверных решения');
  } else {
    m.wrong.forEach((w, i) => {
      const item = w as Record<string, unknown>;
      if (!isString(item?.name)) errors.push(`wrong[${i}].name: имя папки в wrong/`);
      if (!isString(item?.kind) || !(item.kind in WRONG_KINDS)) {
        errors.push(`wrong[${i}].kind: одно из ${Object.keys(WRONG_KINDS).join(', ')}`);
      }
      if (!isString(item?.explanation)) errors.push(`wrong[${i}].explanation: почему решение неверно`);
    });
  }
  if (m.type === 'write-tests') {
    if (!Array.isArray(m.mutants) || m.mutants.length === 0) {
      errors.push('mutants: для write-tests нужен хотя бы один мутант');
    } else {
      m.mutants.forEach((x, i) => {
        const item = x as Record<string, unknown>;
        if (!isString(item?.name)) errors.push(`mutants[${i}].name: имя папки в mutants/`);
        if (!isString(item?.description)) errors.push(`mutants[${i}].description: какую ошибку содержит`);
      });
    }
  }
  if (m.show !== undefined && (!Array.isArray(m.show) || !m.show.every(isString))) {
    errors.push('show: список путей к файлам, которые показываются в задании');
  }
  return errors;
}

export function validateModuleMeta(raw: unknown): Errors {
  const m = (raw ?? {}) as Record<string, unknown>;
  const errors: Errors = [];
  if (!isInt(m.number, 0, 99)) errors.push('number: номер модуля');
  if (!isString(m.title)) errors.push('title: непустая строка');
  if (!isString(m.summary)) errors.push('summary: непустая строка');
  if (!isInt(m.weeks, 1, 52)) errors.push('weeks: длительность в неделях');
  return errors;
}

export function validateLessonMeta(raw: unknown): Errors {
  const m = (raw ?? {}) as Record<string, unknown>;
  const errors: Errors = [];
  if (!isInt(m.order, 1, 99)) errors.push('order: порядковый номер урока');
  if (!isString(m.title)) errors.push('title: непустая строка');
  if (!isString(m.summary)) errors.push('summary: непустая строка');
  return errors;
}

// Обязательные разделы урока (заголовки второго уровня в lesson.mdx), по порядку.
export const LESSON_SECTIONS = [
  'Зачем это в работе',
  'Объяснение',
  'Пример',
  'Как это работает',
  'Типичные ошибки',
  'Шпаргалка',
  'Задания',
  'Итог',
] as const;

// Обязательные разделы описания задания (task.md).
export const TASK_SECTIONS = ['Контекст', 'Цель', 'Критерии приёмки', 'Ограничения'] as const;

export interface Card {
  id: string;
  front: string;
  back: string;
  // Если задано, карточка проверяется вводом ответа («набрать по памяти»).
  answer?: string;
}

export function validateCards(raw: unknown): Errors {
  if (!Array.isArray(raw) || raw.length === 0) return ['cards.yaml: непустой список карточек'];
  const errors: Errors = [];
  const ids = new Set<string>();
  raw.forEach((c, i) => {
    const card = c as Record<string, unknown>;
    if (!isString(card?.id)) errors.push(`cards[${i}].id: уникальный идентификатор`);
    else if (ids.has(card.id)) errors.push(`cards[${i}].id: повтор «${card.id}»`);
    else ids.add(card.id);
    if (!isString(card?.front)) errors.push(`cards[${i}].front: вопрос`);
    if (!isString(card?.back)) errors.push(`cards[${i}].back: ответ`);
    if (card?.answer !== undefined && !isString(card.answer)) errors.push(`cards[${i}].answer: строка`);
  });
  return errors;
}

export function headings(markdown: string, level = 2): string[] {
  const marker = '#'.repeat(level);
  return markdown
    .split('\n')
    .filter((line) => line.startsWith(`${marker} `))
    .map((line) => line.slice(level + 1).trim());
}
