import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
            
    postsData: [
        {id: 1, message: 'Winner 7 ballon d`or', count:12}, 
        {id: 2, message: 'Winner 5 golgen foot', count:44},
        {id: 2, message: 'World championship winner', count:34}
    ],
    
    profile: null,

    status: ""
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                count: 12
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default: 
            return state;
            
            
    }

}


export const addPostActionCreator = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
}



export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE, 
        profile
    }
}

export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status: status
    }
}


export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}


export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if(response.data.resultCode  === 0){
        dispatch(setStatus(status));
    }   
}

export default profileReducer;