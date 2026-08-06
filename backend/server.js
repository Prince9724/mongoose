import express from 'express'
import Router from './routes/route.js';
import connectdb from './config/db.js';

const app = express();

app.use(express.json());
app.use("/auth",Router);
connectdb();

app.listen(3000,()=>{
    console.log("server started successfully !!");
})
