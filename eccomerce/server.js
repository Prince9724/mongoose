import express from "express";
import routes from "./routes/routes.js"
import connectdb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
connectdb();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use("/api/product",routes);
app.use(cookieParser())
app.listen(5001,()=>{
    console.log("server started succesfully !! ");
})
