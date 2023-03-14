import React from "react";
import { NavLink, Route } from "react-router-dom";
import s from './Header.module.css';

const Header = (props) => {
    return <header className={s.header}>
      <img className={s.img1} src="https://img.freepik.com/premium-vector/logo-letter-sn_638109-16.jpg"/>
      <span className={s.h1}>Sociallll network</span>
      

    <div className={s.loginBlock}>
      {props.isAuth 
      ? <div>
          <div>{props.login}</div> 
          <button onClick={props.logout}>Log out</button>
        </div>
      :<NavLink to={'/login'}>Login</NavLink> }
    </div>
  </header>
}

export default Header;