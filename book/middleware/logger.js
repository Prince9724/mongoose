import jwt from "jsonwebtoken";
export const checkAuthentication = (req,res,next)=>{
    try{
        // const token = req.headers.authorization.slipt(" ")[1];
        const token = req.cookies.token;//jab bhi token ko import krna ho vha pr cookies ka use krenge 
        if(!token){
           return res.json({
                status:false,
                message:"token missing"
            });
        }
        const data = jwt.verify(token ,"!@#$%^&*()");
        req.user = data;
        next();
    }
    catch(err){
       return res.json({status:false,message: "Invalid Reqest !!"})
    }
}