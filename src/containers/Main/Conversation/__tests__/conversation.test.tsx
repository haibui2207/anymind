import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";

import {
  IConversation,
  ConversationContext,
  defaultContextValue,
} from "../../../../providers/ConversationProvider";
import { ApolloProvider } from "../../../../providers";
import Empty from "../Empty";
import Messages from "../Messages";
import Conversation from "../Conversation";

describe("Testing Main > Conversation", (): void => {
  let wrapper: any;
  const mockContextValue: IConversation = {
    ...defaultContextValue,
    users: [{ id: "1", name: "User 1", avatar: "" }],
    channels: [{ id: "1", name: "Channel 1" }],
    messages: [],
    setMessages: jest.fn(),
  };

  beforeAll((): void => {
    wrapper = mount(
      <ConversationContext.Provider value={mockContextValue}>
        <ApolloProvider>
          <Conversation />
        </ApolloProvider>
      </ConversationContext.Provider>
    );
  });

  it("should render match snapshot", (): void => {
    const wrapper = shallow(
      <ConversationContext.Provider value={mockContextValue}>
        <ApolloProvider>
          <Conversation />
        </ApolloProvider>
      </ConversationContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should show current active channel name", (): void => {
    expect(
      wrapper.find('[data-test="conversation-channel-name"]')
    ).toHaveLength(1);
  });

  it("should show Empty component when messages empty", (): void => {
    const wrapper = mount(
      <ConversationContext.Provider
        value={{ ...mockContextValue, messages: [] }}
      >
        <ApolloProvider>
          <Conversation />
        </ApolloProvider>
      </ConversationContext.Provider>
    );
    expect(wrapper.find(Empty)).toHaveLength(1);
    expect(wrapper.find(Messages)).toHaveLength(0);
  });

  it("should show Conversation component when messages exists", (): void => {
    const wrapper = mount(
      <ConversationContext.Provider
        value={{
          ...mockContextValue,
          messages: [
            {
              messageId: "1",
              text: "The first message",
              datetime: "2021-09-29T01:39:08.665Z",
              userId: "Sam",
            },
          ],
        }}
      >
        <ApolloProvider>
          <Conversation />
        </ApolloProvider>
      </ConversationContext.Provider>
    );
    expect(wrapper.find(Empty)).toHaveLength(0);
    expect(wrapper.find(Messages)).toHaveLength(1);
  });

  it("should have a chat box", (): void => {
    expect(wrapper.find('[data-test="conversation-chat-box"]')).toHaveLength(1);
  });

  it("should have a submit button", (): void => {
    expect(
      wrapper.find('[data-test="conversation-submit-button"]')
    ).toHaveLength(1);
  });
});
