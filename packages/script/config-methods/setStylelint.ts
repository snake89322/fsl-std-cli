import { handlePackageFile, npmStartLog, npmSucceedLog } from '../utils'
import { spawnSync } from 'child_process'

export async function setStylelint() {
  const module = 'stylelint'
  npmStartLog({ module })
  spawnSync(
    'pnpm',
    [
      'i',
      '-D',
      '-w',
      'stylelint',
      'stylelint-scss',
      'stylelint-config-recommended-scss',
      'stylelint-config-standard',
      'stylelint-config-prettier',
      'stylelint-prettier',
    ],
    { stdio: 'inherit' },
  )
  npmSucceedLog({ module })

  const file = '.stylelintrc.json'
  await handlePackageFile(file, `@fsl-std-cli/template/config-files/${file}`)
}
