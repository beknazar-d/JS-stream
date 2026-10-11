// Чек-лист практики на своём компьютере (терминал, Git, проект).
// Не засчитывается как задание: отметки нужны самому учащемуся.
import { setChecklistItem, useProgress } from '../progress/store.ts'
import { useLesson } from './lesson-context.ts'

export function Checklist({ id, title, items }: { id: string; title?: string; items: string[] }) {
  const lesson = useLesson()
  const progress = useProgress()
  const key = `${lesson.id}/${id}`
  const done = progress.checklists[key] ?? []
  const count = items.filter((_, i) => done.includes(i)).length
  return (
    <fieldset className="checklist">
      <legend>
        {title ?? 'Сделайте на своём компьютере'} · {count} из {items.length}
      </legend>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <label>
              <input
                type="checkbox"
                checked={done.includes(i)}
                onChange={(e) => setChecklistItem(key, i, e.target.checked)}
              />{' '}
              {item}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
