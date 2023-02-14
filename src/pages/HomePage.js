import React from "react";
import classes from './Home.module.css'
import { useSelector } from "react-redux";
import { useRef,useState } from "react";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

const HomePage=()=>{
const emailInputRef=useRef('');
const titleRef=useRef('');
const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const email=useSelector((state)=>state.auth.email)
  const emailIdString = email.toString();
  const emailId=emailIdString.replace(/[@.]/gi, '')
const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    // console.log(editorState.getCurrentContent().getPlainText());
  };
const submitHandler=(event)=>{
event.preventDefault();

fetch(`https://mail-box-client-b22d0-default-rtdb.firebaseio.com/${emailId}.json`,{
    method:'POST',
    body:JSON.stringify({
        to:emailInputRef.current.value,
        from:email,
        title:titleRef.current.value,
        text:editorState.getCurrentContent().getPlainText()
    }),
    headers: {
        'Content-Type': 'application/json'
      }
}).then((res)=>{
    if(res.ok){
        return res.json().then((data)=>{
            console.log(data)
        })
    }else{
        return res.json().then((data)=>{
            alert(data.error.message);
        })
    }
})
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
export default HomePage;