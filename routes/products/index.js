const ProductController = require('../../controllers/ProductController');

const router = require('express').Router();

router.get('/', ProductController.getProducts);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.patch('/:id/stock', ProductController.updateStockProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
