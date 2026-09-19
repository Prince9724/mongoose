import User from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const addUser = async (req, res) => {
    try {
        const {username,email,password,confirm_password,status} = req.body;
          if (!username || !email || !password || !confirm_password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }
 
        if (password !== confirm_password) {
            return res.status(400).json({
                status: false,
                message: "Password and confirm password do not match"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: false,
                message: "Please enter a valid email"
            });
        }

    
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: "Email already registered"
            });
        }
        const hashed = await bcrypt.hash(password, 10)
        const currentDate = new Date().toISOString();

        const result = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashed,
            status: status ?? true,
            created_date: currentDate,
            updated_date: currentDate
        });

        res.status(201).json({
            status: true,
            message: "Admin signup successfully !!",
            data: {
                id: result._id,
                username: result.username,
                email: result.email,
                status: result.status,
                created_date: result.created_date,
                updated_date: result.updated_date
            }
        });

    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Admin signup failed !!",
            error: err.message
        });
    }
};

export const signupUser = async (req, res) => {
    try {

        const { email, password } = req.body;
 
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }

        
        const userData = await User.findOne({
            email: email.toLowerCase()
        });

        if (!userData) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

      
        const isMatch = await bcrypt.compare(
            password,
            userData.password
        );

        if (!isMatch) {
            return res.status(401).json({
                status: false,
                message: "Password wrong!!"
            });
        }

       
        if (!userData.status) {
            return res.status(403).json({
                status: false,
                message: "Admin account is inactive"
            });
        }
 
        const token = jwt.sign(
            {
                userId: userData._id,
                email: userData.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

           res.cookie("token", token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true
        });

        return res.status(200).json({
            status: true,
            message: "Login successfully !!",
            token: token,
            data: {
                id: userData._id,
                username: userData.username,
                email: userData.email,
                status: userData.status
            }
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Login failed !!",
            error: err.message
        });
    }
};