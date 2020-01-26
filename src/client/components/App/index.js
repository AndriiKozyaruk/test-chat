import React, { useState } from 'react'
import ChatsList from '../ChatList'
import ChatRoom from '../ChatRoom'

const socket = new WebSocket('ws://localhost:3001/');

socket.onopen = function() {
  console.log("Соединение установлено.");
  socket.send("Привет");
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert('Соединение закрыто чисто');
  } else {
    alert('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function(event) {
  console.log(event)
};

socket.onerror = function(error) {
  console.log("Ошибка " + error);
};

const App = () =>{

    const [chatListIsOpen, setChatListIsOpen] = useState(false)

    return (
        <div>
          <ChatsList isOnen = {chatListIsOpen} handleClose = {()=>setChatListIsOpen(false)}/>
          <ChatRoom />
        </div>
    )
}



export default App