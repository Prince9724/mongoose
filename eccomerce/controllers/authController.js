import auth from "../model/authModel.js";

export const signIn =async(req, res)=>{
    try{
        const result = await auth.create();
    }
    catch(err){
        res.status(400).json({
            status:false,
            message:"SignIn failed !!",
            err:err.message
        });
    }
}

export const signUp =async(req, res)=>{
    try{
        const result = await auth.findOne();
    }
    catch(err){
        res.status(400).json({
            status:false,
            message:"SignUp failed !!",
            err:err.message
        });
    }
}
