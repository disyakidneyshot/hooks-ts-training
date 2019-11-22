import { combineReducers } from 'redux'
import newsReducer from './news'
import { NewsActions } from '../types/news'

const rootReducer = combineReducers({
	news: newsReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
export type RootAction = NewsActions
