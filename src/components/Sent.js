import React from "react";
import { useSelector } from "react-redux";
import MailData from "./MailData";
import classes from './Sent.module.css'

const Sent=()=>{
    const email=useSelector((state)=>state.auth.email)
    const mails=useSelector((state)=>state.mail.mailData);
    const sentMails=mails.filter((mail)=>mail.from===email)
    const mailData=sentMails.map((mail)=>{
        return <MailData key={mail.id} mail={mail} mailId={mail.to} toOrFrom='To:'/>
    })

    return(<div className={classes.main}>
        {mailData}
    </div>)
}
export default Sent;