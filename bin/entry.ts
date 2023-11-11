#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const launchArgs = [
  '--no-warnings',
  '--enable-source-maps',
  '--experimental-loader',
  new URL('./loader.js', import.meta.url).href,
  fileURLToPath(new URL('./fslstd.js', import.meta.url)),
]
const frodoArgs = process.argv.slice(2)

const frodo = spawn(process.execPath, [...launchArgs, ...frodoArgs], {
  stdio: 'inherit',
  shell: false,
})

frodo.on('exit', (code) => {
  process.exitCode = code ?? undefined
})
