import { npmStartLog, npmSucceedLog, configStartLog, configSucceedLog } from '../utils'
import { spawnSync } from 'child_process'
import editJsonFile from 'edit-json-file'
import path from 'path'

export async function setChangelog() {
  const module = 'commitizen conventional-changelog conventional-changelog-cli'
  npmStartLog({ module })
  spawnSync(
    'pnpm',
    [
      'i',
      '-D',
      '-w',
      'commitizen',
      'conventional-changelog',
      'conventional-changelog-cli',
      'cz-conventional-changelog',
    ],
    {
      stdio: 'inherit',
    },
  )
  npmSucceedLog({ module })

  const config = 'changelog'
  const packageJsonFile = editJsonFile(path.resolve(process.cwd(), 'package.json'))
  configStartLog({ config })
  packageJsonFile.set(
    'scripts.version',
    'conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md',
  )
  packageJsonFile.set('config.commitizen', {
    path: './node_modules/cz-conventional-changelog',
  })
  packageJsonFile.save()
  configSucceedLog({ config })
}
