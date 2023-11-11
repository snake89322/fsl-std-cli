import {
  npmStartLog,
  npmSucceedLog,
  configStartLog,
  configSucceedLog,
  handlePackageFile,
} from '../utils'

import { spawnSync } from 'child_process'
import editJsonFile from 'edit-json-file'
import path from 'path'

export async function setCommitlint() {
  const module = '@commitlint/cli @commitlint/config-conventional'
  npmStartLog({ module })
  spawnSync('pnpm', ['i', '-D', '-w', '@commitlint/cli', '@commitlint/config-conventional'], {
    stdio: 'inherit',
  })
  npmSucceedLog({ module })

  const file = '.commitlintrc.json'
  await handlePackageFile(file, `@fsl-std-cli/template/config-files/${file}`)

  const config = 'commitlint'
  const packageJsonFile = editJsonFile(path.resolve(process.cwd(), 'package.json'))
  configStartLog({ config })
  packageJsonFile.set('scripts.commit', 'npx git-cz')
  packageJsonFile.set('husky.hooks.commit-msg', 'commitlint -E HUSKY_GIT_PARAMS')
  packageJsonFile.save()
  configSucceedLog({ config })
}
