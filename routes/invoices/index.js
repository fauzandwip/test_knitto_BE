const InvoiceController = require('../../controllers/InvoiceController');

const router = require('express').Router();

router.get('/:orderId', InvoiceController.getInvoiceById);
router.post('/', InvoiceController.createInvoice);

module.exports = router;
