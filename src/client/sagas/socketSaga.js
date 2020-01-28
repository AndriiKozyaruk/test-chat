import { take, put, call, apply, delay, takeEvery } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'


function createSocketChannel({socket, chatTitle}) {
  return eventChannel(emit => {

    const pingHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(JSON.parse(event.data))
    }

    const errorHandler = (errorEvent) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason))
    }
    socket.onopen = ()=> socket.send(JSON.stringify({ type: 'initial', chatTitle: chatTitle }));

    socket.onmessage = pingHandler

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('ping', pingHandler)
    }

    return unsubscribe
  })
}

// reply with a `pong` message by invoking `socket.emit('pong')`
// function* pong(socket) {
//   yield delay(5000)
//   yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context

// socketController

function* sendMessage (payload, socket) {
  console.log('some', payload, socket)
}

export function* watchOnMessageSocket() {
  const { chatTitle } = yield take('INITIALIZE_SOCKET')

  const socket = yield new WebSocket('ws://localhost:3001')

  const socketChannel = yield call(createSocketChannel, { socket, chatTitle })
  yield takeEvery('SEND_MESSAGE', (payload)=>sendMessage(payload, socket))
  while (true) {
      try {
          const payload = yield take(socketChannel)
          yield put({ type: 'INCOMING_NEW_MESSAGES', messages: payload })

      //   yield fork(pong, socket)
      } catch(err) {
          console.error('socket error:', err)
          // socketChannel is still open in catch block
          // if we want end the socketChannel, we need close it explicitly
          // socketChannel.close()
      }
  }
}