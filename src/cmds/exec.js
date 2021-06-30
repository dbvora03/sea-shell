const ora = require('ora')

module.exports = async (args) => {

    const spinner = ora(`executing ${args._[1]}`).start()

  }