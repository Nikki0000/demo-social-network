const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    
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
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE: //Если тип acion = SEND_MESSAGE
            let body = action.newMessageBody; //Присваиваем значение переменной сообщения
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: body}]//Пушим в стейт новое сообщение
            };
        default: 
            return state;
    }
}


export const sendMessageCreator = (newMessageBody) => {
    return {
        type : SEND_MESSAGE,
        newMessageBody
    }
}





export default dialogsReducer;