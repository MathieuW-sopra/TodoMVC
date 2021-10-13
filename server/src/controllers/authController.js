const config = require('../config/config')
const crypto = require('crypto')
const salt = config.authentication.cryptoSalt
const statusManager = require('../services/statusManager/authentication/index')

module.exports = (User) => {

	async function register(req, res) {
		if (!req.body.email || !req.body.password) {
			return statusManager(res, 400);
		} 
		const query = User.where({ email: req.body.email });
		const user = await query.findOne()
		if (user) {
			return statusManager(res, 422, req.body.email);
		}
		const hash = crypto.pbkdf2Sync(req.body.password, salt,  
			1000, 64, `sha512`).toString(`hex`);
			req.body.password = hash;
		try {
			const user = await User.create(req.body);
			statusManager(res,200,user);
		} catch (error) {
			console.log(error)
			statusManager(res, 500);
		}
	}

	async function login(req, res) {
		try {
			const query = User.where({ email: req.body.email });
			const user = await query.findOne()
			if (!user) {
				return statusManager(res, 403);
			}
			const password = crypto.pbkdf2Sync(req.body.password, salt,  
				1000, 64, `sha512`).toString(`hex`)
			if (password !== user.password) {
				return statusManager(res, 403);
			}
			statusManager(res,200,user);
		} catch (error) {
			console.log(error)
			statusManager(res, 500);
		}
	}

	return {login, register}
}