// Живой предпросмотр страницы для заданий на вёрстку: обновляется при
// вводе (с задержкой), работает в iframe с sandbox, бесконечные циклы
// в скриптах прерываются так же, как при проверке.
import { useEffect, useState } from 'react'
import type { MockApi } from '@platform/tasks-kit/html'

const SIZES = [
  { width: 375, label: 'Телефон' },
  { width: 768, label: 'Планшет' },
  { width: 1024, label: 'Компьютер' },
]

export function Preview({ files, api }: { files: Record<string, string>; api?: MockApi }) {
  const [doc, setDoc] = useState<string>()
  const [width, setWidth] = useState(1024)

  useEffect(() => {
    let alive = true
    const timer = setTimeout(async () => {
      const { previewDocument } = await import('@platform/runner')
      const html = await previewDocument(files, api)
      if (alive) setDoc(html)
    }, 400)
    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [files, api])

  return (
    <section className="preview" aria-label="Предпросмотр страницы">
      <div className="preview__bar">
        <span className="muted">Предпросмотр</span>
        <span className="row" role="group" aria-label="Ширина экрана">
          {SIZES.map((size) => (
            <button
              key={size.width}
              type="button"
              className="button button--small"
              aria-pressed={width === size.width}
              onClick={() => setWidth(size.width)}
            >
              {size.label} · {size.width}
            </button>
          ))}
        </span>
      </div>
      <div className="preview__viewport">
        {doc ? (
          <iframe
            title="Предпросмотр вашей страницы"
            sandbox="allow-scripts allow-forms"
            srcDoc={doc}
            style={{ width: `${width}px` }}
          />
        ) : (
          <p className="muted" aria-busy="true">
            Готовлю предпросмотр…
          </p>
        )}
      </div>
    </section>
  )
}
