import type { LessonInfo } from '../content.ts'
import type { ProgressData } from '../progress/store.ts'

export function lessonStats(lesson: LessonInfo, progress: ProgressData) {
  const solved = lesson.tasks.filter((t) => progress.tasks[t.id]?.status === 'solved').length
  return { solved, total: lesson.tasks.length }
}
