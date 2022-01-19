import React from 'react';
import p from './Profile.module.scss';
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo';
// import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../common/types/types';

export type ProfilePresentType = {
    profile:ProfileType,
    status:string,
    isOwner:boolean,
    setStatus:(status: string)=>void,
    saveProfile:(profile: ProfileType)=>void
}

const Profile:React.FC<ProfilePresentType> = ({profile,status,isOwner,setStatus,saveProfile})=>{
  
    return (
      <div className={p.container}>
       <ProfileInfo profile={profile} status={status} isOwner={isOwner} setStatus={setStatus} saveProfile={saveProfile}/>
        {/* <MyPostsContainer
        /> */}
        </div>
      
    )
}

export default Profile