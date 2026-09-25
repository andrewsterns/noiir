import type { Paint, PaintLayer } from '../paint/paint.interface.ts'
import type { AccessProps, Tag } from './access.interface.ts'

export const VOID_TAGS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])

interface InferInput extends Pick<AccessProps, 'as'> {
  href?: string | undefined
  onClick?: unknown
}

/** The element Frame renders: explicit `as`, else a link for `href`, a button for `onClick`, else a div. */
export function inferTag(p: InferInput): Tag {
  if (p.as) return p.as
  if (p.href !== undefined) return 'a'
  if (p.onClick !== undefined) return 'button'
  return 'div'
}

const hasImage = (fill: Paint | undefined): boolean =>
  fill !== undefined && (Array.isArray(fill) ? fill : [fill as PaintLayer]).some((l) => typeof l === 'object' && 'image' in l)

interface AttrInput extends AccessProps {
  tag: string
  fill?: Paint | undefined
  hasChildren: boolean
  tabIndex?: number | undefined
  type?: string | undefined
}

/** ARIA and semantics attributes. An image fill with a label and no children becomes role="img". */
export function accessAttrs(p: AttrInput): Record<string, unknown> {
  const a: Record<string, unknown> = {}
  const role = p.role ?? (p.tag === 'div' && p.label && !p.hasChildren && hasImage(p.fill) ? 'img' : undefined)
  if (role) a.role = role
  if (p.label !== undefined) a['aria-label'] = p.label
  if (p.labelledBy) a['aria-labelledby'] = p.labelledBy
  if (p.describedBy) a['aria-describedby'] = p.describedBy
  if (p.live) a['aria-live'] = p.live
  if (p.hidden === true) a.hidden = true
  if (p.focusable && p.tabIndex === undefined) a.tabIndex = 0
  if (p.tag === 'button' && p.type === undefined) a.type = 'button'
  return a
}
