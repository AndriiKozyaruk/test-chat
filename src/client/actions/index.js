const chatsListLoaded = (chatList) =>{
   return{
        type: 'CHATS_LIST_LOADED',
        chatList: chatList
   };
};

const chatDataLoaded = (data) =>{
    return {
        type: 'CHAT_DATA_LOADED',
        data: data
    };
};

const fetchChatList = () =>{
    return {
        type: 'FETCH_CHAT_LIST'
    };
};

const initializeSocket = (chatTitle) =>{
    return{
        type: 'INITIALIZE_SOCKET',
        chatTitle: chatTitle
    }
}

const sendMessage = (message) =>{
    return {
        type: "SEND_MESSAGE",
        payload: message
    }
}


export {
    chatsListLoaded,
    chatDataLoaded,
    fetchChatList,
    initializeSocket,
    sendMessage
};