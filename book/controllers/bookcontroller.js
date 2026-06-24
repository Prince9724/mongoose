import book from '../models/bookmodel.js'


export const addBook =async(req,res)=>{
    try{
       await book.create({
        title:"power of now",
        auther: "author",
        price:300,
        description:null,
        cartogary: "self help",
        publishYear:2001
    });
    res.status(201).json({
        message:"Book added",book
    });
    }
    catch(err){
        res.status(400).json({
            status:false,
            message:"Book inserted faild !! ",
            error:err.message});
    }
}
const   getBook = async()=>{
    try{
        const result = await book.find({
            
        })
    }
    catch(err){
        res.status(404).json({
            status:false,
            message:"book fatching failed !! ",
            err:err.message
        })
        
    }
}