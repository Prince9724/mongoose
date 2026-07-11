import Product from "../model/productModel.js";//import hua hai model me se hua hai 

export const getProduct = async(req,res)=>{
    try{
       const result =  await Product.find();
       res.status(200).json({
        status:true,
        message:"Product fetching succesfully !! ",
        product:result
       })
    }
    catch(err){
        res.json({
            status:false,
            message:"product fetching failed !!",
            err:err.message
        })
    }

}

export const postProduct = async(req, res)=>{
    try{
        const result = await Product.create(req.body);
    }
    catch(err){
        res.json({
            status:false,
            message:"Product added failed !! ",
            err:err.message
        })
    }
}
export const updateProduct = async(req, res)=>{
    try{
        const result = await Product.findIdByAndUpdate
    }
    catch(err){
        res.json({
            status:false,
            message:"Product updation failed !! ",
            err:err.message
        })
    }
}
export const deleteProduct = async(req, res)=>{
    try{
        const result = await Product.create("");
    }
    catch(err){
        res.json({
            status:false,
            message:"Product deleted failed !! ",
            err:err.message
        })
    }
}