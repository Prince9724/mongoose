import express from "express";
import { addBook, deleteBook, getBook, testing, updateBook } from "../controllers/bookcontroller.js";
import { checkTime } from "../../Customer-managment/middleware/logger.js";
import { getUser, signIn, signUp } from "../controllers/usercontroller.js";
import { checkAuthentication } from "../middleware/logger.js";

const router = express.Router();
    //book Routes============
router.post("/",checkAuthentication,addBook);
router.get("/" ,checkAuthentication,getBook);
router.put("/",checkAuthentication,updateBook);
router.delete("/",checkAuthentication,deleteBook);
//=============
//userRoutes

router.post("/signup",signUp);
router.post("/signin",signIn);
router.get("/signin",getUser);

// // router.get("/test/:id",testing)//url me jo number pass kiya hai vo id parameter ke ander gya hai jo bookcontroller ke ander pass hua hai.
//  router.get("/test/:action",testing)//jab koi aur value bhi get krna hoga to pahle waale ko comment krna hoga kyuki params one time keval ek value get krta hai.
// router.get("/test",testing);//url ke me sabse pahle ? fir without spacing key:value aur agr ek data paas krna hai to &key:value space nahi dena hai 
export default router;

