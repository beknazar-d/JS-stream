import type { Report } from '@platform/runner'

export function Console({ report }: { report: Report }) {
  return (
    <pre className="console" aria-live="polite" aria-label="Вывод консоли">
      {report.logs.length === 0 && !report.error && <span className="muted">Код выполнен, вывода нет.</span>}
      {report.logs.map((log, i) => (
        <div key={i} className={`console__line--${log.level}`}>
          {log.text}
        </div>
      ))}
      {report.error && (
        <div className="console__line--error">
          {report.error.message}
          {report.error.hint && <div className="explain">Что это значит: {report.error.hint}</div>}
        </div>
      )}
    </pre>
  )
}
