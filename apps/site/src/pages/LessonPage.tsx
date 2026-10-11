import { useEffect, useState, type ComponentType } from 'react'
import { Link, useParams } from 'react-router'
import { Breadcrumbs } from '../components/Breadcrumbs.tsx'
import { lessonComponents } from '../components/lesson-components.ts'
import { LessonContext } from '../components/lesson-context.ts'
import { useTitle } from '../components/useTitle.ts'
import { allLessons, findLesson, findModule, lessonUrl, loadLessonBody } from '../content.ts'
import { markLessonOpened } from '../progress/store.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

type Body = ComponentType<{ components?: Record<string, unknown> }>

export function LessonPage() {
  const { moduleSlug, lessonSlug } = useParams()
  const lesson = findLesson(moduleSlug, lessonSlug)
  const module = findModule(moduleSlug)
  const [Body, setBody] = useState<{ id: string; component: Body }>()
  useTitle(lesson?.meta.title)

  useEffect(() => {
    if (!lesson) return
    markLessonOpened(lesson.id)
    let alive = true
    void loadLessonBody(lesson).then((component) => {
      if (alive && component) setBody({ id: lesson.id, component })
    })
    return () => {
      alive = false
    }
  }, [lesson])

  if (!lesson || !module) return <NotFoundPage />
  const lessons = allLessons()
  const index = lessons.findIndex((l) => l.id === lesson.id)
  const prev = lessons[index - 1]
  const next = lessons[index + 1]

  return (
    <article className="page">
      <Breadcrumbs
        items={[
          { label: 'Курс', to: '/' },
          { label: `Модуль ${module.meta.number}. ${module.meta.title}`, to: `/${module.slug}` },
          { label: lesson.meta.title },
        ]}
      />
      <h1>{lesson.meta.title}</h1>
      <LessonContext.Provider value={lesson}>
        {Body?.id === lesson.id ? <Body.component components={lessonComponents} /> : <p aria-busy="true">Загрузка урока…</p>}
      </LessonContext.Provider>
      <nav className="pager" aria-label="Соседние уроки">
        {prev ? <Link to={lessonUrl(prev)}>← {prev.meta.title}</Link> : <span />}
        {next && <Link to={lessonUrl(next)}>{next.meta.title} →</Link>}
      </nav>
    </article>
  )
}
