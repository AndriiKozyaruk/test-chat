import React from 'react';
import { connect } from 'react-redux'

const ChatRoom = ({ currentChat }) =>{

    const Messages = () =>{
        console.log(currentChat.messages)
        return currentChat.messages.map(message =>{
            return <p key={ message._id }> { message.text } </p>
        })
    }

    if(currentChat){
        return (
            <div>
                <Messages />
            </div>
        )
    }else{
        return <div>Chat is empty</div>
    }
}

const mapStateToProps = ({ currentChat }) =>{
    return {
        currentChat: currentChat
    }
}

export default connect(mapStateToProps)(ChatRoom)