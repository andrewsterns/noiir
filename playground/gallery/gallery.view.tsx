import type * as React from 'react'
import {
  Badge, Button, Card, Checkbox, Cursor, Divider, Frame, Glyph, Grid, Input, Link, List, ListItem, Lorem, Menu, Modal,
  Panel, Placeholder, Progress, RadioGroup, Row, Select, Spinner, Stack, Table, Tabs, Text, Textarea, Toggle, Tooltip,
} from 'noiir'
import { useGalleryViewModel } from './gallery.viewmodel.ts'

export function Gallery(): React.ReactNode {
  const vm = useGalleryViewModel()
  return (
    <Stack gap={40}>
      <Stack gap={8}>
        <Frame as="h2" font="display" color={{ linear: '90deg, phosphor, accent' }} enter="type-on">
          SYSTEM READY
        </Frame>
        <Text color="dim" maxW={680}>
          Every box below is a {'<Frame>'}: no CSS files, no className, no style. Tab through the page, try the keyboard, and
          switch tint in the header.
        </Text>
      </Stack>

      <Grid min={340} gap={24}>
        <Panel title="Buttons">
          <Row wrap>
            <Button kind="primary">Primary</Button>
            <Button>Secondary</Button>
            <Button kind="ghost">Ghost</Button>
            <Button kind="danger" glyph="warn">
              Danger
            </Button>
          </Row>
          <Row wrap>
            <Button size="sm">Small</Button>
            <Button size="lg" trailing="arrow">
              Large
            </Button>
            <Button loading>Saving</Button>
            <Button disabled>Disabled</Button>
          </Row>
          <Row wrap>
            <Tooltip content="Reboot the whole grid">
              <Button glyph="play">Hover me</Button>
            </Tooltip>
            <Menu
              label="Actions"
              items={[
                { label: 'Rename', glyph: 'grip' },
                { label: 'Copy host', glyph: 'plus', onSelect: { copy: 'alpha.grid' } },
                { label: 'Disabled item', disabled: true },
                { label: 'Delete', glyph: 'close', danger: true, onSelect: vm.toastError },
              ]}
            />
          </Row>
        </Panel>

        <Panel title="Fields">
          <Input
            label="Email"
            type="email"
            placeholder="operator@grid"
            hint="Validated when you leave the field"
            value={vm.email}
            onValueChange={vm.setEmail}
            onBlur={vm.checkEmail}
            error={vm.emailError}
            required
          />
          <Select
            label="Baud rate"
            placeholder="Choose…"
            options={[
              { value: '300', label: '300' },
              { value: '1200', label: '1200' },
              { value: '2400', label: '2400' },
            ]}
          />
          <Textarea label="Message" placeholder="Type a transmission…" />
        </Panel>

        <Panel title="Choices">
          <Checkbox label="Enable scanlines" defaultChecked />
          <Checkbox label="Partial selection" indeterminate />
          <Toggle label="Carrier" defaultChecked />
          <RadioGroup
            label="Protocol"
            defaultValue="kermit"
            options={[
              { value: 'xmodem', label: 'XMODEM' },
              { value: 'kermit', label: 'Kermit' },
              { value: 'zmodem', label: 'ZMODEM (unavailable)', disabled: true },
            ]}
          />
        </Panel>

        <Panel title="Wireframe content">
          <Row align="start" gap={16}>
            <Placeholder kind="avatar" />
            <Stack grow gap={8}>
              <Text font="heading">Operator</Text>
              <Lorem lines={2} />
            </Stack>
          </Row>
          <Grid cols={2} gap={12}>
            <Placeholder kind="image" />
            <Placeholder kind="chart" />
            <Placeholder kind="map" />
            <Placeholder kind="video" />
          </Grid>
        </Panel>

        <Panel title="Type and glyphs">
          <Text font="display">Display</Text>
          <Text font="title">Title text</Text>
          <Text font="heading">Heading</Text>
          <Text>Body copy in the phosphor mono stack. {<Link href="#/compare">A link</Link>} inside it.</Text>
          <Text font="caption" color="dim">
            Caption · dim
          </Text>
          <Text font="code">const frame = &lt;Frame /&gt;</Text>
          <Row wrap gap={12}>
            {(['up', 'down', 'left', 'right', 'search', 'menu', 'check', 'close', 'star', 'info', 'warn'] as const).map((g) => (
              <Glyph key={g} name={g} />
            ))}
          </Row>
          <Row wrap>
            <Badge>DEFAULT</Badge>
            <Badge tone="solid">SOLID</Badge>
            <Badge tone="accent">ACCENT</Badge>
            <Badge tone="danger">DANGER</Badge>
          </Row>
        </Panel>

        <Panel title="Feedback">
          <Progress label="Downloading" value={vm.progress} />
          <Progress label="Connecting" />
          <Row>
            <Spinner label="Working" /> <Text color="dim">awaiting carrier</Text> <Cursor />
          </Row>
          <Row wrap>
            <Button onClick={vm.toastOk} glyph="check">
              Toast ok
            </Button>
            <Button onClick={vm.toastError} kind="danger">
              Toast error
            </Button>
            <Button onClick={vm.openModal}>Open modal</Button>
          </Row>
        </Panel>
      </Grid>

      <Panel title="Data">
        <Tabs
          label="Data views"
          items={[
            {
              id: 'table',
              label: 'Table',
              content: (
                <Stack>
                  <RadioGroup
                    label="Table state"
                    direction="row"
                    value={vm.tableState}
                    onValueChange={vm.setTableState}
                    options={[
                      { value: 'rows', label: 'Rows' },
                      { value: 'empty', label: 'Empty' },
                      { value: 'loading', label: 'Loading' },
                    ]}
                  />
                  <Table
                    caption="Grid nodes (click a row)"
                    loading={vm.tableState === 'loading'}
                    rows={vm.tableState === 'empty' ? [] : vm.nodes}
                    rowKey={(n) => n.id}
                    onRowClick={vm.selectNode}
                    isSelected={(n) => n.id === vm.selectedNode}
                    columns={[
                      { key: 'host', header: 'Host' },
                      {
                        key: 'status',
                        header: 'Status',
                        render: (n) => <Badge tone={n.status === 'offline' ? 'danger' : n.status === 'degraded' ? 'accent' : 'default'}>{n.status}</Badge>,
                      },
                      { key: 'load', header: 'Load', align: 'end', render: (n) => `${Math.round(n.load * 100)}%` },
                    ]}
                  />
                </Stack>
              ),
            },
            {
              id: 'list',
              label: 'List',
              content: (
                <List divided>
                  {vm.nodes.map((n) => (
                    <ListItem key={n.id} description={n.status} trailing={<Text color="dim">{Math.round(n.load * 100)}%</Text>} onClick={() => vm.selectNode(n)} selected={n.id === vm.selectedNode}>
                      {n.host}
                    </ListItem>
                  ))}
                </List>
              ),
            },
            { id: 'cards', label: 'Cards', content: <CardsDemo /> },
          ]}
        />
      </Panel>

      <Panel title="Frame skills">
        <Grid min={260} gap={16}>
          <Frame flow="column" gap={8} padding={16} border={{ width: 2, paint: { conic: 'from 90deg, phosphor, accent, phosphor' } }} radius="lg">
            <Text font="label">paint · edge</Text>
            <Text color="dim">Conic gradient ring that follows the radius.</Text>
          </Frame>
          <Frame flow="column" gap={8} padding={16} fill={[{ pattern: 'grid', color: 'faint' }, 'surface']} border={1} shape="chamfer">
            <Text font="label">pattern · shape</Text>
            <Text color="dim">Grid pattern fill, chamfered corners.</Text>
          </Frame>
          <Frame flow="column" gap={8} padding={16} border={1} radius="lg" hover={{ glow: 'strong', y: -4, border: 'phosphor' }} press={{ scale: 0.98 }} focusable>
            <Text font="label">state · effect</Text>
            <Text color="dim">Hover me, press me, tab to me. Pure CSS states.</Text>
          </Frame>
          <Frame
            flow="column"
            gap={8}
            padding={16}
            border={1}
            radius="lg"
            focusable
            label="Key capture area"
            onKey={{ ArrowUp: vm.logKey('↑'), ArrowDown: vm.logKey('↓'), 'shift+Enter': vm.logKey('⇧⏎'), Escape: vm.logKey('esc') }}
            onHotkey={{ 'mod+k': vm.logKey('⌘/ctrl K (global)') }}
            focus={{ border: 'phosphor', glow: 'box' }}
          >
            <Text font="label">interact · onKey</Text>
            <Text color="dim">Focus here: ↑ ↓ ⇧⏎ esc. Anywhere: mod+K.</Text>
            <Text font="code">{vm.keyLog.join('  ') || '_'}</Text>
          </Frame>
          <Frame flow="column" gap={8} padding={16} border={1} radius="lg" h={160} clip position="relative">
            <Text font="label">interact · onDrag</Text>
            <Frame
              position="absolute"
              top={64}
              left={16}
              x={vm.drag.x}
              y={vm.drag.y}
              padding={{ x: 12, y: 8 }}
              radius="md"
              fill="phosphor"
              color="on-phosphor"
              font="label"
              cursor="grab"
              select="none"
              onDrag={vm.onDrag}
              label="Draggable block"
              focusable
            >
              DRAG ME
            </Frame>
          </Frame>
          <Frame flow="column" gap={8} padding={16} border={1} radius="lg" onTrigger={{ 'gallery:ping': { animate: 'flash' } }}>
            <Text font="label">onTrigger · emit</Text>
            <Text color="dim">This box flashes on a named trigger fired elsewhere.</Text>
            <Button size="sm" onClick={vm.ping}>
              {`emit('gallery:ping') · ${vm.pings}`}
            </Button>
          </Frame>
        </Grid>
        <Divider label="reveal on scroll" />
        <Grid min={200} gap={16}>
          {[0, 1, 2, 3].map((i) => (
            <Frame key={i} reveal="boot" delay={i * 80} border={1} radius="lg" padding={16} h={96} flow="stack" align="center" justify="center">
              <Text font="label">BOOT {i + 1}</Text>
            </Frame>
          ))}
        </Grid>
      </Panel>

      <Modal
        open={vm.modalOpen}
        onClose={vm.closeModal}
        title="Reboot node"
        actions={
          <>
            <Button kind="ghost" onClick={vm.closeModal}>
              Cancel
            </Button>
            <Button kind="primary" onClick={vm.confirmModal}>
              Reboot
            </Button>
          </>
        }
      >
        <Text>alpha.grid will drop its sessions for about 40 seconds.</Text>
        <Input label="Type the host to confirm" placeholder="alpha.grid" />
      </Modal>
    </Stack>
  )
}

function CardsDemo(): React.ReactNode {
  return (
    <Grid min={220}>
      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          title={`Node ${i}`}
          subtitle="Uplink stable"
          media={<Placeholder kind="image" ratio="16/9" />}
          href="#/gallery"
          actions={<Badge>{`#${i}`}</Badge>}
        >
          <Lorem lines={2} seed={i} />
        </Card>
      ))}
    </Grid>
  )
}
