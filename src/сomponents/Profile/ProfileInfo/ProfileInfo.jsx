import React, { useState } from "react";
import Preloader from "../../common/preloader/Preloader";
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'
import ProfieleDataForm from "./ProfileDataForm";

const ProfileInfo = ({updateStatus, profile, status, isOwner, savePhoto, saveProfile}) => {


    let [editMode, setEditMode] = useState(false); 


    if(!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
        
    }

    return (
    <div>
        <div className={s.photoBlock}>
            <div className={s.testBlock}>
                <div className={s.avaBlock}>
                    <img src={profile.photos.large || userPhoto}/>
                </div>
                <div className={s.inputFile}>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                </div>
            </div>
            <div className={s.infoBlock}>

                <ProfileStatusWithHooks className={s.statusBlock} status={status != null ? status : "User is not has status"} updateStatus={updateStatus} />


                {editMode 
                    ? <ProfieleDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> 
                    : <ProfieleData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/> }
                

            </div>
        </div>
        {/* <div className={s.descriptionBlock}>
            Описание: Лионель Андрес Месси — один из лучших современных футболистов, играет в составе испанской «Барселоны», капитан сборной Аргентины. Спортсмен родился 24 июня 1987 года в Росарио. За 29 лет Месси успел достичь значительных результатов в футболе, несмотря на все перенесённые трудности. 
        </div> */}
    </div>
    )
}


const ProfieleData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div className={s.userDataBlock}>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName} 
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"} 
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription} 
            </div>
        }
        <div>
            <b>About me</b>: {profile.aboutMe} 
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitile={key} contactValue={profile.contacts[key]} />
            }) } 
        </div>
        
    </div>
    )
}




const Contact = ({contactTitile, contactValue}) => {
    return(
        <div className={s.contact}>
            <b>{contactTitile}</b>: {contactValue}
        </div>
    )
}




export default ProfileInfo;