import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name:{type:String},
    email:{type: String, required :true},
    password:{type:String, required: true}
})

export default mongoose.model("auth",authSchema);