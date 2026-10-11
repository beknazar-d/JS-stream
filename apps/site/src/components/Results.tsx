import type { Report } from '@platform/runner'

const TITLES: Record<Report['status'], string> = {
  passed: 'Все проверки пройдены',
  failed: 'Есть непройденные проверки',
  error: 'Код не запустился',
  timeout: 'Код выполнялся слишком долго',
}

export function Results({ report }: { report: Report }) {
  const passed = report.checks.filter((c) => c.status === 'passed').length
  return (
    <>
      <p className={`result-summary result-summary--${report.status}`} role="status">
        {report.status === 'passed' ? '✓ ' : '✗ '}
        {TITLES[report.status]}
        {report.checks.length > 0 && ` · ${passed} из ${report.checks.length}`}
      </p>
      {report.error && (
        <div className="check">
          <pre>{report.error.message}</pre>
          {report.error.hint && <p className="explain">Что это значит: {report.error.hint}</p>}
        </div>
      )}
      {report.checks.length > 0 && (
        <ul className="check-list" aria-label="Результаты проверок">
          {report.checks.map((check, i) => (
            <li key={i} className="check">
              <div className="check__title">
                <span className={`check__icon--${check.status}`} aria-hidden="true">
                  {check.status === 'passed' ? '✓' : '✗'}
                </span>
                <span>
                  <span className="visually-hidden">{check.status === 'passed' ? 'Пройдено: ' : 'Не пройдено: '}</span>
                  {check.name}
                  {check.hidden && <span className="badge" style={{ marginLeft: '0.4rem' }}>скрытый тест</span>}
                </span>
              </div>
              {check.status === 'failed' && check.message && <pre>{check.message}</pre>}
              {check.status === 'passed' && check.message && <p className="muted">{check.message}</p>}
              {check.hint && <p className="explain">Что это значит: {check.hint}</p>}
            </li>
          ))}
        </ul>
      )}
      {report.logs.length > 0 && (
        <details open={report.status !== 'passed'}>
          <summary>Консоль ({report.logs.length})</summary>
          <pre className="console">
            {report.logs.map((log, i) => (
              <div key={i} className={`console__line--${log.level}`}>
                {log.text}
              </div>
            ))}
          </pre>
        </details>
      )}
    </>
  )
}
