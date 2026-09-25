import type * as React from 'react'
import { Button, Frame, Panel, Progress, Row, Select, Stack, Table, Text } from 'noiir'
import { BENCH_SIZES } from './bench.interface.ts'
import { useBenchViewModel } from './bench.viewmodel.ts'

export function Bench(): React.ReactNode {
  const vm = useBenchViewModel()
  return (
    <Stack gap={24}>
      <Stack gap={8}>
        <Text font="title">Does Frame cost processing power?</Text>
        <Text color="dim" maxW={720}>
          Mounts and updates N product cards with each implementation (the same cards as the comparison page), forcing style and
          layout inside the timing. Seven iterations, alternating order, medians reported.
        </Text>
        {vm.dev && (
          <Text font="caption" color="accent">
            ! Dev build: React runs its development checks here. Use `npm run bench` for production numbers.
          </Text>
        )}
      </Stack>
      <Row wrap gap={12} align="end">
        <Select label="Cards" w={140} value={vm.n} onValueChange={vm.setN} options={BENCH_SIZES.map((s) => ({ value: s, label: s }))} />
        <Button kind="primary" glyph="play" onClick={vm.run} loading={vm.running}>
          Run benchmark
        </Button>
        {vm.progress !== null && <Progress label="Benchmark progress" value={vm.progress} />}
      </Row>
      {vm.result && (
        <Panel title={`Results · ${vm.result.n} cards`}>
          <Table
            columns={[
              { key: 'metric', header: 'Metric' },
              { key: 'frame', header: '<Frame />', align: 'end' },
              { key: 'css', header: 'TSX + CSS', align: 'end' },
              { key: 'diff', header: 'Frame vs CSS', align: 'end' },
            ]}
            rows={vm.rows}
            rowKey={(r) => r.metric}
          />
          <Text font="caption" color="dim">
            {vm.result.userAgent}
          </Text>
        </Panel>
      )}
      <Frame id={vm.stageId} maxH={480} scroll="y" border={1} padding={16} aria-hidden="true" />
    </Stack>
  )
}
