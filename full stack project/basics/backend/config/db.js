import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/basic");
        console.log("mongodb connected successfully !! ");
    }
    catch(err){
        console.log("mongodb connection failed !! ", err)
    }
}
export default connectDB();