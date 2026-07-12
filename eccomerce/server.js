import express from "express";
import routes from "./routes/routes.js"

const app = express();
app.use(express.json());
app.use("/api/product",routes);

app.listen(5001,()=>{
    console.log("server started succesfully !! ");
})
