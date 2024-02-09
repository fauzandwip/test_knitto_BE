const axios = require('axios');

const createBufferFromImageURL = async (url) => {
	try {
		const { data } = await axios.get(url, { responseType: 'arraybuffer' });
		const imageBuffer = Buffer.from(data, 'binary');

		return imageBuffer;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createBufferFromImageURL,
};
