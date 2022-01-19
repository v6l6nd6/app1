import React from 'react';
import h from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import headerLogo from "./headerlogo.png";
type HeaderType = {
  login: string | null,
  isAuth: boolean,
  logOutThunkCreator:()=>void
}

const Header:React.FC<HeaderType> = ({logOutThunkCreator,isAuth,login})=>{
const logOut=logOutThunkCreator

    return (
        <header className={h.header}>
      <img className={h.imgheader} src={headerLogo}></img>
      <div className={h.linkLogin}>
        {isAuth 
        ?  login && <button className={h.loginBtn} onClick={logOut}>Logout</button> 
        : <NavLink className={h.LoginLabel} to='/login/'>Login</NavLink>
        }
     
      </div>
      </header>
    )
}

export default Header