import nodemailer from "nodemailer";
import dotenv  from "dotenv"

dotenv.config();
export const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.USEREMAIL,
        pass:process.env.EMAILPASS
    }
});

export const generatorOtp = ()=>{
    return Math.floor(100000 + Math.random()*900000);
}