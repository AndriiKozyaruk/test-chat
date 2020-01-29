import { take, put, call, apply, delay, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'


function createSocketChannel(socket, chatTitle) {
  return eventChannel(emit => {

    socket.onopen = (event) =>{
      socket.send(JSON.stringify({ type: 'INITIALIZE_ROOM', chatTitle: chatTitle }));
      return emit({ type: 'SOCKED_CONNECTED' })
    }

    socket.onmessage = (event) =>{
      let msg = null

      try {
        msg = JSON.parse(event.data)
      } catch(e) {
        console.error(`Error parsing : ${e.data}`)
      }

      if (msg) {
        const { messages, newChatTitle } = msg
        const channel = msg.channel

        switch (channel) {
          case 'CHAT_LOADED':
            console.log()
            return emit({ type: 'CHAT_LOADED', chat: { messages: messages, title: newChatTitle }})
          case 'INCOMING_NEW_MESSAGES':
            return emit({ type: 'INCOMING_NEW_MESSAGES', messages: messages })
          default:
        }
      }
    }

    socket.onerror = (event) => {
      emit(new Error(event.reason))
    }

    const unsubscribe = () => {
      console.log('some body')
    }

    return unsubscribe
  })
}


function sendMessage (socket, payload) {
  socket.send(JSON.stringify({ autor: payload.message.autor, text: payload.message.text, chatTitle: payload.message.chatTitle }))
}


function sendSwitchChat (socket, payload) {
  socket.send(JSON.stringify({ type: 'INITIALIZE_ROOM', chatTitle: payload.chatTitle }))
}


function* watchOnSocket(payload) {
  const { chatTitle } = payload

  const socket = yield new WebSocket('ws://localhost:3001')

  yield takeEvery('SEND_MESSAGE', sendMessage, socket)
  yield takeEvery('SWITCH_CHAT', sendSwitchChat, socket)


  const socketChannel = yield call(createSocketChannel, socket, chatTitle)

  while (true) {
    try {
      const payload = yield take(socketChannel)

      yield put(payload)
      // yield fork(pong, socket)
    } catch(err) {
        console.error('socket error:', err)
        socketChannel.close()
    }
  }
}

export function* watchOnInitializeSocket () {
  yield takeEvery('INITIALIZE_CHAT_SOCKET', watchOnSocket)
}