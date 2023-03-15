import { act } from "react-dom/test-utils";
import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
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


export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos: photos
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

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode  === 0){
        dispatch(savePhotoSuccess(response.data.data.photos));
    }   
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if(response.data.resultCode  === 0){
        dispatch(getUserProfile(userId));
    } else {
        let error = response.data.messages[0];
        let errorObj = {'_error': error};
        let match =  error.match(/Invalid url format \(Contacts->(.+)\)/);
        if (match) {
            let fieldName = match[1].toLowerCase()
            errorObj = { 'contacts': {}}
            errorObj.contacts[fieldName] = error
        }
        //dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        //return Promise.reject(response.data.messages[0]);
        dispatch(stopSubmit("edit-profile", errorObj))  
        throw error;
    }
}

export default profileReducer;