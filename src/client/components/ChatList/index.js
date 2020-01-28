import React from 'react';
import { connect } from 'react-redux';
import { initializeSocket, sendMessage } from '../../actions'

const ChatsList = ({ chatsList, dispatchInitializeSocket, dispatchSendMessage }) =>{

    const printChat = (chat)=>{
        return(
            <li key={ chat._id }
             onClick={()=>dispatchInitializeSocket(chat.title)}
             >
                { chat.title }
            </li>
        )
    }

    return (<ul>
        { chatsList.map( e => printChat(e) )}
        <li onClick={()=>dispatchSendMessage('some body')}>some text</li>
    </ul>)
}

const mapStateToProps = ({ chatsList }) => {
    return {
        chatsList: chatsList
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        dispatchInitializeSocket: (chatTitle) => dispatch(initializeSocket(chatTitle)),
        dispatchSendMessage: (message) => dispatch(sendMessage(message))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatsList)