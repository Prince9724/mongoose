import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:Number},
    expiry:{type:Date}
})

export default mongoose.model("Otp",otpSchema);