/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

const secrets = require('../configs/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err) {
        res.status(401).json({ error: 'make sure you are sending a proper, unedited token in the header. A token is being received, but it does not match what it should be.'})
      } else {
        res.user = {
          username: decodedToken.username,
          isCool: decodedToken.isCool
        }
        next();
      }
    });
  } else {
    res.status(404).json({ error: 'you gotta send that token to me! double check that it is being sent in the header of your axiosWithAuth'})
  }
};
