import User from "../models/authModel.js";
import bcrypt from "bcrypt";
export const signUp = async()=>{
   const {email,password}= req.body;
        const already = await User.findOne({email});
        if(already){
            return res.json({
                status:false,
                message:"email already exist !! ",
            })
        } 
    try{
        
        const {name, password, email}= req.body;
        const hash = bcrypt.hash(password,12);
        const result = await User.create({name, email, password:hash});
        res.json({
            message:"user signUp succesfully !!",
            status:true , 
            result ,
        })
    }
    catch(err){
        res.json({
            message:"user SignUp failed",
            status:false,
            err: err.message
        })
    }
}