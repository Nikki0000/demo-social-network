import React from "react"
import { NavLink } from "react-router-dom";
import s from './Navbar.module.css'


const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <ul>
                    <li>
                        <NavLink to="/profile" className={ navData => navData.isActive ? s.active: s.item}>Profile</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <NavLink to="/dialogs" className={ navData => navData.isActive ? s.active: s.item}>Message</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <NavLink to="/news" className={ navData => navData.isActive ? s.active: s.item}>News</NavLink>
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <NavLink to="/users" className={ navData => navData.isActive ? s.active: s.item}>Users</NavLink>
                    </li>
                </ul>
            </div>
            <div className={s.item}>
                <ul>
                    <li>
                        <a>Music</a>
                    </li>
                </ul>
            </div>
            <div className={s.item}>
                <ul>
                    <li>
                        <a>Setting</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;