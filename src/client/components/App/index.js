import React, { useState, Component } from 'react'
import ChatsList from '../ChatsList'
import ChatRoom from '../ChatRoom'
import { connect } from 'react-redux'
import { fetchChatList } from '../../actions'

import './App.scss'

class App extends Component {

  componentWillMount(){
    this.props.fetchChatList()
  }

  render(){
    return (
        <div className="App">
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