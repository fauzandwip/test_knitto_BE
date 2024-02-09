const axios = require('axios');

const createBufferFromImageURL = async (url) => {
	try {
		const { data } = await axios.get(url, { responseType: 'arrayBuffer' });
		const imageBuffer = Buffer.from(data);

		return imageBuffer;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createBufferFromImageURL,
};
