import express from 'express'

// const app =  express();

export const printlog = (req , res, next)=>{
    console.log("request valideted...");
    // res.json({message:"Request comes.."})
    next();
}
// export const printlog = (req, res, next) => {
//     console.log(`[${new Date().toISOString()}] Request Validated for: ${req.method} ${req.url}`);
//     next();  
// };

export const checkTime =(req,res,check)=>{
    const date = new Date();
    if(date.getHours>=15){
        next();
    }
    else{
        res.json({
            message:"website will live after 3pm.. "
        })
    }
}