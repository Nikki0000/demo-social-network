import React from "react";
import { connect } from "react-redux";
import { follow, setCurrentPage, setUsers, unfollow, toggleFollowingProgress, getUsers } from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";

import { usersAPI } from "../../api/api";
import { withAuthRedirect } from "../../api/hoc/withAuthRedirect";
import { compose } from "redux";
import { getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector, getPageSizeSelector, getTotalUsersCountSelector, getUsersSelector } from "../../redux/users-selectors";





class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount} 
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
        />
        </>
    }
}


// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }


let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProgress: getFollowingInProgressSelector(state)
    }
}


/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userid) => {
            dispatch(followAC(userid));
        },
        unfollow: (userid) => {
            dispatch(unfollowAC(userid));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        }
    }
}*/





export default compose(
    withAuthRedirect,
    connect(mapStateToProps, 
        {follow, unfollow, setCurrentPage,   
            toggleFollowingProgress, getUsers})
)(UsersContainer);