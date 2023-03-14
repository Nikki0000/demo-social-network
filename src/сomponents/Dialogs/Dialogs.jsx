import React from "react";
import s from './Dialogs.module.css'
import { Navigate, NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { TextArea } from "../common/FormControl/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators";



const Dialogs = (props) => {

    let state = props.dialogsPage;


    let dialogsElement = state.dialogsData
        .map( dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/> ); 
        

    let messageElement = state.
    messagesData
        .map( message => <Message message={message.message} key={message.id} />)

    
    let newMessageBody = state.newMessageBody;


    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    if(props.isAuth === false) {
        return <Navigate to={'/login'} />
    }

        
    return (
        <div className={s.dialogs}>
           <div className={s.dialogsItems}>
                {dialogsElement}
           </div>
           <div className={s.messages}>
                <div>{messageElement}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
           </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div>
                <Field component={TextArea} validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message"/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;