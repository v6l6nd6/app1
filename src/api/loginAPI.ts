import { authLoginPutType, authLogoutDeleteType, getCaptchaType } from "../components/common/types/types"
import { instance } from "./api"

export const loginAPI = {
    logIn(email:string,password:string,rememberMe=false,captcha=null){
        return instance.post<authLoginPutType>(`/auth/login/`,{email,password,rememberMe,captcha})
    },
    logOut(){
        return instance.delete<authLogoutDeleteType>(`/auth/login/`)
    },
    captcha(){
        return instance.get<getCaptchaType>(`/security/get-captcha-url/`)
    }
}

