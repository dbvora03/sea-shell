const mongoose = require('mongoose');
const {logger} = require('../config');
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
    name: req.user.username + '/' + name,
    description: description,
    script: script,
    creator: req.user,
    isPrivate: isPrivate,
  });

  newCommand.save().then((result) => {
    res.status(200).json({
      message: `${req.user.username}/${name} saved successfully`,
      command: result,
    });
  }).catch((err) => {
    logger.error(err);
  });
};

module.exports = addCommand;
