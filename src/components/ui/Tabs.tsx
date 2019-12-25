import React from 'react'
import styled, { css } from 'styled-components'

export type ITabsList = {
	value: string
	label: string
}[]

const TabsContainer = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`

TabsContainer.displayName = 'TabsContainer'

interface ITabProps {
	active?: boolean
	separator: boolean
}

const Tab = styled.div<ITabProps>`
	min-width: 100px;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	border-bottom: 2px solid ${props => props.theme.bg};
	color: ${props => props.theme.text};
	cursor: pointer;
	user-select: none;
	transition: all 200ms ease;

  ${props =>
		props.separator &&
		css`
			border-right: 2px solid ${props.theme.bg};
		`}

	${props =>
		!props.active &&
		css`
			:hover {
				opacity: 0.7;
			}
		`}

	${props =>
		props.active &&
		css`
			color: ${props.theme.accent};
		`};
`

Tab.displayName = 'Tab'

interface ITabsProps {
	tabs: ITabsList
	activeTab: string
	onChange: (value: string) => void
}

export const Tabs: React.FC<ITabsProps> = (props): JSX.Element => {
	const { tabs, activeTab, onChange } = props
	return (
		<TabsContainer>
			{tabs.map((tab, index) => (
				<Tab
					separator={index < tabs.length - 1}
					key={index}
					active={activeTab === tab.value}
					onClick={() => onChange(tab.value)}
				>
					{tab.label}
				</Tab>
			))}
		</TabsContainer>
	)
}
