'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allownull: false,
			},
			description: {
				type: Sequelize.STRING,
				allownull: false,
			},
			price: {
				type: Sequelize.INTEGER,
				allownull: false,
			},
			stock: {
				type: Sequelize.INTEGER,
				allownull: false,
			},
			brand: {
				type: Sequelize.STRING,
				allownull: false,
			},
			category: {
				type: Sequelize.STRING,
				allownull: false,
			},
			thumbnail: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('Products');
	},
};
