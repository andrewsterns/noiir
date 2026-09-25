import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Badge, Button, Card, Checkbox, Cursor, Divider, Glyph, Grid, Input, Link, List, ListItem, Lorem, Menu, Modal,
  Panel, Placeholder, Progress, RadioGroup, Row, Screen, Select, Spacer, Spinner, Stack, Table, Tabs, Text,
  Textarea, Toaster, Toggle, Tooltip, toast,
} from '../index.ts'

describe('structure', () => {
  it('Screen scopes the tint and paints the tube', () => {
    render(<Screen tint="amber">tube</Screen>)
    const el = screen.getByText('tube')
    expect(el.getAttribute('style')).toContain('--n-c-phosphor: #ceb06c')
    expect(el.hasAttribute('data-screen')).toBe(true)
  })
  it('Stack, Row, Grid and Spacer render frames', () => {
    render(
      <Stack>
        <Row>
          a<Spacer />b
        </Row>
        <Grid min={200}>c</Grid>
      </Stack>,
    )
    expect(screen.getByText('c').tagName).toBe('DIV')
  })
  it('Divider is a separator, with or without a label', () => {
    render(
      <>
        <Divider />
        <Divider label="Section" />
      </>,
    )
    expect(screen.getAllByRole('separator')).toHaveLength(2)
    expect(screen.getByRole('separator', { name: 'Section' })).toBeTruthy()
  })
})

describe('content', () => {
  it('Text picks its element from the font', () => {
    render(
      <>
        <Text font="title">Title</Text>
        <Text font="label">Label</Text>
        <Text>Body</Text>
      </>,
    )
    expect(screen.getByText('Title').tagName).toBe('H2')
    expect(screen.getByText('Label').tagName).toBe('SPAN')
    expect(screen.getByText('Body').tagName).toBe('P')
  })
  it('Link opens external links safely', () => {
    render(
      <Link href="https://example.com" external>
        docs
      </Link>,
    )
    const a = screen.getByRole('link', { name: /docs/ })
    expect(a.getAttribute('rel')).toBe('noopener noreferrer')
    expect(a.getAttribute('target')).toBe('_blank')
  })
  it('Placeholder is a labelled image with a caption chip', () => {
    render(<Placeholder kind="video" />)
    expect(screen.getByRole('img', { name: 'video placeholder' })).toBeTruthy()
    expect(screen.getByText('VIDEO 16:9')).toBeTruthy()
  })
  it('Lorem draws hidden bars or real text', () => {
    const { container } = render(<Lorem lines={4} />)
    expect(container.firstElementChild!.children).toHaveLength(4)
    render(<Lorem mode="text" lines={1} />)
    expect(screen.getByText(/^Lorem ipsum/)).toBeTruthy()
  })
  it('Glyph is hidden unless labelled', () => {
    render(
      <>
        <Glyph name="search" />
        <Glyph name="warn" label="Warning" />
      </>,
    )
    expect(screen.getByRole('img', { name: 'Warning' }).textContent).toBe('!')
  })
})

