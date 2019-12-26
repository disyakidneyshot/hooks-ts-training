import * as types from './authActionTypes'
import { LoginParams } from '../../../api/auth'

export const login = (payload: LoginParams) =>
	<const>{
		type: types.AUTH_LOGIN_REQUEST,
		payload,
	}

export const signInWithGoogle = () =>
	<const>{ type: types.AUTH_LOGIN_GOOGLE_REQUEST }
export const resolveLogin = () =>
	<const>{
		type: types.AUTH_LOGIN_RESOLVE,
	}

export const rejectLogin = (payload: Error) =>
	<const>{
		type: types.AUTH_LOGIN_REJECT,
		payload,
	}
