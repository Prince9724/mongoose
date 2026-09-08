import express from "express";
import connectDB from "../../../backend/backend/configs/db";
import Router from "./routes/route";

const app = express();
connectDB();
app.use(express.json());
app.use("/auth",Router )
