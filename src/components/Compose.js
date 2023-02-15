import React from "react";
import classes from './Compose.module.css'
import { useSelector,useDispatch } from "react-redux";
import { useRef,useState } from "react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { addMail } from "../store/mail-actions";

const Compose=()=>{
const dispatch=useDispatch();
const emailInputRef=useRef('');
const titleRef=useRef('');
const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const email=useSelector((state)=>state.auth.email)
const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    // console.log(editorState.getCurrentContent().getPlainText());
  };
  const clearInputFields=()=>{
    emailInputRef.current.value='';
    titleRef.current.value='';
    setEditorState(null);
  }
const submitHandler=(event)=>{
event.preventDefault();
const mailData={to:emailInputRef.current.value,
from:email,
title:titleRef.current.value,
text:editorState.getCurrentContent().getPlainText()}
dispatch(addMail(mailData,clearInputFields));
}
   return(<>
   <form className={classes.form} onSubmit={submitHandler}>
   <div className={classes.to}>
    <label>To</label>
    <input type='email' required ref={emailInputRef}></input>
   </div>
   <div className={classes.title}>
    <label>Subject:</label>
    <input type='text' ref={titleRef}></input>
   </div>
   <div>
   <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName={'wrapper-class'}
          editorClassName={'editor-class'}
          toolbarClassName={'toolbar-class'}
        />
</div>
<button type='submit' className={classes.button}>Send</button>
</form>
   </>)
};
export default Compose;