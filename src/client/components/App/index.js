import React, { useState, Component } from 'react'
import ChatsList from '../ChatList'
import ChatRoom from '../ChatRoom'
import { connect } from 'react-redux'
import { fetchChatList } from '../../actions'

  // const socket = new WebSocket('ws://localhost:3001/');

  // socket.onopen = function() {
  //   // const msg = {
  //   //   text: 'some_text', 
  //   //   autor: 'my',
  //   //   chatTitle: 'some'
  //   // }
  //   socket.send(JSON.stringify({ type: 'initial', chatTitle: 'some' }));
  // };

  // socket.onclose = function(event) {
  //   if (event.wasClean) {
  //     alert('Соединение закрыто чисто');
  //   } else {
  //     alert('Обрыв соединения'); // например, "убит" процесс сервера
  //   }
  //   console.log('Код: ' + event.code + ' причина: ' + event.reason);
  // };

  // socket.onmessage = function(event) {
  //   console.log(event.data)
  // };

  // socket.onerror = function(error) {
  //   console.log("Ошибка " + error);
  // };

class App extends Component {

  componentWillMount(){
    this.props.fetchChatList()
  }

  render(){
    return (
        <div>
          <ChatsList />
          <ChatRoom />
        </div>
      )
  }
}



const mapDispatchToProps = (dispatch) =>{
  return{
    fetchChatList: ()=> dispatch(fetchChatList())
  }
}

export default connect(()=>{return {}}, mapDispatchToProps)(App)