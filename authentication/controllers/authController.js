import user from "../model/authModle.js";
import bcrypt from "bcrypt";
export const signUp = async(req , res)=>{
    try{
        const password = req.body.password;
        const hashed = await bcrypt.hash(password,12);
        const result = await user.create(...req.body,hashed); 
    }
    catch(err){
        res.json({
            status:true,
            message:"user sihnIn failed !!",
            err:err.message
        })
    }
};
export const signIn = async(req,res)=>{
    const {email,password} = req.body
    try{
    const result = await user.findOne({email});
    }
    catch(err){
        res.json({
            status:true,
            message:"user SignIn failed !!",
            err:err.message
        })
    }
}