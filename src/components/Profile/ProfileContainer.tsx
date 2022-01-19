import React, { useEffect } from 'react';
import Profile from './Profile';
import { actions, getUserProfile, saveProfile } from '../../redux/profile-reducer';
import { profileAPI } from '../../api/profileAPI';
import { ProfileType } from '../common/types/types';
import { AppStateType } from '../../redux/redux-store';
import { Navigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';




const ProfileContainer: React.FC<any> = () => {
    let { userId }: any = useParams();
    let dispatch = useDispatch();
    const isAuth = useSelector((store:AppStateType)=>store.authReducer.isAuth)
    const profile: any = useSelector((store: AppStateType) => store.profileReducer.profile);
    const status = useSelector((store: AppStateType) => store.profileReducer.status);
   
   
    const setStatuss = (status: string) => {
        dispatch(actions.setStatus(status))
    };
    const saveProfilee = (profile: ProfileType) => {
        dispatch(saveProfile(profile))
    };
    const getUserProfilee = (userId: number) => {
        dispatch(getUserProfile(userId))
    }
    if (!userId) {
        userId = '21176'
    }
    useEffect(() => {
       
        // if(!isAuth){return <Navigate to={"/login"}/>}
        getUserProfilee(userId)
        profileAPI.getStatus(userId).then(response => {
            setStatuss(response.data)
        })
    }, [])
    return (
        <>
        { isAuth===false && <Navigate to={"/login"}/> }
        <Profile profile={profile} status={status} saveProfile={saveProfilee} setStatus={setStatuss} isOwner={userId === '21176'} />
        </>
    )
}



export default ProfileContainer