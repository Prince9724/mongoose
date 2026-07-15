import { configureStore } from "@reduxjs/toolkit";
import authSlices from "../featuresSlicecs/authSlices"

const store = configureStore({
    reducer: {
        users: authSlices,
    }
})
export default store