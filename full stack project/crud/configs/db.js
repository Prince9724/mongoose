import mongoose from "mongoose";

const connectDB = async() => {
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/crud");
        console.log("database connected succesfully !! ");

    }
    catch(err){
        console.log("database conection failled !! ", err);
    }
}

export default connectDB ;
