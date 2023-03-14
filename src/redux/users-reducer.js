import { usersAPI } from "../api/api";



const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';




let initialState = {
    users: [ ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};



const usersReduser = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW: 
            return {
                ...state, 
                users: state.users.map( u =>  {
                    if (u.id === action.userid) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW: 
            return {
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userid) {
                        return {...u, followed: false}
                    }
                    return u;
                } )
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return  {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return  {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return  {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state, followingInProgress: action.isFetching 
                ? [...state.followingInProgress, action.userid] 
                : state.followingInProgress.filter(id => id != action.userid)}
        }
        default:
            return state;

    }
}


export const followSuccess = (userid) => (
    {type: FOLLOW, userid}
)

export const unfollowSuccess = (userid) => (
    {type: UNFOLLOW, userid}
)

export const setUsers = (users) => (
    {type: SET_USERS, users}
)

export const setCurrentPage = (currentPage) => (
    {type: SET_CURRENT_PAGE, currentPage}

)

export const setTotalUsersCount = (totalUsersCount) => (
    {type: SET_TOTAL_USERS_COUNT, count: totalUsersCount}
)

export const toggleIsFetching = (isFetching) => (
    {type: TOGGLE_IS_FETCHING, isFetching}
)

export const toggleFollowingProgress = (isFetching, userid) => (
    {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userid}
)

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
    
        dispatch(toggleIsFetching(true));

        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(currentPage));
    }
}


const followUnfollowFlow = async (dispatch, userid, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userid));
        let response = await apiMethod(userid);
        if(response.data.resultCode === 0){
            dispatch(actionCreator(userid));
        }
        dispatch(toggleFollowingProgress(false, userid));
}




export const follow = (userid) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userid, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}

export const unfollow = (userid) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userid, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}


export default usersReduser;