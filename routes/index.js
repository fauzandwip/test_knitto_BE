const UserController = require('../controllers/UserController');

const router = require('express').Router();

router.get('/test', (req, res) => res.send('Test Knitto'));
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);

router.use('/products', require('./products'));

module.exports = router;
