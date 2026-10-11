import { Link } from 'react-router'
import { lessonStats } from '../components/stats.ts'
import { ProgressBar } from '../components/status.tsx'
import { useTitle } from '../components/useTitle.ts'
import { allTasks, catalog, lessonUrl, taskUrl } from '../content.ts'
import { PROGRAM } from '../program.ts'
import { useProgress } from '../progress/store.ts'

export function HomePage() {
  useTitle(undefined)
  const progress = useProgress()
  const tasks = allTasks()
  const solved = tasks.filter((t) => progress.tasks[t.id]?.status === 'solved').length
  const nextTask = tasks.find((t) => progress.tasks[t.id]?.status !== 'solved')

  return (
    <div className="page">
      <h1>JavaScript, TypeScript, Node.js и CSS до уровня Middle</h1>
      <p>
        Бесплатный открытый курс на русском. Без регистрации: открываете урок, пишете код в браузере, тесты сразу
        проверяют решение. Больше практики, чем чтения: задания похожи на реальную работу — заказы, склад, доставка,
        бронирование.
      </p>
      <p className="note">
        <strong>Честно о результате.</strong> Курс даёт знания и портфолио уровня Middle («Middle-ready»). Рабочий
        стаж он не заменяет: опыт набирается на настоящих проектах.
      </p>

      {tasks.length > 0 && (
        <section aria-labelledby="continue">
          <h2 id="continue">Ваш прогресс</h2>
          <p>
            Решено заданий: {solved} из {tasks.length}
          </p>
          <ProgressBar value={solved} total={tasks.length} label="Решено заданий во всём курсе" />
          {nextTask && (
            <p className="row" style={{ marginTop: '1rem' }}>
              <Link className="button button--primary" to={solved === 0 ? lessonUrl({ moduleSlug: nextTask.moduleSlug, slug: nextTask.lessonSlug }) : taskUrl(nextTask)}>
                {solved === 0 ? 'Начать с первого урока' : `Продолжить: ${nextTask.meta.title}`}
              </Link>
              <Link className="button" to="/review">
                Повторение
              </Link>
            </p>
          )}
        </section>
      )}

      <h2>Программа</h2>
      <ol className="card-list">
        {PROGRAM.map((item) => {
          const module = catalog.find((m) => m.meta.number === item.number)
          if (!module) {
            return (
              <li key={item.number} className="card">
                <h3>
                  {item.number}. {item.title}
                </h3>
                <p className="muted">Готовится</p>
              </li>
            )
          }
          const lessons = module.lessons
          const done = lessons.filter((l) => {
            const s = lessonStats(l, progress)
            return s.total > 0 && s.solved === s.total
          }).length
          return (
            <li key={item.number} className="card">
              <h3>
                <Link to={`/${module.slug}`}>
                  {module.meta.number}. {module.meta.title}
                </Link>
              </h3>
              <p>{module.meta.summary}</p>
              <p className="muted">
                Уроков: {lessons.length} · пройдено: {done} · около {module.meta.weeks} нед.
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
