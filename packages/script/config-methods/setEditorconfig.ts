import { handlePackageFile } from '../utils'

export async function setEditorconfig() {
  const file = '.editorconfig'
  await handlePackageFile(file, `@fsl-std-cli/template/config-files/${file}`)
}
