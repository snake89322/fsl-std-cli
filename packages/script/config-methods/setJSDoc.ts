import {
  configStartLog,
  configSucceedLog,
  npmStartLog,
  npmSucceedLog,
  handlePackageFile,
} from '../utils'
import { spawnSync } from 'child_process'
import editJsonFile from 'edit-json-file'
import path from 'path'

export async function setJSDoc() {
  // https://jsdoc.app/
  // https://github.com/SoftwareBrothers/better-docs#customization
  const module = 'jsdoc'
  npmStartLog({ module })
  spawnSync('pnpm', ['i', '-D', 'jsdoc', 'better-docs', 'taffydb'], { stdio: 'inherit' })
  npmSucceedLog({ module })

  const file = '.jsdoc.json'
  await handlePackageFile(file, `@fsl-std-cli/template/config-files/${file}`)

  const config = 'jsdoc'
  configStartLog({ config })
  const packageJsonFile = editJsonFile(path.resolve(process.cwd(), 'package.json'))
  packageJsonFile.set('scripts.generate-docs', 'jsdoc --configure .jsdoc.json --verbose')
  packageJsonFile.save()
  configSucceedLog({ config })
}
