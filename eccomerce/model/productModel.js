import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String},
    price:{type:Number,required:true},
    description:{type:String},
    discount:{type:Number}
},{
    timestamps:true
});
export default productSchema;

