import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
    name: {type: String,required: true,trim: true},

    email: {type: String,required: true, trim: true,lowercase: true},

    phone: {type: String,required: true,trim: true},

    salary: {type: String,required: true},

    designation: {type: String,required: true},

    status: {type: Boolean,default: true},
    
    created_date: { type: String },
    updated_date: { type: String }
});
const Manager = mongoose.model("Manager", managerSchema);
export default Manager;