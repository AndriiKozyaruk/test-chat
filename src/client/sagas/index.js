import { put, takeEvery, all } from 'redux-saga/effects'
import fetchPolyfil from 'node-fetch'
import { watchOnMessageSocket } from './socketSaga'

function* fetchChatList() {
	const req = yield fetchPolyfil('http://localhost:3000/chats')
	const res = yield req.json()
	yield put({ type: 'CHATS_LIST_LOADED', chatList: res })
}

function* watchFetchChatRooms(){
	yield takeEvery('FETCH_CHAT_LIST', fetchChatList)
}
// function* watchConntectSo = ketRequest(){
// 	const { payload } = yield take('CONNECT_SOKET_REQUESTED')
// 	yeild 
// }

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
	watchOnMessageSocket(),
    watchFetchChatRooms()
  ])
}