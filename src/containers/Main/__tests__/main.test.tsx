import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import {
  IConversation,
  ConversationContext,
  defaultContextValue,
} from "../../../providers/ConversationProvider";
import { ApolloProvider } from "../../../providers";
import Main from "../Main";
import Sidebar from "../Sidebar";
import Conversation from "../Conversation";

describe("Testing Main", (): void => {
  let wrapper: any;
  const mockContextValue: IConversation = {
    ...defaultContextValue,
    users: [{ id: "1", name: "User 1", avatar: "" }],
    channels: [{ id: "1", name: "Channel 1" }],
    messages: [
      {
        messageId: "1",
        text: "The first message",
        datetime: "2021-09-29T01:39:08.665Z",
        userId: "Sam",
      },
    ],
  };

  beforeAll((): void => {
    wrapper = mount(
      <ConversationContext.Provider value={mockContextValue}>
        <ApolloProvider>
          <Main />
        </ApolloProvider>
      </ConversationContext.Provider>
    );
  });

  it("should render match snapshot", (): void => {
    const wrapper = shallow(
      <ConversationContext.Provider value={mockContextValue}>
        <ApolloProvider>
          <Main />
        </ApolloProvider>
      </ConversationContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should have a header", (): void => {
    expect(wrapper.find('[data-test="main-header"]')).toHaveLength(1);
  });

  it("should have a sidebar section", (): void => {
    expect(wrapper.find(Sidebar)).toHaveLength(1);
  });

  it("should have a Conversation section", (): void => {
    expect(wrapper.find(Conversation)).toHaveLength(1);
  });
});
