const mongoose = require('mongoose');
const Command = mongoose.model('Command');

const deleteCommand = (req, res) => {
  Command.findOne({_id: req.params.commandId}).exec((err, returnedCommand) => {
    if (err || !returnedCommand) {
      return res.status(422).json({error: err});
    }

    if (returnedCommand.author._id.toString() === req.user._id.toString()) {
      returnedCommand.remove().then((result) => {
        return res.status(200).json({
          message: 'Removed your command',
          result: result,
        });
      }).catch((err) => {
        return res.status(422).json(
            {error: 'Cannot delete your message, try again later'},
        );
      });
    }
  });
};

module.exports = deleteCommand;
