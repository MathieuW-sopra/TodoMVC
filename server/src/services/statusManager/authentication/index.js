const jwt = require('jsonwebtoken')
const config = require('../../../config/config')

function jwtSignUser (user) {v
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports =  (res,status,user=undefined) => {
  res.type('application/json');
  res.status(status)
  switch (status) {
    case 200:
      const userJson = JSON.parse(JSON.stringify(user))
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
      break;
    case 400:
      res.send({
        error: 'User must have a email and a password'
      })
      break;
    case 403:
      res.send({
        error: 'The login information was incorrect'
      })
      break;
    case 422:
      res.send({
        error: 'The email ' + user + ' is already registered with an account'
      })
      break;
    case 500:
      res.send({
        error: 'an error has occured trying to get the Users'
      })
      break;
  }

}