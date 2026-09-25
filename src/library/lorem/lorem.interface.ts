import type { FrameProps } from '../../frame/frame.interface.ts'

export interface LoremProps extends FrameProps {
  /** Number of lines. Default 3. */
  lines?: number
  /** 'bars' draws greeked text blocks (the wireframe look); 'text' writes real lorem ipsum. */
  mode?: 'bars' | 'text'
  /** Change the line-length pattern. */
  seed?: number
}

export interface LoremViewModel {
  mode: 'bars' | 'text'
  /** Bar widths in %, one per line. */
  widths: number[]
  text: string
  frame: FrameProps
}

export const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
