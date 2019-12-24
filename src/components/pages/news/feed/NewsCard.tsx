import React, { HTMLAttributes } from 'react'
import { NewsElement } from '../../../../services/types/news'
import styled from 'styled-components'
import { Img } from '../../../ui/Img'
import { NewsCardHeader } from './NewsCardHeader'
import { navigate } from '@reach/router'

const CardContainer = styled.div`
	width: 100%;
	max-width: 760px;
	height: 400px;
	overflow: hidden;
	background-color: ${props => props.theme.bg};
	border-radius: 10px;
	box-shadow: ${props =>
		props.theme.name !== 'light'
			? `-20px 0 20px -20px ${props.theme.bsColor}, 20px 0 20px -20px ${props.theme.bsColor}`
			: ``};
`
const Wrapper = styled.div`
	width: 100%;
	height: calc(100% - 6px);
	margin: 3px 0;
	box-sizing: border-box;
	padding: 10px 20px;
	background-color: ${props => props.theme.bgLight};
	overflow: hidden;
	cursor: pointer;
`

interface NewsCardProps {
	article: NewsElement
}

export const NewsCard: React.FC<NewsCardProps &
	HTMLAttributes<HTMLDivElement>> = (props): JSX.Element => {
	const {
		article: { title, urlToImage, id },
	} = props

	const readMoreHandler = () => {
		navigate(`news/post/${id}`)
	}

	return (
		<CardContainer style={props.style}>
			<Wrapper onClick={readMoreHandler}>
				<NewsCardHeader>{title}</NewsCardHeader>
				<Img src={urlToImage} alt='image' style={{ maxHeight: '240px' }} />
			</Wrapper>
		</CardContainer>
	)
}
