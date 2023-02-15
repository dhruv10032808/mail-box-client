import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mailReducer from './mail-slice';
import showReducer from './show-slice';

const store=configureStore({
    reducer:{auth:authSlice.reducer,show:showReducer,mail:mailReducer}
})
export default store;