import React from 'react'
import { NewsElement } from '../../../../services/types/news'

interface IPostProps extends NewsElement {}

export const Post: React.FC<IPostProps> = (): JSX.Element => {
	return <div>123</div>
}
