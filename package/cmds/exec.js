const ora = require('ora');
const axios = require('axios');
const execSync = require('child_process').execSync;

module.exports = async (args) => {
  const spinner = ora(`executing ${args._[1]}`).start();

  try {
    console.log(args._[1]);

    const results = await axios({
      method: 'post',
      url: 'http://localhost:8080/getCommand',
      body: {
        'commandName': args._[1],
      },
    });
    spinner.stop();

    const output = execSync(results.command.script, {encoding: 'utf-8'});
    console.log(output);
  } catch (err) {
    spinner.stop();
    console.log(err);
  }
};
