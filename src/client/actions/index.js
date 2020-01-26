const chatsListLoaded = (chatList) =>{
   return{
        type: 'CHATS_LIST_LOADED',
        payload: chatList
   };
};

const currentChatLoaded = (chat) =>{
    return {
        type: 'CURRENT_CHAT_LOADED',
        payload: chat
    };
};

export {
    chatsListLoaded,
    currentChatLoaded
};