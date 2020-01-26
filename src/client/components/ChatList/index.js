import React from 'react';
import { connect } from 'react-redux';

const ChatsList = ({ chatsList, openChatRoom }) =>{

    const printChat = (chat)=>{
        return(
            <li key={ chat.id } onClick={()=>openChatRoom(chat.id)}>
                { chat.title }
            </li>
        )
    }

    return (<ul>
        { chatsList.map( e => printChat(e) )}
    </ul>)
}

const mapStateToProps = ({ chatsList }) => {
    return {
        chatsList: chatsList
    }
}


export default connect(mapStateToProps)(ChatsList)