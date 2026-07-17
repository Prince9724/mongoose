import express from 'express'

import { deleteProduct, getProduct, postProduct, updateProduct } from '../controllers/productController.js';
import { sendOtp, signIn, signUp } from '../controllers/authController.js';
import { singinValidation } from '../middleware/logger.js';
import { getUser } from '../../book/controllers/usercontroller.js';

const Router = express.Router();

Router.post("/",postProduct);
Router.get("/",getProduct);
Router.put("/",updateProduct);
Router.delete("/",deleteProduct);

Router.post("/signin",singinValidation,signIn);
Router.post("/signup",signUp)
Router.post("/sendOtp",sendOtp);
export default Router;
