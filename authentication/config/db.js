import mongoose from 'mongoose';
const url = "mongodb://127.0.0.1:27017/authentication";
 const connectdb = async ()=>{
    try{
    await mongoose.connect(url);
        console.log("mongodb connected succesfully !!");
    }
    catch(err){
        console.log("mongodb connection failed !!",err);
    }
}
export default connectdb;   