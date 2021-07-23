const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {BCRYPTHASH} = require('../config');

const User = mongoose.model('User');


const signup = async (req, res) => {
  const {username, email, password} = req.body;

  if (!email || !password || !username) {
    return res.status(422).json({error: 'Add all of the fields please'});
  }

  User.findOne({username: username}).then((founduser) => {
    if (founduser) {
      return res.status(422).json({error: 'Username already taken'});
    }

    User.findOne({email: email}).then((savedEmail) => {
      if (savedEmail) {
        return res.status(422).json({error: 'Email already taken'});
      }

      bcrypt.hash(password, BCRYPTHASH).then((hashedpassword) => {
        console.log(hashedpassword);
        const user = new User({
          email: email,
          password: hashedpassword,
          username: username,
        });
        user.save();

        return res.status(202).json({
          message: 'User has been saved',
          user: user,
        });
      }).catch((err) => {
        return res.status(500).json({error: err});
      });
    }).catch((err)=> {
      return res.status(500).json({error: err});
    });
  }).catch((err)=> {
    return res.status(500).json({error: err});
  });
};

module.exports = signup;
