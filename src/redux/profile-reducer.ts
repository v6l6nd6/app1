import { BaseThunkType, InferActionsTypes } from './redux-store';
import { profileAPI } from "../api/profileAPI";
import { ProfileType } from "../components/common/types/types";


const ADD_POST = 'ADD-POST';
const UPADTE_NEW_POST_TEXT = 'UPADTE-NEW-POST-TEXT';
const SET_USER_PROFIEL = 'SET_USER_PROFIEL';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

type ArrayPostsType = {
    id: number,
    message: string
}

let initialState = {
    posts: [
        { id: 1, message: 'Hi , how are youuu?' },
        { id: 2, message: 'Its my first po' },
        { id: 3, message: 'Whats app?' },
        { id: 4, message: 'Whtfck???' },
        { id: 5, message: 'Ohhhyeee' },
    ] as Array<ArrayPostsType>,
    newPostText: 'ite-kamasutra' as string,
    profile: null as ProfileType | null,
    status: ""
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkTypes = BaseThunkType<ActionsType>

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = { id: 6, message: action.messa };
            let stateCopy = { ...state }
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            return stateCopy;
        }
        case UPADTE_NEW_POST_TEXT: {
            let stateCopy = { ...state }
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        case SET_USER_PROFIEL: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state, posts: state.posts.filter(p => p.id != action.postId)
            }
        }
        default:
            return state
    }

}

export const actions = {
    addPostActionCreator: (messa: string) => ({ type: ADD_POST, messa } as const),
    upDateNewPostTextActionCreator: (text: string) => {
        return { type: UPADTE_NEW_POST_TEXT, newText: text } as const
    },
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFIEL, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const)
}

export const getUserProfile = (userId: number): ThunkTypes => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response))  //response.data
}

export const saveProfile = (profile: ProfileType): ThunkTypes => async (dispatch,getState) => {
    const userId = getState().authReducer.userId;
    const response = await profileAPI.saveProfilee(profile);
    if (response.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        }

        // } else {
        //     dispatch(stopSubmit("formddd", { _error: response.data.messages[0] }))
        // }
    }
}