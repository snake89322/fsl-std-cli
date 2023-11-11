#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const launchArgs = [
  '--no-warnings',
  '--enable-source-maps',
  '--experimental-loader',
  new URL('./loader.js', import.meta.url).href,
  fileURLToPath(new URL('./fstd.js', import.meta.url)),
]
const fstdArgs = process.argv.slice(2)

const fstd = spawn(process.execPath, [...launchArgs, ...fstdArgs], {
  stdio: 'inherit',
  shell: false,
})

fstd.on('exit', (code) => {
  process.exitCode = code ?? undefined
})
