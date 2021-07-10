const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');


const signup = async (req, res) => {
  const {username, email, password} = req.body;

  if (!email || !password || !username) {
    return res.status(422).json({error: 'Add all of the fields please'});
  }

  const possibleUsername = User.findOne({username: username});
  const possibleEmail = User.findOne({email: email});

  if (possibleEmail) {
    return res.status(404).json(
        {error:
           'This email already exists, please pick another one or log in',
        },
    );
  }

  if (possibleUsername) {
    return res.status(404).json(
        {error:
           'This username already exists, please pick another one or log in',
        },
    );
  }

  bcrypt.hash(password, BCRYPTHASH).then((hashedpassword) => {
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
  });
};


module.exports = signup;
