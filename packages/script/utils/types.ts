export interface IFileToLocal {
  file: string
  fileUrl: string
  dir?: string
  callback?: () => void
}

export interface IFileLog extends Pick<IFileToLocal, 'file'> {
  fileUrl?: IFileToLocal['fileUrl']
}

export interface INpmLog {
  module: string
}

export interface IConfigLog {
  config: string
}

export const gitlabConfig = {
  gitlab: {
    domain: '[gitlab domain]',
    accessToken: '[gitlab accessToken]',
    fileUrl: {
      head: 'https://[gitlab domain]/api/v4/projects/[75098]/repository/files/[settings%2F]',
      tail: '/raw?ref=master',
    },
  },
}
