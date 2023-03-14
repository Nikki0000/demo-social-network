import React from "react";
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { TextArea } from "../../common/FormControl/FormsControls";


const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText" component={TextArea} placeholder="Post message"
                        validate={[required, maxLength10]} onFocus="this."/>
            </div>
            <div>
                <button>AddPost</button>
            </div>
        </form>
    )
}


let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)

const MyPosts = (props) => {
    console.log("Render");

    let postsElement = props.postsData.map( posts => <Post message={posts.message} count={posts.count} />);

    let newPostElement = React.createRef();

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }


    return <div className={s.postsBlock}>
        <h3>My Posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost}/>
        <div className={s.posts}>
            {postsElement}
        </div>
    </div>
}





export default MyPosts;