import React, { useState } from 'react';
import { connect } from 'react-redux';
import { initializeSocket, fetchCreateNewChat, switchChat } from '../../actions';

import './ChatsList.scss';

const ChatsList = ({
  chatsList, isSocketConected, dispatchSwitchChat,
  dispatchInitializeSocket, dispatchSendMessage, dispatchFetchCreateNewChat }) =>{

  const [nameNewChat, setNameNewChat] = useState('');

  const ChatItems = (chat, iter)=>{
    return chatsList.map((chat, iter) =>{
      return(
        <div key={ iter } className="ChatsList__Item"
          onClick={()=>{
              if(isSocketConected){
                dispatchSwitchChat(chat.title);
              }else{
                dispatchInitializeSocket(chat.title);
              };
            }}
          >
            { chat.title }
        </div>)
      })
  }

  return (
    <div className="ChatsList">
      <div className="ChatsList__ChatItemWrapper">
        <ChatItems />
      </div>
      <div className="ChatsList__NewChat">
        <input placeholder="Name of new chat" type="text" onChange={(e)=>setNameNewChat(e.target.value)}></input>
        <button
          onClick={()=>dispatchFetchCreateNewChat(nameNewChat)}
        >Create new chat</button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ chatsList, isSocketConected  }) => {
  return {
    chatsList: chatsList,
    isSocketConected: isSocketConected
  };
};
const mapDispatchToProps = (dispatch) =>{
  return {
    dispatchSwitchChat: (chatTitle) => dispatch(switchChat(chatTitle)),
    dispatchInitializeSocket: (chatTitle) => dispatch(initializeSocket(chatTitle)),
    dispatchFetchCreateNewChat: (chatName) => dispatch(fetchCreateNewChat(chatName))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChatsList);