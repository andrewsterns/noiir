import { useEffect, useRef, useState } from 'react'
import { emit, toast } from 'noiir'
import type { GalleryViewModel, Node } from './gallery.interface.ts'

const NODES: Node[] = [
  { id: 'n1', host: 'alpha.grid', status: 'online', load: 0.42 },
  { id: 'n2', host: 'beta.grid', status: 'degraded', load: 0.87 },
  { id: 'n3', host: 'gamma.grid', status: 'online', load: 0.18 },
  { id: 'n4', host: 'delta.grid', status: 'offline', load: 0 },
]

export function useGalleryViewModel(): GalleryViewModel {
  const [modalOpen, setModalOpen] = useState(false)
  const [tableState, setTableState] = useState('rows')
  const [selectedNode, setSelectedNode] = useState<string | null>('n1')
  const [progress, setProgress] = useState(0)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>()
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const [keyLog, setKeyLog] = useState<string[]>([])
  const [pings, setPings] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => (p >= 1 ? 0 : Math.min(1, p + 0.05))), 300)
    return () => clearInterval(t)
  }, [])

  return {
    modalOpen,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
    confirmModal: () => {
      setModalOpen(false)
      toast('Node rebooted', { kind: 'ok' })
    },

    tableState,
    setTableState,
    nodes: NODES,
    selectedNode,
    selectNode: (n) => setSelectedNode(n.id),

    progress,

    email,
    emailError,
    setEmail: (v) => {
      setEmail(v)
      if (emailError && /.+@.+\..+/.test(v)) setEmailError(undefined)
    },
    checkEmail: () => setEmailError(email && !/.+@.+\..+/.test(email) ? 'That does not look like an email address' : undefined),

    drag,
    onDrag: (d) => {
      if (d.phase === 'start') dragStart.current = drag
      setDrag({ x: dragStart.current.x + d.dx, y: dragStart.current.y + d.dy })
    },

    keyLog,
    logKey: (label) => () => setKeyLog((log) => [label, ...log].slice(0, 5)),

    pings,
    ping: () => {
      setPings((n) => n + 1)
      emit('gallery:ping')
    },

    toastOk: () => toast('Transmission complete', { kind: 'ok' }),
    toastError: () => toast('Carrier lost. Retrying…', { kind: 'error' }),
  }
}
