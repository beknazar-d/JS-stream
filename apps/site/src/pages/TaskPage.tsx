import { Component, lazy, Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import type { Report } from '@platform/runner'
import { editableFiles, filesIn } from '@platform/tasks-kit/evaluate'
import type { MockApi } from '@platform/tasks-kit/html'
import { TASK_ROLES, TASK_TYPES, WRONG_KINDS } from '@platform/tasks-kit/meta'
import { Breadcrumbs } from '../components/Breadcrumbs.tsx'
import { Preview } from '../components/Preview.tsx'
import { Results } from '../components/Results.tsx'
import { TaskStatus } from '../components/status.tsx'
import { useTitle } from '../components/useTitle.ts'
import { findModule, findTask, lessonUrl, loadTask, taskNeighbours, taskUrl, type LoadedTask, type TaskInfo } from '../content.ts'
import { getProgress, recordAttempt, saveDraft, updateTask, useProgress } from '../progress/store.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

const CodeEditor = lazy(() => import('../editor/CodeEditor.tsx'))

// Эталон открывается после решения или после этого числа попыток.
const ATTEMPTS_FOR_SOLUTION = 3
const HINT_TITLES = ['Подсказка 1: направление', 'Подсказка 2: шаг', 'Подсказка 3: почти решение']

type Tab = 'task' | 'tests' | 'hints' | 'solution'

export function TaskPage() {
  const { moduleSlug, lessonSlug, taskSlug } = useParams()
  const task = findTask(moduleSlug, lessonSlug, taskSlug)
  useTitle(task?.meta.title)
  if (!task) return <NotFoundPage />
  return <TaskView key={task.id} task={task} />
}

function TaskView({ task }: { task: TaskInfo }) {
  const [loaded, setLoaded] = useState<LoadedTask>()
  useEffect(() => {
    let alive = true
    void loadTask(task).then((result) => alive && setLoaded(result))
    void import('@platform/runner').then((runner) => runner.warmUp())
    return () => {
      alive = false
    }
  }, [task])

  const module = findModule(task.moduleSlug)!
  const { lesson, prev, next } = taskNeighbours(task)

  return (
    <div className="page page--wide">
      <Breadcrumbs
        items={[
          { label: 'Курс', to: '/' },
          { label: `Модуль ${module.meta.number}`, to: `/${module.slug}` },
          { label: lesson.meta.title, to: lessonUrl(lesson) },
          { label: task.meta.title },
        ]}
      />
      {loaded ? <TaskWorkspace task={task} loaded={loaded} /> : <p aria-busy="true">Загрузка задания…</p>}
      <nav className="pager" aria-label="Соседние задания">
        {prev ? <Link to={taskUrl(prev)}>← {prev.meta.title}</Link> : <Link to={lessonUrl(lesson)}>← К уроку</Link>}
        {next ? <Link to={taskUrl(next)}>{next.meta.title} →</Link> : <Link to={lessonUrl(lesson)}>К уроку →</Link>}
      </nav>
    </div>
  )
}

function TaskWorkspace({ task, loaded }: { task: TaskInfo; loaded: LoadedTask }) {
  const { bundle, Description, SolutionNotes } = loaded
  const meta = task.meta
  const progress = useProgress()
  const state = progress.tasks[task.id]
  const starter = useMemo(() => editableFiles(bundle), [bundle])
  const fileNames = Object.keys(starter)

  // Черновик берётся один раз при открытии: дальше редактор — источник правды.
  const [files, setFiles] = useState<Record<string, string>>(() => ({ ...starter, ...pickKnown(getProgress().tasks[task.id]?.draft, fileNames) }))
  const [editorFiles, setEditorFiles] = useState(files)
  const [active, setActive] = useState(fileNames[0])
  const [report, setReport] = useState<Report>()
  const [running, setRunning] = useState(false)
  const [tab, setTab] = useState<Tab>('task')

  const api = useMemo(() => {
    const raw = bundle.files['tests/api.mock.json']
    try {
      return raw ? (JSON.parse(raw) as MockApi) : undefined
    } catch {
      return undefined
    }
  }, [bundle])
  const publicTests = Object.entries(filesIn(bundle.files, 'tests')).filter(([name]) => name.endsWith('.test.js') || name.endsWith('.test.ts')).filter(([name]) => !name.includes('hidden'))
  const shown = (meta.show ?? []).map((path) => [path, bundle.files[path] ?? ''] as const)
  const attempts = state?.attempts ?? 0
  const solved = state?.status === 'solved'
  const solutionOpen = solved || attempts >= ATTEMPTS_FOR_SOLUTION
  const hintsOpen = state?.hints ?? 0

  const onChange = useCallback(
    (file: string, value: string) => {
      setFiles((current) => {
        const next = { ...current, [file]: value }
        saveDraft(task.id, next)
        return next
      })
    },
    [task.id],
  )

  const run = useCallback(async () => {
    setRunning(true)
    try {
      const { runTask } = await import('@platform/runner')
      const result = await runTask(bundle, files)
      setReport(result)
      recordAttempt(task.id, result.status === 'passed')
    } catch (error) {
      setReport({
        status: 'error',
        checks: [],
        logs: [],
        error: { message: `Не удалось запустить проверку: ${error instanceof Error ? error.message : String(error)}` },
      })
    } finally {
      setRunning(false)
    }
  }, [bundle, files, task.id])

  const reset = () => {
    if (!window.confirm('Вернуть заготовку? Ваш код в этом задании будет заменён.')) return
    setFiles(starter)
    setEditorFiles({ ...starter })
    saveDraft(task.id, starter)
    setReport(undefined)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'task', label: 'Задание' },
    ...(publicTests.length ? [{ id: 'tests' as Tab, label: 'Тесты' }] : []),
    { id: 'hints', label: `Подсказки (${hintsOpen}/3)` },
    { id: 'solution', label: solutionOpen ? 'Решение' : 'Решение 🔒' },
  ]

  return (
    <div className="task-layout">
      <section aria-labelledby="task-title">
        <h1 id="task-title">{meta.title}</h1>
        <div className="meta-line">
          <span className="badge">{TASK_ROLES[meta.role]}</span>
          <span className="badge">{TASK_TYPES[meta.type]}</span>
          <span className="badge">сложность {meta.difficulty} из 5</span>
          <span className="badge">≈ {meta.minutes} мин</span>
          <TaskStatus task={task} progress={progress} />
        </div>
        <div className="tabs" role="tablist" aria-label="Разделы задания">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => {
                setTab(t.id)
                if (t.id === 'solution' && solutionOpen && !state?.solutionViewed) updateTask(task.id, { solutionViewed: true })
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === 'task' && (
            <>
              <Description />
              {loaded.mockup && (
                <figure className="mockup">
                  <figcaption>Макет</figcaption>
                  <img src={loaded.mockup} alt={`Макет к заданию «${meta.title}»: сравните с ним свою страницу в предпросмотре`} />
                </figure>
              )}
              {shown.map(([path, source]) => (
                <figure key={path}>
                  <figcaption>
                    <code>{path.split('/').pop()}</code>
                  </figcaption>
                  <pre>
                    <code>{source}</code>
                  </pre>
                </figure>
              ))}
            </>
          )}
          {tab === 'tests' && (
            <>
              <p className="muted">Открытые тесты. Кроме них решение проверяют скрытые тесты с другими данными.</p>
              {publicTests.map(([name, source]) => (
                <figure key={name}>
                  <figcaption>
                    <code>{name}</code>
                  </figcaption>
                  <pre>
                    <code>{source}</code>
                  </pre>
                </figure>
              ))}
            </>
          )}
          {tab === 'hints' && (
            <>
              <p className="muted">Открывайте по одной: каждая следующая подсказывает больше.</p>
              {meta.hints.slice(0, hintsOpen).map((hint, i) => (
                <div key={i} className="hint">
                  <h3>{HINT_TITLES[i]}</h3>
                  <p>{hint}</p>
                </div>
              ))}
              {hintsOpen < 3 && (
                <button type="button" className="button" onClick={() => updateTask(task.id, { hints: hintsOpen + 1 })}>
                  Показать {HINT_TITLES[hintsOpen].toLowerCase()}
                </button>
              )}
            </>
          )}
          {tab === 'solution' &&
            (solutionOpen ? (
              <Solution loaded={loaded} SolutionNotes={SolutionNotes} fileNames={fileNames} />
            ) : (
              <p>
                Эталонное решение откроется, когда вы решите задание или сделаете {ATTEMPTS_FOR_SOLUTION} попытки (сейчас:{' '}
                {attempts}). Попробуйте сначала подсказки.
              </p>
            ))}
        </div>
      </section>

      <section aria-label="Редактор и проверка">
        <p className="muted visually-hidden">
          В редакторе Tab вставляет отступ. Чтобы выйти из редактора клавишей Tab, нажмите Ctrl+M.
        </p>
        <div className="editor-panel">
          {fileNames.length > 1 && (
            <div className="editor-panel__files" role="tablist" aria-label="Файлы">
              {fileNames.map((name) => (
                <button key={name} type="button" role="tab" aria-selected={active === name} onClick={() => setActive(name)}>
                  {name}
                </button>
              ))}
            </div>
          )}
          <EditorBoundary
            fallback={
              <textarea
                className="editor-fallback code"
                aria-label={`Код файла ${active}`}
                value={files[active]}
                spellCheck={false}
                onChange={(e) => onChange(active, e.target.value)}
              />
            }
          >
            <Suspense fallback={<div className="editor-host" aria-busy="true">Загрузка редактора…</div>}>
              <CodeEditor files={editorFiles} active={active} onChange={onChange} onRun={run} label={`Код задания «${meta.title}», файл ${active}`} />
            </Suspense>
          </EditorBoundary>
          <div className="editor-panel__actions">
            <button type="button" className="button button--primary" onClick={run} disabled={running}>
              {running ? 'Проверяю…' : '▶ Проверить'}
            </button>
            <button type="button" className="button" onClick={reset}>
              Вернуть заготовку
            </button>
            <span className="muted">
              <kbd>Ctrl</kbd>+<kbd>Enter</kbd> — проверить · <kbd>Ctrl</kbd>+<kbd>M</kbd> — выход из редактора по Tab
            </span>
          </div>
        </div>
        {meta.language === 'html' && <Preview files={files} api={api} />}
        <div className="results" aria-live="polite">
          {report && <Results report={report} />}
          {report?.status === 'passed' && <NextStep task={task} />}
        </div>
      </section>
    </div>
  )
}

