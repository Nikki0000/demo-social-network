import React from "react";
import s from './Dialogs.module.css'
import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import store from "../../redux/store";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../api/hoc/withAuthRedirect";
import { compose } from "redux";



let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}



let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}



export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);