import mongoose from "mongoose";

const authModel = new mongoose.Schema({
    title:{type:String},
    description:{type:String}

})

export default mongoose.model("auth",authModel);