import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { FormForControls } from '../../common/FormsControl/FormsControl';
import s from './MyPosts.module.css';
import Post from './Post/Post';

let TextArea = FormForControls("textarea")

const FormProfileMessage:React.FC<InjectedFormProps> = ({handleSubmit}) => {
  return <form onSubmit={handleSubmit}>
    <Field component={TextArea} name="messa" placeholder="write you message" />
    <button>Send message</button>
  </form>
};

type MyPostsType = {
  addPost: (messa: string) => void,
  posts:any
}

const MesReduxForm = reduxForm({form:"messageform"})(FormProfileMessage);


const MyPosts:React.FC<MyPostsType> = ({addPost,posts}) => {
 console.log("RENDER!!!")
  // let newPostElement = React.createRef();
  let adddPost = (values:any) => {
    addPost(values.messa);
  }

  // let onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   props.updateNewPostText(text);
  //   // let action = upDateNewPostTextActionCreator(text)
  //   // props.dispatch(action) 
  // }

  let postsElement = posts.map((el:any) => <Post message={el.message} />)

  return (
    <div>
      My Posts
      <div>
        New post
      </div>
      <MesReduxForm onSubmit={adddPost}/>
      <div className={s.posts}>
        {postsElement}

      </div>
    </div>

  )
}

export default MyPosts