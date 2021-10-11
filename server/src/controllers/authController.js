const jwt = require('jsonwebtoken')
const config = require('../config/config')
const crypto = require('crypto')
const salt = config.authentication.cryptoSalt

module.exports = (User) => {

	function jwtSignUser (user) {
		const ONE_WEEK = 60 * 60 * 24 * 7;
		return jwt.sign(user, config.authentication.jwtSecret, {
			expiresIn: ONE_WEEK
		})
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
		try {
			const user = await User.create(req.body);
			res.status(200)
			const userJson = JSON.parse(JSON.stringify(user))
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
			const userJson = JSON.parse(JSON.stringify(user))
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

	return {jwtSignUser, login, register}
}