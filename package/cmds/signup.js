const ora = require('ora');
const axios = require('axios');

module.exports = async (args) => {
  const spinner = ora().start();

  try {
    if (!args.e || !args.p || !args.u) {
      console.log('Include username, email, and password');
      return;
    }

    const results = await axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      body: {
        email: args.e,
        password: args.p,
        username: args.u,
      },
    });

    spinner.stop();

    if (results.error) {
      console.log(results.error);
    } else {
      console.log('successfully signed up');
    }
  } catch (err) {
    spinner.stop();
    console.log(err);
  }
};
