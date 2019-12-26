import { call as typedCall } from 'typed-redux-saga'
import * as api from '../../api/index'
import * as loginActions from '../actions/auth/login'
import * as signUpActions from '../actions/auth/signUp'
import * as logoutActions from '../actions/auth/logout'
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
import { putError } from '../../utils/errors/putError'

function* logout(): SagaIterator {
	try {
		yield* typedCall(api.logout)
		yield put(logoutActions.resolveLogout())
	} catch (err) {
		yield put(logoutActions.rejectLogout(err))
	}
}

function* signUp({
	payload,
}: ReturnType<typeof signUpActions.signUp>): SagaIterator {
	try {
		yield* typedCall(api.signUpWithPassword, payload)
	} catch (err) {
		yield put(signUpActions.rejectSignUp(err))
	}
}

export function* watchSignUp(): SagaIterator {
	yield takeEvery(types.AUTH_SIGNUP_REQUEST, signUp)
}

function* loginWithEmailPW(payload: LoginParams): SagaIterator {
	try {
		yield* typedCall(api.loginWithPassword, payload)
		yield put(loginActions.resolveLogin())
	} catch (err) {
		yield putError(loginActions.rejectLogin, err)
	} finally {
		if (yield cancelled()) {
			yield put(
				loginActions.rejectLogin(
					new Error('loginWithEmailPW task was cancelled')
				)
			)
		}
	}
}

function* loginWithGoogle(): SagaIterator {
	try {
		yield* typedCall(api.signInWithGoogle)
		yield put(loginActions.resolveLogin())
	} catch (err) {
		yield putError(loginActions.rejectLogin, err)
	}
}

export function* authFlow(): SagaIterator {
	while (true) {
		const loginAction = yield take([
			types.AUTH_LOGIN_REQUEST,
			types.AUTH_LOGIN_GOOGLE_REQUEST,
			'@@reactReduxFirebase/SET_PROFILE',
		])
		let taskToCancel = undefined
		switch (loginAction.type) {
			case types.AUTH_LOGIN_REQUEST:
				const { payload: loginPayload }: { payload: LoginParams } = loginAction
				taskToCancel = yield fork(loginWithEmailPW, loginPayload)
				break
			case types.AUTH_LOGIN_GOOGLE_REQUEST:
				taskToCancel = yield fork(loginWithGoogle)
				break
			default:
		}
		const action = yield take([
			types.AUTH_LOGIN_REJECT,
			types.AUTH_LOGOUT_REQUEST,
		])
		if (action.type === types.AUTH_LOGOUT_REQUEST) {
			taskToCancel ? yield cancel(taskToCancel) : null
			yield* typedCall(logout)
		}
	}
}
