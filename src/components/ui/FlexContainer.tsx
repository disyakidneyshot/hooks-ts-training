import styled from 'styled-components'

type IFlexAlign =
	| 'flex-start'
	| 'flex-end'
	| 'center'
	| 'space-between'
	| 'space-around'

interface IFlexContainerProps {
	width?: string
	height?: string
	justifyContent?: IFlexAlign
	flexDirection?: 'column' | 'row'
	alignItems?: IFlexAlign
}

export const FlexContainer = styled.div<IFlexContainerProps>`
	width: ${props => props.width};
	height: ${props => props.height};
	display: flex;
	justify-content: ${props => props.justifyContent};
	flex-direction: ${props => props.flexDirection};
	align-items: ${props => props.alignItems};
`

FlexContainer.defaultProps = {
	width: '100%',
	height: '100%',
	justifyContent: 'center',
	flexDirection: 'row',
	alignItems: 'center',
}

FlexContainer.displayName = 'FlexContainer'
