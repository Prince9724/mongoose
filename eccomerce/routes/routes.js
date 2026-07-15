import express from 'express'

import { deleteProduct, getProduct, postProduct, updateProduct } from '../controllers/productController.js';
import { signIn, signUp } from '../controllers/authController.js';
import { singinValidation } from '../middleware/logger.js';

const Router = express.Router();

Router.post("/",postProduct);
Router.get("/",getProduct);
Router.put("/",updateProduct);
Router.delete("/",deleteProduct);

Router.post("/signin",singinValidation,signIn);
Router.post("/signup",signUp)

export default Router;
