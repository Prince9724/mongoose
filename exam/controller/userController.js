import auth from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
export const signUp = async (req, res) => {
    try {
        const { email, password, name } = req.body//email password name body se get kiya hai 
        const hash = await bcrypt.hash(password, 10)//password hashing kiya hua hai 
        const result = await auth.create(//user create kr rha hu 
            {
                email,
                password: hash,
                name
            }
        );
        res.status(200).json({
            status: true,
            message: "user register successfully !!",
            data: result
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user register failled !!",
            err: err.message
        })
    }
}

export const signIn = async (req, res) => {
    try {

        const { email, password, name } = req.body//email password name body se get kiya hai 

        const result = await auth.findOne({ email })//findone reust ke ander email ko search kr ke store kiya hua hai 
        if (!result) {//agar result me 
            res.json({
                status: false,
                message: "email invalid  !!",
                err: err.message
            });
        }
        const isMatch = bcrypt.compare(password, result.password);
        if (!isMatch) {
            res.json({
                status: false,
                message: "password Worng !!"

            })
        }
        const token = jwt.sign({
            email:result.email,
            name: result.name
        }, "!@#$%^&*()", { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        })
        res.json({
            status: true,
            message: "user SignIn succesfully",
            user: {
                name: result.name,
                email: result.email,
                password: auth.password
            }
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user signIN failled !!",
            err: err.message
        })
    }
}
export const getprofile = async (req, res) => {
    try {
        const user = await auth.findOne({ email: req.user.email })
        res.json({
            status: true,
            message: "user profile fetched succesfully !!",
            profile: user
        })
    }
    catch (err) {
        res.json({
            status: false,
            message: "user profile fetching failed !!",
            err: err.message
        })
    }
}