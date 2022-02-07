const { unlink } = require('fs');

// helper function to delete a media file.
const deleteMedia = async (filename) => {
	unlink(`${__dirname}/media/images/${filename}`, (e) => {
		if (e) res.status(500).json(e.message);
		res.status(200).json('success');
	});
};

module.exports = deleteMedia;
