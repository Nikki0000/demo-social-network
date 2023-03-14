import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../api/api";
import userPhoto from '../../assets/images/user.png'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import styles from './users.module.css';

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {


    return <div>
    <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize}/>
    <div>
    {
        users.map( u => <User user={u} key={u.id} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow}/>
        )}
    </div>
    </div>
}

export default Users;