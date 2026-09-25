import { Frame, Text } from 'noiir'
import type { Product } from './product.ts'

export function ProductCard({ p, onBuy }: { p: Product; onBuy: () => void }) {
  return (
    <Frame as="article" flow="column" gap={12} padding={16} w="fill" fill="surface" radius="lg"
      border={{ paint: { linear: '135deg, phosphor, transparent 70%' } }}
      hover={{ y: -4, glow: 'box' }} press={{ scale: 0.98 }} reveal="fade-up" at={{ md: { w: 280 } }}>
      <Frame aspect="4/3" radius="md" fill={{ image: p.img }} label={p.alt} />
      <Text font="title" color={{ linear: '90deg, phosphor, accent' }} clamp={2}>{p.name}</Text>
      <Text color="dim">{p.price}</Text>
      <Frame onClick={[{ animate: 'pulse' }, onBuy]} minH={44} radius="md" fill="phosphor" color="on-phosphor"
        font="label" hover={{ glow: 'box' }} press={{ scale: 0.97 }}>
        Add to cart
      </Frame>
    </Frame>
  )
}
