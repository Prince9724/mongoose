
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {type: String,required: true,trim: true,},

    email: {type: String,required: true,unique: true,lowercase: true,trim: true,},

    password: {type: String,required: true,},

    status: {type: Boolean,default: true,},

    created_date: {type: String,},

    updated_date: {type: String,},
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("Admin", adminSchema);

export default User;


