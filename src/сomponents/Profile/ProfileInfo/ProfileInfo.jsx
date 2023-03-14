import React from "react";
import Preloader from "../../common/preloader/Preloader";
import s from './ProfileInfo.module.css'
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

    if(!props.profile) {
        return <Preloader/>
    }

    return (
    <div>
        <div className={s.statusBlock}>
            <ProfileStatusWithHooks  status={props.status != null ? props.status : "User is not has status"} updateStatus={props.updateStatus}/>
        </div>
        <div>
            <img className={s.avaBlock} src='https://i.pinimg.com/originals/00/1c/a8/001ca8f343e830559c2f9835fc6bc433.jpg'/>
        </div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large} />
            Описание: Лионель Андрес Месси — один из лучших современных футболистов, играет в составе испанской «Барселоны», капитан сборной Аргентины. Спортсмен родился 24 июня 1987 года в Росарио. За 29 лет Месси успел достичь значительных результатов в футболе, несмотря на все перенесённые трудности. 
        </div>
    </div>
    )
}

export default ProfileInfo;