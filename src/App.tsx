import React from 'react'
import './App.css'
import { Router, Redirect } from '@reach/router'
import { NavHOC as NavBar } from './components/layout/Nav/NavBar'
import { Content } from './components/layout/Content'
import { FullPageSpinner } from './components/ui/Spinner/SpinnerFullPage'
import ErrorBoundary from './utils/errors/ErrorBoundary'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import * as availableThemes from './theme'
import {
	useWindowDimensions,
	IWindowSize,
} from './utils/hooks/useWindowDimensions'
import { PrivateRoute } from './utils/components/PrivateRoute'
import { AuthIsReady } from './utils/components/AuthIsReady'

const NewsPage = React.lazy(() => import('./pages/news/feed'))
const ProfilePage = React.lazy(() => import('./pages/profile'))
const LoginPage = React.lazy(() => import('./pages/auth'))

const GlobalStyle = createGlobalStyle`
	body {
		color: ${props => props.theme.text};
		background-color: ${props => props.theme.bg};
		transition: all 200ms ease;
	}
	a {
		text-decoration: none;
	}
	.active {
		color: ${props => props.theme.accent};
    text-transform: uppercase;
	  font-weight: 500;
    padding: 15px;
    font-size: 15px;

    @media (max-width: 768px) {
      font-size: 25px;
    }
	}
`

interface AppContext {
	size: IWindowSize
	changeTheme: (value: boolean) => void
}

export const AppContext = React.createContext<AppContext>({
	size: 'm',
	changeTheme: () => {},
})

const App: React.FC = (): JSX.Element => {
	const { size } = useWindowDimensions()
	const [theme, setTheme] = React.useState(availableThemes.lightTheme)

	React.useEffect(() => {
		const lsThemeValue = localStorage.getItem('theme')
		if (lsThemeValue !== undefined && lsThemeValue !== null) {
			changeTheme(JSON.parse(lsThemeValue))
		}
	}, [])

	const changeTheme = (value: boolean) => {
		const theme = value ? availableThemes.lightTheme : availableThemes.darkTheme
		localStorage.setItem('theme', value.toString())
		setTheme(theme)
	}

	return (
		<ErrorBoundary>
			<AppContext.Provider value={{ size, changeTheme }}>
				<ThemeProvider theme={theme}>
					<AuthIsReady>
						<NavBar />
						<GlobalStyle />
						<React.Suspense fallback={<FullPageSpinner />}>
							<Content>
								<Router>
									<NewsPage path='/news' />
									<PrivateRoute as={ProfilePage} path='/profile' />
									<LoginPage path='/login' />
									<Redirect from='*' to='/news' noThrow />
								</Router>
							</Content>
						</React.Suspense>
					</AuthIsReady>
				</ThemeProvider>
			</AppContext.Provider>
		</ErrorBoundary>
	)
}

export default App
