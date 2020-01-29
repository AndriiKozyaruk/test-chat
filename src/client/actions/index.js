// const chatsListLoaded = (chatsList) =>{
//    return{
//         type: 'CHATS_LIST_LOADED',
//         chatsList: chatsList
//    };
// };

// const chatDataLoaded = (data) =>{
//     return {
//         type: 'CHAT_DATA_LOADED',
//         data: data
//     };
// };

const fetchChatList = () =>{
    return {
        type: 'FETCH_CHAT_LIST'
    };
};

const fetchCreateNewChat = (chatName) =>{
    return {
        type: 'FETCH_CREATE_NEW_CHAT',
        chatName: chatName
    }
}

// const newChatCreated = (newChat) =>{
//     return {
//         type: 'NEW_CHAT_CREATED',
//         newChat: newChat
//     }
// }

const initializeSocket = (chatTitle) =>{
    return{
        type: 'INITIALIZE_CHAT_SOCKET',
        chatTitle: chatTitle
    }
}

const sendMessage = (message) =>{
    return {
        type: "SEND_MESSAGE",
        message: message
    }
}

const switchChat = (chatTitle) =>{
    return {
        type: "SWITCH_CHAT",
        chatTitle: chatTitle
    }
}


export {
    switchChat,
    fetchChatList,
    initializeSocket,
    sendMessage,
    fetchCreateNewChat
};