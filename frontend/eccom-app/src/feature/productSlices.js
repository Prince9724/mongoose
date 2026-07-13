import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const  createAsyncThunk = async("fetch/product",() =>{
    const res = await axios.get("http://localhost:5001/api/product");
    return res.data
})

const ProductSlices = createSlice({
    name:"product",
    initialState:{
        products:[],
    },
    reducers:{

    },
    extraReducers:((builder)=>{
        builder.addCase
    })
})