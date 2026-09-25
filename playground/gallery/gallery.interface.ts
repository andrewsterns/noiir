import type { DragInfo } from 'noiir'

export interface Node {
  id: string
  host: string
  status: 'online' | 'degraded' | 'offline'
  load: number
}

export interface GalleryViewModel {
  modalOpen: boolean
  openModal: () => void
  closeModal: () => void
  confirmModal: () => void

  tableState: string
  setTableState: (s: string) => void
  nodes: Node[]
  selectedNode: string | null
  selectNode: (n: Node) => void

  progress: number

  email: string
  emailError: string | undefined
  setEmail: (v: string) => void
  checkEmail: () => void

  drag: { x: number; y: number }
  onDrag: (d: DragInfo) => void

  keyLog: string[]
  logKey: (label: string) => () => void

  pings: number
  ping: () => void

  toastOk: () => void
  toastError: () => void
}
