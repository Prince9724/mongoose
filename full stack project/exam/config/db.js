import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully !!");
    } catch (err) {
        console.log("MongoDB connection failed !!");
        console.log(err.message);
    }
};

export default connectDB;

// http://localhost:3700/auth/admin/register

// {
//   "username": "Prince",
//   "email": "prince@gmail.com",
//   "password": "123456",
//   "confirm_password": "123456",
//   "status": true
// }