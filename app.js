if (process.env.NODE !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));
app.use(require('./middlewares/errorHandler.js'));

module.exports = app;
