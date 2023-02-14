import React, { useState, useRef } from "react";
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import classes from './AuthForm.module.css'
import { authActions } from "../store/auth-slice";
const AuthForm = () => {
    const dispatch=useDispatch();
  const navigate=useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      const enteredConfirmPassword = confirmPasswordInputRef.current.value;
      if (enteredPassword !== enteredConfirmPassword) {
        alert("Password did not match");
        passwordInputRef.current.value = "";
        confirmPasswordInputRef.current.value = "";
        return;
      }
    }

    let url;
    if (!isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzxnwu0kjnD3LUsClTC1AhEqC-JP6vchg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzxnwu0kjnD3LUsClTC1AhEqC-JP6vchg";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      if (isLogin) {
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", enteredEmail);
        dispatch(authActions.login({token:data.idToken,email:enteredEmail}))
        navigate('/home')
        return;
      }
      setIsLogin(true);
      passwordInputRef.current.value = "";
      emailInputRef.current.value = "";
      console.log('User has successfully signed up')
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section>
      <form onSubmit={submitHandler} className={classes.auth}>
      <h1 style={{textAlign:'center',color:'white'}}>{isLogin ? "Login" : "Sign Up"}</h1>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
          className="form-control"
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input
            className="form-control"
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordInputRef}
            />
          </div>
        )}
        <br></br>
        <div className="form-group">
          <button type="submit" style={{marginBottom:10}}>{isLogin ? "Login" : "Sign up"}</button>
          <br></br><button
            type="button"
            className='bg-danger'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "New user? Sign Up" : "Login with existing account"}
          </button>
          {isLogin && <Link to='/forgotpassword'><button style={{coloe:'white',marginLeft:3}}>Forgot Password?</button></Link>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;