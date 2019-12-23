import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../services/reducers'
import { isLoaded } from 'react-redux-firebase'
import { FullPageSpinner } from '../../components/ui/Spinner/SpinnerFullPage'

export const AuthIsReady: React.FC = ({ children }): JSX.Element => {
	const auth = useSelector(
		(state: RootState) => state.firebase.auth,
		shallowEqual
	)
	if (!isLoaded(auth)) return <FullPageSpinner />
	return <>{children}</>
}
