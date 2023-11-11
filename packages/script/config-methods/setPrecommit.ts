import { npmStartLog, npmSucceedLog, configStartLog, configSucceedLog } from '../utils'
import { spawnSync } from 'child_process'
import editJsonFile from 'edit-json-file'
import path from 'path'

export async function setPrecommit() {
  const module = 'husky lint-staged'
  npmStartLog({ module })
  spawnSync('pnpm', ['i', '-D', '-w', 'husky', 'lint-staged'], { stdio: 'inherit' })
  npmSucceedLog({ module })

  let config = 'eslint lint-stage'
  let packageJsonFile = editJsonFile(path.resolve(process.cwd(), 'package.json'))
  configStartLog({ config })
  packageJsonFile.set('lint-staged.editor/**/*\\.{tsx,ts,jsx,js}', ['eslint --fix', 'git add'])
  packageJsonFile.save()
  configSucceedLog({ config })

  config = 'stylelint lint-stage'
  packageJsonFile = editJsonFile(path.resolve(process.cwd(), 'package.json'))
  configStartLog({ config })
  packageJsonFile.set('lint-staged.editor/**/*\\.(scss|css|less|sass)', [
    'stylelint --fix',
    'git add',
  ])
  packageJsonFile.save()
  configSucceedLog({ config })

  config = 'precommit'
  configStartLog({ config })
  packageJsonFile = editJsonFile(path.resolve(process.cwd(), 'package.json'))
  packageJsonFile.set('scripts.precommit', 'lint-staged')
  packageJsonFile.set('husky.hooks.pre-commit', 'npm run precommit')
  packageJsonFile.save()
  configSucceedLog({ config })
}
