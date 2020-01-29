const fetchChatList = () =>{
  return {
    type: 'FETCH_CHAT_LIST'
  };
};


const fetchCreateNewChat = (chatName) =>{
  return {
    type: 'FETCH_CREATE_NEW_CHAT',
    chatName: chatName
  };
};


const initializeSocket = (chatTitle) =>{
  return{
    type: 'INITIALIZE_CHAT_SOCKET',
    chatTitle: chatTitle
  };
};


const sendMessage = (message) =>{
  return {
    type: "SEND_MESSAGE",
    message: message
  };
};


const switchChat = (chatTitle) =>{
  return {
    type: "SWITCH_CHAT",
    chatTitle: chatTitle
  };
};


export {
  switchChat,
  fetchChatList,
  initializeSocket,
  sendMessage,
  fetchCreateNewChat
};