const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt',async function (err, user, info) {
    console.log("user: "+user)
    console.log("error: "+err)
    console.log("info: "+info)
    
    if (err || !user) {
      res.status(403).send({
        error: 'you do not have access to this resource'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}