import { Link } from 'react-router'
import { useTitle } from '../components/useTitle.ts'

export function NotFoundPage() {
  useTitle('Страница не найдена')
  return (
    <div className="page">
      <h1>Страница не найдена</h1>
      <p>
        Возможно, урок переименовали. Начните с <Link to="/">каталога курса</Link>.
      </p>
    </div>
  )
}
