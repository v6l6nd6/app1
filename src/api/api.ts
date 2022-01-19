


import axios from "axios";



export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: { "API-KEY": "7486980c-7264-4f8c-ac20-0925c8ef6b52" }
})

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    captchaIsReq = 10
}

export type TypeResponse<OBJ={},RC=ResultCodeEnum>={
    resultCode: RC ,
messages: Array<string>,
data: OBJ
}




// axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })
// .then(response => {
 
//   if(response.data.resultCode===0){
//     this.props.setUserData(response.data.data.email,response.data.data.login,response.data.data.id)
//   }
// })