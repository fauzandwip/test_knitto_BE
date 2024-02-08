'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class OrderItem extends Model {
		static associate(models) {
			OrderItem.belongsTo(models.Invoice, { foreignKey: 'InvoiceId' });
			OrderItem.belongsTo(models.Product, { foreignKey: 'ProductId' });
		}
	}
	OrderItem.init(
		{
			InvoiceId: DataTypes.INTEGER,
			ProductId: DataTypes.STRING,
			quantity: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'OrderItem',
		}
	);
	return OrderItem;
};
