import { handleWebFile } from '../utils'

export async function setGitignore() {
  const file = '.gitignore'
  const domain = `www.toptal.com`
  const fileUrl = `https://${domain}/developers/gitignore/api/macos,windows,node`

  await handleWebFile(file, fileUrl)
}
