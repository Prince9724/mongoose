import mongooose from "mongoose";// import mongoose from mongoose

const authentcationSchema = new mongooose.Schema({
    name:{type:String,required},
    email:{type:String,required},
    contact:{type:Number,required},
    password:{type:String,required},    
},{
    timestamps:true
})

export default mongooose.model = ("authentication",authentcationSchema);
