import React from 'react';
import s from './Post.module.css';

const Posts = (props:any)=>{
    return (
      <div>
          <div className={s.item}>
            
          <img src='https://i.pinimg.com/originals/3c/4b/fd/3c4bfd9273bfc4827e76709e3db4deec.jpg'></img>
            post 2
          </div>
          <span>{props.message}</span>
        </div>
      
    )
}

export default Posts