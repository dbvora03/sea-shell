const { version } = require('../package.json')
const helpMenu = require('../utils/helps')
const path = require('path')
const commandName = path.basename(__filename).replace('.js', '')

module.exports = (args) => {
  if (args.h || args.help) {
    console.log(commandName)
    return console.log(helpMenu[`${commandName}`])
  } else {
    console.log(`v${version}`)
  }
}