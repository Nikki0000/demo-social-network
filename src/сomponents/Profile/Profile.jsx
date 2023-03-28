import React from "react";
import { ParentComponent } from "./Carousel/parentCarousel";
import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Profile = (props) => {
    return (
    <div>
        <div className={s.profileInfoBlock}>
            <ProfileInfo profile={props.profile} 
                        status={props.status} 
                        updateStatus={props.updateStatus} 
                        isOwner={props.isOwner} 
                        savePhoto={props.savePhoto} 
                        saveProfile={props.saveProfile}/>
        </div>
        <div className={s.profileBlock}>
            <div className={s.myPostsBlock}>
                <MyPostsContainer />
            </div>
            {/* <div className={s.carouselBlock}>
                <h2>Photos</h2>
                <ParentComponent/>
            </div> */}
        </div>
        
    </div>
    )
}

export default Profile;