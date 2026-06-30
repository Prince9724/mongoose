import user from '../models/usermodel.js'

export const signUp = async(req , res)=>{
    try{
        const result = await user.create(req.body);
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
    if(!userData){
        res.json({
        status:false , 
        message:"user not found ! ",
    })
    }
   
    res.json({
        status:true , 
        message:"signIn Succesfully !!",
        userData
    })
}