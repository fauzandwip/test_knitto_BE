const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

const router = require('express').Router();

router.get('/test', (req, res) => res.send('Test Knitto'));
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);

router.use(authentication);
router.use('/products', require('./products'));
router.use('/invoices', require('./invoices'));

module.exports = router;
