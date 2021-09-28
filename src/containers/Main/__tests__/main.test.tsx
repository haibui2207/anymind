import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Main from '../Main';

describe('Testing Main', () => {
  it('should render match snapshot', () => {
    const wrapper = shallow(<Main />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
