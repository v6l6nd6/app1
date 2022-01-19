import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { dialogsReducer } from "./dialogs-reducer";
import { sidebarReducer } from "./sidebar-reducer";
import { profileReducer } from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { chatReducer } from "./chat-reducer";


export let reducers = combineReducers({
    profileReducer,    //profileReducer  : profileReducer
    dialogsReducer,    //profileReducer  : profileReducer
    sidebarReducer,     //sidebarReducer  : sidebarReducer
    usersReducer,
    authReducer,
    form: formReducer,
    chat:chatReducer
});

type ReducesType = typeof reducers;
export type AppStateType = ReturnType<ReducesType>;

export type PropertisTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertisTypes<T>>

export type BaseThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

// export type InferActionsTypes<T extends {[key:string]: (...args:any[])=>any}> = ReturnType<PropertisTypes<T>>


export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;


