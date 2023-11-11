import { program } from 'commander'
import packageJson from '../package.json' assert { type: 'json' }
import { log } from '@fsl-std-cli/script'

await import('./fslstd.init')

const { version, description } = packageJson

program.version(version, '-v, --version').description(`
      fslstd-cli version: ${version}
      node version: ${process.version}
      description: ${description}
    `)

program.on('--help', () => {
  log('')
  log('示例:')
  log('  $ fslstd init')
})

// error on unknown commands
program.on('command:*', function () {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' '),
  )
  process.exit(1)
})

/**
 * Represents a book.
 * @constructor
 */
program.parse(process.argv)

// https://github.com/tj/commander.js/#outputhelpcb
process.argv.slice(2).length === 0 && program.help()
