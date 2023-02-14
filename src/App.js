import React from 'react';
import AuthForm from './components/AuthForm';
import {Routes,Route} from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import HomePage from './pages/HomePage';
function App() {
  return(<>
  <Routes>
  <Route path='/' element={<AuthForm/>} exact></Route>
  <Route path='/forgotpassword' element={<ForgotPassword/>} exact></Route>
  <Route path='/home' element={<HomePage/>} exact></Route>
  </Routes>
  </>)
}
export default App;
