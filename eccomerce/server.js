import express from "express";
import routes from "./routes/routes.js"
import connectdb from "./config/db.js";
import cors from "cors";
const app = express();
connectdb();
app.use(express.json());
app.use(cors());
app.use("/api/product",routes);
app.listen(5001,()=>{
    console.log("server started succesfully !! ");
})
