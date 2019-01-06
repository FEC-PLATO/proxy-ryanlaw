import React from 'react';
import { shallow } from 'enzyme';

import App from '../client/components/app.jsx'
import PositiveReviews from '../client/components/positiveReviews.jsx'

describe('<App />', () => {
	test('renders four positiveReviews components', () => {
		const wrapper = shallow(<PositiveReviews />);
		expect(wrapper.find(PositiveReviews)).to.have.lengthOf(4)
	})
})