describe('controls', () => {
  it('Button runs actions and blocks them while loading', () => {
    const save = vi.fn()
    const { rerender } = render(<Button onClick={save}>Save</Button>)
    fireEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(save).toHaveBeenCalledOnce()
    rerender(
      <Button onClick={save} loading>
        Save
      </Button>,
    )
    const btn = screen.getByRole('button', { name: /Save/ })
    expect(btn.getAttribute('aria-busy')).toBe('true')
    fireEvent.click(btn)
    expect(save).toHaveBeenCalledOnce()
  })
  it('Button with href is a link', () => {
    render(<Button href="/next">Next</Button>)
    expect(screen.getByRole('link', { name: 'Next' })).toBeTruthy()
  })
  it('Input wires label, hint and error', async () => {
    const onValueChange = vi.fn()
    render(<Input label="Email" hint="Work address" error="Required" onValueChange={onValueChange} />)
    const input = screen.getByLabelText('Email')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    const described = input.getAttribute('aria-describedby')!.split(' ').map((id) => document.getElementById(id)?.textContent)
    expect(described).toEqual(['Work address', '! Required'])
    expect(screen.getByRole('alert').textContent).toBe('! Required')
    await userEvent.type(input, 'hi')
    expect(onValueChange).toHaveBeenLastCalledWith('hi')
  })
  it('Textarea and Select are labelled fields', () => {
    render(
      <>
        <Textarea label="Notes" />
        <Select label="Tint" placeholder="Choose…" options={[{ value: 'green', label: 'Green' }, { value: 'amber', label: 'Amber' }]} />
      </>,
    )
    expect(screen.getByLabelText('Notes').tagName).toBe('TEXTAREA')
    expect((screen.getByLabelText('Tint') as HTMLSelectElement).options).toHaveLength(3)
  })
  it('Checkbox toggles [ ] ↔ [x]', () => {
    const onCheckedChange = vi.fn()
    render(<Checkbox label="Remember me" onCheckedChange={onCheckedChange} />)
    const box = screen.getByRole('checkbox', { name: /Remember me/ })
    expect(box.getAttribute('aria-checked')).toBe('false')
    fireEvent.click(box)
    expect(box.getAttribute('aria-checked')).toBe('true')
    expect(box.textContent).toContain('[x]')
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })
  it('RadioGroup moves the selection with arrow keys and has one tab stop', () => {
    render(
      <RadioGroup
        label="Size"
        options={[
          { value: 's', label: 'Small' },
          { value: 'm', label: 'Medium', disabled: true },
          { value: 'l', label: 'Large' },
        ]}
        defaultValue="s"
      />,
    )
    const radios = screen.getAllByRole('radio')
    expect(radios.map((r) => r.tabIndex)).toEqual([0, -1, -1])
    fireEvent.keyDown(radios[0]!, { key: 'ArrowDown' })
    expect(radios[2]!.getAttribute('aria-checked')).toBe('true') // skipped the disabled one
    expect(document.activeElement).toBe(radios[2])
    expect(screen.getByRole('radiogroup', { name: 'Size' })).toBeTruthy()
  })
  it('Toggle is a switch', () => {
    render(<Toggle label="Scanlines" defaultChecked />)
    const sw = screen.getByRole('switch', { name: /Scanlines/ })
    expect(sw.getAttribute('aria-checked')).toBe('true')
    fireEvent.click(sw)
    expect(sw.getAttribute('aria-checked')).toBe('false')
  })
})

describe('containers', () => {
  it('Card is a named article; clickable cards are keyboard-operable', () => {
    const open = vi.fn()
    render(<Card title="Node 7" onClick={open} />)
    const card = screen.getByRole('article', { name: 'Node 7' })
    fireEvent.keyDown(card, { key: 'Enter' })
    expect(open).toHaveBeenCalledOnce()
  })
  it('Panel is a named region', () => {
    render(<Panel title="Status">ok</Panel>)
    expect(screen.getByRole('region', { name: 'Status' })).toBeTruthy()
  })
  it('List renders markers; interactive items are buttons', () => {
    const pick = vi.fn()
    render(
      <List>
        <ListItem>plain</ListItem>
        <ListItem onClick={pick}>pick me</ListItem>
      </List>,
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: /pick me/ }))
    expect(pick).toHaveBeenCalledOnce()
  })
  it('Table shows rows, an empty state, and a loading skeleton', () => {
    const cols = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
    ]
    const { rerender } = render(<Table columns={cols} rows={[{ id: 1, name: 'alpha' }]} caption="Nodes" />)
    expect(screen.getByRole('table', { name: 'Nodes' })).toBeTruthy()
    expect(screen.getByRole('cell', { name: 'alpha' })).toBeTruthy()
    rerender(<Table columns={cols} rows={[]} />)
    expect(screen.getByText('-- NO DATA --')).toBeTruthy()
    rerender(<Table columns={cols} rows={[]} loading />)
    expect(screen.getByRole('table').getAttribute('aria-busy')).toBe('true')
  })
})

