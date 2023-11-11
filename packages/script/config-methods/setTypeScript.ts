import { npmStartLog, npmSucceedLog } from '../utils'
import { spawnSync } from 'child_process'

export async function setTypeScript() {
  const module = 'typescript'
  npmStartLog({ module })
  spawnSync('pnpm', ['i', '-D', '-w', 'typescript'], { stdio: 'inherit' })
  spawnSync('npx', ['tsc', '--init'], { stdio: 'inherit' })
  npmSucceedLog({ module })
}
