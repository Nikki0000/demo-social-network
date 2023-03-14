import React from "react";
import s from './Post.module.css'

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnniNYtN6hPqqz1EQVxhP5mJBYNPeI4M6TAw&usqp=CAU' />
            {props.message}
            <div>
                <span>like</span> {props.count}
            </div>

        </div>
    )
}



export default Post;