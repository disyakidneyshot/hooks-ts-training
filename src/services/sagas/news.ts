import { put, takeEvery, select } from 'redux-saga/effects'
import { call as typedCall } from 'typed-redux-saga'
import * as api from '../../api/index'
import * as types from '../actions/news/newsActionTypes'
import * as newsActions from '../actions/news/news'
import { SagaIterator } from 'redux-saga'

export function* getNews(
	action: ReturnType<typeof newsActions.getNews>
): SagaIterator {
	try {
		const { news } = yield select()
		const { articles, totalResults } = yield* typedCall(
			api.getNews,
			action.payload
		)
		const payload = {
			...articles.reduce((result: any, currVal: any) => {
				const { source, publishedAt } = currVal as any
				const id = `${source.name}${publishedAt}`
				result.ids.push(id)
				result.articles[id] = { id, ...currVal }
				return result
			}, news),
			total: totalResults,
		}
		yield put(newsActions.resolveGetNews(payload))
	} catch (err) {
		yield put(newsActions.rejectGetNews(err))
	}
}

export function* watchGetNews() {
	yield takeEvery(types.NEWS_GET_REQUEST, getNews)
}
