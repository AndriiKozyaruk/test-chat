import { all } from 'redux-saga/effects'
import { watchOnInitializeSocket } from './socketSaga'
import { watchFetchChatRooms, watchFetchCreateNewChat } from './fetchSaga'

export default function* rootSaga() {
  yield all([
		watchOnInitializeSocket(),
		watchFetchChatRooms(),
		watchFetchCreateNewChat()
  ])
}