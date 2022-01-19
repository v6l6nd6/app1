
import { Dispatch } from 'redux';
import { chatAPI, StatusChangeType } from '../api/chatPageAPI';
import { ChatMessageType } from './../pages/Chat/ChatPage';
import { BaseThunkType, InferActionsTypes } from './redux-store';


const MESS_RECEIVED = 'MESS_RECEIVED';
const STATUS_CHANGE = 'STATUS_CHANGE'

let initialState = {
   messages:[] as ChatMessageType[],
   status: '' as StatusChangeType
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkTypes = BaseThunkType<ActionsType>

export const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
       case(MESS_RECEIVED):{
           return {
               ...state,
               messages:[...state.messages.slice(-5),...action.payload.message],
              
           }
       }
       case(STATUS_CHANGE):{
        return {
            ...state,
            status:action.payload.status
           
        }
    }
        default:
            return state
    }

}

export const actions = {

    messReceived:(message:ChatMessageType[])=>({
        type:'MESS_RECEIVED',payload:{message}
    }as const),
    statusChange:(status:StatusChangeType)=>({
        type:'STATUS_CHANGE',payload:{status}
    }as const),
}

let newMessageHandler:((messages:ChatMessageType[])=>void)|null = null;
let newStatusHandler:((status:StatusChangeType)=>void)|null = null;

const newStatusHandlerCreator =(dispatch:Dispatch)=>{
    if(newStatusHandler===null){
        newStatusHandler=(status)=>{
            dispatch(actions.statusChange(status))
        }
    }
   return newStatusHandler
}

const newMessageHandlerCreator =(dispatch:Dispatch)=>{
    if(newMessageHandler===null){
        newMessageHandler=(message)=>{
            dispatch(actions.messReceived(message))
        }
    }
   return newMessageHandler
}

export const startMessageListening = ()=>async(dispatch:Dispatch)=>{
    chatAPI.start()
    chatAPI.subscribe('message-received',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed',newStatusHandlerCreator(dispatch))
}

export const stopMessageListing = ()=>async(dispatch:Dispatch)=>{
    chatAPI.unsubscribe('message-received',newMessageHandlerCreator(dispatch))
     chatAPI.unsubscribe('status-changed',newStatusHandlerCreator(dispatch))
    chatAPI.stop();
}

export const sendMessage = (message:any)=>async(dispatch:Dispatch)=>{
    chatAPI.send(message);
}


// messReceived:(messages:ChatMessageType[])=>({
//     type:'MESS_RECEIVED',payload:{messages}
// }as const)



// let newMessageHandler:((messages:ChatMessageType[])=>void)|null  = null;

// const newMessageHandlerCreator = (dispatch:Dispatch)=>{
//     if(newMessageHandler===null){
//         newMessageHandler = (messages)=>{
//             dispatch(actions.messReceived(messages))
//         }
//     }
//     return newMessageHandler
// }

// export const startMessageListening = ():ThunkTypes =>async(dispatch:Dispatch)=>{
//     chatAPI.start()
//      chatAPI.subscribe(newMessageHandlerCreator(dispatch));
    
// }

// export const stopMessageListening = ():ThunkTypes =>async(dispatch:Dispatch)=>{
//     chatAPI.stop();
//      chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
   
// }

// export const sendMessageChatPage = (message:string)=>async(dispatch:Dispatch)=>{
//     chatAPI.send(message)
// }

// export const getUserProfile = (userId: number): ThunkTypes => async (dispatch) => {
//     let response = await profileAPI.getProfile(userId)
//     dispatch(actions.setUserProfile(response))  //response.data
// }

