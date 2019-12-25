import styled from 'styled-components'

export const Button = styled.button`
	background-color: ${props => props.theme.accent};
	min-width: 40px;
	width: 100%;
	height: 40px;
	border: none;
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.7px;
	text-transform: uppercase;
	color: ${props => props.theme.bgLight};
	border-radius: 6px;
	outline: none;
	transition: all 120ms ease, opacity 150ms ease;
	cursor: pointer;

	:focus {
		box-shadow: 0 0 3px ${props => props.theme.accent};
	}

	:hover {
		opacity: 0.9;
	}

	:disabled {
		background-color: ${props => props.theme.navText};
		user-select: none;
		cursor: not-allowed;
	}
`

Button.displayName = 'Button'
