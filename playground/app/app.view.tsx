import type * as React from 'react'
import { Cursor, Frame, Row, Screen, Select, Text, Toaster } from 'noiir'
import { Gallery } from '../gallery/gallery.view.tsx'
import { Compare } from '../compare/compare.view.tsx'
import { Bench } from '../bench/bench.view.tsx'
import { useAppViewModel } from './app.viewmodel.ts'

const NAV = [
  { id: 'gallery', label: 'GALLERY' },
  { id: 'compare', label: 'FRAME vs CSS' },
  { id: 'bench', label: 'BENCH' },
] as const

export function App(): React.ReactNode {
  const vm = useAppViewModel()
  return (
    <Screen tint={vm.tint}>
      <Frame as="header" flow="row" wrap align="center" gap={16} padding={{ x: 24, y: 16 }} border={{ sides: ['bottom'] }}>
        <Frame as="h1" font="display" enter="boot">
          NOIIR
          <Cursor />
        </Frame>
        <Text font="caption" color="dim" grow>
          one primitive · CRT wireframe standard library
        </Text>
        <Frame as="nav" label="Pages">
          <Row gap={4}>
            {NAV.map((n) => (
              <Frame
                key={n.id}
                href={`#/${n.id}`}
                selected={vm.route === n.id}
                aria-current={vm.route === n.id ? 'page' : undefined}
                padding={{ x: 12, y: 6 }}
                radius="md"
                font="label"
                color="dim"
                border={1}
                hover={{ color: 'phosphor', border: 'phosphor' }}
                states={{ selected: { fill: 'phosphor', color: 'on-phosphor', border: 'phosphor' } }}
              >
                {n.label}
              </Frame>
            ))}
          </Row>
        </Frame>
        <Select
          label="Tint"
          hideLabel
          w={140}
          value={vm.tint}
          onValueChange={vm.setTint}
          options={[
            { value: 'green', label: 'P1 GREEN' },
            { value: 'amber', label: 'P3 AMBER' },
            { value: 'white', label: 'P4 WHITE' },
          ]}
        />
      </Frame>
      <Frame as="main" padding={{ x: 24, y: 32 }} maxW={1200} margin={{ x: 'auto' }}>
        {vm.route === 'gallery' && <Gallery />}
        {vm.route === 'compare' && <Compare />}
        {vm.route === 'bench' && <Bench />}
      </Frame>
      <Toaster />
    </Screen>
  )
}
