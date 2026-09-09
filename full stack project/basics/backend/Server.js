import express from "express";
import connectDB from "../backend/config/db.js";
import Router from "./routes/route.js";

const app = express();
connectDB();
app.use(express.json());
app.use("/auth",Router )


app.listen(7000, ()=>{
    console.log("server started successfully !! ")
})