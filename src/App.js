import React from 'react';
import AuthForm from './components/AuthForm';
import {Routes,Route} from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
import { useSelector } from 'react-redux';

function App() {
  const token=useSelector((state)=>state.auth.token);
  const isLoggedIn=!!token;
  return(<>
  <Routes>
  <Route path='/' element={<AuthForm/>} exact></Route>
  <Route path='/forgotpassword' element={<ForgotPassword/>} exact></Route>
  {isLoggedIn && <Route path='/home' element={<HomePage/>} exact></Route>}
  </Routes>
  </>)
}
export default App;
