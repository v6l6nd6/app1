import React from "react";
import s from './Dialogs.module.scss';
import { NavLink } from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogsItem/DialogItem';
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";
import { actions } from "../../redux/dialogs-reducer";
import { AppStateType } from "../../redux/redux-store";



let mapStateToProps = (state:AppStateType) => {
    return {
        dialogsReducer: state.dialogsReducer
    }
}

type mapDispatchToPropsType = {
    sendMessage : (mes:string) => void,
    updateNewMessageBody : (body:string) => void
}

let mapDispatchToProps = (dispatch:any):mapDispatchToPropsType => {
    return {
        updateNewMessageBody: (body)=>{dispatch(actions.updateNewMessageBodyCreator(body))},
        sendMessage: (mes)=>{dispatch(actions.sendMessageCreator(mes))}

    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect 
    )
    (Dialogs) as React.ComponentType
