import mongoose from 'mongoose'

const  connectdb = async ()=>{

    try{
    await mongoose.connect("mongodb://127.0.0.1:27017/bookdatabase")
       console.log("mongoDB connected succesfully !! "); 
    }
    catch(err){
        console.log("MongoDB connection faild !! ",err);
    }
}
export default connectdb;
//data base export ho gya 