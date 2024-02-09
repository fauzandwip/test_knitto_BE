'use strict';

const fs = require('fs');
const { createBufferFromImageURL } = require('../helpers/createBuffer');
const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const productsData = JSON.parse(
			fs.readFileSync('./dummy_data/products.json', 'utf-8')
		);

		const promiseProducts = productsData.map(async (data) => {
			const newObject = { ...data };
			delete newObject.thumbnail;

			const bufferImage = await createBufferFromImageURL(data.thumbnail);
			const uniquePrefix = Date.now() + '-' + nanoid();
			const imageURL =
				'uploads/' +
				uniquePrefix +
				'-' +
				data.title.split(' ').join('') +
				'.jpg';

			fs.writeFileSync(imageURL, bufferImage);

			return {
				...newObject,
				thumbnail: imageURL,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
		});

		const resultProducts = await Promise.all(promiseProducts);

		await queryInterface.bulkInsert('Products', resultProducts);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Products', null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		});
	},
};
