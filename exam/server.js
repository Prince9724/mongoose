import express from 'express'
import Router from './routes/route.js';
import connectdb from './config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth",Router);
connectdb();

app.listen(process.env.PORT,()=>{
    console.log("server started successfully !!");
})
