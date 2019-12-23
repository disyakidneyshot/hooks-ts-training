import React, { ComponentType } from 'react'
import { RouteComponentProps, Redirect } from '@reach/router'
import { useAuth } from '../hooks/useAuth'

interface IPrivateRouteProps extends RouteComponentProps {
	as: ComponentType
}

type Props = RouteComponentProps & IPrivateRouteProps

export const PrivateRoute: React.FC<Props> = (props): JSX.Element => {
	const { uid } = useAuth()
	const { as: Component, ...rest } = props
	return uid ? <Component {...rest} /> : <Redirect from='' to='login' noThrow />
}
