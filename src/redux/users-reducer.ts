

import { userAPI } from "../api/userAPI";
import { UserType } from "../components/common/types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";


const FOLLOW = 'FOLLOW-POST';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING= 'TOGGLE_IS_FETCHING';
const IS_FOLLOWING_PROGRESS = 'IS_FOLLOWING_PROGRESS';
const FILTER_SEARCH = 'FILTER_SEARCH';

let initialState = {
    users:[]as Array<UserType>,
    pageSize:5 as number,
    totalUsersCount:100 as number,
    currentPage:1 as number,
    ifFetching:true as boolean,
    followingInProgress:[] as Array<number|null>,
    filter:{
        term:"",
        friend:""
    }
};

export type initialStateType = typeof initialState;

export type filterType = typeof initialState.filter;

export const usersReducer = (state = initialState, action:ActionsTypes):initialStateType => {

    switch (action.type) {
        case FOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                }),
            }
            return stateCopy
        }
        case UNFOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                }),
            }
            return stateCopy
        }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage:action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount:action.count}
        }
        case TOGGLE_IS_FETCHING :{
            return {...state,ifFetching:action.ifFetching}
        }
        case IS_FOLLOWING_PROGRESS: {
            return {...state,
                 followingInProgress:action.ifFetching
                ?[...state.followingInProgress,action.userId]
                :state.followingInProgress.filter(id=>id!==action.userId)
            }
        }
        case FILTER_SEARCH:{
            return {...state,filter:action.payload}
        }
        default:
            return state
    }

}



export const actions = {
    followAC :  (userId:number|null) => ({ type: FOLLOW, userId }as const),
 unfollowAC : (userId:number|null) => ({ type: UNFOLLOW, userId }as const),
 setUsersAC : (users:Array<UserType>) => ({ type: SET_USERS, users }as const),
 setCurrentPageAC : (currentPage:number) => ({ type: SET_CURRENT_PAGE, currentPage }as const),
 setTotalUsersCountAC :(totalUsersCount:number) => ({ type: SET_TOTAL_USERS_COUNT, count:totalUsersCount }as const),
 toggleIsFetchingAC : (ifFetching:boolean) => ({ type: TOGGLE_IS_FETCHING, ifFetching }as const),
 toggleFollowingProgressAC : (ifFetching:boolean,userId:number|null) => ({ type: IS_FOLLOWING_PROGRESS, ifFetching,userId }as const),
 filterSearchAC :  (term:string,friend:any) => ({ type: FILTER_SEARCH, payload:{term,friend} }as const)
}

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const getUsersThunkCreator = (currentPage:number,pageSize:number,filter:filterType):ThunkType => async (dispatch)=>{
   
    dispatch(actions.toggleIsFetchingAC(true))
    dispatch(actions.filterSearchAC(filter.term,filter.friend))
    const response = await  userAPI.getUsers(currentPage,pageSize,filter.term);
        dispatch(actions.toggleIsFetchingAC(false))
        dispatch(actions.setUsersAC(response.items))
        dispatch(actions.setTotalUsersCountAC(response.totalCount))
}

export const followThunkCreator = (userId:number|null):ThunkType =>async(dispatch)=>{
  
        dispatch(actions.toggleFollowingProgressAC(true,userId))
      let response = await  userAPI.follow(userId)
                if (response.resultCode === 0) { 
                    dispatch(actions.followAC(userId))
                }
                dispatch(actions.toggleFollowingProgressAC(false,userId))
            
 
 }

 
 export const unfollowThunkCreator = (userId:number|null):ThunkType =>async(dispatch)=>{
    
        dispatch(actions.toggleFollowingProgressAC(true,userId))
     const response = await  userAPI.unfollow(userId);
                if (response.resultCode === 0) {
                    dispatch(actions.unfollowAC(userId))
                }
                dispatch(actions.toggleFollowingProgressAC(false,userId))
           
 
 }

export default usersReducer;