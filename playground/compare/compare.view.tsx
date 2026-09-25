import type * as React from 'react'
import { Frame, Grid, Panel, Stack, Table, Text } from 'noiir'
import { ProductCard as FrameCard } from './ProductCard.frame.tsx'
import { ProductCard as CssCard } from './ProductCard.css.tsx'
import { useCompareViewModel } from './compare.viewmodel.ts'

export function Compare(): React.ReactNode {
  const vm = useCompareViewModel()
  return (
    <Stack gap={32}>
      <Stack gap={8}>
        <Text font="title">The same product card, twice</Text>
        <Text color="dim" maxW={720}>
          Gradient ring border, image, gradient 2-line title, hover lift and glow, press, fade-in on scroll, responsive width,
          reduced motion and focus ring. Left is noiir Frames; right is hand-written TSX plus a CSS file. They should look the same.
        </Text>
      </Stack>
      <Grid min={320} gap={24}>
        <Panel title="<Frame />">
          <Frame flow="row" wrap gap={16}>
            {vm.products.map((p) => (
              <FrameCard key={p.id} p={p} onBuy={() => vm.buy(p.name)} />
            ))}
          </Frame>
        </Panel>
        <Panel title="TSX + CSS">
          <Frame flow="row" wrap gap={16}>
            {vm.products.map((p) => (
              <CssCard key={p.id} p={p} onBuy={() => vm.buy(p.name)} />
            ))}
          </Frame>
        </Panel>
      </Grid>
      <Panel title="What the author had to write">
        <Table
          caption="Measured from the two source files at build time"
          columns={[
            { key: 'label', header: 'Metric' },
            { key: 'frame', header: '<Frame />', align: 'end' },
            { key: 'css', header: 'TSX + CSS', align: 'end' },
          ]}
          rows={vm.rows}
          rowKey={(r) => r.label}
        />
        <Text font="caption" color="dim">
          CSS techniques the TSX + CSS version needed: {vm.css.tricks.join(' · ')}
        </Text>
      </Panel>
    </Stack>
  )
}
