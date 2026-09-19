import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {addManager,getAllManagers,deleteManager,updateManager,searchManager} from "../controllers/managerController.js";

const Router = express.Router();
Router.post("/",authMiddleware,addManager);

Router.get("/",authMiddleware,getAllManagers);
Router.delete("/:id",authMiddleware,deleteManager);
Router.put("/:id", authMiddleware,updateManager);
Router.get("/search",authMiddleware,searchManager);

export default Router;