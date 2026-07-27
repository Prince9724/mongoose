import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
    {
        title:{type:String,requare:true},
        auther:{type:String,requare:true},
        price:{type:Number,requare:true},
        description:{type:String},
        image:{type:String,requare:true},
        cartogary:{type:String},
        publishYear:{type:Number}
    },
    {
        timestamps:true,
    }
)
export default mongoose.model("book",bookSchema);
// schema export ho gya yha se hi crud hoga 