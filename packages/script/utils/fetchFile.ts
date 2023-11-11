import fse from 'fs-extra'
import fetch from 'node-fetch'
import path from 'path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
import { type IFileToLocal, type IFileLog, gitlabConfig } from './types'
import { spinner } from './logs'
import chalk from 'chalk'

export async function fetchFileToLocal({
  file,
  fileUrl,
  dir = process.cwd(),
  callback = () => {},
}: IFileToLocal) {
  return await new Promise((resolve, reject) => {
    fetch(fileUrl)
      .then(async (res) => await res.text())
      .then((text) => {
        const filePath = path.resolve(dir, file)
        fse.ensureFileSync(filePath)
        fse.writeFile(filePath, text, 'utf8', () => {
          callback()
          resolve(null)
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export async function fetchPackageFileToLocal({
  file,
  fileUrl,
  dir = process.cwd(),
  callback = () => {},
}: IFileToLocal) {
  const text = fs.readFileSync(fileURLToPath(import.meta.resolve(fileUrl)), 'utf8')
  const filePath = path.resolve(dir, file)
  fse.ensureFileSync(filePath)
  fse.writeFile(filePath, text, 'utf8', () => {
    callback()
  })
}

export async function fetchGitlabFileToLocal({
  file,
  dir = process.cwd(),
  callback = () => {},
}: Omit<IFileToLocal, 'fileUrl'>) {
  return await new Promise((resolve, reject) => {
    const { accessToken, fileUrl } = gitlabConfig.gitlab
    const { head, tail } = fileUrl

    fetch(`${head}${encodeURIComponent(file)}${tail}`, {
      method: 'GET',
      headers: {
        'PRIVATE-TOKEN': accessToken,
      },
    })
      .then(async (res) => await res.text())
      .then((text) => {
        const filePath = path.resolve(dir, file)
        fse.ensureFileSync(filePath)
        fse.writeFile(filePath, text, 'utf8', () => {
          callback()
          resolve(null)
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const fetchGitlabFileToLocalStartLog = ({ file }: IFileLog) => {
  spinner.text = `${chalk.cyan(file)} fetchFileFromGitlab: ${chalk.yellow(
    gitlabConfig.gitlab.domain,
  )}`
  spinner.start()
}
export const fetchFileFromGitlabSucceedLog = ({ file }: IFileLog) => {
  spinner.succeed(
    chalk.green(
      `${chalk.cyan(file)} fetchFileFromGitlab: ${chalk.yellow(gitlabConfig.gitlab.domain)}`,
    ),
  )
}

export const fetchFileStartLog = ({ file, fileUrl }: IFileLog) => {
  spinner.text = `${chalk.cyan(file)} fetchFile: ${chalk.yellow(fileUrl)}`
  spinner.start()
}
export const fetchFileSucceedLog = ({ file, fileUrl }: IFileLog) => {
  spinner.succeed(chalk.green(`${chalk.cyan(file)} fetchFile: ${chalk.yellow(fileUrl)}`))
}

export async function handlePackageFile(
  file: IFileToLocal['file'],
  fileUrl: IFileToLocal['fileUrl'],
) {
  fetchFileStartLog({ file, fileUrl })
  await fetchPackageFileToLocal({ file, fileUrl })
  fetchFileSucceedLog({ file, fileUrl })
}

export async function handleWebFile(file: IFileToLocal['file'], fileUrl: IFileToLocal['fileUrl']) {
  fetchFileStartLog({ file, fileUrl })
  await fetchFileToLocal({ file, fileUrl })
  fetchFileSucceedLog({ file, fileUrl })
}
