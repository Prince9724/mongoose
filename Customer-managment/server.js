import express from 'express'
import connectdb from './config/db.js'
import router from './routes/custommerroutes.js'
import { printlog } from './middleware/logger.js';

const app = express();
app.use(express.json());
connectdb();
 app.use(printlog);
app.use("/api/customer",router)
app.listen(5001,()=>{
    console.log("server started succesfully !!");
});