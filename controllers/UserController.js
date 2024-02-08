const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const { User } = require('../models');

class UserController {
	static async createUser(req, res, next) {
		try {
			const { email, password, username } = req.body;
			const user = await User.create({ email, password, username });

			res.status(201).json({ id: user.id, email });
		} catch (error) {
			next(error);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if (!email) {
				throw {
					name: 'BadRequest',
					message: 'Email is required',
				};
			}

			if (!password) {
				throw {
					name: 'BadRequest',
					message: 'Password is required',
				};
			}

			const user = await User.findOne({ where: { email } });

			if (!user || !comparePassword(password, user.password)) {
				throw {
					name: 'Unauthenticated',
					message: 'Invalid email/password',
				};
			}

			const access_token = signToken({ id: user.id, email: user.email });
			res.status(200).json({
				access_token,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
