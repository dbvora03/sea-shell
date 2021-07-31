const minimist = require('minimist');
const fs = require('fs');

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const cmd = args._[0];

  const commandFiles = fs.readdirSync('./cmds/')
      .filter((file) => file.endsWith('.js'));

  let commandFound = false;
  for (const file of commandFiles) {
    const cmdname = file.replace('.js', '');
    if (cmd === cmdname) {
      commandFound = true;
      require(`./cmds/${file}`)(args);
    }
  }

  if (!commandFound) {
    console.log('Command not found');
    process.exit(1);
  }

  process.exit(0);
};
