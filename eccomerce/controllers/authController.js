import auth from "../model/authModel.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
export const signUn =async(req, res)=>{
    try{
        const {name,emai}= req.body;
        const hashed  = await   bcrypt.hash(password,12);
        
        const result = await auth.create({name,email,password:hashed});
        res.json({
            status:true,
            message:"signUp successfully !! ",
            result
        })
    }
    catch(err){
        res.status(400).json({
            status:false,
            message:"SignIn failed !!",
            err:err.message
        });
    }
}

export const signIp =async(req, res)=>{
    try{
        
    }
    catch(err){
        res.status(400).json({
            status:false,
            message:"SignUp failed !!",
            err:err.message
        });
    }
}
