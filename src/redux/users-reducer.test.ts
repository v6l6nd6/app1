import usersReducer, { actions, initialStateType } from "./users-reducer";

let state: initialStateType;

beforeEach(()=>{
    state = {
        users: [
            {
                id: 0,
                name: "name0",
                status: "status0",
                photos: {
                    small: null,
                    large: null
                },
                followed: false
            },
            {
                id: 1,
                name: "name1",
                status: "status1",
                photos: {
                    small: null,
                    large: null
                },
                followed: false
            },
            {
                id: 2,
                name: "name2",
                status: "status2",
                photos: {
                    small: null,
                    large: null
                },
                followed: true
            },
            {
                id: 3,
                name: "name3",
                status: "status3",
                photos: {
                    small: null,
                    large: null
                },
                followed: true
            }
        ],
        pageSize: 5,
        totalUsersCount: 100,
        currentPage: 1,
        ifFetching: false,
        followingInProgress: []
    }
})

test("follow succes", () => {

    // users-reducer()
    const newState = usersReducer(state,actions.followAC(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test("unfollow succes", () => {

    // users-reducer()
    const newState = usersReducer(state,actions.unfollowAC(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})