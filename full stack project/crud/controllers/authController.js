import Auth from "../models/authModel.js"

export const postTodo = async(req , res) =>{
    try{
        const result = await Auth.create(req.body);
        res.json({
            status:true,
            message:"todo added succesfully !! ",
            data: result
        })
    }
    catch(err){
        res.json({
            status:false,
            message :"todo aded failed !! ",
            err:err.message
        })
    }
}
export const getTodo =async (req,res )=>{
    try{
         const result = await Auth.find();
        res.json({
            status:true,
            message:"todo fetching  succesfully !! ",
            data: result
        })
    }
    catch(err){
         res.json({
            status:false,
            message :"todo get failed !! ",
            err:err.message
        })
    }
}