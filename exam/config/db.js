import mongoose from 'mongoose'

const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGODBURL);
        console.log(" mongodb connected succesfully !");
    }
    catch(err){
        console.log("mongodb connection failed !! ");
    }
}
export default connectdb;