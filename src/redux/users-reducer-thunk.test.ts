import { ResultCodeEnum } from "../api/api";
import { userAPI } from "../api/userAPI";
import { FollowPutType } from "../components/common/types/types";
import { actions, followThunkCreator, unfollowThunkCreator } from "./users-reducer";

jest.mock("../api/userAPI");
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;
const result: FollowPutType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

 

test("success follow thunk",async()=>{ 

    
    const thunk = followThunkCreator(1);
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    
      userAPIMock.follow.mockReturnValue(Promise.resolve(result))

   
   await thunk(dispatchMock,getStateMock,{})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgressAC(true,1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.followAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgressAC(false,1))
   

}) 


test("success unfollow thunk",async()=>{ 

    
    const thunk = unfollowThunkCreator(1);
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    
      userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    
   await thunk(dispatchMock,getStateMock,{})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgressAC(true,1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollowAC(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgressAC(false,1))
   

})