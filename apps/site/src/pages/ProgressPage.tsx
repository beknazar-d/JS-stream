import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { lessonStats } from '../components/stats.ts'
import { ProgressBar } from '../components/status.tsx'
import { useTitle } from '../components/useTitle.ts'
import { allLessons, allTasks, lessonUrl } from '../content.ts'
import { reviewQueue } from '../progress/review.ts'
import { markExported } from '../progress/backup.ts'
import { exportProgress, importProgress, isPersistent, resetProgress, useProgress } from '../progress/store.ts'

export function ProgressPage() {
  useTitle('Прогресс')
  const progress = useProgress()
  const [message, setMessage] = useState<{ ok: boolean; text: string }>()
  const fileInput = useRef<HTMLInputElement>(null)

  const tasks = allTasks()
  const solved = tasks.filter((t) => progress.tasks[t.id]?.status === 'solved')
  const withoutLastHint = solved.filter((t) => (progress.tasks[t.id]?.hints ?? 0) < 3).length
  const { due } = reviewQueue(progress)
  const cardsLearned = Object.values(progress.cards).filter((c) => c.box >= 3).length

  const download = () => {
    const blob = new Blob([exportProgress()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `js-stream-progress-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    markExported()
    setMessage({ ok: true, text: 'Файл прогресса скачан.' })
  }

  const upload = async (file: File | undefined) => {
    if (!file) return
    try {
      const count = importProgress(await file.text())
      setMessage({ ok: true, text: `Прогресс загружен: ${count} записей объединено с текущими.` })
    } catch (error) {
      setMessage({ ok: false, text: error instanceof Error ? error.message : 'Не удалось прочитать файл.' })
    } finally {
      if (fileInput.current) fileInput.current.value = ''
    }
  }

  const reset = async () => {
    if (!window.confirm('Удалить весь прогресс в этом браузере? Сначала лучше скачать резервную копию.')) return
    await resetProgress()
    setMessage({ ok: true, text: 'Прогресс удалён.' })
  }

  return (
    <div className="page">
      <h1>Прогресс</h1>
      <p>
        Прогресс хранится только в этом браузере. Аккаунтов нет, на сервер ничего не отправляется. Чтобы перенести
        прогресс на другое устройство или не потерять его при очистке браузера, скачайте файл и загрузите его там.
      </p>
      {!isPersistent() && <p className="alert">Сейчас браузер не сохраняет данные. Скачайте прогресс перед закрытием вкладки.</p>}

      <div className="stats">
        <div className="stat">
          <strong>
            {solved.length} / {tasks.length}
          </strong>
          заданий решено
        </div>
        <div className="stat">
          <strong>{withoutLastHint}</strong>
          решено без третьей подсказки
        </div>
        <div className="stat">
          <strong>{cardsLearned}</strong>
          карточек выучено
        </div>
        <div className="stat">
          <strong>{due.length}</strong>
          карточек ждут повторения
        </div>
      </div>

      <h2>Резервная копия</h2>
      <div className="row">
        <button type="button" className="button button--primary" onClick={download}>
          Скачать прогресс
        </button>
        <label className="button">
          Загрузить из файла
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            className="visually-hidden"
            onChange={(e) => void upload(e.target.files?.[0])}
          />
        </label>
        <button type="button" className="button" onClick={reset}>
          Удалить прогресс
        </button>
      </div>
      {message && (
        <p className={message.ok ? 'note' : 'alert'} role="status">
          {message.text}
        </p>
      )}

      <h2>По урокам</h2>
      <ul className="card-list">
        {allLessons().map((lesson) => {
          const stats = lessonStats(lesson, progress)
          return (
            <li key={lesson.id} className="card">
              <h3>
                <Link to={lessonUrl(lesson)}>{lesson.meta.title}</Link>
              </h3>
              <p className="muted">
                {stats.solved} из {stats.total} заданий
              </p>
              <ProgressBar value={stats.solved} total={stats.total} label={`Прогресс урока «${lesson.meta.title}»`} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
