import express from "express"
import { postTodo } from "../controllers/authController.js";

const Router = express.Router();

Router.post("/post",postTodo);


export default Router ;