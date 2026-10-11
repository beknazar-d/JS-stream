// Напоминание о резервной копии: аккаунтов нет, и прогресс пропадёт при
// очистке браузера. После каждого урока (6 решённых заданий) с момента
// последнего экспорта сайт предлагает скачать файл.

import type { ProgressData } from './store'

const KEY = 'lastExportAt'
export const REMIND_AFTER_SOLVED = 6

export function lastExportAt(): number {
  try {
    return Number(localStorage.getItem(KEY)) || 0
  } catch {
    return 0
  }
}

export function markExported() {
  try {
    localStorage.setItem(KEY, String(Date.now()))
  } catch {
    // хранилище недоступно: напоминание просто будет показываться дальше
  }
}

export function solvedSinceExport(progress: ProgressData): number {
  const since = lastExportAt()
  return Object.values(progress.tasks).filter((t) => t.status === 'solved' && (t.solvedAt ?? 0) > since).length
}
