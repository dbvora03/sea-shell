/*
const jwt = require('jsonwebtoken');
const {JWT_SECRET, redisdb, logger} = require('../config');
const mongoose = require('mongoose');

const Command = mongoose.model('Command');

const getCommand = async (req, res) => {
  const {commandName} = req.body;

  console.log('1')
  redisdb.get(commandName, (err, data)=> {

    console.log('2')
    if (err) {
      logger.error('Error checking cache');
      res.status(500).send(err);
    }

    if (data == null) {
      console.log('3')

      Command.findOne({name: commandName}).then((returnedCommand) => {
        console.log('4')

        if (!returnedCommand) {
          return res.status(422).json({error: 'This command does not exist'});
        }

        redisdb.setex(commandName, 86400, JSON.stringify(returnedCommand));
        const dbValue = returnedCommand;


        if (dbValue.isPrivate) {
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

            if (_id === dbValue.creator) {
              return res.status(200).json({command: dbValue});
            } else {
              return res.status(401).json({
                error: 'You do not have access to this command',
              });
            }
          });
        } else {
          return res.status(200).json({command: dbValue});
        };
      }).catch((err)=> {
        logger.error(err);
      });
    } else {
      const dbValue = JSON.parse(data);
      if (dbValue.isPrivate) {
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

          if (_id === dbValue.creator) {
            return res.status(200).json({command: dbValue});
          } else {
            return res.status(401).json({
              error: 'You do not have access to this command',
            });
          }
        });
      } else {
        return res.status(200).json({command: dbValue});
      };
    }
  });
};

module.exports = getCommand;
