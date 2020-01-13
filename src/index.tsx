import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import { store } from './services/store'
import './index.css'
import { firebaseConfig } from './api/config'
import { createFirestoreInstance } from 'redux-firestore'

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
}

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance,
}

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<App />
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
)
