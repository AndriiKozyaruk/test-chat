const initialState = {
  chatsList: [
  ],
  currentChat: {
    title: '',
    messages: [],
    isOpen: false
  },
  error: null,
  loading: true,
  isSocketConected: false
};

const addNewMessage = (state, action) =>{
  const newMesseges = [ ...state.currentChat.messages, ...action.messages ]

  return {
    ...state,
    currentChat: {
      ...state.currentChat,
      messages: newMesseges
    }
  }
}

const reducer = (state = initialState, action) =>{

  switch (action.type) {
    case 'CHATS_LIST_LOADED':
      return {
        ...state,
        chatsList: action.chatsList
      };

    case 'NEW_CHAT_CREATED':
      return {
        ...state,
        chatsList: [ ...state.chatsList, action.newChat ]
      }

    case 'CHAT_LOADED':

      return {
        ...state,
        currentChat: { ...action.chat, isOpen: true },
        chatIsOpen: true
      }

    case 'SOCKED_CONNECTED':
      return {
        ...state,
        isSocketConected: true
      }

    case 'INCOMING_NEW_MESSAGES':
      return addNewMessage(state, action)

    default:
      return state
  }
};

export default reducer