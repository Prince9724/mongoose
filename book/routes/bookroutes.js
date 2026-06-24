import express from "express";
import { addBook, getBook } from "../controllers/bookcontroller.js";

const router = express.Router();

router.post("/",addBook);
router.get("/",getBook);
export default router;

