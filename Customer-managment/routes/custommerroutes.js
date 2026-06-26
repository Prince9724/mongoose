import express from 'express'
import {addcustomer, deleteCustomer, getcustomer, updateCustomer}from "../controllers/customercontroller.js"
const router = express.Router();

router.post("/",addcustomer);
router.get("/",getcustomer);
router.put("/",updateCustomer);
router.delete("/",deleteCustomer);
export default router;
