import * as React from 'react'
import styled from 'styled-components'
import { useWindowDimensions } from '../../../utils/hooks/useWindowDimensions'
import { TopNavBar } from './TopNav'
import { BottomNavBar } from './BottomNav'

export const Nav = styled.nav`
	position: fixed;
	left: 0;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
`
export const NavHOC: React.FC = (): JSX.Element => {
	const { width } = useWindowDimensions()

	return width > 768 ? <TopNavBar /> : <BottomNavBar />
}
