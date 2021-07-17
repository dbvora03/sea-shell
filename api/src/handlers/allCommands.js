const mongoose = require('mongoose');
const Command = mongoose.model('Command');

const allCommands = (req, res) => {
  Command.find({creator: req.user._id}).then((commands) => {
    return res.status(200).json({commands});
  }).catch((err) => {
    return res.status(400).send({error: 'Could not retrieve commands'});
  });
};

module.exports = allCommands;
