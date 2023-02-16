import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { deleteMail, replaceMail } from "../store/mail-actions";
import classes from './MailData.module.css';

const MailData=(props)=>{
    const [showBody,setShowBody]=useState(false);
    const email=useSelector((state)=>state.auth.email);
    const emailUrl=email.replace(/[@.]/gi, '');
    const dispatch=useDispatch()
    const readMailHandler = async () => {
        setShowBody((preState) => !preState);
        if (!props.mail.read) {
          const email = props.mail.to.replace(/[@.]/gi, '');
          try {
            const response = await fetch(
              `https://mail-box-client-b22d0-default-rtdb.firebaseio.com/${email}/${props.mail.id}.json`,
              {
                method: 'PUT',
                body: JSON.stringify({ ...props.mail, read: true }),
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
    
            const data = await response.json();
    
            if (!response.ok) {
              throw data.error;
            } else {
              dispatch(replaceMail(emailUrl, email));
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      };
      const deleteHandler=(event)=>{
        event.preventDefault();
        dispatch(deleteMail(props.mail))
      }

    return(<div className={classes.complete}>
        {props.toOrFrom === 'From:' && !props.mail.read && (
          <i className='ri-checkbox-blank-circle-fill'></i>
        )}
        <div className={classes.main} >
          <div onClick={readMailHandler} className={classes['mail-header']}>
            <div className={classes.head}>
              <span>{props.toOrFrom}</span>
              <div className={classes.mailId}>
                <i className='ri-user-shared-fill'></i>
                <div>{props.mailId}</div>
              </div>
            </div>
            <div className={classes.title}>{props.mail.title}</div>
          </div>
          <div className={showBody ? classes.body : classes.notBody}>
            {props.mail.text}
          </div>
          <button className="bg-danger" onClick={deleteHandler}>Delete</button>
          </div>
          </div>)
}
export default MailData;