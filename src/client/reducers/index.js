const initialState = {
    chatsList: [
        { title: 'chat1', id: 1 }
    ],
    currentChat: {
        title: 'chat1',
        messages: [
            { id: 1, text: 'some' },
            { id: 2, text: 'some1' }
        ]
    }
};

const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case 'CHATS_LIST_LOADED':
            return {
                ...state,
                chatsList: action.payload
            };

        case 'CURRENT_CHAT_LOADED':
            return {
                ...state,
                currentChat: action.payload
            }

        default:
            return state
    }
};

export default reducer