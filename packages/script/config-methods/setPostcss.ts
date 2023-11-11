import { handlePackageFile, npmStartLog, npmSucceedLog } from '../utils'
import { spawnSync } from 'child_process'

export async function setPostcss() {
  const module = 'postcss postcss-flexbugs-fixes postcss-preset-env autoprefixer'
  npmStartLog({ module })
  spawnSync(
    'pnpm',
    ['i', '-D', '-w', 'postcss', 'postcss-flexbugs-fixes', 'postcss-preset-env', 'autoprefixer'],
    { stdio: 'inherit' },
  )
  npmSucceedLog({ module })

  const file = 'postcss.config.js'
  await handlePackageFile(file, `@fsl-std-cli/template/config-files/${file}`)
}
