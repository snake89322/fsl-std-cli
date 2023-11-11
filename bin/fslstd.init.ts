import * as configMethods from '@fsl-std-cli/script/config-methods'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from 'commander'

/**
 * Action
 * @type {TConfigName}
 */
type TConfigName =
  | 'setEditorconfig'
  | 'setNpmrc'
  | 'setTypeScript'
  | 'setVSCode'
  | 'setGitignore'
  | 'setPostcss'
  | 'setEslint'
  | 'setStylelint'
  | 'setPrecommit'
  | 'setCommitlint'
  | 'setBrowserslistrc'
  | 'setJSDoc'
  | 'setChangelog'
interface TChoice {
  name: TConfigName
  checked: boolean
}

program
  .command('init')
  .description(chalk.cyanBright('Init project settings:'))
  .action(async () => {
    await inquirer
      .prompt([
        {
          type: 'checkbox',
          name: 'configs',
          message: 'Project settings:',
          choices: [
            new inquirer.Separator(chalk.cyanBright(' = The Base Rules = ')),
            {
              name: 'setEditorconfig',
              checked: true,
            },
            {
              name: 'setNpmrc',
              checked: true,
            },
            {
              name: 'setTypeScript',
              checked: true,
            },
            {
              name: 'setVSCode',
              checked: true,
            },
            {
              name: 'setGitignore',
              checked: true,
            },
            {
              name: 'setPostcss',
              checked: true,
            },

            new inquirer.Separator(chalk.greenBright(' = The Quality Rules = ')),
            {
              name: 'setEslint',
              checked: true,
            },
            {
              name: 'setStylelint',
              checked: true,
            },
            {
              name: 'setPrecommit',
              checked: true,
            },
            {
              name: 'setCommitlint',
              checked: true,
            },
            {
              name: 'setBrowserslistrc',
              checked: true,
            },

            new inquirer.Separator(chalk.magentaBright(' = The Advance Rules = ')),
            {
              name: 'setJSDoc',
              checked: true,
            },
            {
              name: 'setChangelog',
              checked: true,
            },

            new inquirer.Separator(' = The End = '),
          ] as TChoice[],
          validate(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one topping.'
            }

            return true
          },
        },
      ])
      .then(async ({ configs }: { configs: readonly TConfigName[] }) => {
        await configMethods.setNpmrc?.()

        for (const functionName of configs) {
          await configMethods[functionName]?.()
        }
      })
  })
