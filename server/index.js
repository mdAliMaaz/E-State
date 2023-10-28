import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';
import connectDb from './database/dbConfig.js';
import userRouter from './routes/user.router.js'
import ErrorHandler from './middlewares/errorHandler.js';


const app = express();

// Configurations
dotenv.config();
connectDb(process.env.MONGODB_URL);
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1/user', userRouter);

// handling errors
app.use(ErrorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(colors.bgCyan(`Server running at port ${PORT}`)));

