// Интервальное повторение по системе ящиков (Лейтнера).
// Карточка урока попадает в повторение, когда урок открыт.
// Ответ «помню» переносит её в следующий ящик (интервал растёт),
// «не помню» возвращает в первый.

import type { Card } from '@platform/tasks-kit/meta'
import { allLessons } from '../content'
import type { CardProgress, ProgressData } from './store'
import { setCard } from './store'

const DAY = 24 * 60 * 60 * 1000
// Интервалы в днях для ящиков 1..6. Ящик 0 — повторить в этой же сессии.
export const INTERVALS = [0, 1, 3, 7, 16, 35, 90]
export const NEW_PER_DAY = 10

export interface ReviewItem {
  key: string // <lessonId>/<cardId>
  lessonId: string
  lessonTitle: string
  card: Card
  progress?: CardProgress
}

export function cardKey(lessonId: string, cardId: string) {
  return `${lessonId}/${cardId}`
}

export function reviewQueue(progress: ProgressData, now = Date.now()): { due: ReviewItem[]; fresh: ReviewItem[] } {
  const due: ReviewItem[] = []
  const fresh: ReviewItem[] = []
  for (const lesson of allLessons()) {
    if (!progress.lessons[lesson.id]) continue
    for (const card of lesson.cards) {
      const key = cardKey(lesson.id, card.id)
      const state = progress.cards[key]
      const item = { key, lessonId: lesson.id, lessonTitle: lesson.meta.title, card, progress: state }
      if (!state) fresh.push(item)
      else if (state.due <= now) due.push(item)
    }
  }
  due.sort((a, b) => a.progress!.due - b.progress!.due)
  const startOfDay = new Date(now).setHours(0, 0, 0, 0)
  const introducedToday = Object.values(progress.cards).filter((c) => c.reviews === 1 && (c.lastReviewed ?? 0) >= startOfDay).length
  return { due, fresh: fresh.slice(0, Math.max(0, NEW_PER_DAY - introducedToday)) }
}

export function grade(item: ReviewItem, remembered: boolean, now = Date.now()) {
  const current = item.progress ?? { box: 0, due: now, reviews: 0, lapses: 0 }
  const box = remembered ? Math.min(current.box + 1, INTERVALS.length - 1) : 0
  const due = remembered ? now + INTERVALS[box] * DAY : now + 60 * 1000
  setCard(item.key, {
    box,
    due,
    reviews: current.reviews + 1,
    lapses: current.lapses + (remembered ? 0 : 1),
    lastReviewed: now,
  })
}

// Сравнение введённого ответа с эталоном: без учёта регистра, пробелов
// по краям, повторных пробелов, точки с запятой в конце и вида кавычек.
export function normalizeAnswer(text: string): string {
  return text
    .trim()
    .replace(/;+$/, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([()[\]{},.=+\-*/<>!?:])\s*/g, '$1')
    .replace(/["'`]/g, '"')
    .toLowerCase()
}

export function checkAnswer(card: Card, input: string): boolean {
  return card.answer !== undefined && normalizeAnswer(input) === normalizeAnswer(card.answer)
}
