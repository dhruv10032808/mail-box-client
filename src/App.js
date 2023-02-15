import React from 'react';
import AuthForm from './components/AuthForm';
import {Routes,Route} from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { replaceMail } from './store/mail-actions';
function App() {
  const token=useSelector((state)=>state.auth.token);
  const isLoggedIn=!!token;
  const dispatch=useDispatch()
  const email=useSelector((state)=>state.auth.email);
  const firstTime=useSelector((state)=>state.mail.firstTime)
  if(isLoggedIn && firstTime){
    const emailUrl=email.replace(/[@.]/gi, '');
    dispatch(replaceMail(emailUrl,email))
  }
  return(<>
  <Routes>
  <Route path='/' element={<AuthForm/>} exact></Route>
  <Route path='/forgotpassword' element={<ForgotPassword/>} exact></Route>
  <Route path='/home' element={<HomePage/>} exact></Route>
  </Routes>
  </>)
}
export default App;
