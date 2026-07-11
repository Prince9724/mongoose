import mongoose from "mongoose";
const connectdb = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/eccomerce")//mongo db database url 
        console.log("mongodb connected succefully !! ");
    }
    catch(err){
        console.log("mongodb connected failed !!");
    }
}

export default connectdb;

