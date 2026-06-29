 import  express from 'express'
import connectdb from './config/db.js'
import route from './routes/bookroutes.js'
import cors from 'cors'

const app = express();
app.use(express.json());// middleware -> its validate request before sending to the server 
app.use(cors());
connectdb();    


app.use("/api/book",route);
app.listen(5000, ()=>{
    console.log("server started successfully !! ");
})

