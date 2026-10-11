import { createContext, useContext } from 'react'
import type { LessonInfo } from '../content.ts'

export const LessonContext = createContext<LessonInfo | undefined>(undefined)

export function useLesson(): LessonInfo {
  const lesson = useContext(LessonContext)
  if (!lesson) throw new Error('Компонент урока используется вне урока')
  return lesson
}
