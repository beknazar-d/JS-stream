import { Link, useParams } from 'react-router'
import { Breadcrumbs } from '../components/Breadcrumbs.tsx'
import { lessonStats } from '../components/stats.ts'
import { ProgressBar } from '../components/status.tsx'
import { useTitle } from '../components/useTitle.ts'
import { findModule, lessonUrl } from '../content.ts'
import { useProgress } from '../progress/store.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

export function ModulePage() {
  const { moduleSlug } = useParams()
  const module = findModule(moduleSlug)
  const progress = useProgress()
  useTitle(module?.meta.title)
  if (!module) return <NotFoundPage />

  return (
    <div className="page">
      <Breadcrumbs items={[{ label: 'Курс', to: '/' }, { label: `Модуль ${module.meta.number}` }]} />
      <h1>
        {module.meta.number}. {module.meta.title}
      </h1>
      <p>{module.meta.summary}</p>
      <ol className="card-list">
        {module.lessons.map((lesson) => {
          const stats = lessonStats(lesson, progress)
          return (
            <li key={lesson.id} className="card">
              <h2>
                <Link to={lessonUrl(lesson)}>
                  {lesson.meta.order}. {lesson.meta.title}
                </Link>
              </h2>
              <p>{lesson.meta.summary}</p>
              <p className="muted">
                Заданий решено: {stats.solved} из {stats.total}
              </p>
              <ProgressBar value={stats.solved} total={stats.total} label={`Прогресс урока «${lesson.meta.title}»`} />
            </li>
          )
        })}
      </ol>
    </div>
  )
}