function NextStep({ task }: { task: TaskInfo }) {
  const { next, lesson } = taskNeighbours(task)
  return (
    <p className="row" style={{ marginTop: '1rem' }}>
      {next ? (
        <Link className="button button--primary" to={taskUrl(next)}>
          Следующее задание: {next.meta.title}
        </Link>
      ) : (
        <Link className="button button--primary" to={lessonUrl(lesson)}>
          Вернуться к уроку
        </Link>
      )}
      <span className="muted">Загляните во вкладку «Решение»: там разбор и типичные ошибки.</span>
    </p>
  )
}

function Solution({ loaded, SolutionNotes, fileNames }: { loaded: LoadedTask; SolutionNotes?: LoadedTask['SolutionNotes']; fileNames: string[] }) {
  const { bundle } = loaded
  const solution = filesIn(bundle.files, 'solution')
  return (
    <>
      <h2>Эталонное решение</h2>
      {fileNames.map((name) => (
        <figure key={name}>
          <figcaption>
            <code>{name}</code>
          </figcaption>
          <pre>
            <code>{solution[name]}</code>
          </pre>
        </figure>
      ))}
      {SolutionNotes && (
        <>
          <h2>Разбор</h2>
          <SolutionNotes />
        </>
      )}
      <h2>Типичные неверные решения</h2>
      {bundle.meta.wrong.map((wrong) => {
        const files = filesIn(bundle.files, `wrong/${wrong.name}`)
        return (
          <div key={wrong.name} className="wrong-solution">
            <h3>{WRONG_KINDS[wrong.kind]}</h3>
            <p>{wrong.explanation}</p>
            {Object.entries(files).map(([name, source]) => (
              <details key={name}>
                <summary>Показать код ({name})</summary>
                <pre>
                  <code>{source}</code>
                </pre>
              </details>
            ))}
          </div>
        )
      })}
    </>
  )
}

function pickKnown(draft: Record<string, string> | undefined, names: string[]) {
  if (!draft) return {}
  return Object.fromEntries(Object.entries(draft).filter(([name]) => names.includes(name)))
}

// Если Monaco не загрузился (старый браузер, сбой сети), показываем простое поле.
class EditorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
