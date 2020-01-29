import { put, takeEvery } from 'redux-saga/effects'
import fetchPolyfil from 'node-fetch'



function* fetchChatList() {
	const req = yield fetchPolyfil('http://localhost:3000/chats')
	if(req.status == 200){
		const res = yield req.json()
		yield put({ type: 'CHATS_LIST_LOADED', chatsList: res })
	}else {
		yield put({ type: 'REQUEST_ERROR' })
	}
}


function* fetchCreateNewChat({ chatName }) {
	const req = yield fetchPolyfil('http://localhost:3000/chats', {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({ title: chatName })
		})
	if(req.status == 200){
		const res = yield req.json()

		yield put({ type: 'NEW_CHAT_CREATED', newChat: res })
	}else {
		yield put({ type: 'REQUEST_ERROR' })
	}
}


export function* watchFetchCreateNewChat(){
	yield takeEvery('FETCH_CREATE_NEW_CHAT', fetchCreateNewChat)
}

export function* watchFetchChatRooms(){
	yield takeEvery('FETCH_CHAT_LIST', fetchChatList)
}