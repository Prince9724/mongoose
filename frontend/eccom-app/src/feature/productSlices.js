import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { productApi } from "../api/api";

const postProduct = createAsyncThunk("post/product",async()=>{
    const res = await axios.post(productApi);
    return res.data;
});

const getProduct = createAsyncThunk("get/product",async()=>{
    const res= axios.get(productApi);
    return res.data;
});

const updateProduct = createAsyncThunk("put/product",async(product)=>{
    const res= axios.put(productApi,product._id,product);
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