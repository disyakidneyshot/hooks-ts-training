import styled from 'styled-components'

interface IPageContainerProps {
	direction?: 'column' | 'row'
	align?: 'center' | 'flex-start' | 'flex-end'
}

export const PageContainer = styled.div<IPageContainerProps>`
	width: 100%;
	display: flex;
	flex-direction: ${props => props.direction && props.direction};
	justify-content: center;
	align-items: ${props => props.align && props.align};
	height: calc(100vh - 50px);
`

PageContainer.defaultProps = {
	direction: 'row',
	align: 'center',
}
