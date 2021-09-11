const ora = require('ora');
const axios = require('axios');

module.exports = async (args) => {
  const spinner = ora().start();

  try {
    if (!args.e || !args.p) {
      console.log('Include both email and password');
      return;
    }

    const results = await axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      body: {
        email: args.e,
        password: args.p,
      },
    });

    spinner.stop();

    if (results.err) {
      console.log('Invalid credentials');
    } else {
      console.log('successfully logged in');
      localStorage.set('seashell-jwt', 'Bearer ' + results.token);
    }
  } catch (err) {
    spinner.stop();
    console.log(err);
  }
};
