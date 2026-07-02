import user from '../models/usermodel.js'
import bcrypt from "bcrypt";//bcrypt ko bcrypt se import krna hai 
export const signUp = async(req , res)=>{
    try{
        const password = req.body.password;
        const hashed = await bcrypt.hash(password,12);//password ko hashing krne ke liye .hash ka use kiya 
        //keval bcrypt.hash ka use krke aur 12 ka use krke input se database me password strong bn gya 
        const result = await user.create({...req.body,password: hashed });//ab data base me req.body ke sath sath password hash ko bhi bhejna hai
        res.json({
            status:true,
            message:"user signup successfully !! ",
            data:result
        })
    }
    catch(err){
        res.json({
            status:false,
            message:"user signUp failed !!",
            err: err.message
        })
    }
}

export const signIn = async(req, res)=>{
    const {email, password} = req.body //puri body dono variable ke ander store kr diya hai 
    const userData =  await user.findOne({email});
    if(!userData){res.json({status:false ,  message:"user not found ! ",})
}

const isMatch= await bcrypt.compare(password,userData.password);    
    if(isMatch){
         res.json({
        status:true , 
        message:"signIn Succesfully !!",
        userData
    })
    }
    res.json({
        status:false, 
        message:"pasword wrong!!",
         
    })
}