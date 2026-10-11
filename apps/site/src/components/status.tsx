import type { TaskInfo } from '../content.ts'
import type { ProgressData } from '../progress/store.ts'

export function TaskStatus({ task, progress }: { task: TaskInfo; progress: ProgressData }) {
  const state = progress.tasks[task.id]
  if (state?.status === 'solved') return <span className="badge badge--ok">✓ решено</span>
  if (state && state.attempts > 0) return <span className="badge badge--warn">в работе</span>
  return null
}

export function ProgressBar({ value, total, label }: { value: number; total: number; label: string }) {
  const percent = total ? Math.round((value / total) * 100) : 0
  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={value}
      aria-valuetext={`${value} из ${total}`}
    >
      <span style={{ width: `${percent}%` }} />
    </div>
  )
}
