import { handlePackageFile } from '../utils'

export async function setBrowserslistrc() {
  const file = '.browserslistrc'
  await handlePackageFile(file, `@fsl-std-cli/template/config-files/${file}`)
}
