import auth from "../model/authModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
export const signUp =async(req, res)=>{
    console.log(typeof auth);
    try{
        const {name,email,password}= req.body;
        const hashed  = await   bcrypt.hash(password,12);
    console.log(auth);
    console.log(typeof auth);
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
            message:"SignUp failed !!",
            err:err.message
        });
    }
}

export const signIn =async(req, res)=>{
    try{
        const token = jwt.sign({email:req.body.email},"!@#$%^&*()",{//yaha pr token create ho rha hai aur kuch data chupa hai 
            expiresIn:"1h"
        })//ye hmne token ke ander chhupaya hai aur ye payload me chla jaayega 
        res.cookie("token",token,{//token cookie ka name hai cookie browse ka storage hota hai.
            //  jiski size 4-5 kb ka hota hai bahut chhoti information store krta hai aur ek time ke baad expire bhi ho jaata hai 
            httpOnly:true,
            maxAge:1000*60*60*1
        })
        res.status(200).json({
            status:true,
            message:"Signin successfully  !!",
        });
    }
    catch(err){
        res.status(400).json({
            status:false,
            message:"SignIn failed !!",
            err:err.message
        });
    }
}
