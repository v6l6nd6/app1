





//////////////////////////////==================================///////////////////////////////////////

import { ResultCodeEnum, TypeResponse } from "../../../api/api"

export type UserPhotosType = {
    small: string | null,
    large: string | null
 }

 export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: UserPhotosType,
    followed: boolean
 }


 export type GetUsersType = {
    items: Array<UserType> ,
    totalCount: number,
  error: string | null
 }

////////////////////////=============================================/////////////////////////////////////



export type ProfileType = {
   userId: number,
lookingForAJob: boolean
lookingForAJobDescription: string
fullName:string,
contacts: ProfileContact,
aboutMe:string,
photos:{
   small:string,
   large:string
}
}

export type ProfileContact = {
   github: string,
vk: string,
facebook: string
instagram: string,
twitter: string,
website: string,
youtube: string,
mainLink: string
}

export type ProfilePutAPIType = TypeResponse<ProfileType>



////////////////////////=============================================/////////////////////////////////////


export type AuthMeGetType = {
   data:{
      id: number,
      email: string,
      login: string
   },
   resultCode:number,
   messages: Array<string>
}

export type FollowPutType = {
   resultCode:number,
    messages:Array<string>,
    data: {}
}



////////////////////////=============================================/////////////////////////////////////


export type authLoginPutType = {
   resultCode: number,
   messages: string[],
   data: {
     userId: number
   }
}

export type authLogoutDeleteType = {
   resultCode: number,
   messages: string[],
   data: {}
}

export type getCaptchaType = {
   url:string
}


////////////////////////=============================================/////////////////////////////////////