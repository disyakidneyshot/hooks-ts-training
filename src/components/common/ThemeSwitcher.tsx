import React from 'react'
import { SwitchWithLabel } from '../ui/Switch/SwitchWithLabel'
import { useTheme } from '../../utils/hooks/useTheme'
import { FaSun, FaMoon } from 'react-icons/fa'
import { Icon } from '../ui/Icon/Icon'

export const ThemeSwitcher: React.FC<{ label?: boolean }> = ({
	label,
}): JSX.Element => {
	const [name, changeTheme] = useTheme()

	return (
		<SwitchWithLabel
			label={label ? 'Тема' : ''}
			value={name === 'light'}
			onChange={changeTheme}
		>
			<SwitchWithLabel.On><Icon name='moon'/></SwitchWithLabel.On>
			<SwitchWithLabel.Off><Icon name='sunny'/></SwitchWithLabel.Off>
		</SwitchWithLabel>
	)
}

ThemeSwitcher.defaultProps = {
	label: true,
}
