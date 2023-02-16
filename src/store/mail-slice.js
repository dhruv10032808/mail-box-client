import { createSlice } from "@reduxjs/toolkit";

const initialMailState={mailData:[],firstTime:true,unreadMessageCount:0}
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
            state.mailData=action.payload.mailData;
            state.firstTime=false;
            state.unreadMessageCount=action.payload.unreadMessageCount
        },
        remove(state,action){
            state.mailData=state.mailData.filter((mail)=>mail.id!==action.payload.id)
        }
    }
})
export const mailActions=mailSlice.actions;
export default mailSlice.reducer;