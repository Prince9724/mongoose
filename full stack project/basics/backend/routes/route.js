import express from "express";
import { signUp } from "../controllers/authController.js";

const Router = express.Router();

Router.post("/signUp", signUp);

export default Router;