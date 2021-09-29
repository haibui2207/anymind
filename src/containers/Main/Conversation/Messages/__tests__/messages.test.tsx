import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Messages from "../Messages";

describe("Testing Main > Conversation > Messages", (): void => {
  it("should render match snapshot", (): void => {
    const wrapper = shallow(<Messages />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
