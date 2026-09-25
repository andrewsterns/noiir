// Declaration files keep the source's `.ts` / `.tsx` import specifiers; consumers need `.js`.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = fileURLToPath(new URL('../dist/types', import.meta.url))
let files = 0
for (const entry of readdirSync(dir, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.d.ts')) continue
  const file = join(entry.parentPath, entry.name)
  const src = readFileSync(file, 'utf8')
  const out = src.replace(/(from\s+|import\()(['"])(\.{1,2}\/[^'"]+?)\.tsx?\2/g, '$1$2$3.js$2')
  if (out !== src) {
    writeFileSync(file, out)
    files++
  }
}
console.log(`fix-dts: rewrote imports in ${files} declaration files`)
