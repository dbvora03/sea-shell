const logout = (req, res) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'You need to be logged in to log out'});
  }

  req.headers.authorization = '';
  return res.status(200).json({error: 'You have been logged out'});
};


module.exports = logout;
