const minimist = require('minimist')
const fs = require('fs')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const cmd = args._[0]

  const command_files = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'))

  let commandFound = false;
  for (const file of command_files) {
    const cmd_name = file.replace('.js', '')
    if (cmd === cmd_name) {
      commandFound = true;
      require(`./cmds/${file}`)(args)
    }
  }

  if (!commandFound) {
    console.log('Command not found')
  }
}