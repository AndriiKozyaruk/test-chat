const initialState = {
    chatsList: [
    ],
    currentChat: {
        messages: []
    },
    error: null,
    loading: true
};


const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case 'CHATS_LIST_LOADED':
            return {
                ...state,
                chatsList: action.chatList
            };

        case 'CHAT_DATA_LOADED':
            return {
                ...state,
                currentChat: action.data
            }

        case 'INCOMING_NEW_MESSAGES':
            console.log(action)
            return{
                ...state,
                currentChat: {
                    ...state.currentChat,
                    messages: [
                        ...state.currentChat.messages,
                        ...action.messages
                    ]
                }
            }

        default:
            return state
    }
};

export default reducer