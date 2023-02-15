import React from "react";
import classes from './MailData.module.css'

const MailData=(props)=>{
    return(<div className={classes.main}>
     <div className={classes.mailId}>{props.mailId}</div>
     <div className={classes.title}>{`Subject:${props.mail.title}`}</div>
     <div className={classes.body}>{`Body:${props.mail.text}`}</div>
    </div>)
}
export default MailData;