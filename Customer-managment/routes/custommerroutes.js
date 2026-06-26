import express from 'express'
import {addcustomer}from "../controllers/customercontroller.js"
const router = express.Router();

router.post("/",addcustomer);

export default router;
