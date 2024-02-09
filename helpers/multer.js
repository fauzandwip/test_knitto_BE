'use strict';

const multer = require('multer');
const { nanoid } = require('nanoid');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads');
	},
	filename: function (req, file, cb) {
		const uniquePrefix = Date.now() + '-' + nanoid();
		cb(null, uniquePrefix + file.originalname);
	},
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
