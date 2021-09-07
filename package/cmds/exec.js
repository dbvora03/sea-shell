const ora = require('ora');
const axios = require('axios');

module.exports = async (args) => {
  const spinner = ora(`executing ${args._[1]}`).start();

  try {
    console.log(args._[1]);

    const results = await axios({
      method: 'get',
      url: 'http://localhost:8080/getCommand',
      body: {
        'commandName': args._[1],
      },
    });
    spinner.stop();

    console.log(results);
  } catch (err) {
    spinner.stop();
    console.log(err);
  }
};
