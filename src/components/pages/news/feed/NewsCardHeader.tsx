import React from 'react'
import { Header } from '../../../ui/Header'

export const NewsCardHeader: React.FC = (props): JSX.Element => {
	return <Header height={100}>{props.children}</Header>
}
