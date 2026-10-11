import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { isPersistent, useProgress } from '../progress/store.ts'
import { reviewQueue } from '../progress/review.ts'
import { REMIND_AFTER_SOLVED, solvedSinceExport } from '../progress/backup.ts'

type Theme = 'system' | 'light' | 'dark'
const THEME_LABELS: Record<Theme, string> = { system: 'как в системе', light: 'светлая', dark: 'тёмная' }

function readTheme(): Theme {
  try {
    const value = localStorage.getItem('theme')
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(readTheme)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') delete root.dataset.theme
    else root.dataset.theme = theme
    try {
      if (theme === 'system') localStorage.removeItem('theme')
      else localStorage.setItem('theme', theme)
    } catch {
      // хранилище недоступно: тема действует до перезагрузки
    }
    window.dispatchEvent(new Event('themechange'))
  }, [theme])
  const next: Theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'
  return (
    <button type="button" className="button button--small" onClick={() => setTheme(next)}>
      Тема: {THEME_LABELS[theme]}
      <span className="visually-hidden">. Нажмите, чтобы выбрать: {THEME_LABELS[next]}</span>
    </button>
  )
}

export function Layout() {
  const progress = useProgress()
  const { due, fresh } = reviewQueue(progress)
  const reviewCount = due.length + fresh.length
  const location = useLocation()

  useEffect(() => {
    // При переходе между страницами фокус и прокрутка возвращаются к началу.
    window.scrollTo(0, 0)
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="logo">
            JS Stream
          </Link>
          <nav className="site-nav" aria-label="Основная навигация">
            <NavLink to="/" end>
              Курс
            </NavLink>
            <NavLink to="/review">
              Повторение{reviewCount > 0 ? ` (${reviewCount})` : ''}
            </NavLink>
            <NavLink to="/progress">Прогресс</NavLink>
            <NavLink to="/search">Поиск</NavLink>
          </nav>
          <ThemeSwitch />
        </div>
      </header>
      {!isPersistent() && (
        <div className="page page--wide">
          <p className="alert" role="status">
            Браузер не даёт сохранять данные (например, в приватном режиме). Прогресс пропадёт после закрытия
            вкладки. Скачайте его на странице «Прогресс», чтобы не потерять.
          </p>
        </div>
      )}
      {isPersistent() && solvedSinceExport(progress) >= REMIND_AFTER_SOLVED && location.pathname !== '/progress' && (
        <div className="page page--wide">
          <p className="alert" role="status">
            С последней резервной копии решено заданий: {solvedSinceExport(progress)}. Прогресс хранится только в этом
            браузере — <Link to="/progress">скачайте копию</Link>, чтобы не потерять его.
          </p>
        </div>
      )}
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer__inner">
          Бесплатный открытый курс без регистрации. Тексты — CC BY-SA 4.0, код — MIT. Прогресс хранится только в
          вашем браузере.
        </div>
      </footer>
    </>
  )
}
