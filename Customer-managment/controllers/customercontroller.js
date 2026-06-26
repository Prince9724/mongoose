import customer from "../models/customermodel.js"

export const addcustomer =async(req, res)=>{
    try{
      const result =  await customer.create({
            name:"prince",
            email:"princ@gmail.com",
            contact:1234567890,
            age:19
        })
        res.json({
            status:true,
            message:"customer added succesful;ly !! ",
            data:result
        })
    }
    catch(err){
        res.status(400).json(
            {
            status:false,
            message:"customer added failed !! ",
            err:err.message
            }
        )    
    }
}