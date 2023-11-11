import { handlePackageFile } from '../utils'

export async function setVSCode() {
  const fileExtensions = '.vscode/extensions.json'
  await handlePackageFile(fileExtensions, `@fsl-std-cli/template/config-files/${fileExtensions}`)

  const fileSettings = '.vscode/settings.json'
  await handlePackageFile(fileSettings, `@fsl-std-cli/template/config-files/${fileSettings}`)
}
