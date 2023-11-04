import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import colors from 'colors';
import connectDb from './database/dbConfig.js';
import userRouter from './routes/user.router.js'
import listingRouter from './routes/listing.router.js'
import ErrorHandler from './middlewares/errorHandler.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });



// Configurations
dotenv.config();
connectDb(process.env.MONGODB_URL);
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRECT
});


app.use(upload.array("images"))

// routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/listing', listingRouter);

// handling errors
app.use(ErrorHandler);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(colors.bgCyan(`Server running at port ${PORT}`)));

