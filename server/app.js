import 'dotenv/config';
import session from 'express-session';
import { rateLimit } from 'express-rate-limit';
import express from 'express';
import helmet from 'helmet';
import cors from "cors";

const app = express();

app.use(cors({
    credentials: true,
    origin: true
}));

app.use(express.static('public'));
app.use(express.json());
app.use(helmet())

const authRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    limit: 10,
    message: "Too many attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/auth", authRateLimiter); 

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10min
    limit: 30, 
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

import userRouter from './routers/userRouter.js';
app.use(userRouter);

import xssRouter from './routers/xssRouter.js';
app.use(xssRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});