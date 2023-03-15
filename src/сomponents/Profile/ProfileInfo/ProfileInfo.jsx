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
        <div className={s.photoBlock}>
            <div className={s.testBlock}>
                <div className={s.avaBlock}>
                    <img src={profile.photos.large || userPhoto}/>
                </div>
                <div className={s.inputFile}>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                </div>
            </div>
            <div className={s.statusBlock}>
                <ProfileStatusWithHooks  status={status != null ? status : "User is not has status"} updateStatus={updateStatus}/>
            </div>
        </div>
        {/* <div className={s.descriptionBlock}>
            Описание: Лионель Андрес Месси — один из лучших современных футболистов, играет в составе испанской «Барселоны», капитан сборной Аргентины. Спортсмен родился 24 июня 1987 года в Росарио. За 29 лет Месси успел достичь значительных результатов в футболе, несмотря на все перенесённые трудности. 
        </div> */}
    </div>
    )
}

export default ProfileInfo;