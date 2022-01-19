
import { loginAPI } from "../api/loginAPI";
import { userAPI } from "../api/userAPI";
import { BaseThunkType, InferActionsTypes } from "./redux-store";


const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCES = 'GET_CAPTCHA_URL_SUCCES'

let initialState = {
    email: null as string | null,
    login: null as string | null,
    userId: null as number | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
};

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;


const authReducer = (state = initialState, action:ActionsType):InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            return { ...state, ...action.data }
        }
        case GET_CAPTCHA_URL_SUCCES:{
            return {...state,...action.data}
        }
        default:
            return state
    }

}

export const actions = {
    setUserData : (email:string | null, login:string | null, userId:number | null, isAuth:boolean) => ({ type: SET_USER_DATA, data: { email, login, userId, isAuth } }as const),
    getCaptchaUrlSucces :  (captchaUrl:string | null) => ({ type: GET_CAPTCHA_URL_SUCCES, data: { captchaUrl } }as const),
}


export const setUserDataThunkCreate = ():ThunkType =>async(dispatch)=> {
   
        userAPI.dateOfMyLogin().then(data => {
            if (data.resultCode === 0) {
                dispatch(actions.setUserData(data.data.email, data.data.login, data.data.id, true))
            }
        })
}

export const loginThunkCreator = (email:string, password:string, rememberMe:boolean):ThunkType => async (dispatch) => {
   let response = await loginAPI.logIn(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            
            dispatch(setUserDataThunkCreate())
        }
        // }else if(response.data.resultCode === 10){
        //        dispatch(captchaThunkCreator()) 
        //     }
        
            // let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            
            // dispatch(stopSubmit("login", { _error: message }))
        // }
    
}

export const logOutThunkCreator = ():ThunkType => async (dispatch) => {
  const response = await loginAPI.logOut();
        if (response.data.resultCode === 0) {
            dispatch(actions.setUserData(null, null, null, false))
        }

}

export const captchaThunkCreator = ():ThunkType => async (dispatch) => {
    const response = await loginAPI.captcha();
    const captchaUrl = response.data.url;
    dispatch(actions.getCaptchaUrlSucces(captchaUrl))
}

export default authReducer

