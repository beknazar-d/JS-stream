import { useEffect } from 'react'

export function useTitle(title: string | undefined) {
  useEffect(() => {
    document.title = title ? `${title} — JS Stream` : 'JS Stream — курс JavaScript до уровня Middle'
  }, [title])
}
