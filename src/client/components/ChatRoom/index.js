import React, { useState } from 'react';
import { connect } from 'react-redux'
import { sendMessage } from '../../actions'

import './ChatRoom.scss'

const ChatRoom = ({ currentChat, dispatchSendMessage, dispatchCloseChat }) =>{

    const [autor, setAutor] = useState('')
    const [textMessage, setTextMessage] = useState('')
    const [allFieldIsValid, setAllFieldIsValid] = useState(false)

    const Messages = () =>{
        return currentChat.messages.map((message, iter) =>{
            return (
                <div key={ iter } className="ChatRoom__MessageItem">
                    <h5>{ message.autor }</h5>
                    <p>{ message.text }</p>
                </div>)
        })
    }

    const checkUserInput = ()=>{
        if(autor !== '' && typeof(autor) == 'string' && textMessage !== '' && typeof(textMessage) == 'string'){
            setAllFieldIsValid(true)
        }else{
            setAllFieldIsValid(false)
        }
    }

    return (
        <div className="ChatRoom">
            {/* <button onClick={dispatchCloseChat}>Close</button> */}
            <h3 className="ChatRoom__Header">{currentChat.title}</h3>
            <div className="ChatRoom__Messeges">
                { currentChat.messages && currentChat.messages.length ?
                    <Messages />
                    :
                    <p>No messages</p> }
            </div>

            <div className="ChatRoom__UserInput">
                <input type="text" placeholder="Name" onChange={(e)=>{
                    setAutor(e.target.value)
                    checkUserInput()
                }} />
                <input type="text" placeholder="Text" onChange={(e)=>{
                    setTextMessage(e.target.value)
                    checkUserInput()
                }} />

                <button
                className={allFieldIsValid ? 'ChatRoom__Button' : 'ChatRoom__Button--disable'}
                    onClick={()=>{
                        if(allFieldIsValid){
                            dispatchSendMessage({ autor: autor, text: textMessage, chatTitle: currentChat.title })
                        }
                    }}>
                    Send
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ currentChat }) =>{
    return {
        currentChat: currentChat
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        dispatchSendMessage: (payload) => dispatch(sendMessage(payload)),
        dispatchCloseChat: () => dispatch(closeChat())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)