const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'media/images');
	},
	filename: (req, file, cb) => {
		const filename = `file-${file.originalname}`;
		cb(null, filename);
	},
});

module.exports = multer({ storage });
