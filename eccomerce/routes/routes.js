import express from 'express'
import { deleteProduct, getProduct, postProduct, updateProduct } from '../controllers/productController.js';

const Router = express.Router();

Router.post("/",postProduct);
Router.get("/",getProduct);
Router.put("/",updateProduct);
Router.delete("/",deleteProduct);

export default Router;
