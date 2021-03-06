import { loginModule } from './login'
import { logoutModule } from './logout'
import { signUpModule } from './signUp'
import { AuthState, AuthActions } from '../../types/auth'
import * as types from '../../actions/auth/authActionTypes'

const initialState: AuthState = {
	loading: false,
	error: undefined,
}

//TODO: need to search: is it exist another approach for splitting like that

export const authReducer = (
	state = initialState,
	action: AuthActions
): AuthState => {
	const module = action.type.split('/')[1]
	switch (module) {
		case types.AUTH_LOGIN_MODULE:
			return loginModule(state, action)
		case types.AUTH_LOGOUT_MODULE:
			return logoutModule(state, action)
		case types.AUTH_SIGNUP_MODULE:
			return signUpModule(state, action)
		default:
			return state
	}
}
