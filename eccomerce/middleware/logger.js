import auth from "../model/authModel.js";
import bcrypt from 'bcrypt';

export const singinValidation = async(req, res, next) => {
    try {
        const {name,email,password}= req.body
        const user = await auth.findOne({email});// yha sirf email ko find krega
       
        if (!user) {
            res.status(404).json({
                status: false, message: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400)
                .json({
                    status: false,
                    message: "password wrong !!"
                })
        }
        next();
    }
    catch (err) {
        res.status(400).json({
            status: false,
            message: "SignUp failed !!",
            err: err.message
        });
    }
}