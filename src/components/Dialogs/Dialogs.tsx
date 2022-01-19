import React from "react";
import s from "./Dialogs.module.scss"
import { NavLink } from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogsItem/DialogItem';
import { Field, reduxForm } from "redux-form";
import { FormForControls } from "../common/FormsControl/FormsControl";

const TextArea= FormForControls("textarea")
const messForm = (props:any)=>{
    return <form onSubmit={props.handleSubmit}>
        <Field component={TextArea} className={s.fielForm} name="messsa" placeholder="write,please"/>
        <button>Send message</button>
    </form>
}

const TextAreaReduxForm = reduxForm({form:"messageform"})(messForm)

type DialogsType = {
    dialogsReducer:any,
    sendMessage : (mes:string) => void,
    updateNewMessageBody : (body:string) => void
}

const Dialogs:React.FC<DialogsType> = ({dialogsReducer,sendMessage}) =>{
    

 let state = dialogsReducer;
let onSendMessageClick = (values:any)=>{
    // props.store.dispatch(sendMessageCreator())
    sendMessage(values.messsa)
}


let dialogsElements = state.dialogs.map((dialog:any)=> <DialogItem name={dialog.name} id={dialog.id}/>);
let newMessageBody = state.newMessageBody;

let messagesElements = state.messages.map((el:any)=><Message message={el.mes}/>)
    return (
        <>
        <div className={s.dialogs}>
            <div className={s.dialogs_items}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
              <div>{messagesElements}</div>
            </div>
        </div>
        <div>
                 <TextAreaReduxForm onSubmit={onSendMessageClick}/>
                  
              </div>
        </>
    )
}

export default Dialogs;
