import ora from 'ora'
import { type IConfigLog, type INpmLog } from './types'
import chalk from 'chalk'
export const log = console.log
export const spinner = ora('Loading unicorns')

export const npmStartLog = ({ module }: INpmLog) => {
  spinner.text = `npm install ${chalk.cyan(module)}`
  spinner.start()
}
export const npmSucceedLog = ({ module }: INpmLog) => {
  spinner.succeed(chalk.green(`${chalk.cyan(module)} install succeed`))
}
export const npmFailLog = ({ module }: INpmLog) => {
  spinner.succeed(chalk.red(`${chalk.cyan(module)} install fail`))
}

export const configStartLog = ({ config }: IConfigLog) => {
  spinner.text = `set ${chalk.cyan(config)}`
  spinner.start()
}
export const configSucceedLog = ({ config }: IConfigLog) => {
  spinner.succeed(chalk.green(`${chalk.cyan(config)} set succeed`))
}
