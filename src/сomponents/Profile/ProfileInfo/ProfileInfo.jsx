import React from "react";
import Preloader from "../../common/preloader/Preloader";
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/images/user.png'

const ProfileInfo = ({updateStatus, profile, status, isOwner, savePhoto}) => {

    if(!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
    <div>
        <div className={s.statusBlock}>
            <ProfileStatusWithHooks  status={status != null ? status : "User is not has status"} updateStatus={updateStatus}/>
        </div>
        <div>
            <img className={s.avaBlock} src={profile.photos.large || userPhoto}
            //'https://i.pinimg.com/originals/00/1c/a8/001ca8f343e830559c2f9835fc6bc433.jpg'
            />
            {isOwner && <label class={s.inputFile}> <input type={"file"} onChange={onMainPhotoSelected} /> <span>Выберите файл</span> </label>}
        </div>
        <div className={s.descriptionBlock}>
            {/* <img src={profile.photos.large} /> */}
            Описание: Лионель Андрес Месси — один из лучших современных футболистов, играет в составе испанской «Барселоны», капитан сборной Аргентины. Спортсмен родился 24 июня 1987 года в Росарио. За 29 лет Месси успел достичь значительных результатов в футболе, несмотря на все перенесённые трудности. 
        </div>
    </div>
    )
}

export default ProfileInfo;