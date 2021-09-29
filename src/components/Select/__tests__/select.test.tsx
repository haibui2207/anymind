import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import CustomSelect from "../Select";

describe("Testing Select component", (): void => {
  const props = {
    name: "select",
    onChange: jest.fn(),
    options: [
      { label: "Option 1", value: 1 },
      { label: "Option 2", value: 2 },
    ],
  };

  it("should render match snapshot", (): void => {
    const wrapper = shallow(<CustomSelect {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
