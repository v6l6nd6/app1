import React from 'react';
import { actions } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';



const mapStateToProps = (state:AppStateType) => {
  return {
    posts: state.profileReducer.posts,
    newPostText: state.profileReducer.newPostText
  }
};

type mapDispatchToPropsType = {
  addPost: (messa: string) => void,
  updateNewPostText: (text: string) =>void
}
const mapDispatchToProps = (dispatch:any):mapDispatchToPropsType => {
  return {
    addPost: (messa) => { dispatch(actions.addPostActionCreator(messa)) },
    updateNewPostText: (text) => {
      let action = actions.upDateNewPostTextActionCreator(text);
      dispatch(action)
    }

  }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts) as React.ComponentType

export default MyPostsContainer