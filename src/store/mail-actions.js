import { mailActions } from "./mail-slice";

export const addMail=(mail,clearInput)=>{
    const senderEmail=mail.from.replace(/[@.]/gi, '')
    const receiverEmail=mail.to.replace(/[@.]/gi, '')
    return async(dispatch)=>{
        try{
          const response=await fetch(`https://mail-box-client-b22d0-default-rtdb.firebaseio.com/${senderEmail}.json`,{
            method:'POST',
            body:JSON.stringify({...mail,read:true}),
            headers:{
                'Content-Type':'application/json'
            }
          })
          await fetch(`https://mail-box-client-b22d0-default-rtdb.firebaseio.com/${receiverEmail}.json`,
            {
              method: 'POST',
              body: JSON.stringify({...mail,read:false}),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          const data = await response.json();
    
          if (response.ok) {
            dispatch(
              mailActions.add({
                id: data.name,
                ...mail,
              })
            );
            clearInput();
          } else {
            throw data.error;
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    };

    export const replaceMail = (emailUrl,loggedUserEmail) => {
        return async (dispatch) => {
          try {
            const response = await fetch(
                `https://mail-box-client-b22d0-default-rtdb.firebaseio.com/${emailUrl}.json`
            );
            const data = await response.json();
            if (response.ok) {
              let mailData = [];
              let unreadMessageCount=0;
              for (let key in data) {
                mailData = [{ id: key, ...data[key] }, ...mailData];
                if(data[key].to === loggedUserEmail && data[key].read === false) {
                    unreadMessageCount++;
                  }
              }
              dispatch(mailActions.replace({mailData:mailData,unreadMessageCount: unreadMessageCount}));
            } else {
              throw data.error;
            }
          } catch (error) {
            console.log(error.message);
          }
        };
      };

      export const deleteMail=(mail)=>{
        const email=localStorage.getItem('email');
        const emailUrl=email.replace(/[@.]/gi, '')
        return(dispatch)=>{
        fetch(`https://mail-box-client-b22d0-default-rtdb.firebaseio.com/${emailUrl}/${mail.id}.json`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json'
          }
        }).then((res)=>{
          if(res.ok){
            dispatch(mailActions.remove(mail));
          }
        })
      }
      }
