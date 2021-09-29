import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import { Select } from "../../../../components";
import {
  IConversation,
  ConversationContext,
  defaultContextValue,
} from "../../../../providers/ConversationProvider";

import Sidebar from "../Sidebar";

describe("Testing Main > Sidebar", (): void => {
  let wrapper: any;
  const mockContextValue: IConversation = {
    ...defaultContextValue,
    users: [{ id: "1", name: "User 1", avatar: "" }],
    channels: [{ id: "1", name: "Channel 1" }],
  };

  beforeAll((): void => {
    wrapper = mount(
      <ConversationContext.Provider value={mockContextValue}>
        <Sidebar />
      </ConversationContext.Provider>
    );
  });

  it("should render match snapshot", (): void => {
    const wrapper = shallow(
      <ConversationContext.Provider value={mockContextValue}>
        <Sidebar />
      </ConversationContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show current active user avatar", (): void => {
    expect(
      wrapper.find('[data-test="sidebar-active-user-avatar"]')
    ).toHaveLength(1);
  });

  it("should have an Select to switch user", (): void => {
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it("should have some channels", (): void => {
    expect(wrapper.find('[data-test="sidebar-channel-item"]')).toHaveLength(
      mockContextValue.channels.length
    );
  });
});
