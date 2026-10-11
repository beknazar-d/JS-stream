import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router'
import { TASK_TYPES } from '@platform/tasks-kit/meta'
import { useTitle } from '../components/useTitle.ts'
import { allLessons, lessonUrl, taskUrl } from '../content.ts'

interface Entry {
  kind: 'Урок' | 'Задание' | 'Шпаргалка'
  title: string
  detail: string
  to: string
  text: string
}

const normalize = (text: string) => text.toLowerCase().replace(/ё/g, 'е')

function buildIndex(): Entry[] {
  const entries: Entry[] = []
  for (const lesson of allLessons()) {
    entries.push({
      kind: 'Урок',
      title: lesson.meta.title,
      detail: lesson.meta.summary,
      to: lessonUrl(lesson),
      text: normalize(`${lesson.meta.title} ${lesson.meta.summary}`),
    })
    for (const card of lesson.cards) {
      entries.push({
        kind: 'Шпаргалка',
        title: card.front,
        detail: `${card.back} · урок «${lesson.meta.title}»`,
        to: lessonUrl(lesson),
        text: normalize(`${card.front} ${card.back}`),
      })
    }
    for (const task of lesson.tasks) {
      entries.push({
        kind: 'Задание',
        title: task.meta.title,
        detail: `${TASK_TYPES[task.meta.type]} · ${task.meta.tags.join(', ')}`,
        to: taskUrl(task),
        text: normalize(`${task.meta.title} ${task.meta.tags.join(' ')}`),
      })
    }
  }
  return entries
}

export function SearchPage() {
  useTitle('Поиск')
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const index = useMemo(() => buildIndex(), [])
  const words = normalize(query).split(/\s+/).filter(Boolean)
  const results = words.length ? index.filter((entry) => words.every((word) => entry.text.includes(word))).slice(0, 50) : []

  return (
    <div className="page">
      <h1>Поиск по курсу</h1>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-input">Уроки, задания и шпаргалки</label>
        <input
          id="search-input"
          className="search-input"
          type="search"
          value={query}
          placeholder="Например: reduce, NaN, дата"
          autoFocus
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        />
      </form>
      {words.length > 0 && (
        <p className="muted" role="status">
          Найдено: {results.length}
        </p>
      )}
      <ul className="card-list">
        {results.map((entry, i) => (
          <li key={i} className="card">
            <span className="badge">{entry.kind}</span>
            <h2>
              <Link to={entry.to}>{entry.title}</Link>
            </h2>
            <p className="muted">{entry.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
