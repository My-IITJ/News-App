require('express-async-errors');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./db/mongoConnect');
const path = require('path');
const upload = require('./middlewares/multer');

//dotenv
dotenv.config();

//express instance
const app = express();

//mongodb
dbConnect();

// PORT
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((err, req, res, next) => {
	res.status(500).json(err.message);
});

//routers
app.use(
	'/api/media/images',
	express.static(path.join(__dirname, '/media/images')) //render our media
);

//test
app.post('/upload', upload.single('file'), async (req, res) => {
	console.log(req.file);
	res.status(200).json({
		url: `http://localhost:8080/api/media/images/${req.file?.filename}`,
	});
});

app.listen(PORT, (req, res) => {
	console.log(`Server Started at PORT ${PORT}`);
});
