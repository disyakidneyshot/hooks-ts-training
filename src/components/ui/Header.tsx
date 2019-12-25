import React from 'react'
import styled from 'styled-components'
import { HTMLAttributes } from 'react'

export const StyledHeader = styled.h2`
	font-weight: 500;
	font-size: 22px;
	margin: 10px 0;
	overflow: hidden;
	position: relative;

	:after {
		content: '';
		text-align: right;
		position: absolute;
		bottom: 0;
		right: 0;
		width: 20%;
		height: 1.2em;
		background: ${props =>
			`linear-gradient(
			to right,
			${props.theme.bgLight}00,
			${props.theme.bgLight} 50%
		)`};
	}
`

StyledHeader.displayName = 'StyledHeader'

interface HeaderProps {
	height: number | string
}

export const Header: React.FC<HTMLAttributes<HTMLHeadingElement> &
	HeaderProps> = (props): JSX.Element => {
	const height =
		typeof props.height === 'number' ? `${props.height}px` : props.height
	return (
		<StyledHeader style={{ ...props.style, height }}>
			{props.children}
		</StyledHeader>
	)
}

Header.defaultProps = {
	height: '1.2em',
}
