const jwt = require('jsonwebtoken')
const config = require('../config/config')
const debug = require("debug")("app");
const crypto = require('crypto')
let salt = 'f844b09ff50c'
// const User = require("../models/User")

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = (User) => {

	async function register(req, res) {
		res.type('application/json');
		if (!req.body.email || !req.body.password) {
			res.status(400)
			res.send({
				error: 'User must have a email and a password'
			})
			return
		}
		const query = User.where({ email: req.body.email });
		const user = await query.findOne()
		if (user) {
			res.status(400)
			res.send({
				error: 'The email ' + req.body.email + ' is already registered with an account'
			})
			return
		}
		let hash = crypto.pbkdf2Sync(req.body.password, salt,  
			1000, 64, `sha512`).toString(`hex`);
			req.body.password = hash;
			console.log("req.body: "+req.body)
		try {
			const user = await User.create(req.body);
			// const user = await User.create(req.body);
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

	async function login(req, res) {
		res.type('application/json');
		try {
			const query = User.where({ email: req.body.email });
			const user = await query.findOne()
			if (!user) {
				res.status(403)
				return res.send({
					error: 'The login information was incorrect'
				})
			}
			const password = crypto.pbkdf2Sync(req.body.password, salt,  
				1000, 64, `sha512`).toString(`hex`)
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

	return {login, register}
}