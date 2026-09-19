import express from "express";

import { addUser, signupUser } from "../controllers/adminController.js";

const Router = express.Router();

Router.post("/admin/register", addUser);
Router.post("/admin/login",signupUser);
export default Router;