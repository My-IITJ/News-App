import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbConnect from './db/mongoConnect.js';

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

//routers

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
