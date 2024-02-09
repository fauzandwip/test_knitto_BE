const ProductController = require('../../controllers/ProductController');
const multerUpload = require('../../helpers/multer');

const router = require('express').Router();

router.get('/', ProductController.getProducts);
router.post(
	'/',
	multerUpload.single('imageFile'),
	ProductController.addProduct
);
router.put('/:id', ProductController.updateProduct);
router.patch('/:id/stock', ProductController.updateStockProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
