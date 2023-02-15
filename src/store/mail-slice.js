import { createSlice } from "@reduxjs/toolkit";

const initialMailState={mailData:[],firstTime:true}
const mailSlice=createSlice({
    name:'mail',
    initialState:initialMailState,
    reducers:{
        add(state,action){
            state.mailData=[action.payload,...state.mailData]
        },
        firstTime(state,action){
            state.firstTime=action.payload;
        },
        replace(state,action){
            state.mailData=action.payload;
            state.firstTime=false;
        },
        remove(state){}
    }
})
export const mailActions=mailSlice.actions;
export default mailSlice.reducer;