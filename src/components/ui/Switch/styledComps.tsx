import styled, { css } from 'styled-components'

export const Background = styled.div`
	width: 40px;
	height: 20px;
	background-color: #424242;
	transition: background-color 250ms ease;
	border-radius: 10px;
	cursor: pointer;
	display: flex;
	align-items: center;
	position: relative;
`
interface TogglerProps {
	state: boolean
}

export const Toggler = styled.div<TogglerProps>`
	width: 12px;
	height: 12px;
	margin-left: 3px;
	margin-right: 3px;
	background-color: #fff;
	border-radius: 50%;
	transform: translateX(${props => (props.state ? '0' : '18px')});
	transition: all 250ms ease;
`

interface ISwitchIconProps {
	side: 'right' | 'left'
}

export const SwitchIcon = styled.div<ISwitchIconProps>`
	position: absolute;
	top: 50%;
	width: 11px;
	height: 11px;
	user-select: none;
	font-size: 10px;
	line-height: normal;
	transform: translateY(-50%);
	${props =>
		props.side === 'left'
			? css`
					left: 4px;
			  `
			: css`
					right: 4px;
			  `}
`
