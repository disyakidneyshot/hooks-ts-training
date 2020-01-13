import React from 'react'
import { Spinner } from './Spinner'
import styled from 'styled-components'

const SpinnerContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const FullPageSpinner: React.FC = (): JSX.Element => {
	return (
		<SpinnerContainer>
			<Spinner />
		</SpinnerContainer>
	)
}
