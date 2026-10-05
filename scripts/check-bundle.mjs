import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { gzipSync } from 'node:zlib'

// Total compressed bytes across all emitted chunks, including lazy chunks.
const budgets = { '.js': 90 * 1024, '.css': 20 * 1024 }
const totals = { '.js': 0, '.css': 0 }
const files = await readdir('dist/assets', {
  recursive: true,
  withFileTypes: true,
})
for (const file of files) {
  const extension = extname(file.name)
  if (file.isFile() && Object.hasOwn(budgets, extension)) {
    const contents = await readFile(join(file.parentPath, file.name))
    totals[extension] += gzipSync(contents).length
  }
}
if (!totals['.js'] || !totals['.css']) {
  throw new Error('Expected built JavaScript and CSS. Run npm run build first.')
}
for (const [extension, limit] of Object.entries(budgets)) {
  console.log(
    `${extension}: ${(totals[extension] / 1024).toFixed(1)} KiB gzip / ${limit / 1024} KiB budget`,
  )
  if (totals[extension] > limit) {
    console.error(
      `${extension} exceeds its bundle budget. Review dependencies and generated assets.`,
    )
    process.exitCode = 1
  }
}
