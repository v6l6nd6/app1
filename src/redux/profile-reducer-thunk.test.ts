import { ProfilePutAPIType, ProfileType } from './../components/common/types/types';
import { profileAPI } from './../api/profileAPI';
import { getUserProfile, saveProfile } from './profile-reducer';
import { ResultCodeEnum } from '../api/api';


jest.mock("./../api/profileAPI");


const profileAPIMock = profileAPI;

const result:ProfileType = {
    userId: 21176,
lookingForAJob: false,
lookingForAJobDescription: "",
fullName:"piskaa",
contacts: { github: "",
    vk: "",
    facebook: "",
    instagram: "",
    twitter: "",
    website: "",
    youtube: "",
    mainLink: ""},
aboutMe:"",
photos:{
   small:"",
   large:""
}
}

const resFinish:ProfilePutAPIType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: result
}


test("getUserProfile",async()=>{


    const thunk = getUserProfile(21176);
    const dispatchMock = jest.fn();


    //@ts-ignore
    profileAPIMock.getProfile.mockReturnValue(Promise.resolve(result))

     //@ts-ignore
   await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(1)
})

// test("saveProfileUnitTest",async()=>{


//     const thunk = saveProfile(result);
//     const dispatchMockl = jest.fn();


//     //@ts-ignore
//     profileAPIMock.saveProfilee.mockReturnValue(resFinish)

//      //@ts-ignore
//    await thunk(dispatchMockl)

//     expect(dispatchMockl).toBeCalledTimes(1)
// })
