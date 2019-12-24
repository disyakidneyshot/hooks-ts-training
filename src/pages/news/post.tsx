import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { PageContainer } from '../../components/layout/PageContainer'
import { Post } from '../../components/pages/news/post/Post'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/reducers'

type Props = RouteComponentProps<{ id: string }>

const postSelector = (state: RootState, id: string) => state.news.articles[id]

const PostPage: React.FC<Props> = (props): JSX.Element => {
	const { id } = props
	const post = useSelector((state: RootState) => id && postSelector(state, id))

	return (
		<PageContainer direction='row' align='flex-start'>
			{post ? <Post {...post} /> : <p>NOT FOUND</p>}
		</PageContainer>
	)
}

export default PostPage
