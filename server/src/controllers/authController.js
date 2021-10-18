const config = require("../config/config");
const crypto = require("crypto");
const salt = config.authentication.cryptoSalt;
const statusManager = require("../services/statusManager/");
const jwt = require("jsonwebtoken");

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = (User) => {

	async function register(req, res) {
		if (!req.body.email || !req.body.password) {
			return statusManager(res, 400, "User must have a email and a password");
		} 
		const query = User.where({ email: req.body.email });
		const user = await query.findOne();
		if (user) {
			return statusManager(res, 422, "The email " + user + " is already registered with an account");
		}
		const hash = crypto.pbkdf2Sync(req.body.password, salt,  
			1000, 64, "sha512").toString("hex");
			req.body.password = hash;
		try {
			const user = await User.create(req.body);
			const userJson = JSON.parse(JSON.stringify(user));
			statusManager(res, 200, {user: userJson, token: jwtSignUser(userJson)});
		} catch (error) {
			console.log(error);
			statusManager(res, 500);
		}
	}

	async function login(req, res) {
		try {
			const query = User.where({ email: req.body.email });
			const user = await query.findOne();
			if (!user) {
				return statusManager(res, 403, "The login information was incorrect");
			}
			const password = crypto.pbkdf2Sync(req.body.password, salt,  
				1000, 64, "sha512").toString("hex");
			if (password !== user.password) {
				return statusManager(res, 403, "The login information was incorrect");
			}
			const userJson = JSON.parse(JSON.stringify(user));
			statusManager(res, 200, {user: userJson, token: jwtSignUser(userJson)});
		} catch (error) {
			console.log(error);
			statusManager(res, 500);
		}
	}

	return {login, register};
};