const debug = require("debug")("app");
// const User = require("../models/User")

module.exports = (User) => {
	async function get(req, res) {
		res.type('application/json');
		try {
			const resDB = await User.find();
			res.status(200);
			res.send(resDB);
		} catch (error) {
			res.status(500)
			res.send({
				error: 'an error has occured trying to get the Users'
			})
		}
	}

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
			res.status(200);
			res.send(res);
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
			const resDB = await User.create(req.body);
			res.status(200)
			res.send(resDB);
		} catch (error) {
			res.status(500)
			res.send({
				error: 'an error has occured trying to add the User'
			})
		}
	}

	async function replace(req, res) {
		res.type('application/json');
		if (!req.body.email && !req.body.password) {
			res.status(400)
			res.send({
				error: 'it must have at least one property to modify'
			})
			return
		}
		try {
			const resDB = await User.findByIdAndUpdate(req.body._id, req.body, { returnDocument: 'after' })
			res.status(200)
			res.send(resDB);
		} catch (error) {
			res.status(500)
			res.send({
				error: 'an error has occured trying to replace the User'
			})
		}
	}

	async function remove(req, res) {
		res.type('application/json');
		if (!req.body.id) {
			res.status(400)
			res.send({
				error: 'must have an id'
			})
			return
		}
		try {
			const resDB = await User.findByIdAndRemove(req.body.id)
			res.status(200)
			res.send(resDB);
		} catch (error) {
			res.status(500)
			res.send({
				error: 'an error has occured trying to remove the User'
			})
		}
	}
	return { get, login, register, replace, remove }
}