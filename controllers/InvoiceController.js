const { nanoid } = require('nanoid');
const { sequelize, Product, Invoice, OrderItem, User } = require('../models');

class InvoiceController {
	static async createInvoice(req, res, next) {
		const t = await sequelize.transaction();
		try {
			const userId = req.user.id;
			const { products } = req.body;

			// console.log(userId);

			for (const productData of products) {
				const product = await Product.findByPk(productData.id);
				// console.log(product);

				if (!product) {
					throw {
						name: 'NotFound',
						message: 'Product Not Found',
					};
				}

				if (product.stock === 0) {
					throw {
						name: 'BadRequest',
						message: 'Empty Stock',
					};
				}
			}

			const newInvoice = await Invoice.create(
				{
					UserId: userId,
					orderId: `trx-${userId}-${nanoid()}`,
					orderStatus: 'process',
				},
				{ transaction: t }
			);

			// console.log(
			// 	'🚀 ~ InvoiceController ~ createInvoice ~ newInvoice:',
			// 	newInvoice
			// );

			for (const productData of products) {
				await OrderItem.create(
					{
						InvoiceId: newInvoice.id,
						ProductId: productData.id,
						quantity: productData.quantity,
					},
					{ transaction: t }
				);
			}

			await t.commit();
			res.status(201).send({ invoiceId: newInvoice.id });
		} catch (error) {
			await t.rollback();
			next(error);
		}
	}

	static async getInvoiceByOrderId(req, res, next) {
		try {
			const { orderId } = req.params;

			const invoice = await Invoice.findOne({
				where: {
					orderId,
				},
				include: [
					{
						model: OrderItem,
						include: {
							model: Product,
						},
					},
					{
						model: User,
						attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
					},
				],
			});

			res.status(200).send(invoice);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = InvoiceController;
