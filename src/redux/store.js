
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { sidebarReducer } from "./sidebar-reducer";

export let store = {

    _state: {

        profilePage: {
            posts: [
                { id: 1, message: 'Hi , how are youuu?' },
                { id: 2, message: 'Its my first po' },
                { id: 3, message: 'Whats app?' },
                { id: 4, message: 'Whtfck???' },
                { id: 5, message: 'Ohhhyeee' }
            ],
            newPostText: 'ite-kamasutra'

        },
        dialogsPage: {
            messages: [
                { id: 1, mes: 'Hi' },
                { id: 2, mes: 'How is your id' },
                { id: 3, mes: 'Whats app?' },
                { id: 4, mes: 'Whtfck???' },
                { id: 5, mes: 'Olala' }
            ],
            dialogs: [
                { id: 1, name: 'Dimych' },
                { id: 2, name: 'Petya' },
                { id: 3, name: 'Sasha' },
                { id: 4, name: 'Petya' },
                { id: 5, name: 'Valera' }
            ],
            newMessageBody: ''
        },
        sidebar: {}

    },
    getState() {
        return this._state
    },
    rerenderEntireTree() {
        console.log('State is changed')
    },

    sybscribe(callback) {
        this.rerenderEntireTree = callback;
    },
    dispatch(action) {

        profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this.rerenderEntireTree(this._state);

    }


}


