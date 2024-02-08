const bcrypt = require('bcryptjs');

module.exports = {
	hashPassword: (password) => {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	},
	comparePassword: (password, hashedPassword) => {
		return bcrypt.compareSync(password, hashedPassword);
	},
};
