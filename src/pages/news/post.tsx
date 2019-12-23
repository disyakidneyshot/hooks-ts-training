import React from 'react'
import { RouteComponentProps } from '@reach/router'

type Props = RouteComponentProps<{ id: string }>

const PostPage: React.FC<Props> = (props): JSX.Element => {
	const { id } = props
	return <div>{id}</div>
}

export default PostPage
