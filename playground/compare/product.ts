export interface Product {
  id: number
  name: string
  price: string
  img: string
  alt: string
}

// Small inline SVG scenes, so the comparison and the benchmark never wait on the network.
const scene = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect width='400' height='300' fill='#171c17'/><path d='M0 220 L120 120 L200 190 L280 90 L400 200 V300 H0Z' fill='hsl(${hue} 22% 36%)'/><circle cx='310' cy='70' r='28' fill='hsl(${hue} 35% 62%)'/></svg>`,
  )}`

const NAMES = ['Phosphor Terminal', 'Vector Scope', 'Tape Deck', 'Light Pen', 'Modem 2400', 'Oscilloscope', 'Core Memory', 'Punch Reader']

export const product = (i: number, bump = 0): Product => ({
  id: i,
  name: `${NAMES[i % NAMES.length]} Mk.${Math.floor(i / NAMES.length) + 1} with a name long enough to wrap onto two lines`,
  price: `$${(49 + ((i * 37) % 400) + bump).toFixed(2)}`,
  img: scene((i * 47) % 360),
  alt: `${NAMES[i % NAMES.length]} product photo`,
})

export const products = (n: number, bump = 0): Product[] => Array.from({ length: n }, (_, i) => product(i, bump))
