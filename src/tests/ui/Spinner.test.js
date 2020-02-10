import React from 'react'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'
import { Spinner } from '../../components/ui/Spinner/Spinner'

describe('Component: <Spinner />', () => {
	const sizeProp = 23
	const Wrapper = shallow(<Spinner size={sizeProp} />)

	it('renders without crashing', () => {
		expect(Wrapper).toMatchSnapshot()
	})

	it('components size is based on prop:size', () => {
		const MounterWrapper = mount(<Spinner size={sizeProp} />)
		const Ball = MounterWrapper.find('Ball').first()
		expect(MounterWrapper).toHaveStyleRule('width', `${sizeProp * 2}px`)
		expect(MounterWrapper).toHaveStyleRule('height', `${sizeProp}px`)
		expect(Ball).toHaveStyleRule('width', `${sizeProp * 2}px`)
		expect(Ball).toHaveStyleRule('height', `${sizeProp}px`)
	})
})
