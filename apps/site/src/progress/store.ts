// Прогресс учащегося в IndexedDB браузера. Без аккаунтов: перенос на другое
// устройство — экспорт и импорт одного файла. Всё держится в памяти и
// записывается в базу при каждом изменении.

import { useSyncExternalStore } from 'react'

export interface TaskProgress {
  status: 'started' | 'solved'
  attempts: number
  // Сколько подсказок открыто: 0–3.
  hints: number
  solutionViewed: boolean
  draft?: Record<string, string>
  updatedAt: number
  solvedAt?: number
}

export interface CardProgress {
  // Ящик интервального повторения: 0 — новая или забытая карточка.
  box: number
  due: number
  reviews: number
  lapses: number
  lastReviewed?: number
}

export interface LessonProgress {
  openedAt: number
}

export interface ProgressData {
  tasks: Record<string, TaskProgress>
  cards: Record<string, CardProgress>
  lessons: Record<string, LessonProgress>
  // Отмеченные пункты чек-листов: ключ <lessonId>/<id> → номера пунктов.
  checklists: Record<string, number[]>
}

const DB_NAME = 'js-stream'
const DB_VERSION = 2
const STORES = ['tasks', 'cards', 'lessons', 'checklists'] as const
type StoreName = (typeof STORES)[number]

let db: IDBDatabase | undefined
let data: ProgressData = { tasks: {}, cards: {}, lessons: {}, checklists: {} }
let persistent = true
const listeners = new Set<() => void>()

function emit() {
  data = { ...data }
  for (const listener of listeners) listener()
}

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      for (const name of STORES) if (!req.result.objectStoreNames.contains(name)) req.result.createObjectStore(name)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function initProgress(): Promise<void> {
  try {
    db = await openDb()
    const tx = db.transaction(STORES, 'readonly')
    for (const name of STORES) {
      const store = tx.objectStore(name)
      const [keys, values] = await Promise.all([request(store.getAllKeys()), request(store.getAll())])
      const target = data[name] as Record<string, unknown>
      keys.forEach((key, i) => (target[String(key)] = values[i]))
    }
  } catch {
    // Приватный режим или запрет хранилища: работаем в памяти и предупреждаем.
    persistent = false
  }
  emit()
}

function write(store: StoreName, key: string, value: unknown) {
  if (!db) return
  try {
    const tx = db.transaction(store, 'readwrite')
    if (value === undefined) tx.objectStore(store).delete(key)
    else tx.objectStore(store).put(value, key)
  } catch {
    persistent = false
  }
}

