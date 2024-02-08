const errorHandler = (err, req, res, next) => {
	let status, message, messages;
	switch (err.name) {
		case 'BadRequest':
			status = 400;
			message = err.message;
			break;

		case 'SequelizeValidationError':
			status = 400;
			messages = err.errors.map((error) => error.message);
			break;

		case 'Unauthenticated':
			status = 401;
			message = err.message ?? 'Unauthenticated';
			break;

		case 'JsonWebTokenError':
			status = 401;
			message = 'Invalid token';
			break;

		case 'Forbidden':
			status = 403;
			message = err.message ?? 'Unauthorized';
			break;

		case 'NotFound':
			status = 404;
			message = err.message ?? 'Not Found';
			break;

		case 'SequelizeUniqueConstraintError':
			status = 409;
			message = err.errors[0].message;
			break;

		default:
			status = 500;
			message = 'Internal Server Error';
			break;
	}

	console.log(err);
	res.status(status).json(message ? { message } : { messages });
};

module.exports = errorHandler;
