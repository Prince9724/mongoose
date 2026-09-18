import express from "express";
import connectDB from "./configs/db.js";
import Router from "./routes/route.js";

const app = express();
app.use(express.json());
connectDB();
app.use("/crud",Router);

app.listen(3001,()=>{
    console.log(" server stated succesfully !! ");
})