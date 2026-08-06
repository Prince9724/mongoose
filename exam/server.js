import express from 'express'
import Router from './routes/route.js';
import connectdb from './config/db.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth",Router);
connectdb();

app.listen(3500,()=>{
    console.log("server started successfully !!");
})
