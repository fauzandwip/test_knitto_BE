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

	static async updateProduct(req, res, next) {
		try {
			const { id } = req.params;
			const { title, description, price, stock, brand, category, thumbnail } =
				req.body;

			const product = await Product.findByPk(id);

			if (!product) {
				throw {
					name: 'NotFound',
					message: 'Product not found',
				};
			}

			product.update({
				title,
				description,
				price,
				stock,
				brand,
				category,
				thumbnail,
			});

			res.status(200).json({ message: `Product success to update` });
		} catch (error) {
			next(error);
		}
	}

	static async updateStockProduct(req, res, next) {
		try {
			const { id } = req.params;
			const { stock } = req.body;

			const product = await Product.findByPk(id);

			if (!product) {
				throw {
					name: 'NotFound',
					message: 'Product not found',
				};
			}

			product.update({
				stock,
			});

			res.status(200).json({ message: `Product stock success to update` });
		} catch (error) {
			next(error);
		}
	}

	static async deleteProduct(req, res, next) {
		try {
			const { id } = req.params;

			const product = await Product.findByPk(id);

			if (!product) {
				throw {
					name: 'NotFound',
					message: 'Product not found',
				};
			}

			product.destroy();

			res.status(200).json({ message: `Product success to delete` });
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ProductController;
