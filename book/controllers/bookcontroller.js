import book from '../models/bookmodel.js'


export const addBook =async(req,res)=>{
    try{
    const result = await book.create(req.body);
    res.status(201).json({
        message:"Book added",book,
        result,
    });
    }
    catch(err){
        res.status(400).json({
            status:false,
            message:"Book inserted faild !! ",
            error:err.message});
    }
}
 export const getBook = async(req,res)=>{
    try{
        const result = await book.find()
        res.json({
            status:true,
            message:"book fetching succesfully ! "
            ,data:result
        })
    //sabse pahle status true fir message "book fatching succesfully" uske baad result pass hua hai 
    // result me find ho rha hai data get ho rha hai find ek array method hai jo file create hua hoga usko get krega ek array ke ander 

    }
    catch(err){
        res.status(404).json({
            status:false,
            message:"book fatching failed !! ",
            err:err.message
        })
        
    }
}

export const testing =(req,res)=>{
    res.json({
        // params
         data : req.params.id,
        data : req.params.action,
        //query
        name:req.query.name,
        id:req.query.id
,
        //body
        data:req.body
    });
}

export const updateBook = async()=>{
    try{
     const result = await book.findByIdAndUpdate(req.body.id,req.body);
        res.json({
            status:true,
            message:"book updation succesfully !!",
            data:result
        })
    }
    catch(err){
        res.json({
            status:false,
            message:"book udation failed !",
            err:err.message
        })
    }
}