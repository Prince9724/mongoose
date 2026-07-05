export const checkAuthentication = (req,res,next)=>{
    try{
        const token = req.headers.authorization.slipt(" ")[1];
    }
    catch(err){
        res.json({status:false,message: "Invalid Reqest !!"})
    }
}