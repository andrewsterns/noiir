type Listener = (payload: unknown) => void

const listeners = new Map<string, Set<Listener>>()

/**
 * Fire a named trigger. Every mounted frame with `onTrigger={{ [name]: … }}` runs its actions.
 * Viewmodels call this directly; views use the `{ emit: name }` data action.
 */
export function emit(name: string, payload?: unknown): void {
  listeners.get(name)?.forEach((fn) => fn(payload))
}

/** Listen for a named trigger. Returns an unsubscribe function. */
export function on(name: string, fn: Listener): () => void {
  let set = listeners.get(name)
  if (!set) listeners.set(name, (set = new Set()))
  set.add(fn)
  return () => {
    set.delete(fn)
    if (!set.size) listeners.delete(name)
  }
}
