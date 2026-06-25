import express from "express";
import { addBook, deleteBook, getBook, testing, updateBook } from "../controllers/bookcontroller.js";

const router = express.Router();

router.post("/",addBook);
router.get("/",getBook);
router.put("/",updateBook);
router.delete("/",deleteBook);
// router.get("/test/:id",testing)//url me jo number pass kiya hai vo id parameter ke ander gya hai jo bookcontroller ke ander pass hua hai.
 router.get("/test/:action",testing)//jab koi aur value bhi get krna hoga to pahle waale ko comment krna hoga kyuki params one time keval ek value get krta hai.
router.get("/test",testing);//url ke me sabse pahle ? fir without spacing key:value aur agr ek data paas krna hai to &key:value space nahi dena hai 
export default router;

