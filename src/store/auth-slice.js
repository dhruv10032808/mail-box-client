import {createSlice} from '@reduxjs/toolkit';

const initialToken=localStorage.getItem('token');
const initialEmail=localStorage.getItem('email')
const initialAuthState={token:initialToken,email:initialEmail}

const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
    login(state,action){
       state.token=action.payload.token;
       state.email=action.payload.email
    },
    logout(state){
        state.token=null;
        state.email=null;
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }
}
})
export const authActions=authSlice.actions;
export default authSlice;