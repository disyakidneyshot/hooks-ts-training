import React, { AnchorHTMLAttributes } from 'react'
import { Link as RouterLink, LinkGetProps, LinkProps } from '@reach/router'

const isActive = ({ isPartiallyCurrent }: LinkGetProps) => {
	return isPartiallyCurrent ? { className: 'active' } : {}
}

//TODO: need to figure out how to handle type of LinkProps with it
export const Link: React.FC<LinkProps<any> &
	AnchorHTMLAttributes<HTMLAnchorElement>> = (props): JSX.Element => {
	// @ts-ignore
	return <RouterLink getProps={isActive} {...props} />
}
