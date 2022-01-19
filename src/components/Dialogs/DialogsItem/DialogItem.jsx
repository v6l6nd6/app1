import React from "react";
import s from '../Dialogs.module.scss';
import { NavLink } from 'react-router-dom';

const DialogItem= (props)=>{

   

    let path = "/dialogs/" +props.id;
    return (
        <div className={s.dialog}>
        <NavLink to={path} className={s.dialogItem}>{props.name}</NavLink>
    </div>
    )
}

export default DialogItem;
