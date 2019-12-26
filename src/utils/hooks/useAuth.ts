import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../services/reducers'
import { uid } from '../../services/types/auth'
import {
	login as loginAction,
	signInWithGoogle as signInWGoogleAction,
} from '../../services/actions/auth/login'
import { logout as logoutAction } from '../../services/actions/auth/logout'
import { signUp as signUpAction } from '../../services/actions/auth/signUp'
import { LoginParams, SignUpParams } from '../../api/auth'

const userSelector = (state: RootState) => state.firebase.auth.uid

const authStateSelector = (state: RootState) => state.auth

export interface IUseAuthReturnType {
	uid: uid
	loading: boolean
	error?: Error
}

export const useAuth = (): IUseAuthReturnType => {
	const uid = useSelector(userSelector)
	const { loading, error } = useSelector(authStateSelector)
	return { uid, loading, error }
}

export interface IUseAuthProviderReturnType extends IUseAuthReturnType {
	login: (params: LoginParams) => ReturnType<typeof loginAction>
	logout: () => ReturnType<typeof logoutAction>
	signUp: (params: SignUpParams) => ReturnType<typeof signUpAction>
	signInWGoogle: () => ReturnType<typeof signInWGoogleAction>
}

export const useAuthProvider = (): IUseAuthProviderReturnType => {
	const { uid, error, loading } = useAuth()
	const dispatch = useDispatch()

	const login = (params: LoginParams) => dispatch(loginAction(params))

	const logout = () => dispatch(logoutAction())

	const signUp = (params: SignUpParams) => dispatch(signUpAction(params))

	const signInWGoogle = () => dispatch(signInWGoogleAction())

	return { uid, login, logout, signUp, error, loading, signInWGoogle }
}
