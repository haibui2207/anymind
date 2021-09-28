import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button from '../Button';

describe('Testing Button component', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<Button tag="button">Button</Button>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
