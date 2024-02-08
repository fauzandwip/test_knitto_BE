const { Product } = require('../models');

class ProductController {
	static async addProduct(req, res, next) {
		try {
			const { title, description, price, stock, brand, category, thumbnail } =
				req.body;

			const newProduct = await Product.create({
				title,
				description,
				price,
				stock,
				brand,
				category,
				thumbnail,
			});

			res.status(201).json(newProduct);
		} catch (error) {
			next(error);
		}
	}

	static async getProducts(req, res, next) {
		try {
			const products = await Product.findAll();
			res.status(200).json(products);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ProductController;
