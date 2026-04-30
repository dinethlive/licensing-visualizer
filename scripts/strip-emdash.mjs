// Strip em dashes from all source/doc files.
//
// Re-runnable: this script uses unicode escapes (—) for the em dash so it
// does NOT match its own source when re-run.
//
//   " — "  ->  ", "
//   "—"    ->  "-"
//
// Run with: node scripts/strip-emdash.mjs

import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const EM_SPACED = new RegExp(' \\u2014 ', 'g')
const EM_BARE = new RegExp('\\u2014', 'g')

let totalFiles = 0
let totalReplacements = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (/\.(tsx?|css|md|json|html|mjs)$/.test(entry.name)) processFile(p)
  }
}

function processFile(file) {
  const before = fs.readFileSync(file, 'utf8')
  const emCount = (before.match(EM_BARE) || []).length
  if (emCount === 0) return

  const after = before.replace(EM_SPACED, ', ').replace(EM_BARE, '-')
  totalReplacements += emCount
  totalFiles++
  fs.writeFileSync(file, after, 'utf8')
  console.log(`updated ${path.relative(cwd, file)} (${emCount} em dash(es))`)
}

walk(cwd)
console.log(`\nDone. ${totalReplacements} replacement(s) across ${totalFiles} file(s).`)
