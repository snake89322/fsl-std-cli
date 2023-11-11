import { program } from 'commander'
import packageJson from '../package.json' assert { type: 'json' }
import { log } from '@fsl-std-cli/script'
import figlet from 'figlet'

const { name, version, description } = packageJson

figlet(name, function (err, data) {
  if (err) {
    console.log('Something went wrong...')
    console.dir(err)
    return
  }
  console.log(data)
})

await import('./fstd.init')

program.version(version, '-v, --version').description(`
      ${name} version: ${version}
      node version: ${process.version}
      description: ${description}
    `)

program.on('--help', () => {
  log('')
  log('Example:')
  log('  $ fstd init')
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
