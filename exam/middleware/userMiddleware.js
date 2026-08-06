import jwt from 'jsonwebtoken'
export const tokenMiddleware = (req , res , next)=>{
    const token = req.cookies.token;//cookies me se token ko toke me store kiya 

     
    if (!token) { //agar token nahi hai to 
         res.json({
            status: false,
            message: "user login required"
        });
    }
    try{    

        
        if (!token) {//token mising hai to 
             res.json({
                status: false,
                message: "Token missing !!"
            });
        }   
        const cookieVerify = jwt.verify(token,"!@#$%^&*()")//cookie ko verify krne ke liye 
        req.user = cookieVerify;//cookie auth me store kr rha hu 
        next();
    }
    catch(err){
        return res.json({
            status: false,
            message: "Invalid or expired token",
            err: err.message
        });
    }
}
 