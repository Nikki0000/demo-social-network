import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {

        profilePage: {
            
            postsData: [
                {id: 1, message: 'Hi, how are you?', count:12}, 
                {id: 2, message: 'Its my first post', count:44},
                {id: 2, message: 'Blabla', count:34}
            ],
    
            newPostText: 'it-kamasutra.com'
            
            
        },
    
        dialogsPage: {
    
            messagesData: [
                {id: 1, message: 'Hi'}, 
                {id: 2, message: 'How is your'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            
            dialogsData: [
                {id: 1, name: 'Nikita'}, 
                {id: 2, name: 'Stas'},
                {id: 3, name: 'Gena'},
                {id: 4, name: 'Turbo'},
                {id: 5, name: 'Dusha'}
            ],

            newMessageBody: ""
        },

        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}




export default store;
window.state = store;