export function isPersistent() {
  return persistent
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getProgress(): ProgressData {
  return data
}

export function useProgress(): ProgressData {
  return useSyncExternalStore(subscribe, getProgress)
}

// --- Задания ---

const emptyTask = (): TaskProgress => ({ status: 'started', attempts: 0, hints: 0, solutionViewed: false, updatedAt: Date.now() })

export function updateTask(id: string, patch: Partial<TaskProgress>) {
  const current = data.tasks[id] ?? emptyTask()
  const next: TaskProgress = { ...current, ...patch, updatedAt: Date.now() }
  // Решённое задание остаётся решённым, даже если потом код сломали.
  if (current.status === 'solved') next.status = 'solved'
  data.tasks = { ...data.tasks, [id]: next }
  write('tasks', id, next)
  emit()
}

export function recordAttempt(id: string, passed: boolean) {
  const current = data.tasks[id] ?? emptyTask()
  updateTask(id, {
    attempts: current.attempts + 1,
    status: passed ? 'solved' : current.status,
    solvedAt: passed && current.status !== 'solved' ? Date.now() : current.solvedAt,
  })
}

let draftTimer: ReturnType<typeof setTimeout> | undefined
export function saveDraft(id: string, files: Record<string, string>) {
  clearTimeout(draftTimer)
  draftTimer = setTimeout(() => updateTask(id, { draft: files }), 400)
}

// --- Уроки ---

export function markLessonOpened(id: string) {
  if (data.lessons[id]) return
  const value = { openedAt: Date.now() }
  data.lessons = { ...data.lessons, [id]: value }
  write('lessons', id, value)
  emit()
}

// --- Карточки ---

export function setCard(id: string, value: CardProgress) {
  data.cards = { ...data.cards, [id]: value }
  write('cards', id, value)
  emit()
}

// --- Чек-листы ---

export function setChecklistItem(key: string, index: number, checked: boolean) {
  const current = new Set(data.checklists[key] ?? [])
  if (checked) current.add(index)
  else current.delete(index)
  const value = [...current].sort((a, b) => a - b)
  data.checklists = { ...data.checklists, [key]: value }
  write('checklists', key, value)
  emit()
}

// --- Экспорт и импорт ---

const FORMAT = 'js-stream-progress'

export function exportProgress(): string {
  return JSON.stringify({ format: FORMAT, version: 1, exportedAt: new Date().toISOString(), ...data }, null, 2)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Импорт объединяет данные: решённое остаётся решённым, у карточек берётся
// более свежее повторение. Возвращает число импортированных записей.
export function importProgress(text: string): number {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('Файл не похож на JSON. Выберите файл, скачанный кнопкой «Скачать прогресс».')
  }
  if (!isRecord(parsed) || parsed.format !== FORMAT) {
    throw new Error('Это не файл прогресса этого курса.')
  }
  let count = 0
  const tasks = isRecord(parsed.tasks) ? parsed.tasks : {}
  for (const [id, raw] of Object.entries(tasks)) {
    if (!isRecord(raw) || (raw.status !== 'started' && raw.status !== 'solved')) continue
    const incoming = raw as unknown as TaskProgress
    const current = data.tasks[id]
    const merged: TaskProgress = current
      ? {
          ...(incoming.updatedAt > current.updatedAt ? incoming : current),
          status: current.status === 'solved' || incoming.status === 'solved' ? 'solved' : 'started',
          attempts: Math.max(current.attempts, Number(incoming.attempts) || 0),
          hints: Math.max(current.hints, Number(incoming.hints) || 0),
          solutionViewed: current.solutionViewed || Boolean(incoming.solutionViewed),
        }
      : incoming
    data.tasks = { ...data.tasks, [id]: merged }
    write('tasks', id, merged)
    count++
  }
  const cards = isRecord(parsed.cards) ? parsed.cards : {}
  for (const [id, raw] of Object.entries(cards)) {
    if (!isRecord(raw) || typeof raw.box !== 'number' || typeof raw.due !== 'number') continue
    const incoming = raw as unknown as CardProgress
    const current = data.cards[id]
    if (current && (current.lastReviewed ?? 0) >= (incoming.lastReviewed ?? 0)) continue
    data.cards = { ...data.cards, [id]: incoming }
    write('cards', id, incoming)
    count++
  }
  const lessons = isRecord(parsed.lessons) ? parsed.lessons : {}
  for (const [id, raw] of Object.entries(lessons)) {
    if (!isRecord(raw) || typeof raw.openedAt !== 'number' || data.lessons[id]) continue
    data.lessons = { ...data.lessons, [id]: raw as unknown as LessonProgress }
    write('lessons', id, raw)
    count++
  }
  const checklists = isRecord(parsed.checklists) ? parsed.checklists : {}
  for (const [key, raw] of Object.entries(checklists)) {
    if (!Array.isArray(raw)) continue
    const incoming = raw.filter((n): n is number => Number.isInteger(n))
    const merged = [...new Set([...(data.checklists[key] ?? []), ...incoming])].sort((a, b) => a - b)
    data.checklists = { ...data.checklists, [key]: merged }
    write('checklists', key, merged)
    count++
  }
  emit()
  return count
}

export async function resetProgress() {
  data = { tasks: {}, cards: {}, lessons: {}, checklists: {} }
  if (db) {
    const tx = db.transaction(STORES, 'readwrite')
    for (const name of STORES) tx.objectStore(name).clear()
  }
  emit()
}
