import auth from "../model/authModel.js";
import bcrypt from 'bcrypt'
export const signUp = async(req, res)=>{
    try{
        const {email,password, name}=  req.body
        const hash = await bcrypt.hash(password,10)
      const result = await auth.create(
        {
            email,
            password:hash,
            name
        }
      );
      res.status(200).json({
        status:true,
        message:"user register successfully !!",
        data:result
      })    
    }
    catch(err){
        res.json({
            status:false,
            message:"user register failled !!",
            err:err.message
        })
    }
}

export const signIn= async(req , res)=>{
    try{
         
    const {email,password, name}=  req.body
    
      const auth = await auth.findOne({email})
        if(!auth){
           res.json({
            status:false,
            message:"email invalid  !!",
            err:err.message
        })  ;
        }
        const isMatch = bcrypt.compare(password , auth.password );
        if(!isMatch){
             res.json({
            status:false,
            message:"password Worng !!"
            
        })  
        }
        res.json({
            status:true,
            message:"user SignIn succesfully",
             
        })
    }
    catch(err){
        res.json({
            status:false,
            message:"user signIN failled !!",
            err:err.message
        })
    }
}