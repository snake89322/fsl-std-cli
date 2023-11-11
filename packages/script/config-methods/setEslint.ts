import { npmStartLog, npmSucceedLog, configStartLog, configSucceedLog } from '../utils'
import { spawnSync } from 'child_process'
import editJsonFile from 'edit-json-file'
import path from 'path'

export async function setEslint() {
  // eslint setting
  let module = 'eslint'
  npmStartLog({ module })
  spawnSync('pnpm', ['i', '-D', '-w', 'eslint', '@eslint/create-config'], { stdio: 'inherit' })
  // setting file type use JSON
  spawnSync('npx', ['eslint', '--init'], { stdio: 'inherit' })
  npmSucceedLog({ module })

  // prettier setting
  module = 'prettier'
  npmStartLog({ module })
  spawnSync(
    'pnpm',
    ['i', '-D', '-w', 'prettier', 'eslint-config-prettier', 'eslint-plugin-prettier'],
    {
      stdio: 'inherit',
    },
  )
  npmSucceedLog({ module })

  let config = 'eslint'
  configStartLog({ config })
  const eslintrcFile = editJsonFile(path.resolve(process.cwd(), '.eslintrc.json'))
  configSucceedLog({ config })

  config = 'prettier'
  configStartLog({ config })
  eslintrcFile.set(
    'extends',
    ([] as string[]).concat([eslintrcFile.get('extends') || []].flat()).concat('prettier'),
  )
  eslintrcFile.set(
    'plugins',
    ([] as string[]).concat([eslintrcFile.get('plugins') || []].flat()).concat('prettier'),
  )
  eslintrcFile.set(
    'rules',
    Object.assign({}, eslintrcFile.get('rules'), {
      'prettier/prettier': ['error', { singleQuote: true, semi: false, printWidth: 100 }],
    }),
  )

  eslintrcFile.save()
  configSucceedLog({ config })
}
