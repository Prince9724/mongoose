import mogoose from 'mongooose';
const url = "mongodb://127.0.0.1:27017/authentcation";
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