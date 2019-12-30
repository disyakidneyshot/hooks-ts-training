import React from 'react'
import { availableIcons } from './icons'

interface IIconProps {
  name: keyof typeof availableIcons
}

export const Icon: React.FC<IIconProps> = ({ name }): JSX.Element => {
  return <img src={availableIcons[name]} alt="icon"/>
}