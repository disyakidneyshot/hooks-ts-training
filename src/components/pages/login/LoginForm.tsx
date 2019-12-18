import React from 'react'
import { Panel } from '../../ui/Panel/Panel'
import Input from '../../ui/Input/Input'
import { Button } from '../../ui/Button'
import { FormElement } from '../../ui/Form/FormElement'
import { Tabs } from '../../ui/Tabs'
import { availableTabs } from './const'
import { LoginParams } from '../../../api/auth'
import { Redirect } from '@reach/router'
import { useAuthProvider } from '../../../utils/hooks/useAuth'
import { Form, Field } from 'react-final-form'
import { Spinner } from '../../ui/Spinner/Spinner'
import { useSelector } from 'react-redux'
import { RootState } from '../../../services/reducers'
import { validators, combineValidators } from '../../../utils/validations'

export const LoginForm: React.FC = (): JSX.Element => {
	const [activeTab, setActiveTab] = React.useState('signIn')
	const loading = useSelector((state: RootState) => state.auth.loading)
	const { uid, login, signUp } = useAuthProvider()

	const initialValues: LoginParams = {
		email: '',
		password: '',
	}

	const onSubmit = (values: LoginParams) => {
		activeTab === 'signIn' ? login(values) : signUp(values)
	}

	return uid ? (
		<Redirect to='/news' noThrow />
	) : (
		<>
			<Panel minWidth={360}>
				<Panel.Header>
					<Tabs
						tabs={availableTabs}
						activeTab={activeTab}
						onChange={value => setActiveTab(value)}
					/>
				</Panel.Header>
				<Panel.Content>
					<Form
						onSubmit={onSubmit}
						subscription={{ pristine: true }}
						initialValues={initialValues}
					>
						{({ handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								<Field<string>
									disabled={loading}
									margin='l'
									id='email'
									component={Input}
									name='email'
									type='email'
									label='Email'
									validate={combineValidators(
										validators.required,
										validators.email
									)}
								/>
								<Field<string>
									disabled={loading}
									margin='l'
									id='password'
									name='password'
									type='password'
									label='Пароль'
									component={Input}
									validate={combineValidators(
										validators.required,
										validators.minLength(9)
									)}
								/>
								<FormElement mt='l' mb='none'>
									<Button type='submit' disabled={loading}>
										{activeTab === 'signIn' ? 'Войти' : 'Подтвердить'}
									</Button>
								</FormElement>
							</form>
						)}
					</Form>
				</Panel.Content>
			</Panel>
		</>
	)
}
