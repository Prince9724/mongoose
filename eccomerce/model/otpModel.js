import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{type:String,required:true},
    otp:{type:Number, required:true},
    expiry:{type:Date,required:true}
});

export default mongoose.model("Otp",otpSchema);