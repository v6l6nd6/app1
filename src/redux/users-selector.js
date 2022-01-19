import { createSelector } from "reselect";

export const getUsersSelector = (state)=>{
    return state.usersReducer.users;
};

// export const getUsersSelector = (state)=>{
//     return getUsers(state).filter(u=>true);
// }

export const getUsers = createSelector(getUsersSelector,(users)=>{
  return  users.filter(u=>true)
})

export const getPageSize = (state)=>{
    return state.usersReducer.pageSize;
}

export const getTotalUsersCount = (state)=>{
    return state.usersReducer.totalUsersCount;
}

export const getCurrentPage = (state)=>{
    return state.usersReducer.currentPage;
}

export const getIsFetching = (state)=>{
    return state.usersReducer.ifFetchin;
}
export const getFollowingInProgress = (state)=>{
    return state.usersReducer.followingInProgress;
}
export const getFilterInUserReducer = (state)=>{
    return state.usersReducer.filter;
}