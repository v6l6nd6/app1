import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { sendMessage, startMessageListening, stopMessageListing } from "../../redux/chat-reducer";
import { AppStateType, store } from "../../redux/redux-store";
import cp from "./ChatPage.module.scss";


export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string

}
export const ChatPage: React.FC<any> = () => {
    return <div>
        <Chat />
    </div>
}
const Chat: React.FC<any> = () => {

    const dispatch = useDispatch();
    const messages = useSelector((store: AppStateType) => store.chat.messages)
    const isAuth = useSelector((store:AppStateType)=>store.authReducer.isAuth)
    useEffect(() => {
        dispatch(startMessageListening());
        return () => {
            dispatch(stopMessageListing())
        }
    }, [])



    return <div  className={cp.chatPageBlock} >
        {!isAuth && <Navigate to="/login"/>}
        <div>
            {messages.map((el, index) => < Messages key={index} oneFromDates={el} />)}
        </div>
        <div><AddMessageForm /></div>

    </div>
}


const Messages: React.FC<any> = ({ oneFromDates }) => {

    const h2ref = useRef(null);

    useLayoutEffect(() => {
        //@ts-ignore
        h2ref.current?.scrollIntoView();
    }, []);

    return <div>
       
        <div>
            <Message oneFromDates={oneFromDates} /> 
        </div>
        <div>
        <h2 ref={h2ref}></h2>
        </div>
    </div>

}

const Message: React.FC<any> = React.memo(({ oneFromDates }) => {

   


    return <div>
        <img src={oneFromDates.photo} alt="" />
        <div>id - <span>{oneFromDates.userId}</span></div>
        <div>name - <span>{oneFromDates.userName}</span></div>
        <div>{oneFromDates.message}</div>
    </div>
})

const AddMessageForm: React.FC<any> = ({ messages }) => {

    const [stateMessages, setStateMessages] = useState(messages);
    const dispatch = useDispatch();
    const status = useSelector((store: AppStateType) => store.chat.status);

    const onChangee = (event: any) => {
        setStateMessages(event.currentTarget.value)
    }
    const sendMessagee = () => {
        dispatch(sendMessage(stateMessages))
        setStateMessages('')
    }
    return <div>
        <div><textarea onChange={onChangee} value={stateMessages}></textarea></div>
        <button disabled={status !== 'ready'} onClick={sendMessagee}>Send</button>
    </div>
}