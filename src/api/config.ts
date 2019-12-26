import * as firebase from 'firebase/app'
import 'firebase/auth'

export const firebaseConfig = {
	apiKey: 'AIzaSyC61Nm8b3AC1rZ6Oemn9szHVDj6OVeHepM',
	authDomain: 'newsfeed-4bc4d.firebaseapp.com',
	databaseURL: 'https://newsfeed-4bc4d.firebaseio.com',
	projectId: 'newsfeed-4bc4d',
	storageBucket: 'newsfeed-4bc4d.appspot.com',
	messagingSenderId: '984171862961',
	appId: '1:984171862961:web:a1b8ee61006aaa3658fb90',
}

export const NEWS_API_KEY = 'd9fd6f329ecb4013bfc11429ecc2f1c9'
export const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines'

export const GAuthProvider = new firebase.auth.GoogleAuthProvider()
GAuthProvider.addScope('profile')
GAuthProvider.addScope('email')
