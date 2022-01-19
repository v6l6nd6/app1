import React from 'react';
import n from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';




const NavBar = ()=>{
    return (
      <div className={n.nav}>
      <div className={n.item}>
        <NavLink to='/profile' className={({isActive})=>isActive?`${n.active}`:""}>Profile</NavLink>
        </div>
        <div className={n.item}>
        <NavLink to="/chat">Chat-WebSocket</NavLink>
        </div> 
        <div className={n.item}>
        <NavLink to='/users' className={({isActive})=>isActive?`${n.active}`:""}>Users</NavLink>
        </div>
        <div className={n.item}>
        <NavLink to='/dialogs' className={({isActive})=>isActive?`${n.active}`:""}>Message</NavLink>
        </div>
      <div className={n.item}>
        <NavLink to="/news">News</NavLink>
        </div>
      <div className={n.item}>
        <a href="#">Settings</a>
        </div>
       </div>
    )
}

export default NavBar