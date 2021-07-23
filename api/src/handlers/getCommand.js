const jwt = require('jsonwebtoken');
const {JWT_SECRET, redisdb, logger} = require('../config');
const mongoose = require('mongoose');

const Command = mongoose.model('Command');

const getCommand = async (req, res) => {
  const {commandName} = req.body;

  let foundCommand;
  redisdb.get(commandName, (err, data)=> {
    if (err) {
      logger.error('Error checking cache');
      res.status(500).send(err);
    }

    if (data == null) {
      Command.findOne({name: commandName}).then((returnedCommand) => {
        if (!returnedCommand) {
          return res.status(422).json({error: 'This command does not exist'});
        }
        redisdb.setex(commandName, 86400, JSON.stringify(returnedCommand));
        foundCommand = returnedCommand;
      }).catch((err)=> {
        logger.error(err);
      });
    }

    if (data != null) {
      foundCommand = JSON.parse(data);
    }

    if (foundCommand.isPrivate) {
      const {authorization} = req.headers;

      if (!authorization) {
        return res.status(401).json({
          error: 'You must be logged in to use this command',
        });
      }

      const token = authorization.replace('Bearer ', '');

      jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) return res.status(401).json('You must be logged in!');

        const {_id} = payload;

        if (_id === foundCommand.creator) {
          return res.status(200).json({command: foundCommand});
        } else {
          return res.status(401).json({
            error: 'You do not have access to this command',
          });
        }
      });
    } else {
      return res.status(200).json({command: foundCommand});
    }
  });
};

module.exports = getCommand;
