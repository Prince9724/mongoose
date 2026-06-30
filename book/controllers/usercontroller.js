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

export const signIn = ()=>{

}