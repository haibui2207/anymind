import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import Empty from "../Empty";

describe("Testing Main > Conversation > Empty", (): void => {
  let wrapper: any;

  beforeAll((): void => {
    wrapper = mount(<Empty />);
  });

  it("should render match snapshot", (): void => {
    const wrapper = shallow(<Empty />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should have an image", (): void => {
    expect(wrapper.find('[data-test="empty-image"]')).toHaveLength(1);
  });

  it("should have a title", (): void => {
    expect(wrapper.find('[data-test="empty-title"]')).toHaveLength(1);
  });

  it("should have a description", (): void => {
    expect(wrapper.find('[data-test="empty-description"]')).toHaveLength(1);
  });
});
