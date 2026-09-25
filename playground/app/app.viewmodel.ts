import { useEffect, useState } from 'react'
import { TINTS } from 'noiir'
import type { Tint } from 'noiir'
import { ROUTES } from './app.interface.ts'
import type { AppViewModel, Route } from './app.interface.ts'

const routeFromHash = (): Route => {
  const r = window.location.hash.replace(/^#\/?/, '').split('?')[0]
  return (ROUTES as readonly string[]).includes(r ?? '') ? (r as Route) : 'gallery'
}

/** Hash routing (#/gallery, #/compare, #/bench) and the tint switch. */
export function useAppViewModel(): AppViewModel {
  const [route, setRoute] = useState<Route>(routeFromHash)
  const [tint, setTint] = useState<Tint>('green')
  useEffect(() => {
    const onHash = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return {
    route,
    tint,
    setTint: (t) => (TINTS as readonly string[]).includes(t) && setTint(t as Tint),
    go: (r) => {
      window.location.hash = `/${r}`
    },
  }
}
