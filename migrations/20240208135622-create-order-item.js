'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('OrderItems', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			InvoiceId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Invoices',
					key: 'id',
				},
			},
			ProductId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Products',
					key: 'id',
				},
			},
			quantity: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('OrderItems');
	},
};
