import { InferActionsTypes } from "./redux-store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

type messagesArrayType = {
    id:number,
    mes:string
}

type dialogsArrayType = {
    id:number,
    name:string
}

let initialState = {
    messages: [
        { id: 1, mes: 'Hi' },
        { id: 2, mes: 'How is your id' },
        { id: 3, mes: 'Whats app?' },
        { id: 4, mes: 'Whtfck???' },
        { id: 5, mes: 'Olala' }
    ]as Array<messagesArrayType>,
    dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Petya' },
        { id: 3, name: 'Sasha' },
        { id: 4, name: 'Petya' },
        { id: 5, name: 'Valera' }
    ]as Array<dialogsArrayType>,
    newMessageBody: ''
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

export const dialogsReducer = (state = initialState, action:ActionsType):InitialStateType => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            let stateCopy = { ...state, newMessageBody: action.body };
            return stateCopy;
        }
        case SEND_MESSAGE: {
            let body = state.newMessageBody;
            let stateCopy = { ...state,newMessageBody:'', messages: [...state.messages,{ id: 6, mes: action.mes }] };
            return stateCopy;
        }
        default:
            return state
    }
}

export const actions = {
      sendMessageCreator : (mes:string) => {
        return { type: SEND_MESSAGE,mes } as const
    },
      updateNewMessageBodyCreator : (body:string) => {
        return { type: UPDATE_NEW_MESSAGE_BODY, body: body } as const
}
}