describe('navigation and overlays', () => {
  it('Tabs follow the WAI-ARIA keyboard pattern', () => {
    render(
      <Tabs
        label="Views"
        items={[
          { id: 'a', label: 'Alpha', content: 'alpha panel' },
          { id: 'b', label: 'Beta', content: 'beta panel' },
        ]}
      />,
    )
    const [a, b] = screen.getAllByRole('tab')
    expect(a!.getAttribute('aria-selected')).toBe('true')
    fireEvent.keyDown(a!, { key: 'ArrowRight' })
    expect(b!.getAttribute('aria-selected')).toBe('true')
    expect(document.activeElement).toBe(b)
    expect(screen.getByRole('tabpanel', { name: 'Beta' }).textContent).toBe('beta panel')
  })
  it('Menu opens, moves with arrows, runs the item and returns focus', async () => {
    const del = vi.fn()
    render(<Menu label="Actions" items={[{ label: 'Rename' }, { label: 'Delete', onSelect: del, danger: true }]} />)
    const trigger = screen.getByRole('button', { name: /Actions/ })
    fireEvent.click(trigger)
    await act(async () => {})
    const items = screen.getAllByRole('menuitem')
    expect(document.activeElement).toBe(items[0])
    fireEvent.keyDown(items[0]!, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(items[1])
    fireEvent.click(items[1]!)
    expect(del).toHaveBeenCalledOnce()
    await act(async () => {})
    expect(screen.queryByRole('menu')).toBeNull()
    expect(document.activeElement).toBe(trigger)
  })
  it('Modal traps focus, closes on Escape, and restores focus', async () => {
    function Demo() {
      const [open, setOpen] = React.useState(false)
      return (
        <>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <Modal open={open} onClose={() => setOpen(false)} title="Confirm" actions={<Button>OK</Button>}>
            body
          </Modal>
        </>
      )
    }
    render(<Demo />)
    const opener = screen.getByRole('button', { name: 'Open' })
    opener.focus()
    fireEvent.click(opener)
    const dialog = screen.getByRole('dialog', { name: 'Confirm' })
    expect(dialog.contains(document.activeElement)).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' })
    await act(async () => {})
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(opener)
    expect(document.body.style.overflow).toBe('')
  })
  it('Modal portals inside the nearest Screen so it keeps the tint', () => {
    render(
      <Screen tint="amber" label="tube">
        <Modal open onClose={() => {}} title="Inside">
          body
        </Modal>
      </Screen>,
    )
    const tube = screen.getByLabelText('tube')
    expect(tube.contains(screen.getByRole('dialog', { name: 'Inside' }))).toBe(true)
  })
  it('Tooltip describes its trigger on focus', async () => {
    render(
      <Tooltip content="Deletes forever">
        <Button>Delete</Button>
      </Tooltip>,
    )
    const btn = screen.getByRole('button', { name: 'Delete' })
    act(() => btn.focus())
    await act(async () => {
      await new Promise((r) => setTimeout(r, 5))
    })
    expect(screen.getByRole('tooltip').textContent).toBe('Deletes forever')
    expect(btn.getAttribute('aria-describedby')).toBe(screen.getByRole('tooltip').id)
  })
  it('toast() shows a message in the Toaster', () => {
    render(<Toaster />)
    act(() => toast('Saved', { kind: 'ok' }))
    expect(screen.getByRole('status').textContent).toContain('Saved')
    act(() => toast('Disk full', { kind: 'error' }))
    expect(screen.getByRole('alert').textContent).toContain('Disk full')
  })
})

describe('feedback', () => {
  it('Progress draws the bar and reports its value', () => {
    render(<Progress label="Upload" value={0.5} width={10} />)
    const bar = screen.getByRole('progressbar', { name: 'Upload' })
    expect(bar.getAttribute('aria-valuenow')).toBe('50')
    expect(bar.textContent).toBe('[█████░░░░░]50%')
  })
  it('Spinner, Badge and Cursor render', () => {
    render(
      <>
        <Spinner label="Loading" />
        <Badge tone="solid">NEW</Badge>
        <Cursor />
      </>,
    )
    expect(screen.getByRole('status', { name: 'Loading' })).toBeTruthy()
    expect(screen.getByText('NEW')).toBeTruthy()
  })
})
