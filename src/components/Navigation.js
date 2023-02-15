import React from "react";
import classes from './Navigation.module.css'
import {Link} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const Navigation=()=>{
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        dispatch(authActions.logout())
    }
    return(<div className={classes.mainNav}>
    <Link to="/home">Mail Box</Link>
    <Link to='/'><button onClick={logoutHandler}>Logout</button></Link>
    </div>)
}
export default Navigation;