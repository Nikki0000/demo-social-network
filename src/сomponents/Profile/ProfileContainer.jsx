import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import axios from "axios";
import { getUserProfile, getStatus, updateStatus, savePhoto } from "../../redux/profile-reducer";
import { Navigate, useParams } from "react-router-dom";
import { usersAPI } from "../../api/api";
import { withAuthRedirect } from "../../api/hoc/withAuthRedirect";
import { compose } from "redux";

export function withRouter(Children) {
    return (props) => {
        const router = {params: useParams()};
        return <Children {...props} router={router}/>
    }
}


class ProfileContainer extends React.PureComponent {


    refreshProfile() {
        let userId = this.props.router.params.userId;


        if(!userId) {
            userId = this.props.authorizedUserId;
            // if(!userId){
            //     this.props.history.push("/login");
            // }
        }
        this.props.getUserProfile(userId);

        this.props.getStatus(userId);
    }


    componentDidMount() {
        
        this.refreshProfile();


    }

    componentDidUpdate(prevProps) {
        if(this.props.router.params.userId != prevProps.router.params.userId) {
            this.refreshProfile();
        }
    }



    /*componentDidUpdate(prevProps) {
        let userId = this.props.router.params.userId
        if (prevProps.router.params.userId !== userId) {
          let userId = 2
          axios.get(`https://social-network.samuraijs.com/api/1.0/profile`)
            .then(response => {
              this.props.setUserProfile(response.data);
            });
        }
      }*/

    render() {
        return (
            <Profile {...this.props} 
                profile={this.props.profile} 
                status={this.props.status} 
                updateStatus={this.props.updateStatus} 
                isOwner={!this.props.router.params.userId} 
                savePhoto={this.props.savePhoto}/>
        )
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto}),
    withRouter,
)(ProfileContainer);









