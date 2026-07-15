import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:5001/api/product";


//==================== SIGNUP ====================

export const userPost = createAsyncThunk(
  "auth/signup",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(`${URL}/signup`, user);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


//==================== SIGNIN ====================

export const userSignIn = createAsyncThunk(
  "auth/signin",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(
        `${URL}/signin`,
        user,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


const authSlice = createSlice({

  name: "auth",

  initialState: {

    loading: false,

    user: null,

    message: "",

    error: "",

  },

  reducers: {},

  extraReducers: (builder) => {

    builder

    //========== SIGNUP ==========

    .addCase(userPost.pending,(state)=>{

        state.loading=true;

    })

    .addCase(userPost.fulfilled,(state,action)=>{

        state.loading=false;

        state.user=action.payload.result;

        state.message=action.payload.message;

    })

    .addCase(userPost.rejected,(state,action)=>{

        state.loading=false;

        state.error=action.payload.message;

    })



    //========== SIGNIN ==========

    .addCase(userSignIn.pending,(state)=>{

        state.loading=true;

    })

    .addCase(userSignIn.fulfilled,(state,action)=>{

        state.loading=false;

        state.user=action.payload.user;

        state.message=action.payload.message;

    })

    .addCase(userSignIn.rejected,(state,action)=>{

        state.loading=false;

        state.error=action.payload.message;

    });

  }

});

export default authSlice.reducer;