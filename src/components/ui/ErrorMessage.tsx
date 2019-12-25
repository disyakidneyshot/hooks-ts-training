import styled from 'styled-components'

export const ErrorMessage = styled.div`
	border-radius: 6px;
	min-width: 100px;
	height: 50px;
	padding: 10px;
	box-sizing: border-box;
	font-weight: 500;
	font-size: 12px;
	display: flex;
	align-items: center;
	background-color: ${props => props.theme.lightError};
	color: ${props => props.theme.text};
`

ErrorMessage.displayName = 'ErrorMessage'
