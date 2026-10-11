// Компоненты, доступные в lesson.mdx.
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { TASK_ROLES, TASK_TYPES } from '@platform/tasks-kit/meta'
import { loadExample, mediaUrl, taskUrl } from '../content.ts'
import { useProgress } from '../progress/store.ts'
import { useLesson } from './lesson-context.ts'
import { Console } from './Console.tsx'
import { TaskStatus } from './status.tsx'
import type { Report } from '@platform/runner'

export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="note" aria-label="Заметка">
      {children}
    </aside>
  )
}

export function Wrong({ children, label = 'Неправильно' }: { children: ReactNode; label?: string }) {
  return (
    <div className="compare">
      <div className="compare__wrong">
        <p className="compare__label">✗ {label}</p>
        {children}
      </div>
    </div>
  )
}

export function Right({ children, label = 'Правильно' }: { children: ReactNode; label?: string }) {
  return (
    <div className="compare">
      <div className="compare__right">
        <p className="compare__label">✓ {label}</p>
        {children}
      </div>
    </div>
  )
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const lesson = useLesson()
  const url = mediaUrl(lesson.id, src)
  if (!url) return <p className="alert">Файл {src} не найден в media/</p>
  return (
    <figure>
      <img src={url} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export function Cheatsheet() {
  const lesson = useLesson()
  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Что нужно</th>
            <th scope="col">Как написать</th>
          </tr>
        </thead>
        <tbody>
          {lesson.cards.map((card) => (
            <tr key={card.id}>
              <td>{card.front}</td>
              <td>
                <code>{card.back}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">
        Эти строки попадут в <Link to="/review">карточки повторения</Link>.
      </p>
    </>
  )
}

export function TaskList() {
  const lesson = useLesson()
  const progress = useProgress()
  return (
    <ol className="card-list">
      {lesson.tasks.map((task) => (
        <li key={task.id} className="card">
          <h3>
            <Link to={taskUrl(task)}>{task.meta.title}</Link>
          </h3>
          <div className="meta-line">
            <span className="badge">{TASK_ROLES[task.meta.role]}</span>
            <span className="badge">{TASK_TYPES[task.meta.type]}</span>
            <span className="badge">сложность {task.meta.difficulty} из 5</span>
            <span className="badge">{task.meta.minutes} мин</span>
            <TaskStatus task={task} progress={progress} />
          </div>
        </li>
      ))}
    </ol>
  )
}

// Живой пример: код можно изменить и запустить. Редактор простой (textarea),
// чтобы страница урока оставалась лёгкой; раннер грузится по первому запуску.
export function Playground({ example }: { example: string }) {
  const lesson = useLesson()
  const [file, setFile] = useState<string>()
  const [original, setOriginal] = useState('')
  const [code, setCode] = useState('')
  const [report, setReport] = useState<Report>()
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let alive = true
    void loadExample(lesson.id, example).then((loaded) => {
      if (!alive || !loaded) return
      setFile(loaded.file)
      setOriginal(loaded.source)
      setCode(loaded.source)
    })
    return () => {
      alive = false
    }
  }, [lesson.id, example])

  if (!file) return <pre>Загрузка примера…</pre>

  const run = async () => {
    setRunning(true)
    const { runSnippet } = await import('@platform/runner')
    setReport(await runSnippet(file, code))
    setRunning(false)
  }
  const lines = code.split('\n').length

  return (
    <div className="playground">
      <div className="playground__bar">
        <span className="muted">Живой пример · {file}</span>
        <span className="row">
          {code !== original && (
            <button type="button" className="button button--small" onClick={() => setCode(original)}>
              Вернуть исходный код
            </button>
          )}
          <button type="button" className="button button--small button--primary" onClick={run} disabled={running}>
            {running ? 'Выполняется…' : '▶ Запустить'}
          </button>
        </span>
      </div>
      <textarea
        className="code"
        aria-label={`Код примера ${file}. Ctrl+Enter — запустить`}
        value={code}
        rows={Math.min(Math.max(lines + 1, 4), 24)}
        spellCheck={false}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
            void run()
          }
        }}
      />
      {report && <Console report={report} />}
    </div>
  )
}
