import express from "express";
import connectdb from "./config/db.js";
import router from "./routes/authRoute.js";

const app = express();
app.use(express.json());
app.use("/", router);

connectdb();

app.listen(4000, ()=>{
    console.log("Server is started !");
})