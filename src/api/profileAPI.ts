import { ProfilePutAPIType, ProfileType } from "../components/common/types/types";
import { instance, TypeResponse } from "./api";

export const profileAPI = {
    getProfile(userId:number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data)
    },
    saveProfilee(profile:ProfileType){
        return instance.put<ProfilePutAPIType>(`profile/`,profile).then(response=>response.data)
    },
    getStatus(userId:number){
        return instance.get<string>(`profile/status/${userId}`)
        
    },
    updateStatus(status:string){
        return instance.put<TypeResponse>(`profile/status/`,{status:status})
        
    } 
};