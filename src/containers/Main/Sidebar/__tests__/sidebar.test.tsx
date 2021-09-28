import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Sidebar from "../Sidebar";

describe("Testing Main > Sidebar", () => {
  it("should render match snapshot", () => {
    const wrapper = shallow(<Sidebar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
