import React from "react"
import { reduxForm } from "redux-form";
import { createField, Input, TextArea } from "../../common/FormControl/FormsControls";
import s from './ProfileInfo.module.css'
import style from "../../common/FormControl/FormsControls.module.css"

const ProfieleDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            { error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
                }
        <div>
            <b>Full name</b>: {createField("Full name", "fullName", Input, [])} 
        </div>
        <div>
            <b>Looking for a job</b>: {createField("", "lookingForAJob", Input, [], {type: "checkbox"})} 
        </div>
        <div>
            <b>My professional skills</b>: {createField("My professional skills", "lookingForAJobDescription", TextArea, [])} 
        </div>
        <div>
            <b>About me</b>:  {createField("About me", "aboutMe", TextArea, [])}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, "contacts." + key, Input, [])} </b> 
                </div>
            }) } 
        </div>
        
        
        </form>
    )
}

//const ProfieleDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfieleDataForm)

const ProfieleDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfieleDataForm)

export default ProfieleDataFormReduxForm;