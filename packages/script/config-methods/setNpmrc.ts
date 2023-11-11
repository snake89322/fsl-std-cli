import { handlePackageFile } from '../utils'

export async function setNpmrc() {
  const file = '.npmrc'
  await handlePackageFile(file, `@fsl-std-cli/template/config-files/${file}`)
}
