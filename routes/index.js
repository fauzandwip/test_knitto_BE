const router = require('express').Router();

router.get('/test', (req, res) => res.send('Test Knitto'));

module.exports = router;
