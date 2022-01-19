
import React from "react"


type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string

}
export type StatusChangeType = 'pedding'|'ready'|'error';

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusChangeType) => void

let ws: WebSocket | null = null;
let subscribes = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed' : [] as StatusChangedSubscriberType[]
};

type EventNamesType =  'message-received' | 'status-changed' ;
const closeHandler = () => {
    console.log("CLOSE CHANNEL")
    subscribes["status-changed"].forEach((el)=>el('pedding'));
    setTimeout(createChannel, 3000)
}

const openHandler = ()=>{
    notifySubscribersStatusHandle('ready')
}

let notifySubscribersStatusHandle = (status:StatusChangeType)=>{
    subscribes["status-changed"].forEach((el)=>el(status));
}
const cleanUpChannel=()=>{
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', eventDataWebSocket)
      ws?.removeEventListener('open', openHandler)
    //   ws?.removeEventListener('error', closeHandler)
}

function createChannel() {

    cleanUpChannel()
    ws?.close()
    ws = (new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'));
    notifySubscribersStatusHandle('pedding')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', eventDataWebSocket);
    ws.addEventListener('open',openHandler)
}

// function stopChannel() {
//     ws?.removeEventListener('close', closeHandler)
//     ws?.close()
// }

let eventDataWebSocket = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribes['message-received'].forEach((e)=>e(newMessages))
    console.log(JSON.parse(e.data))
}

export const chatAPI = {

    start(){
        createChannel()
    },
    stop(){
        subscribes['message-received']=[];
        subscribes['status-changed']=[];
        ws?.close();
        cleanUpChannel();
    
    },
    subscribe(eventName:EventNamesType,message:MessagesReceivedSubscriberType | StatusChangedSubscriberType ){
        //@ts-ignore
        subscribes[eventName].push(message);
        return()=>{
             //@ts-ignore
            subscribes[eventName].filter((s)=>s!==message)
        }
    },
    unsubscribe(eventName:EventNamesType,message:MessagesReceivedSubscriberType | StatusChangedSubscriberType ){
         //@ts-ignore
        subscribes[eventName] = subscribes[eventName].filter((s)=>s!==message)
    },
    send(message:any){
        ws?.send(message)

    }
}