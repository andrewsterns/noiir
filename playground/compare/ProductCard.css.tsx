import './ProductCard.css'
import { useEffect, useRef, useState } from 'react'
import type { Product } from './product.ts'

export function ProductCard({ p, onBuy }: { p: Product; onBuy: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { setVisible(true); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const buy = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      e.currentTarget.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.04)', filter: 'brightness(1.5)', offset: 0.4 }, { transform: 'scale(1)' }],
        { duration: 300, easing: 'ease-in-out' },
      )
    }
    onBuy()
  }
  return (
    <article ref={ref} className={`product-card${visible ? ' is-visible' : ''}`}>
      <div className="product-card__media" role="img" aria-label={p.alt}
        style={{ backgroundImage: `url("${p.img}")` }} />
      <h2 className="product-card__title">{p.name}</h2>
      <p className="product-card__price">{p.price}</p>
      <button type="button" className="product-card__cta" onClick={buy}>Add to cart</button>
    </article>
  )
}
