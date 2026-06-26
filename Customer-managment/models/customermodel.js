import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true},
        contact:{type:Number},
        age:{type:Number}
    }
    ,{
        timestamps:true,
    }
)
export default mongoose.model("customer",customerSchema);