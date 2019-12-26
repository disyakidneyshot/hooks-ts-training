import React from 'react'
import { FlexContainer } from '../../ui/FlexContainer'
import { FormElement } from '../../ui/Form/FormElement'
import { IoLogoGoogle } from 'react-icons/io'
import { useAuthProvider } from '../../../utils/hooks/useAuth'

export const GAuth: React.FC = (): JSX.Element => {
	const { signInWGoogle } = useAuthProvider()
	return (
		<FormElement mt='s' mb='none'>
			<FlexContainer>
				<IoLogoGoogle
					size={25}
					onClick={signInWGoogle}
					style={{ cursor: 'pointer', padding: '5px' }}
				/>
			</FlexContainer>
		</FormElement>
	)
}
