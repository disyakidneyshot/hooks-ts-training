import { AuthState, AuthActions } from '../../types/auth'
import * as types from '../../actions/auth/authActionTypes'

export const loginModule = (
	state: AuthState,
	action: AuthActions
): AuthState => {
	switch (action.type) {
		case types.AUTH_LOGIN_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			}
		case types.AUTH_LOGIN_GOOGLE_REQUEST:
			return {
				...state,
				loading: true,
				error: undefined,
			}
		case types.AUTH_LOGIN_RESOLVE:
			return {
				...state,
				loading: false,
			}
		case types.AUTH_LOGIN_REJECT:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			return state
	}
}
