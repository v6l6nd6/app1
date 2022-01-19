import { AuthMeGetType, FollowPutType, GetUsersType } from "../components/common/types/types";
import { instance } from "./api";

export const userAPI = {
    getUsers(currentPage:number, pageSize:number,term:string='',friend:null | boolean=null) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend===null ? '' : `&friend=${friend}`))
            .then(response => response.data)

    },
    dateOfMyLogin(){
        return instance.get<AuthMeGetType>(`auth/me/`).then(response=>response.data)
    },

    follow(userId:number|null){
        return  instance.post<FollowPutType>(`follow/${userId}`).then(response=>response.data)
    },
    unfollow(userId:number|null) {
      return  instance.delete<FollowPutType>(`follow/${userId}`).then(response=>response.data)
    }   
};

