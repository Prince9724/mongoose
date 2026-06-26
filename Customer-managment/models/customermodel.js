import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        name:{type:String,requare:true},
        email:{type:String,requare:true},
        contact:{type:Number},
        age:{type:Number}
    }
    ,{
        timestamps:true,
    }
)
export default mongoose.model("customer",customerSchema);