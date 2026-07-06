import user from '../models/usermodel.js'
import bcrypt from "bcrypt";//bcrypt ko bcrypt se import krna hai 
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
    try {
        const password = req.body.password;
        const hashed = await bcrypt.hash(password, 12);//password ko hashing krne ke liye .hash ka use kiya 
        //keval bcrypt.hash ka use krke aur 12 ka use krke input se database me password strong bn gya 
        const result = await user.create({ ...req.body, password: hashed });//ab data base me req.body ke sath sath password hash ko bhi bhejna hai
        res.json({
            status: true,
            message: "user signup successfully !! ",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user signUp failed !!",
            err: err.message
        })
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body //puri body dono variable ke ander store kr diya hai 
    const userData = await user.findOne({ email });
    if (!userData) {
       return res.json({ status: false, message: "user not found ! ", })
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (isMatch) {
        const token = jwt.sign(//ye function token gerate krne ke liye hota hai token generator machine.
            { userId: userData.id, email: userData.email },//token ke ander koun si information chhupaani hai. 
            "!@#$%^&*()",//ye token ka secrate key hai 
            { expiresIn: "1h" }//kitne ime tak login rkhna hai ye token 1 hour baad expire ho jayega jitna rkhna ho rkh skte hai.
            //agr token expire hua to vaps se login krna pdega user ko 
            // ye token se ye hoga ki kitne time tak user ka account login rhega agr user 1 hour ke baad profile kholega to usko vaaps se login krna padega.

        )
        res.cookie("token",token,{//kya ye vahi token hai jo varible bnaaya hai hmne. 
            httpOnly:true,
            maxAge:1000*60*60*1,
            sameSite:"strict"
        });
      return  res.json({
            status: true,
            message: "signIn Succesfully !!",
            userData,
            token// idher se token ko return kr diya hai.  
        })
    }
   return res.json({
        status: false,
        message: "pasword wrong!!",

    })
}
//