const ora = require('ora');
const axios = require('axios');
const fs = require('fs');

module.exports = async (args) => {
  const spinner = ora().start();

  try {
    const filePath = args.f;
    const fileContents = fs.readFileSync(filePath).toString();
    const jwtToken = localStorage.getItem('seash-jwt');

    const results = await axios({
      method: 'post',
      url: 'http://localhost:8080/addCommand',
      body: {
        name: args.name,
        description: args.description,
        script: fileContents,
        isPrivate: args.private,
      },
      headers: {
        authorization: jwtToken,
      },
    });

    spinner.stop();

    if (results.err) {
      console.log('Command could not be added');
    } else {
      console.log('Successfully added command to your library');
    }
  } catch (err) {
    spinner.stop();
    console.log(err);
  }
};
