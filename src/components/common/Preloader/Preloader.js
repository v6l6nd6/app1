import React from 'react';
import preloader from '../../../assets/images/loader.svg';
import pr from "./Preloader.module.scss"
let Preloader = (props)=>{
    return  <img className={pr.prloader_img} src={preloader} alt="piska" />
};
export default Preloader