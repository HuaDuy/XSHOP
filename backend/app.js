import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/product.js';
import categoryRouter from './routes/category.js';
import authRouter from './routes/auth.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressValidator from 'express-validator';


//Config

const app = express();
dotenv.config();
app.use(morgan('dev'));
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(cors());

//Middleware

app.use(expressValidator());

//Routes

app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', authRouter);


//MongoDB

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected'));
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

//listen

app.listen(port, () => {
    console.log("Server is running in post ", port);
})