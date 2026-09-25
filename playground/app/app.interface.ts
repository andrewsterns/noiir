import type { Tint } from 'noiir'

export const ROUTES = ['gallery', 'compare', 'bench'] as const
export type Route = (typeof ROUTES)[number]

export interface AppViewModel {
  route: Route
  tint: Tint
  setTint: (tint: string) => void
  go: (route: string) => void
}
