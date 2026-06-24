 import  express from 'express'
import connectdb from './config/db.js'
import route from './routes/bookroutes.js'


const app = express();
app.use(express.json());// middleware -> its validate request before sending to the server 
connectdb();    
app.use("/",route);

app.listen(5000, ()=>{
    console.log("server started successfully !! ");
})

