import React from "react";
import Compose from "../components/Compose";
import Sidebar from "../components/Sidebar";
import Received from "../components/Received";
import Sent from "../components/Sent";
import Navigation from "../components/Navigation";
import { useDispatch, useSelector } from 'react-redux';
import { replaceMail,updateMail } from '../store/mail-actions';

const HomePage=()=>{
const show=useSelector((state)=>state.show)
const token=useSelector((state)=>state.auth.token);
  const isLoggedIn=!!token;
  const dispatch=useDispatch()
  const email=useSelector((state)=>state.auth.email);
  const firstTime=useSelector((state)=>state.mail.firstTime)
  const currentMailData=useSelector((state)=>state.mail.mailData)
  if(isLoggedIn && firstTime){
    const emailUrl=email.replace(/[@.]/gi, '');
      dispatch(replaceMail(emailUrl,email))
    }
    setInterval(() => {
      if (isLoggedIn) {
         const emailUrl=email.replace(/[@.]/gi, '');
        dispatch(updateMail(emailUrl, email, currentMailData));
      }
    }, 5000);
return(<>
<Navigation/>
<div>
<Sidebar/>
{show.compose && <Compose/>}
{show.received && <Received/>}
{show.sent && <Sent/>}
</div>
   </>)
};
export default HomePage;