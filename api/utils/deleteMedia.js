const { unlink } = require('fs');

const deleteMedia = async (filename) => {
	unlink(`${__dirname}/images/${filename}`, (e) => {
		if (e) console.log(e);
		res.status(200).json('success');
	});
};

module.exports = deleteMedia;
