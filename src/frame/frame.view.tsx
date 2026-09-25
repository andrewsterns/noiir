import { memo } from 'react'
import type * as React from 'react'
import type { FrameProps } from './frame.interface.ts'
import { framePropsEqual, useFrameViewModel } from './frame.viewmodel.ts'

function FrameView(props: FrameProps): React.ReactNode {
  const vm = useFrameViewModel(props)
  if (!vm.present) return null
  const Tag = vm.Tag as React.ElementType
  if (vm.isVoid) return <Tag {...vm.attrs} />
  return (
    <Tag {...vm.attrs}>
      {vm.video && (
        <video
          className="n-video"
          src={vm.video.src}
          style={vm.video.opacity !== undefined ? { opacity: vm.video.opacity } : undefined}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      {vm.children}
    </Tag>
  )
}

/**
 * The one primitive. Replaces <div>, className, style and CSS files: every visual and behavioral
 * concern is a typed prop, grouped into skills (layout, size, space, place, paint, edge, type,
 * effect, state, motion, interact, respond, access). This is the only file in noiir that renders
 * raw DOM elements. Memoized: a re-render with equal props (deep for style data) is skipped.
 */
export const Frame = memo(FrameView, framePropsEqual)
Frame.displayName = 'Frame'
