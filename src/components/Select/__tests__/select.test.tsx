import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CustomSelect from '../Select';

describe('Testing Select component', () => {
  let wrapper;
  const props = {
    name: 'select',
    onChange: jest.fn(),
    options: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ],
  };

  beforeAll(() => {
    wrapper = mount(<CustomSelect {...props} />);
  });

  it('should render match snapshot', () => {
    const wrapper = shallow(<CustomSelect {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
