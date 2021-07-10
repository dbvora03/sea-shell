const jwt = require('jsonwebtoken');
const {JWT_SECRET, redisdb} = require('../config');
const mongoose = require('mongoose');

const Command = mongoose.model('Command');
const User = mongoose.model('User');

const getCommand = async (req, res) => {
  const {commandName} = req.body;

  let foundCommand;
  redisdb.get(commandName, (err, data)=> {
    if (err) {
      Command.findOne({commandName: commandName}).then((returnedCommand) => {
        redisdb.setex(commandName, 86400, JSON.stringify(returnedCommand));
        foundCommand = returnedCommand;
      }).catch((err)=> {
        console.log(err);
      });
    }
    if (data != null) {
      foundCommand = JSON.parse(data);
    }
  });

  if (!foundCommand) {
    return res.status(422).json({error: 'This command does not exist'});
  }

  if (foundCommand.isPrivate == false) {
    const token = localStorage.getItem('jwttoken').replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          error: 'You must be logged in to access this private command',
        });
      }

      const {_id} = payload;
      User.findById(_id).then((userdata) => {
        if (foundCommand.name.includes(userdata.username)) {
          return res.status(200).json({command: foundCommand.script});
        } else {
          return res.status(401).json({
            error: 'You do not have access to this command',
          });
        }
      });
    });
  } else {
    return res.status(200).json({command: foundCommand.script});
  }
};


module.exports = getCommand;
