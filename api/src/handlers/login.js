const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET, logger} = require('../config');

const User = mongoose.model('User');

const login = (req, res) => {
  const {email, password} = req.body;

  while (!email || !password) {
    res.status(422).json({error: 'add all fields'});
  }

  User.findOne({email: email}).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json(
          {error: 'Invalid email or password, please sign up!'},
      );
    }
    bcrypt.compare(password, savedUser.password).then((doesMatch)=> {
      if (doesMatch) {
        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
        const {_id, username, email} = savedUser;

        return res.status(200).json({
          token: token,
          user: {
            _id, username, email,
          },
        });
      }
    }).catch((err)=> {
      logger.error(err);
    });
  }).catch((err)=> {
    logger.error(err);
  });
};


module.exports = login;
