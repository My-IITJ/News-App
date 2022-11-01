require('express-async-errors');
// require('./passport');

const dotenv = require('dotenv');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const dbConnect = require('./db/mongoConnect');
const path = require('path');
const upload = require('./middlewares/multer');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const tagRouter = require('./routes/tag');
const authRouter = require('./routes/auth');

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
app.use(morgan('dev'));
app.use(
	cookieSession({
		name: 'app-session',
		keys: ['my-iitj-dev'],
		maxAge: 24 * 60 * 60 * 100,
	})
);
app.use((err, req, res, next) => {
	res.status(500).json(err.message);
});

//routers
app.use(
	'/api/media/images',
	express.static(path.join(__dirname, '/media/images')) //render our media
);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/tags', tagRouter);
app.use('/auth', authRouter);

//test: delete later
app.post('/upload', upload.single('file'), async (req, res) => {
	console.log(req.file);
	res.status(200).json({
		url: `http://localhost:8080/api/media/images/${req.file?.filename}`,
	});
});

app.get('/test', (req, res) => {
	console.log('recieved auth request');
	const obj = {
		name: 'Neil',
		pics: [0, 1, 2],
		age: 21,
	};
	res.redirect('myiitj://login?data=' + JSON.stringify(obj));
});

app.listen(PORT, (req, res) => {
	console.log(`Server Started at PORT ${PORT}`);
});
