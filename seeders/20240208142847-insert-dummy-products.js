'use strict';

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const productsData = JSON.parse(
			fs.readFileSync('./dummy_data/products.json', 'utf-8')
		).map((data) => {
			return {
				...data,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
		});

		console.log(productsData);
		await queryInterface.bulkInsert('Products', productsData);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Products', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
