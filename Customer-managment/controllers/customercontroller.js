import customer from "../models/customermodel.js"

export const addcustomer =async(req, res)=>{
    try{
      const result =  await customer.create(req.body)
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

export const  getcustomer = async(req , res)=>{
   try{
    const result =  await customer.find();
    res.json({
        status:true,
        message:"customer fetching succesfully !! ",
        data : result
    })
   }
   catch(err){
    res.json({
        status:false,
        message:"customer fetching failed !!",
        err:err.message
    })
   }
}

export const updateCustomer = async (req, res)=>{
   try{
   const result =  await customer.findByIdAndUpdate(req.body.id,req.body);
    res.json({
        status:true,
        message:"customer updation succesfully !!",
        data:result
    })
   }
   catch(err){
        res.json({
            status:false,
            message:"customer updation failed !! ",
            err: err.message
        })
   }
}

export const deleteCustomer = async(req , res)=>{
    try{
    const result = await customer.findByIdAndDelete(req.query.id);
        res.json({
            status:true ,
            message:"customer deleted succefully !! ",
            data:result
        })
    }
    catch(err){
        res.json({
            status:true,
            message:"customer deleted failed !! ",
            err:err.message 
        })
    }

}