import { call as typedCall } from 'typed-redux-saga'
import * as api from '../../api/index'
import * as loginActions from '../actions/auth/login'
import * as signUpActions from '../actions/auth/signUp'
import { SagaIterator } from 'redux-saga'
import * as types from '../actions/auth/authActionTypes'
import {
	put,
	fork,
	take,
	cancel,
	cancelled,
	takeEvery,
} from 'redux-saga/effects'
import { LoginParams } from '../../api/auth'

// TODO: need a little bit of refactoring

function* signUp({
	payload,
}: ReturnType<typeof signUpActions.signUp>): SagaIterator {
	try {
		const result = yield* typedCall(api.signUpWithPassword, payload)
	} catch (err) {}
}

export function* watchSignUp(): SagaIterator {
	yield takeEvery(types.AUTH_SIGNUP_REQUEST, signUp)
}

function* authorize(payload: LoginParams): SagaIterator {
	try {
		yield* typedCall(api.loginWithPassword, payload)
		yield put(loginActions.resolveLogin())
	} catch (err) {
		yield put(loginActions.rejectLogin(err))
	} finally {
		if (yield cancelled()) {
			yield put(
				loginActions.rejectLogin(new Error('authorize task was cancelled'))
			)
		}
	}
}

export function* authFlow(): SagaIterator {
	while (true) {
		// TODO: need to figure out why i cannot pass action creator to take() and make it work the right way
		const { payload: loginPayload }: { payload: LoginParams } = yield take(
			types.AUTH_LOGIN_REQUEST
		)
		const task = yield fork(authorize, loginPayload)
		const action = yield take([
			types.AUTH_LOGIN_REJECT,
			types.AUTH_LOGOUT_REQUEST,
		])
		if (action.type === types.AUTH_LOGOUT_REQUEST) {
			yield cancel(task)
		}
		localStorage.removeItem('token')
	}
}
