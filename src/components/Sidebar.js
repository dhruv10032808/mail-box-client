import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Sidebar.module.css';
import { showActions } from '../store/show-slice';

const Sidebar = () => {
  const show = useSelector(state => state.show);
  const unreadMessageCount=useSelector((state)=>state.mail.unreadMessageCount)
  const dispatch = useDispatch();

  const composeHandler = () => {
    dispatch(showActions.compose());
  }

  const sentHandler = () => {
    dispatch(showActions.sent());
  }

  const receivedHandler = () => {
    dispatch(showActions.received());
  }

  return (
    <div className={classes.sidebar}>
      <button className={classes.compose} onClick={composeHandler}>Compose</button>
      <li onClick={sentHandler} className={show.sent ? classes.sent : ''}>Sent</li>
      <li onClick={receivedHandler} className={show.received ? classes.received : ''}>
        <span>Inbox</span>
        <span style={{marginLeft:10,color:'pink'}}>{unreadMessageCount>0?unreadMessageCount:''}</span>
        </li>
    </div>
  );
};

export default Sidebar;