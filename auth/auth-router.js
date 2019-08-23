const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Auth = require('./auth-model.js');
const generateToken = require('../configs/token-stuff');

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  Auth.add(user)
    .then(user => {
      res.status(201).json({ success: `${user.username} has been successfully added to the database`})
    })
    .catch(err => {
      res.status(500).json({ error: 'there was an oopsies on my side', err})
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  Auth.findBy({ username })
    .first()
    .then(user => {
      if(user) {
        if(user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: `welcome, ${user.username}. here is a TOKEN of my appreciation.`, token })
        } else {
          res.status(401).json({ error: 'the users password did not match. check that it is spelled correctly. '})
        }
      } else {
        res.status(404).json({ error: 'user not found. check that the username matches on already in the database and that it is spelled correctly.' })
      } 
    })
    .catch(err => {
      res.status(500).json({ error: 'there was an internal server error while logging in, here is the error.', err })
    });
});

module.exports = router;
