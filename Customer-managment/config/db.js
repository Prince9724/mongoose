import mongoose from "mongoose"

const connectdb = async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017");
        console.log("mongodb connected succefully !! ")
    }
    catch(err){
        console.log("mongodb connected connected failed !! ",err);
    }
}
export default connectdb;