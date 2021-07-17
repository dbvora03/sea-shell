const mongoose = require('mongoose');
const Command = mongoose.model('Command');

const addCommand = (req, res) => {
  const {
    name,
    description,
    script,
    isPrivate,
  } = req.body;

  if (!name || !script) {
    return res.status(404).json('Please provide all of the fields');
  }

  req.user.password = undefined;

  const newCommand = new Command({
    name: name,
    description: description,
    script: script,
    creator: req.user,
    isPrivate: isPrivate,
  });

  newCommand.save().then((result) => {
    res.status(200).json({
      message: 'Command saved successfully',
      command: result,
    });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = addCommand;
