import {
	loginWithPassword,
	signUpWithPassword,
	logout,
	signInWithGoogle,
} from './auth'
import { getNews } from './news'

export interface API {
	loginWithPassword: typeof loginWithPassword
	logout: typeof logout
	signUpWithPassword: typeof signUpWithPassword
	signInWithGoogle: typeof signInWithGoogle
	getNews: typeof getNews
}

export {
	getNews,
	loginWithPassword,
	logout,
	signUpWithPassword,
	signInWithGoogle,
}
