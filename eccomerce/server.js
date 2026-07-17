import express from "express";
import routes from "./routes/routes.js"
import connectdb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv  from "dotenv";

dotenv.config();
const app = express();
connectdb();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use("/api/product",routes);
app.use(cookieParser())
app.listen(process.env.PORT,()=>{
    console.log("server started succesfully !! ");
})
