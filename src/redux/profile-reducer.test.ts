import { actions, InitialStateType, profileReducer } from "./profile-reducer";


let state : InitialStateType;

beforeEach(()=>{
    state = {
        posts: [
            { id: 1, message: 'Hi , how are youuu?' },
            { id: 2, message: 'Its my first po' },
            { id: 3, message: 'Whats app?' },
            { id: 4, message: 'Whtfck???' },
            { id: 5, message: 'Ohhhyeee' },
        ],
        newPostText: 'ite-kamasutra',
        profile: null,
        status: ""
    }
})

test("profileAddMessageTest",()=>{
    

    const newStateForAddPost = profileReducer(state,actions.addPostActionCreator('hohoho'));
    const newStateForSetStatus = profileReducer(state,actions.setStatus('myNewStatus'))
    expect(newStateForAddPost.posts[5]).toStrictEqual({id: 6, message: 'hohoho'})
    expect(newStateForSetStatus.status).toBe("myNewStatus")
})

