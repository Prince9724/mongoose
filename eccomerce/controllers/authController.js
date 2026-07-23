import auth from "../model/authModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import OTP from "../model/otpModel.js"
import { generatorOtp, transporter } from "./otpController.js";

export const signUp = async (req, res) => {
    console.log(typeof auth);
    const { email, password } = req.body
    const already = await auth.findOne({ email });

    if (already) {
        return res.json({
            status: false,
            message: "Email already exists"
        })
    }
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 12);
        console.log(auth);
        console.log(typeof auth);
        const result = await auth.create({ name, email, password: hashed });
        res.json({
            status: true,
            message: "signUp successfully !! ",
            result
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: "SignUp failed !!",
            err: err.message
        });
    }
}

export const signIn = async (req, res) => {

    try {
        const token = jwt.sign({ email: req.body.email }, "!@#$%^&*()", {//yaha pr token create ho rha hai aur kuch data chupa hai 
            expiresIn: "1h"
        })//ye hmne token ke ander chhupaya hai aur ye payload me chla jaayega 
        res.cookie("token", token, {//token cookie ka name hai cookie browse ka storage hota hai.
            //  jiski size 4-5 kb ka hota hai bahut chhoti information store krta hai aur ek time ke baad expire bhi ho jaata hai 
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 1
        })
        res.json({
            status: true,
            message: "Signin successfully !!",
            user: {
                id: userData._id,
                name: userData.name,
                email: userData.email
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: "SignIn failed !!",
            err: err.message
        });
    }
}

export const sendOtp = async (req, res) => {
    try {
        const otp = generatorOtp();
        
        const expiry = new Date(Date.now() + 1000 * 60*2)//otp send hone ke baad generate hota hai 
        await OTP.create({ email: req.body.email, otp, expiry })
        await transporter.sendMail({
            from: `"foogle" <${process.env.USEEMAIL}>`,
            to: req.body.email,
            subject: "You win 7cr",
            text: `you are win 7cr.Your OTP is ,${otp} its expire in 20 min !`
        })
        res.status(200).json({
            status: true,
            message: "OTP send Successfully !!"
        })
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: "can't send otp !!",
            err: err.message
        });
    }
}
export const otpVerify = async (req, res) => {
    try {
        const {email , otp} = req.body// otp aur wemail ko body se nikal ke store kiya hai 
        const result =  await OTP.findOne({email, otp })//jiska bhi email aur otp dono match lr rha ho vo result name ke variable ke ander store hai 
        if(!result){//database se email ya otp nhi match hota hai to ye condition chlega !! 
                 res.status(400).json({
            status: false,
            message: "Otp invalid !!",//agar otp glat hoga to data nahi milllega aur deta nhi milega mtlb otp glat hai so invalid Otp
            // err: err.message
        });
        }
        if(result.expiry> new Date(Date.now())){ //agar expiry date jab tk bda rhega current date se tab tak ye condition rhegi 
           res.status(200).json({
            status:true,
            message:"Otp verification successfully !! ",

        }) 
       

        }
        else{
             res.status(400).json({
            status: false,
            message: "Otp Expire",
          
        });   
        }
       
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: "can't verify otp !!",
            err: err.message
        });
    }
}
//gondprinceg@gmail.com