const jwt = require('jsonwebtoken')
const config = require('../config/config')
const debug = require("debug")("app");
// const User = require("../models/User")

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = (User) => {

	async function login(req, res) {
		res.type('application/json');
		try {
			const { email, password } = req.body
			const query = User.where({ email: email });
			const user = await query.findOne()
			if (!user) {
				res.status(403)
				return res.send({
					error: 'The login information was incorrect'
				})
			}
			if (password !== user.password) {
				res.status(403)
				return res.send({
					error: 'The login information was incorrect'
				})
			}
			const userJson = user.toJSON()
			res.status(200);
			res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
		} catch (error) {
			res.status(500)
			res.send({
				error: 'an error has occured trying to get the Users'
			})
		}
	}

	async function register(req, res) {
		res.type('application/json');
		if (!req.body.email || !req.body.password) {
			res.status(400)
			res.send({
				error: 'User must have a email and a password'
			})
			return
		}
		try {
			const user = await User.create(req.body);
			res.status(200)
			const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
		} catch (error) {
			res.status(500)
			res.send({
				error: 'an error has occured trying to add the User'
			})
		}
	}

	return {login, register}
}